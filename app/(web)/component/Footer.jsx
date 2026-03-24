import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

export default function Footer({ data = {}, links = {} }) {
  return (
    <footer id="footer">
      <div className="container">
        <div className="social-links">
          {links?.facebook && (
            <a href={links?.facebook} target="_blank">
              <FaFacebook />
            </a>
          )}
          {links?.twitter && (
            <a href={links?.twitter} target="_blank">
              <FaTwitter />
            </a>
          )}
          {links?.instagram && (
            <a href={links?.instagram} target="_blank">
              <FaInstagram />
            </a>
          )}
          {links?.linkedin && (
            <a href={links?.linkedin} target="_blank">
              <FaLinkedin />
            </a>
          )}
          {links?.youtube && (
            <a href={links?.youtube} target="_blank">
              <FaYoutube />
            </a>
          )}
        </div>
        <h3>{data?.name}</h3>
        <div
          className="footer-links font-weight-bold"
          style={{ fontSize: "17px" }}
        >
          {data?.enabled_services?.includes("faq") && <a href="/faq">FAQ</a>}
          {" | "}
          {data?.enabled_services?.includes("grievance") && (
            <a href="/grievance">Grievance</a>
          )}
        </div>

        <hr />
        <div className="copyright">
          &copy; Copyright{" "}
          <strong>
            <span>{data?.name}</span>
          </strong>
          . All Rights Reserved
        </div>
        <div className="credits">
          Designed by <a href="https://amptechnology.in">AmpTechnology</a>
        </div>
      </div>
    </footer>
  );
}
