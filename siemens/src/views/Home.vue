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
                <b-card title="Letzte Zykluszeit">
                  <b-card-text>5min</b-card-text>
                </b-card>
              </b-col>
              <b-col md="6">
                <b-card title="Auschussrate">
                  <b-card-text>7%</b-card-text>
                </b-card>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-card title="Geschwindigkeit Förderband">
                  <b-card-text>5 P/s</b-card-text>
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
                <b-card title="Reported Problems" class="h-100">
                  <b-card-text>{{reportedProblems}}</b-card-text>
                </b-card>
              </b-col>
              <b-col md="6">
                <b-card title="Report Problem" >
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
      <b-card title="Last events" class="xcard">
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
   <b-card title="Temperature Sensor" class="xcard">
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
  <b-card title="Humidity Sensor" class="xcard">
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
          text: 'Alerts',
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
          name: 'Critical Erros',
          data: [1, 4, 6, 9, 14, 7, 5],

        }, {
          name: 'Normal Errors',
          data: [21, 23, 12, 5, 12, 2, 4],

        }, {
          name: 'Downtime (h)',
          data: [1, 3, 5, 4, 2, 1, 1],

        }],
      },
      itemsTemp: [
        {
          MAX: 0, AVG: 0, MIN: 9999, 'ALARM COUNT': 0,
        },

      ],
      itemsHumidity: [
        {
          MAX: 0, AVG: 0, MIN: 9999, 'ALARM COUNT': 0,
        },

      ],
      itemsGeneralFields: [

        // A regular column
        'Name',
        // A regular column
        'Next Maintenance (days)',
        { key: 'ID', label: 'ID' },

      ],
      itemsGeneral: [
        {
          Name: 'Siemens ET200', 'Next Maintenance (days)': 365, ID: '#20',
        },
        {
          Name: 'Siemens ET300', 'Next Maintenance (days)': 323, ID: '#02',
        },
        {
          Name: 'Siemens ET200', 'Next Maintenance (days)': 36, ID: '#10',
        },
        {
          Name: 'Siemens ET300', 'Next Maintenance (days)': 356, ID: '#04',
        },
        {
          Name: 'Siemens ET300', 'Next Maintenance (days)': 148, ID: '#25',
        },
        {
          Name: 'Siemens ET200', 'Next Maintenance (days)': 134, ID: '#12',
        },
        {
          Name: 'Siemens ET200', 'Next Maintenance (days)': 294, ID: '#40',
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
        store.itemsEventsVerischerung.push({ Date: new Date().toUTCString(), Status: 'open', ID: `#${store.ReportedProblems}` });
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
          this.itemsTemp[0]['ALARM COUNT'] += 1;
          this.itemsGeneral[0]['Next Maintenance (days)'] -= 5;
          this.generateEvent('Temerpature', rawData.temperature > store.OptionsTemp.MaxValue ? 'Over Limit' : 'Under Limit');
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
          this.itemsHumidity[0]['ALARM COUNT'] += 1;
          this.itemsGeneral[0]['Next Maintenance (days)'] -= 1;
          this.generateEvent('Humidity', rawData.humidity > store.OptionsHumidity.MaxValue ? 'Over Limit' : 'Under Limit');
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
