import EventList from "../../components/events/event-list"
import EventSearch from "../../components/events/events-search"
import { getAllEvents } from "../../dummy-data"
import {useRouter} from "next/router"

export default function AllEventsPage() {
  const router = useRouter()
  const events = getAllEvents()
  function findEventHandler(year,month){
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath)
  }
  return (
    <>
      <EventSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </>
  )
}
