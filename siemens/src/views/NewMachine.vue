<template >
  <b-container >
    <b-row >
      <b-col cols="6">
        <b-card header="Reinigungsmaschinen"
                img-src="https://assets.new.siemens.com/siemens/assets/api/uuid:c26453b3-980c-4fa9-bdfd-9c04c650f244/width:1024/2019-10-09-abfuellanlage-1.jpg"
                img-alt="Image"
                img-height="400"
                img-top>
          <b-table :items="itemsGeneral" stacked></b-table>
          <b-card-body>
            <b-card-text>
              <b-card-title>Hersteller</b-card-title>
              <b-card-img height="80" src="https://new.siemens.com/etc.clientlibs/siemens-sites/components/content/header/clientlibs/resources/logo/siemens-logo-default.svg" ></b-card-img>
            </b-card-text>
          </b-card-body>
          <b-card-body>
            <b-card-text>
              <b-card-title>Bank</b-card-title>
             BETA BANK
            </b-card-text>
          </b-card-body>
          <b-card-footer>
            <b-row>
              <b-col>
                <b-button > Maschine bestellen</b-button>
              </b-col>
              <b-col>
                <b-button> Kontakt aufnehmen</b-button>
              </b-col>
            </b-row>

          </b-card-footer>

        </b-card>
      </b-col>
      <b-col cols="6">
        <b-card header="PET-Herstellung"
                img-src="https://assets.new.siemens.com/siemens/assets/api/uuid:8182c2f7-ada9-4588-bd56-59b94ece51f2/width:1024/2018-08-15-flexible-flaschenproduktion-1.jpg"
                img-alt="Image"
                img-height="400"
                img-top>
          <b-table :items="itemsGeneral" stacked></b-table>
          <b-card-body>
            <b-card-text>
              <b-card-title>Hersteller</b-card-title>
              <b-card-img height="80" src="https://new.siemens.com/etc.clientlibs/siemens-sites/components/content/header/clientlibs/resources/logo/siemens-logo-default.svg" ></b-card-img>
            </b-card-text>
          </b-card-body>
          <b-card-body>
            <b-card-text>
              <b-card-title>Bank</b-card-title>
              BETA BANK
            </b-card-text>
          </b-card-body>
          <b-card-footer>
            <b-row>
              <b-col>
                <b-button > Maschine bestellen</b-button>
              </b-col>
              <b-col>
                <b-button> Kontakt aufnehmen</b-button>
              </b-col>
            </b-row>

          </b-card-footer>

        </b-card>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
export default {
  name: 'NewMachine',
  data() {
    return {
      itemsGeneral: [
        {
          Listenpreis: '420.000€',
          Nutzungsdauer: '48 Monate',
          'Nutzungsdauer (Afa)': '60 Monate',
          'Kalk. Zinsen p.a.': '3.5%',
          'Preisnachlässe in €': '20000€',
          'Nominaler Zinssatz': '6.5%',
          'Anzahlung in €': '80.000€',
          'Laufzeit in Monaten': 48,
          'Monatl. Rate in €': '2.500€',
          'Schlussrate in €': '0€',
          'Restwertvorgabe in €': '200.0000€',
          '-': 'Leasing',
          Zinskosten: '60.262,72€',
          'altern. Zinserträge (3.5%)': '20.983,48€',
          SUMME: '81.246,20€',
        },

      ],
    };
  },
};
</script>

<style scoped>

</style>
