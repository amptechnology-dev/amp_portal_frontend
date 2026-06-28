"use client";
import { useState } from "react";
import Image from "next/image";

const Gallery = ({ data = [], loadButton = false }) => {
  const [modalImg, setModalImg] = useState(null);

  const openModal = (src) => {
    setModalImg(src);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalImg(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <style>{`
        #gallery {
          background: linear-gradient(135deg, #f0f4ff 0%, #fff7ed 100%);
          padding: 80px 0;
          font-family: 'Open Sans', sans-serif;
        }

        .gal-badge {
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
        .gal-badge::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #f97316;
          flex-shrink: 0;
        }

        .gal-title {
          font-size: clamp(26px, 4vw, 38px);
          font-weight: 800;
          color: #1e3a8a;
          margin-bottom: 6px;
        }
        .gal-title span {
          background: linear-gradient(90deg, #f97316, #fb923c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gal-divider {
          width: 48px; height: 4px;
          border-radius: 4px;
          background: linear-gradient(90deg, #1e50c8, #f97316);
          margin: 12px auto 48px;
        }

        /* Grid */
        .gal-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 18px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Card */
        .gal-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          border: 1.5px solid #e2e8f0;
          box-shadow: 0 4px 14px rgba(30,80,200,0.07);
          cursor: pointer;
          aspect-ratio: 4/3;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .gal-card::before {
          content: '';
          display: block;
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #1e50c8, #f97316);
          z-index: 2;
        }
        .gal-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 36px rgba(30,80,200,0.14);
        }
        .gal-card img {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          transition: transform 0.4s ease !important;
        }
        .gal-card:hover img {
          transform: scale(1.07);
        }

        /* Overlay */
        .gal-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(30,80,200,0.7), rgba(249,115,22,0.6));
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.3s ease;
          z-index: 1;
        }
        .gal-card:hover .gal-overlay { opacity: 1; }
        .gal-overlay-icon {
          width: 48px; height: 48px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          border: 2px solid #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          transform: scale(0.7);
          transition: transform 0.3s ease;
        }
        .gal-card:hover .gal-overlay-icon { transform: scale(1); }

        /* Show More */
        .gal-show-more-wrap {
          display: flex;
          justify-content: center;
          margin-top: 48px;
        }
        .gal-show-more {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 32px;
          background: linear-gradient(135deg, #1e50c8, #2563eb);
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.25s ease;
          box-shadow: 0 4px 16px rgba(30,80,200,0.28);
        }
        .gal-show-more:hover {
          background: linear-gradient(135deg, #f97316, #fb923c);
          box-shadow: 0 4px 16px rgba(249,115,22,0.35);
          color: #fff;
          transform: translateY(-2px);
        }

        /* Modal */
        .gal-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15,23,42,0.75);
          backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: galOverlayIn 0.25s ease;
        }
        @keyframes galOverlayIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .gal-modal-box {
          position: relative;
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          max-width: 860px;
          width: 100%;
          box-shadow: 0 30px 80px rgba(0,0,0,0.3);
          animation: galModalIn 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes galModalIn {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
        .gal-modal-box::before {
          content: '';
          display: block;
          height: 4px;
          background: linear-gradient(90deg, #1e50c8, #f97316);
        }
        .gal-modal-box img {
          width: 100%;
          max-height: 75vh;
          object-fit: contain;
          display: block;
          background: #f8fafc;
        }

        .gal-modal-close {
          position: absolute;
          top: 14px; right: 14px;
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          font-size: 18px;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          z-index: 2;
        }
        .gal-modal-close:hover {
          background: #fee2e2;
          color: #ef4444;
          transform: rotate(90deg);
        }
      `}</style>

      <section id="gallery">
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="gal-badge">Our Work</div>
          </div>
          <h2 className="gal-title">Photo <span>Gallery</span></h2>
          <div className="gal-divider" />
        </div>

        <div className="gal-grid">
          {data?.map((item, index) => (
            <div key={index} className="gal-card" onClick={() => openModal(item.image)}>
              <Image
                src={item.image}
                alt={item.description || "Gallery image"}
                width={400}
                height={300}
                unoptimized
              />
              <div className="gal-overlay">
                <div className="gal-overlay-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    <path d="M11 8v6M8 11h6"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {loadButton && (
          <div className="gal-show-more-wrap">
            <a href="/gallery" className="gal-show-more">
              Show More
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        )}
      </section>

      {/* Modal */}
      {modalImg && (
        <div className="gal-modal-overlay" onClick={closeModal}>
          <div className="gal-modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="gal-modal-close" onClick={closeModal}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <img src={modalImg} alt="Gallery preview" />
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;