import Vue from 'vue';

const state = Vue.observable({
  OptionsTemp: {
    MinValue: 80,
    MaxValue: 95,
  },
  OptionsHumidity: {
    MinValue: 35,
    MaxValue: 40,
  },
});
export default state;
