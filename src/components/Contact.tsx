"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ReCAPTCHA from "react-google-recaptcha";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState("");
  const captchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    const openContactForm = () => {
      setSubmitted(false);
      setContactFormOpen(true);
    };
    window.addEventListener("open-contact-modal", openContactForm);
    return () => window.removeEventListener("open-contact-modal", openContactForm);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setContactFormOpen(false);
        setShowModal(false);
      }
    };
    const shouldLockScroll = contactFormOpen || showModal;
    if (!shouldLockScroll) return;

    const previousOverflow = document.body.style.overflow;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [contactFormOpen, showModal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError("");
  };

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setFormError("");
    const captchaToken = captchaRef.current?.getValue();

    if (!captchaToken) {
      setFormError("Please complete the reCAPTCHA.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, captchaToken }),
      });

      const result = (await response.json()) as { success: boolean; message: string };

      if (!response.ok || !result.success) {
        setFormError(result.message || "Something went wrong. Please try again.");
        captchaRef.current?.reset();
        return;
      }

      setSubmitted(true);
      setContactFormOpen(false);
      setShowModal(true);
      setFormData({ name: "", email: "", message: "" });
      captchaRef.current?.reset();
    } catch {
      setFormError("Something went wrong. Please try again.");
      captchaRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {contactFormOpen ? (
        createPortal(
        <div
          className="modal-overlay contact-form-overlay"
          onClick={() => setContactFormOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-form-title"
        >
          <div className="contact-form-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="contact-dialog-close"
              onClick={() => setContactFormOpen(false)}
              aria-label="Close contact form"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m18 6-12 12M6 6l12 12" />
              </svg>
            </button>
            <div className="terminal-window">
            <div className="terminal-titlebar">
              <div className="terminal-dots" role="img" aria-label="Window controls">
                <span className="terminal-dot terminal-dot-red" title="Close" />
                <span className="terminal-dot terminal-dot-yellow" title="Minimize" />
                <span className="terminal-dot terminal-dot-green" title="Maximize" />
              </div>
              <span id="contact-form-title" className="terminal-title">Contact Form</span>
            </div>

            <div className="terminal-body">
              <form onSubmit={handleSubmit}>
                <div className="terminal-line">
                  <label className="terminal-label" htmlFor="contact-name">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    maxLength={100}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="terminal-input"
                    required
                  />
                </div>

                <div className="terminal-line">
                  <label className="terminal-label" htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    maxLength={254}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="terminal-input"
                    required
                  />
                </div>

                <div className="terminal-line">
                  <label className="terminal-label" htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    maxLength={5000}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or inquiry"
                    className="terminal-textarea"
                    rows={4}
                    required
                  />
                </div>

                <div className="terminal-captcha">
                  {siteKey ? (
                    <ReCAPTCHA
                      ref={captchaRef}
                      sitekey={siteKey}
                      theme="light"
                    />
                  ) : (
                    <p className="terminal-error" role="alert">
                      reCAPTCHA is not configured.
                    </p>
                  )}
                </div>

                {formError ? (
                  <p id="contact-form-error" className="terminal-error" role="alert">
                    {formError}
                  </p>
                ) : null}

                <div className="terminal-button-row">
                  <button
                    type="submit"
                    className="terminal-submit-btn"
                    disabled={isSubmitting || !siteKey}
                  >
                    {isSubmitting ? (
                      <span className="terminal-loading">
                        <span className="terminal-loading-dot" />
                        <span>Sending...</span>
                      </span>
                    ) : submitted ? (
                      <span className="terminal-success">
                        <CheckIcon />
                        <span>Message sent</span>
                      </span>
                    ) : (
                      <span className="terminal-btn-text">
                        <span>Send Message</span>
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          </div>
        </div>
        , document.body)
      ) : null}

      {showModal ? (
        createPortal(
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">
              <CheckIcon />
            </div>
            <h3 id="contact-modal-title" className="modal-title">
              Message Sent Successfully!
            </h3>
            <p className="modal-description">
              Thank you for reaching out! Just wait for Jm's response — he'll get back to you as soon as possible.
            </p>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
        , document.body)
      ) : null}
    </>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

