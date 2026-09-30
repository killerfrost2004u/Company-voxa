export const projects = [
  {
    slug: "voxa-ats",
    title: {
      en: "AI-Driven Applicant Tracking System",
      ar: "نظام تتبع المتقدمين المدعوم بالذكاء الاصطناعي"
    },
    client: "Voxa",
    category: {
      en: "Enterprise Software",
      ar: "برمجيات مؤسسية"
    },
    problem: {
      en: "In high-volume recruitment, screening candidates—especially assessing soft skills and language proficiency—is a heavily manual, time-consuming, and highly subjective process. Recruitment teams often struggle with bottlenecks when manually reviewing audio or video submissions, leading to delayed communication with applicants and a fragmented hiring pipeline. There is a critical need for a system that can automate the initial heavy lifting of candidate evaluation while still keeping human recruiters in control of the final hiring decisions.",
      ar: "في عمليات التوظيف واسعة النطاق، يعتبر فرز المرشحين عملية يدوية تستغرق وقتاً طويلاً وتتسم بالذاتية. غالباً ما تواجه فرق التوظيف اختناقات عند مراجعة التقديمات الصوتية أو المرئية يدوياً، مما يؤدي إلى تأخير التواصل مع المتقدمين. هناك حاجة ماسة لنظام يمكنه أتمتة التقييم الأولي مع إبقاء مسؤولي التوظيف في موقع اتخاذ القرار النهائي."
    },
    solution: {
      en: "Voxa is an end-to-end Applicant Tracking System designed to revolutionize the HR screening process by injecting multimodal Artificial Intelligence directly into the evaluation pipeline. Instead of completely replacing recruiters, the system acts as an intelligent assistant, automatically analyzing candidate submissions and generating comprehensive intelligence reports to facilitate faster, data-driven, human-in-the-loop HR assessments.",
      ar: "النظام عبارة عن منصة متكاملة لتتبع المتقدمين مصممة لإحداث ثورة في عملية الفرز من خلال دمج الذكاء الاصطناعي متعدد الوسائط مباشرة في مسار التقييم. يعمل النظام كمساعد ذكي يقوم بتحليل تقديمات المرشحين تلقائياً وإنشاء تقارير استخباراتية شاملة لتسهيل تقييمات الموارد البشرية السريعة والقائمة على البيانات."
    },
    features: [
      {
        title: { en: "Multimodal AI Integration", ar: "دمج الذكاء الاصطناعي متعدد الوسائط" },
        description: { 
          en: "Integrates Google Gemini 2.5 Flash API to perform native multimodal audio analysis, automatically evaluating spoken responses and generating standardized English proficiency grading aligned with CEFR.",
          ar: "دمج واجهة Google Gemini 2.5 Flash لإجراء تحليل صوتي، وتقييم الاستجابات المنطوقة تلقائياً وإنشاء درجات كفاءة لغة إنجليزية موحدة تتماشى مع الإطار الأوروبي المشترك (CEFR)."
        }
      },
      {
        title: { en: "Robust Backend Architecture", ar: "بنية خلفية قوية" },
        description: {
          en: "Engineered using Python and Flask on a scalable N-Tier architecture, utilizing PostgreSQL hosted on Neon Cloud for highly available relational data management.",
          ar: "تمت الهندسة باستخدام Python و Flask على بنية N-Tier قابلة للتوسع، مع استخدام PostgreSQL المستضافة على Neon Cloud لإدارة البيانات العالية التوفر."
        }
      },
      {
        title: { en: "Modern Frontend Experience", ar: "تجربة واجهة مستخدم حديثة" },
        description: {
          en: "Built as a responsive Single Page Application (SPA) using React and Tailwind CSS, featuring a dedicated Admin Portal for recruiters.",
          ar: "تم البناء كتطبيق صفحة واحدة (SPA) متجاوب باستخدام React و Tailwind CSS، مع بوابة إدارة مخصصة لمسؤولي التوظيف."
        }
      },
      {
        title: { en: "Automated Communication Pipeline", ar: "مسار تواصل مؤتمت" },
        description: {
          en: "Features an automated pipeline powered by the Twilio API to dispatch formatted WhatsApp notifications to candidates regarding updates in real-time.",
          ar: "يتميز بمسار مؤتمت مدعوم بواجهة Twilio لإرسال إشعارات WhatsApp منسقة للمرشحين بشأن التحديثات في الوقت الفعلي."
        }
      },
      {
        title: { en: "Secure Cloud Storage", ar: "تخزين سحابي آمن" },
        description: {
          en: "Candidate media and application files are securely stored and managed using Cloudflare R2, integrated seamlessly via boto3.",
          ar: "يتم تخزين وسائط المرشحين وملفات التقديم وإدارتها بشكل آمن باستخدام Cloudflare R2، مدمجة بسلاسة عبر boto3."
        }
      }
    ],
    businessValue: {
      en: "By combining advanced generative AI with a seamless communication pipeline, this system drastically reduces the time-to-hire. It provides recruitment teams with immediate, objective baseline metrics on candidate proficiency, allowing them to focus their energy on interviewing only the most qualified talent while maintaining a premium, highly responsive candidate experience.",
      ar: "من خلال الجمع بين الذكاء الاصطناعي التوليدي ومسار التواصل السلس، يقلل هذا النظام بشكل كبير من وقت التوظيف. يوفر لفرق التوظيف مقاييس أساسية موضوعية فورية حول كفاءة المرشحين، مما يتيح لهم التركيز على مقابلة المواهب الأكثر تأهيلاً فقط مع الحفاظ على تجربة مرشح متميزة وسريعة الاستجابة."
    },
    image: "/services/Voxa(ATS)design1.svg"
  },
  {
    slug: "skillup-elearning",
    title: {
      en: "Skillup E-Learning Platform",
      ar: "منصة التعليم الإلكتروني Skillup"
    },
    client: "Skillup",
    category: {
      en: "Educational Technology",
      ar: "تكنولوجيا التعليم"
    },
    problem: {
      en: "Modern educational platforms increasingly rely on artificial intelligence to assist students, but this often requires sending sensitive user interactions to external cloud APIs. This reliance raises significant data privacy concerns, introduces potential latency, and creates a dependency on third-party services that can incur high ongoing costs. Furthermore, many e-learning environments lack secure, role-based access controls and struggle to provide responsive, bilingual support for a diverse student base without complex third-party integrations.",
      ar: "تعتمد المنصات التعليمية الحديثة بشكل متزايد على الذكاء الاصطناعي، مما يتطلب غالباً إرسال تفاعلات المستخدم الحساسة إلى واجهات سحابية خارجية. يثير هذا الاعتماد مخاوف كبيرة بشأن خصوصية البيانات، ويزيد من التكلفة. علاوة على ذلك، تفتقر العديد من بيئات التعلم الإلكتروني إلى ضوابط وصول آمنة، وتكافح لتقديم دعم ثنائي اللغة."
    },
    solution: {
      en: "The Skillup E-Learning Platform is a secure, interactive educational system designed from the ground up with a privacy-first approach. It provides a self-contained learning environment where students can interact with an intelligent embedded assistant that operates entirely locally, ensuring that no user data is ever sent to external servers.",
      ar: "منصة التعليم الإلكتروني Skillup هي نظام تعليمي آمن وتفاعلي تم تصميمه بنهج يركز على الخصوصية أولاً. توفر بيئة تعليمية متكاملة حيث يمكن للطلاب التفاعل مع مساعد ذكي مدمج يعمل محلياً بالكامل، مما يضمن عدم إرسال أي بيانات مستخدم إلى خوادم خارجية."
    },
    features: [
      {
        title: { en: "Privacy-First Local AI", ar: "ذكاء اصطناعي محلي بخصوصية تامة" },
        description: { 
          en: "The embedded learning assistant is powered by local Large Language Models (LLMs) via Ollama, guaranteeing data privacy and real-time bilingual support without external API dependencies.",
          ar: "المساعد التعليمي المدمج مدعوم بنماذج لغوية كبيرة محلية (LLMs) عبر Ollama، مما يضمن خصوصية البيانات ودعم ثنائي اللغة في الوقت الفعلي."
        }
      },
      {
        title: { en: "Secure Backend Architecture", ar: "بنية خلفية آمنة" },
        description: {
          en: "Engineered with Flask and SQL, integrating secure JSON Web Token (JWT) authentication to enforce role-based access.",
          ar: "تمت الهندسة باستخدام Flask و SQL، مع دمج مصادقة JWT الآمنة لفرض الوصول المستند إلى الأدوار."
        }
      },
      {
        title: { en: "Responsive User Interface", ar: "واجهة مستخدم متجاوبة" },
        description: {
          en: "Highly accessible and responsive frontend built utilizing HTML5, CSS3, and Bootstrap.",
          ar: "واجهة أمامية متجاوبة للغاية تم بناؤها باستخدام HTML5 و CSS3 و Bootstrap."
        }
      },
      {
        title: { en: "Dynamic Data Tracking", ar: "تتبع ديناميكي للبيانات" },
        description: {
          en: "Features dynamic progress dashboards powered by a hybrid SQL and JSON data storage approach to track learning journeys.",
          ar: "تتميز بلوحات معلومات تقدم ديناميكية مدعومة بنهج تخزين بيانات هجين (SQL و JSON) لتتبع رحلات التعلم."
        }
      }
    ],
    businessValue: {
      en: "By leveraging local LLMs, this platform entirely eliminates recurring cloud API costs while completely safeguarding student data privacy. The secure backend ensures that premium educational content is protected through strict role-based access, while the responsive dashboards and bilingual AI assistant provide an engaging, accessible, and personalized learning experience across all devices.",
      ar: "من خلال الاستفادة من النماذج اللغوية المحلية، تقضي هذه المنصة تماماً على تكاليف واجهات برمجة التطبيقات السحابية المتكررة مع حماية خصوصية بيانات الطلاب. تضمن الواجهة الخلفية الآمنة حماية المحتوى التعليمي عبر وصول صارم قائم على الأدوار."
    },
    image: "/services/Voxa(E-learning)design1.svg"
  },
  {
    slug: "tennis-match-analyzer",
    title: {
      en: "Tennis Match Analyzer",
      ar: "محلل مباريات التنس"
    },
    client: "Internal Product / Open Source",
    category: {
      en: "Sports Analytics & Computer Vision",
      ar: "التحليلات الرياضية والرؤية الحاسوبية"
    },
    problem: {
      en: "Professional-level sports analytics typically require expensive, proprietary multi-camera setups and physical court sensors. For amateur players, coaches, and local clubs, extracting actionable performance data—like ball trajectories, player positioning, and stroke statistics—from standard video footage is an incredibly manual and error-prone process. There is a strong need for a software-only solution that can democratize sports analytics by turning ordinary video footage into deep tactical insights without requiring specialized hardware.",
      ar: "تتطلب التحليلات الرياضية الاحترافية عادةً إعدادات كاميرات متعددة باهظة الثمن وأجهزة استشعار مادية في الملعب. بالنسبة للاعبين الهواة والمدربين، يعد استخراج بيانات الأداء القابلة للتنفيذ من لقطات الفيديو القياسية عملية يدوية وعرضة للخطأ بشكل لا يصدق. هناك حاجة قوية لحل برمجي فقط يمكنه إضفاء الطابع الديمقراطي على التحليلات الرياضية."
    },
    solution: {
      en: "The Tennis Match Analyzer is an advanced, AI-driven sports analytics platform that transforms standard tennis match videos into professional-grade performance data. By combining high-speed object tracking with deep learning-based action recognition, the platform provides coaches and players with an interactive dashboard to visualize their game mechanics and make data-driven improvements.",
      ar: "محلل مباريات التنس هو منصة تحليلات رياضية متقدمة تعتمد على الذكاء الاصطناعي تحول مقاطع فيديو مباريات التنس القياسية إلى بيانات أداء احترافية. من خلال الجمع بين التتبع عالي السرعة للكائنات والتعرف على الإجراءات المستند إلى التعلم العميق، توفر المنصة لوحة تحكم تفاعلية لتصور آليات اللعب وإجراء تحسينات."
    },
    features: [
      {
        title: { en: "Real-Time Computer Vision", ar: "رؤية حاسوبية في الوقت الفعلي" },
        description: { 
          en: "Engineered utilizing YOLO and object trackers to achieve precise, real-time detection of both players and the fast-moving tennis ball.",
          ar: "تمت الهندسة باستخدام YOLO ومتتبعات الكائنات لتحقيق اكتشاف دقيق في الوقت الفعلي لكل من اللاعبين وكرة التنس سريعة الحركة."
        }
      },
      {
        title: { en: "Advanced Spatial Analysis", ar: "تحليل مكاني متقدم" },
        description: {
          en: "Implements homography computation to map 2D video perspective onto a top-down court plane for spatial analysis of player movement.",
          ar: "ينفذ حسابات الهوموغرافيا (Homography) لرسم منظور الفيديو ثنائي الأبعاد على مستوى ملعب من أعلى لأسفل للتحليل المكاني لحركة اللاعب."
        }
      },
      {
        title: { en: "Deep Learning Action Recognition", ar: "التعرف على الإجراءات بالتعلم العميق" },
        description: {
          en: "Core intelligence developed using PyTorch and ResNet50 architecture, specifically trained for classifying various tennis strokes.",
          ar: "تم تطوير الذكاء الأساسي باستخدام بنية PyTorch و ResNet50، المدربة خصيصاً لتصنيف ضربات التنس المختلفة."
        }
      },
      {
        title: { en: "Interactive Dashboard Deployment", ar: "نشر لوحة تحكم تفاعلية" },
        description: {
          en: "AI pipeline packaged via high-performance FastAPI service and exposed through an interactive Streamlit dashboard supporting video uploads and YouTube URLs.",
          ar: "مسار الذكاء الاصطناعي تم تعبئته عبر خدمة FastAPI عالية الأداء وتقديمه من خلال لوحة تحكم Streamlit تفاعلية تدعم رفع الفيديوهات وروابط YouTube."
        }
      }
    ],
    businessValue: {
      en: "This system democratizes elite sports analytics, allowing anyone with a smartphone camera or a YouTube link to gain deep insights into their tennis technique. By automating the extraction of spatial and stroke data, it saves coaches hours of manual film review and provides players with immediate, visual feedback on their hit distribution and accuracy, enabling highly targeted and efficient training sessions.",
      ar: "يضفي هذا النظام الطابع الديمقراطي على التحليلات الرياضية النخبوية، مما يسمح لأي شخص لديه كاميرا هاتف ذكي أو رابط YouTube باكتساب رؤى عميقة حول تقنية التنس الخاصة به. من خلال أتمتة استخراج البيانات المكانية وضربات الكرة، فإنه يوفر للمدربين ساعات من مراجعة الأفلام اليدوية."
    },
    image: "/services/Voxa(TennisAnalyze)design1.svg"
  },
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
      en: "Smart Vision System",
      ar: "نظام الرؤية الذكي"
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
];
