/* ============================================
   PORTFOLIO — Interactive JavaScript
   Particles, Typewriter, Scroll Reveals,
   Dark Mode, Ripple Effects, Counter Animation
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Particle Canvas Background ───
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrame;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.hue = Math.random() > 0.5 ? 245 : 160; // purple or teal
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 70%, 65%, ${this.opacity})`;
            ctx.fill();
        }
    }

    function initParticles() {
        const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    const opacity = (1 - dist / 150) * 0.15;
                    ctx.strokeStyle = `rgba(108, 99, 255, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        drawLines();
        animFrame = requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

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
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });
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

    // ─── Contact Form (Demo) ───
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.form-submit');
            const originalHTML = btn.innerHTML;

            btn.innerHTML = `<span>Message Sent! ✓</span>`;
            btn.style.background = 'linear-gradient(135deg, #00d4aa, #00b4d8)';

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                contactForm.reset();
            }, 2500);
        });
    }

    // ─── Section Header Parallax ───
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        document.querySelectorAll('.section-title').forEach(title => {
            const rect = title.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const offset = (rect.top - window.innerHeight / 2) * 0.03;
                title.style.transform = `translateY(${offset}px)`;
            }
        });
    }, { passive: true });

    // ─── CERTIFICATE FILTERING & INTERACTIVE MODAL ───
    const filterBtns = document.querySelectorAll('.filter-btn');
    const credCards = document.querySelectorAll('.credential-card');
    const certModal = document.getElementById('certModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    // Filter Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            credCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category.includes(filter)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
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
            issuer: "NV Enterprises (Ranchi, Jharkhand) in collaboration with Ramgarh Engineering College",
            date: "10th June 2025 to 23rd July 2025",
            certId: "NV/24/0218",
            aicteId: "Student Reg No: 23033440027",
            image: "cert_nv_enterprises.jpg",
            category: "ML Engineering Internship",
            summary: "Completed practical industrial training on Machine Learning Craft With Python. Built custom predictive models, data analysis scripts, and feature selection routines under direct corporate supervision at NV Enterprises, Ranchi.",
            learnings: [
                "Engineered Python scripts for automated feature scaling, missing value imputation, and out-of-fold cross validation.",
                "Trained regression & classification models for tabular datasets with high prediction reliability.",
                "Generated visual exploratory data analysis (EDA) plots to interpret complex data trends.",
                "Delivered final internship project defense evaluated and signed by Director, NV Enterprises."
            ],
            skills: ["Python ML", "Data Cleaning", "Scikit-Learn", "Exploratory Data Analysis", "Feature Engineering"],
            verifiable: "Officially signed Certificate ID: NV/24/0218 issued by Director, NV Enterprises, Ranchi."
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

    // ─── Keyboard Navigation for Accessibility ───
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('open');
            closeModal();
        }
    });

});
