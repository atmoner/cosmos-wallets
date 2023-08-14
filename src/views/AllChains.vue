<template>
 
      <v-row>
        <v-col
          v-for="chain in cosmosConfig"
          :key="chain"
          cols="12"
          md="4"
        >
 
  <v-card
    class="mt-4 mx-auto" 
    :title="chain.name" 
    :subtitle="chain.desc"
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

    <v-card-text >

      <v-sheet
      class="v-sheet--offset mb-4" 
      elevation="12" 
    >
    {{ chain.colorChart }}
      <trend
        :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
        :gradientDirection="bottom"
        :gradient="chain.colorChart"
        :padding="6.7"
        :radius="7.7"
        :stroke-width="1.6" 
        auto-draw
        smooth>
      </trend> 
    </v-sheet>
      <div class="text-h6 font-weight-light mb-2">
        User Registrations
      </div>
      <div class="subheading font-weight-light grey--text">
        Last Campaign Performance
      </div>
      <v-divider class="my-2"></v-divider>
      <v-icon
        class="mr-2"
        small
      >
        mdi-clock
      </v-icon>
      <span class="text-caption grey--text font-weight-light">last registration 26 minutes ago</span>
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
import cosmosConfig from '../cosmos.config'

export default {
  name: 'App', 
  data: () => ({
    cosmosConfig: cosmosConfig,
  }),
  mounted () { 
    
  },
}
</script> 