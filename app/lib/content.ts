export type Lang = "en" | "ar";

export const EMAIL = "babaahmed3409@gmail.com";
export const PHONE = "+222 34 09 21 06";
export const LINKEDIN = "https://www.linkedin.com/in/babaahmedelbekay/";
export const GITHUB = "https://github.com/TheRootBaba";

export const CERT_META: { url: string; brands: string[] }[] = [
  { url: "https://coursera.org/share/8c749e56597ec054950dd2eea3b81a11", brands: ["microsoft", "coursera"] },
  { url: "https://tinyurl.com/ys52za9x", brands: ["oracle"] },
  { url: "https://tinyurl.com/kaunkfhr", brands: ["oracle"] },
  { url: "https://www.credly.com/badges/0cabc6c2-af82-4bed-bbb7-6bf75c502465", brands: ["fortinet"] },
  { url: "https://www.hackerrank.com/certificates/fda18b2ff3f9", brands: ["hackerrank"] },
  { url: "", brands: ["cisco"] },
  { url: "", brands: [] },
  { url: "", brands: ["coursera"] },
];

export const TOOLS = ["Python", "Linux", "Nmap", "GNS3", "FortiGate", "AWS", "Azure", "CloudTrail", "Security Hub", "Oracle Cloud", "Docker", "Wazuh", "Prometheus", "WireGuard", "OSPF", "FastAPI"];

type ProjText = { cat: string; blurb: string };
export type Content = {
  dir: "ltr" | "rtl"; locale: string;
  nav: { work: string; about: string; journey: string; credentials: string; talk: string; contact: string; menu: string; closeMenu: string; cmd: string };
  pre: { words: string[]; label: string };
  name: [string, string];
  hero: { avail: string; role: [string, string]; lead: [string, string, string]; projects: string; resume: string; stats: [string, string][]; timeLabel: string };
  work: { idx: string; title: [string, string]; desc: string; flagship: string; explore: string };
  proj: Record<string, ProjText>;
  about: { idx: string; text: string; skills: [string, string, string][]; langLabel: string; langs: [string, string][] };
  journey: { idx: string; title: [string, string]; items: { meta: string; title: string; desc: string; now?: boolean }[] };
  creds: { idx: string; title: [string, string]; desc: string; items: [string, string, string][] };
  contact: { idx: string; title: [string, string]; lead: string; email: string; phone: string; linkedin: string; emailL: string; phoneL: string; linkedinL: string; github: string; top: string; city: string };
};

export const C: Record<Lang, Content> = {
  en: {
    dir: "ltr", locale: "en-GB",
    nav: { work: "Work", about: "About", journey: "Journey", credentials: "Credentials", talk: "Let’s talk", contact: "Contact", menu: "Open menu", closeMenu: "Close menu", cmd: "Open command line" },
    pre: { words: ["Hello", "Bonjour", "مرحبا", "Welcome"], label: "Baba Ahmed El Bekay — Portfolio 2026" },
    name: ["Baba Ahmed", "El Bekay"],
    hero: { avail: "Open to remote roles & internships", role: ["Network security ", "student & builder."], lead: ["I study Network Security at MIFITT Institute and build projects with Python, Linux, GNS3, AWS, Azure and Oracle Cloud Infrastructure. Based in ", "Nouakchott", ", open to remote work."], projects: "View projects", resume: "Résumé", stats: [["06", "Documented projects"], ["08", "Certifications"], ["03", "Languages spoken"]], timeLabel: "Nouakchott, local time" },
    work: { idx: "01 — Selected work", title: ["Projects & ", "labs."], desc: "Each project has a case study covering architecture, engineering decisions, validation, genuine evidence and documented limitations.", flagship: "Flagship", explore: "Explore case study" },
    proj: {
      aegissoc: { cat: "Security Operations Platform", blurb: "A local-first SOC platform for collecting security telemetry, investigating alerts, enriching indicators and governing response actions." },
      "netsec-agent": { cat: "Network Security Tool", blurb: "A Python tool for authorized network assessments. It uses Nmap for discovery and generates explanations of scan results." },
      "netops-sentinel": { cat: "Network Operations Lab", blurb: "A repeatable GNS3 lab that validates device inventories, checks endpoint reachability and records structured JSON evidence." },
      "secure-enterprise-network": { cat: "Enterprise Network Design", blurb: "An enterprise network design exercise covering VLAN segmentation, VLSM addressing, routing, redundancy and access control." },
      cloudshield: { cat: "Cloud Security Command Center", blurb: "A local-first AWS and Azure security lab for explainable detections, incident investigation, tenant-scoped evidence and governed response workflows." },
      nexuscloud: { cat: "Infrastructure & Observability Lab", blurb: "A local-first infrastructure lab combining isolated Docker services, Prometheus/Grafana monitoring, alert testing and a WireGuard site-to-site routing simulation." },
    },
    about: { idx: "02 — Profile", text: "I study network security and build practical experience through labs and personal projects. I document my work clearly, test every change, and keep the evidence close to the implementation. Security systems that can be inspected.", skills: [["01 / Networking", "Network engineering", "TCP/IP, IPv4, VLSM, VLANs, OSPF, ACLs, DNS, DHCP and NAT."], ["02 / Security", "Security operations", "Nmap, FortiGate, VPN, access controls and authorized network assessments."], ["03 / Infrastructure", "Cloud & systems", "AWS, Azure, Oracle Cloud Infrastructure, IAM, Linux, Bash and cloud infrastructure fundamentals."], ["04 / Development", "Automation & code", "Python, SQL, Git, GNS3, Streamlit, JSON and API fundamentals."]], langLabel: "Languages", langs: [["Arabic", "Native"], ["English", "C1 · Advanced"], ["French", "Advanced"]] },
    journey: { idx: "03 — Education", title: ["The ", "path."], items: [{ meta: "2025 — Present · Current studies", title: "BTS in Network Security", desc: "MIFITT Institute. Coursework in networking, infrastructure and security fundamentals, alongside practical labs and personal projects.", now: true }, { meta: "2023 — 2024 · Completed", title: "Baccalauréat in Science", desc: "Lycée d’Excellence 2. Science studies, including mathematics and core scientific subjects." }] },
    creds: { idx: "04 — Certifications", title: ["Certif", "icates."], desc: "Training in cybersecurity, cloud infrastructure, programming and Linux.", items: [["Microsoft Cybersecurity Analyst Professional Certificate", "Microsoft · Coursera", "Professional certificate"], ["Oracle Cloud Infrastructure Architect Associate", "Oracle", "Cloud architecture"], ["Agentic AI Foundations Associate", "Oracle", "AI foundations"], ["NSE 3: FortiGate Operator", "Fortinet", "Network security"], ["SQL (Intermediate)", "HackerRank", "Technical skill"], ["Python Essentials 1", "Cisco Networking Academy", "Programming"], ["LFS101: Introduction to Linux", "The Linux Foundation", "Systems"], ["Cyber Security: Governance, Risk & Compliance", "Macquarie University · Coursera", "Governance & risk"]] },
    contact: { idx: "05 — Contact", title: ["Have a role", "in mind?"], lead: "I’m open to remote internships and entry-level roles in cybersecurity, cloud security or IT infrastructure.", email: "Write me", phone: "Call me", linkedin: "Connect professionally", emailL: "EMAIL", phoneL: "PHONE", linkedinL: "LINKEDIN", github: "GitHub", top: "Back to top ↑", city: "Nouakchott" },
  },
  ar: {
    dir: "rtl", locale: "ar-u-nu-arab",
    nav: { work: "المشاريع", about: "نبذة عني", journey: "المسار", credentials: "الشهادات", talk: "تواصل معي", contact: "التواصل", menu: "فتح القائمة", closeMenu: "إغلاق القائمة", cmd: "فتح سطر الأوامر" },
    pre: { words: ["مرحبا", "Hello", "Bonjour", "أهلاً بك"], label: "بابا أحمد البيكاي — المحفظة المهنية ٢٠٢٦" },
    name: ["بابا أحمد", "البيكاي"],
    hero: { avail: "متاح للفرص عن بُعد والتدريب", role: ["طالب أمن شبكات ", "ومطوّر مشاريع تقنية."], lead: ["أدرس أمن الشبكات في معهد MIFITT وأطوّر مشاريع عملية باستخدام Python وLinux وGNS3 وAWS وAzure وOracle Cloud Infrastructure. أقيم في ", "نواكشوط", " وأتقبّل العمل عن بُعد."], projects: "استكشف المشاريع", resume: "السيرة الذاتية", stats: [["٠٦", "مشاريع موثّقة"], ["٠٨", "شهادات مهنية"], ["٠٣", "لغات"]], timeLabel: "نواكشوط، الوقت المحلي" },
    work: { idx: "٠١ — نماذج من الأعمال", title: ["مشاريع ", "ومختبرات."], desc: "لكل مشروع دراسة حالة مستقلة تشمل البنية والقرارات التقنية والتحقق والأدلة الفعلية وحدود التنفيذ الموثقة.", flagship: "مشروع رئيسي", explore: "اقرأ دراسة الحالة (بالإنجليزية)" },
    proj: {
      aegissoc: { cat: "منصة عمليات الأمن السيبراني", blurb: "منصة محلية لجمع بيانات الأمن، والتحقيق في التنبيهات، وإثراء المؤشرات، وتنظيم إجراءات الاستجابة." },
      "netsec-agent": { cat: "أداة لأمن الشبكات", blurb: "أداة Python لتقييم الشبكات المصرّح به، تستخدم Nmap للاستكشاف وتشرح نتائج الفحص بطريقة واضحة." },
      "netops-sentinel": { cat: "مختبر تشغيل الشبكات", blurb: "مختبر GNS3 قابل لإعادة التنفيذ للتحقق من الأجهزة والاتصال وتسجيل نتائج الفحص بصيغة JSON." },
      "secure-enterprise-network": { cat: "تصميم شبكة مؤسسية", blurb: "تصميم شبكة مؤسسية يشمل تقسيم VLAN وتخطيط عناوين VLSM والتوجيه والتكرار والتحكم في الوصول." },
      cloudshield: { cat: "مركز أمن الحوسبة السحابية", blurb: "مختبر أمني محلي لـ AWS وAzure يشمل اكتشافات قابلة للتفسير والتحقيق في الحوادث وحفظ الأدلة لكل مساحة عمل وتنظيم إجراءات الاستجابة." },
      nexuscloud: { cat: "مختبر البنية التحتية والمراقبة", blurb: "مختبر محلي يجمع عزل الخدمات عبر Docker ومراقبتها باستخدام Prometheus وGrafana واختبار التنبيهات ومحاكاة التوجيه عبر WireGuard." },
    },
    about: { idx: "٠٢ — الملف الشخصي", text: "أدرس أمن الشبكات وأبني خبرة عملية من خلال المختبرات والمشاريع الشخصية. أوثّق عملي بوضوح، وأختبر كل تغيير، وأُبقي الأدلة قريبة من التنفيذ. أنظمة أمنية يمكن فحصها والتحقق منها.", skills: [["٠١ / الشبكات", "هندسة الشبكات", "TCP/IP وIPv4 وVLSM وVLAN وOSPF وACL وDNS وDHCP وNAT."], ["٠٢ / الأمن", "العمليات الأمنية", "Nmap وFortiGate وVPN وضوابط الوصول وتقييم الشبكات المصرّح به."], ["٠٣ / البنية التحتية", "الحوسبة السحابية والأنظمة", "AWS وAzure وOracle Cloud Infrastructure وIAM وLinux وBash وأساسيات البنية السحابية."], ["٠٤ / التطوير", "الأتمتة والبرمجة", "Python وSQL وGit وGNS3 وStreamlit وJSON وأساسيات واجهات API."]], langLabel: "اللغات", langs: [["العربية", "اللغة الأم"], ["الإنجليزية", "C1 متقدم"], ["الفرنسية", "متقدم"]] },
    journey: { idx: "٠٣ — التعليم", title: ["المسار ", "الدراسي."], items: [{ meta: "٢٠٢٥ — الآن · الدراسة الحالية", title: "شهادة التقني السامي في أمن الشبكات", desc: "معهد MIFITT. مواد في الشبكات والبنية التحتية وأساسيات الأمن، إلى جانب مختبرات عملية ومشاريع شخصية.", now: true }, { meta: "٢٠٢٣ — ٢٠٢٤ · مكتمل", title: "شهادة البكالوريا في العلوم", desc: "ثانوية التميز 2. دراسة العلوم، بما في ذلك الرياضيات والمواد العلمية الأساسية." }] },
    creds: { idx: "٠٤ — الشهادات", title: ["الشهادات ", "المهنية."], desc: "شهادات ودورات في الأمن السيبراني والبنية السحابية والبرمجة وLinux.", items: [["شهادة محلل الأمن السيبراني المهنية", "Microsoft · Coursera", "شهادة مهنية"], ["مهندس مشارك في هندسة Oracle Cloud Infrastructure", "Oracle", "هندسة الحوسبة السحابية"], ["مشارك في أساسيات الذكاء الاصطناعي الوكيلي", "Oracle", "أساسيات الذكاء الاصطناعي"], ["مشغّل FortiGate — المستوى الثالث", "Fortinet", "أمن الشبكات"], ["SQL — المستوى المتوسط", "HackerRank", "مهارة تقنية"], ["أساسيات Python 1", "Cisco Networking Academy", "البرمجة"], ["مقدمة إلى Linux — LFS101", "The Linux Foundation", "الأنظمة"], ["الأمن السيبراني: الحوكمة والمخاطر والامتثال", "Macquarie University · Coursera", "الحوكمة والمخاطر"]] },
    contact: { idx: "٠٥ — التواصل", title: ["هل لديك فرصة", "مناسبة؟"], lead: "أرحّب بفرص التدريب عن بُعد والوظائف المبتدئة في الأمن السيبراني أو أمن الحوسبة السحابية أو البنية التحتية لتقنية المعلومات.", email: "راسلني", phone: "اتصل بي", linkedin: "تواصل مهني", emailL: "البريد الإلكتروني", phoneL: "الهاتف", linkedinL: "لينكدإن", github: "GitHub", top: "العودة للأعلى ↑", city: "نواكشوط" },
  },
};
