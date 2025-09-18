import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Categories
  const categories = {
    frontend: await prisma.skillCategory.upsert({
      where: { name: "Frontend" },
      update: {},
      create: { name: "Frontend" },
    }),
    backend: await prisma.skillCategory.upsert({
      where: { name: "Backend" },
      update: {},
      create: { name: "Backend" },
    }),
    testing: await prisma.skillCategory.upsert({
      where: { name: "Testing" },
      update: {},
      create: { name: "Testing" },
    }),
    ai: await prisma.skillCategory.upsert({
      where: { name: "AI & Automation" },
      update: {},
      create: { name: "AI & Automation" },
    }),
    deployment: await prisma.skillCategory.upsert({
      where: { name: "Deployment & DevOps" },
      update: {},
      create: { name: "Deployment & DevOps" },
    }),
    other: await prisma.skillCategory.upsert({
      where: { name: "Other" },
      update: {},
      create: { name: "Other" },
    }),
  };

  // User (you)
  const user = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Muhammad Awais",
      about: `I’m Awais Dev, a Full Stack Developer with a strong passion for building modern, scalable, and user-friendly applications. My journey has taken me deep into React, Next.js, Node.js, and backend testing, and along the way I’ve expanded into AI integrations, automation workflows, and React Native. I enjoy balancing the creativity of frontend development with the structure and reliability of backend systems.

My Work:

Frontend:
I’m a senior React developer who loves creating clean, responsive, and reusable UIs. I work extensively with Next.js, and my go-to tools include TailwindCSS, Bootstrap, Material-UI, React-Select, Formik, and Yup. I’ve built components like event forms, recurring rule builders, card management dashboards, category tables, and stock management tools.

Backend:
I work with Node.js/Express to build robust APIs. I’ve used Prisma and Sequelize ORM with databases like MySQL, MongoDB Atlas, and PostgreSQL (Supabase). I also integrate real-time chat systems with Pusher, and I keep my data structured with migrations and actors (createdById, updatedById).

Testing:
I take testing seriously. I’m experienced with Mocha, Chai, Sinon, and Supertest, and I rely on snapshot-based database testing with separate test databases. I prefer beforeEach setups for consistency, and I’ve written reliable route tests for everything from chats and threads to courses and AI features.

AI & Automation:
I’ve been exploring how AI can make apps smarter and workflows smoother. I experiment with Gemini API, build n8n AI Agents, and have worked on projects like AI-driven PDF summarizers and assistant-style chat backends.

React Native:
Recently, I’ve stepped into mobile development with React Native, extending my frontend expertise to cross-platform apps.

Deployment:
I deploy apps on Render and manage hosting and storage with Supabase, including handling signed URLs and file management.

My Approach:
I believe in clarity, simplicity, and best practices. I prefer straightforward utility functions, centralized logic (like handling currentUser globally), and clean testing setups. I avoid unnecessary complexity and always aim for scalable, maintainable solutions.

My Direction:
I see myself as a well-rounded full-stack engineer with deep roots in frontend React development and strong foundations in backend and testing. I’m actively expanding into AI integrations, automation, and mobile development, while continuing to refine my ability to deliver products that combine technical strength with real-world impact.`,
      direction:
        "Expanding into AI integrations, automation, and mobile development.",
    },
  });

  // Skills
  const skills = [
    { name: "React", level: "senior-level", category: categories.frontend },
    { name: "Next.js", level: "intermediate", category: categories.frontend },
    {
      name: "React Native",
      level: "beginner-intermediate",
      category: categories.frontend,
    },
    {
      name: "TailwindCSS",
      level: "senior-level",
      category: categories.frontend,
    },
    { name: "Bootstrap", level: "senior-level", category: categories.frontend },
    {
      name: "Material-UI",
      level: "senior-level",
      category: categories.frontend,
    },
    {
      name: "React-Select",
      level: "senior-level",
      category: categories.frontend,
    },
    { name: "Formik", level: "senior-level", category: categories.frontend },
    { name: "Yup", level: "senior-level", category: categories.frontend },
    {
      name: "Vite (TypeScript migration)",
      level: "intermediate",
      category: categories.frontend,
    },

    {
      name: "Node.js / Express",
      level: "intermediate",
      category: categories.backend,
    },
    { name: "Prisma", level: "intermediate", category: categories.backend },
    {
      name: "Sequelize ORM",
      level: "intermediate",
      category: categories.backend,
    },
    {
      name: "PostgreSQL (Supabase)",
      level: "intermediate",
      category: categories.backend,
    },
    {
      name: "MongoDB Atlas",
      level: "intermediate",
      category: categories.backend,
    },
    { name: "MySQL", level: "intermediate", category: categories.backend },
    {
      name: "REST API development",
      level: "intermediate",
      category: categories.backend,
    },
    {
      name: "Real-time communication (Pusher)",
      level: "intermediate",
      category: categories.backend,
    },
    {
      name: "Database migrations & actors",
      level: "intermediate",
      category: categories.backend,
    },

    { name: "Mocha", level: "intermediate", category: categories.testing },
    { name: "Chai", level: "intermediate", category: categories.testing },
    {
      name: "Sinon",
      level: "beginner-intermediate",
      category: categories.testing,
    },
    {
      name: "Supertest",
      level: "beginner-intermediate",
      category: categories.testing,
    },
    {
      name: "Snapshot-based database testing",
      level: "beginner-intermediate",
      category: categories.testing,
    },
    {
      name: "Test data setup with beforeEach",
      level: "intermediate",
      category: categories.testing,
    },
    {
      name: "Route & integration testing",
      level: "beginner-intermediate",
      category: categories.testing,
    },

    {
      name: "Gemini API integration",
      level: "intermediate",
      category: categories.ai,
    },
    {
      name: "OpenAI-style system prompt usage",
      level: "intermediate",
      category: categories.ai,
    },
    {
      name: "n8n AI Agents",
      level: "beginner-intermediate",
      category: categories.ai,
    },
    {
      name: "AI-driven apps",
      level: "beginner-intermediate",
      category: categories.ai,
    },

    {
      name: "Render",
      level: "beginner-intermediate",
      category: categories.deployment,
    },
    {
      name: "Supabase",
      level: "beginner-intermediate",
      category: categories.deployment,
    },

    { name: "TypeScript", level: "intermediate", category: categories.other },
  ];

  for (const s of skills) {
    await prisma.skill.upsert({
      where: { name_userId: { name: s.name, userId: user.id } },
      update: {},
      create: {
        name: s.name,
        level: s.level,
        category: { connect: { id: s.category.id } },
        user: { connect: { id: user.id } },
      },
    });
  }

  // Experience
  await prisma.experience.upsert({
    where: { title_userId: { title: "Full Stack Developer - 3 years", userId: user.id } },
    update: {},
    create: {
      title: "Full Stack Developer - 3 years",
      details:
        "Over 3 years of hands-on experience designing and building scalable applications. Strong background in frontend (React, Next.js), backend (Node.js, Prisma, Sequelize), and database management. Specialized in testing (Mocha, Chai, Sinon, Supertest), AI integration (Gemini API, n8n workflows), and recently expanded into React Native mobile apps.",
      user: { connect: { id: user.id } },
    },
  });

  // Projects
  const projects = [
    {
      name: "CineMax",
      summary:
        "Mobile Movie App built with React Native and Tailwind CSS, integrated with the OMDB API.",
      techStack: ["React Native", "Expo", "TailwindCSS", "OMDB"],
    },
    {
      name: "EcoNest",
      summary:
        "A modern expense manager & planner built with React and Node.js. Uses MongoDB and Cloudinary for storage and media.",
      techStack: [
        "React",
        "Node.js",
        "Bootstrap",
        "react-bootstrap",
        "tanstack/react-query",
        "MongoDB",
        "Cloudinary",
      ],
    },
    {
      name: "SwiftChat",
      summary:
        "Socket.IO Chat — Realtime Messaging. A production-ready realtime chat with presence, typing indicators, and infinite pagination.",
      techStack: [
        "React",
        "Bootstrap",
        "react-bootstrap",
        "tanstack/react-query",
        "Socket.IO",
        "Supabase",
      ],
    },
    {
      name: "Pdf Summarize",
      summary:
        "An AI-powered PDF summarizer that allows users to upload documents and receive concise, context-aware summaries. Built with React, Node.js, Supabase, and Gemini AI.",
      techStack: [
        "React",
        "Node.js",
        "Supabase",
        "Gemini AI",
        "Bootstrap",
        "react-bootstrap",
        "tanstack/react-query",
      ],
    },
  ];

  for (const p of projects) {
    await prisma.project.upsert({
      where: { name_userId: { name: p.name, userId: user.id } },
      update: {},
      create: {
        name: p.name,
        summary: p.summary,
        techStack: p.techStack,
        user: { connect: { id: user.id } },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
