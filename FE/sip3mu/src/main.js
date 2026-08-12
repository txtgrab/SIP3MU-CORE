import { createApp, provide, h } from "vue";
import App from "./App.vue";
import router from "./router";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { setContext } from "@apollo/client/link/context";

// 1. Tentukan URL Backend GraphQL
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

// 2. Selipkan token JWT dari localStorage ke dalam Headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("sip3mu_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// 3. Rakit Apollo Client
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// 4. Inisialisasi Vue App dengan Apollo Provider
const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(router).mount("#app");