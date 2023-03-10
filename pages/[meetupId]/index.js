import MeetupDetail from "../../components/meetups/MeetupDetail"
import {MongoClient, ObjectId} from 'mongodb'
import Head from 'next/head'
import {Fragment} from 'react'

const MeetupDetails = (props) => {

    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name='description' content={props.meetupData.description}/>
            </Head>
            <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}

        />
        </Fragment>
    )
}


export async function getStaticPaths(){

    const client = await MongoClient.connect('mongodb+srv://fredericreact:fredericreact@cluster0.p9ub0xq.mongodb.net/meetups?retryWrites=true&w=majority')

        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();

        client.close()

    return {
        fallback: 'blocking',
        paths: meetups.map((meetup)=> ({
            params: { meetupId: meetup._id.toString()},
        }))     
       
    }

}

export async function getStaticProps(context) {

    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://fredericreact:fredericreact@cluster0.p9ub0xq.mongodb.net/meetups?retryWrites=true&w=majority')

        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId)});
       
        console.log(selectedMeetup)

        client.close()

    return {
        props: {
           meetupData: {
            id: selectedMeetup._id.toString(),
            title: selectedMeetup.data.title,
            address: selectedMeetup.data.address,
            image: selectedMeetup.data.image,
            description: selectedMeetup.data.description,
           }
        }
    }
}

export default MeetupDetails