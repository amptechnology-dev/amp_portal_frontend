"use client";
import moment from "moment";

const NoticePage = ({ data = [], active }) => {
  if (!active) return;
  return (
    <div
      style={{
        height: "300px",
        overflow: "hidden",
        borderRadius: "10px",
        width: "100%",
      }}
    >
      <marquee
        direction="up"
        id="notice"
        scrollamount="3"
        style={{ height: "100%", background: "#f2f2f2", padding: "10px" }}
        onMouseOver={() => document.getElementById("notice").stop()}
        
        onMouseOut={() => document.getElementById("notice").start()}
      >
        {data?.map((notice, index) => (
          <div
            key={index}
            style={{
              marginBottom: "20px",
              boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
              padding: "15px",
              borderRadius: "10px",
              background: "#ffffff",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <p style={{ color: "red", fontSize: "14px", margin: "0" }}>
                {moment(notice.start_date).format("DD-MM-YYYY")}
              </p>
              <a
                href={`${
                  process.env.NEXT_PUBLIC_BACKPUBLIC
                }/${notice.link?.slice(7)}`}
                style={{
                  background: "#5cb874",
                  color: "white",
                  padding: "5px 15px",
                  borderRadius: "5px",
                  fontSize: "12px",
                  fontWeight: "semi-bold",
                  textDecoration: "none",
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </div>
            <p style={{ fontSize: "16px", lineHeight: "1.4", margin: "0" }}>
              {notice.title}
            </p>
          </div>
        ))}
      </marquee>
    </div>
  );
};

export default NoticePage;
