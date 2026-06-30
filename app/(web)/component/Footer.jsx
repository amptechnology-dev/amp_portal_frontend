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
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer({ data = {}, links = {} }) {
  const socialLinks = [
    { icon: <FaFacebook />, href: links?.facebook, cls: "footer-social-fb" },
    { icon: <FaTwitter />, href: links?.twitter, cls: "footer-social-tw" },
    { icon: <FaInstagram />, href: links?.instagram, cls: "footer-social-ig" },
    { icon: <FaLinkedin />, href: links?.linkedin, cls: "footer-social-li" },
    { icon: <FaYoutube />, href: links?.youtube, cls: "footer-social-yt" },
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
        /* ── Root ── */
        .footer-root {
          background: linear-gradient(135deg, #f0f4ff 0%, #fff7ed 100%);
          color: #1e293b;
          padding-top: 64px;
          font-family: 'Open Sans', sans-serif;
          border-top: 3px solid transparent;
          border-image: linear-gradient(90deg, #1e50c8, #f97316) 1;
        }

        /* ── Section titles ── */
        .footer-section-title {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #1e50c8;
          margin-bottom: 20px;
          padding-bottom: 10px;
          position: relative;
        }
        .footer-section-title::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 36px; height: 3px;
          border-radius: 3px;
          background: linear-gradient(90deg, #1e50c8, #f97316);
        }

        /* ── Company name ── */
        .footer-company-name {
          font-size: 20px;
          font-weight: 800;
          background: linear-gradient(90deg, #1e50c8, #f97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
        }

        /* ── Tagline ── */
        .footer-tagline {
          color: #64748b;
          font-size: 14px;
          line-height: 1.8;
          margin-bottom: 20px;
        }

        /* ── Social icons ── */
.footer-social-link {
  width: 36px; height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.25s ease;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(30,80,200,0.08);
}
.footer-social-link:hover {
  transform: translateY(-3px);
  filter: brightness(1.1);
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
}

.footer-social-fb { background: #1877f2; }
.footer-social-tw { background: #1da1f2; }
.footer-social-ig { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }
.footer-social-li { background: #0a66c2; }
.footer-social-yt { background: #ff0000; }
.footer-social-wa { background: #25d366; }

        /* ── Quick links ── */
        .footer-nav-link {
          color: #475569;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          padding-left: 0;
          transition: all 0.2s ease;
        }
        .footer-nav-link:hover {
          color: #f97316;
          padding-left: 6px;
        }
        .footer-nav-arrow {
          width: 18px; height: 18px;
          border-radius: 50%;
          background: #fff7ed;
          border: 1px solid #fed7aa;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.2s;
        }
        .footer-nav-link:hover .footer-nav-arrow {
          background: #f97316;
          border-color: #f97316;
        }
        .footer-nav-arrow svg {
          color: #f97316;
          transition: color 0.2s;
        }
        .footer-nav-link:hover .footer-nav-arrow svg {
          color: #fff;
        }

        /* ── Contact icon box ── */
        .footer-icon-box {
          width: 34px; height: 34px;
          border-radius: 9px;
          background: #fff;
          border: 1.5px solid #dbeafe;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(30,80,200,0.08);
        }

        /* ── Contact links ── */
        .footer-contact-link {
          color: #475569;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s;
          word-break: break-all;
        }
        .footer-contact-link:hover { color: #f97316; }

        /* ── Map border ── */
        .footer-map-wrap {
          border-radius: 14px;
          overflow: hidden;
          border: 2px solid #dbeafe;
          box-shadow: 0 4px 16px rgba(30,80,200,0.08);
        }

        /* ── Bottom bar ── */
        .footer-bottom {
          border-top: 1px solid #e2e8f0;
          padding: 20px 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-top: 8px;
        }
        .footer-bottom p {
          margin: 0;
          color: #94a3b8;
          font-size: 13px;
        }
        .footer-bottom-name {
          font-weight: 700;
          background: linear-gradient(90deg, #1e50c8, #f97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .footer-bottom a {
          color: #1e50c8;
          font-weight: 700;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-bottom a:hover { color: #f97316; }
        .footer-icon-box {
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.footer-icon-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
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

              <div className="footer-company-name">{data?.name}</div>

              <p className="footer-tagline">
                Providing reliable tech solutions since day one. Committed to
                quality, innovation, and customer satisfaction.
              </p>

              {socialLinks.length > 0 && (
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {socialLinks.map(({ icon, href, cls }, i) => (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`footer-social-link ${cls}`}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Col 2 — Quick Links */}
            <div className="col-lg-2 col-md-6 col-sm-6">
              <h6 className="footer-section-title">Quick Links</h6>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {quickLinks.map(({ label, href }) => (
                  <li key={label} style={{ marginBottom: "12px" }}>
                    <a href={href} className="footer-nav-link">
                      <span className="footer-nav-arrow">
                        <svg
                          width="8"
                          height="8"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
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
                    <a
                      href={`https://maps.google.com/maps?q=${encodeURIComponent(data.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-icon-box"
                    >
                      <FaMapMarkerAlt
                        style={{ color: "#f97316", fontSize: "13px" }}
                      />
                    </a>
                    <span
                      style={{
                        color: "#475569",
                        fontSize: "13px",
                        lineHeight: "1.65",
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
                    <a
                      href={`mailto:${data.email}`}
                      className="footer-icon-box"
                    >
                      <FaEnvelope
                        style={{ color: "#1e50c8", fontSize: "13px" }}
                      />
                    </a>
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
                      marginBottom: data?.whatsapp ? "16px" : 0,
                    }}
                  >
                    <a href={`tel:${data.mobile}`} className="footer-icon-box">
                      <FaPhone style={{ color: "#1e50c8", fontSize: "13px" }} />
                    </a>
                    <a
                      href={`tel:${data.mobile}`}
                      className="footer-contact-link"
                    >
                      +91 {data.mobile}
                    </a>
                  </li>
                )}
                {data?.whatsapp && (
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <a
                      href={`https://wa.me/91${data.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-icon-box"
                    >
                      <FaWhatsapp
                        style={{ color: "#16a34a", fontSize: "13px" }}
                      />
                    </a>
                    <a
                      href={`https://wa.me/91${data.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-contact-link"
                    >
                      +91 {data.whatsapp}
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* Col 4 — Map */}
            <div className="col-lg-3 col-md-6">
              <h6 className="footer-section-title">Find Us</h6>
              <div className="footer-map-wrap">
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
              <span className="footer-bottom-name">{data?.name}</span>. All
              Rights Reserved.
            </p>
            <p>
              Designed and developed by{" "}
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
