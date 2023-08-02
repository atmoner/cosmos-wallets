<template>
  <v-container> 
  <v-card 
    v-if="cosmosConfig[store.setChainSelected].modules.wasm"
    class="mx-auto"
    :color="cosmosConfig[store.setChainSelected].color" 
    max-width="900"
  >
    <v-card-text>
      <v-text-field
        v-model="search"
        :loading="loading"
        density="compact"
        variant="solo"
        label="Search Smartcontrat"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:append-inner="onClick"
      ></v-text-field>
    </v-card-text>
  </v-card>
  <v-card 
    v-else
    class="mx-auto" 
    max-width="900"
  >
    <v-card-text>
      Wasm is not enable on this chain
    </v-card-text>
  </v-card>
  <v-card
    v-if="returnSearch"
    class="mt-4 mx-auto" 
    max-width="900"
  >
    <v-card-text> 
        <v-table>
          <tbody>
            <tr>
              <td>Contract Name</td>
              <td>{{ returnSearch.contractInfo.label }}</td>
            </tr>
            <tr>
              <td>Code Id</td>
              <td>{{ returnSearch.contractInfo.codeId }}</td>
            </tr>
            <tr>
              <td>Contract address</td>
              <td>{{ returnSearch.address }}</td>
            </tr>
            <tr>
              <td>Creator</td>
              <td>{{ returnSearch.contractInfo.creator }}</td>
            </tr>
            <tr>
              <td>Admin</td>
              <td>{{ returnSearch.contractInfo.admin }}</td>
            </tr>
            <tr>
              <td>Created block</td>
              <td>{{ returnSearch.contractInfo.created.blockHeight }}</td>
            </tr>
          </tbody>
        </v-table>
    </v-card-text>
  </v-card>
  </v-container>
</template>
<script>
import {
  SigningCosmWasmClient,
  CosmWasmClient
} from "@cosmjs/cosmwasm-stargate";
import { fromBase64, fromHex } from "@cosmjs/encoding";
import {
  decodeTxRaw
} from "@cosmjs/proto-signing";

import { useAppStore } from '@/store/app'
import cosmosConfig from '../cosmos.config'

export default {
  name: 'App', 
  data: () => ({
    search: '',
    loading: false,
    wasmClient: null,
    returnSearch: null,
    cosmosConfig: cosmosConfig
  }),
  setup() {
    const store = useAppStore()  
    return {
      store
    }
  }, 
  async mounted() {
    
    const chainId = cosmosConfig[this.store.setChainSelected].chainId;
    
    await window.keplr.enable(chainId);
    const offlineSigner = await window.getOfflineSignerAuto(chainId);
    const client2 = await CosmWasmClient.connect(cosmosConfig[this.store.setChainSelected].rpcURL);
    console.log(client2.queryClient.wasm)
    this.wasmClient = client2.queryClient.wasm
    //console.log(await client2.queryClient.wasm.getAllContractState('chihuahua1taheysd5agm8jxh3zv8r545nazsg2ye0samdn55g7jexnsz678hqwpzwz9'))
    //console.log(await client2.queryClient.wasm.listCodeInfo())


    /* for (let i = 160; i < 170; i++) {
      let returnData = await client2.queryClient.wasm.listContractsByCodeId(i) 
      //console.log(returnData)
      //console.log(returnData.contracts.length - 1)
      if(returnData.contracts.length > 0) {
        let returnData2 = await client2.queryClient.wasm.getContractInfo(returnData.contracts[returnData.contracts.length - 1])
        console.log(returnData2)
      }
    } */
  },
  methods: {
    async onClick() {
      this.loading = true;
      console.log(this.search)
      let returnSearch = await this.wasmClient.getContractInfo(this.search)
      console.log(returnSearch)
      this.returnSearch = returnSearch
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
  }
}
</script>