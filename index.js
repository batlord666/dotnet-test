const express = require('express');

const gqlrequest = require('graphql-request')
const {gql, request} = gqlrequest

const app = express();
app.use(express.json());

const products = [
    { id: 1, name: 'product1'},
    { id: 2, name: 'product2'},
    { id: 3, name: 'product3'},
];

// http has these object methods
// app.get()  -->this is what we are testing here - "getting data" 
// app.post()
// app.put()
// app.delete()


app.get('/', (req,res) => {
    res.send('Hello World!!!');
});

//get a list of all products
app.get('/api/products', (req, res) => {
    res.send(products);
});

app.post('/api/products', (req,res) => {
    const product = {
        id: product.length + 1,
        name: req.body.name
    };
    products.push(product);
    res.send(product);
});


//to get a singe product, include id in url
app.get('/api/products/:id', async (req, res) => {
    const {id} = req.params
        const query = gql`query MyQuery($id: Int) {
        ProductOrderLineItem(where: {Id: {_eq: $id}}) {
          Id
          OrderId
          ProductId
          Quantity
          Date
            
        }
      }`

    //endpoint with var
    const data = await request("http://localhost:8080/v1/graphql",query, {id: parseInt(id)})
    res.send(data)

});





//("id" is the name of the parameter)
// "(req, res)" is our route handler function

//PORT
//(proper way to assign a port to my node applications)
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));


// check in google chrome:
// localhost:3000
// and
// localhost:3000/api/products
// after using "nodemon index.js" in cmd-window




