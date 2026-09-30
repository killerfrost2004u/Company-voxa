const fs = require('fs');

function updateTennisCopy() {
  const enPath = './src/dictionaries/en.json';
  const arPath = './src/dictionaries/ar.json';

  const enDict = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const arDict = JSON.parse(fs.readFileSync(arPath, 'utf8'));

  // Tennis Analyze
  enDict.services.tennis = {
    title: "AI Sports ",
    highlight: "Analytics",
    description: "Democratize elite sports analytics with AI. We transform standard video footage into professional-grade performance data, extracting ball trajectories and stroke mechanics.",
    features: [
      "Real-Time YOLO Object Tracking",
      "ResNet50 Deep Learning Action Recognition",
      "High-Performance FastAPI Backend",
      "Interactive Streamlit Dashboards"
    ],
    image_alt: "Tennis Analytics Dashboard",
    image_src: "/services/Voxa(TennisAnalyze)design1.svg"
  };

  arDict.services.tennis = {
    title: "التحليلات الرياضية ",
    highlight: "بالذكاء الاصطناعي",
    description: "إضفاء الطابع الديمقراطي على التحليلات الرياضية النخبوية بالذكاء الاصطناعي. نقوم بتحويل لقطات الفيديو القياسية إلى بيانات أداء احترافية واستخراج مسارات الكرة.",
    features: [
      "تتبع الكائنات في الوقت الفعلي (YOLO)",
      "التعرف على الإجراءات بالتعلم العميق (ResNet50)",
      "بنية خلفية عالية الأداء (FastAPI)",
      "لوحات تحكم تفاعلية (Streamlit)"
    ],
    image_alt: "لوحة تحكم تحليلات التنس",
    image_src: "/services/Voxa(TennisAnalyze)design1.svg"
  };

  fs.writeFileSync(enPath, JSON.stringify(enDict, null, 2));
  fs.writeFileSync(arPath, JSON.stringify(arDict, null, 2));
}

updateTennisCopy();
