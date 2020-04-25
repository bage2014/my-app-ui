<template>
    <v-app-bar
      absolute
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="toggleNavMenu()"></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
</template>


<script>

import Vue from 'vue'
import { eventBus } from "../main.js";
import NavMenu from '@/components/NavMenu'
import AppBar from '@/components/AppBar'

export default {  
  methods: {
    toggleNavMenu: function(){
      eventBus.$emit('toggleNavMenu', '')
    },
  },
}
</script>
