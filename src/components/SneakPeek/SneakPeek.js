import React from "react";
import styles from "./SneakPeek.module.css";

export default function SneakPeek() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.kicker}>
          <span className={styles.kickerPill}>Sneak Peek</span>
        </p>

        <h2 className={styles.title}>
          Life At{" "}
          <span className={styles.bold}>Garage@EEE</span>
        </h2>

        <div className={styles.stackWrap} aria-label="Event photos">
          {/* Card 1 */}
          <figure
            className={`${styles.card} ${styles.cardA}`}
            style={{ "--rot": "10deg", "--x": "-250px", "--y": "50px" }}
          >
            <img
              src="/garage1.jpg"
              alt="Maker working on a build"
              className={styles.img}
              draggable="false"
            />

            <figcaption className={styles.caption}>
              Workshops!
            </figcaption>
          </figure>

          {/* Card 2 */}
          <figure
            className={`${styles.card} ${styles.cardB}`}
            style={{ "--rot": "0deg", "--x": "55px", "--y": "160px" }}
          >
            <img
              src="/garage3.jpg"
              alt="Performance moment"
              className={styles.img}
              draggable="false"
            />
            <figcaption className={styles.caption}>
              Competitions!
            </figcaption>
          </figure>

          {/* Card 3 (big) */}
          <figure
            className={`${styles.card} ${styles.cardC}`}
            style={{ "--rot": "-10deg", "--x": "70px", "--y": "-60px" }}
          >
            <img
              src="/garage2.jpg"
              alt="Crowd cheering at event"
              className={styles.img}
              draggable="false"
            />

            <figcaption className={styles.caption}>
              Events!
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
