import { FaDribbble } from "react-icons/fa";

async function getData() {
  try {
    let officeData = await fetch(`${process.env.BACKLINK}/public/officeData`, {
      headers: { "x-api-key": process.env.API_KEY, "office-id": process.env.OFFICE },
      next: { revalidate: 3000 },
    });
    officeData = await officeData.json();
    const isActive = officeData.data?.enabled_services?.includes("service");
    if (!isActive) return;

    const res = await fetch(`${process.env.BACKLINK}/public/service`, {
      headers: { "x-api-key": process.env.API_KEY, "office-id": process.env.OFFICE },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}

// Blue/Orange alternating accent colors
const ACCENT_COLORS = [
  { bg: "#eff6ff", icon: "#1e50c8", border: "#dbeafe" },
  { bg: "#fff7ed", icon: "#f97316", border: "#fed7aa" },
  { bg: "#f0f9ff", icon: "#0284c7", border: "#bae6fd" },
  { bg: "#fff7ed", icon: "#ea580c", border: "#fed7aa" },
  { bg: "#eff6ff", icon: "#2563eb", border: "#dbeafe" },
  { bg: "#fefce8", icon: "#ca8a04", border: "#fef08a" },
];

export default async function ServiceGrid() {
  let data = await getData();
  if (!data || data.data?.length === 0) return null;
  data = data?.data;

  return (
    <>
      <style>{`
        #services {
          background: linear-gradient(135deg, #fff7ed 0%, #f0f4ff 100%);
          padding: 80px 0;
          font-family: 'Open Sans', sans-serif;
        }

        .svc-badge {
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
        .svc-badge::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #f97316;
          flex-shrink: 0;
        }

        .svc-title {
          font-size: clamp(26px, 4vw, 38px);
          font-weight: 800;
          color: #1e3a8a;
          margin-bottom: 6px;
        }
        .svc-title span {
          background: linear-gradient(90deg, #f97316, #fb923c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .svc-divider {
          width: 48px; height: 4px;
          border-radius: 4px;
          background: linear-gradient(90deg, #1e50c8, #f97316);
          margin: 12px auto 48px;
        }

        .svc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .svc-card {
          background: #fff;
          border-radius: 18px;
          padding: 28px 24px;
          border: 1.5px solid #e2e8f0;
          box-shadow: 0 4px 14px rgba(30,80,200,0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
          text-decoration: none;
          display: block;
        }
        .svc-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #1e50c8, #f97316);
        }
        .svc-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 40px rgba(30,80,200,0.13);
        }

        .svc-icon-wrap {
          width: 56px; height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          margin-bottom: 18px;
          border: 1.5px solid;
          transition: transform 0.3s ease;
        }
        .svc-card:hover .svc-icon-wrap {
          transform: scale(1.1) rotate(-4deg);
        }

        .svc-card-title {
          font-size: 17px;
          font-weight: 800;
          color: #1e3a8a;
          margin-bottom: 10px;
          line-height: 1.35;
        }

        .svc-card-desc {
          color: #64748b;
          font-size: 14px;
          line-height: 1.8;
          margin: 0;
        }

        .svc-card-arrow {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 16px;
          font-size: 13px;
          font-weight: 700;
          color: #1e50c8;
          transition: gap 0.2s ease;
        }
        .svc-card:hover .svc-card-arrow {
          gap: 8px;
          color: #f97316;
        }
      `}</style>

      <section id="services">
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="svc-badge">What We Do</div>
          </div>
          <h2 className="svc-title">Our <span>Services</span></h2>
          <div className="svc-divider" />
        </div>

        <div className="svc-grid">
          {data?.map((item, index) => {
            const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
            return (
              <a
                key={index}
                href={item.url || "#"}
                className="svc-card"
                style={{ color: "inherit" }}
              >
                <div
                  className="svc-icon-wrap"
                  style={{
                    background: accent.bg,
                    borderColor: accent.border,
                    color: accent.icon,
                  }}
                >
                  <FaDribbble />
                </div>
                <h4 className="svc-card-title">{item.name}</h4>
                <p className="svc-card-desc">{item.description}</p>
                <div className="svc-card-arrow">
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}