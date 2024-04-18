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
        mdi-gate-buffer
      </v-icon>
    </v-btn>

    <v-dialog
      v-model="dialog"
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
            @click="voteGroup"
          >
            Run executor
          </v-btn>


        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapState } from 'vuex'
import axios from 'axios'
import { coins } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import pkg from 'protobufjs';
const { Type, Field } = pkg;
import cosmosConfig from '~/cosmos.config'

  export default {
    props: ['addressAdmin', 'propId'],
    data () {
      return {
        dialog: false,
        textFields: [],
        metadata: '',
        dislableSend: false,
        selected: [],
        cards: [
          { title: 'Yes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 5 },
          { title: 'No', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 5 },
          { title: 'NoWithVeto', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 5 },
          { title: 'Abstain', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 5 },
        ],
      }
    },
    methods: {
      add () {
          this.textFields.push({
            label1: "Address",
            value1: "",
            label2: "weight",
            value2: "",
            label3: "Metadata",
            value3: ""
          })
      },

      remove (index) {
          this.textFields.splice(index, 1)
      },
      async voteGroup() {

        const MsgExec = new Type("MsgExec")
          .add(new Field("proposal_id", 1, "uint64"))
          .add(new Field("executor", 2, "string"))

        const typeUrl = "/cosmos.group.v1.MsgExec";
        const registry = new Registry([[typeUrl, MsgExec]]);

        const chainId = cosmosConfig[0].chainId;
        await window.keplr.enable(chainId);
        const offlineSigner = await window.getOfflineSignerAuto(chainId);
        const accounts = await offlineSigner.getAccounts();

        const client = await SigningStargateClient.connectWithSigner(
          cosmosConfig[0].rpcURL,
          offlineSigner,
          { registry: registry }
        )

        const msg = {
          typeUrl,
          value: {
            proposal_id: this.propId,
            executor: accounts[0].address
          },
        };
        const testSim = await client.simulate(accounts[0].address, [msg], '')
        console.log(testSim)
        const fee = {
          amount: coins(200000, "ubcna"),
          gas: (testSim * 10).toString(),
        };
        console.log(msg)


        try {
          const result = await client.signAndBroadcast(accounts[0].address, [msg], fee)
          console.log(result)
          // this.$nuxt.$emit('eventVote', true)
        } catch (e) {
            console.error(e);
        }


      }
    }
  }
</script>
