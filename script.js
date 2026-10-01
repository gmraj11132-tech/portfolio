/* ============================================
   PORTFOLIO — Interactive JavaScript
   Particles, Typewriter, Scroll Reveals,
   Dark Mode, Ripple Effects, Counter Animation
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // ─── High Performance Zero-Lag Environment ───
    // Dynamic canvas loop removed in favor of hardware-accelerated CSS mesh (120Hz smooth)


    // ─── Typewriter Effect ───
    const typewriterEl = document.getElementById('typewriter');
    const roles = [
        'B.Tech CSE Student (7th Sem)',
        'AI/ML & Python Developer',
        'Full Stack Web Developer',
        'Graduate Engineer Trainee Candidate',
        'Data Analytics & Automation Enthusiast'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeWrite() {
        const currentRole = roles[roleIndex];

        if (!isDeleting) {
            typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentRole.length) {
                isDeleting = true;
                typeSpeed = 2000; // pause before deleting
            } else {
                typeSpeed = 80 + Math.random() * 40;
            }
        } else {
            typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 400; // pause before typing next
            }
        }

        setTimeout(typeWrite, typeSpeed);
    }
    typeWrite();

    // ─── Navbar Scroll Effect ───
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero');

    function handleNavScroll() {
        const scrollY = window.scrollY;

        // Add scrolled class
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            const height = section.offsetHeight;
            if (scrollY >= top && scrollY < top + height) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // ─── Mobile Menu ───
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('open');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('open');
        });
    });

    // ─── Theme Toggle ───
    const themeToggle = document.getElementById('themeToggle');
    const toggleIcon = themeToggle.querySelector('.toggle-icon');
    const html = document.documentElement;

    // Load saved theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    toggleIcon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        toggleIcon.textContent = next === 'dark' ? '🌙' : '☀️';
        localStorage.setItem('portfolio-theme', next);

        // Animate icon
        toggleIcon.style.transform = 'rotate(360deg) scale(1.2)';
        setTimeout(() => {
            toggleIcon.style.transform = '';
        }, 500);
    });

    // ─── Scroll Reveal Animation ───
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ─── Counter Animation ───
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                animateCounter(el, target);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(el, target) {
        let current = 0;
        const increment = target / 40;
        const duration = 1500;
        const stepTime = duration / 40;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current);
        }, stepTime);
    }

    // ─── Ripple Effect on Buttons ───
    document.querySelectorAll('.ripple-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ─── Smooth Scroll for Nav Links ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#' || targetId.length <= 1) return;
            try {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    if (hamburger && hamburger.classList.contains('active')) {
                        hamburger.classList.remove('active');
                    }
                    if (navLinksContainer && navLinksContainer.classList.contains('open')) {
                        navLinksContainer.classList.remove('open');
                    }
                    const offset = (window.innerWidth <= 768) ? 68 : 80;
                    const top = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({
                        top: Math.max(0, top),
                        behavior: 'smooth'
                    });
                }
            } catch (err) {}
        });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinksContainer && navLinksContainer.classList.contains('open')) {
            if (!navLinksContainer.contains(e.target) && hamburger && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinksContainer.classList.remove('open');
            }
        }
    });

    // ─── Tilt Effect on Glass Cards (Desktop Only) ───
    if (window.matchMedia('(min-width: 769px)').matches) {
        document.querySelectorAll('.glass-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / centerY * -3;
                const rotateY = (x - centerX) / centerX * 3;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

                // Glare effect
                const glareX = (x / rect.width) * 100;
                const glareY = (y / rect.height) * 100;
                card.style.background = `
                    radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.06) 0%, transparent 50%),
                    var(--card-bg)
                `;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.background = '';
            });
        });
    }

    // ─── Production Contact Form Backend (Direct to aryanjaiswal11132@gmail.com) ───
    const contactForm = document.getElementById('contactForm');
    const formStatusMsg = document.getElementById('formStatusMsg');
    const formSubmitBtn = document.getElementById('formSubmitBtn') || (contactForm ? contactForm.querySelector('.form-submit') : null);

    function showFormStatus(type, msg) {
        if (!formStatusMsg) return;
        formStatusMsg.className = `form-status-msg ${type}`;
        formStatusMsg.innerHTML = msg;
        formStatusMsg.style.display = 'block';

        setTimeout(() => {
            if (formStatusMsg) formStatusMsg.style.display = 'none';
        }, 9000);
    }

    if (contactForm && formSubmitBtn) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Anti-spam honeypot check
            const honeyField = contactForm.querySelector('input[name="_honey"]');
            if (honeyField && honeyField.value.trim() !== '') {
                // Silently drop bot submission
                return;
            }

            const nameInput = document.getElementById('formName');
            const emailInput = document.getElementById('formEmail');
            const subjectInput = document.getElementById('formSubject');
            const messageInput = document.getElementById('formMessage');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const subject = subjectInput ? subjectInput.value.trim() : 'Portfolio Inquiry';
            const message = messageInput ? messageInput.value.trim() : '';

            // Input Validation & Security Sanitization
            if (!name || !email || !message) {
                showFormStatus('error', '⚠️ Please complete Name, Email, and Message.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormStatus('error', '⚠️ Please enter a valid email address.');
                return;
            }

            // UI: Loading State
            const originalBtnHTML = formSubmitBtn.innerHTML;
            formSubmitBtn.disabled = true;
            formSubmitBtn.innerHTML = `
                <span class="btn-spinner"></span>
                <span class="btn-text">Transmitting to Gmail...</span>
            `;

            // Prepare Payload for Direct Delivery
            const payload = {
                name: name,
                email: email,
                subject: `Portfolio Inquiry: ${subject}`,
                message: message,
                _subject: `[Aryan Portfolio] ${subject} from ${name}`,
                _template: 'table',
                _captcha: 'false',
                _replyto: email
            };

            try {
                const response = await fetch('https://formsubmit.co/ajax/aryanjaiswal11132@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                const data = await response.json();

                if (response.ok && (data.success === 'true' || data.success === true || data.message)) {
                    // Success feedback
                    showFormStatus('success', '🎉 Message delivered directly to Aryan Raj (aryanjaiswal11132@gmail.com)! Expect a response within 24 hours.');
                    formSubmitBtn.innerHTML = `
                        <span class="btn-icon">✓</span>
                        <span class="btn-text">Delivered to Gmail</span>
                    `;
                    formSubmitBtn.style.background = 'linear-gradient(180deg, rgba(0, 245, 196, 0.4) 0%, rgba(0, 245, 196, 0.15) 100%), rgba(14, 30, 28, 0.9)';
                    contactForm.reset();

                    setTimeout(() => {
                        formSubmitBtn.innerHTML = originalBtnHTML;
                        formSubmitBtn.style.background = '';
                        formSubmitBtn.disabled = false;
                    }, 5000);
                } else {
                    throw new Error(data.message || 'Transmission response not successful');
                }
            } catch (err) {
                console.warn('FormSubmit AJAX dispatch notice, triggering mailto fallback:', err);
                
                // Fallback to native mailto direct to aryanjaiswal11132@gmail.com
                const mailtoUrl = `mailto:aryanjaiswal11132@gmail.com?subject=${encodeURIComponent('[Portfolio] ' + subject)}&body=${encodeURIComponent('From: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;
                window.location.href = mailtoUrl;

                showFormStatus('info', 'ℹ️ Direct Gmail client triggered. If your mail app didn\'t open, email Aryan directly at <a href="mailto:aryanjaiswal11132@gmail.com" style="color:#00f5c4;text-decoration:underline;">aryanjaiswal11132@gmail.com</a>.');

                formSubmitBtn.innerHTML = originalBtnHTML;
                formSubmitBtn.disabled = false;
            }
        });
    }

    // ─── Section Header Stability (Parallax disabled to keep headers static & crisp) ───
    // Keeping section titles static prevents mobile bouncing and jitter ("uper nich ho rha")

    // ─── CERTIFICATE FILTERING & INTERACTIVE MODAL ───
    const filterBtns = document.querySelectorAll('.filter-btn');
    const credCards = document.querySelectorAll('.credential-card');
    const certModal = document.getElementById('certModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    // Filter Logic - Clean, instant, jump-free across all devices
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter') || 'all';

            credCards.forEach(card => {
                const category = card.getAttribute('data-category') || '';
                if (filter === 'all' || category.includes(filter)) {
                    card.style.display = '';
                    card.style.opacity = '1';
                    card.style.transform = 'none';
                    card.style.visibility = 'visible';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                    card.style.visibility = 'hidden';
                }
            });
        });
    });

    // Detailed Certificate Case Study Data (Recruiter Ready - 12 Credentials)
    const certsData = {
        iitbhu: {
            title: "Artificial Intelligence & Machine Learning Internship",
            issuer: "Eisystems Services in collaboration with Technex'25 (IIT BHU Varanasi) & Robokwik",
            date: "24 May 2026 – 19 July 2026 (8 Weeks)",
            certId: "EIS/THX/25SP-0380",
            aicteId: "CORPORATE65a015a925f071704990121",
            image: "cert_iitbhu.jpg",
            category: "Industry Internship (AI/ML)",
            summary: "Completed a comprehensive 8-week artificial intelligence & machine learning internship certified by Technex'25, the annual techno-management festival of Indian Institute of Technology (BHU), Varanasi.",
            learnings: [
                "Mastered Supervised & Unsupervised Learning algorithms (Linear & Logistic Regression, Decision Trees, Random Forests, SVMs, Clustering).",
                "Built end-to-end Python ML data processing pipelines using Pandas, NumPy, Scikit-Learn, and Matplotlib.",
                "Conducted hyperparameter tuning, model performance validation (Precision, Recall, ROC-AUC), and feature importance scoring.",
                "Authored industry-standard technical progress & model diagnostic evaluation reports under corporate mentorship."
            ],
            skills: ["Python", "Machine Learning", "Scikit-Learn", "Data Preprocessing", "IIT BHU Technex", "AI Architecture"],
            verifiable: "Officially certified by Eisystems Services & Technex'25 IIT BHU (Credential ID: EIS/THX/25SP-0380)."
        },
        ibm: {
            title: "Python 101 for Data Science",
            issuer: "Cognitive Class (Powered by IBM Developer Skills Network)",
            date: "Issued: May 29, 2025",
            certId: "PY0101EN",
            aicteId: "Validation ID: 0e3f744c25ce424f8e4f0103c5f966f4",
            image: "cert_ibm_python.jpg",
            category: "IBM Professional Certification (Data Science)",
            summary: "Successfully completed IBM's specialized Python 101 for Data Science course via Cognitive Class. Demonstrated core expertise in Python fundamentals, data structures, Pandas dataframes, NumPy arrays, and RESTful API data retrieval.",
            learnings: [
                "Mastered Python 3 data structures (Lists, Tuples, Dictionaries, Sets) and functional programming constructs.",
                "Utilized Pandas and NumPy libraries for exploratory data analysis, tabular filtering, and statistical aggregations.",
                "Extracted web data via HTTP requests and JSON API payloads to construct automated data pipelines.",
                "Verified via IBM Cognitive Class authentic credential verification URL and embedded QR verification code."
            ],
            skills: ["Python 3", "IBM Data Science", "Pandas", "NumPy", "API Integration", "Data Analysis"],
            verifiable: "Authenticity validated at https://courses.cognitiveclass.ai/certificates/0e3f744c25ce424f8e4f0103c5f966f4"
        },
        tata: {
            title: "Data Visualisation: Empowering Business with Effective Insights",
            issuer: "TATA Group (via Forage)",
            date: "Issued: May 19th, 2025",
            certId: "pvESCMLSam63WB6WH",
            aicteId: "User Verification Code: vBJu4tqQF4iz9aMfJ",
            image: "cert_tata_forage.jpg",
            category: "TATA Corporate Virtual Experience",
            summary: "Completed practical virtual job simulation for TATA Group leadership, transforming raw enterprise data into actionable visual insights for C-suite executive decision-making.",
            learnings: [
                "Framed complex business scenarios and identified strategic metrics for executive decision-makers.",
                "Evaluated visual design principles to select optimal charts, graphs, and interactive dashboards.",
                "Constructed high-impact data visualisations communicating key trends, anomalies, and forecasts.",
                "Delivered concise verbal & visual data presentations for corporate stakeholders."
            ],
            skills: ["Data Visualisation", "TATA Analytics", "Executive Storytelling", "Business Intelligence", "Dashboard Design"],
            verifiable: "Verified by Tom Brunskill, CEO & Co-Founder of Forage (Enrolment Code: pvESCMLSam63WB6WH)."
        },
        nventerprises: {
            title: "ML Craft With Python Internship",
            issuer: "NV Enterprises in collaboration with Techno India University",
            date: "10th June 2025 to 23rd July 2025",
            certId: "NV/24/0218",
            aicteId: "Student Reg No: 23033440027",
            image: "cert_nv_enterprises.jpg",
            category: "ML Engineering Internship",
            summary: "Completed practical industrial training on Machine Learning Craft With Python. Built custom predictive models, data analysis scripts, and feature selection routines under direct corporate supervision at NV Enterprises.",
            learnings: [
                "Engineered Python scripts for automated feature scaling, missing value imputation, and out-of-fold cross validation.",
                "Trained regression & classification models for tabular datasets with high prediction reliability.",
                "Generated visual exploratory data analysis (EDA) plots to interpret complex data trends.",
                "Delivered final internship project defense evaluated and signed by Director, NV Enterprises."
            ],
            skills: ["Python ML", "Data Cleaning", "Scikit-Learn", "Exploratory Data Analysis", "Feature Engineering"],
            verifiable: "Officially signed Certificate ID: NV/24/0218 issued by Director, NV Enterprises."
        },
        internpe: {
            title: "AI & Machine Learning Engineering Internship",
            issuer: "InternPe (ISO 9001:2015 Certified, MSME & AICTE Approved)",
            date: "12-May-2025 to 08-June-2025",
            certId: "CID :IPI#53490",
            aicteId: "AICTE & MSME Affiliated",
            image: "cert_internpe.jpg",
            category: "AI/ML Industry Internship",
            summary: "Successfully served as AI/ML Intern at InternPe, contributing to real-world machine learning tasks, model accuracy optimization, and automated data processing.",
            learnings: [
                "Developed predictive model pipelines adhering to ISO 9001:2015 quality standards.",
                "Evaluated model loss metrics, confusion matrices, and optimized hyperparameters.",
                "Demonstrated dedicated professional conduct, problem-solving ability, and excellent domain knowledge."
            ],
            skills: ["AI/ML Domain", "Python Algorithms", "Data Preprocessing", "Model Optimization", "AICTE MSME Standards"],
            verifiable: "Verified by Co-Founder, InternPe (Certificate CID: IPI#53490)."
        },
        prodigy: {
            title: "Full-Stack Web Development Internship",
            issuer: "Prodigy InfoTech (MSME Registered, UDYAM-MH-19-0221586)",
            date: "1st June, 2025 to 30th June, 2025",
            certId: "CIN: PIT/JUN25/02917",
            aicteId: "UDYAM-MH-19-0221586",
            image: "cert_prodigy.jpg",
            category: "Full-Stack Web Engineering Internship",
            summary: "Selected for full-time 1-month Full-Stack Web Development internship at Prodigy InfoTech, engineering responsive client interfaces, server-side APIs, and interactive web features.",
            learnings: [
                "Architected modern responsive UI components using HTML5, CSS3, JavaScript ES6+, and modular frontend frameworks.",
                "Designed RESTful API endpoints for seamless frontend-backend data communication.",
                "Implemented modern UI/UX design patterns, dark mode toggles, and cross-browser compatibility tests."
            ],
            skills: ["Full-Stack Web Dev", "JavaScript ES6+", "HTML5 / CSS3", "REST APIs", "UI/UX Design"],
            verifiable: "Official Offer & Completion Document CIN: PIT/JUN25/02917 from Prodigy InfoTech."
        },
        excelrs: {
            title: "Python & Autonomous AI Agent Workshop",
            issuer: "EXCELRS Training Division (Powered by Lawazia Tech)",
            date: "Sept 21, 2026 – Sept 26, 2026 (Registration: EXCELRS/2026/PAAAW/112)",
            certId: "EXCELRS/2026/PAAAW/112",
            aicteId: "Lawazia Tech Director Verified",
            image: "cert_excelrs.jpg",
            category: "Advanced Workshop & AI Agent Training",
            summary: "Completed specialized high-intensity workshop on advanced Python programming and Autonomous AI Agent development, constructing a virtual healthcare Assistant utilizing LLMs and Retrieval-Augmented Generation (RAG).",
            learnings: [
                "Engineered a LLM + RAG Virtual Medical Assistant for initial symptom triage and automated patient query assistance.",
                "Implemented vector embeddings, semantic retrieval, and prompt engineering strategies for domain-specific AI bots.",
                "Mastered Python object-oriented patterns, async execution, API integration, and agentic tool-calling workflows.",
                "Evaluated hallucination mitigation techniques and safety protocols for automated AI responses."
            ],
            skills: ["Python Advanced", "LLM Integration", "RAG Architecture", "AI Agents", "Healthcare AI Workflow"],
            verifiable: "Verified training enrollment letter signed by Director Sandeep Jaiswal, Lawazia Tech."
        },
        bis: {
            title: "Bhartiya Manak - Bharat ka Bharosa National Quality Initiative",
            issuer: "Bureau of Indian Standards (BIS) & MyGov India (Ministry of Consumer Affairs)",
            date: "Issued: 2026",
            certId: "BIS/MYGOV/2026/BMBKB",
            aicteId: "Signed by Director General, BIS & CEO, MyGov",
            image: "cert_bis_mygov.jpg",
            category: "National Standards & Quality Recognition",
            summary: "Recognized nationally by the Bureau of Indian Standards (BIS) and MyGov India for demonstrating exemplary knowledge in Indian Quality Standards, industrial compliance, and empowering India's journey toward Viksit Bharat.",
            learnings: [
                "Mastered national Indian Quality Standards (IS Codes), certification protocols, and industrial benchmarking.",
                "Analyzed technical compliance policies essential for engineering manufacturing and software quality assurance.",
                "Commended for contributing toward embedding a culture of standards and quality across engineering domains."
            ],
            skills: ["Indian Standards (BIS)", "Quality Engineering", "Industrial Compliance", "Viksit Bharat Policy", "National Recognition"],
            verifiable: "Official Certificate signed by Sanjay Garg, IAS (Director General, Bureau of Indian Standards) & Ajit Kumar, IAS (CEO, MyGov)."
        },
        swayam: {
            title: "Mastering Personal Finance & Analytics (30 Hours)",
            issuer: "ArthNirmiti & SWAYAM Plus (Ministry of Education, Govt. of India)",
            date: "Issued: 11-10-2025",
            certId: "SWAYAM Plus Certified Course",
            aicteId: "Theory: 70 / Practical: 24",
            image: "cert_swayam_finance.jpg",
            category: "SWAYAM Plus Certified Course",
            summary: "Completed a comprehensive 30-hour certified course on Personal Finance, capital budgeting, financial data modeling, and risk evaluation through SWAYAM Plus.",
            learnings: [
                "Evaluated capital budgeting metrics, interest compound analytics, and personal investment portfolio balance.",
                "Demonstrated practical expertise scoring 70 in Theory and 24 in Practical assessments.",
                "Applied quantitative models to analyze economic risk, cash flow forecasting, and tax planning."
            ],
            skills: ["Financial Analytics", "SWAYAM Plus", "Quantitative Modeling", "Portfolio Management", "Risk Assessment"],
            verifiable: "Signed by Mr. Roshan Jain, Director, ArthNirmiti & SWAYAM Plus platform."
        },
        jnj: {
            title: "Surgical Robotics & Controls Engineering Job Simulation",
            issuer: "Johnson & Johnson MedTech (via Forage)",
            date: "Issued: September 7, 2026",
            certId: "6a9ed2b539a1f8e666c9006f",
            aicteId: "User Verification Code: vBJu4tqQF4iz9aMfJ",
            image: "cert_jnj.jpg",
            category: "Virtual Engineering Simulation (MedTech)",
            summary: "Completed an immersive virtual job simulation with Johnson & Johnson MedTech, analyzing robot arm responsiveness and feedback loops for precision surgical applications.",
            learnings: [
                "Diagnosed latency and mechanical delay factors affecting robotic arm movement in simulated surgical environments.",
                "Optimized robotic control system parameters to enhance motion fidelity and end-effector placement precision.",
                "Applied principles of kinematics, signal processing, and feedback controller tuning for medical devices.",
                "Drafted comprehensive engineering recommendations for hardware-software synchronization."
            ],
            skills: ["Robotics Control", "Surgical Arm Dynamics", "Feedback Loops", "Latency Reduction", "MedTech Simulation"],
            verifiable: "Verified by Tom Brunskill, CEO & Co-Founder of Forage (Verification Code: 6a9ed2b539a1f8e666c9006f)."
        },
        siemens: {
            title: "Operations & Industrial Engineering Job Simulation",
            issuer: "SIEMENS (via Forage)",
            date: "Issued: September 7, 2026",
            certId: "6a9ec5d339a1f8e666c5e06c",
            aicteId: "User Verification Code: vBJu4tqQF4iz9aMfJ",
            image: "cert_siemens.jpg",
            category: "Industrial & Operations Engineering",
            summary: "Executed virtual industrial engineering tasks for SIEMENS, focusing on operational workflow efficiency, time-and-motion studies, and facility layout re-engineering.",
            learnings: [
                "Conducted rigorous time & motion studies to identify manufacturing bottlenecks and idle cycle times.",
                "Formulated data-driven plant layout modifications to minimize transportation lag and optimize assembly flow.",
                "Engineered workflow efficiency proposals balancing throughput, safety, and operational expenses.",
                "Utilized industrial engineering analytics to model productivity gains from line balancing."
            ],
            skills: ["Industrial Engineering", "Time & Motion Studies", "Plant Layout Design", "Bottleneck Elimination", "Process Analytics"],
            verifiable: "Verified by Tom Brunskill, CEO & Co-Founder of Forage (Verification Code: 6a9ec5d339a1f8e666c5e06c)."
        },
        mygov: {
            title: "Blue Economy & Sustainable Marine Policy National Initiative",
            issuer: "Department of Fisheries, Ministry of Fisheries, Animal Husbandry & Dairying & MyGov India",
            date: "Issued: 2026",
            certId: "Govt of India National Quiz 2026",
            aicteId: "Signed by Dr. Surabhi Rai & CEO Ajit Kumar, IAS",
            image: "cert_mygov.jpg",
            category: "National Level Achievement & Govt. Recognition",
            summary: "Recognized by the Ministry of Fisheries, Government of India for demonstrating exemplary knowledge in sustainable marine economy, ocean resource management, and technology applications in fisheries.",
            learnings: [
                "Demonstrated expert understanding of Blue Economy frameworks, sustainable aquaculture, and ocean technology policies.",
                "Analyzed tech-driven solutions for marine ecosystem conservation and coastal community economic upliftment.",
                "Engaged with national governance initiatives promoting ocean resource optimization and environmental sustainability."
            ],
            skills: ["Blue Economy", "Government Tech Policy", "Ocean Sustainability", "National Recognition", "Policy Analytics"],
            verifiable: "Official Certificate issued by Govt. of India, signed by Joint Secretary Dr. Surabhi Rai & MyGov CEO Ajit Kumar, IAS."
        }
    };

    // Open Modal
    function openCertModal(certKey) {
        const data = certsData[certKey];
        if (!data) return;

        modalBody.innerHTML = `
            <div class="modal-grid">
                <div class="modal-img-col">
                    <div class="modal-rgb-frame">
                        <img src="${data.image}" alt="${data.title}" class="modal-cert-img" onclick="window.open('${data.image}', '_blank')">
                    </div>
                    <p style="text-align:center; margin-top: 10px; font-size: 0.78rem; color: var(--text-muted);">
                        💡 Click image to view in high-resolution tab
                    </p>
                </div>
                <div class="modal-info-col">
                    <span class="cred-category-badge badge-ai" style="margin-bottom:12px; display:inline-block;">${data.category}</span>
                    <h2>${data.title}</h2>
                    <span class="modal-issuer-tag">🏛️ ${data.issuer}</span>
                    
                    <div class="cred-meta" style="margin-bottom: 20px;">
                        <div class="meta-row">
                            <span class="meta-key">Date / Duration:</span>
                            <span class="meta-val">${data.date}</span>
                        </div>
                        <div class="meta-row">
                            <span class="meta-key">Certificate / Verification ID:</span>
                            <span class="meta-val">${data.certId}</span>
                        </div>
                        <div class="meta-row">
                            <span class="meta-key">Credential Reg Code:</span>
                            <span class="meta-val">${data.aicteId}</span>
                        </div>
                    </div>

                    <h4 class="modal-section-title">📌 Brief Overview</h4>
                    <p class="modal-desc-text">${data.summary}</p>

                    <h4 class="modal-section-title">🧠 Key Skills Acquired & Industry Work</h4>
                    <ul class="modal-highlights-list">
                        ${data.learnings.map(item => `<li>${item}</li>`).join('')}
                    </ul>

                    <h4 class="modal-section-title">🛠️ Applied Tech Stack & Frameworks</h4>
                    <div class="skill-badges" style="margin-bottom: 20px;">
                        ${data.skills.map(s => `<span class="badge">${s}</span>`).join('')}
                    </div>

                    <div style="padding: 12px; border-radius: 12px; background: rgba(0,212,170,0.08); border: 1px solid rgba(0,212,170,0.2); font-size: 0.82rem; color: var(--accent-secondary);">
                        ✔️ <strong>Recruiter Verification:</strong> ${data.verifiable}
                    </div>
                </div>
            </div>
        `;

        certModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Modal Triggers
    document.querySelectorAll('.open-modal-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const certKey = btn.getAttribute('data-cert');
            openCertModal(certKey);
        });
    });

    document.querySelectorAll('.credential-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.open-modal-btn')) {
                const certKey = card.getAttribute('data-cert-id');
                openCertModal(certKey);
            }
        });
    });

    // Close Modal Logic
    function closeModal() {
        certModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (certModal) {
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) {
                closeModal();
            }
        });
    }

    // ─── CareerPilot Project Deep Dive & User Manual Modal ───
    const careerpilotModal = document.getElementById('careerpilotModal');
    function openCareerpilotModal() {
        const modal = careerpilotModal || document.getElementById('careerpilotModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    function closeCareerpilotModal() {
        const modal = careerpilotModal || document.getElementById('careerpilotModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    window.openCareerpilotModal = openCareerpilotModal;
    window.closeCareerpilotModal = closeCareerpilotModal;

    document.querySelectorAll('.open-careerpilot-modal-btn, .careerpilot-preview, [onclick*="openCareerpilotModal"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openCareerpilotModal();
        });
    });

    document.querySelectorAll('.close-careerpilot-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            closeCareerpilotModal();
        });
    });

    if (careerpilotModal) {
        careerpilotModal.addEventListener('click', (e) => {
            if (e.target === careerpilotModal) {
                closeCareerpilotModal();
            }
        });
    }

    // ─── ScamShield AI Project Deep Dive & User Manual Modal ───
    const scamshieldModal = document.getElementById('scamshieldModal');
    function openScamshieldModal() {
        const modal = scamshieldModal || document.getElementById('scamshieldModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    function closeScamshieldModal() {
        const modal = scamshieldModal || document.getElementById('scamshieldModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    window.openScamshieldModal = openScamshieldModal;
    window.closeScamshieldModal = closeScamshieldModal;

    document.querySelectorAll('.open-scamshield-modal-btn, .scamshield-preview, [onclick*="openScamshieldModal"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openScamshieldModal();
        });
    });

    document.querySelectorAll('.close-scamshield-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            closeScamshieldModal();
        });
    });

    if (scamshieldModal) {
        scamshieldModal.addEventListener('click', (e) => {
            if (e.target === scamshieldModal) {
                closeScamshieldModal();
            }
        });
    }


    // ─── Close Mobile Menu on Outside Tap ───
    document.addEventListener('click', (e) => {
        if (navLinksContainer.classList.contains('open') && !navLinksContainer.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('open');
        }
    });

    // ─── Java IDE Interactive Engine ───
    const runJavaBtn = document.getElementById('runJavaBtn');
    const ideTerminal = document.getElementById('ideTerminal');
    const tabJava = document.getElementById('tabJava');
    const tabJson = document.getElementById('tabJson');
    const codeContentEl = document.querySelector('.ide-editor .code-content code');
    const breadcrumbCurrent = document.querySelector('.ide-breadcrumb .bc-current');

    const javaCodeSnippet = `<span class="code-keyword">package</span> com.aryan.portfolio;

<span class="code-comment">/**
 * @author Aryan Raj (7th Sem)
 * Target: Software Engineer / GET
 */</span>
<span class="code-keyword">public class</span> <span class="code-class">AryanRaj</span> <span class="code-keyword">extends</span> <span class="code-class">Developer</span> {
    <span class="code-keyword">public static final</span> <span class="code-type">String</span> <span class="code-const">COLLEGE</span> =
        <span class="code-string">"Techno India University"</span>;
    <span class="code-keyword">public static final</span> <span class="code-type">String</span> <span class="code-const">LOCATION</span> =
        <span class="code-string">"Noida, Alpha 2"</span>;
    <span class="code-keyword">public static final</span> <span class="code-type">double</span> <span class="code-const">CGPA</span> = <span class="code-number">8.0</span>;

    <span class="code-annotation">@Override</span>
    <span class="code-keyword">public</span> <span class="code-type">List</span>&lt;<span class="code-type">String</span>&gt; <span class="code-method">getStack</span>() {
        <span class="code-keyword">return</span> <span class="code-class">List</span>.of(
            <span class="code-string">"Java"</span>, <span class="code-string">"Python"</span>, <span class="code-string">"DSA"</span>,
            <span class="code-string">"DBMS"</span>, <span class="code-string">"Web"</span>, <span class="code-string">"AI APIs"</span>
        );
    }

    <span class="code-keyword">public static void</span> <span class="code-method">main</span>(<span class="code-type">String</span>[] <span class="code-var">args</span>) {
        <span class="code-class">AryanRaj</span> <span class="code-var">dev</span> = <span class="code-keyword">new</span> <span class="code-class">AryanRaj</span>();
        <span class="code-var">dev</span>.<span class="code-method">setAvailableForHire</span>(<span class="code-keyword">true</span>);
        <span class="code-class">System</span>.out.<span class="code-method">println</span>(
            <span class="code-string">"🚀 Ready to engineer systems!"</span>
        );
    }
}`;

    const jsonCodeSnippet = `{
  <span class="code-keyword">"name"</span>: <span class="code-string">"ARYAN RAJ"</span>,
  <span class="code-keyword">"degree"</span>: <span class="code-string">"B.Tech CSE (8.0 CGPA)"</span>,
  <span class="code-keyword">"semester"</span>: <span class="code-number">7</span>,
  <span class="code-keyword">"college"</span>: <span class="code-string">"Techno India Univ"</span>,
  <span class="code-keyword">"credentials"</span>: <span class="code-number">12</span>,
  <span class="code-keyword">"coreStack"</span>: [
    <span class="code-string">"Java"</span>, <span class="code-string">"Python"</span>, <span class="code-string">"DSA"</span>,
    <span class="code-string">"DBMS"</span>, <span class="code-string">"Web"</span>, <span class="code-string">"AI Tools"</span>
  ],
  <span class="code-keyword">"location"</span>: <span class="code-string">"Noida, Alpha 2"</span>,
  <span class="code-keyword">"openForWork"</span>: <span class="code-const">true</span>
}`;

    if (tabJava && tabJson && codeContentEl) {
        tabJava.addEventListener('click', () => {
            tabJava.classList.add('active');
            tabJson.classList.remove('active');
            codeContentEl.innerHTML = javaCodeSnippet;
            if (breadcrumbCurrent) breadcrumbCurrent.textContent = 'AryanRaj.java';
        });

        tabJson.addEventListener('click', () => {
            tabJson.classList.add('active');
            tabJava.classList.remove('active');
            codeContentEl.innerHTML = jsonCodeSnippet;
            if (breadcrumbCurrent) breadcrumbCurrent.textContent = 'Portfolio.json';
        });
    }

    if (runJavaBtn && ideTerminal) {
        runJavaBtn.addEventListener('click', () => {
            runJavaBtn.innerHTML = `
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" opacity="0.3"></circle>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" stroke-width="3" fill="none"></path>
                </svg>
                <span>Compiling...</span>
            `;
            runJavaBtn.style.opacity = '0.85';

            setTimeout(() => {
                ideTerminal.style.display = 'block';
                ideTerminal.innerHTML = `
                    <div class="terminal-bar">
                        <span class="term-title">🖥️ Run: AryanRaj.main()</span>
                        <span class="term-status"><span class="status-pulse"></span> BUILD SUCCESSFUL</span>
                    </div>
                    <div class="terminal-content">
                        <div class="term-line cmd">&gt; /usr/bin/javac -d bin src/com/aryan/portfolio/AryanRaj.java</div>
                        <div class="term-line cmd">&gt; /usr/bin/java -cp bin com.aryan.portfolio.AryanRaj</div>
                        <div class="term-line success">✔ [JVM 21.0.2] Build finished in 0.098s</div>
                        <div class="term-line output">🚀 Ready to engineer scalable systems!</div>
                        <div class="term-line info">📍 Aryan Raj | B.Tech CSE (7th Sem) | 12 Verified Credentials | CGPA 8.0</div>
                        <div class="term-line exit">Process finished with exit code 0</div>
                    </div>
                `;
                runJavaBtn.innerHTML = `
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                    <span>Re-Run</span>
                `;
                runJavaBtn.style.opacity = '1';
            }, 350);
        });
    }

    // ─── Interactive 3D Card Tilt on Mousemove ───
    if (!isMobile) {
        const tiltCards = document.querySelectorAll('.credential-card, .project-card, .java-ide');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ─── AryanOS In-App macOS Browser Engine ───
    const osBrowserModal = document.getElementById('osBrowserModal');
    const osBrowserWindow = document.querySelector('.os-browser-window');
    const osBrowserContent = document.getElementById('osBrowserContent');
    const osUrlInput = document.getElementById('osUrlInput');
    const osExternalBtn = document.getElementById('osExternalBtn');
    const osCloseBtn = document.getElementById('osCloseBtn');
    const osMinimizeBtn = document.getElementById('osMinimizeBtn');
    const osMaximizeBtn = document.getElementById('osMaximizeBtn');
    const osCopyUrlBtn = document.getElementById('osCopyUrlBtn');
    const osReloadBtn = document.getElementById('osReloadBtn');
    const osGoBtn = document.getElementById('osGoBtn');
    const osStatusText = document.getElementById('osStatusText');

    let currentBrowserUrl = 'https://www.linkedin.com/in/aryanrajcse';

    function showOsToast(message) {
        let toast = document.querySelector('.os-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'os-toast';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }

    function renderLinkedInView() {
        return `
            <div class="inapp-linkedin-view">
                <div class="li-card">
                    <div class="li-banner"></div>
                    <div class="li-profile-body">
                        <div class="li-avatar-row">
                            <img src="profile.jpg" alt="Aryan Raj" class="li-avatar">
                            <div class="li-actions">
                                <a href="https://www.linkedin.com/in/aryanrajcse" target="_blank" rel="noopener noreferrer" class="li-btn primary">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                                    </svg>
                                    Connect
                                </a>
                                <a href="mailto:aryanjaiswal11132@gmail.com" class="li-btn secondary">Message</a>
                            </div>
                        </div>
                        <h1 class="li-name">ARYAN RAJ <span class="li-badge">Verified Student</span></h1>
                        <p class="li-headline">B.Tech Computer Science & Engineering (4th Year, 7th Sem) | Full-Stack & AI Developer | Aspiring Software Engineer / GET</p>
                        <div class="li-meta">
                            <span>📍 Noida, Alpha 2, India</span>
                            <span class="li-connections">500+ connections</span>
                            <span>🏛️ Techno India University</span>
                        </div>
                    </div>
                </div>

                <!-- About Card -->
                <div class="li-card" style="padding: 22px;">
                    <h3 class="li-section-title">About</h3>
                    <p style="color: #c9d1d9; font-size: 0.92rem; line-height: 1.7;">
                        Passionate Computer Science & Engineering student currently pursuing 4th Year (7th Sem). Skilled in Python, Java, C++, DSA, DBMS (SQL), Full-Stack Web Development, and AI API integrations. Recipient of 12+ verified credentials from IBM, Siemens, Tata, HP, Accenture, and Government of India.
                    </p>
                </div>

                <!-- Education Card -->
                <div class="li-card" style="padding: 22px;">
                    <h3 class="li-section-title">Education</h3>
                    <div class="li-exp-item">
                        <div class="li-exp-icon">🎓</div>
                        <div>
                            <div class="li-exp-role">Techno India University</div>
                            <div class="li-exp-company">Bachelor of Technology - BTech, Computer Science and Engineering (8.0 CGPA)</div>
                            <div class="li-exp-date">2023 - 2027 • 7th Semester</div>
                        </div>
                    </div>
                    <div class="li-exp-item">
                        <div class="li-exp-icon">🏫</div>
                        <div>
                            <div class="li-exp-role">SSVM School</div>
                            <div class="li-exp-company">Class 12th CBSE (Science Stream) - 64.8% | Class 10th CBSE - 72.4%</div>
                            <div class="li-exp-date">2020 - 2023</div>
                        </div>
                    </div>
                </div>

                <!-- Experience Card -->
                <div class="li-card" style="padding: 22px;">
                    <h3 class="li-section-title">Experience & Internships</h3>
                    <div class="li-exp-item">
                        <div class="li-exp-icon">🔬</div>
                        <div>
                            <div class="li-exp-role">AI & Machine Learning Virtual Internship</div>
                            <div class="li-exp-company">IIT BHU Varanasi (Technex '24)</div>
                            <div class="li-exp-date">Issued: 2024</div>
                        </div>
                    </div>
                    <div class="li-exp-item">
                        <div class="li-exp-icon">💻</div>
                        <div>
                            <div class="li-exp-role">Web Development & Full-Stack Intern</div>
                            <div class="li-exp-company">InternPe / AICTE Approved</div>
                            <div class="li-exp-date">Issued: 2024</div>
                        </div>
                    </div>
                    <div class="li-exp-item">
                        <div class="li-exp-icon">⚙️</div>
                        <div>
                            <div class="li-exp-role">Software Development Internship</div>
                            <div class="li-exp-company">NV Enterprises & Consulting</div>
                            <div class="li-exp-date">Issued: 2024</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function renderGitHubView() {
        return `
            <div class="inapp-github-view">
                <div class="gh-header">
                    <img src="profile.jpg" alt="gmraj11132-tech" class="gh-avatar">
                    <div class="gh-user-info">
                        <h2>Aryan Raj</h2>
                        <div class="gh-handle">gmraj11132-tech</div>
                        <p class="gh-bio">B.Tech CSE Student (7th Sem) • Full-Stack Developer • AI Tools & Automation Enthusiast</p>
                        <div class="gh-stats-row">
                            <span><strong>12+</strong> Credentials</span>
                            <span><strong>4+</strong> Key Repositories</span>
                            <span>📍 Noida, Alpha 2</span>
                        </div>
                    </div>
                </div>

                <h3 style="color: #ffffff; font-size: 1.15rem; margin-bottom: 14px;">Pinned Repositories</h3>
                <div class="gh-repo-grid">
                    <div class="gh-repo-card">
                        <div class="gh-repo-title">
                            <span>📦</span>
                            <span>personal-portfolio-2026</span>
                        </div>
                        <p class="gh-repo-desc">Ultra high-end portfolio featuring AMOLED dark mode, 3D cosmic starfield, Java IDE engine, and macOS in-app browser window.</p>
                        <div class="gh-repo-meta">
                            <span><span class="gh-lang-dot dot-js"></span>JavaScript</span>
                            <span>⭐ 18</span>
                            <span>🍴 4</span>
                        </div>
                    </div>

                    <div class="gh-repo-card">
                        <div class="gh-repo-title">
                            <span>🛡️</span>
                            <span>secure-multi-user-portal</span>
                        </div>
                        <p class="gh-repo-desc">Full-stack insurance/govt application with role-based auth, SQL DBMS automation, and integrated AI assistant.</p>
                        <div class="gh-repo-meta">
                            <span><span class="gh-lang-dot dot-java"></span>Java / Node.js</span>
                            <span>⭐ 12</span>
                            <span>🍴 2</span>
                        </div>
                    </div>

                    <div class="gh-repo-card">
                        <div class="gh-repo-title">
                            <span>🤖</span>
                            <span>unified-ai-tools-platform</span>
                        </div>
                        <p class="gh-repo-desc">Multi-capability AI platform combining chat, image generation, and music synthesis via unified REST APIs.</p>
                        <div class="gh-repo-meta">
                            <span><span class="gh-lang-dot dot-js"></span>JavaScript / REST</span>
                            <span>⭐ 15</span>
                            <span>🍴 3</span>
                        </div>
                    </div>

                    <div class="gh-repo-card">
                        <div class="gh-repo-title">
                            <span>🎓</span>
                            <span>ai-study-assistant-cs</span>
                        </div>
                        <p class="gh-repo-desc">Interactive student chatbot for CS coursework, DSA concept visualization, and SQL doubt clearing with query log.</p>
                        <div class="gh-repo-meta">
                            <span><span class="gh-lang-dot dot-py"></span>Python</span>
                            <span>⭐ 21</span>
                            <span>🍴 5</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function renderGenericWebView(url) {
        return `
            <div style="padding: 40px 20px; text-align: center; color: #c9d1d9; max-width: 600px; margin: 0 auto;">
                <div style="font-size: 3rem; margin-bottom: 16px;">🌐</div>
                <h2 style="color: #ffffff; margin-bottom: 8px;">In-App Web Inspector</h2>
                <p style="font-size: 0.92rem; color: #8b949e; margin-bottom: 24px;">
                    Browsing URL: <code style="color: var(--accent-secondary); background: rgba(0,245,196,0.1); padding: 3px 8px; border-radius: 6px;">${url}</code>
                </p>
                <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
                    <a href="${url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary ripple-btn" style="min-height: 42px;">
                        <span>Open in Real Browser ↗</span>
                    </a>
                    <button class="btn btn-secondary glass ripple-btn" onclick="document.getElementById('osCloseBtn').click();" style="min-height: 42px;">
                        <span>Return to Portfolio</span>
                    </button>
                </div>
            </div>
        `;
    }

    function openOsBrowser(url, title = 'AryanOS Browser') {
        currentBrowserUrl = url;
        if (osUrlInput) osUrlInput.value = url;
        if (osExternalBtn) osExternalBtn.href = url;
        if (osStatusText) osStatusText.textContent = `Loading ${title}...`;

        // Render appropriate in-app view
        if (url.includes('linkedin.com')) {
            osBrowserContent.innerHTML = renderLinkedInView();
            if (osStatusText) osStatusText.textContent = `LinkedIn • Aryan Raj (@aryanrajcse) • AryanOS WebKit`;
        } else if (url.includes('github.com')) {
            osBrowserContent.innerHTML = renderGitHubView();
            if (osStatusText) osStatusText.textContent = `GitHub • Aryan Raj (@gmraj11132-tech) • AryanOS WebKit`;
        } else {
            osBrowserContent.innerHTML = renderGenericWebView(url);
            if (osStatusText) osStatusText.textContent = `Web • ${url} • AryanOS WebKit`;
        }

        osBrowserModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeOsBrowser() {
        osBrowserModal.classList.remove('active');
        osBrowserWindow.classList.remove('fullscreen');
        osBrowserWindow.classList.remove('minimized');
        document.body.style.overflow = '';
    }

    // Attach to all .os-browser-trigger elements
    document.querySelectorAll('.os-browser-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const url = trigger.getAttribute('data-url') || trigger.getAttribute('href');
            const title = trigger.getAttribute('data-title') || 'Web Inspector';
            openOsBrowser(url, title);
        });
    });

    // Window Traffic Light actions
    if (osCloseBtn) {
        osCloseBtn.addEventListener('click', closeOsBrowser);
    }

    if (osMinimizeBtn) {
        osMinimizeBtn.addEventListener('click', () => {
            osBrowserWindow.classList.add('minimized');
            setTimeout(closeOsBrowser, 300);
            showOsToast('Window minimized');
        });
    }

    if (osMaximizeBtn) {
        osMaximizeBtn.addEventListener('click', () => {
            osBrowserWindow.classList.toggle('fullscreen');
        });
    }

    // Copy URL button
    if (osCopyUrlBtn) {
        osCopyUrlBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(currentBrowserUrl).then(() => {
                showOsToast('URL copied to clipboard!');
            }).catch(() => {
                showOsToast('Copied: ' + currentBrowserUrl);
            });
        });
    }

    // Reload button
    if (osReloadBtn) {
        osReloadBtn.addEventListener('click', () => {
            if (osStatusText) osStatusText.textContent = 'Reloading page...';
            osBrowserContent.style.opacity = '0.4';
            setTimeout(() => {
                openOsBrowser(currentBrowserUrl);
                osBrowserContent.style.opacity = '1';
                showOsToast('Page reloaded');
            }, 300);
        });
    }

    // Go / Search button
    if (osGoBtn && osUrlInput) {
        const handleGo = () => {
            let inputVal = osUrlInput.value.trim();
            if (!inputVal) return;
            if (!inputVal.startsWith('http://') && !inputVal.startsWith('https://')) {
                if (inputVal.includes('linkedin')) {
                    inputVal = 'https://www.linkedin.com/in/aryanrajcse';
                } else if (inputVal.includes('github')) {
                    inputVal = 'https://github.com/gmraj11132-tech';
                } else {
                    inputVal = 'https://' + inputVal;
                }
            }
            openOsBrowser(inputVal, 'Web');
        };

        osGoBtn.addEventListener('click', handleGo);
        osUrlInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                handleGo();
            }
        });
    }

    // Close on backdrop tap
    if (osBrowserModal) {
        osBrowserModal.addEventListener('click', (e) => {
            if (e.target === osBrowserModal) {
                closeOsBrowser();
            }
        });
    }

    // ─── Resume Modal Controller ───
    const resumeModal = document.getElementById('resumeModal');
    const resumeOpenModalBtn = document.getElementById('resumeOpenModalBtn');
    const resumeTriggerWrap = document.getElementById('resumeTriggerWrap');
    const resumeModalCloseBtn = document.getElementById('resumeModalCloseBtn');
    const resumeModalCloseDot = document.getElementById('resumeModalCloseDot');

    function openResumeModal() {
        if (!resumeModal) return;
        resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeResumeModal() {
        if (!resumeModal) return;
        resumeModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (resumeOpenModalBtn) {
        resumeOpenModalBtn.addEventListener('click', openResumeModal);
    }
    if (resumeTriggerWrap) {
        resumeTriggerWrap.addEventListener('click', openResumeModal);
    }
    if (resumeModalCloseBtn) {
        resumeModalCloseBtn.addEventListener('click', closeResumeModal);
    }
    if (resumeModalCloseDot) {
        resumeModalCloseDot.addEventListener('click', closeResumeModal);
    }
    if (resumeModal) {
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                closeResumeModal();
            }
        });
    }

    // ─── Keyboard Navigation for Accessibility ───
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('open');
            closeModal();
            closeOsBrowser();
            closeResumeModal();
            closeCareerpilotModal();
            closeScamshieldModal();
        } else if ((e.metaKey || e.ctrlKey) && (e.key === 'm' || e.key === 'M')) {
            e.preventDefault();
            openCareerpilotModal();
        }
    });

});


