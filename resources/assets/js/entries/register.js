import Vue from 'vue';
import Vuelidate from 'vuelidate';
import RegisterForm from '@/pages/register/RegisterForm';

Vue.use(Vuelidate);

new Vue({
    el: '#app',
    components: {
        "register-form": RegisterForm,
    },
});
