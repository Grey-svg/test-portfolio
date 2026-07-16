/* ============================================
   PORTFOLIO: ADNAN MARDINI
   Cybersecurity Engineer
   Interactive Engine
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollEffects();
    initTypingAnimation();
    initStatsCounter();
    initSmoothScroll();
    initContactForm();
    initActiveNavHighlight();
    initTimeline();
    initTerminal();
});

/* ---------- MOBILE MENU ---------- */
function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu');
    const menu = document.querySelector('.nav-menu');
    const links = document.querySelectorAll('.nav-link');

    if (!toggle || !menu) return;

    const setOpen = (open) => {
        toggle.classList.toggle('active', open);
        menu.classList.toggle('active', open);
        toggle.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
    };

    toggle.addEventListener('click', () => {
        setOpen(!menu.classList.contains('active'));
    });

    links.forEach(link => {
        link.addEventListener('click', () => setOpen(false));
    });

    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('active')) {
            setOpen(false);
        }
    });
}

/* ---------- SCROLL EFFECTS ---------- */
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll(
        '.expertise-card, .portfolio-card, .cert-card, .proof-card, .stack-category, .highlight-item, .contact-method'
    );

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/* ---------- TYPING ANIMATION ---------- */
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const roles = [
        'Cybersecurity Engineer',
        'Security Operations Specialist',
        'Penetration Tester',
        'Security Engineering',
        'AI-Assisted Security'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 1000);
}

/* ---------- STATS COUNTER ---------- */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if (!statNumbers.length) return;

    const setRestValues = () => {
        statNumbers.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-target'));
            stat.textContent = Number.isInteger(target) ? target : target.toFixed(1);
        });
    };
    setRestValues();

    let animationFrameId;
    const animateOnce = () => {
        statNumbers.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-target'));
            const duration = 800;
            const startTime = performance.now();

            function tick(now) {
                const progress = Math.min((now - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const value = target * eased;
                stat.textContent = Number.isInteger(target) ? Math.floor(value) : value.toFixed(1);
                if (progress < 1) {
                    animationFrameId = requestAnimationFrame(tick);
                } else {
                    stat.textContent = Number.isInteger(target) ? target : target.toFixed(1);
                }
            }
            animationFrameId = requestAnimationFrame(tick);
        });
    };

    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats || !('IntersectionObserver' in window)) return;

    let leftHero = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                leftHero = true;
            } else if (leftHero) {
                if (animationFrameId) cancelAnimationFrame(animationFrameId);
                animateOnce();
                leftHero = false;
            }
        });
    }, { threshold: 0.5 });
    observer.observe(heroStats);
}

/* ---------- SMOOTH SCROLL ---------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (!target) return;

            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/* ---------- ACTIVE NAV HIGHLIGHT ---------- */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ---------- CONTACT FORM ---------- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');
    
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            shakeElement(form);
            return;
        }

        if (!isValidEmail(email)) {
            const emailInput = document.getElementById('email');
            emailInput.style.borderColor = 'var(--accent-danger)';
            emailInput.focus();
            setTimeout(() => {
                emailInput.style.borderColor = 'var(--border-color)';
            }, 2000);
            return;
        }

        // hCaptcha verification
        const captchaResponse = (typeof hcaptcha !== 'undefined')
            ? hcaptcha.getResponse()
            : (document.querySelector('[name="h-captcha-response"]')?.value || '');
        if (!captchaResponse) {
            shakeElement(form);
            const captchaWidget = document.querySelector('.h-captcha');
            if (captchaWidget) {
                captchaWidget.style.outline = '2px solid var(--accent-danger)' ;
                setTimeout(() => { captchaWidget.style.outline = ''; }, 2000);
            }
            return;
        }

        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // ============================================
        // REPLACE WITH YOUR ACTUAL FORMSPREE FORM ID
        // Go to formspree.io → Create Form → Copy ID
        // ============================================
        const formspreeEndpoint = 'https://formspree.io/f/xjgjqogk';

        fetch(formspreeEndpoint, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                subject: document.getElementById('subject').value.trim(),
                message: message,
                'h-captcha-response': captchaResponse
            })
        })
        .then(response => {
            if (response.ok) {
                form.reset();
                form.style.display = 'none';
                successMessage.classList.remove('hidden');
                
                if (!document.getElementById('send-another')) {
                    const sendAnother = document.createElement('button');
                    sendAnother.id = 'send-another';
                    sendAnother.className = 'btn btn-secondary';
                    sendAnother.style.cssText = 'margin-top: 16px;';
                    sendAnother.innerHTML = '<i class="fas fa-redo"></i> Send Another Message';
                    sendAnother.addEventListener('click', () => {
                        form.style.display = 'flex';
                        successMessage.classList.add('hidden');
                        sendAnother.remove();
                        if (typeof hcaptcha !== 'undefined') hcaptcha.reset();
                    });
                    successMessage.appendChild(sendAnother);
                }
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            alert('Something went wrong. Please email me directly at adnanmardini1999@gmail.com');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function shakeElement(element) {
    element.style.animation = 'none';
    element.offsetHeight;
    element.style.animation = 'shake 0.5s ease';
    
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 50%, 90% { transform: translateX(-6px); }
        30%, 70% { transform: translateX(6px); }
    }
`;
document.head.appendChild(shakeStyle);

/* ---------- KEYBOARD NAVIGATION ---------- */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const menu = document.querySelector('.nav-menu');
        const toggle = document.getElementById('mobile-menu');
        if (menu && menu.classList.contains('active')) {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

/* ---------- PARALLAX GRID EFFECT ---------- */
document.addEventListener('mousemove', (e) => {
    const grid = document.querySelector('.hero-bg-grid');
    if (!grid || window.innerWidth < 768) return;

    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    grid.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

/* ---------- CAREER TIMELINE ---------- */
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineProgress = document.querySelector('.timeline-progress');
    const filterButtons = document.querySelectorAll('.timeline-btn');
    
    if (!timelineItems.length) return;

    window.addEventListener('scroll', () => {
        const timeline = document.querySelector('.timeline-container');
        if (!timeline) return;
        
        const timelineRect = timeline.getBoundingClientRect();
        const timelineTop = timelineRect.top;
        const timelineHeight = timelineRect.height;
        const windowHeight = window.innerHeight;
        
        const scrollProgress = Math.max(0, Math.min(1, 
            (windowHeight - timelineTop) / (timelineHeight + windowHeight)
        ));
        
        if (timelineProgress) {
            timelineProgress.style.height = `${scrollProgress * 100}%`;
        }
    });

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-view');
            
            timelineItems.forEach(item => {
                item.classList.remove('hidden-item');
                
                if (filter === 'all') return;
                
                const category = item.getAttribute('data-category');
                if (category !== filter) {
                    item.classList.add('hidden-item');
                }
            });
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach((item, index) => {
        const isLeft = item.classList.contains('left');
        item.style.opacity = '0';
        item.style.transform = isLeft ? 'translateX(-30px)' : 'translateX(30px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}

/* ---------- LOGGING ---------- */
console.log(
    '%c Adnan Mardini Portfolio %c v1.0 ',
    'background: #00d4aa; color: #0a0e14; padding: 6px 12px; font-weight: 700; border-radius: 4px 0 0 4px;',
    'background: #0f1419; color: #e6edf3; padding: 6px 12px; border-radius: 0 4px 4px 0;'
);
console.log('%c🔐 Cybersecurity Engineer', 'color: #8b949e; font-style: italic;');
console.log('%c💻 github.com/Adnanmardini', 'color: #00a3ff;');

/* ---------- INTERACTIVE TERMINAL ---------- */
function initTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    const body = document.getElementById('terminal-body');
    
    if (!input || !output) return;

    let commandHistory = [];
    let historyIndex = -1;

    const commands = {
        help: () => `
<span class="output-title">Available Commands</span>
<span class="output-divider">─────────────────────────────────────</span>
<span class="output-success">whoami</span>        — Who I am
<span class="output-success">skills</span>        — Technical skill tree
<span class="output-success">certs</span>         — Certifications list
<span class="output-success">experience</span>    — Career summary
<span class="output-success">projects</span>      — Featured projects
<span class="output-success">soc</span>           — Security operations tools
<span class="output-success">education</span>     — Academic background
<span class="output-success">contact</span>       — Get in touch
<span class="output-success">github</span>        — Repository links
<span class="output-success">resume</span>        — Download resume
<span class="output-success">whois adnan</span>  — Full profile
<span class="output-success">clear</span>         — Clear terminal
<span class="output-success">history</span>       — Command history
<span class="output-divider">─────────────────────────────────────</span>
<span class="output-subtitle">Try: <span class="cmd-highlight">whoami</span> or <span class="cmd-highlight">skills</span></span>`,

        whoami: () => `
<span class="output-title">🛡️ Adnan Mardini</span>
<span class="output-subtitle">Cybersecurity Engineer</span>
<span class="output-divider">─────────────────────────────────────</span>
Cybersecurity Engineer focused on Security Engineering, Security Operations, Penetration Testing, and AI-assisted Security.

<span class="output-highlight">📍 Lagos, Nigeria</span>
<span class="output-highlight">🎓 B.Tech Computer Science, Bells University of Technology (First Class Honours, In View)</span>
<span class="output-highlight">🎓 OND Computer Science, Allover Central Polytechnic (Distinction, GPA: 3.74/4.00)</span>
<span class="output-highlight">📜 Google Cybersecurity · TryHackMe Security Engineer · SAL1 · Jr Penetration Tester</span>
<span class="output-highlight">💼 Cybersecurity Engineer at Expadox Labs · Cybersecurity Lead at Inventors Community</span>

<span class="output-subtitle">Building secure applications, strengthening enterprise infrastructure, and helping organizations detect and respond to modern cyber threats.</span>`,

        skills: () => {
            const skillData = [
                { name: 'Security Engineering', level: 85 },
                { name: 'Python Automation', level: 82 },
                { name: 'Penetration Testing', level: 80 },
                { name: 'SIEM & Threat Detection', level: 78 },
                { name: 'Web App Security', level: 82 },
                { name: 'DevSecOps', level: 75 },
                { name: 'Incident Response', level: 76 },
                { name: 'Enterprise IT', level: 85 },
                { name: 'Active Directory', level: 80 },
                { name: 'Docker & Containers', level: 72 }
            ];
            
            let html = `<span class="output-title">⚡ Technical Skill Tree</span>
<span class="output-divider">──────────────────────────────────────────</span>
<div class="terminal-skill-tree">`;
            
            skillData.forEach(skill => {
                html += `
                <div class="terminal-skill-item">
                    <span style="min-width:160px;font-size:0.8rem;">${skill.name}</span>
                    <div class="terminal-skill-bar">
                        <div class="terminal-skill-fill" style="width:${skill.level}%"></div>
                    </div>
                    <span style="font-size:0.72rem;color:#8b949e;">${skill.level}%</span>
                </div>`;
            });
            
            html += `</div>`;
            return html;
        },

        certs: () => `
<span class="output-title">📜 Certifications & Training</span>
<span class="output-divider">─────────────────────────────────────</span>
<span class="output-highlight">Google Cybersecurity</span> — Professional Certificate (Google, Jul 2025)
<span class="output-highlight">Security Engineer</span> — TryHackMe (Jun 2025)
<span class="output-highlight">SAL1</span> — Security Analyst Level 1 (TryHackMe, May 2025)
<span class="output-highlight">Jr Penetration Tester</span> — TryHackMe (Apr 2025)
<span class="output-highlight">Foundation of Ethical Hacking</span> — Udacity (Jan 2025)
<span class="output-highlight">Microsoft Applied Skills</span> — Administer Active Directory Domain Services

<span class="output-subtitle">+ Additional hands-on training: Web Application Pentesting, Offensive Pentesting, Security Engineering (TryHackMe).</span>`,

        experience: () => `
<span class="output-title">💼 Career Timeline</span>
<span class="output-divider">─────────────────────────────────────</span>
<span class="output-highlight">2026–Present</span>  Cybersecurity Engineer — Expadox Labs
<span class="output-highlight">2026–Present</span>  IT Infrastructure & Information Security — Fidson Healthcare Plc
<span class="output-highlight">2025–Present</span>  Cybersecurity Lead — Inventors Community
<span class="output-highlight">2024–2025</span>     Cybersecurity Intern — Inventors Community
<span class="output-highlight">2024–2025</span>     Penetration Tester — Udacity Ethical Hacking Internship
<span class="output-highlight">2021–2023</span>     IT Support Specialist — Fidson Healthcare Plc

<span class="output-subtitle">📍 Lagos, Nigeria | From Enterprise IT to Cybersecurity Engineering</span>`,

        projects: () => `
<span class="output-title">🚀 Featured Projects</span>
<span class="output-divider">─────────────────────────────────────</span>
<span class="output-highlight">🔵 SecOpsAI</span> — AI-Assisted Threat Detection Platform (Python, FastAPI, XGBoost, Docker)
<span class="output-highlight">🟢 ShieldFlow</span> — DevSecOps Security Automation (GitHub Actions, Semgrep, Trivy, OWASP ZAP)
<span class="output-highlight">🟠 FireOps</span> — Hybrid Security Monitoring Platform (Wazuh, OpenSearch, Suricata, AWS)
<span class="output-highlight">🟣 Web Vulnerability Scanner</span> — Python-based security scanner (Flask, BeautifulSoup)
<span class="output-highlight">⚪ Core Monitoring</span> — Systems engineering simulation (Python, Tkinter, Matplotlib)

<span class="output-subtitle">🔗 github.com/Adnanmardini — Full portfolio on GitHub</span>`,

        soc: () => `
<span class="output-title">🛡️ Security Operations Stack</span>
<span class="output-divider">─────────────────────────────────────</span>
<span class="output-success">SIEM:</span>        Splunk, Wazuh, OpenSearch
<span class="output-success">IDS/IPS:</span>      Suricata, Zeek
<span class="output-success">Cloud:</span>        AWS CloudTrail
<span class="output-success">VM:</span>          Greenbone Vulnerability Management
<span class="output-success">Scripting:</span>   Python automation for detection & response
<span class="output-success">IR:</span>          Structured incident response workflows
<span class="output-success">Infra:</span>        Windows Server, Active Directory, Networking

<span class="output-subtitle">Enterprise security monitoring experience in production environments</span>`,

        education: () => `
<span class="output-title">🎓 Education</span>
<span class="output-divider">─────────────────────────────────────</span>
<span class="output-highlight">B.Tech Computer Science</span>
Bells University of Technology | 2023–2027
First Class Honours (In View)

<span class="output-highlight">OND Computer Science</span>
Allover Central Polytechnic
Distinction (GPA: 3.74/4.00)

<span class="output-highlight">Key Coursework:</span>
• Network Security · Cryptography · Secure Software Development
• Operating Systems · Database Systems · Data Structures & Algorithms`,

        contact: () => `
<span class="output-title">📬 Let's Connect</span>
<span class="output-divider">─────────────────────────────────────</span>
<span class="output-success">Email:</span>    <span class="output-link">adnanmardini1999@gmail.com</span>
<span class="output-success">LinkedIn:</span>  <span class="output-link">linkedin.com/in/adnan-mardini</span>
<span class="output-success">GitHub:</span>    <span class="output-link">github.com/Adnanmardini</span>

<span class="output-subtitle">Open to: Cybersecurity Engineering | SOC | Security Analyst | Penetration Testing | DevSecOps</span>`,

        github: () => `
<span class="output-title">📦 GitHub Repositories</span>
<span class="output-divider">─────────────────────────────────────</span>
<span class="output-success">🔵 SecOpsAI</span> — AI-assisted threat detection platform (FastAPI, XGBoost)
<span class="output-success">🟢 ShieldFlow</span> — DevSecOps security automation pipeline
<span class="output-success">🟠 FireOps</span> — Hybrid security monitoring architecture
<span class="output-success">🔍 Web Vulnerability Scanner</span> — Python-based security scanner
<span class="output-success">💻 Core Monitoring</span> — Multi-core execution simulation

<span class="output-subtitle">🔗 github.com/Adnanmardini</span>`,

        resume: () => `
<span class="output-title">📄 Resume</span>
<span class="output-divider">─────────────────────────────────────</span>
<span class="output-success">Download:</span> <span class="output-link">assets/resume/adnan-mardini-resume.pdf</span>

<span class="output-subtitle">Type <span class="cmd-highlight">experience</span> for career summary</span>`,

        'whois adnan': () => `
<span class="output-title">WHOIS: adnan-mardini</span>
<span class="output-divider">─────────────────────────────────────</span>
<span class="output-success">Registrant:</span> Adnan Mardini
<span class="output-success">Role:</span>       Cybersecurity Engineer
<span class="output-success">Location:</span>   Lagos, Nigeria
<span class="output-success">Focus:</span>      Security Engineering, Security Operations, Penetration Testing, AI-assisted Security
<span class="output-success">Status:</span>     Active — Available for opportunities
<span class="output-success">Updated:</span>     2026`,

        history: () => {
            if (commandHistory.length === 0) return '<span class="output-subtitle">No commands yet. Start typing!</span>';
            return `<span class="output-title">Command History</span>
<span class="output-divider">────────────────────</span>
${commandHistory.map((cmd, i) => `<span class="output-subtitle">${i + 1}.</span> ${cmd}`).join('<br>')}`;
        },

        nmap: (args) => {
            const target = args || 'localhost';
            return `
<span class="output-title">Starting Nmap scan on ${target}</span>
<span class="output-divider">─────────────────────────────────────</span>
<span class="output-success">PORT     STATE    SERVICE</span>
22/tcp   open     ssh
80/tcp   open     http
443/tcp  open     https
3306/tcp filtered mysql
8080/tcp open     http-proxy

<span class="output-subtitle">Nmap done: 1 IP address scanned in 2.34 seconds</span>
<span class="output-highlight">⚠️ Just kidding. This is a portfolio terminal.</span>`;
        }
    };

    function executeCommand(cmdString) {
        const trimmed = cmdString.trim().toLowerCase();
        
        if (!trimmed) return '';
        
        commandHistory.push(trimmed);
        historyIndex = commandHistory.length;

        let cmd = trimmed;
        let args = '';
        
        if (trimmed.startsWith('nmap ')) {
            cmd = 'nmap';
            args = trimmed.substring(5);
        }

        // Check for multi-word commands
        if (trimmed === 'whois adnan') {
            cmd = 'whois adnan';
        }

        if (cmd === 'clear') {
            output.innerHTML = '';
            return '';
        }

        if (commands[cmd]) {
            return commands[cmd](args);
        }

        if (cmd === 'ls') {
            return `
<span class="output-success">skills.txt</span>    <span class="output-success">certs.txt</span>     <span class="output-success">experience.log</span>
<span class="output-success">projects/</span>     <span class="output-success">soc/</span>          <span class="output-success">education.pdf</span>
<span class="output-success">contact.txt</span>   <span class="output-success">resume.pdf</span>    <span class="output-success">github.lnk</span>

<span class="output-subtitle">Use <span class="cmd-highlight">cat [filename]</span> to view. Example: <span class="cmd-highlight">cat skills.txt</span></span>`;
        }

        if (cmd.startsWith('cat ')) {
            const file = cmd.substring(4).trim();
            const fileMap = {
                'skills.txt': 'skills',
                'certs.txt': 'certs',
                'experience.log': 'experience',
                'education.pdf': 'education',
                'contact.txt': 'contact',
                'resume.pdf': 'resume',
                'readme.md': 'whoami'
            };
            if (fileMap[file]) {
                return commands[fileMap[file]]();
            }
            return `<span class="output-error">cat: ${file}: No such file or directory</span>`;
        }

        return `<span class="output-error">Command not found: ${trimmed}</span>
<span class="output-subtitle">Type <span class="cmd-highlight">help</span> to see available commands.</span>`;
    }

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const cmd = input.value;
            
            const cmdLine = document.createElement('div');
            cmdLine.className = 'terminal-output-line';
            cmdLine.innerHTML = `<span class="prompt">┌──(adnan㉿portfolio)-[~]</span><br><span class="prompt">└─$</span> <span class="command">${cmd}</span>`;
            output.appendChild(cmdLine);

            const result = executeCommand(cmd);
            if (result) {
                const resultLine = document.createElement('div');
                resultLine.className = 'terminal-output-line';
                resultLine.innerHTML = result;
                output.appendChild(resultLine);
            }

            body.scrollTop = body.scrollHeight;
            
            input.value = '';
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex] || '';
            }
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex] || '';
            } else {
                historyIndex = commandHistory.length;
                input.value = '';
            }
        }
    });

    body.addEventListener('click', () => input.focus());

    document.querySelectorAll('.cmd-highlight').forEach(el => {
        el.addEventListener('click', function(e) {
            e.stopPropagation();
            input.value = this.textContent;
            input.focus();
        });
    });
}

// Global clear function for the clear button
function clearTerminal() {
    const output = document.getElementById('terminal-output');
    if (output) output.innerHTML = '';
}