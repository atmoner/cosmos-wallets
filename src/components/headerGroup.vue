<template>
  <v-card
  border
    class="ma-2 pa-2" 
    justify="space-around"
  >
    <v-layout>
      <v-app-bar 
        density="compact"
      >
        <template v-slot:prepend>
          <v-btn :to="'/group/' + infoGroupId">Home group</v-btn>
          <v-btn :to="'/group/' + infoGroupId + '/policy'">Group policy</v-btn>
          <v-btn :to="'/group/' + infoGroupId + '/authz'">Group authz</v-btn>
          <v-btn :to="'/group/' + infoGroupId + '/create-proposal'">Group Proposal</v-btn> 
        </template>
 
        <template v-slot:append>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-app-bar>

      <v-main>
 
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
/* import { mapState } from 'vuex'
import axios from 'axios'
import { coins } from "@cosmjs/launchpad";
import { SigningStargateClient, AminoTypes } from "@cosmjs/stargate";
import { Registry, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { cosmos, cosmosProtoRegistry, cosmosAminoConverters } from 'interchain46';
import pkg from 'protobufjs';
const { Type, Field } = pkg;
import cosmosConfig from '~/cosmos.config'
import { notifWaiting, notifError, notifSuccess } from '~/libs/notifications'
 */
  export default {
    props: ['infoGroupId'],
    data () {
      return {
        allProps: [],
      }
    },
    computed: {
     /*  ...mapState('keplr', [`accounts`]),
      ...mapState('data', ['infoGroupId']) */
    },
    async mounted () {
      /* await this.$store.dispatch('data/getInfoGroupId', {id: this.$route.params.id, account: this.accounts[0].address} )
      console.log(this.infoGroupId)
      let allProps = this.allProps
      this.infoGroupId.policy.forEach(async (item) => {
        const getProps = await axios(cosmosConfig[0].apiURL + `/cosmos/group/v1/proposals_by_group_policy/` + item.address)
        const getPropsFinal = getProps.data.proposals
 
        getPropsFinal.forEach(async (itemFinal) => {
            //console.log(itemFinal)
            allProps.push(itemFinal)
        })
      }) */
    },

  }
</script>
<style>
.invertColor {
   -webkit-filter: invert(1);
   filter: invert(1);
   }

</style>
