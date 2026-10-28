import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Award,
  AlertCircle,
  CheckCircle2,
  Hourglass,
  Sparkles,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';

const examList = [
  {
    id: 1,
    title: 'Continuous Assessment 03 (CA-03): Web Technologies Project Evaluation',
    course: 'Web Technologies (CS301)',
    faculty: 'Prof. Somesh Chutel',
    date: '2026-10-30',
    time: '01:30 PM - 04:30 PM',
    venue: 'Computing Lab 3 / Seminar Hall',
    type: 'Practical & Viva Voce',
    marks: '20 Marks',
    status: 'Upcoming',
    targetTimestamp: new Date(Date.now() + 86400000 * 2).getTime(),
  },
  {
    id: 2,
    title: 'CA-03: Dynamic Programming & Graph Theory Viva',
    course: 'Design & Analysis of Algorithms (CS302)',
    faculty: 'Dr. Neha Sharma',
    date: '2026-11-04',
    time: '10:00 AM - 01:00 PM',
    venue: 'Computing Lab 1',
    type: 'Oral Viva & Code Run',
    marks: '20 Marks',
    status: 'Scheduled',
    targetTimestamp: new Date(Date.now() + 86400000 * 7).getTime(),
  },
  {
    id: 3,
    title: 'CA-03: MongoDB NoSQL Aggregation & Indexing Assessment',
    course: 'Database Management Systems (CS303)',
    faculty: 'Prof. Rajesh Kulkarni',
    date: '2026-11-08',
    time: '02:00 PM - 04:00 PM',
    venue: 'Database Systems Lab',
    type: 'Hands-on Lab Exam',
    marks: '20 Marks',
    status: 'Scheduled',
    targetTimestamp: new Date(Date.now() + 86400000 * 11).getTime(),
  },
  {
    id: 4,
    title: 'Continuous Assessment 02 (CA-02): Mid-Semester Theory Exam',
    course: 'Computer Networks (CS304)',
    faculty: 'Dr. Amit Verma',
    date: '2026-09-18',
    time: '09:30 AM - 11:30 AM',
    venue: 'Hall A-102',
    type: 'Written Examination',
    marks: '15 Marks',
    status: 'Completed',
    score: '14.5 / 15',
  },
  {
    id: 5,
    title: 'Continuous Assessment 01 (CA-01): Unit Test 1',
    course: 'Web Technologies (CS301)',
    faculty: 'Prof. Somesh Chutel',
    date: '2026-08-25',
    time: '09:00 AM - 10:30 AM',
    venue: 'Room 204',
    type: 'Online Quiz & MCQ',
    marks: '15 Marks',
    status: 'Completed',
    score: '15 / 15',
  },
];

export default function ExamSchedule() {
  const nextExam = examList[0];
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const diff = Math.max(0, nextExam.targetTimestamp - Date.now());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [nextExam]);

  return (
    <div className="exam-schedule-container">
      {/* Header */}
      <div className="tasks-header-bar">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-pill-accent">Symbiosis Examination Controller</span>
            <span className="badge-pill-subtle">Odd Semester 2026-27</span>
          </div>
          <h1 className="tasks-main-title">Assessment & Examination Schedule</h1>
          <p className="tasks-subtext">
            Official timetable for Continuous Assessments (CA-01, CA-02, CA-03) and Practical Vivas
          </p>
        </div>
      </div>

      {/* Countdown Hero Banner */}
      <div className="exam-countdown-banner mt-4">
        <div className="countdown-info">
          <div className="flex items-center gap-2">
            <Hourglass size={18} className="text-amber animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-amber font-semibold">Next University Evaluation</span>
          </div>
          <h2 className="countdown-title mt-1">{nextExam.title}</h2>
          <div className="countdown-meta-row mt-2">
            <span><Calendar size={14} className="inline mr-1 text-indigo" /> {nextExam.date}</span>
            <span><Clock size={14} className="inline mr-1 text-emerald" /> {nextExam.time}</span>
            <span><MapPin size={14} className="inline mr-1 text-rose" /> {nextExam.venue}</span>
            <span><Award size={14} className="inline mr-1 text-cyan" /> {nextExam.faculty}</span>
          </div>
        </div>

        {/* Live Timer Boxes */}
        <div className="countdown-clock-boxes">
          <div className="timer-box">
            <span className="timer-val">{timeLeft.days}</span>
            <span className="timer-unit">Days</span>
          </div>
          <div className="timer-box">
            <span className="timer-val">{timeLeft.hours}</span>
            <span className="timer-unit">Hours</span>
          </div>
          <div className="timer-box">
            <span className="timer-val">{timeLeft.minutes}</span>
            <span className="timer-unit">Mins</span>
          </div>
          <div className="timer-box">
            <span className="timer-val">{timeLeft.seconds}</span>
            <span className="timer-unit">Secs</span>
          </div>
        </div>
      </div>

      {/* Full Examination Schedule List */}
      <div className="dashboard-panel mt-5">
        <h3 className="panel-title mb-4">Complete Semester Assessment Timeline</h3>
        <div className="exam-cards-list">
          {examList.map((exam) => (
            <div
              key={exam.id}
              className={`exam-item-row ${exam.status === 'Completed' ? 'exam-completed' : 'exam-pending'}`}
            >
              <div className="exam-date-badge">
                <span className="exam-day-num">{new Date(exam.date).getDate()}</span>
                <span className="exam-month-name">{new Date(exam.date).toLocaleString('default', { month: 'short' })}</span>
              </div>

              <div className="exam-item-main">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="badge-pill-subtle">{exam.course}</span>
                  <span className={`status-pill ${exam.status === 'Completed' ? 'status-completed' : 'status-upcoming'}`}>
                    {exam.status}
                  </span>
                  <span className="badge-pill-accent">{exam.marks}</span>
                </div>
                <h4 className="exam-item-title">{exam.title}</h4>
                <div className="exam-item-details">
                  <span><Clock size={14} className="inline mr-1 text-muted" />{exam.time}</span>
                  <span><MapPin size={14} className="inline mr-1 text-muted" />{exam.venue}</span>
                  <span><Award size={14} className="inline mr-1 text-muted" />{exam.faculty}</span>
                  <span>Format: <strong>{exam.type}</strong></span>
                </div>
              </div>

              <div className="exam-score-area">
                {exam.status === 'Completed' ? (
                  <div className="score-badge">
                    <span className="score-lbl">Score Awarded:</span>
                    <strong className="score-num text-emerald">{exam.score}</strong>
                  </div>
                ) : (
                  <div className="hall-ticket-verified">
                    <CheckCircle2 size={16} className="text-emerald inline mr-1" />
                    <span>Hall Ticket Verified</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exam Day Instructions & Guidelines */}
      <div className="dashboard-panel mt-5">
        <h3 className="panel-title mb-3">Student Examination Checklist & Code of Conduct</h3>
        <div className="instructions-grid">
          <div className="inst-card">
            <ShieldCheck size={20} className="text-indigo mb-2" />
            <h4>Mandatory College ID Card</h4>
            <p>Students must present their verified digital or physical ID card with Roll No / PRN (25070521073) at the examination venue.</p>
          </div>
          <div className="inst-card">
            <FileCheck size={20} className="text-emerald mb-2" />
            <h4>Project Code Repository</h4>
            <p>For CA-03 Project evaluation, ensure the GitHub repository link is active with clean client/server decoupled architecture.</p>
          </div>
          <div className="inst-card">
            <Clock size={20} className="text-amber mb-2" />
            <h4>Reporting Time</h4>
            <p>Candidate entry to the Computing Labs closes strictly 15 minutes before scheduled assessment start time.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
