import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useSWR from "swr"
import EventList from "../../components/events/event-list"
import ResultsTitle from "../../components/events/results-title"
import Button from "../../components/ui/button"
import ErrorAlert from "../../components/ui/error-alert"
import { getFilteredEvents } from "../../helpers/api-util"

export default function FiltredEvents({ hasError, events, dating }) {
  const url =
    "https://nextjs-test-9ae8c-default-rtdb.europe-west1.firebasedatabase.app/events.json"
  const [loadedEvents, setLoadedEvents] = useState()
  const router = useRouter()
  const filtredData = router.query.slug
  const { data, error } = useSWR(url, (url) =>
    fetch(url).then((res) => res.json())
  )
  useEffect(() => {
    if (data) {
      const events = []
      for (const key in data) {
        events.push({ id: key, ...data[key] })
      }
      setLoadedEvents(events)
    }
  }, [data])

  let headDataPage = (
    <Head>
    <title>Filtred Event</title>
    <meta
      name="description"
      content={`list of filtred events`}
    />
  </Head>
  )

  if (!loadedEvents) {
    return (
      <>
        {headDataPage}
        <p className="center">Loading....</p>{" "}
      </>
    )
  }

  const filtredYear = filtredData[0]
  const filtredMonth = filtredData[1]
  const numYear = +filtredYear
  const numMonth = +filtredMonth
  headDataPage = (
    <Head>
      <title>Filtred Event</title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numYear}.`}
      />
    </Head>
  )
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        {headDataPage}
        <ErrorAlert>
          <p className="center">Invalid Filter please adjust your values</p>
        </ErrorAlert>
        <div className="center">
          <Button>Show All Events</Button>
        </div>
      </>
    )
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    )
  })
  const date = new Date(numYear, numMonth - 1)
  // const filtredEvents = events
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {headDataPage}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    )
  }

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  )
}

// export async function getServerSideProps(context) {
//   const { params } = context
//   const filtredData = params.slug
//   const filtredYear = filtredData[0]
//   const filtredMonth = filtredData[1]
//   const numYear = +filtredYear
//   const numMonth = +filtredMonth
//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },
//       // notFound: true,
//       // redirect :{
//       //   destination : "/error"
//       // }
//     }
//   }
//   const filtredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   })
//   return {
//     props: {
//       events: filtredEvents,
//       dating: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   }
// }
