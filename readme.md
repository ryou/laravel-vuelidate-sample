# Laravel+Vuelidateによるバリデーションサンプル

`Vuetify`や`Quasar framework`等のフレームワークを使わない独自のデザインでそれなりに汎用的なバリデーションを実装したいので試しに書いた。

## 想定機能

+ 一番最初の入力時は、Blurタイミングまでバリデーションが実行されない。
+ Submitタイミングで全フォームのフロントエンドバリデーションを実行し、エラーがあればSubmitをキャンセル。
+ Ajax通信でエラーが返ってきたら、エラーを表示。
+ Ajax通信で受け取ったエラーは、そのフォームに何らかの変更が発生した瞬間表示を消す。
+ フロントエンドバリデーションのエラーメッセージは、１ファイルにまとめて記述。

## サンプル

```
<template>
  <form class="form-horizontal" @submit="submit">

    <Field
      title="E-Mail Address"
      :validator="$v.form.email"
      :ajaxErrorMessages="ajaxErrorMessages('email')"
    >
      <input
        class="form-control"
        type="email"
        name="email"
        v-model="form.email"
        @blur="$v.form.email.$touch"
        @input="removeAjaxError('email')"
      >
    </Field>

    <div class="form-group">
      <div class="col-md-8 col-md-offset-4">
        <button type="submit" class="btn btn-primary">Login</button>
      </div>
    </div>
  </form>
</template>

<script>
import Field from '@/components/Field';
import AjaxErrorMixIn from '@/mixins/AjaxError';
import axios from "axios";
import { required, email } from "vuelidate/lib/validators";

export default {
  mixins: [ AjaxErrorMixIn ],
  data() {
    return {
      form: {
        email: "",
      },
    };
  },
  props: {
    action: {
      type: String,
      required: true
    },
  },
  methods: {
    submit(event) {
      event.preventDefault();

      this.$v.$touch();
      if (this.$v.$invalid) return;

      axios
        .post(this.action, {
          email: this.form.email,
        })
        .then(response => {
          //
        })
        .catch(error => this.updateAjaxErrors(error.response.data.errors));
    },
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
    },
  },
  components: {
    Field,
  },
};
</script>
```

### `Field.vue`

```
<template>
  <div class="form-group" :class="{ 'has-error': hasError }">
    <label class="col-md-4 control-label">{{ title }}</label>

    <div class="col-md-6">
      <slot></slot>

      <span v-if="hasError" class="help-block">
        <strong>
          <template v-for="message in errorMessages">{{ message }}</template>
        </strong>
      </span>
    </div>
  </div>
</template>

<script>
const _ = require('lodash');
import validationMessages from '@/lang/validations';

export default {
  data() {
    return {
    };
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    validator: {},
    ajaxErrorMessages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    hasError() {
      if (this.ajaxErrorMessages.length > 0) return true;
      if (this.validator.$error) return true;

      return false;
    },
    errorMessages() {
      let errors = [];

      Object.keys(this.validator.$params).forEach(key => {
        if (this.validator[key] === false) errors.push(validationMessages[key]);
      });

      return errors.concat(this.ajaxErrorMessages);
    },
  },
};
</script>
```

### `AjaxError.js`

```
export default {
    data() {
        return {
            errors: {},
        };
    },
    computed: {
        ajaxErrorMessages() {
            return field => {
                if (this.errors[field] !== undefined) return this.errors[field];

                return [];
            };
        },
    },
    methods: {
        updateAjaxErrors(errors) {
            this.errors = errors;
        },
        removeAjaxError(fieldName) {
            if (this.errors[fieldName] !== undefined && this.errors[fieldName].length > 0) {
                // 参照を切ってしまうと正常に動作しないため、spliceを使用して参照を維持したまま変更
                this.errors[fieldName].splice(0, this.errors[fieldName].length);
            }
        },
    },
};
```

### `validations.js`

バリデーションの項目に対応するエラーメッセージを記述。

```
export default {
    'required': '必須項目です。',
    'email': '無効なメールアドレスです。',
    'sameAsPassword': 'パスワードの文字列が異なっています。',
    'minLength': '入力値が短すぎます。',
};
```


## まとめ

結局あまり隠蔽出来ていない。フォームがモデルの値やバリデーション情報を持つ必要がある以上どうしようもないかもしれないがなんとかしたい。
