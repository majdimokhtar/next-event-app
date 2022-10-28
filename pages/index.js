import EventList from "../components/events/event-list"
import { getFeaturedEvents } from "../helpers/api-util"  

export default function HomePage({events}) {

  return (
    <div>
      <ul>
        <EventList items={events} />
      </ul>
    </div>
  )
}

export async function getStaticProps(){
  const featuredEvents = await getFeaturedEvents()
  return {
    props : {
      events :featuredEvents
    },
    revalidate : 1800
  }
}
