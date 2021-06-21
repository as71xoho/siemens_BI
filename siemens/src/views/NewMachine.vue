<template >
  <b-container >
    <b-row >
      <b-col cols="6">
        <b-card header="Reinigungsmaschinen"
                img-src="https://assets.new.siemens.com/siemens/assets/api/uuid:c26453b3-980c-4fa9-bdfd-9c04c650f244/width:1024/2019-10-09-abfuellanlage-1.jpg"
                img-alt="Image"
                img-top>
          <b-table :items="itemsGeneral" stacked></b-table>
          <b-card-footer>
            <b-card-img src="https://new.siemens.com/etc.clientlibs/siemens-sites/components/content/header/clientlibs/resources/logo/siemens-logo-default.svg" bottom></b-card-img>
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
                img-top>
          <b-table :items="itemsGeneral" stacked></b-table>
          <b-card-footer>
            <b-card-img src="https://new.siemens.com/etc.clientlibs/siemens-sites/components/content/header/clientlibs/resources/logo/siemens-logo-default.svg" bottom></b-card-img>
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
          Listenpreis: '42.000€',
          Nutzungsdauer: '48 Monate',
          'Nutzungsdauer (Afa)': '60 Monate',
          'Kalk. Zinsen p.a.': '3.5%',
          '#': 'Leasing',
          'Preisnachlässe in €': '2000€',
          'Nominaler Zinssatz': '6.5%',
          'Anzahlung in €': '8000€',
          'Laufzeit in Monaten': 48,
          'Monatl. Rate in €': '250€',
          'Schlussrate in €': '0€',
          'Restwertvorgabe in €': '20.000€',
          Zinskosten: '6.026,27€',
          'altern. Zinserträge (3.5%)': '2.098,35€',
          SUMME: '8.124,62€',
        },

      ],
    };
  },
};
</script>

<style scoped>

</style>
