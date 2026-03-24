import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "./global.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import WhatsAppButton from "./component/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AMP Technology | Software and Solar Company",
  description: "AMP Technology provides reliable Bluetooth thermal printers for Panchayat tax receipts, property tax collection, and more across West Bengal.",
  keywords: [
    "WEST BENGAL GOVERNMENT",
    "PROPERTY TAX",
    "PANCHAYAT TAX",
    "PANCHAYET TAX",
    "THERMAL PRINTER",
    "BLUETOOTH PRINTER",
    "BLUETOOTH THERMAL PRINTER",
    "BT588",
    "PORTABLE BLUETOOTH THERMAL PRINTER",
    "TAX RECEIPT PRINTER",
    "PANCHAYAT PRINTER",
    "PANCHAYET TAX",
  ].join(", "),
  robots: "index, follow",
  openGraph: {
    title: "AMP Technology | Software and Solar Company",
    description: "Explore our range of Bluetooth thermal printers ideal for panchayat and property tax receipts in West Bengal.",
    url: "https://amptechnology.in/",
    type: "website",
  },
};

async function getData() {
  try {
    let officeData = await fetch(`${process.env.BACKLINK}/public/officeData`, {
      headers: {
        "x-api-key": process.env.API_KEY,
        "office-id": process.env.OFFICE,
      },
      next: {
        revalidate: 60,
      },
    });
    if (!officeData.ok) {
      return console.error(`Failed to fetch office data: ${res.statusText}`);
    }

    return officeData.json();
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}

async function getLinks() {
  try {
    let links = await fetch(`${process.env.BACKLINK}/public/social`, {
      headers: {
        "x-api-key": process.env.API_KEY,
        "office-id": process.env.OFFICE,
      },
      cache: "no-store",
    });

    return await links.json();
  } catch (error) {
    return null;
  }
}

export default async function RootLayout({ children }) {
  let data = await getData();
  const officeData = data?.data;
  let getSocial = await getLinks();
  const socialData = getSocial?.data[0];

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header data={officeData} links={socialData} />
        <WhatsAppButton />
        {children}
        <Footer data={officeData} links={socialData} />
      </body>
    </html>
  );
}
