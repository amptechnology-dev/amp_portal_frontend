import Image from "next/image";
import styles from "../styles/TeamSection.module.css";

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
    const isActive = officeData.data?.enabled_services?.includes("staff");

    if (!isActive) return;

    const res = await fetch(`${process.env.BACKLINK}/public/staff`, {
      headers: {
        "x-api-key": process.env.API_KEY,
        "office-id": process.env.OFFICE,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return console.error(`Failed to fetch staff data: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}

export default async function TeamPage() {
  let data = await getData();
  if (!data || data.data?.length === 0) return;
  // data = data?.data.slice(0, 6);

  return (
    <div className={styles.total_wrper} id="team">
      <section className={`${styles.section} py-5`}>
        <h2 className={styles.title}>Our Team</h2>
        <div className={styles.teamRow}>
          {data.data?.map((member) => (
            <div className={`${styles.member} rounded-4`} key={member._id}>
              <Image
                src={member.avatar}
                alt={`Avatar ${member.name}`}
                className={styles.cardImage}
                width={150}
                height={150}
              />
              <h2>{member.name}</h2>
              <p>{member.designation}</p>
              <p>{member.email}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
