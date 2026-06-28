// ContactForm.jsx
"use client";
import swal from "sweetalert";
import { useFormState } from "react-dom";
import { useEffect } from "react";

export default function ContactForm({ handleSubmit }) {
  const [state, formAction] = useFormState(handleSubmit, null);

  useEffect(() => {
    if (state?.success === true) {
      swal({ icon: "success", title: "Thank You!", text: "Message sent successfully! We'll get back to you shortly.", timer: 3500 });
      document.getElementById("contactForm")?.reset();
    } else if (state?.success === false) {
      swal({ icon: "error", title: "Error!", text: "Something went wrong. Please try again later.", timer: 3500 });
    }
  }, [state]);

  return (
    <form action={formAction} id="contactForm">
      <div className="ctc-form-group">
        <label className="ctc-form-label">
          Your Name <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <input type="text" name="name" className="ctc-form-input" required />
      </div>

      <div className="ctc-form-row">
        <div>
          <label className="ctc-form-label">
            Mobile No <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input type="tel" name="phone" className="ctc-form-input" pattern="[0-9]{10}" title="Enter 10 digit number" required />
        </div>
        <div>
          <label className="ctc-form-label">
            Email <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input type="email" name="email" className="ctc-form-input" required />
        </div>
      </div>

      <div className="ctc-form-group">
        <label className="ctc-form-label">
          Message <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <textarea name="message" className="ctc-form-input ctc-form-textarea" rows={5} required minLength={25} />
      </div>

      <button type="submit" className="ctc-submit-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
        </svg>
        Send Message
      </button>
    </form>
  );
}