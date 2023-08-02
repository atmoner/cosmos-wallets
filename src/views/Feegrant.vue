<template>
  
    
    <v-row no-gutters>
      
      <v-col 
        cols="12" 
        md="6"   
      >
      <v-sheet border min-height="400" class="ma-2 pa-2" rounded="lg"> 
      <h3 class="ml-4">Fee Grants</h3>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">
              Grant type
            </th>
            <th class="text-left">
              Granter 
            </th>
            <th class="text-left">
              grantee
            </th>
            <th class="text-left">
               
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="store.myFeeGrants.length === 0">
            <td>No data</td>
          </tr>
          <tr
            
            v-for="item in store.myFeeGrants"
            :key="item.name"
          > 
            <td>
              <v-chip
                v-if="item.allowance.typeUrl === '/cosmos.feegrant.v1beta1.BasicAllowance'" 
                :color="cosmosConfig[store.setChainSelected].color" 
                label 
                variant="outlined"
              >
                Basic Allowance
              </v-chip>
            </td>
            <td>
              Me
            </td> 
            <td>
            {{ this.truncateString(item.grantee, 15) }}
            </td>   
            <td>

              <actionsModals type="removeFeeGrant" /> 
            </td>  
          </tr>
        </tbody>
      </v-table>   
      </v-sheet>    
      </v-col>
    
      <v-col 
        cols="12" 
        md="6"   
      >
        <v-sheet border min-height="400" class="ma-2 pa-2" rounded="lg">
        <h3 class="ml-4">Fee Allowances</h3>
        <v-table>
        <thead>
          <tr>
            <th class="text-left">
              Allowances type
            </th>
            <th class="text-left">
              Grantee 
            </th>
            <th class="text-left">
              Granter
            </th>
          </tr>
        </thead>
        <tbody>
          <tr  v-if="store.myFeeAllowances.length === 0">
            <td>No data</td>
          </tr>
          <tr
            v-for="item in store.myFeeAllowances"
            :key="item.name"
          > 
            <td>
              <v-chip
                v-if="item.allowance.typeUrl === '/cosmos.feegrant.v1beta1.BasicAllowance'" 
                :color="cosmosConfig[store.setChainSelected].color" 
                label 
                variant="outlined"
              >
                Basic Allowance
              </v-chip>
            </td>
            <td>
              Me
            </td> 
            <td>
            {{ this.truncateString(item.grantee, 15) }}
            </td>   
          </tr>
        </tbody>
      </v-table> 
    </v-sheet>  
      <!-- <v-data-table
            rounded="lg" style="border-radius: 7px;"
            :headers="headers"
            :items="store.myFeeAllowances"
            :search="search"
            class="ma-4 pa-4"
            no-data-text
          >
            <template v-slot:item="{ item }"> 
              <tr>

                <td>
                  <v-chip
                    v-if="item.columns['allowance.typeUrl'] === '/cosmos.feegrant.v1beta1.BasicAllowance'"
                    class="ma-2"
                    label
                  >
                    Basic Allowance
                  </v-chip>
                  
                  <v-chip
                    v-if="item.columns['allowance.typeUrl'] === '/cosmos.feegrant.v1beta1.PeriodicAllowance'"
                    class="ma-2"
                    label
                  >
                    {{ item.columns['allowance.typeUrl'] }}
                  </v-chip>
                  <v-chip
                    v-if="item.columns['allowance.typeUrl'] === '/cosmos.feegrant.v1beta1.AllowedMsgAllowance'"
                    class="ma-2"
                    label
                  >
                    {{ item.columns['allowance.typeUrl'] }}
                  </v-chip>
                  
                </td>              
                <td>
                  Top
                  <v-tooltip
                    activator="parent"
                    location="top"
                  > {{ item.columns['granter'] }} </v-tooltip>
                </td> 
                <td>
                  Top
                  <v-tooltip
                    activator="parent"
                    location="top"
                  > {{ item.columns['grantee'] }} </v-tooltip>
                </td>         
              </tr>
            </template> 
          </v-data-table> -->
          </v-col>
<!--           <v-col 
        cols="12" 
        md="6" 
        class="d-flex justify-center align-center"
      >
          <v-data-table
            rounded="lg" style="border-radius: 7px;"
            :headers="headers"
            :items="store.myFeeGrants"
            :search="search"
            class="ma-4 pa-4"
            no-data-text
          >
            <template v-slot:item="{ item }"> 
              <tr>
                <v-chip
                    v-if="item.columns['allowance.typeUrl'] === '/cosmos.feegrant.v1beta1.BasicAllowance'"
                    class="ma-2"
                    label
                  >
                    Basic Allowance
                  </v-chip>
                  
                  <v-chip
                    v-if="item.columns['allowance.typeUrl'] === '/cosmos.feegrant.v1beta1.PeriodicAllowance'"
                    class="ma-2"
                    label
                  >
                    {{ item.columns['allowance.typeUrl'] }}
                  </v-chip>
                  <v-chip
                    v-if="item.columns['allowance.typeUrl'] === '/cosmos.feegrant.v1beta1.AllowedMsgAllowance'"
                    class="ma-2"
                    label
                  >
                    {{ item.columns['allowance.typeUrl'] }}
                  </v-chip>
                <td> Me </td> 
                <td> View</td>       
              </tr>
            </template> 
          </v-data-table>
          
      </v-col> -->
    </v-row>
        <div class="text-center d-flex pb-4">
      <v-spacer></v-spacer>
      <actionsModals type="feeGrant" /> 
    </div> 
</template>
 
<script>
import { useAppStore } from '@/store/app'

import cosmosConfig from '../cosmos.config' 
import actionsModals from '@/components/actionsModals.vue'

export default {
  name: 'App', 
  components: { actionsModals },
  data: () => ({
    cosmosConfig: cosmosConfig,
    headers: [
      {
        align: 'start',
        key: 'allowance.typeUrl',
        sortable: false,
        title: 'Tx type', 
      },
      { key: 'grantee', title: 'grantee' },
      { key: 'granter', title: 'granter' },   
    ], 
 
  }),
  setup() {
    const store = useAppStore() 
    return {
      store
    }
  },
  async created() {  
  },
  computed: {

  },
  methods: {
    async testAllowance() { 
 
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