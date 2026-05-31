import roboticArm from "@/assets/project-robotic-arm.jpg";
import cfd from "@/assets/project-cfd.jpg";
import iot from "@/assets/project-iot.jpg";
import art1 from "@/assets/art-1.jpg";
import art2 from "@/assets/art-2.jpg";
import art3 from "@/assets/art-3.jpg";
import art4 from "@/assets/art-4.jpg";

export const profile = {
  name: "Arjun Varma",
  tagline: "Mechanical & Systems Engineer",
  headline: "Designing resilient systems for industrial scale.",
  intro:
    "Senior student at the Institute of Advanced Engineering & Technology specializing in mechatronics and thermal dynamics. Focused on the intersection of hardware efficiency and autonomous control systems.",
  email: "hello@arjunv.engineering",
  phone: "+91 98765 43210",
  location: "Bengaluru, India",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
};

export const stats = [
  { label: "CGPA", value: "9.2/10" },
  { label: "Projects", value: "14" },
  { label: "Certifications", value: "12" },
  { label: "Internships", value: "03" },
];

export const education = [
  {
    period: "2021 — 2025",
    title: "B.Tech, Mechanical Engineering",
    org: "Institute of Advanced Engineering & Technology",
    detail: "CGPA: 9.2/10.0 • Specialization: Mechatronics, Internal Combustion, CAD/CAM.",
    active: true,
  },
  {
    period: "Graduated 2021",
    title: "Higher Secondary (Physics & Mathematics)",
    org: "St. Xavier's Science Academy",
    detail: "96% Aggregate • District Rank 4 in Mathematics Olympiad.",
  },
  {
    period: "Graduated 2019",
    title: "Secondary School Certificate",
    org: "Greenfield International School",
    detail: "94% Aggregate • School topper in Science.",
  },
];

export const technicalSkills = [
  { name: "Embedded Systems & ROS2", level: 92 },
  { name: "CAD/CAM (SolidWorks, Fusion 360)", level: 88 },
  { name: "Computational Fluid Dynamics", level: 84 },
  { name: "Control Systems (MATLAB/Simulink)", level: 80 },
  { name: "Python / C++ / Embedded C", level: 86 },
  { name: "Computer Vision (OpenCV)", level: 76 },
];

export const softwareSkills = [
  "SolidWorks", "Fusion 360", "Ansys Fluent", "MATLAB",
  "Simulink", "Arduino IDE", "VS Code", "GitHub", "Docker",
];

export const softSkills = [
  "Leadership", "Communication", "Teamwork", "Problem Solving", "Critical Thinking",
];

export const projects = [
  {
    title: "NeuralArm",
    category: "Robotics",
    img: roboticArm,
    desc: "Six-axis robotic arm with computer vision for autonomous sorting using OpenCV and Arduino.",
    tags: ["C++", "MATLAB", "SolidWorks"],
    github: "#",
    demo: "#",
  },
  {
    title: "EcoStream Dynamics",
    category: "Automotive",
    img: cfd,
    desc: "Drag reduction analysis of a modified EV chassis using Ansys Fluent — achieved 12% efficiency gain.",
    tags: ["Ansys", "Python", "CFD"],
    github: "#",
    demo: "#",
  },
  {
    title: "Smart Grid Node",
    category: "IoT",
    img: iot,
    desc: "IoT-enabled energy monitoring system for campus labs with real-time telemetry dashboard.",
    tags: ["IoT", "NodeJS", "ESP32"],
    github: "#",
    demo: "#",
  },
];

export const certifications = [
  { name: "Autodesk Certified Professional — Fusion 360", org: "Autodesk", date: "Mar 2024", category: "CAD" },
  { name: "Ansys Mechanical APDL", org: "Ansys Innovation Space", date: "Jan 2024", category: "Simulation" },
  { name: "ROS2 Foundations", org: "The Construct", date: "Oct 2023", category: "Robotics" },
  { name: "Machine Learning Specialization", org: "Coursera / Stanford", date: "Jul 2023", category: "AI/ML" },
  { name: "Embedded C for ARM", org: "ARM Education", date: "Mar 2023", category: "Embedded" },
  { name: "MATLAB Onramp", org: "MathWorks", date: "Sep 2022", category: "Tools" },
];

export const internships = [
  {
    company: "Tata Motors — Pune R&D",
    role: "Design Intern, Powertrain",
    period: "May 2024 — Jul 2024",
    learned: "Aided in CAE validation of an EV powertrain bracket. Reduced part mass by 9% via topology optimization.",
  },
  {
    company: "ISRO LPSC",
    role: "Research Trainee",
    period: "Dec 2023 — Jan 2024",
    learned: "Worked on heat exchanger thermal modeling for cryogenic test rigs in MATLAB and Ansys.",
  },
  {
    company: "Bosch Limited",
    role: "Manufacturing Intern",
    period: "Jun 2023 — Jul 2023",
    learned: "Shadowed line engineers on injector assembly. Built a small SPC dashboard with Python.",
  },
];

export const research = [
  {
    title: "Topology-Optimized EV Suspension Arm Using Generative Design",
    venue: "IJMER, Vol. 14, Issue 2 (2024)",
    type: "Journal",
  },
  {
    title: "ROS2-Based Swarm Coordination for Indoor Mapping",
    venue: "IEEE Student Conference on Robotics, 2023",
    type: "Conference",
  },
];

export const achievements = [
  "Dean's List — 6 consecutive semesters",
  "1st Place, SAE BAJA Virtuals 2023 — Endurance Design",
  "Smart India Hackathon 2023 — National Finalist",
  "Merit Scholarship — Top 2% of department",
];

export const workshops = [
  { name: "Generative AI for Engineers", org: "NVIDIA", date: "Feb 2024" },
  { name: "Advanced CFD Bootcamp", org: "IIT Bombay", date: "Nov 2023" },
  { name: "Industry 4.0 Summit", org: "Siemens India", date: "Aug 2023" },
];

export const extracurriculars = [
  "President — Robotics Club",
  "Lead — SAE BAJA Suspension Subteam",
  "Volunteer — Teach for India (Math)",
  "Captain — College Badminton Team",
];

export const gallery = [art1, art2, art3, art4, iot, roboticArm];

export const testimonials = [
  {
    quote:
      "One of the sharpest undergraduates I've mentored. Combines analytical rigor with a genuine instinct for building things.",
    name: "Dr. Priya Menon",
    role: "Professor, Mechanical Engg.",
  },
  {
    quote:
      "Picks up tools fast and asks the right questions. Owned an entire CAE validation track during his internship.",
    name: "Rohit Iyer",
    role: "Senior Engineer, Tata Motors",
  },
];

export const blog = [
  { title: "Why FEA Convergence Studies Matter More Than You Think", date: "Apr 2024", read: "6 min" },
  { title: "ROS2 + Micro-ROS: Notes from My First Swarm", date: "Feb 2024", read: "9 min" },
  { title: "From Sketch to Print: My CAD Workflow", date: "Dec 2023", read: "4 min" },
];
