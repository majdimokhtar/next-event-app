import React from "react"
import EventItem from "./event-item"
import styles from "./event-list.module.css"

export default function EventList({items}) {
  return (
    <ul className={styles.list} >
      {items.map((event) => (
        <EventItem
          key={event.id}
          title={event.title}
          date={event.date}
          image={event.image}
          location={event.location}
          id={event.id}
        />
      ))}
    </ul>
  )
}
