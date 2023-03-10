import {MongoClient} from 'mongodb'
import Head from 'next/head'
import MeetupList from '../components/meetups/MeetupList'
import {Fragment} from 'react'

const HomePage = (props) => {

return (
<Fragment>
<Head>
  <title>React Meetups</title>
  <meta
    name='description'
    content='Browse Meetups'
  />
</Head>
<MeetupList meetups={props.meetups}/>
</Fragment>
)}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export async function getStaticProps(){

  const client = await MongoClient.connect('mongodb+srv://fredericreact:fredericreact@cluster0.p9ub0xq.mongodb.net/meetups?retryWrites=true&w=majority')

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close()

  return {
    props: {
  meetups: meetups.map(meetup => ({
    title: meetup.data.title,
    address: meetup.data.address,
    image: meetup.data.image,
    id: meetup._id.toString()
  }))
},
    revalidate: 10
  }
}

export default HomePage