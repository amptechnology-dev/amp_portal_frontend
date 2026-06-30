"use client";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import swal from "sweetalert";
import { SERVICE_ICONS, getServiceIcon } from "@/app/lib/serviceIcons";

function IconDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  const Selected = getServiceIcon(value);
  const selectedLabel = SERVICE_ICONS[value]?.label || "Select Icon";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      <div
        onClick={() => setOpen((o) => !o)}
        className="form-control"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: "#eff6ff",
            border: "1.5px solid #dbeafe",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Selected style={{ fontSize: 15, color: "#1e50c8" }} />
        </div>
        <span style={{ flex: 1 }}>{selectedLabel}</span>
        <span style={{ fontSize: 12, color: "#94a3b8" }}>{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            maxHeight: "280px",
            overflowY: "auto",
            background: "#fff",
            border: "1.5px solid #dbeafe",
            borderRadius: "8px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            zIndex: 50,
          }}
        >
          {Object.entries(SERVICE_ICONS).map(([key, { label, icon: ItemIcon }]) => (
            <div
              key={key}
              onClick={() => {
                onChange(key);
                setOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                cursor: "pointer",
                background: key === value ? "#eff6ff" : "#fff",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = key === value ? "#eff6ff" : "#fff")
              }
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: "#eff6ff",
                  border: "1.5px solid #dbeafe",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <ItemIcon style={{ fontSize: 15, color: "#1e50c8" }} />
              </div>
              <span style={{ fontSize: 14, color: "#1e293b" }}>{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Page() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: "dribbble",
  });
  const [showForm, setShowForm] = useState(true);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKLINK}/dashboard/services/list`,
        { withCredentials: true }
      );
      setServices(response.data.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "name" || name === "description") {
      newValue = value.trimStart();
    }
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_BACKLINK}/dashboard/services/update/${editId}`,
          formData,
          { withCredentials: true }
        );
        setEditId(null);
        swal("Success", "Service updated successfully!", "success");
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKLINK}/dashboard/services/insert`,
          formData,
          { withCredentials: true }
        );
        swal("Success", "Service added successfully!", "success");
      }
      fetchServices();
      setFormData({ name: "", description: "", logo: "dribbble" });
    } catch (error) {
      console.error("Error adding/updating service:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const shouldDelete = await swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this service!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
      if (shouldDelete) {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKLINK}/dashboard/services/delete/${id}`,
          { withCredentials: true }
        );
        swal("Success", "Service deleted successfully!", "success");
        fetchServices();
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleEdit = (service) => {
    setFormData({
      name: service.name,
      description: service.description,
      logo: service.logo || "dribbble",
    });
    setEditId(service._id);
    setShowForm(true);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setFormData({ name: "", description: "", logo: "dribbble" });
    setEditId(null);
  };

  return (
    <div className="container mt-5">
      {showForm && (
        <div>
          <h2 style={{ color: "#007bff" }}>Add Services </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Service Name{" "}
                <span className="font-italic text-sm font-weight-light">
                  (max length: 100 characters)
                </span>
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Description{" "}
                <span className="font-italic text-sm font-weight-light">
                  (max length: 250 characters)
                </span>{" "}
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group" style={{ position: "relative" }}>
              <label>
                Service Icon <span style={{ color: "red" }}>*</span>
              </label>
              <IconDropdown
                value={formData.logo}
                onChange={(key) => setFormData({ ...formData, logo: key })}
              />
            </div>

            <button type="submit" className="btn btn-primary mr-2">
              {editId ? "Update" : "Submit"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={toggleForm}
            >
              Cancel
            </button>
          </form>
          <hr />
        </div>
      )}

      <div>
        <h2 style={{ color: "#007bff" }}>Services</h2>
        <table className="table table-responsive">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Service Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => {
              const RowIcon = getServiceIcon(service.logo);
              return (
                <tr key={service._id}>
                  <td>
                    <RowIcon style={{ fontSize: 18, color: "#1e50c8" }} />
                  </td>
                  <td>{service.name}</td>
                  <td>{service.description}</td>
                  <td>
                    <div className="d-flex align-self-center">
                      <button
                        className="btn btn-primary mr-2"
                        onClick={() => handleEdit(service)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(service._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!showForm && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={toggleForm}
          >
            Add Service
          </button>
        )}
      </div>
    </div>
  );
}

export default Page;