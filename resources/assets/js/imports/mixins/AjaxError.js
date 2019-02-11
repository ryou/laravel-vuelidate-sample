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