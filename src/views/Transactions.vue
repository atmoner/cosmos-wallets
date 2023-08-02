<template> 
<!-- <div>
Transaction lists
<v-sheet min-height="300" class="ma-2 pa-2" rounded="lg">
              <v-row no-gutters>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-sheet class="text-h6 pa-2">
                    Last transactions
                  </v-sheet>
                </v-col> 
              </v-row>                
              <v-data-table
                rounded="lg" style="border-radius: 7px;"
                :headers="headers"
                :items="store.lastTransactions"
                :search="search"
                :items-per-page="50"
              >
                <template v-slot:item="{ item }"> 
                  <tr>
                    <td>
                      <v-chip
                        class="ma-2"
                        :color="cosmosConfig[store.setChainSelected].color" 
                        label 
                        variant="outlined"
                        >{{ item.columns['titleMsg'] }}
                      </v-chip>  
                    </td>
                    <td>{{ formatDate(item.columns['timestamp']) }}</td> 
                    <td>{{ item.columns['finalData'] }}</td>
                    <td>{{ item.columns['txhash'] }}</td>
                    <td></td>
                    
                  </tr>
                </template> 
              </v-data-table>
            </v-sheet>  
</div> -->
<v-sheet border min-height="300" class="ma-2 pa-2" rounded="lg">
  <div class="text-h6 pa-2">
    Last transactions
  </div>
<div>
    <div class="text-center d-flex pb-4">
      <v-spacer></v-spacer>
      <v-btn class="ma-2" @click="none">
        Close all
      </v-btn>
      <v-btn class="ma-2" @click="all">
        View all
      </v-btn>
    </div>

    <!-- <div class="pb-4">v-model {{ panel }}</div> -->

    <v-expansion-panels
      v-model="panel"
      multiple
    >
      <v-expansion-panel
        v-for="(item, i) in store.lastTransactions"
        :key="i"  
        :value="i"
      > 
      <v-expansion-panel-title v-slot="{ open }">
        <v-row no-gutters>
          <v-col cols="4" class="d-flex justify-start">
            
            <v-chip 
              :color="cosmosConfig[store.setChainSelected].color"
              label
              text-color="white"
            >
              <v-icon start icon="mdi-label"></v-icon>
              {{ item.titleMsg }}
            </v-chip>
          </v-col>
          <v-col
            cols="8"
            class="text--secondary"
          >
            <v-fade-transition leave-absolute>
              <span v-if="open">When do you want to travel?</span>
              <v-row
                v-else
                no-gutters
                style="width: 100%"
              >
                <v-col cols="6" class="d-flex justify-start">
                  {{ formatDate(item.timestamp) }}
                </v-col>
                <v-col cols="6" class="d-flex justify-start">
 
                  <v-icon v-if="item.code === 0" color="success" icon="mdi-check-bold"></v-icon>
                  <v-icon v-else color="error" icon="mdi-close-thick"></v-icon>
 
                </v-col>
              </v-row>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-expansion-panel-title>
<!--         <v-expansion-panel-title expand-icon="mdi-menu-down">
          {{ item.titleMsg }} - {{ formatDate(item.timestamp) }}
        </v-expansion-panel-title> -->
        <v-expansion-panel-text><!-- {{ item.finalData }} -->
          
          <v-table>
            <tbody>
              <tr
                v-for="item in item.finalData"
                :key="item"
              >
                <td>{{ item.name }}</td>
                <td v-if="item.name === 'Amount'">
                  {{ item.data.amount / 1000000 }}
                  <strong :style="'color:' + cosmosConfig[store.setChainSelected].color">
                    {{ cosmosConfig[store.setChainSelected].coinLookup.viewDenom }}
                  </strong>
                </td>
                <td v-else>{{ item.data }}</td> 
                <td v-if="item.name !== 'Amount'">

                  <v-tooltip location="start" text="Soon">
                      <template v-slot:activator="{ props }">
 
                        <v-chip
                          class="ma-2"
                          label 
                          :color="gray" 
                          v-bind="props"
                        >
                          View adress
                        </v-chip>                         
                      </template>
                    </v-tooltip> 
                </td> 
                <td v-else> </td> 
                
              </tr>
              <tr >
                <td>Tx hash</td>
                <td>{{ item.txhash }}</td>
                <td>
                  <v-chip
                    class="ma-2"
                    label
                    :to="'/transactions/' + cosmosConfig[store.setChainSelected].slot + '/' + item.txhash"
                    :color="cosmosConfig[store.setChainSelected].color" 
                  >
                    View detail
                  </v-chip>                  
                </td> 
                
              </tr>
            </tbody>
          </v-table>     
        </v-expansion-panel-text>
    </v-expansion-panel>
 
    </v-expansion-panels>
  </div>
</v-sheet>
</template> 
<script>
import { useAppStore } from '@/store/app' 
import actionsModals from '@/components/actionsModals.vue'
import cosmosConfig from '../cosmos.config' 

export default {
  components: { actionsModals },
  data: (store) => ({
    cosmosConfig: cosmosConfig,
    dialog: false,
    panel: [],
    headers: [
      {
        align: 'start',
        key: 'titleMsg',
        sortable: false,
        title: 'Tx type', 
      },
      { key: 'finalData', title: 'Date' },
      { key: 'timestamp', title: 'Data' },
      { key: 'txhash', title: 'Tx Hash' } 
    ],
    trip: {
        name: '',
        location: null,
        start: null,
        end: null,
      },
      locations: ['Australia', 'Barbados', 'Chile', 'Denmark', 'Ecuador', 'France'],
  }),
  setup() {
    const store = useAppStore() 
    return {
      store
    }
  },
  methods: { 
    none () {
      this.panel = []
    },
    all () {       
      let str = []
      for (let i = 0; i < this.store.lastTransactions.length; i++) { 
        str.push(i)
      }
      this.panel = str
    },
    truncateString(str, num) {
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + '...'
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
  }
}
</script>