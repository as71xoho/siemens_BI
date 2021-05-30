<template>
  <div id="app">
    <div>
      <b-button v-b-toggle.sidebar-1>Toggle Sidebar</b-button>
      <b-sidebar id="sidebar-1" title="Sidebar" shadow>
        <div class="px-3 py-2">
          <b-button to="/">Fabrik</b-button>
<b-button to="versicherung">Versicherung</b-button>
        </div>
      </b-sidebar>
      <router-view/>
    </div>

  </div>
</template>

<style>
#app{
  background: #1e1e2f;
}
</style>
