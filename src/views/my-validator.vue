<template> 
<div>
My validator!

<actionsModals 
  type="validatorRewards"
  spendableBalances="" 
  chain="" 
/> 
 
</div>
</template> 
<script>
import { useAppStore } from '@/store/app'
import cosmosConfig from '../cosmos.config' 
import actionsModals from '@/components/actionsModals.vue'

export default {
  components: { actionsModals },
  setup() {
    const store = useAppStore()
    console.log(store.spendableBalances) 

    return {
      store
    }
  },
}
</script>