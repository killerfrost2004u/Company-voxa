const fs = require('fs');

function addProjectsAndUpdateDicts() {
  const tsPath = './src/data/projects.ts';
  const enPath = './src/dictionaries/en.json';
  const arPath = './src/dictionaries/ar.json';

  // 1. Add projects to projects.ts
  let tsContent = fs.readFileSync(tsPath, 'utf8');
  
  const newProjects = `  },
  {
    slug: "academic-stress-classification",
    title: {
      en: "Academic Student Stress Classification",
      ar: "تصنيف الإجهاد الأكاديمي للطلاب"
    },
    client: "Internal Product / Open Source",
    category: {
      en: "Machine Learning & Healthcare",
      ar: "تعلم الآلة والرعاية الصحية"
    },
    problem: {
      en: "Academic stress is a significant challenge that can severely impact student well-being and educational performance if left unmonitored. Educational institutions often lack data-driven tools to proactively identify students experiencing high stress levels. Without a standardized, automated way to analyze relevant behavioral and psychological data, early intervention is incredibly difficult.",
      ar: "يعتبر الإجهاد الأكاديمي تحدياً كبيراً يمكن أن يؤثر بشدة على رفاهية الطلاب. غالباً ما تفتقر المؤسسات التعليمية إلى أدوات تعتمد على البيانات لتحديد الطلاب الذين يعانون من مستويات عالية من التوتر بشكل استباقي، مما يجعل التدخل المبكر صعباً للغاية."
    },
    solution: {
      en: "The Academic Student Stress Classification project is a dedicated end-to-end machine learning application designed to accurately identify and predict student stress levels. By leveraging data classification models, the system acts as a proactive diagnostic tool that visualizes stress indicators through an accessible web interface.",
      ar: "مشروع تصنيف الإجهاد الأكاديمي هو تطبيق متكامل لتعلم الآلة مصمم بدقة لتحديد وتوقع مستويات توتر الطلاب. يعمل النظام كأداة تشخيص استباقية تتصور مؤشرات الإجهاد من خلال واجهة ويب يمكن الوصول إليها."
    },
    features: [
      {
        title: { en: "High-Accuracy ML Modeling", ar: "نمذجة تعلم آلة عالية الدقة" },
        description: { 
          en: "Implements robust classification models that successfully achieve an 85% accuracy rate in identifying student stress levels.",
          ar: "ينفذ نماذج تصنيف قوية تحقق بنجاح معدل دقة 85٪ في تحديد مستويات توتر الطلاب."
        }
      },
      {
        title: { en: "Comprehensive Data Preprocessing", ar: "معالجة مسبقة شاملة للبيانات" },
        description: {
          en: "Meticulously preprocesses relevant datasets sourced from Kaggle to ensure high-quality data input for the algorithms.",
          ar: "معالجة مسبقة دقيقة لمجموعات البيانات ذات الصلة لضمان إدخال بيانات عالية الجودة للخوارزميات."
        }
      },
      {
        title: { en: "Interactive Web Deployment", ar: "نشر واجهة ويب تفاعلية" },
        description: {
          en: "Models were seamlessly deployed via an interactive Streamlit web interface with dynamic data visualization.",
          ar: "تم نشر النماذج بسلاسة عبر واجهة ويب تفاعلية من Streamlit مع تصور ديناميكي للبيانات."
        }
      }
    ],
    businessValue: {
      en: "This data-driven tool empowers academic counselors and institutional leadership to transition from reactive to proactive mental health support, rapidly identifying trends and allocating resources to at-risk student populations.",
      ar: "تُمكّن هذه الأداة المستشارين الأكاديميين من الانتقال من الدعم التفاعلي إلى الدعم الاستباقي للصحة العقلية، وتحديد الاتجاهات وتخصيص الموارد للطلاب المعرضين للخطر بسرعة."
    },
    image: "/services/Voxa(Stress)design1.svg"
  },
  {
    slug: "smart-vision-system",
    title: {
      en: "Smart Vision System (NHA-4-114)",
      ar: "نظام الرؤية الذكي (NHA-4-114)"
    },
    client: "NHA",
    category: {
      en: "AI Surveillance & Security",
      ar: "المراقبة والأمن بالذكاء الاصطناعي"
    },
    problem: {
      en: "Small and medium-sized businesses typically rely on traditional surveillance systems that are entirely passive. These systems merely record video, offering no real-time analysis of customer movement, no accurate visitor counting, and no proactive threat detection, leaving owners blind to actionable insights.",
      ar: "عادةً ما تعتمد الشركات على أنظمة المراقبة التقليدية السلبية تماماً، حيث تسجل الفيديو فقط دون تحليل مباشر لحركة العملاء أو اكتشاف استباقي للتهديدات، مما يترك المالكين غير قادرين على اتخاذ قرارات سريعة."
    },
    solution: {
      en: "The Smart Vision System is a comprehensive, AI-powered real-time video monitoring and analysis platform. It actively transforms raw, existing CCTV camera streams into an intelligent command center, extracting live visitor traffic data and delivering critical security alerts.",
      ar: "نظام الرؤية الذكي عبارة عن منصة شاملة لتحليل ومراقبة الفيديو في الوقت الفعلي مدعومة بالذكاء الاصطناعي. تحول بنشاط كاميرات المراقبة الحالية إلى مركز قيادة ذكي يستخرج بيانات حركة الزوار المباشرة ويقدم تنبيهات أمنية حرجة."
    },
    features: [
      {
        title: { en: "Advanced AI Processing Layer", ar: "طبقة معالجة ذكاء اصطناعي متقدمة" },
        description: { 
          en: "Utilizes YOLOv8 for highly accurate, real-time person detection, paired with a specialized custom YOLO model for critical weapon detection.",
          ar: "يستخدم YOLOv8 لاكتشاف الأشخاص بدقة عالية، مقترناً بنموذج مخصص للكشف عن الأسلحة."
        }
      },
      {
        title: { en: "Persistent Multi-Object Tracking", ar: "تتبع الكائنات المتعددة المستمر" },
        description: {
          en: "Implements ByteTrack to assign persistent IDs, utilizing OpenCV and supervision for efficient frame processing and bounding box annotation.",
          ar: "ينفذ ByteTrack لتعيين معرفات مستمرة، باستخدام OpenCV لمعالجة الإطارات بكفاءة."
        }
      },
      {
        title: { en: "Spatial & Behavior Analytics", ar: "التحليلات المكانية والسلوكية" },
        description: {
          en: "Automated Entry/Exit counting, polygon zone occupancy tracking, loitering behavior calculation, and density heatmap generation.",
          ar: "حساب آلي للدخول/الخروج، تتبع إشغال المناطق، حساب سلوك التسكع، وإنشاء خرائط حرارية للكثافة."
        }
      },
      {
        title: { en: "Real-Time Next.js Dashboard", ar: "لوحة تحكم Next.js في الوقت الفعلي" },
        description: {
          en: "Operator frontend built with Next.js and Zustand, connected via WebSockets for live multi-camera monitoring.",
          ar: "واجهة للمشغلين مبنية باستخدام Next.js، متصلة عبر WebSockets للمراقبة المباشرة."
        }
      }
    ],
    businessValue: {
      en: "Revolutionizes commercial operations by turning standard surveillance cameras into proactive business intelligence and security agents, optimizing floor layouts and drastically enhancing physical safety.",
      ar: "يحدث ثورة في العمليات التجارية من خلال تحويل كاميرات المراقبة القياسية إلى ذكاء أعمال استباقي وعملاء أمن، مما يعزز السلامة المادية بشكل كبير."
    },
    image: "/services/Voxa(Security)design1.svg"
  }
];`;
  
  tsContent = tsContent.replace(/  }\n\];/, newProjects);
  fs.writeFileSync(tsPath, tsContent);

  // 2. Update dictionaries
  const enDict = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const arDict = JSON.parse(fs.readFileSync(arPath, 'utf8'));

  // Stress (Academic Stress ML)
  enDict.services.stress = {
    title: "AI Mental Health ",
    highlight: "Classification",
    description: "Proactive, data-driven machine learning models that accurately classify academic stress levels to empower institutional intervention.",
    features: [
      "85% Accuracy ML Modeling",
      "Kaggle Dataset Preprocessing",
      "Interactive Streamlit Dashboards",
      "Dynamic Predictive Visualization"
    ],
    image_alt: "Academic Stress ML Model",
    image_src: "/services/Voxa(Stress)design1.svg"
  };

  arDict.services.stress = {
    title: "تصنيف الصحة النفسية ",
    highlight: "بالذكاء الاصطناعي",
    description: "نماذج تعلم آلي استباقية تصنف بدقة مستويات الإجهاد الأكاديمي لتمكين المؤسسات من التدخل المبكر.",
    features: [
      "نماذج تعلم آلي بدقة 85٪",
      "معالجة البيانات المسبقة (Kaggle)",
      "لوحات تحكم تفاعلية (Streamlit)",
      "تصور ديناميكي وتنبؤي"
    ],
    image_alt: "نموذج تعلم الآلة للإجهاد",
    image_src: "/services/Voxa(Stress)design1.svg"
  };

  // Security (Smart Vision System NHA-4-114)
  enDict.services.security = {
    title: "AI Smart Vision ",
    highlight: "Surveillance",
    description: "Transform raw CCTV streams into a proactive security command center with YOLOv8 person detection, weapon detection, and spatial analytics.",
    features: [
      "YOLOv8 Weapon & Person Detection",
      "ByteTrack Multi-Object Tracking",
      "Real-Time Next.js WebSockets",
      "Spatial & Loitering Heatmaps"
    ],
    image_alt: "Smart Vision System Dashboard",
    image_src: "/services/Voxa(Security)design1.svg"
  };

  arDict.services.security = {
    title: "المراقبة الذكية ",
    highlight: "بالذكاء الاصطناعي",
    description: "حوّل تدفقات كاميرات المراقبة إلى مركز قيادة أمني استباقي باستخدام اكتشاف الأشخاص والأسلحة والتحليلات المكانية.",
    features: [
      "اكتشاف الأسلحة والأشخاص (YOLOv8)",
      "تتبع الكائنات المتعددة (ByteTrack)",
      "تحديثات حية عبر WebSockets",
      "خرائط حرارية مكانية وسلوكية"
    ],
    image_alt: "لوحة تحكم نظام الرؤية الذكي",
    image_src: "/services/Voxa(Security)design1.svg"
  };

  fs.writeFileSync(enPath, JSON.stringify(enDict, null, 2));
  fs.writeFileSync(arPath, JSON.stringify(arDict, null, 2));
}

addProjectsAndUpdateDicts();
