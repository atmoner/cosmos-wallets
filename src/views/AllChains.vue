<template> 
      <v-row>
        <v-col
          v-for="chain in store.finalAllaWalletsData"
          :key="chain.chainConfig"
          cols="12"
          md="4"
        >
 
  <v-card
    class="mt-4 mx-auto" 
    :title="chain.chainConfig.name" 
    :subtitle="chain.chainConfig.desc"
  >
  <template v-slot:prepend>
      <v-avatar>
        <v-img
          :src="chain.chainConfig.coinLookup.icon"
          :alt="chain.chainConfig.name"
          max-height="64"
          max-width="64"
        ></v-img>
      </v-avatar>
    </template>  

    <v-card-text >

      <v-sheet
      class="v-sheet--offset mb-4" 
      elevation="12" 
    > 
      <trend
        :data="chain.historicPrice"
        :gradientDirection="bottom"
        :gradient="['#f72047', '#ffd200', '#1feaea']"
        :padding="6.7"
        :radius="7.7" 
        auto-draw
        smooth>
      </trend> 
    </v-sheet>

      <div class="text-h6 font-weight-light mb-2">
        <span :color="cosmosConfig[store.setChainSelected].color">{{ chain.wallet }} </span>
        
      </div>
      <v-row no-gutters>
 
            <v-col
              cols="12"
              sm="6" 
            >
              <v-sheet class="pa-2 mt-2 mb-4">
                Total wallet value
              </v-sheet> 
            </v-col>
            <v-col
              cols="12"
              sm="6"
              class="text-end"
            >
              <v-sheet class="pa-2 mt-4 mb-4">
                {{ chain.walletBalance / 1000000 }} {{ chain.chainConfig.coinLookup.viewDenom }}
              </v-sheet>        
            </v-col>
          </v-row>  
    </v-card-text>
  </v-card>



            <!-- <v-card
              :title="chain.name" 
              :subtitle="chain.desc"
              dark
              height="200"
            >
                  <template v-slot:prepend>
                    <v-avatar>
                      <v-img
                        :src="chain.coinLookup.icon"
                        :alt="chain.name"
                        max-height="64"
                        max-width="64"
                      ></v-img>
                    </v-avatar>
                  </template>            
             <trend
                :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
                :gradientDirection="bottom"
                :gradient="['#42b983', '#f94144', '#ffe74c']"
                :padding="6.7"
                :radius="7.7"
                :stroke-width="1.6"
                :stroke-linecap="butt"
                auto-draw
                smooth>
              </trend> 
            </v-card> -->
 
        </v-col>
      </v-row>
 
 
</template>
<script>
import { useAppStore } from '@/store/app'
import cosmosConfig from '../cosmos.config'

export default {
  name: 'App', 
  data: () => ({
    cosmosConfig: cosmosConfig,
  }),
  setup() {
    const store = useAppStore()
    return {
      store
    }
  },
  async mounted () { 
 
      await this.store.allWalletByChain()
  
    //await this.store.allWalletByChain()
    
  },
}
</script> 