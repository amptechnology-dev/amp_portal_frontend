"use client";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const HeroSection = ({ images = [] }) => {
  return (
    <section id="home">
      <Splide
        options={{
          type: "loop",
          rewind: true,
          perPage: 1,
          autoplay: true,
          interval: 3000,
          pagination: true,
          arrows: false,
        }}
      >
        {images?.map((image, index) => (
          <SplideSlide key={index}>
            <div className="carousel-item active">
              <div className="carousel-container">{/* <div className="container">Content for Slide 1</div> */}</div>
              <img src={`https://${image.slice(7)}`} alt={"Banner " + index} style={{ width: "100%", height: "80vh", objectFit: "fill" }} />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </section>
  );
};

export default HeroSection;

// "use client";
// import ReactPlayer from "react-player";

// const HeroSection = ({ data = "" }) => {
//   return (
//     <div className="container-fluid px-0 " id="home">
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           position: "relative",
//           backgroundColor: "#000",
//         }}
//       >
//         <div style={{ position: "relative", width: "100%" }}>
//           <ReactPlayer
//             url={data}
//             playing
//             muted
//             controls
//             loop
//             width="100%"
//             height="100%"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
