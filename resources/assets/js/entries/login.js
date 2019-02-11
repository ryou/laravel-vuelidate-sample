import Vue from 'vue';
import Vuelidate from 'vuelidate';
import LoginForm from '@/pages/login/LoginForm';

Vue.use(Vuelidate);

new Vue({
    el: '#app',
    components: {
        "login-form": LoginForm,
    },
});
