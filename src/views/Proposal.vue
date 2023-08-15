<template> 
  
  <v-row  no-gutters>
    <v-col
      cols="12"
      sm="12"
    >
    <v-sheet border class="ma-2 pa-2" rounded="lg">  
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="6"
        >
          <v-sheet class="text-h6 pa-2">
            {{ propData?.title }} 
          </v-sheet>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-sheet class="text-right text-h6 pa-2">
            <v-chip
              v-if="propData?.status === 'PROPOSAL_STATUS_PASSED'"
              label
              color="green"
            >
              PROPOSAL PASSED
            </v-chip>
            <v-chip
              v-if="propData?.status === 'PROPOSAL_STATUS_VOTING_PERIOD'"
              label
              color="orange"
            >
              PROPOSAL VOTING PERIOD
            </v-chip>
            <v-chip
              v-if="propData?.status === 'PROPOSAL_STATUS_REJECTED'"
              label
              color="red"
            >
              PROPOSAL REJECTED
            </v-chip>            
          </v-sheet>
        </v-col>
      </v-row> 
 

      
      <Countdown v-if="dataLoaded && propData.status === 'PROPOSAL_STATUS_VOTING_PERIOD'" labelColor="white" :deadlineISO="propData.voting_end_time" 
        :mainColor="cosmosConfig[store.setChainSelected].colorChart[0]" 
        :secondFlipColor="cosmosConfig[store.setChainSelected].colorChart[1]"
      />
    </v-sheet>
    </v-col>
 
    <v-col
      cols="12"
      sm="6"
    >
 
    <v-sheet v-if="propData?.status === 'PROPOSAL_STATUS_VOTING_PERIOD'" border class="ma-2 pa-2" rounded="lg">
      <v-table>
          <tbody>
            <tr>
              <td>Voted?</td>
 
              <td> 
                <v-icon color="success" icon="mdi-check-bold" size="large"></v-icon>
                
              </td> 
              <td>
                <span v-if="isVoted?.vote.option === 'VOTE_OPTION_YES'" style="color: green;">
                <v-sheet class="pa-1" color="green" text-color="white" rounded="lg">
                  <v-icon class="mr-1">
                    mdi-checkbox-marked-circle
                  </v-icon>
                  Yes
                </v-sheet>
              </span>
              <span v-if="isVoted?.vote.option === 'VOTE_OPTION_NO'" style="color: red;">
                <v-sheet class="pa-1" color="green" text-color="white" rounded="lg">
                  <v-icon class="mr-1">
                    mdi-checkbox-marked-circle
                  </v-icon>
                  Yes
                </v-sheet>
              </span> 
              <span v-if="isVoted?.vote.option === 'VOTE_OPTION_NO_WITH_VETO'" style="color: red;">No with veto </span>
              <span v-if="isVoted?.vote.option === 'VOTE_OPTION_ABSTAIN'" style="color: red;">Abstain </span>
              </td>
            </tr>
        
  
          </tbody>
        </v-table>
    </v-sheet>  
      <v-sheet border class="ma-2 mt-4 pa-2" rounded="lg">
        <v-table>
          <tbody v-if="dataLoaded"> 
            <tr>
              <td>Proposale type</td>
              <td> 
                <v-chip 
                  v-if="propData?.type === '/cosmos.gov.v1beta1.TextProposal'"
                  label 
                >
                  Text Proposal
                </v-chip>                
                <v-chip 
                  v-if="propData?.type === '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal'"
                  label 
                >
                  Community Pool Spend Proposal
                </v-chip>   
                <v-chip 
                  v-if="propData?.type === '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal'"
                  label 
                >
                  Software Upgrade Proposal
                </v-chip>  
                <v-chip 
                  v-if="propData?.type === '/cosmos.upgrade.v1beta1.MsgSoftwareUpgrade'"
                  label 
                >
                  Software Upgrade Proposal
                </v-chip> 
                <v-chip 
                  v-if="propData?.type === '/ibc.core.client.v1.ClientUpdateProposal'"
                  label 
                >
                  IBC Client Update Proposal
                </v-chip>  
                <v-chip 
                  v-if="propData?.type === '/cosmos.params.v1beta1.ParameterChangeProposal'"
                  label 
                >
                  Parameter Change Proposal
                </v-chip>  
                
              </td>
              <td></td>
            </tr>
            <tr>
              <td>Submit time</td>
              <td>{{ formatDate(propData.submit_time) }}</td>
              <td>{{ timeFromNow(propData.submit_time) }}</td>
            </tr>
            <tr>
              <td>Voting start time</td>
              <td>{{ formatDate(propData.voting_start_time) }}</td>
              <td>{{ timeFromNow(propData.voting_start_time) }}</td>
            </tr>  
            <tr>
              <td>Voting end time</td>
              <td>{{ formatDate(propData.voting_end_time) }} </td>
              <td>{{ timeFromNow(propData.voting_end_time) }}</td>
            </tr>           
          </tbody>
        </v-table>
 

      </v-sheet>
    </v-col>
      <v-col
        cols="12"
        sm="6"
      >
      <v-sheet border class="ma-2 pa-2" rounded="lg">
        <propChart 
          :propData="propData"
          :tally="propTalyData"
        />
      </v-sheet>
    </v-col>
    <v-col
      cols="12"
      sm="12"
    >
      <v-sheet border class="ma-2 pa-2" rounded="lg">
        
        <v-table>
          <tbody>
            <tr >
              <td>          
                <v-sheet class="text-h6">
                  {{ propData?.title }} 
                </v-sheet>
              </td>
              
              <td>
              <v-spacer></v-spacer>
                <actionsModals 
                v-if="propData?.status === 'PROPOSAL_STATUS_VOTING_PERIOD'"
                type="voteGovernance"  
                :chain="cosmosConfig[store.setChainSelected]" 
                :propData="propData"
              /> 
            </td>
            </tr>
            <tr>
              <td> <Markdown xhtmlOut="true" linkify="true" breaks="true" :source="propData?.description" /> </td>
            </tr>            
          </tbody>
        </v-table>
      </v-sheet>

    </v-col>
  </v-row>
</template> 
<script>
import moment from "moment";
import { useAppStore } from '@/store/app'
import cosmosConfig from '../cosmos.config'
import actionsModals from '@/components/actionsModals.vue'
import propChart from '@/components/charts/propChart.vue'
import Markdown from 'vue3-markdown-it';
import { Countdown } from 'vue3-flip-countdown'

export default {
  components: { actionsModals, propChart, Countdown, Markdown },
  data: () => ({
    cosmosConfig: cosmosConfig,
    propData: null,
    propTalyData: null,
    isVoted: null,
    dataLoaded: false
  }),
  setup() {
    const store = useAppStore() 

    return {
      store
    }
  },
  async mounted() { 
    this.propData = await this.store.getProposalId(this.$route.params.id)
    this.propTalyData = await this.store.getProposalIdVote(this.$route.params.id) 

    if (this.propData.status === 'PROPOSAL_STATUS_VOTING_PERIOD') 
      this.isVoted = await this.store.propIsVoted(this.$route.params.id)
  
    this.dataLoaded = true
  },
  methods: {
    formatNum(nombre){
      return new Intl.NumberFormat().format(nombre)
    },
    formatDate(dateStr) {
      return Intl.DateTimeFormat("us-EN", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      }).format(new Date(dateStr))
    }, 
    timeFromNow: (dateStr) => moment(dateStr).fromNow(),
    timeToNow: (dateStr) => moment(dateStr).toNow(),
  }
}
</script>