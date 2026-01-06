import Typography from "../../components/typography/Typography";
import Transition from "../../components/transition/Transition";
import useFetch from "../../hooks/useFetch";
import { API_DOMAIN } from "../../utils/Constants";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import Button from "../../components/button/Button";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowForward } from "../../icons/arrow_forward_ios.svg";
import CountUp from "../../components/CountUp/CountUp";
import { motion } from "framer-motion";

const Home = () => {
  const [authStatus, setAuthStatus] = useState(() => localStorage.getItem("authStatus") || "loggedOut");
  const [showWarning, setShowWarning] = useState(false);

  const { data, isLoading } = useFetch({
    url: API_DOMAIN + "?type=home",
  });
  const { data: eventData } = useFetch({
    url: API_DOMAIN + "?type=events&fields=name,coverPic,date,location",
  });

  useEffect(() => {
    if (authStatus === "expired") {
      setShowWarning(true);
    }
  }, [authStatus]);

  const handleExpiredLogout = () => {
    setShowWarning(false);
    setAuthStatus("loggedOut");
    localStorage.setItem("authStatus", "loggedOut");
  };

  const upcomingWorkshop = eventData?.[0] || {
    name: "Workshop",
    location: "TBA",
  };

  const placeholderSponsors = [
    { name: "Sponsor 1", image: "" },
    { name: "Sponsor 2", image: "" },
    { name: "Sponsor 3", image: "" },
    { name: "Sponsor 4", image: "" },
  ];

  return (
    <Transition isLoading={isLoading || !data}>
      <div id="start"></div>
      {data && (
        <PageTemplate>
          {showWarning && (
            <div className={styles['expired-warning-backdrop']}>
              <div className={styles['expired-warning-modal']}>
                <Typography variant='smallHeading'>Session Timeout</Typography>
                <Typography variant='body'>We have logged you out to protect you. Please log in again.</Typography>
                <Button onClick={handleExpiredLogout}>Confirm</Button>
              </div>
            </div>
          )}

          <div className={styles["content-wrapper"]}>
            <section className={styles["hero-card"]}>
              <div className={styles["hero-card-accent"]}></div>
              <div className={styles["hero-card-content"]}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Typography variant="smallHeading" className={styles["hero-card-title"]}>
                    Garage@EEE
                  </Typography>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Typography variant="body" className={styles["hero-card-text"]}>
                    Whether you are looking around to start tinkering or have been breaking down every electrical device that comes your way, there's a place for you here.
                  </Typography>
                </motion.div>
                <div className={styles["hero-divider"]}></div>
                <motion.div
                  className={styles["hero-card-footer"]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Typography variant="body" className={styles["hero-card-ready"]}>
                    Are you ready?
                  </Typography>
                  <Button to="/login">Join Us</Button>
                </motion.div>
              </div>
              <motion.div
                className={styles["hero-decor-1"]}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.15 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
              <motion.div
                className={styles["hero-decor-2"]}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.1 }}
                transition={{ duration: 1, delay: 1 }}
              />
            </section>

            <section className={styles["workshop-card"]}>
              <div className={styles["workshop-header"]}>
                <div>
                  <span className={styles["workshop-badge"]}>Upcoming Workshop</span>
                  <Typography variant="smallHeading" className={styles["workshop-title"]}>
                    {upcomingWorkshop.name}
                  </Typography>
                  <Typography variant="body" className={styles["workshop-location"]}>
                    📍 {upcomingWorkshop.location || "TBA"}
                  </Typography>
                </div>
                <Button to="/events" className={styles["rsvp-btn"]}>
                  RSVP
                </Button>
              </div>
            </section>

            <div className={styles["flagship-section"]}>
              <div className={styles["flagship-card"]}>
                <div className={styles["section-header"]}>
                  <Typography variant="body" className={styles["section-title"]}>
                    Flagship Events
                  </Typography>
                  <Link to="/events" className={styles["section-arrow"]}>
                    <ArrowForward />
                  </Link>
                </div>
                <Link to="/events" className={styles["flagship-content"]}>
                  <div className={styles["flagship-images"]}>
                    {eventData && eventData.length >= 3 ? (
                      <>
                        <div className={`${styles["flagship-img"]} ${styles["flagship-img-left"]}`}>
                          <img src={eventData[1]?.coverPic} alt="Event" loading="lazy" />
                        </div>
                        <div className={`${styles["flagship-img"]} ${styles["flagship-img-center"]}`}>
                          <img src={eventData[0]?.coverPic} alt="Main Event" loading="lazy" />
                        </div>
                        <div className={`${styles["flagship-img"]} ${styles["flagship-img-right"]}`}>
                          <img src={eventData[2]?.coverPic} alt="Event" loading="lazy" />
                        </div>
                      </>
                    ) : (
                      <div className={styles["loading-wrapper"]}>
                        <LoadingSpinner />
                      </div>
                    )}
                  </div>
                  <Typography variant="body" className={styles["flagship-title"]}>
                    Discover Innovation Festival
                  </Typography>
                  <Typography variant="subtitle" className={styles["flagship-subtitle"]}>
                    Tap to explore our highlights
                  </Typography>
                </Link>
              </div>
            </div>

            <div className={styles["events-section"]}>
              <div className={styles["events-card"]}>
                <div className={styles["section-header"]}>
                  <Typography variant="body" className={styles["section-title"]}>
                    Upcoming Events
                  </Typography>
                  <Link to="/events" className={styles["section-link"]}>
                    <Typography variant="subtitle">View All</Typography>
                  </Link>
                </div>
                <div className={styles["event-list"]}>
                  {eventData ? (
                    eventData.slice(0, 3).map((event, index) => (
                      <Link to={`/events/${index}`} key={event.name} className={styles["event-item"]}>
                        <div className={styles["event-image"]}>
                          <img src={event.coverPic} alt={event.name} loading="lazy" />
                        </div>
                        <div className={styles["event-info"]}>
                          <Typography variant="body" className={styles["event-name"]}>
                            {event.name}
                          </Typography>
                          <Typography variant="subtitle" className={styles["event-date"]}>
                            {event.date || "Date TBA"}
                          </Typography>
                        </div>
                        <div className={styles["event-arrow"]}>
                          <ArrowForward />
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className={styles["loading-wrapper"]}>
                      <LoadingSpinner />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles["sponsors-section"]}>
              <div className={styles["sponsors-card"]}>
                <div className={styles["section-header"]}>
                  <Typography variant="body" className={styles["section-title"]}>
                    Our Sponsors
                  </Typography>
                </div>
                <div className={styles["sponsors-grid"]}>
                  {placeholderSponsors.map((sponsor, index) => (
                    <div key={index} className={styles["sponsor-item"]}>
                      {sponsor.image ? (
                        <img src={sponsor.image} alt={sponsor.name} />
                      ) : (
                        <Typography variant="subtitle" style={{ color: '#94a3b8' }}>
                          SPONSOR
                        </Typography>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles["stats-section"]}>
              <div className={styles["section-header"]}>
                <Typography variant="body" className={styles["section-title"]}>
                  By the Numbers
                </Typography>
              </div>
              <div className={styles["stats-card"]}>
                <div className={styles["stats-grid"]}>
                  <div className={styles["stat-item"]}>
                    <CountUp
                      end={15}
                      suffix="+"
                      duration={1400}
                      className={styles["stat-number"]}
                    />
                    <Typography variant="body" className={styles["stat-label"]}>
                      Years of Innovation
                    </Typography>
                  </div>
                  <div className={styles["stat-item"]}>
                    <CountUp
                      end={500}
                      suffix="+"
                      duration={1600}
                      className={styles["stat-number"]}
                    />
                    <Typography variant="body" className={styles["stat-label"]}>
                      Builders & Ambassadors
                    </Typography>
                  </div>
                  <div className={styles["stat-item"]}>
                    <CountUp
                      end={50}
                      prefix="$"
                      suffix="K+"
                      duration={1800}
                      className={styles["stat-number"]}
                    />
                    <Typography variant="body" className={styles["stat-label"]}>
                      Total Prizes Won
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageTemplate>
      )}
    </Transition>
  );
};

export default Home;