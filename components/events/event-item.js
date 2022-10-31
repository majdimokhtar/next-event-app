import Image from "next/image"
import AddressIcon from "../icons/address-icon"
import ArrowRightIcon from "../icons/arrow-right-icon"
import DateIcon from "../icons/date-icon"
import Button from "../ui/button"
import styles from "./event-item.module.css"

export default function EventItem({ id, title, date, image, location }) {
  const humanReadableDat = new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
  const formattedAddress = location.replace(", ", "\n")
  const exploreLink = `/events/${id}`
  console.log(exploreLink);
  return (
    <li className={styles.item}>
      <Image src={"/" + image} alt={title} width={250} height={160} />
      {/* <img src={"/" + image} alt={title} /> */}
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <DateIcon />
            <time>{humanReadableDat}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={styles.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  )
}
