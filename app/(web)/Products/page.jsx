// import styles from "../Styles/BlogSection.module.css";
import ProductGallery from "../component/ProductGallery";
async function getProjectData() {
  try {
    let officeData = await fetch(`${process.env.BACKLINK}/public/officeData`, {
      headers: {
        "x-api-key": process.env.API_KEY,
        "office-id": process.env.OFFICE,
      },
      cache: "no-store",
    });
    officeData = await officeData.json();
    const isActive = officeData.data?.enabled_services?.includes("activity");

    // if (!isActive) return null;

    const res = await fetch(`${process.env.BACKLINK}/public/activity`, {
      headers: {
        "x-api-key": process.env.API_KEY,
        "office-id": process.env.OFFICE,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Failed to fetch project data: ${res.statusText}`);
      return null;
    }

    return {
      data: await res.json(),
      bgimage: officeData.data.activity_bg_iamge,
    };
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}
export default async function Page() {
  const projects = await getProjectData();
  // console.log("Projects:", projects?.data);

  return <ProductGallery projects={projects?.data} />;
}
