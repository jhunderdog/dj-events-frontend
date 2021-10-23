import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import Pagination from '@/components/Pagination';
import { API_URL } from '@/config/index';
import Head from 'next/head'
import Link from 'next/link';
import { PER_PAGE } from '@/config/index';
export default function EventsPage({events, page, total}) {
  // const lastPage = Math.ceil(total / PER_PAGE)
  // console.log(events);
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map(evt => (
        <EventItem key={evt.id} evt={evt}/>
      ))}
      <Pagination page={page} total={total}/>
    </Layout>
  )
}

export async function getServerSideProps({query: { page  = 1}}){
  //Calculate start page
  const start = +page === 1 ? 0 : (+page -1) * PER_PAGE
  //Fetch total/count
  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json()
  //Fetch events
  // console.log(page);
  const eventRes = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`);
  const events = await eventRes.json()
  console.log(events);
  return {
    props: {events, page: +page, total },
    
  }
}