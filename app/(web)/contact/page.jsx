// ContactSection.jsx
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";
import ContactForm from "../component/ContactForm";

async function getData() {
  try {
    const officeData = await fetch(`${process.env.BACKLINK}/public/officeData`, {
      headers: { "x-api-key": process.env.API_KEY, "office-id": process.env.OFFICE },
      cache: "no-store",
    });
    if (!officeData.ok) return null;
    return officeData.json();
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}

const handleSubmit = async (state, e) => {
  "use server";
  const formData = {
    name: e.get("name"),
    email: e.get("email"),
    message: e.get("message"),
    phone: e.get("phone"),
  };
  try {
    const response = await fetch(`${process.env.BACKLINK}/public/contact-us`, {
      method: "POST",
      headers: {
        "x-api-key": process.env.API_KEY,
        "office-id": process.env.OFFICE,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) return { success: false };
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

export default async function ContactSection() {
  const data = await getData();
  const officeData = data?.data;

  return (
    <>
      <style>{`
        #contact {
          background: linear-gradient(135deg, #f0f4ff 0%, #fff7ed 100%);
          padding: 80px 0;
          font-family: 'Open Sans', sans-serif;
        }

        .ctc-badge {
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
          margin-bottom: 14px;
        }
        .ctc-badge::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #f97316;
          flex-shrink: 0;
        }

        .ctc-title {
          font-size: clamp(26px, 4vw, 38px);
          font-weight: 800;
          color: #1e3a8a;
          margin-bottom: 6px;
        }
        .ctc-title span {
          background: linear-gradient(90deg, #f97316, #fb923c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ctc-subtitle {
          color: #64748b;
          font-size: 15px;
          margin-bottom: 0;
        }

        .ctc-divider {
          width: 48px; height: 4px;
          border-radius: 4px;
          background: linear-gradient(90deg, #1e50c8, #f97316);
          margin: 12px auto 48px;
        }

        /* Info card */
        .ctc-info-card {
          background: #fff;
          border-radius: 20px;
          padding: 32px 28px;
          border: 1.5px solid #e2e8f0;
          box-shadow: 0 4px 16px rgba(30,80,200,0.07);
          height: 100%;
          position: relative;
          overflow: hidden;
        }
        .ctc-info-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #1e50c8, #f97316);
        }

        .ctc-info-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 22px;
        }

        .ctc-icon-box {
          width: 42px; height: 42px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }

        .ctc-info-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 3px;
        }
        .ctc-info-value {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
          text-decoration: none;
          transition: color 0.2s;
          line-height: 1.5;
          display: block;
        }
        .ctc-info-value:hover { color: #f97316; }

        .ctc-map {
          border-radius: 14px;
          overflow: hidden;
          border: 1.5px solid #dbeafe;
          box-shadow: 0 4px 12px rgba(30,80,200,0.08);
          margin-top: 20px;
        }

        /* Form card */
        .ctc-form-card {
          background: #fff;
          border-radius: 20px;
          padding: 36px 32px;
          border: 1.5px solid #e2e8f0;
          box-shadow: 0 4px 16px rgba(30,80,200,0.07);
          height: 100%;
          position: relative;
          overflow: hidden;
        }
        .ctc-form-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #f97316, #1e50c8);
        }

        .ctc-form-label {
          font-size: 13px;
          font-weight: 700;
          color: #374151;
          margin-bottom: 6px;
          display: block;
        }

        .ctc-form-input {
          width: 100%;
          padding: 11px 14px;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          color: #1e293b;
          background: #f8fafc;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
          font-family: 'Open Sans', sans-serif;
        }
        .ctc-form-input:focus {
          border-color: #1e50c8;
          box-shadow: 0 0 0 3px rgba(30,80,200,0.1);
          background: #fff;
        }

        .ctc-form-textarea {
          resize: vertical;
          min-height: 130px;
        }

        .ctc-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        @media (max-width: 576px) {
          .ctc-form-row { grid-template-columns: 1fr; }
          .ctc-form-card { padding: 24px 18px; }
          .ctc-info-card { padding: 24px 18px; }
        }

        .ctc-form-group { margin-bottom: 16px; }

        .ctc-submit-btn {
          width: 100%;
          padding: 13px;
          background: linear-gradient(135deg, #1e50c8, #2563eb);
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(30,80,200,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 8px;
          font-family: 'Open Sans', sans-serif;
        }
        .ctc-submit-btn:hover {
          background: linear-gradient(135deg, #f97316, #fb923c);
          box-shadow: 0 4px 14px rgba(249,115,22,0.35);
          transform: translateY(-2px);
        }
      `}</style>

      <section id="contact">
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="ctc-badge">Get In Touch</div>
          </div>
          <h2 className="ctc-title">Contact <span>Us</span></h2>
          <p className="ctc-subtitle">Expert guidance and support — we're here to help</p>
          <div className="ctc-divider" />
        </div>

        <div className="container">
          <div className="row g-4 align-items-stretch">

            {/* Info */}
            <div className="col-lg-5">
              <div className="ctc-info-card">
                {officeData?.address && (
                  <div className="ctc-info-item">
                    <a
                      href={`https://maps.google.com/maps?q=${encodeURIComponent(
                        (officeData?.address || "") + " " + (officeData?.landmark || "")
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ctc-icon-box"
                      style={{ background: "#fff7ed", border: "1.5px solid #fed7aa", textDecoration: "none" }}
                    >
                      <FaMapMarkerAlt style={{ color: "#f97316" }} />
                    </a>
                    <div>
                      <div className="ctc-info-label">Location</div>
                      <span className="ctc-info-value">{officeData.address}</span>
                    </div>
                  </div>
                )}
                {officeData?.email && (
                  <div className="ctc-info-item">
                    <a
                      href={`mailto:${officeData.email}`}
                      className="ctc-icon-box"
                      style={{ background: "#eff6ff", border: "1.5px solid #dbeafe", textDecoration: "none" }}
                    >
                      <FaEnvelope style={{ color: "#1e50c8" }} />
                    </a>
                    <div>
                      <div className="ctc-info-label">Email</div>
                      <a href={`mailto:${officeData.email}`} className="ctc-info-value">{officeData.email}</a>
                    </div>
                  </div>
                )}
                {officeData?.mobile && (
                  <div className="ctc-info-item">
                    <a
                      href={`tel:${officeData.mobile}`}
                      className="ctc-icon-box"
                      style={{ background: "#eff6ff", border: "1.5px solid #dbeafe", textDecoration: "none" }}
                    >
                      <FaPhone style={{ color: "#1e50c8" }} />
                    </a>
                    <div>
                      <div className="ctc-info-label">Phone</div>
                      <a href={`tel:${officeData.mobile}`} className="ctc-info-value">+91 {officeData.mobile}</a>
                    </div>
                  </div>
                )}
                {officeData?.whatsapp && (
                  <div className="ctc-info-item">
                    <a
                      href={`https://wa.me/91${officeData.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ctc-icon-box"
                      style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", textDecoration: "none" }}
                    >
                      <FaWhatsapp style={{ color: "#16a34a" }} />
                    </a>
                    <div>
                      <div className="ctc-info-label">WhatsApp</div>
                      <a
                        href={`https://wa.me/91${officeData.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ctc-info-value"
                      >
                        +91 {officeData.whatsapp}
                      </a>
                    </div>
                  </div>
                )}

                <div className="ctc-map">
                  <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent((officeData?.address || "") + " " + (officeData?.landmark || ""))}&output=embed`}
                    width="100%"
                    height="220"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map"
                  />
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="col-lg-7">
              <div className="ctc-form-card">
                <ContactForm handleSubmit={handleSubmit} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}