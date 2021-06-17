<template >
  <b-container>
    <b-row >
      <b-col >
        <b-card title="General" class="xcard">
          <b-row>
            <b-col md="6">
              <b-table stacked :items="itemsGeneral"></b-table>
            </b-col>
            <b-col md="6">
              <b-row>
                <b-col md="6">
                  <b-card title="Reported Problems">
                    <b-card-text>5</b-card-text>
                  </b-card>
                </b-col>
                <b-col md="6">
                  <b-card title="Fixed Problems">
                    <b-card-text>2</b-card-text>
                  </b-card>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="6">
                  <b-card title="Nächste Wartung" class="h-100">
                    <b-card-text>{{nextMaintenance}} Tage</b-card-text>
                  </b-card>
                </b-col>
                <b-col md="6">
                  <b-card title="Contact" >
                    <b-button style="margin: 1px">Fabrikleiter</b-button>
                    <b-button style="margin: 1px">Hersteller</b-button>
                  </b-card>
                </b-col>
              </b-row>

            </b-col>

          </b-row>

        </b-card>
      </b-col>

    </b-row>
    <b-row>
      <b-col>
        <b-card title="Overview" class="xcard">
          <b-row>
            <b-col cols="12">

              <highcharts :options="OverviewChartOptions"></highcharts>

            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card title="Events" class="xcard">
          <b-row>
            <b-col cols="12">

              <b-table :fields="itemsProblemsFields" :items="events">

                <template #cell(Actions)="data">
                  <b-button v-if="data.item.Status==='open'">Contact Fabrikleiter</b-button>
                  <b-button v-else >Show Report</b-button>
                </template>
              </b-table>

            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-card title="Risk of failure (next 30 days)" class="xcard">
          <b-row>
            <b-col cols="12">

              <highcharts :options="GaugeChartOptions"></highcharts>

            </b-col>

          </b-row>
        </b-card>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import store from '@/store/store';

export default {
  name: 'Versicherung',
  data() {
    return {
      OverviewChartOptions: {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Alerts across all Machines',
        },
        xAxis: {
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          crosshair: true,
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Alerts',
          },
        },

        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
        },
        series: [{
          name: 'Critical Alerts',
          data: [10, 7, 6, 9, 14, 7, 5, 8, 16, 4, 5, 27],

        }, {
          name: 'Normal Alerts',
          data: [20, 12, 21, 15, 16, 6, 12, 18, 5, 7, 10, 50],

        }, {
          name: 'Maintenances',
          data: [1, 0, 3, 1, 4, 8, 0, 0, 4, 5, 9, 20],

        }, {
          name: 'Downtimes (h)',
          data: [10, 12, 11, 8, 30, 7, 7, 6, 7, 9, 10, 51.1],

        }],
      },
      GaugeChartOptions: {
        chart: {
          type: 'solidgauge',
        },

        title: 'Risk of failure (30 days)',

        pane: {

          center: ['50%', '85%'],
          size: '140%',
          startAngle: -90,
          endAngle: 90,
          background: {
            backgroundColor:
              '#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc',

          },
        },
        yAxis: {
          min: 0,
          max: 100,
          title: {
            text: '',
          },
        },
        series: [{
          name: 'Risk',
          data: [80],
          tooltip: {
            valueSuffix: '%',
          },
        }],

        // the value axis

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
      itemsGeneral: [
        {
          'Costumer Name': 'Leipzig Cola', 'Costumer Machines Count': 20, 'Contract Number': 69472374,
        },

      ],
      itemsProblemsFields: [

        // A regular column
        'Date',
        'Status',
        'Actions',

      ],
      itemsProblems: [
        {
          Date: new Date('2021.05.10').toUTCString(), Status: 'open', ID: '#20',
        },
        {
          Date: new Date('2021.04.10').toUTCString(), Status: 'open', ID: '#02',
        },
        {
          Date: new Date('2021.03.10').toUTCString(), Status: 'closed', ID: '#10',
        },
        {
          Date: new Date('2021.02.10').toUTCString(), Status: 'closed', ID: '#04',
        },
        {
          Date: new Date('2021.01.09').toUTCString(), Status: 'closed', ID: '#25',
        }],

    };
  },
  computed: {
    nextMaintenance() {
      return store.NextMaintenanceDummyMachine;
    },
    events() {
      return store.itemsEventsVerischerung;
    },
  },
};
</script>

<style scoped>

</style>
