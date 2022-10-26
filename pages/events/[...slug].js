import { useRouter } from "next/router"
import EventList from "../../components/events/event-list"
import ResultsTitle from "../../components/events/results-title"
import Button from "../../components/ui/button"
import ErrorAlert from "../../components/ui/error-alert"
import { getFilteredEvents } from "../../dummy-data"

export default function FiltredEvents() {
  const router = useRouter()
  const filtredData = router.query.slug
  console.log(filtredData)
  if (!filtredData) {
    return <p className="center">Loading....</p>
  }
  const filtredYear = filtredData[0]
  const filtredMonth = filtredData[1]

  const numYear = +filtredYear
  const numMonth = +filtredMonth
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2023 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p className="center">Invalid Filter please adjust your values</p>
        </ErrorAlert>
        <div className="center">
          <Button>Show All Events</Button>
        </div>
      </>
    )
  }
  const filtredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  })
  if (!filtredEvents || filtredEvents.length === 0) {
    return (
      <>
        <p className="center">No events found!! </p>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    )
  }

  const date = new Date(numYear, numMonth - 1)

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filtredEvents} />
    </>
  )
}
