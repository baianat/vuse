import Vue from 'vue';
import '../stylus/app.styl';
import Builder from './builder';
import zip from './plugins/zip';

Builder.use(zip);

Vue.use(Builder);

new Vue({
  el: '#app'
});
