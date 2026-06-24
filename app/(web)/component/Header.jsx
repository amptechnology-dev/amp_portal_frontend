"use client";
import React, { useState, useEffect } from "react";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaList, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Header = ({ data, links = {} }) => {
  const [navbarMobile, setNavbarMobile] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const sections = ["home", "products", "about", "gallery", "services", "team", "recruitment", "contact"];

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

      if (!sectionInView) {
        setActiveSection("");
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [sections]);

  const toggleMobileNav = () => {
    setNavbarMobile(!navbarMobile);
  };

  const handleScrollTo = (e) => {
    const href = e.currentTarget.getAttribute("href") || "";

    if (!href.includes("#")) {
      setNavbarMobile(false);
      return;
    }

    const [pathPart, hashPart] = href.split("#");
    const onHomePage = typeof window !== "undefined" && window.location.pathname === "/";
    const isHomeHash = pathPart === "/" || pathPart === "";

    // Let the browser navigate to home page first when hash target belongs to another route.
    if (!onHomePage && isHomeHash) {
      setNavbarMobile(false);
      return;
    }

    e.preventDefault();
    const targetId = hashPart;
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }

    setNavbarMobile(false);
  };

  return (
    <div className="sticky-top ">
      <section id="topbar" className="d-md-flex align-items-center">
        <div className="container d-flex justify-content-center justify-content-md-between ">
          <div className="contact-info d-flex align-items-center  ">
            <FaEnvelope />
            <a className="ms-1" href={"mailto:" + data?.email}>
              {data?.email}
            </a>
            <a className="ms-2" href={"tel:" + data?.mobile}>
              <FaPhone /> +91 {data?.mobile}
            </a>
          </div>
          <div className="social-links d-none d-md-block">
            {links?.facebook && (
              <a href={links?.facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebook style={{ color: "blue" }} />
              </a>
            )}
            {links?.twitter && (
              <a href={links?.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter style={{ color: "green" }} />
              </a>
            )}
            {links?.instagram && (
              <a href={links?.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram style={{ color: "purple" }} />
              </a>
            )}
            {links?.linkedin && (
              <a href={links?.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin style={{ color: "blue" }} />
              </a>
            )}
            {links?.youtube && (
              <a href={links?.youtube} target="_blank" rel="noopener noreferrer">
                <FaYoutube style={{ color: "red" }} />
              </a>
            )}
          </div>
        </div>
      </section>

      <header id="header" className={`d-flex align-items-center ${navbarMobile ? "navbar-mobile" : ""}`}>
        <div className="container d-flex align-items-center justify-content-between">
          <div className="logo">
            <Link href="/">
              <Image src={`https://${data?.logo?.slice(7)}`} alt={data?.name} width={220} height={100} />
            </Link>
          </div>

          <nav id="navbar" className={`navbar ${navbarMobile ? "navbar-mobile" : ""}`}>
            <ul>
              <li>
                <Link className={`nav-link fw-semibold ${activeSection === "home" && "active"}`} href="/#home" onClick={handleScrollTo}>
                  Home
                </Link>
              </li>
              <li>
                <Link className={`nav-link fw-semibold ${activeSection === "products" && "active"}`} href="/#products" onClick={handleScrollTo}>
                  Products
                </Link>
              </li>
              <li>
                <Link className={`nav-link fw-semibold ${activeSection === "about" && "active"}`} href="/#about" onClick={handleScrollTo}>
                  About Us
                </Link>
              </li>
              <li>
                <Link className={`nav-link fw-semibold ${activeSection === "gallery" && "active"}`} href="/gallery" onClick={handleScrollTo}>
                  Gallery
                </Link>
              </li>
              <li>
                <Link className={`nav-link fw-semibold ${activeSection === "services" && "active"}`} href="/#services" onClick={handleScrollTo}>
                  Services
                </Link>
              </li>

              <li>
                <Link className={`nav-link fw-semibold ${activeSection === "team" && "active"}`} href="/#team" onClick={handleScrollTo}>
                  Team
                </Link>
              </li>
              <li>
                <Link className={`nav-link fw-semibold ${activeSection === "recruitment" && "active"}`} href="/recruitment" onClick={handleScrollTo}>
                  Recruitment
                </Link>
              </li>
              <li>
                <Link className={`nav-link fw-semibold getstarted ${activeSection === "contact" && "active"}`} href="/#contact" onClick={handleScrollTo}>
                  Contact
                </Link>
              </li>
              {/* <li>
                <a className="getstarted" href="/login" onClick={handleScrollTo}>
                  Login
                </a>
              </li> */}
            </ul>
            <FaList className="mobile-nav-toggle text-success" onClick={toggleMobileNav} />
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
