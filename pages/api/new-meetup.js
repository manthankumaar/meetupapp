import { MongoClient } from 'mongodb'

const handler = async (req, res) => {
  console.log('api reached')
  if (req.method === 'POST') {
    const data = req.body
    const client = await MongoClient.connect(
      'mongodb+srv://manx:XnhsF394qc7ndNQW@cluster0.2rjuiky.mongodb.net/?retryWrites=true&w=majority'
    )
    const db = client.db()
    const meetupsCollection = db.collection('meetup')
    const result = await meetupsCollection.insertOne(data)
    console.log(result)
    client.close()
    res.status(201).json({ messgae: 'meetup insterted' })
  }
}

export default handler
