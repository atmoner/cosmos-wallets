<template>

<HeaderGroup :infoGroupId="infoGroupId" />  
 
<v-row justify="space-around">
    <v-col>
 
      
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="12"
        >
          <v-sheet border class="ma-2 pa-2" rounded="lg">

            
 
    <v-layout>
      <v-app-bar 
        density="compact"
      >
        <template v-slot:prepend>
          <h2>
            Group Policy
          </h2>

        </template>
 
        <template v-slot:append>
          <v-btn
                elevation="2"
                @click="openCreatePolicy()"
              >Create policy</v-btn>  
        </template>
      </v-app-bar>
      <v-main> 
      </v-main>
    </v-layout>
 
 
            <v-card-text class="text-h6 text-right">
  
                        
            </v-card-text>


            <!-- {{ store.finalGroupPolicies }} -->
            <v-table>
              <thead>
                <tr>
                    <th class="text-left">
                      Decision type
                    </th>
                    <th class="text-left">
                      Policy name
                    </th>
                    <th class="text-left">
                      Address
                    </th>
                    <th class="text-left">
                      Version
                    </th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in store.finalGroupPolicies"
                  :key="item.metadata"
                >
                <!-- {{ item }} -->
                    <td>
                      <v-chip  
                        color="green"
                        label
                        outlined
                      >
                        <span v-if="item.decisionPolicy.typeUrl === '/cosmos.group.v1.PercentageDecisionPolicy'">Percentage Decision</span>
                        <span v-else>Threshold Decision</span> 
                      </v-chip>
                    </td>                
                    <td>{{ item.metadata }}</td>
                    <td>                      
                      {{ this.truncateString(item.address, 25) }}
                      
                      <v-icon v-bind="props" color="grey-lighten-1" @click="copy(item.address)">
                        mdi-content-copy
                      </v-icon>
                    </td> 
                    <td>{{ item.version }}</td>
                    <td>     
                      <v-tooltip text="Soon">
                        <template v-slot:activator="{ props }"> 
                          <v-icon v-bind="props">
                            mdi-eye-outline
                          </v-icon>
                        </template>
                      </v-tooltip>      
                    </td> 
                      <td>
                      <v-tooltip text="Soon">
                        <template v-slot:activator="{ props }"> 
                          <v-icon v-bind="props">
                            mdi-comment-edit-outline
                          </v-icon>
                        </template>
                      </v-tooltip>             
                      
                    </td>
                </tr>
              </tbody>
            </v-table>
          </v-sheet>
        </v-col>
 
      </v-row>
      <br />
    </v-col>
    </v-row>    

    <v-dialog
      v-model="dialog"
      width="auto"
    >
    <v-card>
        <v-card-title>
          <span class="text-h5">Create new policy</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="metadata"
                  label="Name"
                  required
                  variant="outlined"

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
                ></v-select>
              </v-col>

              <v-col cols="12">
                <v-select
                  v-model="votingPeriodFinal"
                  :items="timeSelect"
                  label="Voting period"
                  variant="outlined"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="minExecutionPeriod"
                  :items="timeSelect"
                  label="Min Execution Period"
                  variant="outlined"
                ></v-select>
              </v-col>

            </v-row>
          </v-container> 
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
 
          <v-btn
            color="blue darken-1"
            block
            @click="createPolicy()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import {
  defaultRegistryTypes,
  assertIsDeliverTxSuccess,
  SigningStargateClient,
  GasPrice,
  calculateFee,
} from "@cosmjs/stargate";
import Long from 'long';
import { useAppStore } from '@/store/app'
import HeaderGroup from '@/components/headerGroup.vue'
import { selectSigner, calculFee } from "../libs/signer";

import { PercentageDecisionPolicy, ThresholdDecisionPolicy } from "cosmjs-types/cosmos/group/v1/types";

export default {
  
  components: { HeaderGroup },
  data: () => ({
    dialog: false,
    infoGroupId: '',
    textFields: [],
        metadata: '',
        policyType:  ['Threshold', 'Percentage'],
        policyFinal: '',
        policyValue:  ['0.1', '0.5', '1'],
        policyValueFinal: '',
        timeSelect: [
          { title: '10 min', value: '600' },
          { title: '1 hour', value: '3600' },
          { title: '1 day', value: '86400' },
          { title: '1 week', value: '604800' }
        ],
        votingPeriodFinal: '',
        minExecutionPeriod: '',    
  }),
  setup() {
    const store = useAppStore()
    return {
      store
    }
  },
  async mounted () {
    this.infoGroupId = this.$route.params.id
  },
  methods: {
    copy(value) {
      // Copy the text inside the text field
      navigator.clipboard.writeText(value);
    },
    openCreatePolicy () {
      this.dialog = true
    },
    async createPolicy () {
      console.log(this.metadata)
      console.log(this.policyFinal)
      console.log(this.policyValueFinal)
      console.log(this.votingPeriodFinal)
      console.log(this.minExecutionPeriod)
      console.log(defaultRegistryTypes)
      let signer = await selectSigner(this.store.setChainSelected)
      const foundMsgType = defaultRegistryTypes.find(
          (element) =>
            element[0] ===
            "/cosmos.group.v1.MsgCreateGroupPolicy"
      );
      console.log(foundMsgType)

      let finaldecisionPolicy = ''
      if (this.policyFinal === 'Threshold') {

        finaldecisionPolicy = {
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
      } else {
        finaldecisionPolicy = {
          typeUrl: '/cosmos.group.v1.ThresholdDecisionPolicy',
          value: ThresholdDecisionPolicy.encode({
              threshold: this.policyValueFinal,
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
      }

      const finalMsg = {
          typeUrl: foundMsgType[0],
          value: foundMsgType[1].fromPartial({
            admin: this.store.addrWallet,
            groupId: this.infoGroupId,
            metadata: this.metadata,
            decisionPolicy: finaldecisionPolicy
          }),
        }     
        console.log('createPolicy', finalMsg)   
        try {          
          const result = await signer.client.signAndBroadcast(signer.accounts[0].address, [finalMsg], 'auto', '')
          console.log(result) 
          await this.store.getAllGroups()
        } catch (error) {
          console.error(error);  
        }    
    },
    truncateString(str, num) {
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + '...'
    }
  }
}
</script>