<template>
  <v-container >
    <v-row no-gutters>
      <v-col 
      >
      <v-data-table
            rounded="lg" style="border-radius: 7px;"
            :headers="headers"
            :items="store.allAuthz"
            :search="search"
          > 
            <template v-slot:item="{ item }"> 
              <tr>
                <!-- <td> {{ item.columns['authorization'].typeUrl }} </td>
                <td> {{ item.columns['finaleAuthzType'].msg }} </td>  -->
                <td>  
                  <v-chip
                    class="ma-2"
                    :color="cosmosConfig[store.setChainSelected].color"
                    label
                    text-color="white"
                  >
                    <v-icon start icon="mdi-label"></v-icon>
                      {{ item.columns['finalData'].titleMsg }}
                  </v-chip>                
                </td> 
                <td>Me</td> 
                <td>{{ item.columns['grantee'] }}</td>
                
                
                <td><actionsModals type="removeAuthz" :authZdata="item.columns" /></td>
                
              </tr>
            </template> 
          </v-data-table>
      </v-col>
     
    </v-row>
    <actionsModals type="addAuthz" /> 
  </v-container>
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
      { key: 'finalData', title: 'Data' },

      { key: 'granter', title: 'granter' },  
      { key: 'grantee', title: 'grantee' },
      { key: '', title: 'Actions' },
    ], 
 
  }),
  setup() {
    const store = useAppStore() 
    return {
      store
    }
  },
  computed: {

  },
  methods: {
 
    truncateString(str, num) {
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + '...'
    }
  }
}   
</script>