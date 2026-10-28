import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Plus, X, BookOpen, Award, CheckCircle } from 'lucide-react';

const defaultSchedule = {
  Monday: [
    { id: 1, time: '09:00 - 10:00 AM', course: 'Web Technologies (WT)', code: 'CS301', room: 'Room 204', faculty: 'Prof. Somesh Chutel', type: 'Lecture' },
    { id: 2, time: '10:15 - 11:15 AM', course: 'Design & Analysis of Algorithms', code: 'CS302', room: 'Room 204', faculty: 'Dr. Sharma', type: 'Lecture' },
    { id: 3, time: '11:30 - 01:30 PM', course: 'Web Tech Full-Stack Lab', code: 'CS301L', room: 'Computing Lab 3', faculty: 'Prof. Somesh Chutel', type: 'Practical' },
    { id: 4, time: '02:30 - 03:30 PM', course: 'Database Management Systems', code: 'CS303', room: 'Room 205', faculty: 'Prof. Kulkarni', type: 'Lecture' },
  ],
  Tuesday: [
    { id: 5, time: '09:00 - 10:00 AM', course: 'Computer Networks', code: 'CS304', room: 'Room 204', faculty: 'Dr. Verma', type: 'Lecture' },
    { id: 6, time: '10:15 - 11:15 AM', course: 'Software Engineering', code: 'CS305', room: 'Room 204', faculty: 'Prof. Patil', type: 'Lecture' },
    { id: 7, time: '11:30 - 01:30 PM', course: 'DBMS SQL & NoSQL Lab', code: 'CS303L', room: 'Database Lab 2', faculty: 'Prof. Kulkarni', type: 'Practical' },
    { id: 8, time: '02:30 - 03:30 PM', course: 'Web Technologies (WT)', code: 'CS301', room: 'Room 204', faculty: 'Prof. Somesh Chutel', type: 'Tutorial' },
  ],
  Wednesday: [
    { id: 9, time: '09:00 - 11:00 AM', course: 'Algorithms Analysis Practical Lab', code: 'CS302L', room: 'Computing Lab 1', faculty: 'Dr. Sharma', type: 'Practical' },
    { id: 10, time: '11:15 - 12:15 PM', course: 'Computer Networks', code: 'CS304', room: 'Room 204', faculty: 'Dr. Verma', type: 'Lecture' },
    { id: 11, time: '01:30 - 02:30 PM', course: 'Database Management Systems', code: 'CS303', room: 'Room 205', faculty: 'Prof. Kulkarni', type: 'Lecture' },
    { id: 12, time: '02:30 - 04:30 PM', course: 'Project Work & Mentorship', code: 'PRJ301', room: 'Innovation Lab', faculty: 'Department Faculty', type: 'Project' },
  ],
  Thursday: [
    { id: 13, time: '09:00 - 10:00 AM', course: 'Design & Analysis of Algorithms', code: 'CS302', room: 'Room 204', faculty: 'Dr. Sharma', type: 'Lecture' },
    { id: 14, time: '10:15 - 11:15 AM', course: 'Web Technologies (WT)', code: 'CS301', room: 'Room 204', faculty: 'Prof. Somesh Chutel', type: 'Lecture' },
    { id: 15, time: '11:30 - 01:30 PM', course: 'Computer Networks Socket Lab', code: 'CS304L', room: 'Network Lab', faculty: 'Dr. Verma', type: 'Practical' },
    { id: 16, time: '02:30 - 03:30 PM', course: 'Software Engineering', code: 'CS305', room: 'Room 204', faculty: 'Prof. Patil', type: 'Lecture' },
  ],
  Friday: [
    { id: 17, time: '09:00 - 10:00 AM', course: 'Database Management Systems', code: 'CS303', room: 'Room 205', faculty: 'Prof. Kulkarni', type: 'Lecture' },
    { id: 18, time: '10:15 - 11:15 AM', course: 'Computer Networks', code: 'CS304', room: 'Room 204', faculty: 'Dr. Verma', type: 'Lecture' },
    { id: 19, time: '11:30 - 12:30 PM', course: 'Software Engineering Case Studies', code: 'CS305', room: 'Room 204', faculty: 'Prof. Patil', type: 'Tutorial' },
    { id: 20, time: '01:30 - 03:30 PM', course: 'Continuous Assessment Review (CA-03)', code: 'WT301', room: 'Seminar Hall', faculty: 'Prof. Somesh Chutel', type: 'Evaluation' },
  ],
  Saturday: [
    { id: 21, time: '10:00 - 12:00 PM', course: 'Technical Seminar & Paper Review', code: 'SEM301', room: 'Auditorium', faculty: 'Guest Speakers', type: 'Seminar' },
    { id: 22, time: '01:00 - 03:00 PM', course: 'Self-Study & Hackathon Prep', code: 'DEV301', room: 'Library / Labs', faculty: 'Student Council', type: 'Study' },
  ],
};

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Timetable() {
  const currentDayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday
  const defaultDay = currentDayIndex >= 1 && currentDayIndex <= 6 ? daysOfWeek[currentDayIndex - 1] : 'Monday';

  const [activeDay, setActiveDay] = useState(defaultDay);
  const [schedule, setSchedule] = useState(defaultSchedule);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSlot, setNewSlot] = useState({
    time: '09:00 - 10:00 AM',
    course: '',
    code: '',
    room: '',
    faculty: '',
    type: 'Lecture',
  });

  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!newSlot.course.trim() || !newSlot.room.trim()) {
      alert('Please fill out course and room.');
      return;
    }
    const created = { ...newSlot, id: Date.now() };
    setSchedule((prev) => ({
      ...prev,
      [activeDay]: [...(prev[activeDay] || []), created],
    }));
    setIsModalOpen(false);
    setNewSlot({ time: '09:00 - 10:00 AM', course: '', code: '', room: '', faculty: '', type: 'Lecture' });
  };

  const currentSlots = schedule[activeDay] || [];

  return (
    <div className="timetable-page-container">
      {/* Header */}
      <div className="tasks-header-bar">
        <div>
          <h1 className="tasks-main-title">Weekly Class Schedule</h1>
          <p className="tasks-subtext">Symbiosis Institute of Technology • Section B Semester Timetable</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary-large">
          <Plus size={18} />
          <span>Add Lecture / Lab Slot</span>
        </button>
      </div>

      {/* Days Tabs */}
      <div className="days-tab-bar">
        {daysOfWeek.map((day) => {
          const isActive = day === activeDay;
          const count = schedule[day]?.length || 0;
          return (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`day-tab-btn ${isActive ? 'active-day-tab' : ''}`}
            >
              <span className="day-name">{day}</span>
              <span className="day-period-count">{count} classes</span>
            </button>
          );
        })}
      </div>

      {/* Class Schedule Cards Grid */}
      <div className="schedule-cards-grid">
        {currentSlots.length === 0 ? (
          <div className="empty-tasks-placeholder">
            <Calendar size={44} className="empty-icon" />
            <h3>No Scheduled Classes for {activeDay}</h3>
            <p>Enjoy your break or add a practical lab/revision session.</p>
          </div>
        ) : (
          currentSlots.map((slot) => {
            const isPractical = slot.type === 'Practical' || slot.type === 'Lab';
            const isEvaluation = slot.type === 'Evaluation' || slot.type === 'Project';

            return (
              <div
                key={slot.id}
                className={`timetable-slot-card ${
                  isPractical ? 'border-practical' : isEvaluation ? 'border-eval' : ''
                }`}
              >
                <div className="slot-card-top">
                  <div className="slot-time-badge">
                    <Clock size={14} />
                    <span>{slot.time}</span>
                  </div>
                  <span className={`slot-type-pill type-${slot.type.toLowerCase()}`}>
                    {slot.type}
                  </span>
                </div>

                <div className="slot-course-title">
                  <h3>{slot.course}</h3>
                  {slot.code && <span className="slot-course-code">{slot.code}</span>}
                </div>

                <div className="slot-meta-items">
                  <div className="slot-meta-row">
                    <MapPin size={16} className="slot-meta-icon" />
                    <span>{slot.room}</span>
                  </div>
                  <div className="slot-meta-row">
                    <User size={16} className="slot-meta-icon" />
                    <span>{slot.faculty}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Slot Modal */}
      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-dialog-box">
            <div className="modal-header">
              <h3>Add Class Slot to {activeDay}</h3>
              <button onClick={() => setIsModalOpen(false)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSlot} className="modal-form-body">
              <div className="form-field-group">
                <label className="field-label">Subject / Course Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Web Technologies"
                  value={newSlot.course}
                  onChange={(e) => setNewSlot({ ...newSlot, course: e.target.value })}
                  className="text-input"
                />
              </div>

              <div className="form-grid-two">
                <div className="form-field-group">
                  <label className="field-label">Course Code</label>
                  <input
                    type="text"
                    placeholder="e.g. CS301"
                    value={newSlot.code}
                    onChange={(e) => setNewSlot({ ...newSlot, code: e.target.value })}
                    className="text-input"
                  />
                </div>

                <div className="form-field-group">
                  <label className="field-label">Session Type</label>
                  <select
                    value={newSlot.type}
                    onChange={(e) => setNewSlot({ ...newSlot, type: e.target.value })}
                    className="text-input select-input"
                  >
                    <option value="Lecture">Lecture</option>
                    <option value="Practical">Practical Lab</option>
                    <option value="Tutorial">Tutorial</option>
                    <option value="Project">Project Session</option>
                    <option value="Evaluation">Evaluation</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-two">
                <div className="form-field-group">
                  <label className="field-label">Time Slot *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 09:00 - 10:00 AM"
                    value={newSlot.time}
                    onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })}
                    className="text-input"
                  />
                </div>

                <div className="form-field-group">
                  <label className="field-label">Classroom / Lab *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lab 302 / Room 204"
                    value={newSlot.room}
                    onChange={(e) => setNewSlot({ ...newSlot, room: e.target.value })}
                    className="text-input"
                  />
                </div>
              </div>

              <div className="form-field-group">
                <label className="field-label">Faculty / Professor Name</label>
                <input
                  type="text"
                  placeholder="e.g. Prof. Somesh Chutel"
                  value={newSlot.faculty}
                  onChange={(e) => setNewSlot({ ...newSlot, faculty: e.target.value })}
                  className="text-input"
                />
              </div>

              <div className="modal-actions-bar">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary-large">
                  Cancel
                </button>
                <button type="submit" className="btn-primary-large">
                  Add to {activeDay} Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
