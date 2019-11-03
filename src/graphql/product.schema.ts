import { buildSchema } from 'graphql';

const productSchema = buildSchema(`
    type Query {
        product(_id: String): Product
        getProducts: [Product]
      }
      type Product {
        _id: String
        name: String
        description: String
        price: String
        date: String
      }
      type Mutation {
        createProduct(name: String, description: String, price: String): Product
        deleteProduct(_id: String): Product
      }
      schema {
        query: Query
        mutation: Mutation
      }
`);

export default productSchema;
