import Grid from "../../components/grid/Grid";
import Card from "../../components/PhotoCard/PhotoCard";
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

const Home = () => {
  const [authStatus, setAuthStatus] = useState(() => localStorage.getItem("authStatus") || "loggedOut");
  const [showWarning, setShowWarning] = useState(false);

  const { data, isLoading } = useFetch({
    url: API_DOMAIN + "?type=home",
  });
  const { data: projectData } = useFetch({
    url: API_DOMAIN + "?type=projectInfo&fields=name,coverPic",
  });
  const { data: eventData } = useFetch({
    url: API_DOMAIN + "?type=events&fields=name,coverPic",
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
                <button   onClick={() => {
                  handleExpiredLogout();
                }}><Typography variant='body'>Confirm</Typography>
                </button>
              </div>
            </div>
          )}
          <div className={styles["content-wrapper"]}>

            <div className={styles["top-actions"]}>
              <Link to="/events" className={styles["action-link"]}>
                <Typography variant="body">Attend workshop</Typography>
              </Link>
              <Typography variant="body"> | </Typography>
              <Link to="/facilities" className={styles["action-link"]}>
                <Typography variant="body">Book facility</Typography>
              </Link>
            </div>
    
            <Link to="/events" className={styles["marquee"]} style={{display: 'block'}}>
              <div className={styles["marquee-content"]}>
                {eventData && [...eventData, ...eventData].map((event, index) => (
                  <span key={`${event.name}-${index}`} className={styles["marquee-item"]}>
                    {event.name}
                  </span>
                ))}
              </div>
            </Link>
            <div className={styles["banner"]}>
              <div className={styles["banner-space"]}>
                <Typography variant="banner">STUDENT-LED MAKERSPACE</Typography>
                <Typography variant="smallHeading">the joy of engineering is in tinkering together</Typography>             
                <Button to="/login">Login</Button>
              </div>
            </div>
            
            <section className={styles["section-wrapper"]}>
              <Typography variant="heading">Flagship Events</Typography>
              {eventData ? (
                <Grid>
                  {eventData.slice(0, 3).map((card, index) => (
                    <Card
                      key={card.name}
                      image={card.coverPic}
                      to={"events/" + index}
                      bottomText={card.name}
                    />
                  ))}
                </Grid>
              ) : (
                <div className={styles["loading-wrapper"]}>
                  <LoadingSpinner />
                </div>
              )}
            </section>
            
            <section className={styles["section-wrapper"]}>
              <Typography variant="heading">Our Current Projects</Typography>
              {projectData ? (
                <div className={styles["grid-wrapper"]}>
                  <Grid>
                    {projectData.slice(0, 3).map((card, index) => (
                      <Card
                        key={card.name}
                        image={card.coverPic}
                        to={"projects/" + index}
                        bottomText={card.name}
                      />
                    ))}
                  </Grid>
                </div>
              ) : (
                <div className={styles["loading-wrapper"]}>
                  <LoadingSpinner />
                </div>
              )}
            </section>
          </div>
        </PageTemplate>
      )}
    </Transition>
  );
};

export default Home;