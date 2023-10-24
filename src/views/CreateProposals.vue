<template>
  <v-row
    align="center"
    justify="center"
    dense
  >
    <v-col
      cols="12"
      lg="6"
      md="6"
      class="fill-height d-flex flex-column align-center"
    >
      <v-alert
        v-if="isSend"
        dense
        text
        color="#00b786"
        type="success"
        width="600"
      >
        Your proposal has been created! <strong>Click here</strong> to see the
        proposal
      </v-alert>
      <v-card
        class="accent"
        max-width="600"
      >
        <v-card-title>
          <span class="text-h5">Create BitCanna proposal (v1beta)</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="12"
              >
                <v-select
                  v-model="propType"
                  :items="items"
                  label="Proposal type"
                  required
                  outlined
                />
              </v-col>
              <v-col
                cols="12"
                sm="12"
              >
                <v-text-field
                  v-model="propTitle"
                  label="Proposal title"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="12"
              >
                <v-textarea
                  v-model="propText"
                  outlined
                  name="input-7-4"
                  label="Proposal text"
                  required
                />
                <!--     <div id="editor">
      <textarea :value="input" @input="update"></textarea>
      <div v-html="compiledMarkdown"></div>
    </div>      -->
              </v-col>

              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <v-text-field
                  v-model="initDeposit"
                  outlined
                  label="Initial Deposit (ubcna)"
                  required
                />
              </v-col>

              <v-col
                v-if="propType === 'Community Pool Spend Proposal'"
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="amountSpend"
                  outlined
                  label="Amount spend"
                  required
                />
              </v-col>
              <v-col
                v-if="propType === 'Community Pool Spend Proposal'"
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="receivingAddress"
                  outlined
                  label="Receiving address"
                  required
                />
              </v-col>
              <!-- <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="proposer" outlined label="Proposer" required></v-text-field>
              </v-col> -->

              <v-col
                v-if="propType === 'Software Upgrade Proposal'"
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="upgradeName"
                  outlined
                  label="Upgrade Name"
                  required
                />
              </v-col>
              <v-col
                v-if="propType === 'Software Upgrade Proposal'"
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                  v-model="upgradeHeight"
                  outlined
                  label="Upgrade Height"
                  required
                />
              </v-col>
              <v-col
                v-if="propType === 'Software Upgrade Proposal'"
                cols="12"
                sm="12"
                md="12"
              >
                <v-text-field
                  v-model="upgradeInfo"
                  outlined
                  label="Upgrade Info"
                  required
                />
              </v-col>

              <v-col
                v-if="propType === 'Parameter Change Proposal'"
                cols="12"
                sm="4"
                md="4"
              >
                <v-text-field
                  v-model="amountSpend"
                  outlined
                  label="Subspace"
                  required
                />
              </v-col>
              <v-col
                v-if="propType === 'Parameter Change Proposal'"
                cols="12"
                sm="4"
                md="4"
              >
                <v-text-field
                  v-model="receivingAddress"
                  outlined
                  label="Key"
                  required
                />
              </v-col>
              <v-col
                v-if="propType === 'Parameter Change Proposal'"
                cols="12"
                sm="4"
                md="4"
              >
                <v-text-field
                  v-model="receivingAddress"
                  outlined
                  label="Value"
                  required
                />
              </v-col>
            </v-row>
            <span 
              v-for="(textField, i) in textFields"              
              :key="i"
            >
              <!-- <v-text-field
              :label="textField.label1"
              v-model="textField.value1"
              ></v-text-field>

              <v-text-field
              :label="textField.label2"
              v-model="textField.value2"
              ></v-text-field> -->
              <v-row>
                <v-col
                  v-if="propType === 'Parameter Change Proposal'"
                  cols="12"
                >
                  <v-btn
                    class="error"
                    @click="remove(i)"
                  >
                    <v-icon large> mdi-delete-forever-outline </v-icon>
                  </v-btn>
                </v-col>
                <v-col
                  v-if="propType === 'Parameter Change Proposal'"
                  cols="12"
                  sm="4"
                  md="4"
                >
                  <v-text-field
                    v-model="amountSpend"
                    outlined
                    label="Subspace"
                    required
                  />
                </v-col>
                <v-col
                  v-if="propType === 'Parameter Change Proposal'"
                  cols="12"
                  sm="4"
                  md="4"
                >
                  <v-text-field
                    v-model="receivingAddress"
                    outlined
                    label="Key"
                    required
                  />
                </v-col>
                <v-col
                  v-if="propType === 'Parameter Change Proposal'"
                  cols="12"
                  sm="4"
                  md="4"
                >
                  <v-text-field
                    v-model="receivingAddress"
                    outlined
                    label="Value"
                    required
                  />
                </v-col>
              </v-row>
            </span>
            <v-btn
              v-if="propType === 'Parameter Change Proposal'"
              @click="add"
            >
              add
            </v-btn>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />

          <v-btn
            color="#00b786"
            @click="createProposalv1Beta"
          >
            Submit proposal
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>

import { useAppStore } from '@/store/app'
import cosmosConfig from '../cosmos.config'

export default {
  name: 'App', 
  data: () => ({
    search: '',
  }),
  setup() {
    const store = useAppStore()  
    return {
      store
    }
  }, 
  async mounted() {

  },
  methods: {

  }
}
</script>