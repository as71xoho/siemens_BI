<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark">
        <b-navbar-brand href="#" v-b-toggle.sidebar-1>SIEMENS CLOWDY</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>

      <b-button to="/">Fabrik</b-button>
                <b-button to="versicherung">Versicherung</b-button>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div>
      <b-sidebar id="sidebar-1" title="Sidebar" shadow>
        <b-table :fields="itemsGeneralFields" :items="itemsGeneral">

          <template #cell(ID)="data">
            <b-button>Select Machine {{data.item.ID}}</b-button>
          </template>
        </b-table>
      </b-sidebar>
    </div>
    <div>
      <router-view/>
    </div>

  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return {

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

};
</script>
<style>
#app{
  background: #1e1e2f;
}
</style>
