"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { FaFilePdf, FaTrashAlt } from "react-icons/fa";

const STATUS_OPTIONS = ["Applied", "Shortlisted", "Rejected", "Hired"];

function Page() {
	const [applications, setApplications] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchApplications();
	}, []);

	const fetchApplications = async () => {
		try {
			setIsLoading(true);
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKLINK}/dashboard/applications/list`,
				{ withCredentials: true }
			);
			setApplications(response?.data?.data || []);
		} catch (error) {
			console.error("Error fetching applications:", error);
			swal("Error", "Unable to load applications.", "error");
		} finally {
			setIsLoading(false);
		}
	};

	const handleStatusChange = async (applicationId, status) => {
		try {
			await axios.put(
				`${process.env.NEXT_PUBLIC_BACKLINK}/dashboard/applications/status/update/${applicationId}`,
				{ status },
				{ withCredentials: true }
			);

			setApplications((prev) =>
				prev.map((application) =>
					application._id === applicationId
						? { ...application, status }
						: application
				)
			);

			swal("Success", "Application status updated.", "success");
		} catch (error) {
			console.error("Error updating application status:", error);
			swal("Error", "Unable to update application status.", "error");
		}
	};

	const handleDelete = async (applicationId) => {
		try {
			const shouldDelete = await swal({
				title: "Are you sure?",
				text: "This application will be deleted permanently.",
				icon: "warning",
				buttons: true,
				dangerMode: true,
			});

			if (!shouldDelete) return;

			await axios.delete(
				`${process.env.NEXT_PUBLIC_BACKLINK}/dashboard/applications/delete/${applicationId}`,
				{ withCredentials: true }
			);

			setApplications((prev) => prev.filter((app) => app._id !== applicationId));
			swal("Success", "Application deleted successfully.", "success");
		} catch (error) {
			console.error("Error deleting application:", error);
			swal("Error", "Unable to delete application.", "error");
		}
	};

	return (
		<div className="container mt-4">
			<div className="d-flex justify-content-between align-items-center mb-3">
				<h2 style={{ color: "#007bff" }}>Job Applications</h2>
				<button className="btn btn-outline-primary" type="button" onClick={fetchApplications}>
					Refresh
				</button>
			</div>

			{isLoading ? (
				<p>Loading applications...</p>
			) : applications.length === 0 ? (
				<div className="alert alert-info">No applications found.</div>
			) : (
				<div className="table-responsive">
					<table className="table table-bordered table-striped align-middle">
						<thead>
							<tr>
								<th>Candidate</th>
								<th>Contact</th>
								<th>Gender</th>
								<th>Experience</th>
								<th>Education</th>
								<th>Applied Job</th>
								<th>Applied At</th>
								<th>Image</th>
								<th>CV</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{applications.map((app) => (
								<tr key={app._id}>
									<td>{app.name || "-"}</td>
									<td>{app.contactNo || "-"}</td>
									<td>{app.gender || "-"}</td>
									<td>{app.experienceInYears ?? 0} year(s)</td>
									<td>{app.education || "-"}</td>
									<td>
										<div>{app.jobTitle || "-"}</div>
										<small className="text-muted">{app.jobType || "-"}</small>
									</td>
									<td>{app.appliedAt ? new Date(app.appliedAt).toLocaleString() : "-"}</td>
									<td>
										{app.image ? (
											<a href={app.image} target="_blank" rel="noopener noreferrer">
												<img
													src={app.image}
													alt={app.name || "candidate"}
													style={{ width: "52px", height: "52px", borderRadius: "50%", objectFit: "cover", border: "1px solid #ddd" }}
												/>
											</a>
										) : (
											"-"
										)}
									</td>
									<td>
										{app.cv ? (
											<a
												href={app.cv}
												target="_blank"
												rel="noopener noreferrer"
												download
												title="Download CV"
												className="text-danger"
												style={{ fontSize: "22px" }}
											>
												<FaFilePdf />
											</a>
										) : (
											"-"
										)}
									</td>
									<td>
										<select
											className="form-control"
											value={app.status || "Applied"}
											onChange={(e) => handleStatusChange(app._id, e.target.value)}
										>
											{STATUS_OPTIONS.map((status) => (
												<option key={status} value={status}>
													{status}
												</option>
											))}
										</select>
									</td>
									<td>
										<button
											type="button"
											className="btn btn-danger btn-sm"
											onClick={() => handleDelete(app._id)}
											title="Delete Application"
										>
											<FaTrashAlt />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}

export default Page;
