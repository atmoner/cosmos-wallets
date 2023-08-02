<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">


      <div align="center"><h1>Supported chains</h1></div>
      <!--<v-card>
        <v-card-title class="headline justify-center">
          Keplr login
        </v-card-title>
        <v-card-text>
          <v-list-item v-for="item in accounts" :key="item.address" two-line>
            <v-list-item-content>
              <v-list-item-title>{{ item.id }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.address }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            v-on:click="connectKeplr"
            block

          >
          <img
            class="mr-2"
            src="/keplr.png"
            width="20"
            height="20"
          >
          Connect Keplr wallet
          </v-btn>
        </v-card-actions>
      </v-card>-->
      <br />


  <v-item-group>
    <v-container>
      <v-row>
        <v-col
          v-for="(item, index) in config"
          :key="index"
          cols="12"
          md="4"
          sm="8"
        >
          <v-item>
            <v-card
              dark
              height="200"
            >
            <v-card-title class="headline">
              <img :class="`rounded-xl mr-2`" style="vertical-align: middle" width="25" height="25" :srcset='item.coinLookup.icon'>
              {{ item.name }}
            </v-card-title>
            <v-card-text>
              {{ item.desc }}
            </v-card-text>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>


    </v-col>
  </v-row>
</template>

<script>

import cosmosConfig from '../cosmos.config'

export default {
  name: `SessionKeplrExtension`,
  layout: 'session',
  data: () => ({
    address: '',
    microAddress: '',
    config: cosmosConfig
  }),
  computed: {

  },
  methods: {
    logoutCall: async function (event) {

      //this.$cookies.remove('micro-address')
    },
  },
}
</script>
<style>
.cosmofolio-logo {
  height: 380px;
  width: 380px;
}
</style>
