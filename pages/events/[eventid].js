import { useRouter } from "next/router"
import EventContent from "../../components/event-detail/event-content"
import EventLogistics from "../../components/event-detail/event-logistics"
import EventSummary from "../../components/event-detail/event-summary"
import { getEventById } from "../../dummy-data"

export default function EventDetails() {
  const router = useRouter()
  const eventId = router.query.eventid
  const event = getEventById(eventId)
  if (!event) {
    return <p>No Event Found</p>
  }
  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        location={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  )
}
