<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark">
        <b-navbar-brand href="#">SIEMENS CLOWDY</b-navbar-brand>

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
      <router-view/>
    </div>

  </div>
</template>

<style>
#app{
  background: #1e1e2f;
}
</style>
