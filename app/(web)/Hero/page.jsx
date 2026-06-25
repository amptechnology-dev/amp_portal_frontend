import HeroSection from "../component/Herosec";

async function getData() {
  try {
    let officeData = await fetch(`${process.env.BACKLINK}/public/officeData`, {
      headers: {
        "x-api-key": process.env.API_KEY,
        "office-id": process.env.OFFICE,
      },
      cache: "no-store",
    });
    if (!officeData.ok) {
      return console.error(`Failed to fetch office data: ${officeData.statusText}`);
    }

    return officeData.json();
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}

async function page() {
  const banners = await getData();
  return <HeroSection images={banners?.data?.banner} />;
}

export default page;

// import HeroSection from "../component/Herosec";

// const getProjectData = async () => {
//   try {
//     const res = await fetch(`${process.env.BACKLINK}/public/officeData`, {
//       headers: {
//         "x-api-key": process.env.API_KEY,
//         "office-id": process.env.OFFICE,
//       },
//       cache: "no-store",
//     });
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching project data:", error);
//     return null;
//   }
// };

// export default async function videosPage() {
//   const videos = await getProjectData();

//   return (
//     <div>
//       <HeroSection data={videos?.data?.video_banner} />
//     </div>
//   );
// }
