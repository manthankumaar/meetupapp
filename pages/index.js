import Head from 'next/head'
import MeetupList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb'

const Homepage = ({ meetups }) => {
  return (
    <>
      <Head>
        <title>React Meet</title>
        <meta name='description' content='Browse a huge react meetup' />
      </Head>
      <MeetupList meetups={meetups} />
    </>
  )
}

export async function getStaticProps() {
  //code to get data api
  const client = await MongoClient.connect(
    'mongodb+srv://manx:XnhsF394qc7ndNQW@cluster0.2rjuiky.mongodb.net/?retryWrites=true&w=majority'
  )
  const db = client.db()
  const meetupsCollection = db.collection('meetup')
  const meetups = await meetupsCollection.find().toArray()
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  }
}
export default Homepage
