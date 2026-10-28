import React, { useState } from 'react';
import {
  BookOpen,
  FileText,
  Award,
  Layers,
  CheckCircle,
  ExternalLink,
  Download,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

const coursesSyllabus = {
  wt: {
    code: 'CS301',
    name: 'Web Technologies (WT)',
    faculty: 'Prof. Somesh Chutel',
    credits: 4,
    evaluation: 'CA-01 (15M) + CA-02 (15M) + CA-03 (20M) + End Sem (50M)',
    units: [
      {
        unit: 'Unit 1: Modern Frontend Foundations',
        hours: 8,
        weight: '15%',
        topics: 'HTML5 Semantic markup, Modern CSS3 Flexbox & Grid architectures, CSS custom properties, responsive viewport design, web accessibility (a11y).',
      },
      {
        unit: 'Unit 2: Advanced JavaScript (ES6+)',
        hours: 8,
        weight: '15%',
        topics: 'Closures, Event Loop & Asynchronous execution, Promises, Async/Await, Destructuring, Spread syntax, Modules (import/export), DOM event delegation.',
      },
      {
        unit: 'Unit 3: Single Page Applications with React 18',
        hours: 10,
        weight: '20%',
        topics: 'Component lifecycles, Virtual DOM reconciliation, Hooks (useState, useEffect, useMemo, useCallback, useContext), React Router v7 navigation, state management.',
      },
      {
        unit: 'Unit 4: Server-Side Engineering with Node.js & Express',
        hours: 10,
        weight: '20%',
        topics: 'Event-driven I/O, Express routing middleware, CORS handling, RESTful API conventions, request validation, error-handling middleware patterns.',
      },
      {
        unit: 'Unit 5: NoSQL Databases with MongoDB Atlas',
        hours: 8,
        weight: '15%',
        topics: 'Document model vs Relational schemas, Mongoose ODM schemas, embedded vs referenced relations, indexing, aggregate pipelines, MongoDB connection pooling.',
      },
      {
        unit: 'Unit 6: Web Security & Token-Based Authentication',
        hours: 8,
        weight: '15%',
        topics: 'Bcrypt salt hashing (10 rounds), JSON Web Tokens (JWT) stateless auth, Bearer authorization headers, CORS protection, client-side route shielding.',
      },
    ],
    sampleQuestions: [
      { q: 'Explain the difference between Virtual DOM and Real DOM reconciliation in React 18.', marks: 5 },
      { q: 'Illustrate how stateless JWT authentication operates with Bearer authorization headers in an Express REST API.', marks: 10 },
      { q: 'Design a Mongoose schema for academic task tracking including priority, due date validation, and user relations.', marks: 10 },
      { q: 'How does Bcrypt salt hashing prevent rainbow table attacks during student password registration?', marks: 5 },
    ],
    textbooks: [
      'Full Stack React, TypeScript, and Node by David Choi',
      'Node.js Web Development by David Herron',
      'MongoDB: The Definitive Guide by Shannon Bradshaw',
    ],
  },
  daa: {
    code: 'CS302',
    name: 'Design & Analysis of Algorithms',
    faculty: 'Dr. Neha Sharma',
    credits: 4,
    evaluation: 'CA-01 (15M) + CA-02 (15M) + CA-03 (20M) + End Sem (50M)',
    units: [
      {
        unit: 'Unit 1: Asymptotic Analysis & Recurrences',
        hours: 8,
        weight: '15%',
        topics: 'Big-O, Big-Omega, Theta notations. Master Theorem, substitution and recursion-tree methods for solving divide-and-conquer recurrences.',
      },
      {
        unit: 'Unit 2: Divide and Conquer Algorithms',
        hours: 8,
        weight: '15%',
        topics: 'Merge Sort, Quick Sort analysis (worst/best/average case), Strassen Matrix Multiplication, binary search applications.',
      },
      {
        unit: 'Unit 3: Dynamic Programming Paradigms',
        hours: 10,
        weight: '25%',
        topics: 'Optimal substructure and overlapping subproblems. 0/1 Knapsack, Longest Common Subsequence (LCS), Matrix Chain Multiplication, Bellman-Ford.',
      },
      {
        unit: 'Unit 4: Greedy Algorithms',
        hours: 8,
        weight: '15%',
        topics: 'Fractional Knapsack, Huffman coding, Prim and Kruskal Minimum Spanning Tree algorithms, interval scheduling.',
      },
      {
        unit: 'Unit 5: Graph Traversals & Flow Networks',
        hours: 10,
        weight: '15%',
        topics: 'Breadth-First Search (BFS), Depth-First Search (DFS), topological sorting, Ford-Fulkerson max-flow method.',
      },
      {
        unit: 'Unit 6: NP-Completeness & Approximation',
        hours: 8,
        weight: '15%',
        topics: 'P, NP, NP-Hard, NP-Complete definitions. Polynomial-time reductions (Circuit-SAT to 3-CNF SAT, Clique, Vertex Cover).',
      },
    ],
    sampleQuestions: [
      { q: 'Formulate the dynamic programming recurrence for the Matrix Chain Multiplication problem.', marks: 10 },
      { q: 'Solve the recurrence T(n) = 2T(n/2) + n using the Master Theorem.', marks: 5 },
      { q: 'Compare Prim’s and Kruskal’s algorithms with respect to sparse versus dense graphs.', marks: 8 },
    ],
    textbooks: [
      'Introduction to Algorithms (CLRS) by Cormen, Leiserson, Rivest, Stein',
      'Algorithm Design by Jon Kleinberg and Éva Tardos',
    ],
  },
  dbms: {
    code: 'CS303',
    name: 'Database Management Systems',
    faculty: 'Prof. Rajesh Kulkarni',
    credits: 3,
    evaluation: 'CA-01 (15M) + CA-02 (15M) + CA-03 (20M) + End Sem (50M)',
    units: [
      {
        unit: 'Unit 1: Relational Data Models & ER Schemas',
        hours: 8,
        weight: '15%',
        topics: 'Entity-Relationship diagrams, cardinality constraints, weak entities, Relational Algebra operators (select, project, join, set operations).',
      },
      {
        unit: 'Unit 2: SQL & Complex Query Optimization',
        hours: 8,
        weight: '20%',
        topics: 'DDL, DML, subqueries, group by, joins, stored procedures, triggers, views, indexing strategies and query execution plans.',
      },
      {
        unit: 'Unit 3: Normalization & Functional Dependencies',
        hours: 8,
        weight: '20%',
        topics: 'First, Second, Third Normal Form (1NF, 2NF, 3NF), Boyce-Codd Normal Form (BCNF), lossless-join and dependency preservation.',
      },
      {
        unit: 'Unit 4: Transaction Processing & Concurrency',
        hours: 8,
        weight: '20%',
        topics: 'ACID properties, serializability, two-phase locking (2PL), deadlock prevention, recovery mechanisms (WAL, checkpoints).',
      },
      {
        unit: 'Unit 5: NoSQL & MongoDB Architecture',
        hours: 8,
        weight: '25%',
        topics: 'CAP theorem, document stores, replication, sharding, MongoDB Atlas clusters, aggregation framework pipelines.',
      },
    ],
    sampleQuestions: [
      { q: 'Explain why BCNF is strictly stronger than 3NF with a concrete academic relation example.', marks: 10 },
      { q: 'Detail how two-phase locking protocol ensures serializable transaction execution.', marks: 8 },
    ],
    textbooks: [
      'Database System Concepts by Silberschatz, Korth, Sudarshan',
      'Fundamentals of Database Systems by Elmasri & Navathe',
    ],
  },
  cn: {
    code: 'CS304',
    name: 'Computer Networks',
    faculty: 'Dr. Amit Verma',
    credits: 3,
    evaluation: 'CA-01 (15M) + CA-02 (15M) + CA-03 (20M) + End Sem (50M)',
    units: [
      {
        unit: 'Unit 1: Network Layer & OSI Architecture',
        hours: 8,
        weight: '20%',
        topics: 'OSI vs TCP/IP 5-layer stack, packet switching vs circuit switching, physical transmission media, framing, CRC error detection.',
      },
      {
        unit: 'Unit 2: IP Addressing & Subnetting',
        hours: 8,
        weight: '20%',
        topics: 'IPv4 vs IPv6, CIDR notation, subnet masks, variable length subnet masking (VLSM), NAT, DHCP, ICMP protocol.',
      },
      {
        unit: 'Unit 3: Routing Algorithms',
        hours: 8,
        weight: '20%',
        topics: 'Distance Vector (Bellman-Ford), Link State (Dijkstra), OSPF, BGP inter-domain routing, count-to-infinity problem.',
      },
      {
        unit: 'Unit 4: Transport Layer & TCP Protocols',
        hours: 8,
        weight: '25%',
        topics: 'TCP vs UDP, 3-way handshake connection establishment, sliding window flow control, slow-start congestion control.',
      },
      {
        unit: 'Unit 5: Application Layer Protocols',
        hours: 8,
        weight: '15%',
        topics: 'HTTP/1.1 vs HTTP/2 vs HTTP/3, DNS hierarchical name resolution, SMTP, TLS/SSL cryptographic handshakes.',
      },
    ],
    sampleQuestions: [
      { q: 'Explain the TCP 3-way handshake and 4-way connection termination mechanisms.', marks: 10 },
      { q: 'Calculate network address and broadcast address for IP 192.168.10.75 with subnet mask /27.', marks: 6 },
    ],
    textbooks: [
      'Computer Networks by Andrew S. Tanenbaum',
      'Computer Networking: A Top-Down Approach by Kurose & Ross',
    ],
  },
};

export default function Syllabus() {
  const [activeCourseKey, setActiveCourseKey] = useState('wt');
  const course = coursesSyllabus[activeCourseKey];

  return (
    <div className="syllabus-page-container">
      {/* Header */}
      <div className="tasks-header-bar">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-pill-subtle">SIT Pune • B.Tech CSE Semester 5</span>
          </div>
          <h1 className="tasks-main-title">Course Curriculum & Question Bank</h1>
          <p className="tasks-subtext">
            Official unit-wise syllabus outlines, evaluation weightages, and previous assessment question banks
          </p>
        </div>
      </div>

      {/* Course Navigation Tabs */}
      <div className="syllabus-tabs-row mt-4">
        {Object.entries(coursesSyllabus).map(([key, data]) => (
          <button
            key={key}
            onClick={() => setActiveCourseKey(key)}
            className={`syllabus-tab-btn ${activeCourseKey === key ? 'active' : ''}`}
          >
            <BookOpen size={16} />
            <span>{data.name}</span>
            <span className="syllabus-code-badge">{data.code}</span>
          </button>
        ))}
      </div>

      {/* Active Course Overview Header */}
      <div className="dashboard-panel mt-4">
        <div className="syllabus-overview-card">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <span className="badge-pill-accent">{course.code}</span>
              <h2 className="text-2xl font-bold mt-1 text-main">{course.name}</h2>
              <span className="text-muted text-sm">Instructor: <strong className="text-main">{course.faculty}</strong> • Credits: <strong className="text-indigo">{course.credits}</strong></span>
            </div>
            <div className="evaluation-scheme-badge">
              <Award size={16} className="text-amber inline mr-1" />
              <span><strong>Evaluation:</strong> {course.evaluation}</span>
            </div>
          </div>
        </div>

        {/* Units Accordion / Cards */}
        <h3 className="section-title text-xl mt-5 mb-3">Unit-wise Module Breakdown</h3>
        <div className="units-list-grid">
          {course.units.map((unit, idx) => (
            <div key={idx} className="unit-card">
              <div className="unit-header">
                <div>
                  <h4 className="unit-title">{unit.unit}</h4>
                  <span className="unit-meta">{unit.hours} Lecture Hours • Weightage: {unit.weight}</span>
                </div>
              </div>
              <p className="unit-topics-body">{unit.topics}</p>
            </div>
          ))}
        </div>

        {/* Sample Question Bank */}
        <h3 className="section-title text-xl mt-5 mb-3">Previous Assessment Question Bank (CA-01, CA-02, CA-03)</h3>
        <div className="questions-grid">
          {course.sampleQuestions.map((q, idx) => (
            <div key={idx} className="question-card">
              <div className="flex justify-between items-start gap-2">
                <span className="q-number">Q{idx + 1}.</span>
                <span className="marks-pill">{q.marks} Marks</span>
              </div>
              <p className="q-text">{q.q}</p>
            </div>
          ))}
        </div>

        {/* Recommended Books */}
        <div className="textbooks-box mt-5">
          <h4 className="textbook-heading">Recommended Textbooks & Reference Literature:</h4>
          <ul className="textbooks-list">
            {course.textbooks.map((b, idx) => (
              <li key={idx}>
                <CheckCircle size={15} className="text-emerald inline mr-2 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
