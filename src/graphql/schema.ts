import { buildSchema } from 'graphql';

const schema = buildSchema(`
    schema{
        query: Random
    }
    
    type Random{
        setValue: Float
        getValue: Int
    }
`);

export default schema;
