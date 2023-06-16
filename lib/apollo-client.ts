import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: process.env.GRAPHQL_ENDPOINT_URL,
    // link: new HttpLink({
    //     uri: process.env.GRAPHQL_ENDPOINT_URL,
    // }),
    cache: new InMemoryCache(),
});

export default client;