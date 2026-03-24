import NoticePage from "./Notice";
import Ads from "./Add";
import styles from "../styles/service.module.css";

async function getNoticeData() {
  try {
    let officeData = await fetch(`${process.env.BACKLINK}/public/officeData`, {
      headers: {
        "x-api-key": process.env.API_KEY,
        "office-id": process.env.OFFICE,
      },
      next: {
        revalidate: 1000,
      },
    });
    officeData = await officeData.json();
    const isActive = officeData.data?.enabled_services?.includes("notice");

    if (!isActive) return;

    const res = await fetch(`${process.env.BACKLINK}/public/notice`, {
      headers: {
        "x-api-key": process.env.API_KEY,
        "office-id": process.env.OFFICE,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return console.error(`Failed to fetch notice data: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}

async function getAdsData() {
  try {
    let officeData = await fetch(`${process.env.BACKLINK}/public/officeData`, {
      headers: {
        "x-api-key": process.env.API_KEY,
        "office-id": process.env.OFFICE,
      },
      next: {
        revalidate: 1000,
      },
    });
    officeData = await officeData.json();
    const isActive = officeData.data?.enabled_services?.includes("ads");

    if (!isActive) return;

    const res = await fetch(`${process.env.BACKLINK}/public/ads`, {
      headers: {
        "x-api-key": process.env.API_KEY,
        "office-id": process.env.OFFICE,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return console.error(`Failed to fetch ads data: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}

export default async function NoticeAndAds() {
  let noticeActive = true;
  let adsActive = true;
  const notices = await getNoticeData();
  const ads = await getAdsData();
  if (!notices || notices.data?.length === 0) noticeActive = false;
  if (!ads || ads.data?.length === 0) adsActive = false;

  return (
    <div className="container">
      <div className="row gap-4 gap-md-0 align-items-center justify-content-center py-5">
        <div className="col-md-6">
          <NoticePage data={notices?.data} active={noticeActive} />
        </div>
        <div className="col-md-6">
          <Ads data={ads?.data} active={adsActive} />
        </div>
      </div>
    </div>
  );
}
