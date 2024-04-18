<template>
  <v-row >
    <v-btn
      class="ml-5"
      dark
      icon
      @click.stop="dialog = true"

    >
      <v-icon
        color="darken-2"
      >
        mdi-account-plus
      </v-icon>
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Add user</span>
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
                  outlined
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="addressToAdd"
                  label="Address"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="votingPower"
                  label="Voting power"
                  required
                  outlined
                ></v-text-field>
              </v-col>

            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="addUser"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
//import { mapState } from 'vuex'
/* import axios from 'axios'
import { coins } from "@cosmjs/launchpad";
import { SigningStargateClient, AminoTypes } from "@cosmjs/stargate";
import { Registry, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { cosmos, cosmosProtoRegistry, cosmosAminoConverters } from 'interchain46';
import pkg from 'protobufjs';
const { Type, Field } = pkg;
import cosmosConfig from '~/cosmos.config'
import { notifWaiting, notifError, notifSuccess } from '~/libs/notifications'
 */
 import { useAppStore } from '@/store/app'
 import { selectSigner, calculFee } from "../libs/signer";
 import {
  defaultRegistryTypes,
  assertIsDeliverTxSuccess,
  SigningStargateClient,
  GasPrice,
  calculateFee,
} from "@cosmjs/stargate";


  export default {
    props: ['addressAdmin'],
    data () {
      return {
        dialog: false,
        votingPower: '',
        metadata: '',
        addressToAdd: '',
      }
    },
    setup() {
      const store = useAppStore()
      return {
        store
      }
    },    
    async mounted () {
      // console.log(this.$route.params.id)
    },
    methods: {
      async addUser() {
      console.log('add user')

      let signer = await selectSigner(this.store.setChainSelected)   

      const foundMsgType = defaultRegistryTypes.find(
        (element) =>
          element[0] ===
          "/cosmos.group.v1.MsgUpdateGroupMembers"
      );
      console.log(foundMsgType) // /cosmos.group.v1.MsgUpdateGroupMembers
      const finalMsg = {
        typeUrl: foundMsgType[0],
        value: foundMsgType[1].fromPartial({
          admin: this.store.addrWallet,
          groupId: this.$route.params.id,
          memberUpdates: [{
            address: this.addressToAdd,
            weight: this.votingPower,
            metadata: this.metadata
          }]
        }),
      }     
      console.log('/cosmos.group.v1.MsgUpdateGroupMembers', finalMsg)  
      
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





/*         var returnWaiting = notifWaiting(this.$toast)
        const { updateGroupMembers } = cosmos.group.v1.MessageComposer.withTypeUrl;
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

        const msg = updateGroupMembers({
            admin: this.addressAdmin,
            groupId: this.$route.params.id,
            memberUpdates: [{
              address: this.addressToAdd,
              weight: this.votingPower,
              metadata: this.metadata
            }]
        })
        const fee = {
          amount: coins(200, "utoken"),
          gas: "200000",
        };

        try {
          const result = await client.signAndBroadcast(accounts[0].address, [msg], fee)
          console.log(result)

          this.dialog = false
          this.$toast.dismiss(returnWaiting);
          // Send notification
          notifSuccess(this.$toast, result.transactionHash)

          await this.$store.dispatch('data/getInfoGroupId', { id: this.$route.params.id })
        } catch (e) {
            console.error(e);
            this.$toast.dismiss(returnWaiting);
            notifError(this.$toast)
            this.dialog = false
        } */


      }
    }
  }
</script>
