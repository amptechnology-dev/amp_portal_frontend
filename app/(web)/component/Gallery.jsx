"use client";
import { useEffect, useState } from "react";
import styles from "../styles/gallery.module.css";
import { Modal } from "react-bootstrap";
import Image from "next/image";

const Gallery = ({ data = [], loadButton = false }) => {
  const [modalImg, setModalImg] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (src) => {
    setModalImg(src);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.classList.contains("gallery-item")) {
        const src = e.target.getAttribute("src");
        handleShowModal(src);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <section className={`${styles.gallery} py-5`} id="gallery">
      <div className="section-title">
        <h2>Gallery</h2>
      </div>
      <div className="container-lg">
        <div className="row gy-4 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4">
          {data?.map((item, index) => (
            <div className="col" key={index}>
              <Image
                width={300}
                height={250}
                src={item.image}
                className="gallery-item"
                alt={item.description}
              />
            </div>
          ))}
        </div>
        {loadButton && (
          <div className="text-center py-5">
            <a
              href="/gallery"
              className="btn"
              style={{ background: "#5cb874", color: "white" }}
            >
              Show More
            </a>
          </div>
        )}
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <img
            src={modalImg}
            className="modal-img"
            alt="modal img"
            style={{ width: "100%" }}
          />
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Gallery;
