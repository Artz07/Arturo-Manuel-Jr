/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  ChevronRight, 
  Menu, 
  X, 
  UserCog, 
  Ticket, 
  Network, 
  Cloud, 
  ShieldCheck, 
  Headset, 
  ExternalLink,
  Award,
  Sun,
  Moon,
  Clock as ClockIcon
} from "lucide-react";

// --- Components ---

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border-accent/20 text-accent font-mono text-xs">
      <ClockIcon size={14} className="animate-pulse" />
      <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
    </div>
  );
};

const ThemeToggle = ({ darkMode, toggle }: { darkMode: boolean; toggle: () => void }) => {
  return (
    <button 
      onClick={toggle}
      className="p-2.5 rounded-full glass border-accent/20 text-accent hover:bg-accent hover:text-bg-primary transition-all active:scale-95"
      aria-label="Toggle Theme"
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

const Navbar = ({ darkMode, toggleTheme }: { darkMode: boolean; toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "Certifications", href: "#certs" },
    { name: "Experience", href: "#experience" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    // Explicit scroll logic for maximum reliability on mobile
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Estimated navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      // Update URL hash without jumping
      window.history.pushState(null, "", href);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-[70] transition-all duration-300 ${scrolled || isOpen ? "py-4 bg-bg-primary/80 backdrop-blur-lg border-b border-border-subtle" : "py-6 bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative h-full">
        <div className="flex items-center gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-display font-bold tracking-tighter relative z-[100]"
          >
            Arturo<span className="text-accent animate-pulse">.</span>
          </motion.div>
          <div className="hidden lg:block">
            <Clock />
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 relative z-[100]">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium text-text-secondary hover:text-accent transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          <ThemeToggle darkMode={darkMode} toggle={toggleTheme} />
          <motion.a
            href="mailto:artzmanueloffic@gmail.com"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-5 py-2.5 bg-accent text-bg-primary font-bold text-sm rounded-full hover:shadow-[0_0_20px_rgba(0,255,153,0.4)] transition-all active:scale-95"
          >
            Get in touch
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden relative z-[100]">
          <ThemeToggle darkMode={darkMode} toggle={toggleTheme} />
          <button 
            className="text-text-primary p-2 focus:outline-none bg-text-primary/5 rounded-xl hover:bg-text-primary/10 transition-all" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} className="text-accent" /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 right-0 top-[72px] mx-6 z-[60] md:hidden glass-card rounded-[32px] overflow-hidden shadow-2xl border border-white/10"
          >
            <div className="flex flex-col p-6 gap-2">
              <div className="flex justify-center mb-4">
                <Clock />
              </div>
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a 
                    key={link.name} 
                    href={link.href} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="flex items-center justify-between text-lg font-display font-bold text-text-primary hover:text-accent transition-all py-4 px-4 rounded-xl hover:bg-accent/5 active:bg-accent/10"
                  >
                    {link.name}
                    <ChevronRight size={18} className="text-accent/50" />
                  </motion.a>
                ))}
              </nav>

              <div className="pt-4 mt-2 border-t border-white/5 space-y-4">
                <motion.a 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  href="mailto:artzmanueloffic@gmail.com"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-accent text-bg-primary font-bold rounded-xl shadow-lg active:scale-[0.98] transition-all"
                >
                  <Mail size={18} /> Get in touch
                </motion.a>
                
                <div className="flex justify-center gap-6 pt-2">
                  <a href="https://linkedin.com/in/arturo-manuel-jr-4a05ba320" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors">
                    <Linkedin size={22} />
                  </a>
                  <a href="mailto:artzmanueloffic@gmail.com" className="text-text-muted hover:text-accent transition-colors">
                    <Mail size={22} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="min-h-screen scroll-mt-24 pt-32 pb-20 px-6 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto gap-12 lg:gap-20">
      <div className="flex-1 text-center lg:text-left">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-accent font-mono text-sm tracking-widest uppercase mb-4"
        >
          Aspiring IT Support Specialist
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-8xl font-display font-bold leading-[1.1] lg:leading-[0.9] tracking-tighter mb-8"
        >
          Hello, I'm <br />
          <span className="glow-text">Arturo Manuel Jr.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-text-secondary text-lg md:text-xl max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
        >
          Entry-level IT Support / Service Desk professional with a Bachelor's degree in IT and hands-on experience in Active Directory, Azure AD, and Jira. Cum Laude graduate dedicated to transforming complex technical problems into simple, user-focused solutions.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-8 justify-center lg:justify-start items-center"
        >
          <a 
            href="/Resume_Arturo Manuel_V1.pdf" 
            download="Resume_Arturo Manuel_V1.pdf"
            className="flex items-center gap-2 px-8 py-4 bg-accent text-bg-primary font-bold rounded-full hover:shadow-[0_0_25px_rgba(0,255,153,0.5)] transition-all group pointer-events-auto"
          >
            Download Resume <Download size={18} className="group-hover:translate-y-1 transition-transform" />
          </a>
          <div className="flex items-center gap-8">
            <a 
              href="https://linkedin.com/in/arturo-manuel-jr-4a05ba320" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="mailto:artzmanueloffic@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors"
            >
              <Mail size={24} />
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
        className="relative"
      >
        <div className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] rounded-[40px] overflow-hidden border-4 border-accent/20 relative z-10 bg-bg-secondary">
          <img 
            src="Art.jpg" 
            alt="Arturo Manuel Jr." 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.onerror = null; // Prevent infinite loop
              e.currentTarget.src = "https://picsum.photos/seed/portrait/800/800";
            }}
          />
        </div>
        {/* Background decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 blur-[100px] rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 blur-[100px] rounded-full" />
        <motion.div 
          animate={{ 
            rotate: 360,
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-4 -left-4 -right-4 -bottom-4 border-2 border-dashed border-accent/30 rounded-[50px] z-0" 
        />
      </motion.div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: "GWA Score", value: "1.55" },
    { label: "IT Certifications", value: "5+" },
    { label: "Active Projs", value: "10+" },
    { label: "Honors", value: "Cum Laude" }
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto border-y border-border-subtle">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <h3 className="text-3xl md:text-4xl lg:text-6xl font-display font-bold text-accent mb-2">{stat.value}</h3>
            <p className="text-text-muted text-[10px] md:text-xs font-mono uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Skills = () => {
  const skills = [
    { name: "Active Directory", desc: "User management, password resets, and Group Policy implementation.", icon: UserCog },
    { name: "Service Desk", desc: "Jira incident logging, tracking, and technical documentation.", icon: Ticket },
    { name: "Networking", desc: "IP addressing, DNS, DHCP, and virtualized environment config.", icon: Network },
    { name: "Azure AD", desc: "Cloud-based identity solutions and hybrid environment management.", icon: Cloud },
    { name: "Cybersecurity", desc: "Security protocols and best practices for system protection.", icon: ShieldCheck },
    { name: "Technical Support", desc: "Troubleshooting hardware/software and user communication.", icon: Headset },
  ];

  return (
    <section id="skills" className="py-32 px-6 max-w-7xl mx-auto scroll-mt-24">
      <div className="mb-16">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-accent font-mono text-sm tracking-widest uppercase mb-4"
        >
          Specialization
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-display font-bold"
        >
          Technical <span className="text-text-muted/30">Expertise</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, i) => (
          <motion.div 
            key={skill.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 glass-card rounded-3xl group"
          >
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-bg-primary transition-all duration-300">
              <skill.icon size={28} />
            </div>
            <h3 className="text-xl font-display font-bold mb-3">{skill.name}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">{skill.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Certifications = () => {
  const certs = [
    { name: "Networking Devices and Initial Configuration", provider: "Cisco Networking Academy", date: "2026", link: "https://www.credly.com/badges/de445b4e-6155-4a10-8e20-8098aefe51c8" },
    { name: "Network Addressing and Basic Troubleshooting", provider: "Cisco Networking Academy", date: "2026", link: "https://www.credly.com/badges/e5163843-2333-413d-9193-54ff6cd43346" },
    { name: "Google IT Support Professional", provider: "Google/Coursera", date: "2025", link: "https://coursera.org/share/2dffe8b18c3d502303d2a592d4d4ac41" },
    { name: "Networking Basics", provider: "Cisco Networking Academy", date: "2025", link: "https://www.credly.com/badges/eefeb927-2d13-449e-bc20-6d32dd3d3f5e" },
    { name: "Introduction to Cybersecurity", provider: "Cisco Networking Academy", date: "2025", link: "https://www.credly.com/badges/7164ec89-07a5-4fc1-a4d2-482b732339f7" },
    { name: "Web Development Bootcamp", provider: "Accenture | Udemy", date: "2024", link: "#" },
  ];

  return (
    <section id="certs" className="py-32 px-6 max-w-7xl mx-auto bg-text-primary/2 rounded-[60px] my-10 scroll-mt-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-accent font-mono text-sm tracking-widest uppercase mb-4"
          >
            Achievements
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl font-display font-bold"
          >
            Professional <br />
            <span className="text-text-muted/30">Certifications</span>
          </motion.h2>
        </div>
        <div className="text-right">
          <Award className="text-accent/20 w-24 h-24" />
        </div>
      </div>

      <div className="space-y-4">
        {certs.map((cert, i) => (
          <motion.a
            key={cert.name}
            href={cert.link}
            target="_blank"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group flex items-center justify-between p-6 bg-text-primary/5 rounded-2xl hover:bg-text-primary/10 transition-all border border-border-subtle hover:border-accent/30"
          >
            <div>
              <h4 className="font-display font-bold text-lg md:text-xl group-hover:text-accent transition-colors text-text-primary">{cert.name}</h4>
              <p className="text-text-muted text-sm mt-1">{cert.provider} • {cert.date}</p>
            </div>
            <div className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center group-hover:bg-accent group-hover:text-bg-primary transition-all">
              <ExternalLink size={16} />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

const Experience = () => {
  const experiences = [
    {
      title: "Data Technician (Part-time)",
      company: "IRIS R&D Group INC",
      period: "Jan 2026 - April 2026",
      desc: "Conducted Quality Assurance, Data Annotation, and Labelling of pavement condition data. Managed data workflows and annotation guidelines."
    },
    {
      title: "Associate Software Engineer",
      company: "Accenture",
      period: "Nov 2024 - Jan 2025",
      desc: "Specialized in building responsive web applications using Angular, TypeScript, and modern JavaScript. Collaborated within Agile teams."
    },
    {
      title: "IT Support Intern",
      company: "Accenture",
      period: "March 2024 - May 2024",
      desc: "Provided Level 1 technical support, assisted with Active Directory tasks, and used Jira for incident management in a corporate environment."
    }
  ];

  return (
    <section id="experience" className="py-32 px-6 max-w-7xl mx-auto overflow-hidden scroll-mt-24">
      <div className="mb-20 text-center">
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">Work History</h2>
        <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
      </div>

      <div className="relative">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-full bg-accent/5 blur-[120px] pointer-events-none -z-10" />

        {/* Central Line - Transitions from left (mobile) to center (tablet/desktop) at md */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-text-primary/10 to-transparent -translate-x-1/2" />

        <div className="space-y-12 md:space-y-24">
          {experiences.map((exp, i) => (
            <motion.div 
              key={exp.title}
              className={`relative flex items-center justify-start md:justify-between w-full ${
                i % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-8 md:left-1/2 w-6 h-6 bg-accent rounded-full border-4 border-bg-primary shadow-[0_0_20px_rgba(0,255,153,0.5)] -translate-x-1/2 z-10" />

              {/* Content Card */}
              <motion.div 
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full md:w-[45%] pl-20 md:pl-0 ${
                  i % 2 === 0 ? "md:text-right" : "md:text-left"
                }`}
              >
                <div className="p-8 glass-card rounded-[40px] group transition-all duration-700 hover:shadow-[0_30px_70px_rgba(0,0,0,0.2)] border border-white/5 relative">
                  {/* Connection indicator for desktop */}
                  <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-10 h-0.5 bg-text-primary/10 -z-10 ${
                    i % 2 === 0 ? "-left-10" : "-right-10"
                  }`} />

                  <div className={`flex flex-col ${i % 2 === 0 ? "md:items-end" : "md:items-start"}`}>
                    <span className="text-accent font-mono text-xs mb-4 px-4 py-1.5 bg-accent/10 rounded-full inline-block tracking-widest uppercase">{exp.period}</span>
                    <h3 className="text-2xl md:text-4xl font-display font-bold mb-2 group-hover:text-accent transition-colors text-text-primary leading-tight">{exp.title}</h3>
                    <p className="text-accent font-medium mb-6 text-lg">{exp.company}</p>
                    <p className="text-text-muted text-sm md:text-base leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">{exp.desc}</p>
                  </div>
                </div>
              </motion.div>

              {/* Empty Spacer */}
              <div className="hidden md:block w-[45%]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border-subtle">
      <div className="max-w-7xl mx-auto text-center">
        <div className="text-text-muted text-xs font-mono tracking-widest uppercase opacity-70">
          &copy; {new Date().getFullYear()} Arturo Manuel Jr. • Turning complex problems into simple solutions.
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("light");
  };

  return (
    <div className={`overflow-x-hidden selection:bg-accent selection:text-bg-primary ${darkMode ? "dark" : "light"}`}>
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[60] origin-left" 
        style={{ scaleX }}
      />
      
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Stats />
        <Skills />
        <Certifications />
        <Experience />
        
        {/* Call to Action */}
        <section className="py-20 px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto glass p-12 md:p-20 rounded-[40px] text-center border-accent/20 border-2"
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 text-text-primary">Ready to elevate your <span className="text-accent underline underline-offset-8">Service Desk?</span></h2>
            <p className="text-text-secondary text-lg mb-12 max-w-xl mx-auto">I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open!</p>
            <a 
              href="mailto:artzmanueloffic@gmail.com"
              className="inline-flex items-center gap-3 px-10 py-5 bg-accent text-bg-primary font-bold text-xl rounded-full hover:shadow-[0_0_50px_rgba(0,255,153,0.3)] transition-all hover:scale-105"
            >
              Get in touch <Mail size={24} />
            </a>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
