<template>

<HeaderGroup :infoGroupId="infoGroupId" />  
  <v-row justify="space-around">
    <v-col>
 
      
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="6"
        >
          <v-sheet border class="ma-2 pa-2" rounded="lg">
            <v-card-title>Group Amount</v-card-title>
            <v-card-text class="text-h6 text-right">{{ store.finalAmountGroup }} {{ cosmosConfig[this.store.setChainSelected].coinLookup.viewDenom }}</v-card-text>
          </v-sheet>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
        <v-sheet border class="ma-2 pa-2" rounded="lg">
          <v-card-title>Group Reward</v-card-title>
          <v-card-text class="text-h6 text-right">{{ (totalReward / 1000000).toFixed(5) }} {{ cosmosConfig[this.store.setChainSelected].coinLookup.viewDenom }}</v-card-text>
        </v-sheet>
        </v-col>
      </v-row>
      <br />
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="8"
        >
        <v-sheet min-height="300" min-width="300" border class="ma-2 pa-2" rounded="lg">
            <v-card-title>
              All proposals

            </v-card-title>
 
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">
                    Id
                  </th>
                  <th class="text-left">
                    Status
                  </th>
                  <th class="text-left">
                    Name
                  </th> 
                  <th class="text-left">
                    Total messages
                  </th> 
                  <th class="text-left">
                    Submit Time
                  </th>
                  <th class="text-left">
                    Date end
                  </th>
                  <th class="text-left"> </th>
                </tr>
              </thead>
              <tbody>
 
                <tr 
                  
                  v-for="item in store.finalGroupProposals"
                  :key="item.id"
                > 
                  <td>#{{ item.id }}</td>
                  <td>
                    <!-- PROPOSAL_STATUS_SUBMITTED -->
                    <v-chip
                      v-if="item.status === 1"
                      class="ma-2"
                      color="orange"
                      label
                      outlined
                    >
                      Voting period
                      <!-- <VoteGroup
                        :addressAdmin="accounts[0].address"
                        :propId="item.id"
                      /> -->
                    </v-chip>
                    <!-- PROPOSAL_STATUS_ACCEPTED -->
                    <v-chip
                      v-if="item.status === 2"
                      class="ma-2"
                      color="green"
                      label
                      outlined
                    >
                      RUN EXECUTOR
                      <RunExe
                        :addressAdmin="accounts[0].address"
                        :propId="item.id"
                      />
                    </v-chip>
                    <!-- PROPOSAL_STATUS_REJECTED --> 
                    <v-chip
                      v-else-if="item.status === 3" 
                      class="ma-2"
                      color="red"
                      label
                      outlined
                    >
                      PROPOSAL REJECTED
                    </v-chip>
                    <v-tooltip 
                      v-if="item.status === 3" 
                      location="top"
                      width="500"
                      text="Final status of a proposal when the final tally is done and the outcome is rejected by the group policy's decision policy.">
                        <template v-slot:activator="{ props }"> 
                          <v-icon v-bind="props" color="grey-lighten-1">
                            mdi-comment-question
                          </v-icon>
                        </template>
                    </v-tooltip>
                    <v-chip
                      v-else-if="item.executor_result === 'PROPOSAL_EXECUTOR_RESULT_NOT_RUN'"
                      class="ma-2"
                      color="orange"
                      label
                      outlined
                    >
                      EXECUTOR NOT RUN
                    </v-chip>
                    <v-chip
                      v-else-if="item.executor_result === 'PROPOSAL_EXECUTOR_RESULT_FAILURE'"
                      class="ma-2"
                      color="red"
                      label
                      outlined
                    >
                      EXECUTOR FAILURE
                    </v-chip>
                    <v-chip
                      v-else-if="item.executor_result === ''"
                      class="ma-2"
                      color="red"
                      label
                      outlined
                    >
                      EXECUTOR FAILURE
                    </v-chip>                    
                    <!-- {{ item.status }} -->
                  </td>
                  <td>{{ item.title }}</td> 
                  <td>{{ item.messages.length }} </td>
                  <td>{{ moment(item.submitTime.seconds.low, 'X').format('lll') }}</td>                  
                  <td>{{ moment(item.votingPeriodEnd.seconds.low, 'X').format('lll') }}</td>
                  <v-btn
                    elevation="2"
                    :to="'../group/' + infoGroupId + '/proposal/' + item.id"  

                  >View</v-btn>
 
                </tr>
 
              </tbody>
            </v-table>   
 
       
<!--             <v-data-table
              :headers="headers"
              :items="allProps"

              :sort-by.sync="columnName"
              :sort-desc.sync="isDescending"
              :items-per-page="5"
            >
              <template #item.id="{ item }">
                #{{ item.id }}
              </template>
              <template #item.status="{ item }">

                <v-chip
                  v-if="item.status === 'PROPOSAL_STATUS_SUBMITTED'"
                  class="ma-2"
                  color="orange"
                  label
                  outlined
                >
                  Voting period
                  <VoteGroup
                    :addressAdmin="accounts[0].address"
                    :propId="item.id"
                  />
                </v-chip>
                <v-chip
                  v-else-if="item.status === 'PROPOSAL_STATUS_ACCEPTED'"
                  class="ma-2"
                  color="green"
                  label
                  outlined
                >
                  Complete
                </v-chip>
                <v-chip
                  v-else-if="item.status === 'PROPOSAL_STATUS_REJECTED'"
                  class="ma-2"
                  color="red"
                  label
                  outlined
                >
                  Rejected
                </v-chip>
              </template>
              <template #item.submit_time="{ item }">
                {{ item.submit_time | formatDate }}
              </template>
              <template #item.voting_period_end="{ item }">
                {{ item.voting_period_end | formatDate }}
              </template>
              <template #item.executor_result="{ item }">
                <v-chip
                  v-if="item.status === 'PROPOSAL_STATUS_ACCEPTED'"
                  class="ma-2"
                  color="green"
                  label
                  outlined
                >
                  RUN EXECUTOR
                  <RunExe
                    :addressAdmin="accounts[0].address"
                    :propId="item.id"
                  />
                </v-chip>
                <v-chip
                  v-else-if="item.status === 'PROPOSAL_STATUS_REJECTED'"
                  class="ma-2"
                  color="red"
                  label
                  outlined
                >
                  CAN NOT EXECUTOR
                </v-chip>
                <v-chip
                  v-else-if="item.executor_result === 'PROPOSAL_EXECUTOR_RESULT_NOT_RUN'"
                  class="ma-2"
                  color="orange"
                  label
                  outlined
                >
                  EXECUTOR NOT RUN
                </v-chip>
                <v-chip
                  v-else-if="item.executor_result === 'PROPOSAL_EXECUTOR_RESULT_FAILURE'"
                  class="ma-2"
                  color="red"
                  label
                  outlined
                >
                  EXECUTOR FAILURE
                </v-chip>
                <v-chip
                  v-else-if="item.executor_result === ''"
                  class="ma-2"
                  color="red"
                  label
                  outlined
                >
                  EXECUTOR FAILURE
                </v-chip>
              </template>
              <template #item.group_policy_address="{ item }">
                <v-btn
                  elevation="2"
                  :to="'../proposal/' + item.id"

                >View</v-btn>
              </template>
            </v-data-table> -->
          </v-sheet>
        </v-col>

        <v-col
          cols="12"
          sm="4"
        >
        <v-sheet min-height="300" min-width="300" border class="ma-2 pa-2" rounded="lg">
            <v-card-title>
              All users


              <!-- <AddMembersGroup
                v-if="infoGroupId.isAdmin"
                :addressAdmin="accounts[0].address"
              /> -->
            </v-card-title>
            <v-table>
              <thead>
                <tr>
                    <th class="text-left">
                      Status
                    </th>
                    <th class="text-left">
                      Address
                    </th>
                    <th class="text-left">
                      Weight
                    </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in store.finalGroupMembers.members"
                  :key="item.member.address"
                >
                    <td>{{ item.member.metadata }}</td>
                    <td>{{ this.truncateString(item.member.address, 15) }}</td>
                    <td>{{ item.member.weight }}</td>
                </tr>
              </tbody>
            </v-table>
 
          </v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="12"
        >
        <v-sheet min-height="300" min-width="300" border class="ma-2 pa-2" rounded="lg">
            <v-card-title>
              Last execute
              <v-spacer></v-spacer>

            </v-card-title>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Proposal
                    </th>
                    <th class="text-left">
                      Tx hash
                    </th>
                    <th class="text-left">
                      Date
                    </th>
                  </tr>
                </thead>
                <!--<tbody>

                  <tr
                    v-for="item in allExec"
                    :key="item"
                  >
                  {{ item }}
                     <td>#{{ item.logs[0].events[2].attributes[1].value.replaceAll('"', '')  }}</td>
                    <td>{{ item.txhash  }}</td>
                    <td>{{ item.timestamp | formatDate }}</td>

                    <td> </td>
                    <td>
                    </td>
                  </tr>
                </tbody>-->
              </template>
            </v-simple-table>
          </v-sheet>
        </v-col>
      </v-row>

    </v-col>
  </v-row>
</template>
<script>
import cosmosConfig from '../cosmos.config'
import { useAppStore } from '@/store/app'
import moment from 'moment'


import HeaderGroup from '@/components/headerGroup.vue'

/* import { mapState } from 'vuex'
import axios from 'axios'
import { coins } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import pkg from 'protobufjs';
const { Type, Field } = pkg;
import cosmosConfig from '~/cosmos.config' */

export default {
components: { HeaderGroup },
data: () => ({
  cosmosConfig: cosmosConfig,
  finalGroupData: '',
  moment: moment,
  allProps: [],
  allExec: [],
  allVotes: [],
  search: '',
  columnName:'id',
  isDescending:true,
  totalAmount: '',
  totalReward: '',
  infoGroupId: '',
  headers: [
    {
      text: 'Id',
      align: 'start',
      sortable: true,
      value: 'id',
    },
    { text: 'status', value: 'status' },
    { text: 'Metadata', value: 'metadata' },
    { text: 'Submit time', value: 'submit_time' },
    { text: 'Voting period end', value: 'voting_period_end' },
    { text: 'Exec', value: 'executor_result' },
    { text: 'Policy', value: 'group_policy_address' },

  ],
  links: [
        'Dashboard',
        'Messages',
        'Profile',
        'Updates',
      ],
}),
setup() {
    const store = useAppStore()
    return {
      store
    }
  },
/* computed: {
  ...mapState('keplr', [`accounts`, `initialized`, `error`, `logged`, `logout`]),
  ...mapState('data', [`myGroup`, 'infoGroupId', 'policyAmount', 'policyAmountReward', 'totalAmountLoaded', 'policyGroupIdLoaded']),

}, */

async mounted () {

  console.log(this.$route.params.id)
  this.infoGroupId = this.$route.params.id
  await this.store.getGroupId(this.$route.params.id)

/*   if (!this.logged) {
    this.$router.push({path: "/login"})
    return
  }
  this.$nuxt.$on('eventVote', ($event) => this.test($event))
  await this.$store.dispatch('data/getInfoGroupId', {id: this.$route.params.id, account: this.accounts[0].address} )
  //await this.$store.dispatch('data/getPolicyAmount', this.infoGroupId.policy)
  //console.log(this.infoGroupId)


  const getVoteByUser = await axios(cosmosConfig[0].apiURL + `/cosmos/group/v1/votes_by_voter/` + this.accounts[0].address)
  // console.log(getVoteByUser)



  let allProps = this.allProps
  this.infoGroupId.policy.forEach(async (item) => {
    const getProps = await axios(cosmosConfig[0].apiURL + `/cosmos/group/v1/proposals_by_group_policy/` + item.address)
    const getPropsFinal = getProps.data.proposals
//       let findVoteByUser = getPropsFinal.find(element => element.id === getVoteByUser.data.votes.id);
//       console.log(getVoteByUser)
    getPropsFinal.forEach(async (itemFinal) => {
        //console.log(itemFinal)
        allProps.push(itemFinal)
    })
  })

  let allExec = this.allExec
  this.infoGroupId.policy.forEach(async (item) => {
    const getExec = await axios(cosmosConfig[0].apiURL + `/cosmos/tx/v1beta1/txs?events=message.action=%27/cosmos.group.v1.MsgExec%27&message.sender=%27`+item.address+`%27`)
    // console.log(getExec.data.tx_responses[0].logs[0].events[2].attributes[1].value)
    getExec.data.tx_responses.forEach(async (itemFinal) => {
      //console.log(itemFinal)
      allExec.push(itemFinal)
    })

  })
  if (this.policyGroupIdLoaded) {
    var copieAmount = 0;
    var copieReward = 0;

    for (let i = 0; i < this.infoGroupId.policy.length; i++) {
      let returnGroupAmount = await axios(cosmosConfig[0].apiURL + `/cosmos/bank/v1beta1/balances/` + this.infoGroupId.policy[i].address)
      let returnGroupReward = await axios(cosmosConfig[0].apiURL + `/cosmos/distribution/v1beta1/delegators/` + this.infoGroupId.policy[i].address + `/rewards`)

      if ( typeof returnGroupAmount.data.balances[0]?.amount !== 'undefined' ) {
        copieAmount += Number(returnGroupAmount.data.balances[0]?.amount)
      } else {
        copieAmount += Number(0)
      }

      if ( typeof returnGroupReward.data.total[0]?.amount !== 'undefined' ) {
        copieReward += Number(returnGroupReward.data.total[0]?.amount)
      } else {
        copieReward += Number(0)
      }

    }


    this.totalAmount = copieAmount
    this.totalReward = copieReward
  } */
 //this.groupAmount = await axios(cosmosConfig[0].apiURL + `/cosmos/bank/v1beta1/balances/` + item.address)
},
filters: {
  formatDate: (dateStr) =>
    Intl.DateTimeFormat("us-EN",
      {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false
      }).format(new Date(dateStr)),
},
methods: {
  test(e) {
    console.log('test ok >>', e)
  },
  truncateString(str, num) {
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + '...'
    },
    formatDate: (dateStr) =>
      Intl.DateTimeFormat("us-EN",
        {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false
        }).format(new Date(dateStr)),
}
} 
</script>
<style>

.outline-border {
border-top: 0px solid;

}

.outline-border:after {
display:block;
content: '';
height:4px;
background:#B148ED;
transform: scaleX(0.0001);
transition: transform 250ms ease-in-out;
box-shadow: inset -40px 0px 30px -25px #5e0591, inset 40px 0px 30px -25px #5e0591;
}
.outline-border:hover:after {
transform: scaleX(1);
}
</style>
