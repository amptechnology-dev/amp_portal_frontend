"use client";
import { useState } from "react";
import styles from "../styles/Product.module.css";
import Image from "next/image";

const ProductGallery = ({ projects = [], loadButton = false }) => {
  const [modalData, setModalData] = useState(null);


  console.log("product", projects)

  const openModal = (product) => {
    setModalData(product);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalData(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className={styles.container} id="products">
      <div className="section-title">
        <h2>Our Products</h2>
      </div>
      <div className={styles.products}>
        {projects?.data?.map((product, index) => (
          <div key={index} className={styles.card}>
            <Image
              src={product.image}
              alt="Product Image"
              width={200}
              height={200}
              unoptimized
            />
            <h3>{product.title}</h3>
            {/* <p>{product.category}</p> */}
            <div className={styles.buttons}>
              <a
                href={`https://wa.me/918697972001?text=Enquiry%20About%20${encodeURIComponent(
                  product?.title
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.enquiry}
              >
                Enquiry Now
              </a>

              <button
                className={styles.view}
                onClick={() => openModal(product)}
              >
                View more
              </button>
            </div>
          </div>
        ))}
      </div>
      {loadButton && (
        <div className="button-container">
          <a href="/Products" className="animated-btn">
            Show More
          </a>

          <style jsx>{`
            .button-container {
              display: flex;
              justify-content: center;
              padding: 2rem 0;
            }
            .animated-btn {
              background: #4099de;
              color: white;
              padding: 10px 20px;
              border: none;
              border-radius: 5px;
              text-decoration: none;
              font-size: 16px;
              transition: transform 0.3s ease, box-shadow 0.3s ease;
              animation: fadeInUp 0.5s ease-out;
            }
            .animated-btn:hover {
              transform: scale(1.05);
              box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </div>
      )}

      {modalData && (
        <div
          className={`${styles.modal} ${modalData ? styles.active : ""}`}
          onClick={closeModal}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={styles.close} onClick={closeModal}>
              &times;
            </span>
            <div className={styles.modalImage}>
              <Image
                src={`https://${modalData.image.slice(7)}`}
                alt="Product Image"
                width={400}
                height={500}
                unoptimized
              />
            </div>
            <div className={styles.modalText}>
              <h2>{modalData.title}</h2>
              <p>{modalData.description}</p>
              <div className={styles.buttons}>
                {/* <a href="tel:8697972001" className={styles.enquiry}>
                  Enquiry Now
                </a> */}
                <a
                  href={`https://wa.me/918697972001?text=Enquiry%20About%20${encodeURIComponent(
                    modalData?.title
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.enquiry}
                >
                  Enquiry Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
