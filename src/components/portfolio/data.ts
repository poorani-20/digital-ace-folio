import art1 from "@/assets/art-1.jpg";
import art2 from "@/assets/art-2.jpg";
import art3 from "@/assets/art-3.jpg";
import art4 from "@/assets/art-4.jpg";

export const profile = {
  name: "Poorani M K",
  tagline: "Electronics & Communication Engineer",
  headline: "Building intelligent electronics, from silicon to signal.",
  intro:
    "Dedicated Electronics and Communication Engineering student at Sona College of Technology, Salem. Focused on Digital Electronics, Embedded Systems, Signal Processing, IoT, VLSI Design, and software development — passionate about solving real-world engineering challenges through innovation and technology.",
  email: "pooranimahe20@gmail.com",
  phone: "+91 77084 13057",
  location: "Salem, Tamil Nadu, India",
  socials: {
    github: "https://github.com/poorani-20",
    linkedin: "https://www.linkedin.com/in/poorani-mahendiran-902187326",
    twitter: "https://twitter.com",
  },
};

export const stats = [
  { label: "CGPA", value: "8.24" },
  { label: "Certifications", value: "10+" },
  { label: "Workshops", value: "05" },
  { label: "Branch", value: "ECE" },
];

export const education = [
  {
    period: "Pursuing",
    title: "B.E. Electronics & Communication Engineering",
    org: "Sona College of Technology, Salem",
    detail: "CGPA: 8.24 • Coursework in VLSI, Embedded Systems, Signal & Image Processing, Communication Systems.",
    active: true,
  },
  {
    period: "Higher Secondary",
    title: "HSC — Physics, Chemistry, Mathematics, Biology",
    org: "Higher Secondary School",
    detail: "Strong foundation in mathematics and physical sciences.",
  },
  {
    period: "Secondary",
    title: "SSLC — Secondary School",
    org: "Secondary School",
    detail: "All-round academic performance across core subjects.",
  },
];

export const technicalSkills = [
  { name: "VLSI Design", level: 82 },
  { name: "Embedded Systems & Arduino", level: 85 },
  { name: "Digital Electronics", level: 88 },
  { name: "Signal & Image Processing", level: 78 },
  { name: "Communication Systems", level: 80 },
  { name: "Programming (C / Java / SQL)", level: 80 },
];

export const softwareSkills = [
  "C", "Java", "SQL", "LabVIEW", "AutoCAD", "Arduino",
];

export const softSkills = [
  "Problem Solving", "Teamwork", "Communication", "Adaptability", "Leadership",
];

export const projects = [
  {
    title: "IoT-Based Smart Monitoring System",
    category: "IoT",
    img: art1,
    desc: "End-to-end IoT prototype using Arduino and sensor nodes streaming telemetry to a cloud dashboard for real-time monitoring.",
    tags: ["Arduino", "IoT", "C"],
    github: "#",
    demo: "#",
  },
  {
    title: "Digital Signal Processing Toolkit",
    category: "Signal Processing",
    img: art2,
    desc: "Implementation of filters and FFT-based spectral analysis for audio and biomedical signals.",
    tags: ["DSP", "MATLAB", "Python"],
    github: "#",
    demo: "#",
  },
  {
    title: "VLSI Logic Block Design",
    category: "VLSI",
    img: art3,
    desc: "RTL design, simulation and synthesis of combinational and sequential blocks following standard VLSI flow.",
    tags: ["Verilog", "VLSI", "EDA"],
    github: "#",
    demo: "#",
  },
];

export const certifications = [
  { name: "NPTEL Design Thinking — Elite", org: "NPTEL", date: "—", category: "Design" },
  { name: "Digital Application Fundamentals (STEM)", org: "FutureSkills Prime", date: "—", category: "Digital" },
  { name: "Data Processing and Visualization", org: "FutureSkills Prime", date: "—", category: "Data" },
  { name: "LabVIEW Certification", org: "NI / Workshop", date: "—", category: "Tools" },
  { name: "Energy Literacy Certification", org: "Energy Literacy", date: "—", category: "Domain" },
  { name: "TCS iON Career Edge", org: "TCS iON", date: "—", category: "Career" },
  { name: "AI IDEATHON — Participation", org: "Ideathon", date: "—", category: "Events" },
  { name: "Smart India Hackathon — Participation", org: "SIH", date: "—", category: "Events" },
  { name: "Codeathon — Participation", org: "Codeathon", date: "—", category: "Events" },
  { name: "IoT Industrial Training", org: "Industrial Training", date: "—", category: "Training" },
];

export const internships: { company: string; role: string; period: string; learned: string }[] = [];
export const research: { title: string; venue: string; type: string }[] = [];
export const testimonials: { quote: string; name: string; role: string }[] = [];

export const achievements = [
  "Scored 97% in 10th Standard (SSLC)",
  "Scored 84% in 12th Standard (HSC)",
  "NPTEL Design Thinking — Elite certification",
  "Participant — Smart India Hackathon",
  "Participant — AI IDEATHON",
  "Participant — Codeathon",
  "Completed IoT Industrial Training",
];

export const workshops = [
  { name: "PCB Design Workshop", org: "Technical Workshop", date: "—" },
  { name: "LoRaWAN Workshop", org: "Technical Workshop", date: "—" },
  { name: "Arduino Workshop", org: "Technical Workshop", date: "—" },
  { name: "AI in ERP", org: "Industry Talk", date: "—" },
  { name: "Wireless Communication", org: "Technical Workshop", date: "—" },
];

export const extracurriculars = [
  "Joint Secretary — IQEQ Club",
  "Participated in Speak for India Competition — Zonal Level",
  "Active member — Departmental technical events",
  "Art & creative illustration",
  "Volunteer — College technical fests",
];

export const gallery = [art1, art2, art3, art4];

export const blog: { title: string; date: string; read: string }[] = [];
