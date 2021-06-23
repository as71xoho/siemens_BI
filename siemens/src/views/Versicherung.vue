<template >
  <b-container>
    <b-row >
      <b-col >
        <b-card title="Allgemein" class="xcard">
          <b-row>
            <b-col md="6">
              <b-table stacked :items="itemsGeneral"></b-table>
            </b-col>
            <b-col md="6">
              <b-row>
                <b-col md="6">
                  <b-card title="Gemeldete Pobleme">
                    <b-card-text>2</b-card-text>
                  </b-card>
                </b-col>
                <b-col md="6">
                  <b-card title="Gelöste Probleme">
                    <b-card-text>1</b-card-text>
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
                  <b-card title="Kontakt" >
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
        <b-card title="Übersicht" class="xcard">
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
        <b-card title="Ereignisse" class="xcard">
          <b-row>
            <b-col cols="12">

              <b-table :fields="itemsProblemsFields" :items="events">

                <template #cell(Aktionen)="data">
                  <b-button v-if="data.item.Status==='offen'">Kontakt aufnehmen</b-button>
                  <b-button v-else >Report anzeigen</b-button>
                </template>
                <template #cell(Details)="row">

                  <b-form-checkbox v-model="row.detailsShowing" @change="row.toggleDetails">
                    Details
                  </b-form-checkbox>
                </template>
                <template #row-details="">
                  <b-card>
                    <b-table :fields="itemsEventsFields"  :items="itemsEvents">
                    </b-table>

                  </b-card>
                </template>
              </b-table>

            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-card title="Auswertungen" class="xcard">
          <b-row>
            <b-col cols="12">

              <b-table :fields="itemsAuswertungenFields" :items="itemsAuswertungen">
                <template #cell(Details)="row">

                  <b-form-checkbox v-model="row.detailsShowing" @change="row.toggleDetails">
                    Details
                  </b-form-checkbox>
                </template>

                <template #row-details="row">
                  <b-card>
                    <b-row>
                      <b-col cols="8" v-if="row.index!==0" >
                        <highcharts :options="AuswertungenChartOptions">

                      </highcharts>
                      </b-col>
                      <b-col cols="8" v-else > <highcharts :options="AuswertungenChartAktuell">

                      </highcharts>
                      </b-col>

                      <b-col cols="4" v-if="row.index!==0" >
                        <b-row>
                        <b-col md="6">
                          <b-card title="Anzahl an kritischen Events">
                            <b-card-text>0</b-card-text>
                          </b-card>
                        </b-col>
                        <b-col md="6">
                          <b-card title="Ausgezahlte Leistungen" class="h-100">
                            <b-card-text>0€</b-card-text>
                          </b-card>
                        </b-col>
                      </b-row>
                        <b-row>
                          <b-col md="6">
                            <b-card title="Erwartete Wartungen">
                              <b-card-text>5</b-card-text>
                            </b-card>
                          </b-col>
                          <b-col md="6">
                            <b-card title="Tatsächliche Wartungen" class="h-100">
                              <b-card-text >8</b-card-text>
                            </b-card>
                          </b-col>
                        </b-row>

                        <b-row>
                          <b-col md="6">
                            <b-card title="Ausfallzeit (h)" class="h-100">
                              <b-card-text>3</b-card-text>
                            </b-card>
                          </b-col>
                          <b-col md="6">
                            <b-card title="Anpassung Beitrag?" >
                              <b-card-text>Nein</b-card-text>
                            </b-card>
                          </b-col>
                        </b-row></b-col>

                        <b-col cols="4" v-else>
                          <b-row>
                            <b-col md="6">
                              <b-card title="Anzahl an kritischen Events">
                                <b-card-text>1</b-card-text>
                              </b-card>
                            </b-col>
                            <b-col md="6">
                              <b-card title="Ausgezahlte Leistungen" class="h-100">
                                <b-card-text>4000€</b-card-text>
                              </b-card>
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col md="6">
                              <b-card title="Erwartete Wartungen">
                                <b-card-text>5</b-card-text>
                              </b-card>
                            </b-col>
                            <b-col md="6">
                              <b-card title="Tatsächliche Wartungen" class="h-100">
                                <b-card-text >1</b-card-text>
                              </b-card>
                            </b-col>
                          </b-row>

                          <b-row>
                            <b-col md="6">
                              <b-card title="Ausfallzeit (h)" class="h-100">
                                <b-card-text>8</b-card-text>
                              </b-card>
                            </b-col>
                            <b-col md="6">
                              <b-card title="Anpassung Beitrag?" >
                                <b-card-text>Ja</b-card-text>
                              </b-card>
                            </b-col>
                          </b-row></b-col>

                    </b-row>

                  </b-card>
                </template>
              </b-table>

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
          text: 'Auswertungen aller Maschinen (letztes Jahr)',
        },
        xAxis: {
          categories: [
            'Jan',
            'Feb',
            'Mär',
            'Apr',
            'Mai',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Okt',
            'Nov',
            'Dez',
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
          name: 'Kritische Fehler',
          data: [10, 7, 6, 9, 14, 7, 5, 8, 2, 4, 5, 11],

        }, {
          name: 'Normale Fehler',
          data: [5, 12, 3, 15, 16, 6, 12, 11, 5, 7, 10, 2],

        }, {
          name: 'Wartungen',
          data: [1, 0, 3, 1, 4, 8, 0, 0, 4, 5, 9, 1],

        }, {
          name: 'Ausfallzeiten (h)',
          data: [10, 2, 11, 8, 5, 7, 3, 6, 1, 2, 3, 8],

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
          Versicherungsnehmer: 'Mannheim Cola', 'Anzahl Maschinen': 20, Vertragsnummer: 69472374,
        },

      ],
      itemsProblemsFields: [

        // A regular column
        'Datum',
        'Status',
        'Details',

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
      itemsAuswertungenFields: [

        // A regular column
        'Datum',
        'Quartal',
        'Details',

      ],
      itemsAuswertungen: [
        {
          Datum: new Date().toUTCString(), Quartal: '3',
        },
        {
          Datum: new Date('2021.05.30').toUTCString(), Quartal: '2',
        },
        {
          Datum: new Date('2021.03.31').toUTCString(), Quartal: '1',
        },
        {
          Datum: new Date('2020.12.31').toUTCString(), Quartal: '4',
        },
        {
          Datum: new Date('2020.09.30').toUTCString(), Quartal: '3',
        }],
      AuswertungenChartOptions: {
        chart: {
          type: 'line',
        },
        title: {
          text: 'Zusammenfassung',
        },
        xAxis: {
          type: 'datetime',
          tickInterval: 1000 * 3600 * 24 * 30,
        },
        yAxis: {
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
          name: 'Kritische Events',
          data: [[Date.UTC(2021, 0, 1), 0], [Date.UTC(2021, 1, 1), 0], [Date.UTC(2021, 2, 1), 2]],

        },
        {
          name: 'Erwartete Wartungen',
          data: [[Date.UTC(2021, 0, 1), 2], [Date.UTC(2021, 1, 1), 2], [Date.UTC(2021, 2, 1), 1]],

        },
        {
          name: 'Tatsächliche Wartungen',
          data: [[Date.UTC(2021, 0, 1), 2], [Date.UTC(2021, 1, 1), 2], [Date.UTC(2021, 2, 1), 6]],

        },
        {
          name: 'Ausfallzeit',
          data: [[Date.UTC(2021, 0, 1), 1], [Date.UTC(2021, 1, 1), 2], [Date.UTC(2021, 2, 1), 0]],

        },
        {
          name: 'Ausgezahlte Leistungen',
          data: [[Date.UTC(2021, 0, 1), 0], [Date.UTC(2021, 1, 1), 0], [Date.UTC(2021, 2, 1), 0]],

        },
        ],
      },
      AuswertungenChartAktuell: {
        chart: {
          type: 'line',
        },
        title: {
          text: 'Zusammenfassung',
        },
        xAxis: {
          type: 'datetime',
          tickInterval: 1000 * 3600 * 24 * 30,
        },
        yAxis: {
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
          name: 'Kritische Events',
          data: [[Date.UTC(2021, 5, 1), 0], [Date.UTC(2021, 5, 10), 0],
            [Date.UTC(2021, 5, 15), 1], [Date.UTC(2021, 5, 20), 2]],

        },
        {
          name: 'Erwartete Wartungen',
          data: [[Date.UTC(2021, 5, 1), 2], [Date.UTC(2021, 6, 1), 2], [Date.UTC(2021, 6, 1), 2]],

        },
        {
          name: 'Tatsächliche Wartungen',
          data: [[Date.UTC(2021, 5, 1), 0], [Date.UTC(2021, 5, 10), 0],
            [Date.UTC(2021, 5, 15), 1], [Date.UTC(2021, 5, 20), 2]],

        },
        {
          name: 'Ausfallzeit',
          data: [[Date.UTC(2021, 5, 1), 1], [Date.UTC(2021, 5, 10), 2],
            [Date.UTC(2021, 5, 15), 3], [Date.UTC(2021, 5, 20), 4]],

        },
        {
          name: 'Ausgezahlte Leistungen',
          data: [[Date.UTC(2021, 5, 21), 4000]],

        },
        ],
      },
      itemsEventsFields: [

        { key: 'Timestamp', label: 'Zeitstempel' },
        // A regular column
        { key: 'Error ID', label: 'Fehler ID' },
        { key: 'error', label: 'Error Code' },
        'Sensor',
        'Event',

      ],

    };
  },
  computed: {
    nextMaintenance() {
      return store.NextMaintenanceDummyMachine;
    },
    events() {
      return store.itemsEventsVerischerung;
    },
    itemsEvents() {
      return store.itemsEvents;
    },
  },
};
</script>

<style scoped>

</style>
