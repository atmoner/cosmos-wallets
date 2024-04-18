<template>
  <div>
  <v-container >
    <!-- Stack the columns on mobile by making one full-width and the other half-width -->
    <v-row>

<!--    <v-app-bar
      app
      flat
    >
      <v-container class="py-0 fill-height">


        <v-btn text :to="'/group/' + infoGroupId.id">
          Home
        </v-btn>
        <v-btn text :to="'/group/policy/' + infoGroupId.id">
          Policy
        </v-btn>
        <v-btn text :to="'/group/create-proposal/' + infoGroupId.id">
          Submit Proposal
        </v-btn>

        <v-spacer></v-spacer>

        <v-avatar
          class="mr-5"
          color="grey darken-1"
          size="32"
        ></v-avatar>
      </v-container>
    </v-app-bar>-->

      <v-col
        cols="12"
        md="12"
      >
        <v-card
          class="pa-2"
          rounded
        >
        <v-card-title>
          Proposal countdown <v-btn @click="voteNow()">Vote now!</v-btn>
        </v-card-title>
  
        <!-- <Countdown labelColor="white"  :deadlineISO="moment(store.finalGroupProposalId.proposal?.votingPeriodEnd.seconds.low, 'X').format('lll') " /> -->
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="8"
      >
        <v-card
          class="pa-2"
          rounded
          min-height="400"
        >
        <!-- <pre>{{ store.finalGroupProposalId.proposal }}</pre> -->
        <v-card-title>
          Detail proposal <!-- #{{ finalGroupProposalId.id }} -->
        </v-card-title>
        <v-table> 
          <tbody>
            <tr>
                <td>Title</td>
                <td>{{ store.finalGroupProposalId.proposal?.title }}</td>
              </tr>
              <tr>
                <td>Submit time</td>                
                <td>{{ moment(store.finalGroupProposalId.proposal?.submitTime.seconds.low, 'X').format('lll') }} </td>
              </tr>
              <tr>
                <td>Voting period end</td>
 
                <td>{{ moment(store.finalGroupProposalId.proposal?.votingPeriodEnd.seconds.low, 'X').format('lll') }} </td>
              </tr>
              <tr>
                <td>Proposers</td>
                <td>{{ store.finalGroupProposalId.proposal?.proposers[0] }}</td>
              </tr>
              <tr>
                <td>Group policy address</td>
                <td>{{ store.finalGroupProposalId.proposal?.groupPolicyAddress }}</td>
              </tr>
              <tr>
              <td>Status</td>
                <td> 
                  <v-chip
                    v-if="store.finalGroupProposalId.proposal?.status === 1"
                    color="orange"
                    label
                    outlined
                  >
                    Voting period
                    <!-- <VoteGroup
                      :addressAdmin="accounts[0].address"
                      :propId="proposal.id"
                    /> -->
                  </v-chip>
                  <v-chip
                    v-else-if="store.finalGroupProposalId.proposal?.status === 2"
                    color="green"
                    label
                    outlined
                  >
                    Complete
                  </v-chip>
                  <v-chip
                    v-else-if="store.finalGroupProposalId.proposal?.status === 3"
                    color="red"
                    label
                    outlined
                  >
                    Rejected
                  </v-chip> 
                </td>
               </tr>
          </tbody>
        </v-table>



 
        </v-card>
      </v-col>
      <v-col
        cols="6"
        md="4"
      >
        <v-card
          class="pa-2"
          min-height="400"
        >
        <v-card-title>
          Detail votes
        </v-card-title>
          <!-- <Doughnut
            :chart-options="chartProposalData.chartOptions"
            :chart-data="chartProposalData.chartData"
            :chart-id="chartId"
            :dataset-id-key="datasetIdKey"
            :plugins="plugins"
            :css-classes="cssClasses"
            :styles="styles"
            :width="width"
            :height="height"
            v-if="loaded"
          /> -->
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="6"
        md="4"
      >
        <v-card
          class="pa-2"
        >
          <v-card-title>
            All messages
            <v-spacer></v-spacer>
              <v-chip
                v-if="store.finalGroupProposalId.proposal?.status === 2"
                color="green"
                label
                outlined
              >
                RUN EXECUTOR
                <v-btn
      class="ml-5"
      dark
      icon
      @click.stop="dialogRunExecutor = true"

    >
      <v-icon
        color="darken-2"
      >
        mdi-gate-buffer
      </v-icon>
    </v-btn>

    <v-dialog
      v-model="dialogRunExecutor"
      max-width="600px"
    >
      <v-card>
        <v-card-title class="text-h5">
          Run executor #{{ propId }}
        </v-card-title>


        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            class="mb-5"
            dark
            @click="runExecutor"
          >
            Run executor
          </v-btn>


        </v-card-actions>
      </v-card>
    </v-dialog>
              </v-chip>
             <!--  <v-chip
                v-else-if="proposal.status === 'PROPOSAL_STATUS_REJECTED'"
                color="red"
                label
                outlined
              >
                CAN NOT EXECUTOR
              </v-chip>
              <v-chip
                v-else-if="proposal.executor_result === 'PROPOSAL_EXECUTOR_RESULT_NOT_RUN'"
                color="orange"
                label
                outlined
              >
                EXECUTOR NOT RUN
              </v-chip>
              <v-chip
                v-else-if="proposal.executor_result === 'PROPOSAL_EXECUTOR_RESULT_FAILURE'"
                color="red"
                label
                outlined
              >
                EXECUTOR FAILURE
              </v-chip>
              <v-chip
                v-else-if="proposal.executor_result === ''"
                color="red"
                label
                outlined
              >
                EXECUTOR FAILURE
                </v-chip> -->
          </v-card-title>
          <v-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Type
                  </th>
                  <th class="text-left">
                    View
                  </th>

                </tr>
              </thead>
              <tbody>
                 <tr
                  v-for="item in store.finalGroupProposalId.proposal?.messages" 
                  :key="item.to_address"
                >
                  <td>{{ item.typeUrl }}</td>
                  <td>{{ item.finalAmount }}</td> 
                </tr>
              </tbody>
            </template>
          </v-table>
        </v-card>
      </v-col>
      <v-col
        cols="6"
        md="8"
      >
        <v-card
          class="pa-2"
        >
          <v-card-title>
            All Voters
            <v-spacer></v-spacer>
            <!--  <v-chip> {{ proposalAllVote.length }} votes</v-chip> -->
          </v-card-title>
          <v-table>
          <thead>
            <tr>
              <th class="text-left">
                Voter name
              </th>
              <th class="text-left">
                Voter address
              </th>
              <th class="text-left">
                Option
              </th>
              <th class="text-left">
                Submit time
              </th>
            </tr>
          </thead>
          <tbody>
                <tr
                  v-for="item in proposalAllVote"
                  :key="item.to_address"
                >
                  <td><v-chip>{{ item.name }}</v-chip></td>
                  <td>{{ item.voter }}</td>
                  <td> 
                    <v-chip
                      v-if="item.option === 'VOTE_OPTION_YES'"
                      color="green"
                      label
                      outlined
                    >
                      Yes
                    </v-chip>
                    <v-chip
                      v-if="item.option === 'VOTE_OPTION_NO'"
                      color="red"
                      label
                      outlined
                    >
                      No
                    </v-chip>
                    <v-chip
                      v-if="item.option === 'VOTE_OPTION_NO_WITH_VETO'"
                      color="orange"
                      label
                      outlined
                    >
                      No with veto
                    </v-chip>

                  </td>
                  <td>{{ item.submit_time }}</td>

                </tr> 
          </tbody>
        </v-table>
 
        </v-card>
      </v-col>
    </v-row>
 
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card>
        <v-card-text>
          <v-item-group selected-class="bg-primary">
    <v-container>
      <v-row>
        <v-col
          v-for="n in 4"
          :key="n"
          cols="12"
          md="6"
        >
          <v-item v-slot="{ isSelected, selectedClass, toggle }">
            <v-card
              :class="['d-flex align-center', selectedClass]"
              dark
              height="100"
              @click="toggle"
            >
              <div
                class="text-h3 flex-grow-1 text-center"
              >
                {{ isSelected ? 'Selected' : 'Click Me!' }}
              </div>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary"   @click="voteGroup()">Vote!</v-btn>
          <v-btn color="primary"   @click="dialog = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
  </div>
</template>
<script>
import { useAppStore } from '@/store/app'
import axios from 'axios' 
import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import { selectSigner, calculFee } from "../libs/signer";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'
//import FlipCountdown from 'vue2-flip-countdown'
import {Countdown} from 'vue3-flip-countdown'
//import cosmosConfig from '~/cosmos.config'
import moment from "moment"
import {
  defaultRegistryTypes,
  assertIsDeliverTxSuccess,
  SigningStargateClient,
  GasPrice,
  calculateFee,
} from "@cosmjs/stargate";

const fmt = "YYYY-MM-DD HH:mm:ss"

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  components: {
    DoughnutChart,
    Countdown
    //FlipCountdown
  },
  props: {
    chartId: {
      type: String,
      default: 'doughnut-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    loaded: false,
    period_end: '',
    dialog: false,
    dialogRunExecutor: false,
    moment: moment,
    proposalAllVote: [],
  }),
  setup() {
    const store = useAppStore() 
    return {
      store
    }
  },

  async mounted () {
 
    /* if (!this.logged) {
      this.$router.push({path: "/login"})
      return
    } */
    console.log('this.$route.params.id', this.$route.params.id_prop)
    await this.store.getGroupProposalsId(this.$route.params.id_prop)
    try {
      axios.get('https://api.chihuahua.wtf/cosmos/group/v1/votes_by_proposal/' + this.$route.params.id_prop)
        .then(response => {
          console.log(response.data)
          this.proposalAllVote = response.data.votes
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          //this.loading = false
        }) 
 
        this.loaded = true
    } catch (e) {
      console.error(e)
    }
    console.log(this.proposal)
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

    formatDateCountDown(dateStr) {
      return Intl.DateTimeFormat("en-US",
        {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false
        }).format(new Date(dateStr))
    },
  },
  methods: {
    async runExecutor() {
      console.log('run executor')

      let signer = await selectSigner(this.store.setChainSelected)   

      const foundMsgType = defaultRegistryTypes.find(
        (element) =>
          element[0] ===
          "/cosmos.group.v1.MsgExec"
      );
      console.log(foundMsgType) // /cosmos.group.v1.MsgExec
      const finalMsg = {
        typeUrl: foundMsgType[0],
        value: foundMsgType[1].fromPartial({
          proposalId: this.$route.params.id_prop,
          executor: signer.accounts[0].address
        }),
      }     
      console.log('/cosmos.group.v1.MsgExec', finalMsg)  
      
      try {          
          const result = await signer.client.signAndBroadcast(signer.accounts[0].address, [finalMsg], 'auto', '')
          assertIsDeliverTxSuccess(result)
          console.log(result)
          this.txResult = result
          this.step3 = false;
          this.step4 = true;
        } catch (error) {
          console.error(error); 
          this.step3 = false;
          this.step2 = true;
        }        


      this.dialogRunExecutor = false
    },
    async voteGroup() {
      console.log('vote group')
      

      let signer = await selectSigner(this.store.setChainSelected)   

      const foundMsgType = defaultRegistryTypes.find(
        (element) =>
          element[0] ===
          "/cosmos.group.v1.MsgVote"
      );
      console.log(foundMsgType) // /cosmos.group.v1.MsgVote

      const finalMsg = {
          typeUrl: foundMsgType[0],
            value: foundMsgType[1].fromPartial({
              proposalId: 2,
              voter: signer.accounts[0].address,
              option: 1,
              metadata: ''
            }),
          }     
          console.log('/cosmos.group.v1.MsgVote', finalMsg)   
        try {          
          const result = await signer.client.signAndBroadcast(signer.accounts[0].address, [finalMsg], 'auto', '')
          assertIsDeliverTxSuccess(result)
          console.log(result)
          this.txResult = result
          this.step3 = false;
          this.step4 = true;
        } catch (error) {
          console.error(error); 
          this.step3 = false;
          this.step2 = true;
        }             
    },
    voteNow() {
      console.log('vote!')
      this.dialog = true
    }

  }
}
</script>
