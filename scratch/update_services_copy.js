const fs = require('fs');

function updateServicesCopy() {
  const enPath = './src/dictionaries/en.json';
  const arPath = './src/dictionaries/ar.json';

  const enDict = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const arDict = JSON.parse(fs.readFileSync(arPath, 'utf8'));

  // ATS (Voxa)
  enDict.services.ats = {
    title: "AI-Driven ",
    highlight: "Applicant Tracking (Voxa)",
    description: "An end-to-end ATS that injects multimodal AI directly into the recruitment pipeline. We automate candidate screening and generate intelligence reports to drastically reduce time-to-hire.",
    features: [
      "Multimodal AI (Gemini 2.5 Flash)",
      "Twilio WhatsApp Automation",
      "N-Tier PostgreSQL Backend",
      "Cloudflare R2 Storage"
    ],
    image_alt: "Voxa ATS Dashboard",
    image_src: "/services/Voxa(ATS)design1.svg"
  };

  arDict.services.ats = {
    title: "نظام تتبع ",
    highlight: "المتقدمين بالذكاء الاصطناعي (Voxa)",
    description: "نظام متكامل لتتبع المتقدمين يدمج الذكاء الاصطناعي متعدد الوسائط مباشرة في مسار التوظيف. نقوم بأتمتة فرز المرشحين وإنشاء تقارير استخباراتية لتقليل وقت التوظيف بشكل كبير.",
    features: [
      "ذكاء اصطناعي متعدد الوسائط (Gemini 2.5 Flash)",
      "أتمتة التواصل عبر WhatsApp باستخدام Twilio",
      "بنية خلفية N-Tier مع PostgreSQL",
      "تخزين سحابي آمن عبر Cloudflare R2"
    ],
    image_alt: "لوحة تحكم Voxa ATS",
    image_src: "/services/Voxa(ATS)design1.svg"
  };

  // E-Learning (Skillup)
  enDict.services.elearning = {
    title: "Privacy-First ",
    highlight: "E-Learning (Skillup)",
    description: "A secure, interactive educational system utilizing local, embedded AI (Ollama) to guarantee data privacy, entirely eliminating cloud API costs and third-party dependencies.",
    features: [
      "Local LLM Integration (Ollama)",
      "Secure JWT Authentication",
      "Dynamic Progress Tracking",
      "Hybrid SQL/JSON Storage"
    ],
    image_alt: "Skillup E-Learning Platform",
    image_src: "/services/Voxa(E-learning)design1.svg"
  };

  arDict.services.elearning = {
    title: "منصات تعليم إلكتروني ",
    highlight: "تحترم الخصوصية (Skillup)",
    description: "نظام تعليمي آمن وتفاعلي يستخدم ذكاءً اصطناعياً محلياً مدمجاً (Ollama) لضمان خصوصية البيانات، مما يقضي تماماً على تكاليف واجهات برمجة التطبيقات السحابية واعتمادات الطرف الثالث.",
    features: [
      "دمج نماذج لغوية كبيرة محلية (Ollama)",
      "مصادقة آمنة باستخدام JWT",
      "تتبع ديناميكي لتقدم الطلاب",
      "تخزين هجين (SQL/JSON)"
    ],
    image_alt: "منصة التعليم الإلكتروني Skillup",
    image_src: "/services/Voxa(E-learning)design1.svg"
  };

  fs.writeFileSync(enPath, JSON.stringify(enDict, null, 2));
  fs.writeFileSync(arPath, JSON.stringify(arDict, null, 2));
}

updateServicesCopy();
