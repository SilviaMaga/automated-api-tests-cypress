

const { MongoClient } = require ('mongodb')

const mongoUri = 'mongodb+srv://silvia040612:senha123@cluster0.ng15v.mongodb.net/markdb?retryWrites=true&w=majority&appName=Cluster0'

const client = new MongoClient(mongoUri)

async function connect () {
    await client.connect()
    return client.db('markdb')
}

async function disconnect () {
    await client.disconnect()
}


module.exports = { connect, disconnect}