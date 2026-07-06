import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY is not defined. AI Recruiter Copilot will run in mock mode.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

const ai = getGeminiClient();

// In-memory contact message store
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
const contactMessages: ContactMessage[] = [];

// API endpoints
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// AI Recruiter Copilot chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    // Get the last message text
    const lastMessage = messages[messages.length - 1];
    const userPrompt = lastMessage?.content || "";

    const systemInstruction = `
You are the AI Digital Twin and Recruiter Copilot of Athul K R. Your goal is to answer questions from recruiters, hiring managers, and developers looking to evaluate Athul for Software Engineering, Full Stack Developer, or AI Engineer opportunities.

Answer exactly as Athul, using "I", "my", and "me". Be professional, direct, humble, and focus on practical engineering achievements.

Here is the exact ground truth of my background:
- **Full Name**: Athul K R
- **Role Targets**: Software Engineer / Full Stack Developer / AI Engineer
- **Email**: athulkr34@gmail.com
- **LinkedIn**: linkedin.com/in/athul-k-r-b04255326
- **GitHub**: github.com/athul-dotcom
- **Location**: Kochi, Kerala, India
- **Summary**: Full-stack software developer and MCA student at Amrita Vishwa Vidyapeetham with 9 months of professional internship experience building web and mobile applications. Proficient in MEAN stack (MongoDB, Express, Angular, Node), Python, React Native, and REST API development. I am passionate about scalable, user-centric software engineering and organizing information to make it useful.

- **Technical Skills**:
  - Languages: Python, JavaScript (ES6+), HTML5, CSS3, PHP, SQL, JSON, C++, C# (Note: Standard programming foundations)
  - Frameworks & Libraries: React, React Native, Node.js, Express.js, Angular, REST APIs
  - Databases: MySQL, MongoDB, PostgreSQL
  - Tools & Platforms: Git, GitHub, VS Code, Android Studio
  - Core Concepts: Data Structures & Algorithms, Object-Oriented Programming, DBMS, UI/UX Design, Mobile App Development

- **Work Experience**:
  1. Cellar Innovative Developers (Dec 2024 – Mar 2025) | Kochi, India
     - Role: Project Intern – Mobile Application Development
     - Impact & Achievements:
       - Developed key features for the "Academix Hub" mobile companion application using React Native, Node.js, Express.js, and MySQL. This application greatly improved student-faculty interaction workflows.
       - Collaborated in an Agile team of developers to deliver rapid sprint milestones, applying data structures to optimize API response handling.
       - Conducted detailed testing, troubleshooting, and debugging across Android platforms, drastically reducing reported bugs by writing component-level fixes.
  2. TECHWINGSYS (Jul 2024 – Nov 2024) | Kochi, India
     - Role: Project Intern – Web Application Development
     - Impact & Achievements:
       - Built and deployed the "Academix Hub" web application from scratch using HTML, CSS, PHP, and MySQL. It serves as a centralized academic management system.
       - Designed and implemented RESTful backend modules, ensuring high data integrity across relational database schemas.
       - Participated in the full software development lifecycle (SDLC) from requirements gathering, UI wireframing, backend implementation, rigorous testing, to deployment.

- **Projects**:
  1. Academix Hub (Web App) | HTML, CSS, PHP, MySQL: A full-stack academic management platform supporting student and faculty portals with role-based access, secure session-based authentication, and dynamic dashboards. Normalised relational schemas to manage courses and attendance.
  2. Academix Hub (Mobile Companion App) | React Native, Node.js, Express.js, MySQL: Cross-platform mobile companion with real-time data sync via REST APIs, providing immediate access to academic resources. Implemented modular, highly reusable component architectures.

- **Education**:
  - Master of Computer Applications (MCA) in Computer Science | Amrita Vishwa Vidyapeetham, Kochi, India (Jul 2025 – Present)
  - Bachelor of Computer Applications (BCA) in Computer Science | Cochin Arts and Science College, Kochi, India (Jun 2022 – Apr 2025)

- **Certifications**:
  - IBM SkillsBuild: Artificial Intelligence Fundamentals (Jun 2026)
  - Infosys Springboard: IoT Platforms Overview (Apr 2026), Basics of Python (Feb 2026), Computational Problem Solving (Jan 2026)

- **Achievements & Extracurriculars**:
  - National-level Kho-Kho Athlete: Winner of CBSE Cluster XI Kho-Kho Tournament (2019–2020) — demonstrates extreme discipline, team coordination, stamina, and performance under high pressure.
  - Industry Experience: Acquired 9 months of robust internship experience across web and mobile projects before graduating, showing fast learning and production capability.

Rules for response:
1. Always be professional, clear, and confident.
2. Keep your answers brief and concise. Recruiters don't have time to read long essays. Use bullet points for structural breakdowns.
3. If asked about a topic or technology not listed in the resume (e.g. AWS, Kubernetes, Rust), reply honestly that you haven't used it extensively in production yet, but emphasize your solid foundations in Python, JavaScript, and Node.js, and your proven track record of picking up frameworks (like Angular and React Native) quickly.
4. Encourage recruiters to download my resume, view my projects, or use the contact form to reach out to me directly at athulkr34@gmail.com.
`;

    if (!ai) {
      // Fallback response if GEMINI_API_KEY is missing
      const fallbackReplies: { [key: string]: string } = {
        default: "Hello! Thank you for checking out Athul's portfolio. Since the Gemini API Key is currently unconfigured, I am running in local offline mode. Athul is a Full-Stack developer with 9 months of internship experience. Feel free to contact him at athulkr34@gmail.com!",
        skills: "Athul is highly skilled in React, React Native, Node.js, Express, Angular, Python, PHP, MySQL, and MongoDB. He holds certifications in AI Fundamentals from IBM and has built full-stack applications from scratch.",
        experience: "Athul has completed two professional internships: one at Cellar Innovative Developers (React Native, Node, Express, MySQL) and one at TECHWINGSYS (PHP, MySQL, HTML/CSS).",
      };

      const lowercasePrompt = userPrompt.toLowerCase();
      let reply = fallbackReplies.default;
      if (lowercasePrompt.includes("skill") || lowercasePrompt.includes("tech") || lowercasePrompt.includes("language")) {
        reply = fallbackReplies.skills;
      } else if (lowercasePrompt.includes("experience") || lowercasePrompt.includes("work") || lowercasePrompt.includes("job") || lowercasePrompt.includes("intern")) {
        reply = fallbackReplies.experience;
      }

      return res.json({ text: reply });
    }

    // Format chat history for Gemini API
    const historyParts = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Generate content using gemini-3.5-flash
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...historyParts.map(h => ({ role: h.role, parts: h.parts })),
        { role: "user", parts: [{ text: userPrompt }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to communicate with AI Copilot", details: error.message });
  }
});

import nodemailer from "nodemailer";

// Configure Nodemailer Transporter
const getMailTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    console.warn("WARNING: SMTP credentials (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS) are not defined in .env. Form submissions will log to console only.");
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: parseInt(port, 10),
    secure: port === "465", // true for 465, false for 587
    auth: {
      user,
      pass,
    },
  });
};

const transporter = getMailTransporter();

// Contact message submission
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required" });
  }

  const newMessage: ContactMessage = {
    id: Math.random().toString(36).substring(2, 9),
    name,
    email,
    subject: subject || "No Subject",
    message,
    timestamp: new Date().toISOString(),
  };

  contactMessages.push(newMessage);
  console.log("New Contact Message Received:", newMessage);

  // Send real email if transporter is configured
  if (transporter) {
    try {
      const toEmail = process.env.SMTP_TO || "athulkr34@gmail.com";
      await transporter.sendMail({
        from: `"${name}" <${process.env.SMTP_USER}>`,
        to: toEmail,
        replyTo: email,
        subject: `[Portfolio Inquiry] ${subject || "No Subject"}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong></p>
               <p style="white-space: pre-wrap;">${message}</p>`,
      });
      console.log("Email forwarded successfully to:", toEmail);
    } catch (err: any) {
      console.error("Nodemailer failed to send email:", err.message);
    }
  }

  res.json({
    success: true,
    message: "Your message was sent successfully!",
    id: newMessage.id,
  });
});

// Retrieve contact messages (for preview / recruiter review in live demo)
app.get("/api/messages", (req, res) => {
  res.json(contactMessages);
});

// SEO Static Files Routing
app.get("/robots.txt", (req, res) => {
  res.sendFile(path.join(process.cwd(), "robots.txt"));
});

app.get("/sitemap.xml", (req, res) => {
  res.sendFile(path.join(process.cwd(), "sitemap.xml"));
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

if (process.env.VERCEL !== "1") {
  startServer();
}

export default app;
