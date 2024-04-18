<template>
 
  <v-row justify="space-around">

    <v-col>
 
    <HeaderGroup :infoGroupId="infoGroupId" />  
 
    <v-row no-gutters>
        <v-col
          cols="12"
          sm="6"
        >
          <v-sheet border class="ma-2 pa-2" rounded="lg">
            <v-card-title>Proposal config</v-card-title>
            <v-card-text class="text-h6 text-right"> 
              <v-text-field
                v-model="title"
                label="Title proposal"
                required 
                variant="outlined"
              ></v-text-field>
  
              <v-select
                v-model="selectPolicy"   
                label="Select policy"
                :items="finalGroupPolicies"
                variant="outlined"
              ></v-select>
 
 
                      <v-text-field
                      v-model="store.addrWallet"
                      
                        label="Proposers"
                        required
                        variant="outlined"
                        disabled
                      ></v-text-field>     
                      <!-- <v-select
                        v-model="selectMsgType"
                        :items="items"
                        label="Select"
                        multiple
                        chips
                        outlined
                        hint="Select type action of sdk"
                        persistent-hint
                      ></v-select>    --> 
            </v-card-text>
            <v-card-text class="text-h6">
              <v-card-title>Configure your group proposal</v-card-title> 
              
 
    <v-tabs
      v-model="tab" 
    >
      <v-tab value="bank">Bank</v-tab>
      <v-tab value="staking">Staking</v-tab>
      <v-tab value="distribution">Distribution</v-tab>
      <v-tab value="four">Group</v-tab>
      <v-tab value="five">Authz</v-tab>
      <v-tab value="six">CosmWasm</v-tab>
    </v-tabs>
    <v-card-text> 
        <v-window v-model="tab">
        <v-window-item value="bank"> 
          <v-row no-gutters>
            <v-col
              v-for="(n, index) in allSdkMessages[0].bank[0]"
              :key="n"
              cols="12"
              sm="4"
            >
            <v-sheet border class="mt-3 mr-2  pa-2" rounded="lg" @click="selectedDialog(index, n)">
              <v-col>
              <h3> {{ index }}
                <v-icon
                  v-if="n"
                  color="teal"
                  class="ml-2"
                >
                  mdi-check
                </v-icon>
                <v-tooltip v-else text="Coming soon">
                  <template v-slot:activator="{ props }"> 
                      <v-icon
                        v-bind="props"
                        color="red"  
                        class="ml-2" 
                      >
                        mdi-alert-circle
                      </v-icon>
                  </template>
                </v-tooltip>
              </h3> 
              </v-col>            
            </v-sheet>
            </v-col>
          </v-row>    
        </v-window-item>

        <v-window-item value="staking">
          <v-row no-gutters>
            <v-col 
              v-for="(n, index) in allSdkMessages[0].staking[0]"
              :key="n"
              cols="12"
              sm="4"
            >
            <v-sheet border class="mt-3 mr-2  pa-2" rounded="lg" @click="selectedDialog(index, n)">
              <v-col>
                <h3>{{ index }}
                  <v-icon
                  v-if="n"
                  color="teal"
                  class="ml-2"
                >
                  mdi-check
                </v-icon>
                <v-tooltip v-else text="Coming soon">
                  <template v-slot:activator="{ props }"> 
                      <v-icon
                        v-bind="props"
                        color="red"  
                        class="ml-2" 
                      >
                        mdi-alert-circle
                      </v-icon>
                  </template>
                </v-tooltip>               
                </h3> 
              </v-col>            
            </v-sheet>
            </v-col>
          </v-row> 
        </v-window-item>

        <v-window-item value="distribution">
          <v-row no-gutters>
            <v-col 
              v-for="(n, index) in allSdkMessages[0].distribution[0]"
              :key="n"
              cols="12"
              sm="4"
            >
            <v-sheet border class="mt-3 mr-2  pa-2" rounded="lg" @click="selectedDialog(index, n)">
              <v-col>
                <h3>{{ index }}
                  <v-icon
                  v-if="n"
                  color="teal"
                  class="ml-2"
                >
                  mdi-check
                </v-icon>
                <v-tooltip v-else text="Coming soon">
                  <template v-slot:activator="{ props }"> 
                      <v-icon
                        v-bind="props"
                        color="red"  
                        class="ml-2" 
                      >
                        mdi-alert-circle
                      </v-icon>
                  </template>
                </v-tooltip>               
                </h3> 
              </v-col>            
            </v-sheet>
            </v-col>
          </v-row> 
          
        </v-window-item>
        <v-window-item value="four">
          <v-row no-gutters>
            <v-col 
              v-for="(n, index) in allSdkMessages[0].group[0]"
              :key="n"
              cols="12"
              sm="4"
            >
            <v-sheet border class="mt-3 mr-2  pa-2" rounded="lg" @click="selectedDialog(index, n)">
              <v-col>
                <h3>{{ index }}
                  <v-icon
                  v-if="n"
                  color="teal"
                  class="ml-2"
                >
                  mdi-check
                </v-icon>
                <v-tooltip v-else text="Coming soon">
                  <template v-slot:activator="{ props }"> 
                      <v-icon
                        v-bind="props"
                        color="red"  
                        class="ml-2" 
                      >
                        mdi-alert-circle
                      </v-icon>
                  </template>
                </v-tooltip>              
                </h3> 
              </v-col>            
            </v-sheet>
            </v-col>
          </v-row> 
          
        </v-window-item> 
      <v-window-item value="five">
          <v-row no-gutters>
            <v-col 
              v-for="(n, index) in allSdkMessages[0].authz[0]"
              :key="n"
              cols="12"
              sm="4"
            >
            <v-sheet border class="mt-3 mr-2  pa-2" rounded="lg" @click="selectedDialog(index, n)">
              <v-col>
                <h3>{{ index }}
                  <v-icon
                  v-if="n"
                  color="teal"
                  class="ml-2"
                >
                  mdi-check
                </v-icon>
                <v-tooltip v-else text="Coming soon">
                  <template v-slot:activator="{ props }"> 
                      <v-icon
                        v-bind="props"
                        color="red"  
                        class="ml-2" 
                      >
                        mdi-alert-circle
                      </v-icon>
                  </template>
                </v-tooltip>              
                </h3> 
              </v-col>            
            </v-sheet>
            </v-col>
          </v-row> 
          
        </v-window-item>
 
      <v-window-item value="six">
          <v-row no-gutters>
            <v-col
              v-for="n in allSdkMessages[0].cosmwasm"
              :key="n"
              cols="12"
              sm="4"
            >
            <v-sheet border class="mt-3 mr-2  pa-2" rounded="lg">
              <v-col>
                <h3><!-- {{ n }} -->Coming soon</h3> 
                
              </v-col>            
            </v-sheet>
            </v-col>
          </v-row> 
          
        </v-window-item>
      </v-window>
    </v-card-text>
    <v-card-text>
 
    </v-card-text>
              
<!--               <v-sheet v-for="(item,i) in items"
                    :key="i" 
                    border class="mt-3 pa-2" rounded="lg"
                    >
                    <v-row>
                      <v-col>
                      {{ item }}
                      </v-col>
                      <v-col class="text-right">
 
                      <v-btn                       
                        @click="selectedDialog(item)"
                      >
                        Add type
                      </v-btn>

                      </v-col>
                    </v-row>
              </v-sheet>  -->
            </v-card-text>
          </v-sheet>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
<!--         <v-sheet border class="ma-2 pa-2" rounded="lg">
            <v-card-title>Draft messages  
 
              <v-btn
                elevation="2"
                @click="clearMsgs()" 
              >Clear</v-btn> 
            </v-card-title>
            <v-card-text class="text-h6 text-right"> </v-card-text> 
            <v-expansion-panels focusable>
                  <v-expansion-panel
                    v-for="(item,i) in selectMsgType"
                    :key="i"
                  >
                    <v-expansion-panel-title>{{ item }}</v-expansion-panel-title>
                    <v-expansion-panel-text v-if="item === 'SendTx'">
                      <messagesTypeSendTx :from="selectPolicy" />
                    </v-expansion-panel-text>
                    <v-expansion-panel-text v-if="item === 'Delegate'">
                      <messagesTypeDelegateTx :from="selectPolicy" />
                    </v-expansion-panel-text>
                    <v-expansion-panel-text v-if="item === 'Create Validator'">
                      <messagesTypeCreateVal :from="selectPolicy" />
                    </v-expansion-panel-text>
                    <v-expansion-panel-text v-if="item === 'CosmWasm'">
                      <messagesTypeCosmwasmTx :from="selectPolicy" />
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
  
          </v-sheet> -->
          <v-sheet border class="ma-2 pa-2" rounded="lg">
            <v-card-title>Final group proposal 
               <v-btn
                elevation="2"
                @click="clearFinalMsgs()" 
              >Clear</v-btn> 

            </v-card-title>
            <v-card-text class="text-h6 text-right"> </v-card-text>
            <!-- {{ store.finalGroupPropMsg }} --> 
             <v-expansion-panels>
              <v-expansion-panel
                v-for="(item,i) in finalMessages"
                :key="i"             
                 
              >  
              <v-expansion-panel-title :color="cosmosConfig[store.setChainSelected].color"> {{ item }} </v-expansion-panel-title>
              <v-expansion-panel-text v-if="item === 'Send'"> 
                <messagesTypeSendTx :from="selectPolicy" />
              </v-expansion-panel-text>
              <v-expansion-panel-text v-if="item === 'Delegate'"> 
                <messagesTypeDelegateTx :from="selectPolicy" />
              </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels> 
 
            <v-table v-if="store.finalGroupPropMsg.length > 0">
              <thead>
                <tr>
                  <th class="text-left">
                    Name
                  </th>
                  <th class="text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in store.finalGroupPropMsg"
                  :key="item.name"
                >
                  <td>{{ item.titleMsg }}</td>
                  <td>
                    <v-btn
                      elevation="2"
                      icon="mdi-eye-arrow-right-outline"
                      @click="openDialogDetail(index)"
                    > 
                    </v-btn>
                    <v-btn
                      elevation="2"
                      icon="mdi-delete-forever"
                      @click="deleteMsgGroup(index)"
                    > 
                    </v-btn>
                    
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-sheet> 
        </v-col>
        
        </v-row>
         <v-btn
          elevation="2" 
          @click="createProposal()"
        > 
        Create proposal
        </v-btn> 
<br /><br /><br /><br />
    </v-col>
  </v-row>



    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-text>
          <div v-if="selectedDialogMsg === 'SendTx'">
            <messagesTypeSendTx :from="selectPolicy" />
          </div>
          <div v-if="selectedDialogMsg === 'Delegate'">
            <messagesTypeDelegateTx :from="selectPolicy" />
          </div>
          <div v-if="selectedDialogMsg === 'CosmWasm'">
            <messagesTypeCosmwasmTx :from="selectPolicy" />
          </div>
          <div v-if="selectedDialogMsg === 'PropText'">
            <messagesTypePropText :from="selectPolicy" />
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogDetail"
      width="500"
    >
      <v-card>
        <v-card-text>
          test {{ store.finalGroupPropMsg[dialogDetailData]  }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialogDetail = false">Close Dialog</v-btn>
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
import { selectSigner, calculFee } from "../libs/signer";

import { useAppStore } from '@/store/app'
import messagesTypeSendTx from '@/components/messagesType/sendTx.vue'
import messagesTypeDelegateTx from '@/components/messagesType/delegateTx.vue'
import messagesTypeCosmwasmTx from '@/components/messagesType/cosmwasmTx.vue'
import messagesTypePropText from '@/components/messagesType/propText.vue'
import HeaderGroup from '@/components/headerGroup.vue'
import { setMsg } from "../libs/msgType";
import cosmosConfig from '../cosmos.config'

import * as bank from "cosmjs-types/cosmos/bank/v1beta1/tx.js"; 

export default {
  components: {
    messagesTypeSendTx,
    messagesTypeDelegateTx,
    messagesTypeCosmwasmTx,
    messagesTypePropText,
    HeaderGroup
  },
  data: () => ({
    cosmosConfig: cosmosConfig,
    title: '',
    selectMsgType: [],
    selectPolicy: [],
    allSdkMessages: [{
      'bank': [
        { 
          'Send': true,
          'Multi send': true
        } 
      ],
      'staking': [
        { 
          'Delegate': true,
          'Undelegate': true,
          'Redelegate': true,
          'Cancel Unbonding': false 
        }  
      ],
      'distribution': [
        { 
          'Set Withdraw Address': false, 
          'Withdraw Reward': true,
          'Fund Community Pool': true 
        }         
      ],
      'group': [
        { 
          'Update Members': true, 
          'Update Metadata': false,
          'Create Policy': false,
          'Update Policy Admin': false,
          'Update Policy DecisionPolicy': false,
          'Update Policy Metadata': false 
        }    
      ],
      'authz': [ 
        {
          'Grant': true, 
          'Revoke': true, 
          'Exec': true, 
        }
      ],
    }],
    
    items: [
      'SendTx',
      'Delegate',
      'PropText',
      'Undelegate',
      'Withdraw Delegator',
      //'Create Validator',
      'CosmWasm',
    ],
    finalGroupPolicies: [],
    finalMessages: [],
    dialog: false,
    selectedDialogMsg: '',
    dialogDetail: false,
    dialogDetailData: '',
    infoGroupId: '',
    tab: 'one',
  }),
  setup() {
    const store = useAppStore()  
    return {
      store
    }
  }, 
  mounted() {
    this.infoGroupId = this.$route.params.id

    let finalGroupPolicies = this.finalGroupPolicies
    this.store.finalGroupPolicies.forEach(async (item) => {
      console.log('finalGroupPolicies', item)
      finalGroupPolicies.push( item.address )
    }) 

    let bankTx = new bank.MsgClientImpl()

    for (const key in bankTx) {
      if(key !== "rpc") { 
        const typeUrl = bank['Msg' + key].typeUrl
        let finalvalue = ''
        try {
          BigInt.prototype.toJSON = function() { return this.toString() } 
          finalvalue = JSON.stringify(bank['Msg' + key].fromPartial({}), null, 4) 
          console.log('Msg' + key, finalvalue)
        } catch (e) {
          console.log(e)
        }
      }
    }
  },
  methods: {
    async createProposal() {
      console.log('createProposal', defaultRegistryTypes)

      let signer = await selectSigner(this.store.setChainSelected)     

      const foundMsgType = defaultRegistryTypes.find(
        (element) =>
          element[0] ===
          "/cosmos.group.v1.MsgSubmitProposal"
      );   
      
      const finalMsg = {
        typeUrl: foundMsgType[0],
        value: foundMsgType[1].fromPartial({           
            groupPolicyAddress: this.selectPolicy,
            proposers: [signer.accounts[0].address],
            metadata: "",
            messages: this.store.finalGroupPropMsgType,
            exec: 0,
            title: this.title,
            summary: "test",
        }),
      };
      console.log(finalMsg)
      try {
        const result = await signer.client.signAndBroadcast(signer.accounts[0].address, [finalMsg], "auto", '') 
        console.log(result)
 
        } catch (e) {
          console.error(e); 
        }
      
    },
    openDialogDetail(item) {
      this.dialogDetail = true
      this.dialogDetailData = item
    },
    clearMsgs() {
      this.selectMsgType = [] 
    },
    clearFinalMsgs() { 
      this.store.finalGroupPropMsg = []
      this.finalMessages = []
    },
    addMessage(type) {
      
      this.selectMsgType.push(type)
    }, 
    selectedDialog(item, n) {
      console.log('selectedDialog', n) 
      if (n)
        this.finalMessages.push(item)
      //this.selectedDialogMsg = item
      //this.dialog = true
    },
    deleteMsgGroup(index) {
      this.store.finalGroupPropMsg.splice(index, 1)
    },
  }
}
</script>

<!-- <script>
import { mapState } from 'vuex'
import axios from 'axios'
import { coins } from "@cosmjs/launchpad";
import { SigningStargateClient, AminoTypes } from "@cosmjs/stargate";
import { Registry, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { cosmos, cosmosProtoRegistry, cosmosAminoConverters } from 'interchain46';
import pkg from 'protobufjs';
const { Type, Field } = pkg;
import cosmosConfig from '~/cosmos.config'
import { notifWaiting, notifError, notifSuccess } from '~/libs/notifications'

export default {
data: () => ({
  title: '',
  selectPolicy: '',
  selectMsgType: '',
  finalGroupData: '',
  allProps: [],
  allExec: [],
  allVotes: [],
  search: '',
  columnName:'id',
  isDescending:true,
  allPolicy: [],

  items: [
    'SendTx',
    'Delegate',
    'Undelegate',
    'Withdraw Delegator',
    //'Create Validator',
    'CosmWasm',
  ],

}),
computed: {
  ...mapState('keplr', [`accounts`, `initialized`, `error`, `logged`, `logout`]),
  ...mapState('data', [`myGroup`, 'infoGroupId', 'policyGroupId', 'finalMsgProp'])
},
watch: {
  // whenever question changes, this function will run
  selectPolicy(newQuestion, oldQuestion) {
    // console.log(newQuestion)
  }
},
async mounted () {

  if (!this.logged) {
    this.$router.push({path: "/login"})
    return
  }
  await this.$store.dispatch('data/getPolicyGroupId', this.$route.params.id)
  await this.$store.dispatch('data/resetFinalMsgProp')

  let allPolicy = this.allPolicy
  this.infoGroupId.policy.forEach(async (item) => {
    allPolicy.push({ text: item.metadata, value: item.address })
  })



},
methods: {
    async createProposal() {

      var returnWaiting = notifWaiting(this.$toast)

      const { submitProposal } = cosmos.group.v1.MessageComposer.withTypeUrl;
      const registry = new Registry(cosmosProtoRegistry);

      const chainId = cosmosConfig[0].chainId;
      await window.keplr.enable(chainId);
      const offlineSigner = await window.getOfflineSignerAuto(chainId);
      const accounts = await offlineSigner.getAccounts();

      const client = await SigningStargateClient.connectWithSigner(
        cosmosConfig[0].rpcURL,
        offlineSigner,
        { registry: registry, aminoTypes: new AminoTypes({ ...cosmosAminoConverters })  }
      )
      const msg = submitProposal({
          groupPolicyAddress: this.selectPolicy,
          metadata: this.title,
          proposers: [accounts[0].address],
          messages: this.finalMsgProp
      })
//         const fee = {
//           amount: coins(200, "udao"),
//           gas: "200000",
//         };
      const fee = {
        amount: coins(200, "utoken"),
        gas: "200000",
      };
         /* const fee = {
            amount: [
              {
                denom: cosmosConfig[0].coinLookup.chainDenom,
                amount: '5000',
              },
            ],
            gas: '200000',
          } */
      console.log(fee)

      try {
        const result = await client.signAndBroadcast(accounts[0].address, [msg], fee)
        console.log(result)

        this.$toast.dismiss(returnWaiting);
        // Send notification
        notifSuccess(this.$toast, result.transactionHash)
        // await this.$store.dispatch('data/getMyGroup', accounts[0].address)
      } catch (e) {
          console.error(e);
          this.$toast.dismiss(returnWaiting);
          notifError(this.$toast)
      }


    }

}
}
</script> -->
 