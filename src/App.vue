<template>
  <v-app id="inspire">
    <nav-menu
      v-model="drawer"
      app
    >
    </nav-menu>

    <app-bar >
    </app-bar>

    <v-content app>
      <v-container
        class="fill-height"
        fluid
      >
         <!-- If using vue-router -->
          <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>

  import NavMenu from '@/components/NavMenu'
  import AppBar from '@/components/AppBar'
  import { eventBus } from "./main.js";

  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    name: 'App',
    components: {
      'nav-menu': NavMenu,
      'app-bar': AppBar,
    },
    methods: {
      toggleNavMenu: function(){
        eventBus.$emit('toggleNavMenu', '')
      },
    }
  }
</script>

<style scoped>
  .fill-height {
    margin-top: 48px;

  }
</style>