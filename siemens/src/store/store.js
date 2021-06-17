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
  NextMaintenanceDummyMachine: 365,
  ProductionStopped: false,
  ReportedProblems: 0,
  ReportedProblemsVersicherung: 0,
  itemsEventsVerischerung: [

    {
      Date: new Date('2020.01.01').toUTCString(), Status: 'closed', ID: '#20',
    },
  ],
  itemsEvents: [
  ],
});
export default state;
