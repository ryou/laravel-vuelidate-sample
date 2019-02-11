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
