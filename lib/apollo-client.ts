import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

export const { getClient } = registerApolloClient(() => {
    return new ApolloClient({
    link: new HttpLink({
        uri: process.env.GRAPHQL_ENDPOINT_URL,
    }),
    cache: new InMemoryCache(),
})});
