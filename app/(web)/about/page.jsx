async function getData() {
  const res = await fetch(process.env.BACKLINK + "/public/about", {
    headers: {
      "x-api-key": process.env.API_KEY,
      "office-id": process.env.OFFICE,
    },
    cache: "no-store",
  });
  if (!res.ok) return res.statusText;
  return res.json();
}

async function getOfficeData() {
  try {
    const officeData = await fetch(`${process.env.BACKLINK}/public/officeData`, {
      headers: {
        "x-api-key": process.env.API_KEY,
        "office-id": process.env.OFFICE,
      },
      cache: "no-store",
    });
    if (!officeData.ok) return null;
    return officeData.json();
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}

export default async function AboutPage() {
  const data = await getData();
  const aboutData = data?.data;
  const officeData = await getOfficeData();
  const name = officeData?.data?.name;

  return (
    <>
      <style>{`
        #about {
          background: linear-gradient(135deg, #f0f4ff 0%, #fff7ed 100%);
          padding: 80px 0;
        }

        .about-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #fff7ed;
          border: 1.5px solid #f97316;
          color: #f97316;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 100px;
          margin-bottom: 18px;
        }
        .about-badge::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #f97316;
          flex-shrink: 0;
        }

        .about-title {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 800;
          color: #1e3a8a;
          line-height: 1.2;
          margin-bottom: 6px;
        }
        .about-title span {
          background: linear-gradient(90deg, #f97316, #fb923c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .about-divider {
          width: 48px;
          height: 4px;
          border-radius: 4px;
          background: linear-gradient(90deg, #1e50c8, #f97316);
          margin: 16px 0 20px;
        }

        .about-desc {
          color: #475569;
          font-size: 15px;
          line-height: 1.85;
          margin-bottom: 28px;
        }

        .about-stats {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }
        .about-stat-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .about-stat-number {
          font-size: 26px;
          font-weight: 800;
          color: #1e50c8;
          line-height: 1;
        }
        .about-stat-label {
          font-size: 12px;
          color: #94a3b8;
          font-weight: 600;
          margin-top: 2px;
        }

        .about-img-wrap {
          position: relative;
          height: 100%;
          min-height: 380px;
        }
        .about-img-wrap img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(30, 80, 200, 0.15);
        }

        /* Orange accent corner */
        .about-img-wrap::before {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          width: 80px;
          height: 80px;
          border-top: 4px solid #f97316;
          border-left: 4px solid #f97316;
          border-radius: 6px 0 0 0;
          z-index: 1;
        }
        /* Blue accent corner */
        .about-img-wrap::after {
          content: '';
          position: absolute;
          bottom: -10px;
          right: -10px;
          width: 80px;
          height: 80px;
          border-bottom: 4px solid #1e50c8;
          border-right: 4px solid #1e50c8;
          border-radius: 0 0 6px 0;
          z-index: 1;
        }

        .about-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          background: linear-gradient(135deg, #1e50c8, #2563eb);
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          border-radius: 10px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(30, 80, 200, 0.3);
        }
        .about-cta-btn:hover {
          background: linear-gradient(135deg, #f97316, #fb923c);
          box-shadow: 0 4px 14px rgba(249, 115, 22, 0.35);
          color: #fff;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .about-img-wrap {
            min-height: 260px;
            margin-bottom: 32px;
          }
          .about-img-wrap::before,
          .about-img-wrap::after {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>

      <section id="about">
        <div className="container">
          <div className="row align-items-center g-5">

            {/* Image */}
            <div className="col-md-5 col-lg-6">
              <div className="about-img-wrap">
                {aboutData?.image && (
                  <img
                    src={aboutData.image}
                    alt={`About ${name || "us"}`}
                  />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="col-md-7 col-lg-6">
              <div className="about-badge">Why Choose Us</div>

              <h2 className="about-title">
                We Are <span>{name}</span>
              </h2>

              <div className="about-divider" />

              <p className="about-desc">
                {aboutData?.description}
              </p>

              <div className="about-stats">
                <div className="about-stat-item">
                  <span className="about-stat-number">500+</span>
                  <span className="about-stat-label">Happy Clients</span>
                </div>
                <div className="about-stat-item">
                  <span className="about-stat-number">10+</span>
                  <span className="about-stat-label">Years Experience</span>
                </div>
                <div className="about-stat-item">
                  <span className="about-stat-number">50+</span>
                  <span className="about-stat-label">Projects Done</span>
                </div>
              </div>

              <div style={{ marginTop: "28px" }}>
                <a href="#contact" className="about-cta-btn">
                  Get In Touch
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}