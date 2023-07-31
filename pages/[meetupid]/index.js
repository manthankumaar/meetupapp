import MeetDetails from '@/components/meetups/MeetDetails'
import { MongoClient, ObjectId } from 'mongodb'
import Head from 'next/head'

const Details = ({ meetupData }) => {
  return (
    <>
      <Head>
        <title>{meetupData.title}</title>
        <meta name='description' content={meetupData.description} />
      </Head>
      <MeetDetails
        image={meetupData.image}
        title={meetupData.title}
        address={meetupData.address}
        description={meetupData.description}
      />
    </>
  )
}

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://manx:XnhsF394qc7ndNQW@cluster0.2rjuiky.mongodb.net/?retryWrites=true&w=majority'
  )
  const db = client.db()
  const meetupsCollection = db.collection('meetup')
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray()
  client.close()
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupid: meetup._id.toString() },
    })),
  }
}

export async function getStaticProps(context) {
  const meetupid = context.params.meetupid
  const client = await MongoClient.connect(
    'mongodb+srv://manx:XnhsF394qc7ndNQW@cluster0.2rjuiky.mongodb.net/?retryWrites=true&w=majority'
  )
  const db = client.db()
  const meetupCollection = db.collection('meetup')
  const selectedMeetup = await meetupCollection.findOne({
    _id: new ObjectId(meetupid),
  })
  client.close()
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  }
}
export default Details
