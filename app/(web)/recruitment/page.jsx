"use client";

import React, { useEffect, useMemo, useState } from "react";
import swal from "sweetalert";

const API_BASE = process.env.NEXT_PUBLIC_BACKLINK || "http://localhost:8001/api";
const API_HEADERS = {
	"x-api-key": process.env.NEXT_PUBLIC_API_KEY || process.env.API_KEY || "kErRRCt6k8nbWRa2PybnrSrE6ZROVdpm",
	"office-id": process.env.NEXT_PUBLIC_OFFICE || process.env.OFFICE || "664dd433c0d6bcff42c8b6b9",
};

const initialForm = {
	jobId: "",
	name: "",
	dob: "",
	contactNo: "",
	gender: "Male",
	religion: "",
	address: "",
	experienceInYears: "0",
	previousCompanyName: "",
	education: "",
	previousSalary: "",
};

export default function RecruitmentPage() {
	const [jobs, setJobs] = useState([]);
	const [isJobsLoading, setIsJobsLoading] = useState(true);
	const [jobsError, setJobsError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [form, setForm] = useState(initialForm);
	const [cvFile, setCvFile] = useState(null);
	const [imageFile, setImageFile] = useState(null);
	const [imagePreview, setImagePreview] = useState("");

	useEffect(() => {
		let isMounted = true;

		const fetchJobs = async () => {
			try {
				setIsJobsLoading(true);
				setJobsError("");

				const response = await fetch(`${API_BASE}/public/jobs`, {
					method: "GET",
					headers: API_HEADERS,
					cache: "no-store",
				});

				if (!response.ok) {
					throw new Error("Failed to fetch jobs.");
				}

				const result = await response.json();
				const list = Array.isArray(result?.data) ? result.data : [];

				if (!isMounted) return;

				setJobs(list);
				if (list.length > 0) {
					setForm((prev) => ({ ...prev, jobId: prev.jobId || list[0]._id }));
				}
			} catch (error) {
				if (!isMounted) return;
				setJobsError("Unable to load jobs right now. Please refresh and try again.");
			} finally {
				if (isMounted) {
					setIsJobsLoading(false);
				}
			}
		};

		fetchJobs();

		return () => {
			isMounted = false;
		};
	}, []);

	useEffect(() => {
		if (!imageFile) {
			setImagePreview("");
			return;
		}

		const previewUrl = URL.createObjectURL(imageFile);
		setImagePreview(previewUrl);

		return () => {
			URL.revokeObjectURL(previewUrl);
		};
	}, [imageFile]);

	const selectedJob = useMemo(() => {
		return jobs.find((job) => job._id === form.jobId) || null;
	}, [jobs, form.jobId]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		if (name === "contactNo") {
			const onlyDigits = value.replace(/\D/g, "").slice(0, 10);
			setForm((prev) => ({ ...prev, [name]: onlyDigits }));
			return;
		}

		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!form.jobId) {
			swal({ icon: "warning", title: "Select Job", text: "Please select a job before applying." });
			return;
		}

		if (!imageFile) {
			swal({ icon: "warning", title: "Photo Required", text: "Please upload your image/photo." });
			return;
		}

		if (!cvFile) {
			swal({ icon: "warning", title: "CV Required", text: "Please upload your CV file." });
			return;
		}

		if (!form.address?.trim()) {
			swal({ icon: "warning", title: "Address Required", text: "Please enter your address." });
			return;
		}

		if (!form.education?.trim()) {
			swal({ icon: "warning", title: "Education Required", text: "Please enter your education." });
			return;
		}

		if (!form.religion?.trim()) {
			swal({ icon: "warning", title: "Religion Required", text: "Please enter your religion." });
			return;
		}

		const formData = new FormData();
		formData.append("jobId", form.jobId);
		formData.append("name", form.name);
		formData.append("dob", form.dob);
		formData.append("contactNo", form.contactNo);
		formData.append("gender", form.gender);
		formData.append("religion", form.religion.trim());
		formData.append("address", form.address.trim());
		formData.append("experienceInYears", form.experienceInYears || "0");
		formData.append("previousCompanyName", form.previousCompanyName);
		formData.append("education", form.education.trim());
		formData.append("previousSalary", form.previousSalary || "0");
		formData.append("cv", cvFile);
		formData.append("image", imageFile);

		try {
			setIsSubmitting(true);

			const response = await fetch(`${API_BASE}/public/recruitment`, {
				method: "POST",
				headers: API_HEADERS,
				body: formData,
			});

			const result = await response.json();

			if (!response.ok || !result?.success) {
				throw new Error(result?.message || "Failed to submit application.");
			}

			swal({
				icon: "success",
				title: "Application Submitted",
				text: result?.message || "Your application was submitted successfully.",
			});

			setForm((prev) => ({ ...initialForm, jobId: prev.jobId }));
			setCvFile(null);
			setImageFile(null);
			const formElement = document.getElementById("recruitmentForm");
			if (formElement) formElement.reset();
		} catch (error) {
			swal({
				icon: "error",
				title: "Submission Failed",
				text: error.message || "Something went wrong. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="contact py-5" style={{ backgroundColor: "aliceblue", minHeight: "calc(100vh - 110px)" }}>
			<div className="container">
				<div className="section-title">
					<h2>Recruitment</h2>
					<h5>Apply for current openings</h5>
				</div>

				<div className="row g-4">
					<div className="col-lg-5">
						<div className="php-email-form h-100">
							<h4 className="mb-3">Available Jobs</h4>

							{isJobsLoading && <p className="mb-0">Loading jobs...</p>}
							{!isJobsLoading && jobsError && <p className="text-danger mb-0">{jobsError}</p>}

							{!isJobsLoading && !jobsError && jobs.length === 0 && <p className="mb-0">No active job found right now.</p>}

							{!isJobsLoading && !jobsError && jobs.length > 0 && (
								<>
									<div className="form-group mb-3">
										<label htmlFor="jobId" className="fw-semibold">
											Choose Job <span className="text-danger">*</span>
										</label>
										<select className="form-select" id="jobId" name="jobId" value={form.jobId} onChange={handleInputChange} required>
											{jobs.map((job) => (
												<option value={job._id} key={job._id}>
													{job.jobTitle} ({job.jobType})
												</option>
											))}
										</select>
									</div>

									{selectedJob && (
										<div className="border rounded p-3 bg-white">
											<h5 className="mb-2">{selectedJob.jobTitle}</h5>
											<p className="mb-1">
												<strong>Type:</strong> {selectedJob.jobType}
											</p>
											<p className="mb-1">
												<strong>Salary:</strong> Rs. {selectedJob.salaryRange?.min || 0} - Rs. {selectedJob.salaryRange?.max || 0}
											</p>
											<p className="mb-1">
												<strong>Experience:</strong> {selectedJob.experienceRequired || 0} year(s)
											</p>
											<p className="mb-1">
												<strong>Education:</strong> {selectedJob.educationRequired || "N/A"}
											</p>
											<p className="mb-1">
												<strong>Who Can Apply:</strong> {selectedJob.whoCanApply || "All"}
											</p>
											<p className="mb-1">
												<strong>Skills:</strong> {(selectedJob.requiredSkills || []).join(", ") || "N/A"}
											</p>
											<p className="mb-0">
												<strong>Description:</strong> {selectedJob.jobDescription || "N/A"}
											</p>
										</div>
									)}
								</>
							)}
						</div>
					</div>

					<div className="col-lg-7">
						<form className="php-email-form" id="recruitmentForm" onSubmit={handleSubmit} encType="multipart/form-data">
							<h4 className="mb-3">Candidate Details</h4>

							<div className="row g-3">
								<div className="col-md-6 form-group">
									<label htmlFor="name" className="fw-semibold">
										Full Name <span className="text-danger">*</span>
									</label>
									<input className="form-control" type="text" id="name" name="name" value={form.name} onChange={handleInputChange} required />
								</div>

								<div className="col-md-6 form-group">
									<label htmlFor="dob" className="fw-semibold">
										Date of Birth
									</label>
									<input className="form-control" type="date" id="dob" name="dob" value={form.dob} onChange={handleInputChange} />
								</div>

								<div className="col-md-6 form-group">
									<label htmlFor="contactNo" className="fw-semibold">
										Contact Number <span className="text-danger">*</span>
									</label>
									<input
										className="form-control"
										type="text"
										id="contactNo"
										name="contactNo"
										value={form.contactNo}
										onChange={handleInputChange}
										inputMode="numeric"
										maxLength={10}
										pattern="[0-9]{10}"
										title="Enter 10 digit mobile number"
										required
									/>
								</div>

								<div className="col-md-6 form-group">
									<label htmlFor="gender" className="fw-semibold">
										Gender
									</label>
									<select className="form-select" id="gender" name="gender" value={form.gender} onChange={handleInputChange}>
										<option value="Male">Male</option>
										<option value="Female">Female</option>
										<option value="Other">Other</option>
									</select>
								</div>

								<div className="col-md-6 form-group">
									<label htmlFor="religion" className="fw-semibold">
										Religion <span className="text-danger">*</span>
									</label>
									<input className="form-control" type="text" id="religion" name="religion" value={form.religion} onChange={handleInputChange} required />
								</div>

								<div className="col-md-6 form-group">
									<label htmlFor="education" className="fw-semibold">
										Education <span className="text-danger">*</span>
									</label>
									<input className="form-control" type="text" id="education" name="education" value={form.education} onChange={handleInputChange} required />
								</div>

								<div className="col-12 form-group">
									<label htmlFor="address" className="fw-semibold">
										Address <span className="text-danger">*</span>
									</label>
									<textarea className="form-control" id="address" name="address" rows="2" value={form.address} onChange={handleInputChange} required />
								</div>

								<div className="col-md-6 form-group">
									<label htmlFor="experienceInYears" className="fw-semibold">
										Experience (Years)
									</label>
									<input
										className="form-control"
										type="number"
										min="0"
										id="experienceInYears"
										name="experienceInYears"
										value={form.experienceInYears}
										onChange={handleInputChange}
									/>
								</div>

								<div className="col-md-6 form-group">
									<label htmlFor="previousSalary" className="fw-semibold">
										Previous Salary
									</label>
									<input
										className="form-control"
										type="number"
										min="0"
										id="previousSalary"
										name="previousSalary"
										value={form.previousSalary}
										onChange={handleInputChange}
									/>
								</div>

								<div className="col-12 form-group">
									<label htmlFor="previousCompanyName" className="fw-semibold">
										Previous Company Name
									</label>
									<input
										className="form-control"
										type="text"
										id="previousCompanyName"
										name="previousCompanyName"
										value={form.previousCompanyName}
										onChange={handleInputChange}
									/>
								</div>

								<div className="col-md-6 form-group">
									<label htmlFor="cv" className="fw-semibold">
										Upload CV (PDF) <span className="text-danger">*</span>
									</label>
									<input
										className="form-control"
										type="file"
										id="cv"
										name="cv"
										accept="application/pdf"
										onChange={(e) => setCvFile(e.target.files?.[0] || null)}
										required
									/>
								</div>

								<div className="col-md-6 form-group">
									<label htmlFor="image" className="fw-semibold">
										Upload Photo <span className="text-danger">*</span>
									</label>
									<input
										className="form-control"
										type="file"
										id="image"
										name="image"
										accept="image/jpeg,image/jpg,image/png"
										onChange={(e) => setImageFile(e.target.files?.[0] || null)}
										required
									/>
								</div>

								{imagePreview && (
									<div className="col-12">
										<p className="fw-semibold mb-2">Image Preview</p>
										<img
											src={imagePreview}
											alt="Selected candidate preview"
											style={{ maxWidth: "220px", maxHeight: "220px", borderRadius: "8px", border: "1px solid #ddd", objectFit: "cover" }}
										/>
									</div>
								)}
							</div>

							<div className="text-center mt-4">
								<button type="submit" disabled={isSubmitting || isJobsLoading || jobs.length === 0}>
									{isSubmitting ? "Submitting..." : "Submit Application"}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
