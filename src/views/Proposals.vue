<template>
 
    <v-row no-gutters>
      <v-col
        v-for="n in store.allProposals"
        :key="n"
        cols="12"
        sm="6"
      >
      <router-link tag="li" style="text-decoration: none; color: inherit;" :to="'/proposal/' + n.proposal_id">
 
        <v-sheet border class="ma-2 pa-2" rounded="lg">          
          <v-row no-gutters>
            <v-col
              cols="12"
              sm="6" 
            >
              <v-sheet class="pa-2" >
                <span
                  class="d-inline-block text-truncate"
                  style="max-width: 300px;" 
                >
                #{{ n.proposal_id }} - {{ n.title }} 
                </span>
                
              </v-sheet>
              <v-sheet class="pa-2">
                Voted yes
              </v-sheet>
              <v-sheet class="pa-2">
                Voted no
              </v-sheet>
              <v-sheet class="pa-2">
                Voted no W/ Veto
              </v-sheet>
              <v-sheet class="pa-2">
                Abstain
              </v-sheet>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              class="text-end"
            >
              <v-sheet class="pa-2"> 
                <v-chip
                v-if="n.status === 'PROPOSAL_STATUS_VOTING_PERIOD'" 
                  color="orange"
                  text-color="white"
                  label
                >
                  <v-icon class="mr-1">
                    mdi-checkbox-marked-circle
                  </v-icon>
                  PROPOSAL VOTING PERIOD
                </v-chip> 
                <v-chip
                v-if="n.status === 'PROPOSAL_STATUS_PASSED'" 
                  color="green"
                  text-color="white"
                  label
                >
                  <v-icon class="mr-1">
                    mdi-checkbox-marked-circle
                  </v-icon>
                  Proposal Passed
                </v-chip>     
                <v-chip
                v-if="n.status === 'PROPOSAL_STATUS_REJECTED'" 
                  color="red"
                  text-color="white"
                  label
                >
                  <v-icon class="mr-1">
                    mdi-checkbox-marked-circle
                  </v-icon>
                  Proposal Passed
                </v-chip>             
              </v-sheet>
              <v-sheet class="pa-2">
                {{ n.final_tally_result.yes / 1000000 }}
                <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
                  {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}
                </strong> 
              </v-sheet>
              <v-sheet class="pa-2">
                {{ n.final_tally_result.no  / 1000000 }}
                <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
                  {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}
                </strong>
              </v-sheet>
              <v-sheet class="pa-2">
                {{ n.final_tally_result.no_with_veto / 1000000 }}
                <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
                  {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}
                </strong>
              </v-sheet> 
              <v-sheet class="pa-2">
                {{ n.final_tally_result.abstain / 1000000 }}
                <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
                  {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}
                </strong>
              </v-sheet>                
            </v-col>
          </v-row> 
        </v-sheet>
      </router-link>
      </v-col>
    </v-row> 
</template>
 
<script>
import { useAppStore } from '@/store/app'
import cosmosConfig from '../cosmos.config'

export default {
  name: 'App', 
  data: () => ({
    cosmosConfig: cosmosConfig,
 
 
  }),
  setup() {
    const store = useAppStore() 
    return {
      store
    }
  },
  computed: {

  },
  methods: {
 
    truncateString(str, num) {
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + '...'
    }
  }
}   
</script>