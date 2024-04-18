// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    // component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/welcome',
    children: [
      {
        path: '',
        name: 'welcome',
        component: () => import('@/views/Welcome.vue'),
      },
    ],
  }, 
  {
    path: '/staking',
    children: [
      {
        path: '',
        name: 'Staking',
        component: () => import('@/views/Staking.vue'),
      },
    ],
  },
  {
    path: '/proposal/:id',
    children: [
      {
        path: '',
        name: 'Proposal',
        component: () => import('@/views/Proposal.vue'),
      },
    ],
  },
  {
    path: '/proposals',
    children: [
      {
        path: '',
        name: 'Proposals',
        component: () => import('@/views/Proposals.vue'),
      },
    ],
  },
  {
    path: '/create-proposal',
    children: [
      {
        path: '',
        name: 'Create proposal',
        component: () => import('@/views/CreateProposals.vue'),
      },
    ],
  },
  {
    path: '/wasm',
    children: [
      {
        path: '',
        name: 'wasm',
        component: () => import('@/views/Wasm.vue'),
      },
    ],
  },
  {
    path: '/authz',
    children: [
      {
        path: '',
        name: 'Authz',
        component: () => import('@/views/Authz.vue'),
      },
    ],
  },
  {
    path: '/feegrant',
    children: [
      {
        path: '',
        name: 'Feegrant',
        component: () => import('@/views/Feegrant.vue'),
      },
    ],
  },
  {
    path: '/my-validator',
    children: [
      {
        path: '',
        name: 'my-validator',
        component: () => import('@/views/my-validator.vue'),
      },
    ],
  },
  {
    path: '/transactions',
    children: [
      {
        path: '',
        name: 'Transactions',
        component: () => import('@/views/Transactions.vue'),
      },
    ],
  },
  {
    path: '/transactions/:chain/:txhash',
    children: [
      {
        path: '',
        name: 'txDetail',
        component: () => import('@/views/DetailTx.vue'),
      },
    ],
  },  
  {
    path: '/stats',
    children: [
      {
        path: '',
        name: 'Stats',
        component: () => import('@/views/Stats.vue'),
      },
    ],
  },
  {
    path: '/allChains',
    children: [
      {
        path: '',
        name: 'AllChains',
        component: () => import('@/views/AllChains.vue'),
      },
    ],
  },
  {
    path: '/group',
    children: [
      {
        path: '',
        name: 'Group',
        component: () => import('@/views/Group.vue'),
      },
    ],
  },
  {
    path: '/group/:id',
    children: [
      {
        path: '',
        name: 'GroupDetail',
        component: () => import('@/views/GroupDetail.vue'),
      },
    ],
  },  
  {
    path: '/group/:id/policy',
    children: [
      {
        path: '',
        name: 'GroupDetailPolicy',
        component: () => import('@/views/GroupDetailPolicy.vue'),
      },
    ],
  }, 
  {
    path: '/group/:id/create-proposal',
    children: [
      {
        path: '',
        name: 'GroupCreateProposal',
        component: () => import('@/views/GroupCreateProposals.vue'),
      },
    ],
  }, 
  {
    path: '/group/:id/authz',
    children: [
      {
        path: '',
        name: 'GroupDetailAuhtz',
        component: () => import('@/views/GroupDetailAuhtz.vue'),
      },
    ],
  },   
  {
    path: '/group/:id/proposal/:id_prop',
    children: [
      {
        path: '',
        name: 'GroupViewProposal',
        component: () => import('@/views/GroupDetailProposal.vue'),
      },
    ],
  },   
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
