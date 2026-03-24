async function getData() {
  const res = await fetch(process.env.BACKLINK + "/public/about", {
    headers: {
      "x-api-key": process.env.API_KEY,
      "office-id": process.env.OFFICE,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    return res.statusText;
  }
  return res.json();
}

async function getOfficeData() {
  try {
    let officeData = await fetch(`${process.env.BACKLINK}/public/officeData`, {
      headers: {
        "x-api-key": process.env.API_KEY,
        "office-id": process.env.OFFICE,
      },
      cache: "no-store",
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

export default async function AboutPage() {
  const data = await getData();
  const aboutData = data?.data;
  const officeData = await getOfficeData();
  const name = officeData?.data?.name;

  return (
    <div
      className="container-fluid py-5"
      style={{ backgroundColor: "aliceblue" }}
      id="about"
    >
      <div className="container pt-5">
        <div className="row">
          <div className="col-md-5 col-lg-6" style={{ minHeight: 250 }}>
            <div className="position-relative h-100">
              <img
                className="position-absolute w-100 h-100 rounded-4"
                src={aboutData?.image}
                style={{ objectFit: "fill" }}
                alt="about-image"
              />
            </div>
          </div>
          <div className="col-md-7 col-lg-6 pt-5 pb-lg-5">
            <div className="about-text p-4 p-lg-5 my-lg-5">
              <h6
                className="text-primary text-uppercase"
                style={{ letterSpacing: 5 }}
              >
                Why Choose Us
              </h6>
              <h1 className="mb-3">We Are {name}</h1>
              <p className="">{aboutData?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
