import FaqSection from "../component/Faq";

async function getData() {
  try {
    let officeData = await fetch(`${process.env.BACKLINK}/public/officeData`, {
      headers: {
        "x-api-key": process.env.API_KEY,
        "office-id": process.env.OFFICE,
      },
      cache: "no-store",
    });
    officeData = await officeData.json();
    const isActive = officeData.data?.enabled_services?.includes("faq");

    if (!isActive) return;

    const res = await fetch(`${process.env.BACKLINK}/public/faq`, {
      headers: {
        "x-api-key": process.env.API_KEY,
        "office-id": process.env.OFFICE,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return console.error(`Failed to fetch service data: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}

export default async function Faq() {
  let data = await getData();
  if (!data || data.data?.length === 0) return;
  data = data?.data.slice(0, 5);

  return <FaqSection faqData={data} />;
}
