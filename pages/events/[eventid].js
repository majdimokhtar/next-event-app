import { useRouter } from 'next/router'
import EventContent from "../../components/event-detail/event-content"
import EventLogistics from "../../components/event-detail/event-logistics"
import EventSummary from "../../components/event-detail/event-summary"
import ErrorAlert from "../../components/ui/error-alert"
import { getEventById } from "../../dummy-data"

export default function EventDetails() {
  const router = useRouter()
  const eventId = router.query.eventId
  console.log(eventId,"hiii")
  const event = getEventById(eventId)
  if (!event) {
    return (
      <ErrorAlert>
        <p>No Event Found</p>
      </ErrorAlert>
    )
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
