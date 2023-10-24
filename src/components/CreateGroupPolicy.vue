<template>
  <v-row>
  <v-spacer></v-spacer>
    <v-btn

      dark
      @click.stop="dialog = true"
    >
      Create policy
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="600px"
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
                  outlined

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
                  outlined
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
                  outlined
                ></v-select>
              </v-col>

              <v-col cols="12">
                <v-select
                  v-model="votingPeriodFinal"
                  :items="timeSelect"
                  label="Voting period"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="minExecutionPeriod"
                  :items="timeSelect"
                  label="Min Execution Period"
                  outlined
                ></v-select>
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
            @click="createPolicy"
          >
            Save
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
import { SigningStargateClient, AminoTypes } from "@cosmjs/stargate";
import { Registry, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { cosmos, cosmosProtoRegistry, cosmosAminoConverters } from 'interchain46';
import pkg from 'protobufjs';
const { Type, Field } = pkg;
import Long from 'long';
import cosmosConfig from '~/cosmos.config'
import { notifWaiting, notifError, notifSuccess } from '~/libs/notifications'

  export default {
    props: ['addressAdmin'],
    data () {
      return {
        dialog: false,
        textFields: [],
        metadata: '',
        policyType:  ['Threshold', 'Percentage'],
        policyFinal: '',
        policyValue:  ['0.1', '0.5', '1'],
        policyValueFinal: '',
        timeSelect: [
          { text: '10 min', value: '600' },
          { text: '1 hour', value: '3600' },
          { text: '1 day', value: '86400' },
          { text: '1 week', value: '604800' }
        ],
        votingPeriodFinal: '',
        minExecutionPeriod: '',
      }
    },
    async mounted () {
      console.log(this.$route.params.id)
    },
    methods: {
      async createPolicy() {

        var returnWaiting = notifWaiting(this.$toast)

        const { createGroupPolicy } = cosmos.group.v1.MessageComposer.withTypeUrl;
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

        const {
            PercentageDecisionPolicy,
            ThresholdDecisionPolicy
        } = cosmos.group.v1;

        console.log(this.votingPeriodFinal)


        let finaTypeUrl = ''
        let finaValue = ''
        let msg = ''
        if (this.policyFinal === 'Threshold') {
          msg = createGroupPolicy({
              admin: accounts[0].address,
              groupId: this.$route.params.id,
              metadata: this.metadata,
              decisionPolicy: {
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
          })
        } else {
          msg = createGroupPolicy({
              admin: accounts[0].address,
              groupId: this.$route.params.id,
              metadata: this.metadata,
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
          })
        }


        const fee = {
          amount: coins(200, "ubcna"),
          gas: "200000",
        };
        console.log(msg)
        try {
          const result = await client.signAndBroadcast(accounts[0].address, [msg], fee)
          console.log(result)
          await this.$store.dispatch('data/getPolicyGroupId', this.$route.params.id)

          this.dialog = false
          this.$toast.dismiss(returnWaiting);
          // Send notification
          notifSuccess(this.$toast, result.transactionHash)

        } catch (e) {
            console.error(e);
            this.$toast.dismiss(returnWaiting);
            notifError(this.$toast)
            this.dialog = false
        }


      }
    }
  }
</script>
