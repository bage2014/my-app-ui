<template>
  <div id="app">
    <!-- App.vue -->

    <v-app>
      <v-navigation-drawer app>
        <!-- -->
        <nav-menu></nav-menu>
      </v-navigation-drawer>

      <v-app-bar app>
        <!-- -->
        <app-bar></app-bar>
      </v-app-bar>

      <!-- Sizes your content based upon application components -->
      <v-content>

        <!-- Provides the application the proper gutter -->
        <v-container fluid>

          <!-- If using vue-router -->
          <router-view></router-view>
        </v-container>
      </v-content>

      <v-footer app>
        <!-- -->
      </v-footer>
    </v-app>
  </div>
</template>

<script>

import NavMenu from '@/components/NavMenu'
import AppBar from '@/components/AppBar'


export default {  
  name: 'App',
  components: {
    'nav-menu': NavMenu,
    'app-bar': AppBar,
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
