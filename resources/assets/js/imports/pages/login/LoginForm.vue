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

    <Field
      title="Password"
      :validator="$v.form.password"
      :ajaxErrorMessages="ajaxErrorMessages('password')"
    >
      <input
        class="form-control"
        type="password"
        name="password"
        v-model="form.password"
        @blur="$v.form.password.$touch"
        @input="removeAjaxError('password')"
      >
    </Field>

    <div class="form-group">
      <div class="col-md-6 col-md-offset-4">
        <div class="checkbox">
          <label>
            <input type="checkbox" name="remember" v-model="form.remember"> Remember Me
          </label>
        </div>
      </div>
    </div>

    <div class="form-group">
      <div class="col-md-8 col-md-offset-4">
        <button type="submit" class="btn btn-primary">Login</button>
        
        <a class="btn btn-link" :href="forgetLink">Forgot Your Password?</a>
      </div>
    </div>
  </form>
</template>

<script>
const _ = require('lodash');
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
        password: "",
        remember: false,
      },
    };
  },
  props: {
    action: {
      type: String,
      required: true
    },
    forgetLink: {
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
          password: this.form.password,
          remember: this.form.remember
        })
        .then(response => {
          window.location.href = '/home';
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
      password: {
        required,
      },
    },
  },
  components: {
    Field,
  },
};
</script>
