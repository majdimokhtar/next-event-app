import EventContent from "../../components/event-detail/event-content"
import EventLogistics from "../../components/event-detail/event-logistics"
import EventSummary from "../../components/event-detail/event-summary"
import ErrorAlert from "../../components/ui/error-alert"
import { getEventById, getFeaturedEvents } from "../../helpers/api-util"

export default function EventDetails(props) {
  // const router = useRouter()
  // const eventId = router.query.eventId
  const event = props.selectedEvent
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
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

export async function getStaticProps(context) {
  const eventId = context.params.eventId
  const event = await getEventById(eventId)
  return {
    props: {
      selectedEvent: event,
    },
    revalidate : 30
  }
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents()
  const paths = events.map((event) => ({ params: { eventId: event.id } }))
  return {
    paths: paths,
    fallback: "blocking"
  }
}
