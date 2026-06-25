import Image from "next/image";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer({ data = {}, links = {} }) {
  const socialLinks = [
    { icon: <FaFacebook />, href: links?.facebook, hoverColor: "#1877f2" },
    { icon: <FaTwitter />, href: links?.twitter, hoverColor: "#1da1f2" },
    { icon: <FaInstagram />, href: links?.instagram, hoverColor: "#e1306c" },
    { icon: <FaLinkedin />, href: links?.linkedin, hoverColor: "#0a66c2" },
    { icon: <FaYoutube />, href: links?.youtube, hoverColor: "#ff0000" },
  ].filter((s) => s.href);

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Products", href: "#products" },
    { label: "Gallery", href: "#gallery" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <style>{`
        .footer-root {
          background: linear-gradient(135deg, #0f1f14 0%, #1a3320 50%, #0f1f14 100%);
          color: #e2e8f0;
          padding-top: 60px;
          font-family: 'Open Sans', sans-serif;
        }

        .footer-section-title {
          color: #5cb874;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid rgba(92, 184, 116, 0.3);
        }

        /* Social Icons */
        .footer-social-link {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #cbd5e1;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .footer-social-link:hover {
          color: #fff;
          transform: translateY(-3px);
        }
        .footer-social-fb:hover  { background: #1877f2; border-color: #1877f2; }
        .footer-social-tw:hover  { background: #1da1f2; border-color: #1da1f2; }
        .footer-social-ig:hover  { background: #e1306c; border-color: #e1306c; }
        .footer-social-li:hover  { background: #0a66c2; border-color: #0a66c2; }
        .footer-social-yt:hover  { background: #ff0000; border-color: #ff0000; }

        /* Quick Links */
        .footer-nav-link {
          color: #94a3b8;
          font-size: 14px;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          padding-left: 0;
        }
        .footer-nav-link:hover {
          color: #5cb874;
          padding-left: 6px;
        }

        /* Contact links */
        .footer-contact-link {
          color: #94a3b8;
          font-size: 13px;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-contact-link:hover {
          color: #5cb874;
        }

        /* Contact icon box */
        .footer-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(92, 184, 116, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Bottom bar */
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 20px 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }
        .footer-bottom p {
          margin: 0;
          color: #64748b;
          font-size: 13px;
        }
        .footer-bottom a {
          color: #5cb874;
          font-weight: 600;
          text-decoration: none;
        }
        .footer-bottom a:hover {
          color: #80c792;
        }
      `}</style>

      <footer className="footer-root">
        <div className="container">
          <div className="row g-5 pb-5">
            {/* Col 1 — Logo + About + Social */}
            <div className="col-lg-4 col-md-6">
              {data?.logo && (
                <div style={{ marginBottom: "16px" }}>
                  <Image
                    src={`https://${data.logo.slice(7)}`}
                    alt={data?.name || "Logo"}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                      width: "auto",
                      height: "55px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}
              <h5
                style={{
                  color: "#5cb874",
                  fontWeight: "700",
                  fontSize: "20px",
                  marginBottom: "10px",
                }}
              >
                {data?.name}
              </h5>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "14px",
                  lineHeight: "1.8",
                  marginBottom: "20px",
                }}
              >
                Providing reliable tech solutions since day one. Committed to
                quality, innovation, and customer satisfaction.
              </p>

              {socialLinks.length > 0 && (
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {socialLinks.map(({ icon, href }, i) => {
                    const cls =
                      [
                        "footer-social-fb",
                        "footer-social-tw",
                        "footer-social-ig",
                        "footer-social-li",
                        "footer-social-yt",
                      ][i] || "";
                    return (
                      <a
                        key={i}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`footer-social-link ${cls}`}
                      >
                        {icon}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Col 2 — Quick Links */}
            <div className="col-lg-2 col-md-6 col-sm-6">
              <h6 className="footer-section-title">Quick Links</h6>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {quickLinks.map(({ label, href }) => (
                  <li key={label} style={{ marginBottom: "10px" }}>
                    <a href={href} className="footer-nav-link">
                      <span style={{ color: "#5cb874", fontSize: "10px" }}>
                        ▶
                      </span>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Contact Info */}
            <div className="col-lg-3 col-md-6 col-sm-6">
              <h6 className="footer-section-title">Contact Us</h6>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {data?.address && (
                  <li
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <span className="footer-icon-box">
                      <FaMapMarkerAlt
                        style={{ color: "#5cb874", fontSize: "13px" }}
                      />
                    </span>
                    <span
                      style={{
                        color: "#94a3b8",
                        fontSize: "13px",
                        lineHeight: "1.6",
                      }}
                    >
                      {data.address}
                    </span>
                  </li>
                )}
                {data?.email && (
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <span className="footer-icon-box">
                      <FaEnvelope
                        style={{ color: "#5cb874", fontSize: "13px" }}
                      />
                    </span>
                    <a
                      href={`mailto:${data.email}`}
                      className="footer-contact-link"
                    >
                      {data.email}
                    </a>
                  </li>
                )}
                {data?.mobile && (
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <span className="footer-icon-box">
                      <FaPhone style={{ color: "#5cb874", fontSize: "13px" }} />
                    </span>
                    <a
                      href={`tel:${data.mobile}`}
                      className="footer-contact-link"
                    >
                      +91 {data.mobile}
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* Col 4 — Map */}
            <div className="col-lg-3 col-md-6">
              <h6 className="footer-section-title">Find Us</h6>
              <div
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "2px solid rgba(92,184,116,0.25)",
                }}
              >
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(data?.address || "India")}&output=embed`}
                  width="100%"
                  height="160"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <p>
              © {new Date().getFullYear()}{" "}
              <span style={{ color: "#5cb874", fontWeight: "600" }}>
                {data?.name}
              </span>
              . All Rights Reserved.
            </p>
            <p>
              Designed by{" "}
              <a
                href="https://amptechnology.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                AmpTechnology
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
