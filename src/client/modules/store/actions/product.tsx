export default function createProduct() {
    const graphQLHeader = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };

    fetch('/graphql', {
        method: 'POST',
        headers: graphQLHeader,
        body: JSON.stringify({ query: '{ getValue }' }),
    })
        .then(r => r.json())
        .then(data => console.log(data));
}
