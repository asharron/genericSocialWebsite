const { GraphQLServer } = require('graphql-yoga');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
var url = 'mongodb://127.0.0.1:27017';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to database");
    var db = client.db('social');
    var alex = db.collection('user').find({"name":"Alex"}).value;
    console.log(alex);

    client.close();
});

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'FullStack tutorial'
}]

let idCount = links.length

const resolvers = {
    Query: {
        info: () => `This is an API`,
        feed: () => links,

    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        }
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})

server.start(() => console.log("Server is runnning on port 4000"))
