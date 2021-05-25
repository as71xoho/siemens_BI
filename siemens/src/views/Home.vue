<template>
<b-container>

   <b-card title="Temperature Sensor">
     <b-row>
   <b-col cols="8">

       <highcharts :options="TempChartOptions"></highcharts>

   </b-col>
   <b-col cols="4">

     <b-table stacked :items="items"></b-table>

   </b-col>
     </b-row>
   </b-card>

  <b-row>
   <b-col>
     <b-card title="Temperature Sensor">
       <highcharts :options="TempChartOptions"></highcharts>
     </b-card>
   </b-col>
  </b-row>
  <b-row>
   <b-col>
     <b-card title="Temperature Sensor">
       <highcharts :options="TempChartOptions"></highcharts>
     </b-card>
   </b-col>
  </b-row>
  <b-row>
   <b-col>
     <b-card title="Temperature Sensor">
       <highcharts :options="TempChartOptions"></highcharts>
     </b-card>
   </b-col>

   <b-col>
     <b-card title="Temperature Sensor">
       <highcharts :options="TempChartOptions"></highcharts>
     </b-card>
   </b-col>

   <b-col>
     <b-card title="Temperature Sensor">
       <highcharts :options="TempChartOptions"></highcharts>
     </b-card>
   </b-col>
 </b-row>

</b-container>
</template>

<script>
// @ is an alias to /src
import mqtt from 'mqtt';
import store from '../store/store'
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
        xAxis: {
          type: 'datetime',
        },
      },
      items: [
        {
          MAX: 0, AVG: 0, MIN: 9999, "ALARM COUNT": 0 , "NEXT MAINTENANCE": new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        },

      ],

    };
  },
  created() {
    console.log('h');
    const client = mqtt.connect('ws://127.0.0.1:9001');
    client.on('connect', () => {
      client.subscribe('#', (err) => {
        console.warn(err);
      });
    });
    client.on('message', (topic, message) => {
      // message is Buffer
      console.log(JSON.parse(message.toString()));
      const rawData = JSON.parse(message.toString());
      this.TempChartOptions.series[0].data.push([rawData.timestamp, rawData.temperature]);
      if (this.TempChartOptions.series[0].data.length > 50) {
        this.TempChartOptions.series[0].data.shift();
      }
      if (rawData.temperature > this.items[0].MAX) {
        this.items[0].MAX = rawData.temperature;
      }
      if (rawData.temperature < this.items[0].MIN) {
        this.items[0].MIN = rawData.temperature;
      }
      if(rawData.temperature > store.Options.MaxValue || rawData.temperature < store.Options.MinValue){
        this.items[0]["ALARM COUNT"]+=1
      }
      let totalTemperature = 0;
      for (let i = 0; i < this.TempChartOptions.series[0].data.length; i++) {
        totalTemperature += this.TempChartOptions.series[0].data[i][1];
      }
      this.items[0].AVG = (totalTemperature / this.TempChartOptions.series[0].data.length)
        .toFixed(2);
    });
  },
};
</script>
