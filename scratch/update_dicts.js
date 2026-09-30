const fs = require('fs');

function updateDicts() {
  const enPath = './src/dictionaries/en.json';
  const arPath = './src/dictionaries/ar.json';

  const enDict = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const arDict = JSON.parse(fs.readFileSync(arPath, 'utf8'));

  // 1. ATS
  enDict.services.ats = {
    title: "Applicant Tracking ",
    highlight: "Systems (ATS)",
    description: "Streamline your hiring process with a custom ATS. We build intelligent pipelines to manage candidates, automate screening, and hire the best talent faster.",
    features: ["Automated Resume Parsing", "Custom Workflow Stages", "Candidate Communication", "Analytics & Reporting"],
    image_alt: "ATS Dashboard",
    image_src: "/services/Voxa(ATS)design1.svg"
  };
  arDict.services.ats = {
    title: "أنظمة تتبع ",
    highlight: "المتقدمين (ATS)",
    description: "قم بتبسيط عملية التوظيف الخاصة بك من خلال نظام تتبع مخصص. نقوم ببناء مسارات عمل ذكية لإدارة المرشحين، وأتمتة الفرز، وتوظيف أفضل المواهب بشكل أسرع.",
    features: ["تحليل السير الذاتية تلقائيًا", "مراحل عمل مخصصة", "التواصل مع المرشحين", "التحليلات والتقارير"],
    image_alt: "لوحة تحكم ATS",
    image_src: "/services/Voxa(ATS)design1.svg"
  };

  // 2. E-learning
  enDict.services.elearning = {
    title: "Interactive ",
    highlight: "E-Learning",
    description: "Engaging and scalable educational platforms for schools, universities, and corporate training. Gamify learning and track student progress effortlessly.",
    features: ["LMS Integration", "Interactive Course Modules", "Video Streaming Infrastructure", "Student Progress Tracking"],
    image_alt: "E-learning Platform",
    image_src: "/services/Voxa(E-learning)design1.svg"
  };
  arDict.services.elearning = {
    title: "منصات التعليم ",
    highlight: "الإلكتروني",
    description: "منصات تعليمية تفاعلية وقابلة للتوسع للمدارس والجامعات والتدريب المؤسسي. اجعل التعلم ممتعاً وتتبع تقدم الطلاب بسهولة.",
    features: ["التكامل مع أنظمة إدارة التعلم LMS", "وحدات دورات تفاعلية", "بنية تحتية لبث الفيديو", "تتبع تقدم الطلاب"],
    image_alt: "منصة التعليم الإلكتروني",
    image_src: "/services/Voxa(E-learning)design1.svg"
  };

  // 3. Security
  enDict.services.security = {
    title: "Enterprise ",
    highlight: "Cybersecurity",
    description: "Fortify your digital infrastructure. We implement zero-trust architectures and continuous monitoring to protect your data from evolving threats.",
    features: ["Zero-Trust Architecture", "Vulnerability Assessments", "Data Encryption", "Compliance Auditing"],
    image_alt: "Security Network",
    image_src: "/services/Voxa(Security)design1.svg"
  };
  arDict.services.security = {
    title: "الأمن ",
    highlight: "السيبراني للمؤسسات",
    description: "حصّن بنيتك التحتية الرقمية. نقوم بتنفيذ بنيات انعدام الثقة والمراقبة المستمرة لحماية بياناتك من التهديدات المتطورة.",
    features: ["بنية خالية من الثقة (Zero-Trust)", "تقييم الثغرات الأمنية", "تشفير البيانات", "تدقيق الامتثال"],
    image_alt: "شبكة الأمان",
    image_src: "/services/Voxa(Security)design1.svg"
  };

  // 4. Stress
  enDict.services.stress = {
    title: "System Load & ",
    highlight: "Stress Testing",
    description: "Ensure your applications never crash under pressure. We simulate massive user traffic to identify bottlenecks and optimize server architecture.",
    features: ["Simulated High Traffic", "Bottleneck Identification", "Server Architecture Scaling", "Performance Optimization"],
    image_alt: "Stress Testing Graph",
    image_src: "/services/Voxa(Stress)design1.svg"
  };
  arDict.services.stress = {
    title: "اختبار التحمل ",
    highlight: "وضغط الأنظمة",
    description: "تأكد من أن تطبيقاتك لا تتعطل أبدًا تحت الضغط. نقوم بمحاكاة حركة مرور ضخمة لتحديد نقاط الاختناق وتحسين بنية الخادم.",
    features: ["محاكاة حركة المرور العالية", "تحديد نقاط الاختناق", "توسيع بنية الخادم", "تحسين الأداء"],
    image_alt: "رسم بياني لاختبار التحمل",
    image_src: "/services/Voxa(Stress)design1.svg"
  };

  // 5. TennisAnalyze
  enDict.services.tennis = {
    title: "Sports Performance ",
    highlight: "Analysis",
    description: "AI-driven analysis for sports professionals. Track player movements, optimize strategies, and gain a competitive edge using advanced data visualization.",
    features: ["AI Movement Tracking", "Match Strategy Optimization", "Data Visualization", "Player Biometrics"],
    image_alt: "Tennis Analysis Graphic",
    image_src: "/services/Voxa(TennisAnalyze)design1.svg"
  };
  arDict.services.tennis = {
    title: "تحليل الأداء ",
    highlight: "الرياضي (تنس)",
    description: "تحليل مدفوع بالذكاء الاصطناعي للمحترفين الرياضيين. تتبع حركات اللاعبين، وحسن الاستراتيجيات، واكتسب ميزة تنافسية باستخدام التصور المتقدم للبيانات.",
    features: ["تتبع الحركة بالذكاء الاصطناعي", "تحسين استراتيجية المباراة", "تصور البيانات (Data Visualization)", "القياسات الحيوية للاعبين"],
    image_alt: "رسم تحليل التنس",
    image_src: "/services/Voxa(TennisAnalyze)design1.svg"
  };

  fs.writeFileSync(enPath, JSON.stringify(enDict, null, 2));
  fs.writeFileSync(arPath, JSON.stringify(arDict, null, 2));
}

updateDicts();
