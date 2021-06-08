<template >
<b-container>
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
                  <b-card-text>365 Tage</b-card-text>
                </b-card>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="6">
                <b-card title="Reported Problems" class="h-100">
                  <b-card-text>2</b-card-text>
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
  <b-card title="Time  Sensor" class="xcard">
    <b-row>
      <b-col cols="8">

        <highcharts :options="TimeStopChartOptions"></highcharts>

      </b-col>
      <b-col cols="4">

        <b-table stacked :items="itemsTimeStop"></b-table>

      </b-col>
    </b-row>
  </b-card>
    </b-col>
  </b-row>
  <b-row>
   <b-col>
     <b-card title="Noise Sensor" class="xcard">
       <highcharts :options="TempChartOptions"></highcharts>
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
      TempChartOptions: {
        series: [{
          data: [], // sample data
        }],
        title: '',
        xAxis: {
          type: 'datetime',
        },
      },
      TimeStopChartOptions: {
        series: [{
          data: [], // sample data
        }],
        title: '',
        xAxis: {
          type: 'datetime',
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
      itemsTimeStop: [
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
      ],
      itemsEvents: [
        {
          Timestamp: new Date('2021.08.10').toUTCString(), 'Error ID': '#20', error: '4', Sensor: 'ET200', Event: 'Internal Error',
        },
        {
          Timestamp: new Date('2021.04.10').toUTCString(), 'Error ID': '#12', error: 's563', Sensor: 'Temperature', Event: 'Under Limit',
        },

      ],

    };
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
  },
  created() {
    const client = mqtt.connect('ws://127.0.0.1:9001');
    client.on('connect', () => {
      client.subscribe('#', (err) => {
        console.warn(err);
      });
    });
    client.on('message', (topic, message) => {
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
        }

        this.itemsTemp[0].AVG = this.calcStatistics(this.TempChartOptions.series[0].data);
      }
      if (topic === '/timestop') {
        this.TimeStopChartOptions.series[0].data.push(
          [rawData.timestamp, rawData.timePassed],
        );
        if (this.TimeStopChartOptions.series[0].data.length > 50) {
          this.TimeStopChartOptions.series[0].data.shift();
        }
        if (rawData.timePassed > this.itemsTimeStop[0].MAX) {
          this.itemsTimeStop[0].MAX = rawData.timePassed;
        }
        if (rawData.timePassed < this.itemsTimeStop[0].MIN) {
          this.itemsTimeStop[0].MIN = rawData.timePassed;
        }
        // eslint-disable-next-line max-len
        if (rawData.timePassed > store.OptionsTime.MaxValue || rawData.timePassed < store.OptionsTime.MinValue) {
          this.itemsTimeStop[0]['ALARM COUNT'] += 1;
          this.itemsGeneral[0]['Next Maintenance (days)'] -= 1;
        }
        this.itemsTimeStop[0].AVG = this.calcStatistics(this.TimeStopChartOptions.series[0].data);
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
