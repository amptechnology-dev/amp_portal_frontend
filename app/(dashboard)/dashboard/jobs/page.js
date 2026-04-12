"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

function Page() {
	const [jobs, setJobs] = useState([]);
	const [showForm, setShowForm] = useState(true);
	const [editId, setEditId] = useState(null);
	const [skillInput, setSkillInput] = useState("");
	const [formData, setFormData] = useState({
		jobTitle: "",
		jobType: "Full Time",
		requiredSkills: [],
		whoCanApply: "All",
		experienceRequired: "",
		educationRequired: "",
		salaryMin: "",
		salaryMax: "",
		jobDescription: "",
		isActive: true,
	});

	useEffect(() => {
		fetchJobs();
	}, []);

	const fetchJobs = async () => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKLINK}/dashboard/job/list`,
				{
					withCredentials: true,
				}
			);
			setJobs(response?.data?.data || []);
		} catch (error) {
			console.error("Error fetching jobs:", error);
		}
	};

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		let newValue = type === "checkbox" ? checked : value;

		if (
			[
				"jobTitle",
				"jobType",
				"requiredSkills",
				"whoCanApply",
				"educationRequired",
				"jobDescription",
			].includes(name)
		) {
			newValue = value.trimStart();
		}

		setFormData({
			...formData,
			[name]: newValue,
		});
	};

	const resetForm = () => {
		setFormData({
			jobTitle: "",
			jobType: "Full Time",
			requiredSkills: [],
			whoCanApply: "All",
			experienceRequired: "",
			educationRequired: "",
			salaryMin: "",
			salaryMax: "",
			jobDescription: "",
			isActive: true,
		});
		setSkillInput("");
		setEditId(null);
	};

	const addSkillTag = (rawValue) => {
		const cleaned = rawValue.replace(/,+$/, "").trim();
		if (!cleaned) return;

		setFormData((prev) => {
			const alreadyExists = prev.requiredSkills.some(
				(skill) => skill.toLowerCase() === cleaned.toLowerCase()
			);
			if (alreadyExists) return prev;
			return {
				...prev,
				requiredSkills: [...prev.requiredSkills, cleaned],
			};
		});
	};

	const handleSkillsKeyDown = (e) => {
		if (e.key === "," || e.key === "Enter") {
			e.preventDefault();
			addSkillTag(skillInput);
			setSkillInput("");
		}
	};

	const removeSkillTag = (indexToRemove) => {
		setFormData((prev) => ({
			...prev,
			requiredSkills: prev.requiredSkills.filter((_, index) => index !== indexToRemove),
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const skillsArray = Array.isArray(formData.requiredSkills) ? formData.requiredSkills : [];

		const payload = {
			jobTitle: formData.jobTitle,
			jobType: formData.jobType,
			requiredSkills: skillsArray,
			whoCanApply: formData.whoCanApply,
			experienceRequired: Number(formData.experienceRequired),
			educationRequired: formData.educationRequired,
			salaryRange: {
				min: Number(formData.salaryMin),
				max: Number(formData.salaryMax),
			},
			jobDescription: formData.jobDescription,
			isActive: Boolean(formData.isActive),
		};

		if (payload.salaryRange.min > payload.salaryRange.max) {
			swal("Error", "Minimum salary cannot be greater than maximum salary.", "error");
			return;
		}

		if (payload.requiredSkills.length === 0) {
			swal("Error", "Please add at least one required skill.", "error");
			return;
		}

		try {
			if (editId) {
				await axios.put(
					`${process.env.NEXT_PUBLIC_BACKLINK}/dashboard/job/update/${editId}`,
					payload,
					{ withCredentials: true }
				);
				swal("Success", "Job updated successfully!", "success");
			} else {
				await axios.post(
					`${process.env.NEXT_PUBLIC_BACKLINK}/dashboard/job/insert`,
					payload,
					{ withCredentials: true }
				);
				swal("Success", "Job added successfully!", "success");
			}

			fetchJobs();
			resetForm();
		} catch (error) {
			console.error("Error adding/updating job:", error);
			swal("Error", "Unable to save job. Please try again.", "error");
		}
	};

	const handleEdit = (job) => {
		setFormData({
			jobTitle: job.jobTitle || "",
			jobType: job.jobType || "Full Time",
			requiredSkills: Array.isArray(job.requiredSkills)
				? job.requiredSkills
				: [],
			whoCanApply: job.whoCanApply || "All",
			experienceRequired:
				job.experienceRequired !== undefined && job.experienceRequired !== null
					? String(job.experienceRequired)
					: "",
			educationRequired: job.educationRequired || "",
			salaryMin:
				job.salaryRange && job.salaryRange.min !== undefined
					? String(job.salaryRange.min)
					: "",
			salaryMax:
				job.salaryRange && job.salaryRange.max !== undefined
					? String(job.salaryRange.max)
					: "",
			jobDescription: job.jobDescription || "",
			isActive: Boolean(job.isActive),
		});
		setSkillInput("");
		setEditId(job._id);
		setShowForm(true);
	};

	const handleDelete = async (id) => {
		try {
			const shouldDelete = await swal({
				title: "Are you sure?",
				text: "Once deleted, you will not be able to recover this job!",
				icon: "warning",
				buttons: true,
				dangerMode: true,
			});

			if (shouldDelete) {
				await axios.delete(`${process.env.NEXT_PUBLIC_BACKLINK}/dashboard/job/delete/${id}`, {
					withCredentials: true,
				});
				swal("Success", "Job deleted successfully!", "success");
				fetchJobs();
			}
		} catch (error) {
			console.error("Error deleting job:", error);
			swal("Error", "Unable to delete job. Please try again.", "error");
		}
	};

	const toggleForm = () => {
		setShowForm(!showForm);
		resetForm();
	};

	return (
		<div className="container mt-5">
			{showForm && (
				<div>
					<h2 style={{ color: "#007bff" }}>{editId ? "Update Job" : "Add Job"}</h2>
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label>
								Job Title <span style={{ color: "red" }}>*</span>
							</label>
							<input
								type="text"
								className="form-control"
								name="jobTitle"
								value={formData.jobTitle}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="form-group">
							<label>
								Job Type <span style={{ color: "red" }}>*</span>
							</label>
							<select
								className="form-control"
								name="jobType"
								value={formData.jobType}
								onChange={handleChange}
								required
							>
								<option value="Full Time">Full Time</option>
								<option value="Part Time">Part Time</option>
								<option value="Internship">Internship</option>
							</select>
						</div>

						<div className="form-group">
							<label>
								Required Skills (comma separated) <span style={{ color: "red" }}>*</span>
							</label>
							<div className="form-control d-flex flex-wrap align-items-center" style={{ minHeight: "46px", gap: "8px" }}>
								{formData.requiredSkills.map((skill, index) => (
									<span key={`${skill}-${index}`} className="badge bg-primary fw-bold d-flex align-items-center" style={{ gap: "6px", fontSize: "13px" }}>
										{skill}
										<button
											type="button"
											onClick={() => removeSkillTag(index)}
											style={{ border: "none", background: "transparent", color: "white", fontWeight: 700, cursor: "pointer", lineHeight: 1 }}
										>
											x
										</button>
									</span>
								))}
								<input
									type="text"
									value={skillInput}
									onChange={(e) => setSkillInput(e.target.value.trimStart())}
									onKeyDown={handleSkillsKeyDown}
									onBlur={() => {
										if (skillInput.trim()) {
											addSkillTag(skillInput);
											setSkillInput("");
										}
									}}
									placeholder="Type skill and press comma"
									style={{ border: "none", outline: "none", flex: 1, minWidth: "180px" }}
								/>
							</div>
							<small className="text-muted">Example: MS Excel, Data Entry, Communication</small>
						</div>

						<div className="form-group">
							<label>
								Who Can Apply <span style={{ color: "red" }}>*</span>
							</label>
							<select
								className="form-control"
								name="whoCanApply"
								value={formData.whoCanApply}
								onChange={handleChange}
								required
							>
								<option value="All">All</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
							</select>
						</div>

						<div className="form-group">
							<label>
								Experience Required (years) <span style={{ color: "red" }}>*</span>
							</label>
							<input
								type="number"
								className="form-control"
								name="experienceRequired"
								value={formData.experienceRequired}
								onChange={handleChange}
								min={0}
								required
							/>
						</div>

						<div className="form-group">
							<label>
								Education Required <span style={{ color: "red" }}>*</span>
							</label>
							<input
								type="text"
								className="form-control"
								name="educationRequired"
								value={formData.educationRequired}
								onChange={handleChange}
								placeholder="Graduate"
								required
							/>
						</div>

						<div className="form-row">
							<div className="form-group col-md-6">
								<label>
									Salary Min <span style={{ color: "red" }}>*</span>
								</label>
								<input
									type="number"
									className="form-control"
									name="salaryMin"
									value={formData.salaryMin}
									onChange={handleChange}
									min={0}
									required
								/>
							</div>
							<div className="form-group col-md-6">
								<label>
									Salary Max <span style={{ color: "red" }}>*</span>
								</label>
								<input
									type="number"
									className="form-control"
									name="salaryMax"
									value={formData.salaryMax}
									onChange={handleChange}
									min={0}
									required
								/>
							</div>
						</div>

						<div className="form-group">
							<label>
								Job Description <span style={{ color: "red" }}>*</span>
							</label>
							<textarea
								className="form-control"
								name="jobDescription"
								value={formData.jobDescription}
								onChange={handleChange}
								rows={4}
								required
							/>
						</div>

						{editId && (
							<div className="form-group form-check">
								<input
									type="checkbox"
									className="form-check-input"
									id="isActive"
									name="isActive"
									checked={formData.isActive}
									onChange={handleChange}
								/>
								<label className="form-check-label" htmlFor="isActive">
									Active Job
								</label>
							</div>
						)}

						<button type="submit" className="btn btn-primary mr-2">
							{editId ? "Update" : "Submit"}
						</button>
						<button type="button" className="btn btn-secondary" onClick={toggleForm}>
							Cancel
						</button>
					</form>
					<hr />
				</div>
			)}

			<div>
				<h2 style={{ color: "#007bff" }}>Jobs</h2>
				<table className="table table-responsive">
					<thead>
						<tr>
							<th>Job Title</th>
							<th>Type</th>
							<th>Skills</th>
							<th>Who Can Apply</th>
							<th>Experience</th>
							<th>Education</th>
							<th>Salary</th>
							<th>Status</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{jobs.map((job) => (
							<tr key={job._id}>
								<td>{job.jobTitle}</td>
								<td>{job.jobType}</td>
								<td>
									{Array.isArray(job.requiredSkills)
										? job.requiredSkills.join(", ")
										: "-"}
								</td>
								<td>{job.whoCanApply}</td>
								<td>{job.experienceRequired} year(s)</td>
								<td>{job.educationRequired}</td>
								<td>
									{job.salaryRange?.min} - {job.salaryRange?.max}
								</td>
								<td>{job.isActive ? "Active" : "Inactive"}</td>
								<td>
									<div className="d-flex align-self-center">
										<button className="btn btn-primary mr-2" onClick={() => handleEdit(job)}>
											Edit
										</button>
										<button className="btn btn-danger" onClick={() => handleDelete(job._id)}>
											Delete
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{!showForm && (
					<button type="button" className="btn btn-primary" onClick={toggleForm}>
						Add Job
					</button>
				)}
			</div>
		</div>
	);
}

export default Page;
