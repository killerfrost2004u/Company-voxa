const fs = require('fs');

function updateSecurity() {
  const enPath = './src/dictionaries/en.json';
  const arPath = './src/dictionaries/ar.json';

  const enDict = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const arDict = JSON.parse(fs.readFileSync(arPath, 'utf8'));

  enDict.services.security = {
    title: "Robust ",
    highlight: "Web Security",
    description: "Protect your business and customer data with enterprise-grade security. We implement advanced firewalls, continuous monitoring, and proactive threat prevention.",
    features: [
      "Advanced DDoS Protection",
      "Vulnerability Assessments",
      "End-to-End Encryption",
      "Automated Daily Backups"
    ],
    image_alt: "Security Network",
    image_src: "/services/Voxa(Security)design1.svg"
  };

  arDict.services.security = {
    title: "أمان ",
    highlight: "الويب المتقدم",
    description: "قم بحماية أعمالك وبيانات عملائك بأمان على مستوى المؤسسات. نحن ننفذ جدران حماية متقدمة ومراقبة مستمرة ومنع استباقي للتهديدات.",
    features: [
      "حماية متقدمة من هجمات DDoS",
      "تقييم الثغرات الأمنية",
      "تشفير شامل للبيانات",
      "نسخ احتياطي يومي تلقائي"
    ],
    image_alt: "شبكة الأمان",
    image_src: "/services/Voxa(Security)design1.svg"
  };

  // Also update HomeServicesSection in case I used the string there
  
  fs.writeFileSync(enPath, JSON.stringify(enDict, null, 2));
  fs.writeFileSync(arPath, JSON.stringify(arDict, null, 2));
}

updateSecurity();
