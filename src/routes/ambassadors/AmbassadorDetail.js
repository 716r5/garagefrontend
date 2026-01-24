import { useParams, Link } from "react-router-dom";
import Transition from "../../components/transition/Transition";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import useFetch from "../../hooks/useFetch";
import { API_DOMAIN } from "../../utils/Constants";

import styles from "./AmbassadorDetail.module.css";

function AmbassadorDetail() {
  const params = useParams();
  const id = params.id;
  const { data, isLoading } = useFetch({
    url: API_DOMAIN + "?type=ambassadors&index=" + id,
  });

  return (
    <Transition isLoading={isLoading || !data}>
      <PageTemplate>
        {data && (
          <main className={styles["layout-container"]}>
            <div className={styles["layout-content"]}>
              {/* Breadcrumbs */}
              <nav className={styles["breadcrumbs"]}>
                <Link to="/" className={styles["breadcrumb-link"]}>Home</Link>
                <span className={styles["breadcrumb-separator"]}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </span>
                <Link to="/ambassadors" className={styles["breadcrumb-link"]}>Ambassadors</Link>
                <span className={styles["breadcrumb-separator"]}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </span>
                <span className={styles["breadcrumb-current"]}>{data.name}</span>
              </nav>

              {/* Page Header */}
              <header className={styles["page-header"]}>
                <div className={styles["header-content"]}>
                  <h1 className={styles["page-title"]}>{data.name}</h1>
                  {data.tagline && (
                    <p className={styles["page-subtitle"]}>{data.tagline}</p>
                  )}
                </div>
              </header>

              <div className={styles["split-layout"]}>
                <div className={styles["main-column"]}>
                  {data.description && (
                    <section className={styles["content-section"]}>
                      <div className={styles["section-header"]}>
                        <div className={styles["section-icon"]}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4M12 8h.01" />
                          </svg>
                        </div>
                        <h2 className={styles["section-title"]}>About the Ambassador Track</h2>
                      </div>
                      <div className={styles["prose"]}>
                        {data.description.split('\n').map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    </section>
                  )}
                </div>

                <div className={styles["sidebar-column"]}>
                  {data.coverPic && (
                    <div className={styles["hero-image-wrapper"]}>
                      <div className={styles["hero-overlay"]} />
                      <img
                        src={data.coverPic}
                        alt={data.name}
                        className={styles["hero-image"]}
                      />
                    </div>
                  )}

                  <div className={styles["details-card"]}>
                    <h3 className={styles["details-title"]}>Track Details</h3>
                    <div className={styles["details-list"]}>
                      <div className={styles["detail-item"]}>
                        <div className={styles["detail-label"]}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                          <span>Track Type</span>
                        </div>
                        <span className={styles["detail-value"]}>Ambassador</span>
                      </div>
                    </div>
                    <div className={styles["details-actions"]}>
                      <Link to="/ambassadors" className={styles["btn-secondary"]}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="19" y1="12" x2="5" y2="12" />
                          <polyline points="12 19 5 12 12 5" />
                        </svg>
                        <span>Back to Ambassadors</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}
      </PageTemplate>
    </Transition>
  );
}

export default AmbassadorDetail;
