<template>
  <v-container >
    <v-row no-gutters>
      <v-col 
      >
      <v-table>
        <thead>
          <tr>
            <th class="text-left">
              Authz Type
            </th>
            <th class="text-left">
              granter
            </th>
            <th class="text-left">
              grantee
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in store.allAuthz"
            :key="item.name"
          >
            <td>{{ item.finalData.titleMsg }}</td>
            <td>{{ item.granter }}</td>
            <td>{{ item.grantee }}</td>
          </tr>
        </tbody>
      </v-table>
 
      <!-- <v-data-table
            rounded="lg" style="border-radius: 7px;"
            :headers="headers"
            :items="store.allAuthz"
            :search="search"
          > 
            <template v-slot:item="{ item }"> 
              <tr> 
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
          </v-data-table> -->
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
      { key: 'finalData.titleMsg', title: 'Data' },

      { key: 'granter', title: 'granter' },  
      { key: 'grantee', title: 'grantee' },
      { key: 'actions', title: 'Actions' },
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