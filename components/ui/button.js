import Link from "next/link"
import styles from "./button.module.css"

export default function Button({ onClick, link, children }) {
  if (link) {
    return (
      <Link href={link}>
        <a className={styles.btn}>{children}</a>
      </Link>
    )
  }
  return <button onClick={onClick} className={styles.btn} >{children}</button>
}
