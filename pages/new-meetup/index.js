import NewMeetupForm from '@/components/meetups/NewMeetupForm'
import axios from 'axios'
import { useRouter } from 'next/router'
import Head from 'next/head'

const NewMeetUp = () => {
  const router = useRouter()
  const addMeetUpHandler = async (meetupData) => {
    const response = await axios.post(
      '/api/new-meetup',
      JSON.stringify(meetupData),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>Add new meetup</title>
        <meta
          name='description'
          content='Add your won meetup loaction and create new networking opprtunity'
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetUpHandler} />
    </>
  )
}
export default NewMeetUp
