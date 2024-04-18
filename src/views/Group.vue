<template> 
        <v-row>
          <v-col
            cols="12"
          >
          <v-btn
          class="mb-4"
          elevation="2" 
          @click="createGroup()"
        > 
        Create your group
        </v-btn>
    <v-row 
      v-for="n in finalGroupData" :key="n.id"
      justify="space-around"
    >
      <v-col       
      > 
      <v-card :to="n.slut" >
        <v-img
          height="200px"
          :src="n.group_banner"
          cover
        >
          <v-card-title class="white--text ">
            <v-row no-gutters>
              <v-col
                cols="12"
                sm="4"
              >
              <v-avatar :image="n.group_icon" size="56" />  <span class="ml-4">{{ n.name }} </span>
              
              </v-col>
              <v-col
                cols="12"
                sm="4"
              >
             
              </v-col>
              <v-col
                cols="12"
                sm="4"
              >

              </v-col>
            </v-row>
 <br />
            <p class="ml-3">
              {{ n.description }}
            </p>
            <v-spacer />

          </v-card-title>
 
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-chip
              class="ma-2"
              variant="elevated"
              color="black"
              label
              text-color="white"
            >
              <v-icon start icon="mdi-account-outline"></v-icon>
              Members: {{ n.members.length }}
              
            </v-chip>
            <v-chip
              class="ma-2"
              variant="elevated"
              color="black"
              label
              text-color="white"
            >
            <v-icon start icon="mdi-vote-outline"></v-icon>
            Props: 0
              
            </v-chip>
            <v-chip
              class="ma-2"
              variant="elevated"
              color="black"
              label
              text-color="white"
            >
            <v-icon start icon="mdi-security"></v-icon>
            Policies: {{ n.policies.length }}
              
            </v-chip>
 
          </v-card-actions>
        </v-img>

      </v-card>
    </v-col>
    </v-row>

          </v-col>
        </v-row>

    <v-dialog
      v-model="modalCreateGroup"
      max-width="600px"
    >
    <v-card>
        <v-card-title class="text-h5">
          Create new group
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-title>
                  Group infomations
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-row>

                    <v-col cols="12">
                      <v-text-field
                        v-model="metadata"
                        label="Metadata"
                        type="text"
                        append-outer-icon="mdi-help-circle-outline"
                        @click:append-outer="redirectTo('https://docs.cosmos.network/v0.46/modules/group/01_concepts.html#group')"
                        required
                        variant="outlined"
                        dense
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-title>
                  Policy infomations
                </v-expansion-panel-title>
                <v-expansion-panel-text>

                  <v-row>
                    <v-col
                      cols="12"
                    >
                    <div class="text-right" @click="redirectTo('https://docs.cosmos.network/v0.46/modules/group/01_concepts.html#group-policy')">More information  <v-icon>mdi-help-circle-outline</v-icon></div>
                      <v-text-field
                        v-model="metadataPolicy"
                        label="Name"
                        required
                        variant="outlined"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-select
                        v-model="policyFinal"
                        :items="policyType"
                        label="Policy type"
                        variant="outlined"
                        dense
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-select
                        v-model="policyValueFinal"
                        :items="policyValue"
                        label="Policy value"
                        variant="outlined"
                        dense
                      ></v-select>
                    </v-col>

                    <v-col cols="12">
                      <v-select
                        v-model="votingPeriodFinal"
                        :items="timeSelect"
                        label="Voting period"
                        variant="outlined"
                        dense
                        item-title="text"
                        item-value="value"
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="minExecutionPeriod"
                        :items="timeSelect"
                        label="Min Execution Period"
                        variant="outlined"
                        dense

                        item-title="text"
                        item-value="value"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-title>
                  Admin infomations
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-row>
                    <v-col cols="12">

                      <v-text-field
                        v-model="adminName"
                        label="Your account name"
                        required
                        variant="outlined"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="adminVotingPower"
                        label="Voting power"
                        type="text"
                        required
                        variant="outlined"
                        dense
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            class="mb-5" 
            block
            @click="sendCreateGroup"
            :color="cosmosConfig[store.setChainSelected].color"
          >
            Create Group
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


<!-- {{ finalGroupData }} -->
</template> 
<script>
import {
  defaultRegistryTypes,
  assertIsDeliverTxSuccess,
  SigningStargateClient,
  GasPrice,
  calculateFee,
} from "@cosmjs/stargate";
import Long from "long";
import axios from 'axios'
import moment from "moment";
import { useAppStore } from '@/store/app'
import cosmosConfig from '../cosmos.config'
import actionsModals from '@/components/actionsModals.vue'
import propChart from '@/components/charts/propChart.vue'
import Markdown from 'vue3-markdown-it';
import { Countdown } from 'vue3-flip-countdown'
import { selectSigner, calculFee } from "../libs/signer";
import { PercentageDecisionPolicy } from "cosmjs-types/cosmos/group/v1/types";


export default {
  components: { actionsModals, propChart, Countdown, Markdown },
  data: () => ({
    cosmosConfig: cosmosConfig,
    finalGroupData: '',
    dataloaded: false,
    modalCreateGroup: false,

        textFields: [],
        metadata: '',
        metadataPolicy: '',
        policyType:  ['Percentage'],
        policyFinal: '',
        policyValue:  ['0.1', '0.5', '1'],
        policyValueFinal: '',
        timeSelect: [
          { text: '2 min', value: '120' },
          { text: '10 min', value: '600' },
          { text: '1 hour', value: '3600' },
          { text: '1 day', value: '86400' },
          { text: '1 week', value: '604800' }
        ],
        votingPeriodFinal: '',
        minExecutionPeriod: '',
        adminName: '',
        adminVotingPower: '1'    
  }),
  setup() {
    const store = useAppStore() 

    return {
      store
    }
  },
  
  async beforeMount() { 


    let finalGroupData = []
    for (let item of this.store.allGroup) { 
      console.log(item)
      const groupMembers = await axios(cosmosConfig[this.store.setChainSelected].apiURL + `/cosmos/group/v1/group_members/` + item.id)
      const groupPolicies = await axios(cosmosConfig[this.store.setChainSelected].apiURL + `/cosmos/group/v1/group_policies_by_group/` + item.id)

      try {
        const getMetadata = await axios(item.metadata)
        console.log(getMetadata.data.name)
        if (getMetadata.data.name) {
          finalGroupData.push({
            id: item.id,
            slut: '/group/' + item.id,
            name: getMetadata.data.name,
            description: getMetadata.data.description,
            group_url: getMetadata.data.group_website_url,
            group_icon: getMetadata.data.group_icon,
            group_banner: getMetadata.data.group_banner,
            members: groupMembers.data.members,
            policies: groupPolicies.data.group_policies
          })
        }

      } catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // (Note: the exact output may be browser-dependent)
      } 
    }  
    this.finalGroupData = finalGroupData
    console.log(finalGroupData) 
    this.dataloaded = true 
/*     this.store.allGroup.forEach(async (item) => {
      
      const groupMembers = await axios(cosmosConfig[this.store.setChainSelected].apiURL + `/cosmos/group/v1/group_members/` + item.id)
      const groupPolicies = await axios(cosmosConfig[this.store.setChainSelected].apiURL + `/cosmos/group/v1/group_policies_by_group/` + item.id)

      try {
        const getMetadata = await axios(item.metadata)
        console.log(getMetadata.data.name)
        if (getMetadata.data.name) {
          finalGroupData.push({
            id: item.id,
            slut: '/group/' + item.id,
            name: getMetadata.data.name,
            description: getMetadata.data.description,
            group_url: getMetadata.data.group_website_url,
            group_icon: getMetadata.data.group_icon,
            group_banner: getMetadata.data.group_banner,
            members: groupMembers.data.members,
            policies: groupPolicies.data.group_policies
          })
        }

      } catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // (Note: the exact output may be browser-dependent)
      } 



    })
    this.finalGroupData = finalGroupData
    console.log(finalGroupData) 
    this.dataloaded = true */
  },
  methods: {
    createGroup() {
      this.modalCreateGroup = true
    },
    async sendCreateGroup() {
      console.log(defaultRegistryTypes)
      let signer = await selectSigner(this.store.setChainSelected)
      const foundMsgType = defaultRegistryTypes.find(
          (element) =>
            element[0] ===
            "/cosmos.group.v1.MsgCreateGroupWithPolicy"
      );
      console.log(foundMsgType)

      const finalMsg = {
          typeUrl: foundMsgType[0],
          value: foundMsgType[1].fromPartial({
            admin: signer.accounts[0].address,
            groupMetadata: this.metadata,
            groupPolicyAsAdmin: false,
            groupPolicyMetadata: this.metadataPolicy,
            members: [{
              address: signer.accounts[0].address,
              weight: this.adminVotingPower,
              metadata: this.adminName
            }], // MemberRequest[],
            decisionPolicy: {
                typeUrl: '/cosmos.group.v1.PercentageDecisionPolicy',
                value: PercentageDecisionPolicy.encode({
                    percentage: this.policyValueFinal,
                    windows: {
                        votingPeriod: {
                            nanos: 0,
                            seconds: Long.fromValue(this.votingPeriodFinal)
                        },
                        minExecutionPeriod: {
                            nanos: 0,
                            seconds: Long.fromValue(this.minExecutionPeriod)
                        }
                    }
                }).finish()
            }
          }),
        }     
        console.log('createGroup', finalMsg)   
        try {          
          const result = await signer.client.signAndBroadcast(signer.accounts[0].address, [finalMsg], 'auto', '')
          console.log(result) 
        } catch (error) {
          console.error(error);  
        }          
    },
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