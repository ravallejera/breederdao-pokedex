import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink({
        uri: process.env.GRAPHQL_ENDPOINT_URL,
    }),
    cache: new InMemoryCache(),
});

export default client;