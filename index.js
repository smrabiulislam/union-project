const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

// middle wares
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://form:bTrDBwDmZtqdlk6k@cluster0.krriwsh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        console.log('connect')
        const serviceCollection = client.db('form').collection('user');

        // for user

        app.post("/user", async (req, res) => {
            const user = req.body;
            const results = await serviceCollection.insertOne(user);
            res.send(results);
        });



        app.get('/user', async (req, res) => {
            console.log(uri)
            const query = {}
            const cursor = serviceCollection.find(query).limit(1).sort({ _id: -01 });
            const user = await cursor.toArray();
            res.send(user);

        });




        //for reviews

        // app.post("/reviews", async (req, res) => {
        //     const review = req.body;
        //     const result = await reviewCollection.insertOne(review);
        //     res.send(result);
        // });

        // app.get("/reviews", async (req, res) => {
        //     let query = {};
        //     if (req.query.email) {
        //         query = {
        //             email: req.query.email,
        //         };
        //     }
        //     const cursor = reviewCollection.find(query);
        //     const reviews = await cursor.toArray();
        //     res.send(reviews);
        // });

    }
    finally {

    }
}

run().catch(err => console.error(err));


app.get('/', (req, res) => {
    res.send('form sever is running')
})

app.listen(port, () => {
    console.log(`form server running on ${port}`);
})