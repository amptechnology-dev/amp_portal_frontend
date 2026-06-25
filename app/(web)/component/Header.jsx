"use client";
import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaList,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Header = ({ data, links = {} }) => {
  const [navbarMobile, setNavbarMobile] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    "home", "about", "products", "gallery",
    "services", "team", "recruitment", "contact",
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let sectionInView = false;

      sections.forEach((section) => {
        const sectionElement = document.getElementById(section);
        if (sectionElement) {
          const { offsetTop, offsetHeight } = sectionElement;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            sectionInView = true;
            setActiveSection(section);
          }
        }
      });

      if (!sectionInView) setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileNav = () => setNavbarMobile((prev) => !prev);

  const handleScrollTo = (e) => {
    const href = e.currentTarget.getAttribute("href");
    if (href.startsWith("/")) return;
    e.preventDefault();
    const sectionId = href.replace("#", "");

    const scrollToSection = (retries = 5) => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        if (navbarMobile) setNavbarMobile(false);
      } else if (retries > 0) {
        setTimeout(() => scrollToSection(retries - 1), 200);
      }
    };

    scrollToSection();
  };

  const navItems = [
    { id: "home", label: "Home", href: "/#home" },
    { id: "about", label: "About Us", href: "/#about" },
    { id: "products", label: "Products", href: "/#products" },
    { id: "gallery", label: "Gallery", href: "#gallery" },
    { id: "services", label: "Services", href: "/#services" },
  ];

  return (
    <div className="sticky-top">
      <header
        id="header"
        className={`d-flex align-items-center ${navbarMobile ? "navbar-mobile" : ""}`}
        style={{ height: "70px" }}
      >
        <div className="container d-flex align-items-center justify-content-between">
          {/* Logo */}
          <div className="logo">
            <Link href="/">
              <Image
                src={`https://${data?.logo?.slice(7)}`}
                alt={data?.name || "Logo"}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "auto", height: "55px", objectFit: "contain" }}
                priority
              />
            </Link>
          </div>

          {/* Nav */}
          <nav
            id="navbar"
            className={`navbar ${navbarMobile ? "navbar-mobile" : ""}`}
          >
            <ul>
              {navItems.map(({ id, label, href }) => (
                <li key={id}>
                  <Link
                    className={`nav-link fw-semibold ${activeSection === id ? "active" : ""}`}
                    href={href}
                    onClick={handleScrollTo}
                  >
                    {label}
                  </Link>
                </li>
              ))}

              {/* Contact — normal nav link, no green button */}
              <li>
                <Link
                  className={`nav-link fw-semibold ${activeSection === "contact" ? "active" : ""}`}
                  href="/#contact"
                  onClick={handleScrollTo}
                >
                  Contact
                </Link>
              </li>

              {/* Email & Phone with green border box */}
              <li className="d-none d-xl-flex align-items-center">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    marginLeft: "20px",
                    padding: "6px 16px",
                    border: "1.5px solid #5cb874",
                    borderRadius: "8px",
                    backgroundColor: "#f6fdf8",
                  }}
                >
                  <a
                    href={`mailto:${data?.email}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "13px",
                      color: "#333",
                      whiteSpace: "nowrap",
                      padding: "0",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#5cb874")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
                  >
                    <FaEnvelope style={{ color: "#5cb874", fontSize: "13px", flexShrink: 0 }} />
                    {data?.email}
                  </a>

                  <span style={{ width: "1px", height: "16px", backgroundColor: "#5cb874", opacity: 0.4 }} />

                  <a
                    href={`tel:${data?.mobile}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "13px",
                      color: "#333",
                      whiteSpace: "nowrap",
                      padding: "0",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#5cb874")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
                  >
                    <FaPhone style={{ color: "#5cb874", fontSize: "13px", flexShrink: 0 }} />
                    +91 {data?.mobile}
                  </a>
                </div>
              </li>
            </ul>

            <FaList
              className="mobile-nav-toggle text-success"
              onClick={toggleMobileNav}
            />
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;