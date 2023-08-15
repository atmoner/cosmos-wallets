<template>
    <v-app id="inspire">
      <v-app-bar
        class="px-3"
        flat
        density="compact"
        id="appbar"
      >
        <v-spacer></v-spacer>
  
        <v-tabs
          v-if="store.isLogged"
          centered
          :color="cosmosConfig[store.setChainSelected].color"
          class="hidden-xs-only"
        >
          <!-- ... (v-tabs content) ... -->
        </v-tabs>
        <v-menu
          v-else
          offset-y
          bottom
        >
          <template v-slot:activator="{ on, attrs }">
            <v-avatar
              rounded="1"
              color="grey-darken-1"
              size="25"
              v-bind="attrs"
              v-on="on"
            >
              <v-img src="@/assets/keplr.png" alt="keplr" />
            </v-avatar>
          </template>
          <v-list>
            <!-- Menu items for non-logged-in state -->
          </v-list>
        </v-menu>
        <v-icon
          v-if="store.isLogged"
          size="large"
          icon="mdi-theme-light-dark"
          @click="toggleTheme"
          class="hidden-xs-only"
        ></v-icon>
  
      </v-app-bar>
  
      <!-- Main App -->
  
      <v-main>
        <Login v-if="!store.isLogged" />
        <v-img
            v-if="store.isLogged"
            :src="cosmosConfig[store.setChainSelected].coinLookup.banner"
            max-height="125"
            cover
            class="bg-grey-lighten-2"
          >
          <div class="d-flex flex-column fill-height justify-center align-center text-white">
            <h1 class="text-h4 mb-4">
              {{ cosmosConfig[store.setChainSelected].name }}
            </h1>
          </div>
        </v-img>
        
        <v-container>
  
          <v-breadcrumbs
                :items="breadcrumbsItems"
                divider="-"
              ></v-breadcrumbs>
          <v-row v-if="store.isLogged" > 
            <v-col
              v-if="viewLeftMenu"
              cols="12"
              sm="3"
              md="2"
            >
              <!-- ... (Left menu content) ... -->
            </v-col>
  
            <v-col
              cols="12"
              :sm="currentPageSize"
              class="d-flex"
            >
              <!-- Main content (Router View) -->
              <router-view />
            </v-col>
          </v-row>
          <v-row v-else class="mt-4" >
            <!--Not logged in-->
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  // ... (Import statements and setup function)
  
  export default {
    // ... (Component properties and lifecycle methods)
  
    methods: {
      // ... (Your methods)
    }
  }
  </script>
  
  <style scoped>
  /* Responsive styling for specific screen sizes */
  @media (max-width: 599px) {
    /* Mobile styles */
  
    /* Example: Adjust spacing for mobile screens */
    .hidden-xs-only {
      display: none;
    }
  }
  
  @media (min-width: 600px) and (max-width: 959px) {
    /* Tablet styles */
  
    /* Example: Adjust left menu width for tablet screens */
    .hidden-xs-only {
      display: none;
    }
  }
  
  @media (min-width: 960px) {
    /* Desktop styles */
  
    /* Example: Hide menu icon on desktop screens */
    .hidden-xs-only {
      display: block;
    }
  }
  </style>
  