import {MongoClient} from 'mongodb'

import MeetupList from '../components/meetups/MeetupList'

const DUMMY_MEETUPS = [
    {
      id: 'm1',
      title: 'A First Meetup',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
      address: 'Some address 5, 12345 Some City',
      description: 'This is a first meetup!'
    },
    {
      id: 'm2',
      title: 'A Second Meetup',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
      address: 'Some address 10, 12345 Some City',
      description: 'This is a second meetup!'
    }
  ];

const HomePage = (props) => {

return <MeetupList meetups={props.meetups}/>
}

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