const { MongoClient } = require('mongodb')
// Replace the uri string with your connection string.
const uri = 'mongodb://root:example@localhost:27017/?retryWrites=true&w=majority'
// 'mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority'
const client = new MongoClient(uri)
async function run () {
  try {
    const database = client.db('todo')
    const users = database.collection('users')
    // Query for a movie that has the title 'Back to the Future'
    const query = { userName: 'Marçal' }
    const user = await users.findOne(query)
    console.log(user)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}
run().catch(console.dir)
