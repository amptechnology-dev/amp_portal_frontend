"use client";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export default function Ads({ data = [], active }) {
  if (!active) return;
  return (
    <Splide
      options={{
        type: "loop",
        pagination: false,
        arrows: false,
        autoplay: true,
        interval: 3000,
      }}
    >
      {data?.map((image, index) => (
        <SplideSlide key={index}>
          <div style={{ width: 600, height: 300,  }}>
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKPUBLIC}/${image.image.slice(
                7
              )}`}
              className="rounded-3"
              alt={`Image ${index + 1}`}
              width={600}
              height={300}
            />
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
}
