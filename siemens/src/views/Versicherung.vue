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

    };
  },
};
</script>

<style scoped>

</style>
