<template>
  <form class="form-horizontal" @submit="submit">

    <Field
      title="Name"
      :validator="$v.form.name"
      :ajaxErrorMessages="ajaxErrorMessages('name')"
    >
      <input
        class="form-control"
        type="text"
        name="name"
        v-model="form.name"
        @blur="$v.form.name.$touch"
        @input="removeAjaxError('name')"
      >
    </Field>

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

    <Field
      title="Password Confirmation"
      :validator="$v.form.password_confirmation"
      :ajaxErrorMessages="ajaxErrorMessages('password_confirmation')"
    >
      <input
        class="form-control"
        type="password"
        name="password_confirmation"
        v-model="form.password_confirmation"
        @blur="$v.form.password_confirmation.$touch"
        @input="removeAjaxError('password_confirmation')"
      >
    </Field>

    <Field
      title="Role"
      :validator="$v.form.role"
      :ajaxErrorMessages="ajaxErrorMessages('role')"
    >
      <select
        name="role"
        class="form-control"
        v-model="form.role"
        @blur="$v.form.role.$touch"
        @input="removeAjaxError('role')"
      >
        <option></option>
        <option value="deloper">Developer</option>
        <option value="designer">Designer</option>
        <option value="manager">Manager</option>
        <option value="other">Other</option>
      </select>
    </Field>

    <Field
      title="Sex"
      :validator="$v.form.sex"
      :ajaxErrorMessages="ajaxErrorMessages('sex')"
    >
      <div class="radio">
        <label>
          <input
            type="radio"
            name="sex"
            value="male"
            v-model="form.sex"
            @change="removeAjaxError('sex')"
          > Male
        </label>
      </div>
      <div class="radio">
        <label>
          <input
            type="radio"
            name="sex"
            value="female"
            v-model="form.sex"
            @change="removeAjaxError('sex')"
          > Female
        </label>
      </div>
    </Field>

    <div class="form-group">
      <div class="col-md-8 col-md-offset-4">
        <button type="submit" class="btn btn-primary">Register</button>
      </div>
    </div>
  </form>
</template>

<script>
const _ = require('lodash');
import Field from '@/components/Field';
import AjaxErrorMixIn from '@/mixins/AjaxError';
import axios from "axios";
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";

export default {
  mixins: [ AjaxErrorMixIn ],
  data() {
    return {
      form: {
        name: '',
        email: "",
        password: "",
        password_confirmation: '',
        role: "",
        sex: "",
        remember: false,
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
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
          password_confirmation: this.form.password_confirmation,
          sex: this.form.sex,
          role: this.form.role,
        })
        .then(response => {
          window.location.href = '/home';
        })
        .catch(error => {
          this.updateAjaxErrors(error.response.data.errors);
        });
    },
  },
  validations: {
    form: {
      name: {
        required,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      password_confirmation: {
        sameAsPassword: sameAs('password'),
      },
      role: {
        required,
      },
      sex: {
        required,
      },
    },
  },
  components: {
    Field,
  },
};
</script>
