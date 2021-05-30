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
              <div class="btn-toolbar">
              </div>
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
        <b-card title="Risk of failure (next 30 days)" class="xcard">
          <b-row>
            <b-col cols="6">

              <highcharts :options="GaugeChartOptions"></highcharts>

            </b-col>
            <b-col cols="6">

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
          data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],

        }, {
          name: 'Normal Alerts',
          data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3],

        }, {
          name: 'Maintenances',
          data: [1, 0, 3, 1, 4, 8, 0, 0, 4, 5, 9, 1],

        }, {
          name: 'Downtimes (h)',
          data: [10, 12, 11, 8, 30, 7, 7, 6, 7, 9, 46, 51.1],

        }],
      },
      GaugeChartOptions: {
        chart: {
          type: 'solidgauge',
        },

        title: 'Risk',

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

    };
  },
};
</script>

<style scoped>

</style>
