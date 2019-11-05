import { buildSchema } from 'graphql';

const productSchema = buildSchema(`
    type Query {
        getProducts: [Product]
      }
    type ProductID {
        _id: String
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
        deleteProduct(_id: String): ProductID
      }
    schema {
        query: Query
        mutation: Mutation
      }
`);

export default productSchema;
