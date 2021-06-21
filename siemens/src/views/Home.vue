<template >
<b-container>
  <b-row v-if="productionStopped">

    <b-col cols="12">

      <b-card title="ACHTUNG" class="xcard" bg-variant="danger" ref="attention">
      <b-card-text>Mehrere Fehler erkannt. Maschine im halte Modus.</b-card-text>
      <b-card-footer>
        <b-button style="margin: 1px">Report Anzeigen</b-button>
        <b-button style="margin: 1px">Fortsetzen</b-button>
      </b-card-footer>
      </b-card>

    </b-col>
  </b-row>
  <b-row >
    <b-col >
      <b-card title="General" class="xcard">
        <b-row>
          <b-col md="6">
            <highcharts :options="OverviewChartOptions"></highcharts>
          </b-col>
          <b-col md="6">
            <b-row>
              <b-col md="6">
                <b-card title="Versicherungspartner">
                  <b-card-text>Insurance 21</b-card-text>
                </b-card>
              </b-col>
              <b-col md="6">
                <b-card title="Versicherungslevel">
                  <b-card-text>85%</b-card-text>
                </b-card>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-card title="Produktivität" class="h-100">
                  <b-card-text>Aktuell: {{produktivität}}%</b-card-text>
                  <b-card-text>Durchschnitt: {{produktivitätdurchschnitt}}%</b-card-text>
                </b-card>
              </b-col>
              <b-col md="6">
                <b-card title="Nächste Wartung" class="h-100">
                  <b-card-text >{{NextMaintenance}} Tage</b-card-text>
                </b-card>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="6">
                <b-card title="Gemeldete Probleme" class="h-100">
                  <b-card-text>{{reportedProblems}}</b-card-text>
                </b-card>
              </b-col>
              <b-col md="6">
                <b-card title="Problem melden" >
                  <b-button style="margin: 1px">Fabrikleiter</b-button>
                  <b-button style="margin: 1px">Versicherung</b-button>
                </b-card>
              </b-col>
            </b-row>

          </b-col>

        </b-row>

      </b-card>
    </b-col>

  </b-row>
  <b-row >
    <b-col >
      <b-card title="Ereignisse" class="xcard">
        <b-row>
          <b-col md="12">
            <b-table :fields="itemsEventsFields"  :items="itemsEvents">
              <template #cell(error)="data">
                <b-button v-b-modal="'my-modal'">{{data.item.error}}</b-button>
              </template>
            </b-table>
          </b-col>
          <b-modal :id="'my-modal'" :title="'Error Description'" ok-only >
            <pre>Option handling has been configured but
more than one power module was configured
for options handling. The slot of the second
power module that has option handling is
displayed.</pre>
          </b-modal>

        </b-row>

      </b-card>
    </b-col>

  </b-row>

  <b-row>
    <b-col>
   <b-card title="Temperatur" class="xcard">
     <b-row>
   <b-col cols="8">

       <highcharts :options="TempChartOptions"></highcharts>

   </b-col>
   <b-col cols="4">

     <b-table stacked :items="itemsTemp"></b-table>

   </b-col>
     </b-row>
   </b-card>
    </b-col>
  </b-row>
  <b-row>
    <b-col>
  <b-card title="Luftfeuchtigkeit" class="xcard">
    <b-row>
      <b-col cols="8">

        <highcharts :options="HumidityChartOptions"></highcharts>

      </b-col>
      <b-col cols="4">

        <b-table stacked :items="itemsHumidity"></b-table>

      </b-col>
    </b-row>
  </b-card>
    </b-col>
  </b-row>

</b-container>
</template>

<script>
// @ is an alias to /src
import mqtt from 'mqtt';
import store from '../store/store';

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      Produktivität: 86.5,
      ProduktivitätDurchschnitt: 86.5,
      NextMaintenance: store.NextMaintenanceDummyMachine,
      TempChartOptions: {
        series: [{
          data: [], // sample data
        }],
        title: '',
        xAxis: {
          type: 'datetime',
        },
        yAxis: {
          plotLines: [{
            color: '#FF0000',
            width: 2,
            value: store.OptionsTemp.MaxValue,
          },
          {
            color: '#FF0000',
            width: 2,
            value: store.OptionsTemp.MinValue,
          }],
        },
      },
      HumidityChartOptions: {
        series: [{
          data: [], // sample data
        }],
        title: '',
        xAxis: {
          type: 'datetime',
        },
        yAxis: {
          plotLines: [{
            color: '#FF0000',
            width: 2,
            value: store.OptionsHumidity.MaxValue,
          },
          {
            color: '#FF0000',
            width: 2,
            value: store.OptionsHumidity.MinValue,
          }],
        },
      },
      OverviewChartOptions: {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Wochenübersicht',
        },
        xAxis: {
          categories: [
            'Mon',
            'Die',
            'Mit',
            'Don',
            'Fre',
            'Sam',
            'Son',

          ],
          crosshair: true,
        },
        yAxis: {
          min: 0,
          title: {
            text: '',
          },
        },

        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
        },
        series: [{
          name: 'Kritische Fehler',
          data: [1, 0, 0, 2, 1, 2, 3],

        }, {
          name: 'Normale Fehler',
          data: [2, 1, 4, 0, 0, 2, 4],

        }, {
          name: 'Ausfallzeit (h)',
          data: [1, 0.5, 1, 1, 2, 3, 5],

        }],
      },
      itemsTemp: [
        {
          MAX: 0, AVG: 0, MIN: 9999, 'ALARM ANZAHL': 0,
        },

      ],
      itemsHumidity: [
        {
          MAX: 0, AVG: 0, MIN: 9999, 'ALARM ANZAHL': 0,
        },

      ],
      itemsGeneralFields: [

        // A regular column
        'Name',
        // A regular column
        'Nächste Wartung (days)',
        { key: 'ID', label: 'ID' },

      ],
      itemsGeneral: [
        {
          Name: 'Siemens ET200', 'Nächste Wartung (Tage)': 365, ID: '#20',
        },
        {
          Name: 'Siemens ET300', 'Nächste Wartung (Tage)': 323, ID: '#02',
        },
        {
          Name: 'Siemens ET200', 'Nächste Wartung (Tage)': 36, ID: '#10',
        },
        {
          Name: 'Siemens ET300', 'Nächste Wartung (Tage)': 356, ID: '#04',
        },
        {
          Name: 'Siemens ET300', 'Nächste Wartung (Tage)': 148, ID: '#25',
        },
        {
          Name: 'Siemens ET200', 'Nächste Wartung (Tage)': 134, ID: '#12',
        },
        {
          Name: 'Siemens ET200', 'Nächste Wartung (Tage)': 294, ID: '#40',
        },

      ],
      itemsEventsFields: [

        // A regular column
        'Timestamp',
        // A regular column
        'Error ID',
        { key: 'error', label: 'Error Code' },
        'Sensor',
        'Event',
        'Report ID',
      ],
      productionIsStopped: false,

    };
  },
  computed: {
    itemsEvents() {
      return store.itemsEvents;
    },
    reportedProblems() {
      return store.ReportedProblems;
    },
    productionStopped() {
      return store.ProductionStopped;
    },
    produktivität() {
      return this.Produktivität;
    },
    produktivitätdurchschnitt() {
      return this.ProduktivitätDurchschnitt;
    },
  },
  methods: {
    calcStatistics(param) {
      const data = [];
      for (let i = 0; i < param.length; i++) {
        data.push(param[i][1]);
      }
      const sum = data.reduce((pv, cv) => pv + cv, 0);
      const avg = (sum / data.length).toFixed(2);
      return avg;
    },
    generateEvent(sensor, eventype) {
      store.itemsEvents.push({
        Timestamp: new Date().toUTCString(),
        'Error ID': '#12',
        error: 's563',
        Sensor: sensor,
        Event: eventype,
        'Report ID': '',
      });
      store.NextMaintenanceDummyMachine -= 1;
      this.NextMaintenance -= 1;
      if (store.itemsEvents.length > 5) {
        store.ReportedProblems += 1;
        store.ProductionStopped = true;
        this.Produktivität = 0;
        this.ProduktivitätDurchschnitt = 84;
        store.itemsEventsVerischerung.push({ Datum: new Date().toUTCString(), Status: 'offen', ID: `#${store.ReportedProblems}` });
        for (let i = 0; i < store.itemsEvents.length; i++) {
          store.itemsEvents[i]['Report ID'] = `#${store.ReportedProblems}`;
        }
      }
    },
  },
  created() {
    const client = mqtt.connect('ws://127.0.0.1:9001');
    client.on('connect', () => {
      client.subscribe('#', (err) => {
        console.warn(err);
      });
    });
    client.on('message', (topic, message) => {
      if (this.productionStopped) {
        return;
      }
      // message is Buffer
      const rawData = JSON.parse(message.toString());
      if (topic === '/temperature') {
        this.TempChartOptions.series[0].data.push([rawData.timestamp, rawData.temperature]);
        if (this.TempChartOptions.series[0].data.length > 50) {
          this.TempChartOptions.series[0].data.shift();
        }
        if (rawData.temperature > this.itemsTemp[0].MAX) {
          this.itemsTemp[0].MAX = rawData.temperature;
        }
        if (rawData.temperature < this.itemsTemp[0].MIN) {
          this.itemsTemp[0].MIN = rawData.temperature;
        }
        // eslint-disable-next-line max-len
        if (rawData.temperature > store.OptionsTemp.MaxValue || rawData.temperature < store.OptionsTemp.MinValue) {
          this.itemsTemp[0]['ALARM ANZAHL'] += 1;
          this.itemsGeneral[0]['Nächste Wartung (Tage)'] -= 5;
          this.generateEvent('Temperatur', rawData.temperature > store.OptionsTemp.MaxValue ? 'Über Limit' : 'Unter Limit');
        }

        this.itemsTemp[0].AVG = this.calcStatistics(this.TempChartOptions.series[0].data);
      }
      if (topic === '/humidity') {
        this.HumidityChartOptions.series[0].data.push(
          [rawData.timestamp, rawData.humidity],
        );
        if (this.HumidityChartOptions.series[0].data.length > 50) {
          this.HumidityChartOptions.series[0].data.shift();
        }
        if (rawData.humidity > this.itemsHumidity[0].MAX) {
          this.itemsHumidity[0].MAX = rawData.humidity;
        }
        if (rawData.humidity < this.itemsHumidity[0].MIN) {
          this.itemsHumidity[0].MIN = rawData.humidity;
        }
        // eslint-disable-next-line max-len
        if (rawData.humidity > store.OptionsHumidity.MaxValue || rawData.humidity < store.OptionsHumidity.MinValue) {
          this.itemsHumidity[0]['ALARM ANZAHL'] += 1;
          this.itemsGeneral[0]['Nächste Wartung (Tage)'] -= 1;
          this.generateEvent('Humidity', rawData.humidity > store.OptionsHumidity.MaxValue ? 'Über Limit' : 'Unter Limit');
        }
        // eslint-disable-next-line max-len
        this.itemsHumidity[0].AVG = this.calcStatistics(this.HumidityChartOptions.series[0].data);
      }
    });
  },
};
</script>
<style>
  .xcard{
    margin-bottom: 2em;
  }
</style>
