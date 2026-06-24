"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

function Page() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    landmark: "",
    whatsapp: "",
    mobile: "",
    logo: null,
    logo_alt: null,
    notification_bg_iamge: null,
    activity_bg_iamge: null,
    banner: null,
  });

  // preview states
  const [previews, setPreviews] = useState({
    logo: null,
    logo_alt: null,
    notification_bg_iamge: null,
    activity_bg_iamge: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileError, setMobileError] = useState("");
  const [logoError, setLogoError] = useState("");
  const [bannerError, setBannerError] = useState("");

  const validateMobile = (mobile) => /^\d{10}$/.test(mobile);

  useEffect(() => {
    fetchOffices();
  }, []);

  const fetchOffices = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKLINK}/dashboard/office/list`,
        { withCredentials: true }
      );
      setFormData(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      setMobileError(
        validateMobile(value.trim()) ? "" : "Mobile number must be 10 digits"
      );
    }

    const imageFields = ["logo", "banner", "logo_alt", "notification_bg_iamge", "activity_bg_iamge"];

    if (imageFields.includes(name)) {
      const file = e.target.files[0];
      if (!file) return;

      const maxSize = name === "logo" ? 512 * 1024 : 1024 * 1024;
      if (file.size > maxSize) {
        if (name === "logo") {
          setLogoError("Logo size should be less than 512kb.");
        } else {
          setBannerError("Image size should be less than 1mb.");
        }
        return;
      }

      setLogoError("");
      setBannerError("");

      // generate local preview
      const objectUrl = URL.createObjectURL(file);
      setPreviews((prev) => ({ ...prev, [name]: objectUrl }));

      setFormData((prev) => ({ ...prev, [name]: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value.trimStart() }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSubmit = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSubmit.append(key, value);
      });
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKLINK}/dashboard/office/update`,
        formDataToSubmit,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // helper: existing image src from server string
  const existingSrc = (field) => {
    const val = formData?.[field];
    if (!val || typeof val !== "string") return null;
    return `https://${val.slice(7)}`;
  };

  // helper: returns preview if new file selected, else existing
  const imgSrc = (field) => previews[field] || existingSrc(field);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container pt-2">
      <div>
        <h2 style={{ color: "#007bff" }}>Office Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name <span style={{ color: "red" }}>*</span></label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} readOnly />
          </div>

          <div className="form-group">
            <label>Address <span style={{ color: "red" }}>*</span></label>
            <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} required readOnly />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" name="email" value={formData.email.trim()} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Landmark</label>
            <input type="text" className="form-control" name="landmark" value={formData.landmark} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Mobile No <span style={{ color: "red" }}>*</span></label>
            <input type="tel" className="form-control" name="mobile" value={formData.mobile.trim()} onChange={handleChange} required />
            {mobileError && <div className="text-danger">{mobileError}</div>}
          </div>

          <div className="form-group">
            <label>WhatsApp No</label>
            <input type="tel" className="form-control" name="whatsapp" value={formData.whatsapp.trim()} onChange={handleChange} required />
          </div>

          {/* Logo + Logo Alt */}
          <div className="row">
            {["logo", "logo_alt"].map((field) => (
              <div className="form-group col-6" key={field}>
                <label>
                  {field === "logo" ? "Logo" : "Logo Alt"}{" "}
                  <span className="font-italic text-sm font-weight-light">
                    (max size: 512KB, 100px × 100px)
                  </span>
                </label>
                <input
                  type="file"
                  className="form-control"
                  name={field}
                  onChange={handleChange}
                  accept="image/jpg, image/jpeg, image/png"
                />
                {logoError && <div className="text-danger">{logoError}</div>}
                {imgSrc(field) && (
                  <div className="mt-2">
                    <img
                      src={imgSrc(field)}
                      width={100}
                      height={100}
                      style={{ objectFit: "cover", borderRadius: 8, border: "1px solid #dee2e6" }}
                      alt={field}
                    />
                    {previews[field] && (
                      <span className="ml-2 text-success" style={{ fontSize: 12 }}>
                        ✓ New image selected
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {bannerError && <div className="text-danger">{bannerError}</div>}

          {/* Notification BG + Activity BG */}
          <div className="row">
            {["notification_bg_iamge", "activity_bg_iamge"].map((field) => (
              <div className="col-4 form-group" key={field}>
                <label>
                  {field === "notification_bg_iamge" ? "Notification Background" : "Activity Background"}
                </label>
                <input
                  type="file"
                  className="form-control"
                  name={field}
                  onChange={handleChange}
                  accept="image/jpg, image/jpeg, image/png"
                />
                {bannerError && <div className="text-danger">{bannerError}</div>}
                {imgSrc(field) && (
                  <div className="mt-2">
                    <img
                      src={imgSrc(field)}
                      width={300}
                      height={100}
                      style={{ objectFit: "cover", borderRadius: 8, border: "1px solid #dee2e6" }}
                      alt={field}
                    />
                    {previews[field] && (
                      <span className="text-success" style={{ fontSize: 12 }}>
                        ✓ New image selected
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-primary">
            Modify
          </button>
        </form>
        <hr />
      </div>
    </div>
  );
}

export default Page;