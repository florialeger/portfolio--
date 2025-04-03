import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Text } from "@components/ui/Text";
import { ArrowRightIcon } from "@components/ui/icon/SignIcon";
import "./ContactForm.css";

const ContactForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    subject: "Hey!",
    name: "",
    from: "",
    message: "Type Your Message…",
  });

  const isFormValid = formData.name && formData.from && formData.message;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (e) => {
    if (
      e.target.name === "message" &&
      e.target.value === "Type Your Message…"
    ) {
      setFormData((prev) => ({ ...prev, message: "" }));
    }
  };

  const handleBlur = (e) => {
    if (e.target.name === "message" && e.target.value === "") {
      setFormData((prev) => ({ ...prev, message: "Type Your Message…" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      emailjs
        .send(
          "service_t0uahlh", // Service ID
          "template_hj955qg", // Template ID
          {
            subject: formData.subject,
            name: formData.name,
            from_email: formData.from,
            message: formData.message,
          },
          "as8u83pDvkyDqS7Me" // Public Key
        )
        .then(
          (result) => {
            console.log("Email sent successfully:", result.text);
            alert("Your message has been sent!");
          },
          (error) => {
            console.error("Error sending email:", error.text);
            alert("An error occurred. Please try again.");
          }
        );
    }
  };

  return (
    <div className="contact-form-overlay" onClick={onClose}>
      <div className="contact-form" onClick={(e) => e.stopPropagation()}>
        <div className="form-fields-container">
          <div className="form-group">
            <Text type="p" className="text-secondary text">
              To:
            </Text>
            <Text type="p" className="text-primary text">
              flleger@ensc.fr
            </Text>
          </div>
          <div className="form-group">
            <Text type="p" className="text-secondary text">
              Subject:
            </Text>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="text-primary text"
            />
          </div>
          <div className="form-group">
            <Text type="p" className="text-secondary text">
              Name:
            </Text>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name..."
              className="text-primary text"
            />
          </div>
          <div className="form-group">
            <Text type="p" className="text-secondary text">
              From:
            </Text>
            <input
              type="email"
              name="from"
              value={formData.from}
              onChange={handleChange}
              placeholder="Your Email Address..."
              className="text-primary text"
            />
          </div>
          <div className="form-group no-border">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Type Your Message…"
              className="text-primary text"
            />
          </div>
        </div>
        <div className="send-button-container">
          <button
            className={`send-button ${isFormValid ? "active" : ""}`}
            onClick={handleSubmit}
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
