import Vue from 'vue';
import Vuelidate from 'vuelidate';
import LoginForm from '@/pages/login/LoginForm';

Vue.use(Vuelidate);

console.log('hogehoge');


new Vue({
    el: '#app',
    components: {
        "login-form": LoginForm,
    },
});
