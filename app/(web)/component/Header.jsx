"use client";
import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaList,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaTimes,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Header = ({ data, links = {} }) => {
  const [navbarMobile, setNavbarMobile] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  const sections = [
    "home",
    "about",
    "products",
    "gallery",
    "services",
    "team",
    "recruitment",
    "contact",
  ];

  const socialItems = [
    { icon: <FaFacebook />, href: links?.facebook, cls: "nav-social-fb" },
    { icon: <FaTwitter />, href: links?.twitter, cls: "nav-social-tw" },
    { icon: <FaInstagram />, href: links?.instagram, cls: "nav-social-ig" },
    { icon: <FaLinkedin />, href: links?.linkedin, cls: "nav-social-li" },
    { icon: <FaYoutube />, href: links?.youtube, cls: "nav-social-yt" },
  ].filter((s) => s.href);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let found = false;
      sections.forEach((section) => {
        const el = document.getElementById(section);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            found = true;
            setActiveSection(section);
          }
        }
      });
      if (!found) setActiveSection("home");
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileNav = () => setNavbarMobile((prev) => !prev);

  const handleScrollTo = (e) => {
    const href = e.currentTarget.getAttribute("href");
    if (href.startsWith("/") && !href.includes("#")) return;
    e.preventDefault();
    const sectionId = href.split("#")[1];
    if (!sectionId) return;

    const doScroll = (retries = 5) => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setNavbarMobile(false);
      } else if (retries > 0) {
        setTimeout(() => doScroll(retries - 1), 200);
      }
    };
    doScroll();
  };

  const navItems = [
    { id: "home", label: "Home", href: "/#home" },
    { id: "about", label: "About Us", href: "/#about" },
    { id: "products", label: "Products", href: "/#products" },
    { id: "gallery", label: "Gallery", href: "#gallery" },
    { id: "services", label: "Services", href: "/#services" },
    { id: "contact", label: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <style>{`
        /* ── Base header ── */
        #amp-header {
  position: sticky;
  top: 0;
  z-index: 999;
  background: #ffffff;
  border-bottom: 2px solid #f0f4ff;
  transition: box-shadow 0.3s ease;
  font-family: 'Open Sans', sans-serif;
  width: 100%;
}

@media (max-width: 1199px) {
  #amp-header {
    position: fixed;
    left: 0;
    right: 0;
  }
}
        #amp-header.scrolled {
          box-shadow: 0 4px 20px rgba(30, 80, 200, 0.10);
        }

        .amp-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .amp-logo-title {
        background: linear-gradient(90deg, #1e50c8, #f97316);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        }

        /* ── Nav links ── */
        .amp-nav {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .amp-nav-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #1e50c8;
          text-decoration: none;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .amp-nav-link::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 60%;
          height: 2px;
          border-radius: 2px;
          background: #f97316;
          transition: transform 0.25s ease;
        }
        .amp-nav-link:hover {
          color: #f97316;
          background: #fff7ed;
        }
        .amp-nav-link:hover::after {
          transform: translateX(-50%) scaleX(1);
        }
        .amp-nav-link.active {
          color: #f97316;
          background: #fff7ed;
        }
        .amp-nav-link.active::after {
          transform: translateX(-50%) scaleX(1);
        }

        /* ── Contact + Social box ── */
        .amp-contact-box {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 7px 14px;
          border: 1.5px solid #1e50c8;
          border-radius: 10px;
          background: #f0f4ff;
          flex-shrink: 0;
        }

        .amp-contact-link {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          font-weight: 600;
          color: #1e3a8a;
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.2s;
        }
        .amp-contact-link:hover { color: #f97316; }
        .amp-contact-link svg { color: #1e50c8; font-size: 12px; flex-shrink: 0; }

        .amp-divider {
          width: 1px;
          height: 16px;
          background: #1e50c8;
          opacity: 0.3;
          flex-shrink: 0;
        }

        /* ── Social icons in nav ── */
.amp-social-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: 4px;
  padding-left: 10px;
  border-left: 1.5px solid #e2e8f0;
}
.amp-social-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 13px;
  text-decoration: none;
  transition: all 0.25s ease;
  flex-shrink: 0;
}
.amp-social-icon:hover { transform: translateY(-2px); filter: brightness(1.1); }

.nav-social-fb { background: #1877f2; }
.nav-social-tw { background: #1da1f2; }
.nav-social-ig { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }
.nav-social-li { background: #0a66c2; }
.nav-social-yt { background: #ff0000; }
.nav-social-wa { background: #25d366; }

        /* ── Mobile toggle button ── */
        .amp-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          color: #1e50c8;
          font-size: 20px;
          border-radius: 8px;
          transition: background 0.2s;
        }
        .amp-toggle:hover { background: #f0f4ff; }

        /* ── Mobile menu ── */
        .amp-mobile-menu {
          display: none;
          flex-direction: column;
          background: #fff;
          border-top: 2px solid #f0f4ff;
          padding: 12px 16px 16px;
          gap: 4px;
          box-shadow: 0 8px 24px rgba(30,80,200,0.10);
        }
        .amp-mobile-menu.open { display: flex; }

        .amp-mobile-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 14px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          color: #1e50c8;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .amp-mobile-link:hover,
        .amp-mobile-link.active {
          background: #fff7ed;
          color: #f97316;
        }
        .amp-mobile-link .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          flex-shrink: 0;
        }

        .amp-mobile-contact {
          margin-top: 8px;
          padding: 12px 14px;
          border-radius: 10px;
          background: #f0f4ff;
          border: 1.5px solid #dbeafe;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .amp-mobile-social {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          padding-top: 4px;
          border-top: 1px solid #e2e8f0;
        }

        /* ── Responsive ── */
        @media (max-width: 1199px) {
          .amp-desktop-nav { display: none !important; }
          .amp-toggle { display: flex; }
        }
        @media (min-width: 1200px) {
          .amp-mobile-menu { display: none !important; }
        }
       
        @media (max-width: 1199px) {
        body {
        padding-top: 70px;
        }
        }
      `}</style>

      <div id="amp-header" className={isScrolled ? "scrolled" : ""}>
        <div className="amp-inner">
          {/* Logo + Office Name */}
          <Link
            href="/"
            style={{
              flexShrink: 1,
              minWidth: 0,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
            }}
          >
            <Image
              src={`https://${data?.logo?.slice(7)}`}
              alt={data?.name || "Logo"}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "auto",
                height: "52px",
                objectFit: "contain",
                flexShrink: 0,
              }}
              priority
            />
            {data?.name && (
              <span
                className="amp-logo-title"
                style={{
                  fontSize: "clamp(13px, 3.8vw, 18px)",
                  fontWeight: 800,
                  letterSpacing: "0.3px",
                  lineHeight: 1.1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {data.name}
              </span>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav
            className="amp-desktop-nav"
            style={{ display: "flex", alignItems: "center", gap: "2px" }}
          >
            <ul className="amp-nav">
              {navItems.map(({ id, label, href }) => (
                <li key={id}>
                  <Link
                    href={href}
                    className={`amp-nav-link ${activeSection === id ? "active" : ""}`}
                    onClick={handleScrollTo}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact box */}
            {(data?.email || data?.mobile) && (
              <div className="amp-contact-box" style={{ marginLeft: "12px" }}>
                {data?.email && (
                  <a href={`mailto:${data.email}`} className="amp-contact-link">
                    <FaEnvelope />
                    {data.email}
                  </a>
                )}
                {data?.email && data?.mobile && (
                  <span className="amp-divider" />
                )}
                {data?.mobile && (
                  <a href={`tel:${data.mobile}`} className="amp-contact-link">
                    <FaPhone />
                    +91 {data.mobile}
                  </a>
                )}
              </div>
            )}

            {/* Dynamic Social Icons */}
            {socialItems.length > 0 && (
              <div className="amp-social-wrap">
                {socialItems.map(({ icon, href, cls }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`amp-social-icon ${cls}`}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            )}
          </nav>

          {/* Mobile toggle */}
          <button
            className="amp-toggle"
            onClick={toggleMobileNav}
            aria-label="Toggle menu"
          >
            {navbarMobile ? <FaTimes /> : <FaList />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`amp-mobile-menu ${navbarMobile ? "open" : ""}`}>
          {navItems.map(({ id, label, href }) => (
            <Link
              key={id}
              href={href}
              className={`amp-mobile-link ${activeSection === id ? "active" : ""}`}
              onClick={handleScrollTo}
            >
              <span className="dot" />
              {label}
            </Link>
          ))}

          {/* Mobile Contact */}
          {(data?.email || data?.mobile) && (
            <div className="amp-mobile-contact">
              {data?.email && (
                <a href={`mailto:${data.email}`} className="amp-contact-link">
                  <FaEnvelope style={{ color: "#1e50c8" }} />
                  {data.email}
                </a>
              )}
              {data?.mobile && (
                <a href={`tel:${data.mobile}`} className="amp-contact-link">
                  <FaPhone style={{ color: "#1e50c8" }} />
                  +91 {data.mobile}
                </a>
              )}

              {/* Mobile Social */}
              {socialItems.length > 0 && (
                <div className="amp-mobile-social">
                  {socialItems.map(({ icon, href, cls }, i) => (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`amp-social-icon ${cls}`}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
