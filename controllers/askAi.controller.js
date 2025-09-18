import prisma from "../prismaClient.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function askAi(req, res) {
  try {
    const { question } = req.body;
    if (!question)
      return res.status(400).json({ error: "question is required" });

    //const saved = await prisma.message.create({
    //  data: {
    //    userName: userName || "Anonymous",
    //    userInput: question,
    //    aiAnswer: "",
    //  },
    //});

    //if (!userName) {
    //  const aiAnswer = "Hi there! I don't think we've met — what's your name?";
    //  await prisma.message.update({
    //    where: { id: saved.id },
    //    data: { aiAnswer },
    //  });
    //  return res.json({ success: true, answer: aiAnswer });
    //}

    const lowerQ = question.toLowerCase();
    const relevantKeywords = [
      "hi",
      "hello",
      "hi there",
      "hey",
      "he",
      "his",
      "awais",
      "portfolio",
      "project",
      "experience",
      "skill",
      "developer",
      "react",
      "node",
      "prisma",
      "gemini",
      "pdf",
      "chat",
    ];
    const isRelevant = relevantKeywords.some((k) => lowerQ.includes(k));

    if (!isRelevant) {
      const aiAnswer = `Hi there, I can only answer questions related to Awais Dev’s experience, skills, and projects. Please try asking about that.`;
      //  await prisma.message.update({
      //    where: { id: saved.id },
      //    data: { aiAnswer },
      //  });
      return res.json({ success: true, answer: aiAnswer, question });
    }

    const owner = await prisma.user.findFirst({
      include: {
        skills: { include: { category: true } },
        projects: true,
        experiences: true,
      },
    });

    //if (!owner) {
    //  const aiAnswer = "Sorry — profile data is not available right now.";
    //  await prisma.message.update({
    //    where: { id: saved.id },
    //    data: { aiAnswer },
    //  });
    //  return res.status(500).json({ error: "Profile not found" });
    //}

    const profile = {
      name: owner.name,
      about: owner.about,
      direction: owner.direction,
      portfolioLink: "https://awais-dev-portfolio.netlify.app",
      skills: owner.skills.map((s) => ({
        name: s.name,
        level: s.level,
        category: s.category?.name || null,
      })),
      projects: owner.projects.map((p) => ({
        name: p.name,
        summary: p.summary,
        techStack: p.techStack,
        link: p.link,
      })),
      experiences: owner.experiences.map((e) => ({
        title: e.title,
        details: e.details,
      })),
    };

    const systemPrompt = `
You are a friendly assistant that ONLY answers questions about Awais Dev.
Always stay positive and professional. If a question is irrelevant, politely refuse.
Here is Awais's profile data:
${JSON.stringify(profile, null, 2)}
    `;

    const userPrompt = `${question}`;

    const result = await model.generateContent([systemPrompt, userPrompt]);
    const aiAnswer =
      result.response?.text?.() ??
      (result.output?.[0]?.content ?? "").toString();

    //await prisma.message.update({
    //  where: { id: saved.id },
    //  data: { aiAnswer },
    //});

    return res.json({ success: true, answer: aiAnswer, question });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "AI error" });
  }
}
