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
                <td> {{ item.columns['authorization'].typeUrl }} </td>
                <td> {{ item.columns['finaleAuthzType'].msg }} </td> 
                <td>{{ item.columns['grantee'] }}</td>
                <td>{{ item.columns['granter'] }}</td>
                <td>{{ item.columns['expiration'] }}</td>
                
                <td></td>
                
              </tr>
            </template> 
          </v-data-table>
      </v-col>
      <actionsModals type="addAuthz" /> 
    </v-row>
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
      {
        align: 'start',
        key: 'authorization',
        sortable: false,
        title: 'Tx type', 
      },
      { key: 'finaleAuthzType', title: 'Authz' },
      { key: 'grantee', title: 'grantee' },
      { key: 'granter', title: 'granter' },  
      { key: 'expiration', title: 'expiration' },
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