import React, { useState } from 'react';
import {
  Users,
  Search,
  Mail,
  MapPin,
  Clock,
  BookOpen,
  Calendar,
  Sparkles,
  CheckCircle2,
  Award,
  ExternalLink,
  X,
  Send,
} from 'lucide-react';

const facultyDirectory = [
  {
    id: 'somesh-chutel',
    name: 'Prof. Somesh Chutel',
    designation: 'Assistant Professor & Course Mentor',
    department: 'Computer Science & Engineering',
    course: 'Web Technologies (WT) & CA-03 Evaluation',
    email: 'somesh.chutel90@gmail.com',
    cabin: 'CS Faculty Block A-204 / Computing Lab 3',
    officeHours: 'Mon & Thu: 03:30 PM - 05:00 PM',
    specialization: 'Full-Stack MERN Architecture, React 18, Node.js REST APIs, Cloud Systems',
    education: 'M.Tech in Computer Science & Engineering',
    featured: true,
  },
  {
    id: 'neha-sharma',
    name: 'Dr. Neha Sharma',
    designation: 'Professor & Algorithms Lead',
    department: 'Computer Science & Engineering',
    course: 'Design & Analysis of Algorithms (DAA)',
    email: 'neha.sharma@sitpune.edu.in',
    cabin: 'Faculty Block B-102',
    officeHours: 'Tue & Fri: 02:00 PM - 04:00 PM',
    specialization: 'Algorithmic Complexity, Dynamic Programming, Graph Theory',
    education: 'Ph.D. in Computer Science',
    featured: false,
  },
  {
    id: 'rajesh-kulkarni',
    name: 'Prof. Rajesh Kulkarni',
    designation: 'Associate Professor & DB Systems Chair',
    department: 'Computer Science & Engineering',
    course: 'Database Management Systems (DBMS)',
    email: 'rajesh.kulkarni@sitpune.edu.in',
    cabin: 'CS Faculty Block A-208',
    officeHours: 'Wed & Fri: 10:00 AM - 12:00 PM',
    specialization: 'Relational Schema Design, MongoDB Atlas NoSQL, Distributed DBs',
    education: 'M.Tech, Pursuing Ph.D.',
    featured: false,
  },
  {
    id: 'amit-verma',
    name: 'Dr. Amit Verma',
    designation: 'Associate Professor & Networks Lab Head',
    department: 'Computer Science & Engineering',
    course: 'Computer Networks (CN)',
    email: 'amit.verma@sitpune.edu.in',
    cabin: 'Faculty Block B-205',
    officeHours: 'Mon & Wed: 01:30 PM - 03:30 PM',
    specialization: 'TCP/IP Socket Programming, Network Security, OSI Model',
    education: 'Ph.D. in Information Technology',
    featured: false,
  },
  {
    id: 'priya-patil',
    name: 'Prof. Priya Patil',
    designation: 'Assistant Professor & Software Systems Mentor',
    department: 'Computer Science & Engineering',
    course: 'Software Engineering (SE)',
    email: 'priya.patil@sitpune.edu.in',
    cabin: 'CS Faculty Block A-114',
    officeHours: 'Tue & Thu: 11:00 AM - 01:00 PM',
    specialization: 'Agile & Scrum Methodologies, Software Architecture, CI/CD',
    education: 'M.Tech in Software Engineering',
    featured: false,
  },
];

export default function Faculty() {
  const [search, setSearch] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [bookingSlot, setBookingSlot] = useState({
    date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    time: '03:30 PM',
    reason: 'Continuous Assessment CA-03 Project Review',
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const filtered = facultyDirectory.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.course.toLowerCase().includes(search.toLowerCase()) ||
      f.specialization.toLowerCase().includes(search.toLowerCase())
  );

  const handleBook = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedFaculty(null);
    }, 2500);
  };

  return (
    <div className="faculty-page-container">
      {/* Header */}
      <div className="tasks-header-bar">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-pill-accent">Symbiosis Institute of Technology • CSE Faculty</span>
          </div>
          <h1 className="tasks-main-title">Faculty Directory & Consultation Portal</h1>
          <p className="tasks-subtext">
            Connect with course guides, view cabin office hours, and book project review appointments
          </p>
        </div>

        {/* Search */}
        <div className="search-box-wrap" style={{ minWidth: '280px' }}>
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search faculty or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Faculty Cards Grid */}
      <div className="faculty-cards-grid mt-4">
        {filtered.map((faculty) => (
          <div
            key={faculty.id}
            className={`faculty-profile-card ${faculty.featured ? 'featured-mentor-card' : ''}`}
          >
            {faculty.featured && (
              <div className="mentor-highlight-ribbon">
                <Sparkles size={14} />
                <span>Course Evaluator & CA-03 Guide</span>
              </div>
            )}

            <div className="faculty-card-header">
              <div className="faculty-avatar-box">
                <span className="faculty-avatar-char">{faculty.name.split(' ')[1]?.[0] || 'P'}</span>
              </div>
              <div className="faculty-header-meta">
                <h3 className="faculty-profile-name">{faculty.name}</h3>
                <span className="faculty-profile-desig">{faculty.designation}</span>
                <span className="faculty-profile-dept">{faculty.department}</span>
              </div>
            </div>

            <div className="faculty-body-info">
              <div className="faculty-info-line">
                <BookOpen size={16} className="text-indigo shrink-0" />
                <span><strong>Course:</strong> {faculty.course}</span>
              </div>

              <div className="faculty-info-line">
                <Clock size={16} className="text-amber shrink-0" />
                <span><strong>Office Hours:</strong> {faculty.officeHours}</span>
              </div>

              <div className="faculty-info-line">
                <MapPin size={16} className="text-emerald shrink-0" />
                <span><strong>Cabin:</strong> {faculty.cabin}</span>
              </div>

              <div className="faculty-info-line">
                <Mail size={16} className="text-cyan shrink-0" />
                <span className="font-mono text-sm">{faculty.email}</span>
              </div>

              <div className="faculty-specialization-box">
                <span className="spec-title">Areas of Expertise:</span>
                <p className="spec-text">{faculty.specialization}</p>
              </div>
            </div>

            <div className="faculty-card-actions">
              <button
                onClick={() => setSelectedFaculty(faculty)}
                className="btn-book-consult"
              >
                <Calendar size={15} />
                <span>Schedule Consultation</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedFaculty && (
        <div className="modal-backdrop-custom" onClick={() => setSelectedFaculty(null)}>
          <div className="modal-card-custom" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-custom">
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-indigo" />
                <h3 className="modal-title-custom">Book Consultation Slot</h3>
              </div>
              <button
                onClick={() => setSelectedFaculty(null)}
                className="modal-close-btn"
              >
                <X size={18} />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="booking-success-box text-center py-4">
                <CheckCircle2 size={48} className="text-emerald mx-auto mb-2" />
                <h4>Consultation Slot Confirmed!</h4>
                <p className="text-muted text-sm mt-1">
                  Appointment confirmed with <strong>{selectedFaculty.name}</strong> for{' '}
                  <strong>{bookingSlot.date} at {bookingSlot.time}</strong>.
                </p>
                <span className="badge-pill-accent mt-3 inline-block">Notification sent to student email</span>
              </div>
            ) : (
              <form onSubmit={handleBook} className="auth-form mt-2">
                <div className="faculty-appointment-preview">
                  <span className="text-xs text-muted">Consulting Faculty:</span>
                  <strong className="block text-indigo">{selectedFaculty.name}</strong>
                  <span className="text-xs text-muted block">{selectedFaculty.cabin}</span>
                </div>

                <div className="form-grid-two">
                  <div className="form-field-group">
                    <label className="field-label">Date</label>
                    <input
                      type="date"
                      required
                      value={bookingSlot.date}
                      onChange={(e) => setBookingSlot({ ...bookingSlot, date: e.target.value })}
                      className="text-input"
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="field-label">Consultation Time</label>
                    <select
                      value={bookingSlot.time}
                      onChange={(e) => setBookingSlot({ ...bookingSlot, time: e.target.value })}
                      className="text-input select-input"
                    >
                      <option value="03:30 PM">03:30 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="04:30 PM">04:30 PM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="form-field-group">
                  <label className="field-label">Consultation Topic / Purpose</label>
                  <select
                    value={bookingSlot.reason}
                    onChange={(e) => setBookingSlot({ ...bookingSlot, reason: e.target.value })}
                    className="text-input select-input"
                  >
                    <option value="Continuous Assessment CA-03 Project Review">Continuous Assessment CA-03 Project Review</option>
                    <option value="Full-Stack Codebase Architecture Verification">Full-Stack Codebase Architecture Verification</option>
                    <option value="Assignment / Lab Clarification">Assignment / Lab Clarification</option>
                    <option value="Mid-Term Exam Doubts">Mid-Term Exam Doubts</option>
                    <option value="Research Guidance & Paper Discussion">Research Guidance & Paper Discussion</option>
                  </select>
                </div>

                <div className="modal-footer-custom">
                  <button
                    type="button"
                    onClick={() => setSelectedFaculty(null)}
                    className="btn-secondary-large"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary-large">
                    <Send size={15} />
                    <span>Confirm Slot</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
