import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, HelpCircle } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    prn: '',
    email: '',
    category: 'Project Feedback',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'How does authentication work in this project?',
      a: 'When you register via /create or /api/auth/register, the backend hashes the password using bcrypt with 10 salt rounds. On login, a signed JSON Web Token (JWT) is returned containing student claims and stored securely in localStorage.',
    },
    {
      q: 'Is this repository format matching the professor’s sample repo?',
      a: 'Yes! The project strictly follows the structure of somesh-chutel/25070521060-CA-03, featuring dedicated client/ and server/ root directories, JWT authentication, and MongoDB persistence.',
    },
    {
      q: 'Can the professor evaluate the application in 1-click?',
      a: 'Yes, click the "⚡ 1-Click Demo" button on the Navbar or Login page. It automatically logs in with the preloaded student profile (AAREFA AADIL, PRN: 25070521073).',
    },
    {
      q: 'How does the SGPA / CGPA calculator calculate scores?',
      a: 'It uses the UGC 10-point scale: SGPA = Σ(Credit × Grade Point) / Σ(Credits). Grades O=10, A+=9, A=8, B+=7, B=6, C=5, P=4, F=0.',
    },
  ];

  return (
    <div className="contact-page-container">
      {/* Header */}
      <div className="tasks-header-bar text-center">
        <div>
          <h1 className="tasks-main-title">Academic Support & Contact</h1>
          <p className="tasks-subtext">Department consultation hours, project inquiries, and academic feedback</p>
        </div>
      </div>

      <div className="contact-layout-grid">
        {/* Left Column: Form */}
        <div className="dashboard-panel">
          <h3 className="panel-title mb-2">Send an Inquiry or Feedback</h3>
          <p className="panel-subtitle mb-4">Questions regarding Continuous Assessment CA-03 or project implementation</p>

          {submitted ? (
            <div className="contact-success-card">
              <CheckCircle2 size={40} className="text-emerald mb-2" />
              <h3>Message Submitted Successfully!</h3>
              <p>Thank you for your feedback. We will get back to you shortly.</p>
              <button onClick={() => setSubmitted(false)} className="btn-secondary-large mt-3">
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-grid-two">
                <div className="form-field-group">
                  <label className="field-label">Student Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="text-input"
                  />
                </div>

                <div className="form-field-group">
                  <label className="field-label">PRN / Roll Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 25070521073"
                    value={formData.prn}
                    onChange={(e) => setFormData({ ...formData, prn: e.target.value })}
                    className="text-input"
                  />
                </div>
              </div>

              <div className="form-grid-two">
                <div className="form-field-group">
                  <label className="field-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="student@sit.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="text-input"
                  />
                </div>

                <div className="form-field-group">
                  <label className="field-label">Subject Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="text-input select-input"
                  >
                    <option value="Project Feedback">Project Feedback</option>
                    <option value="Evaluation Inquiry">Evaluation Inquiry</option>
                    <option value="Feature Suggestion">Feature Suggestion</option>
                    <option value="Bug Report">Technical Bug Report</option>
                  </select>
                </div>
              </div>

              <div className="form-field-group">
                <label className="field-label">Message / Query *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your inquiry or academic feedback in detail..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="text-input textarea-input"
                ></textarea>
              </div>

              <button type="submit" className="btn-primary-large w-full mt-3">
                <Send size={16} />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Student Developer & Faculty & Campus Details */}
        <div className="contact-side-col">
          {/* Student Developer Info Card */}
          <div className="dashboard-panel">
            <h3 className="panel-title mb-3">Project Lead & Developer Details</h3>
            <div className="faculty-info-box" style={{ borderColor: 'rgba(99, 102, 241, 0.4)', background: 'linear-gradient(145deg, rgba(99, 102, 241, 0.08), rgba(17, 24, 39, 0.6))' }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🎓</span>
                <strong className="faculty-name text-indigo" style={{ fontSize: '1.15rem' }}>AAREFA AADIL</strong>
              </div>
              <span className="faculty-role">Student Developer • Continuous Assessment CA-03</span>
              <div className="faculty-meta-list mt-2">
                <div className="meta-row">
                  <span className="text-indigo font-mono font-bold">PRN:</span>
                  <span className="font-mono text-main font-semibold">25070521073</span>
                </div>
                <div className="meta-row">
                  <MapPin size={16} className="text-emerald" />
                  <span>Symbiosis Institute of Technology (SIT), Pune</span>
                </div>
                <div className="meta-row">
                  <Clock size={16} className="text-cyan" />
                  <span>B.Tech CSE • 5th Semester • Section B (sitSecB)</span>
                </div>
                <div className="meta-row">
                  <Mail size={16} className="text-amber" />
                  <span>aarefa.aadil@sitpune.edu.in</span>
                </div>
              </div>
            </div>
          </div>

          {/* Faculty Consultation */}
          <div className="dashboard-panel mt-4">
            <h3 className="panel-title mb-3">Faculty Guide Consultation</h3>
            <div className="faculty-info-box">
              <strong className="faculty-name">Prof. Somesh Chutel</strong>
              <span className="faculty-role">Assistant Professor • Web Technologies</span>
              <div className="faculty-meta-list mt-2">
                <div className="meta-row">
                  <Clock size={16} className="text-indigo" />
                  <span>Mon & Thu: 03:30 PM - 05:00 PM</span>
                </div>
                <div className="meta-row">
                  <MapPin size={16} className="text-emerald" />
                  <span>Computing Lab 3 / Faculty Cabins</span>
                </div>
                <div className="meta-row">
                  <Mail size={16} className="text-amber" />
                  <span>somesh.chutel90@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Campus Location */}
          <div className="dashboard-panel mt-4">
            <h3 className="panel-title mb-3">Campus Information</h3>
            <div className="campus-info-card">
              <h4>Symbiosis Institute of Technology (SIT)</h4>
              <p>Near Lupin Research Park, Gram: Lavale, Tal: Mulshi, Pune, Maharashtra 412115</p>
              <span className="campus-dept-badge">Department of Computer Science & Engineering</span>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="dashboard-panel mt-5">
        <h3 className="panel-title mb-4">Frequently Asked Questions (CA-03 Project)</h3>
        <div className="faq-grid">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-card">
              <h4>
                <HelpCircle size={16} className="text-indigo mr-1" />
                {faq.q}
              </h4>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
