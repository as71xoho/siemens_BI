import Vue from 'vue';

const state = Vue.observable({
  OptionsTemp: {
    MinValue: 30,
    MaxValue: 50,
  },
  OptionsTime: {
    MinValue: 6,
    MaxValue: 7,
  },
});
export default state;
