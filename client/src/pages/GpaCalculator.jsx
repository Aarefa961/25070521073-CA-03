import React, { useState, useMemo } from 'react';
import { Calculator, Plus, Trash2, Award, Sparkles, HelpCircle, CheckCircle } from 'lucide-react';

const gradePoints = {
  O: 10,
  'A+': 9,
  A: 8,
  'B+': 7,
  B: 6,
  C: 5,
  P: 4,
  F: 0,
};

const initialCourses = [
  { id: 1, name: 'Web Technologies (CS301)', credits: 4, grade: 'O' },
  { id: 2, name: 'Design & Analysis of Algorithms (CS302)', credits: 4, grade: 'A+' },
  { id: 3, name: 'Database Management Systems (CS303)', credits: 3, grade: 'A' },
  { id: 4, name: 'Computer Networks (CS304)', credits: 3, grade: 'A+' },
  { id: 5, name: 'Web Technologies Lab (CS301L)', credits: 2, grade: 'O' },
  { id: 6, name: 'DBMS Hands-on Lab (CS303L)', credits: 2, grade: 'O' },
];

export default function GpaCalculator() {
  const [courses, setCourses] = useState(initialCourses);
  const [activeTab, setActiveTab] = useState('sgpa'); // 'sgpa' or 'cgpa'

  // CGPA additional fields
  const [prevCgpa, setPrevCgpa] = useState('8.50');
  const [prevCredits, setPrevCredits] = useState('80');

  const addCourse = () => {
    setCourses([
      ...courses,
      { id: Date.now(), name: `Elective Course ${courses.length + 1}`, credits: 3, grade: 'A' },
    ]);
  };

  const removeCourse = (id) => {
    if (courses.length <= 1) return;
    setCourses(courses.filter((c) => c.id !== id));
  };

  const updateCourse = (id, field, value) => {
    setCourses(
      courses.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  // Calculation logic
  const { sgpa, totalCredits, totalPoints } = useMemo(() => {
    let credits = 0;
    let points = 0;
    courses.forEach((c) => {
      const cr = Number(c.credits) || 0;
      const gp = gradePoints[c.grade] !== undefined ? gradePoints[c.grade] : 0;
      credits += cr;
      points += cr * gp;
    });
    const calculated = credits > 0 ? (points / credits).toFixed(2) : '0.00';
    return { sgpa: calculated, totalCredits: credits, totalPoints: points };
  }, [courses]);

  // Combined CGPA
  const cumulativeCgpa = useMemo(() => {
    const pCgpa = parseFloat(prevCgpa) || 0;
    const pCr = parseFloat(prevCredits) || 0;
    const currentCr = totalCredits;
    const currentPts = totalPoints;

    const totalAllCredits = pCr + currentCr;
    if (totalAllCredits === 0) return '0.00';

    const totalAllPoints = pCgpa * pCr + currentPts;
    return (totalAllPoints / totalAllCredits).toFixed(2);
  }, [prevCgpa, prevCredits, totalCredits, totalPoints]);

  const getClassification = (score) => {
    const val = parseFloat(score);
    if (val >= 8.5) return { label: 'First Class with Distinction 🌟', color: 'text-emerald' };
    if (val >= 7.5) return { label: 'First Class 🎖️', color: 'text-indigo' };
    if (val >= 6.5) return { label: 'Higher Second Class 📈', color: 'text-amber' };
    if (val >= 5.0) return { label: 'Second Class', color: 'text-gray' };
    return { label: 'Pass / Improvement Needed', color: 'text-rose' };
  };

  return (
    <div className="gpa-page-container">
      {/* Header */}
      <div className="tasks-header-bar">
        <div>
          <h1 className="tasks-main-title">Academic GPA & CGPA Calculator</h1>
          <p className="tasks-subtext">Credit-weighted grading algorithm based on the 10-point university scale</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="gpa-tabs-row">
        <button
          onClick={() => setActiveTab('sgpa')}
          className={`gpa-tab-pill ${activeTab === 'sgpa' ? 'active-gpa-tab' : ''}`}
        >
          Semester SGPA Calculator
        </button>
        <button
          onClick={() => setActiveTab('cgpa')}
          className={`gpa-tab-pill ${activeTab === 'cgpa' ? 'active-gpa-tab' : ''}`}
        >
          Cumulative CGPA Predictor
        </button>
      </div>

      <div className="gpa-layout-grid">
        {/* Left Column: Course Rows Table */}
        <div className="gpa-card-box">
          <div className="gpa-box-header">
            <h3>{activeTab === 'sgpa' ? 'Current Semester Courses' : 'Current Semester Breakdown'}</h3>
            <button onClick={addCourse} className="btn-secondary-sm">
              <Plus size={16} /> Add Subject
            </button>
          </div>

          <div className="courses-table-wrap">
            <table className="courses-table">
              <thead>
                <tr>
                  <th>Subject / Course Title</th>
                  <th style={{ width: '100px' }}>Credits</th>
                  <th style={{ width: '140px' }}>Grade</th>
                  <th style={{ width: '60px' }}></th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>
                      <input
                        type="text"
                        value={course.name}
                        onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                        className="table-input"
                        placeholder="Subject Name"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={course.credits}
                        onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                        className="table-input text-center"
                      />
                    </td>
                    <td>
                      <select
                        value={course.grade}
                        onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                        className="table-select"
                      >
                        <option value="O">O (10 Pts)</option>
                        <option value="A+">A+ (9 Pts)</option>
                        <option value="A">A (8 Pts)</option>
                        <option value="B+">B+ (7 Pts)</option>
                        <option value="B">B (6 Pts)</option>
                        <option value="C">C (5 Pts)</option>
                        <option value="P">P (4 Pts)</option>
                        <option value="F">F (0 Pts)</option>
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => removeCourse(course.id)}
                        className="table-delete-btn"
                        title="Remove Subject"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {activeTab === 'cgpa' && (
            <div className="cgpa-previous-inputs-card">
              <h4>Previous Semester Records</h4>
              <div className="form-grid-two">
                <div className="form-field-group">
                  <label className="field-label">Previous Cumulative CGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={prevCgpa}
                    onChange={(e) => setPrevCgpa(e.target.value)}
                    className="text-input"
                  />
                </div>
                <div className="form-field-group">
                  <label className="field-label">Total Credits Completed Prior</label>
                  <input
                    type="number"
                    min="0"
                    value={prevCredits}
                    onChange={(e) => setPrevCredits(e.target.value)}
                    className="text-input"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Results Scorecard */}
        <div className="gpa-scorecard-column">
          <div className="gpa-scorecard">
            <div className="scorecard-header">
              <Award size={26} className="scorecard-icon" />
              <span>Projected Result</span>
            </div>

            <div className="scorecard-main-metric">
              <span className="metric-score">
                {activeTab === 'sgpa' ? sgpa : cumulativeCgpa}
              </span>
              <span className="metric-scale">/ 10.00</span>
            </div>

            <div className={`scorecard-classification ${getClassification(activeTab === 'sgpa' ? sgpa : cumulativeCgpa).color}`}>
              {getClassification(activeTab === 'sgpa' ? sgpa : cumulativeCgpa).label}
            </div>

            <div className="scorecard-breakdown-list">
              <div className="breakdown-item">
                <span>Semester Credits:</span>
                <strong>{totalCredits}</strong>
              </div>
              <div className="breakdown-item">
                <span>Grade Points Accumulated:</span>
                <strong>{totalPoints}</strong>
              </div>
              {activeTab === 'cgpa' && (
                <div className="breakdown-item">
                  <span>Overall Total Credits:</span>
                  <strong>{Number(prevCredits || 0) + totalCredits}</strong>
                </div>
              )}
            </div>

            <div className="scorecard-formula-box">
              <span className="formula-title">Grading Formula:</span>
              <code>SGPA = Σ(Credit × Grade Point) / Σ(Credits)</code>
            </div>
          </div>

          {/* Reference Grade Scale Card */}
          <div className="gpa-card-box mt-4">
            <h4 className="mb-2 text-sm font-semibold text-gray-300">University 10-Point Scale Reference</h4>
            <div className="grade-legend-grid">
              <div className="legend-item"><span className="legend-badge">O</span><span>90-100% (10)</span></div>
              <div className="legend-item"><span className="legend-badge">A+</span><span>80-89% (9)</span></div>
              <div className="legend-item"><span className="legend-badge">A</span><span>70-79% (8)</span></div>
              <div className="legend-item"><span className="legend-badge">B+</span><span>60-69% (7)</span></div>
              <div className="legend-item"><span className="legend-badge">B</span><span>55-59% (6)</span></div>
              <div className="legend-item"><span className="legend-badge">C</span><span>50-54% (5)</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
