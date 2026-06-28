"use client";
import { useState } from "react";
import Image from "next/image";

const ProductGallery = ({ projects = [], loadButton = false }) => {
  const [modalData, setModalData] = useState(null);

  const openModal = (product) => {
    setModalData(product);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalData(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <style>{`
        /* ── Section ── */
        #products {
          background: linear-gradient(135deg, #f0f4ff 0%, #fff7ed 100%);
          padding: 80px 0;
          font-family: 'Open Sans', sans-serif;
        }

        .prod-badge {
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
        .prod-badge::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #f97316;
        }

        .prod-title {
          font-size: clamp(26px, 4vw, 38px);
          font-weight: 800;
          color: #1e3a8a;
          margin-bottom: 6px;
        }
        .prod-title span {
          background: linear-gradient(90deg, #f97316, #fb923c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .prod-divider {
          width: 48px; height: 4px;
          border-radius: 4px;
          background: linear-gradient(90deg, #1e50c8, #f97316);
          margin: 12px auto 48px;
        }

        /* ── Grid ── */
        .prod-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* ── Card ── */
        .prod-card {
          background: #fff;
          border-radius: 18px;
          overflow: hidden;
          border: 1.5px solid #e2e8f0;
          box-shadow: 0 4px 16px rgba(30, 80, 200, 0.07);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .prod-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(30, 80, 200, 0.14);
        }

        .prod-card-img {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
          background: #f8fafc;
        }
        .prod-card-img img {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          transition: transform 0.4s ease !important;
        }
        .prod-card:hover .prod-card-img img {
          transform: scale(1.06);
        }

        /* Orange top accent line */
        .prod-card::before {
          content: '';
          display: block;
          height: 3px;
          background: linear-gradient(90deg, #1e50c8, #f97316);
          flex-shrink: 0;
        }

        .prod-card-body {
          padding: 18px 18px 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .prod-card-title {
          font-size: 16px;
          font-weight: 700;
          color: #1e3a8a;
          margin-bottom: 14px;
          line-height: 1.4;
        }

        .prod-btn-row {
          display: flex;
          gap: 10px;
          margin-top: auto;
        }

        /* Enquiry — Orange filled */
        .prod-btn-enquiry {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 9px 14px;
          background: linear-gradient(135deg, #f97316, #fb923c);
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          border-radius: 10px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 3px 10px rgba(249, 115, 22, 0.3);
        }
        .prod-btn-enquiry:hover {
          background: linear-gradient(135deg, #ea6c0a, #f97316);
          transform: translateY(-1px);
          color: #fff;
          box-shadow: 0 5px 14px rgba(249, 115, 22, 0.4);
        }
        .prod-btn-enquiry svg { flex-shrink: 0; }

        /* View More — Blue outline */
        .prod-btn-view {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 9px 14px;
          background: transparent;
          color: #1e50c8;
          font-size: 13px;
          font-weight: 700;
          border-radius: 10px;
          border: 1.5px solid #1e50c8;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .prod-btn-view:hover {
          background: #1e50c8;
          color: #fff;
          transform: translateY(-1px);
          box-shadow: 0 5px 14px rgba(30, 80, 200, 0.25);
        }
        .prod-btn-view svg { flex-shrink: 0; }

        /* ── Show More button ── */
        .prod-show-more-wrap {
          display: flex;
          justify-content: center;
          margin-top: 48px;
        }
        .prod-show-more {
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
          box-shadow: 0 4px 16px rgba(30, 80, 200, 0.28);
        }
        .prod-show-more:hover {
          background: linear-gradient(135deg, #f97316, #fb923c);
          box-shadow: 0 4px 16px rgba(249, 115, 22, 0.35);
          color: #fff;
          transform: translateY(-2px);
        }

        /* ── Modal Overlay ── */
        .prod-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: overlayIn 0.25s ease;
        }
        @keyframes overlayIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── Modal Box ── */
        .prod-modal {
          background: #fff;
          border-radius: 24px;
          overflow: hidden;
          max-width: 820px;
          width: 100%;
          max-height: 90vh;
          display: flex;
          flex-direction: row;
          box-shadow: 0 30px 80px rgba(0,0,0,0.25);
          animation: modalIn 0.3s cubic-bezier(0.34,1.56,0.64,1);
          position: relative;
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.88) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Top gradient accent */
        .prod-modal::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, #1e50c8, #f97316);
          z-index: 1;
        }

        .prod-modal-img {
          width: 45%;
          flex-shrink: 0;
          background: #f0f4ff;
          position: relative;
          overflow: hidden;
        }
        .prod-modal-img img {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }

        .prod-modal-body {
          flex: 1;
          padding: 36px 32px 32px;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        .prod-modal-close {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 34px; height: 34px;
          border-radius: 50%;
          background: #f1f5f9;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          font-size: 18px;
          transition: all 0.2s ease;
          z-index: 2;
        }
        .prod-modal-close:hover {
          background: #fee2e2;
          color: #ef4444;
          transform: rotate(90deg);
        }

        .prod-modal-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #fff7ed;
          border: 1px solid #fed7aa;
          color: #f97316;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 100px;
          margin-bottom: 12px;
          width: fit-content;
        }

        .prod-modal-title {
          font-size: 24px;
          font-weight: 800;
          color: #1e3a8a;
          margin-bottom: 6px;
          line-height: 1.3;
        }

        .prod-modal-divider {
          width: 40px; height: 3px;
          border-radius: 3px;
          background: linear-gradient(90deg, #1e50c8, #f97316);
          margin: 14px 0 18px;
        }

        .prod-modal-desc {
          color: #475569;
          font-size: 14px;
          line-height: 1.85;
          flex: 1;
          margin-bottom: 28px;
        }

        .prod-modal-enquiry {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px 28px;
          background: linear-gradient(135deg, #f97316, #fb923c);
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(249,115,22,0.32);
          width: 100%;
        }
        .prod-modal-enquiry:hover {
          background: linear-gradient(135deg, #ea6c0a, #f97316);
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(249,115,22,0.42);
          color: #fff;
        }

        @media (max-width: 640px) {
          .prod-modal {
            flex-direction: column;
            max-height: 92vh;
          }
          .prod-modal-img {
            width: 100%;
            height: 220px;
          }
          .prod-modal-body {
            padding: 24px 20px 20px;
          }
        }
      `}</style>

      <section id="products">
        <div style={{ textAlign: "center", marginBottom: "0" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="prod-badge">What We Offer</div>
          </div>
          <h2 className="prod-title">
            Our <span>Products</span>
          </h2>
          <div className="prod-divider" />
        </div>

        {/* Grid */}
        <div className="prod-grid">
          {projects?.data?.map((product, index) => (
            <div key={index} className="prod-card">
              <div className="prod-card-img">
                <Image
                  src={product.image}
                  alt={product.title || "Product"}
                  width={400}
                  height={200}
                  unoptimized
                />
              </div>
              <div className="prod-card-body">
                <h3 className="prod-card-title">{product.title}</h3>
                <div className="prod-btn-row">
                  {/* Enquiry — WhatsApp */}
                  <a
                    href={`https://wa.me/918697972001?text=Enquiry%20About%20${encodeURIComponent(product?.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="prod-btn-enquiry"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Enquiry
                  </a>

                  {/* View More — Blue outline */}
                  <button
                    className="prod-btn-view"
                    onClick={() => openModal(product)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More */}
        {loadButton && (
          <div className="prod-show-more-wrap">
            <a href="/Products" className="prod-show-more">
              Show More
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        )}
      </section>

      {/* ── Modal ── */}
      {modalData && (
        <div className="prod-modal-overlay" onClick={closeModal}>
          <div className="prod-modal" onClick={(e) => e.stopPropagation()}>

            {/* Close */}
            <button className="prod-modal-close" onClick={closeModal} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {/* Image side */}
            <div className="prod-modal-img">
              <Image
                src={`https://${modalData.image.slice(7)}`}
                alt={modalData.title || "Product"}
                width={400}
                height={500}
                unoptimized
              />
            </div>

            {/* Content side */}
            <div className="prod-modal-body">
              <div className="prod-modal-badge">
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#f97316", flexShrink: 0 }} />
                Product Details
              </div>

              <h2 className="prod-modal-title">{modalData.title}</h2>
              <div className="prod-modal-divider" />
              <p className="prod-modal-desc">{modalData.description}</p>

              <a
                href={`https://wa.me/918697972001?text=Enquiry%20About%20${encodeURIComponent(modalData?.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="prod-modal-enquiry"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Enquiry on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductGallery;