import EventList from "../../components/events/event-list"
import EventSearch from "../../components/events/events-search"
import { useRouter } from "next/router"
import { getAllEvents } from "../../helpers/api-util"
import Head from "next/head"

export default function AllEventsPage({ events }) {
  const router = useRouter()
  function findEventHandler(year, month) {
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath)
  }
  return (
    <>
      <Head>
        <title>All Events</title>
        <meta name="description" content="Find the greatest events..." />
      </Head>
      <EventSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </>
  )
}

export async function getStaticProps() {
  const events = await getAllEvents()
  return {
    props: { events: events },
    revalidate: 60,
  }
}
