"use client";

import { useState, useEffect, FormEvent, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

type Tab = "resume" | "personal" | "experience" | "projects" | "skills";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  type: string;
  image?: string;
}

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tools: string[];
  image?: string;
}

interface SkillItem {
  id: string;
  name: string;
  category: 'technical' | 'competency' | 'certification';
}

const DEFAULT_IMAGES = [
  { value: "/concrete.jpg", label: "Concrete (Default)" },
  { value: "/biophilic.jpg", label: "Biophilic Urbanism" },
  { value: "/bronx-garage.jpg", label: "Bronx Garage" },
  { value: "/heritage_doc.jpg", label: "Heritage Documentation" },
  { value: "/project_controls.jpg", label: "Project Controls" },
  { value: "/ps-281.jpg", label: "PS-281" },
  { value: "/wunsch-twin.jpg", label: "Wunsch Twin" },
  { value: "/hero.jpg", label: "Hero Image" }
];

const ImageDropdown = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedImg = DEFAULT_IMAGES.find(img => img.value === value) || null;

  return (
    <div style={{ position: "relative" }}>
      <div 
        className="input-field" 
        style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: 12, minHeight: 46, padding: "8px 12px" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedImg ? (
           <>
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src={selectedImg.value} alt={selectedImg.label} style={{ width: 44, height: 30, objectFit: "cover", borderRadius: 4, border: "1px solid var(--color-border)" }} />
             <span style={{ fontSize: "0.9rem", color: "var(--color-text)" }}>{selectedImg.label}</span>
           </>
        ) : (
           <span style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>-- Custom Link / None --</span>
        )}
      </div>

      {isOpen && (
        <div 
          style={{
            position: "absolute", top: "100%", left: 0, right: 0, zIndex: 50,
            background: "var(--color-bg)", border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-sm)", marginTop: 4, maxHeight: 340, overflowY: "auto",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
          }}
        >
          <div 
            onClick={() => { onChange(""); setIsOpen(false); }}
            style={{ padding: "12px 16px", cursor: "pointer", borderBottom: "1px solid var(--color-border)", fontSize: "0.9rem", color: "var(--color-text-muted)" }}
          >
            -- Custom Link / None --
          </div>
          {DEFAULT_IMAGES.map(img => (
            <div
              key={img.value}
              onClick={() => { onChange(img.value); setIsOpen(false); }}
              style={{
                display: "flex", alignItems: "center", gap: 16, padding: "10px 16px",
                cursor: "pointer", borderBottom: "1px solid var(--color-border)",
                background: value === img.value ? "var(--color-bg-card)" : "transparent"
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.value} alt={img.label} style={{ width: 70, height: 48, objectFit: "cover", borderRadius: 4, border: "1px solid var(--color-border)" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--color-text)" }}>{img.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("resume");
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  // Resume state
  const [resumeUrl, setResumeUrl] = useState("");

  // Personal state
  const [personalData, setPersonalData] = useState(portfolioData.personal);

  // Experience state
  const [experiences, setExperiences] = useState<ExperienceItem[]>(
    portfolioData.experience.map((e) => ({ ...e }))
  );

  // Projects state
  const [projects, setProjects] = useState<ProjectItem[]>(
    portfolioData.projects.map((p) => {
      let image = p.image || "";
      if (!image) {
        if (p.id === "proj-1") image = "/wunsch-twin.jpg";
        else if (p.id === "proj-2") image = "/ps-281.jpg";
        else if (p.id === "proj-3") image = "/bronx-garage.jpg";
        else if (p.id === "proj-4") image = "/project_controls.jpg";
        else if (p.id === "proj-5") image = "/biophilic.jpg";
        else if (p.id === "proj-6") image = "/heritage_doc.jpg";
      }
      return { ...p, image };
    })
  );

  // Skills state
  const [skills, setSkills] = useState<SkillItem[]>(
    portfolioData.skills.map((s) => ({ ...s as SkillItem }))
  );

  // Check auth on mount
  useEffect(() => {
    fetch("/api/admin/check")
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(data.authenticated);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  // Load data when authenticated
  const loadData = useCallback(async () => {
    try {
      const [resumeRes, portfolioRes] = await Promise.all([
        fetch("/api/admin/resume"),
        fetch("/api/admin/portfolio"),
      ]);

      if (resumeRes.ok) {
        const data = await resumeRes.json();
        setResumeUrl(data.url || "");
      }

      if (portfolioRes.ok) {
        const data = await portfolioRes.json();
        if (data.personal) {
          setPersonalData({ ...portfolioData.personal, ...data.personal });
        }
        if (data.experience) {
          setExperiences(data.experience as ExperienceItem[]);
        }
        if (data.projects) {
          setProjects((data.projects as ProjectItem[]).map((p) => {
            let image = p.image || "";
            if (!image) {
              if (p.id === "proj-1") image = "/wunsch-twin.jpg";
              else if (p.id === "proj-2") image = "/ps-281.jpg";
              else if (p.id === "proj-3") image = "/bronx-garage.jpg";
              else if (p.id === "proj-4") image = "/project_controls.jpg";
              else if (p.id === "proj-5") image = "/biophilic.jpg";
              else if (p.id === "proj-6") image = "/heritage_doc.jpg";
            }
            return { ...p, image };
          }));
        }
        if (data.skills) {
          setSkills(data.skills as SkillItem[]);
        }
      }
    } catch (err) {
      console.error("Failed to load data:", err);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, loadData]);

  // ─── Login handler ───
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        setPassword("");
      } else {
        setLoginError("Invalid password");
      }
    } catch {
      setLoginError("Connection failed");
    }
    setLoginLoading(false);
  };

  // ─── Logout handler ───
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
  };

  // ─── Save handlers ───
  const saveResume = async () => {
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/admin/resume", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: resumeUrl }),
      });
      if (res.ok) {
        setSaveStatus("saved");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to save");
        setSaveStatus("error");
      }
    } catch {
      alert("Network error");
      setSaveStatus("error");
    }
    setTimeout(() => setSaveStatus("idle"), 2000);
  };

  const savePortfolio = async () => {
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/admin/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personal: personalData,
          experience: experiences,
          projects: projects,
          skills: skills,
        }),
      });
      if (res.ok) {
        setSaveStatus("saved");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to save");
        setSaveStatus("error");
      }
    } catch {
      alert("Network error");
      setSaveStatus("error");
    }
    setTimeout(() => setSaveStatus("idle"), 2000);
  };

  // ─── Experience CRUD ───
  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: `exp-${Date.now()}`,
        role: "",
        company: "",
        location: "",
        period: "",
        description: [""],
        type: "work",
      },
    ]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((e) => e.id !== id));
  };

  const moveExperience = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      const newExperiences = [...experiences];
      [newExperiences[index - 1], newExperiences[index]] = [newExperiences[index], newExperiences[index - 1]];
      setExperiences(newExperiences);
    } else if (direction === 'down' && index < experiences.length - 1) {
      const newExperiences = [...experiences];
      [newExperiences[index + 1], newExperiences[index]] = [newExperiences[index], newExperiences[index + 1]];
      setExperiences(newExperiences);
    }
  };

  const updateExperience = (
    id: string,
    field: string,
    value: string | string[]
  ) => {
    setExperiences(
      experiences.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  // ─── Project CRUD ───
  const addProject = () => {
    setProjects([
      ...projects,
      {
        id: `proj-${Date.now()}`,
        title: "",
        category: "",
        description: "",
        tools: [],
      },
    ]);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const moveProject = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      const newProjects = [...projects];
      [newProjects[index - 1], newProjects[index]] = [newProjects[index], newProjects[index - 1]];
      setProjects(newProjects);
    } else if (direction === 'down' && index < projects.length - 1) {
      const newProjects = [...projects];
      [newProjects[index + 1], newProjects[index]] = [newProjects[index], newProjects[index + 1]];
      setProjects(newProjects);
    }
  };

  const updateProject = (id: string, field: string, value: string | string[]) => {
    setProjects(
      projects.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  // ─── Skills CRUD ───
  const addSkill = (category: 'technical' | 'competency' | 'certification') => {
    setSkills([...skills, { id: `skill-${Date.now()}`, name: "", category }]);
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter((s) => s.id !== id));
  };

  const updateSkill = (id: string, name: string) => {
    setSkills(skills.map((s) => (s.id === id ? { ...s, name } : s)));
  };

  // ─── Loading state ───
  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--color-bg)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--color-text-muted)",
            letterSpacing: "0.1em",
          }}
        >
          Checking authentication...
        </div>
      </div>
    );
  }

  // ─── Login form ───
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--color-bg)",
          padding: 24,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: "100%",
            maxWidth: 400,
            padding: 36,
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                border: "1.5px solid var(--color-accent)",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="1.5"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                Admin Panel
              </h1>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.5625rem",
                  letterSpacing: "0.12em",
                  color: "var(--color-text-muted)",
                  textTransform: "uppercase",
                }}
              >
                Portfolio Management
              </div>
            </div>
          </div>

          <form onSubmit={handleLogin}>
            <label
              htmlFor="admin-password"
              style={{
                display: "block",
                fontFamily: "var(--font-mono)",
                fontSize: "0.625rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
                marginBottom: 8,
              }}
            >
              Password
            </label>
            <div style={{ position: "relative", marginBottom: 16 }}>
              <input
                type={showPassword ? "text" : "password"}
                id="admin-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter admin password"
                autoComplete="current-password"
                autoFocus
                style={{ marginBottom: 0, paddingRight: "40px" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--color-text-muted)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>

            {loginError && (
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#e57373",
                  marginBottom: 12,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={loginLoading}
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "12px 24px",
                opacity: loginLoading ? 0.7 : 1,
              }}
            >
              {loginLoading ? "Authenticating..." : "Sign In"}
            </button>
          </form>

          <div
            style={{
              marginTop: 24,
              textAlign: "center",
              fontFamily: "var(--font-mono)",
              fontSize: "0.625rem",
              color: "var(--color-text-muted)",
              letterSpacing: "0.06em",
            }}
          >
            <a
              href="/"
              style={{ color: "var(--color-accent)" }}
            >
              ← Back to portfolio
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── Admin dashboard ───
  const tabs: { key: Tab; label: string }[] = [
    { key: "resume", label: "Résumé" },
    { key: "personal", label: "Personal" },
    { key: "experience", label: "Experience" },
    { key: "projects", label: "Projects" },
    { key: "skills", label: "Skills" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-bg)",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
            paddingBottom: 16,
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a
              href="/"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1rem",
                fontWeight: 700,
              }}
            >
              LATHEESH REDDY
            </a>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.5625rem",
                letterSpacing: "0.12em",
                color: "var(--color-accent)",
                textTransform: "uppercase",
                padding: "2px 8px",
                background: "var(--color-accent-muted)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              Admin
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <AnimatePresence>
              {saveStatus !== "idle" && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    color:
                      saveStatus === "saved"
                        ? "#81c784"
                        : saveStatus === "error"
                        ? "#e57373"
                        : "var(--color-text-muted)",
                  }}
                >
                  {saveStatus === "saving" && "Saving..."}
                  {saveStatus === "saved" && "✓ Saved"}
                  {saveStatus === "error" && "✗ Error saving"}
                </motion.span>
              )}
            </AnimatePresence>
            <button
              onClick={handleLogout}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.625rem",
                letterSpacing: "0.1em",
                color: "var(--color-text-muted)",
                background: "none",
                border: "1px solid var(--color-border)",
                padding: "6px 14px",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#e57373";
                e.currentTarget.style.color = "#e57373";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.color = "var(--color-text-muted)";
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 0,
            marginBottom: 32,
            borderBottom: "1px solid var(--color-border)",
            overflowX: "auto",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "10px 18px",
                background: "none",
                border: "none",
                borderBottom:
                  activeTab === tab.key
                    ? "2px solid var(--color-accent)"
                    : "2px solid transparent",
                color:
                  activeTab === tab.key
                    ? "var(--color-accent)"
                    : "var(--color-text-muted)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─── Tab content ─── */}

        {/* Resume tab */}
        {activeTab === "resume" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              style={{
                padding: 28,
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                Resume PDF URL
              </h3>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-text-secondary)",
                  marginBottom: 20,
                }}
              >
                Paste a public URL to your resume PDF (e.g. from Google Drive,
                Dropbox, or a direct link). This will be embedded live on the
                portfolio.
              </p>

              <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
                <div style={{ flex: 1 }}>
                  <label
                    htmlFor="resume-url"
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--color-text-muted)",
                      marginBottom: 8,
                    }}
                  >
                    PDF URL
                  </label>
                  <input
                    type="url"
                    id="resume-url"
                    value={resumeUrl}
                    onChange={(e) => setResumeUrl(e.target.value)}
                    className="input-field"
                    placeholder="https://example.com/resume.pdf"
                  />
                </div>
                <button
                  onClick={saveResume}
                  className="btn-primary"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Save URL
                </button>
              </div>

              {resumeUrl && (
                <div style={{ marginTop: 20 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      color: "var(--color-text-muted)",
                      marginBottom: 8,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Preview
                  </div>
                  <iframe
                    src={resumeUrl.includes("drive.google.com/file/d/") ? `${resumeUrl.replace(/\/view.*$/, "/preview")}#toolbar=0` : `${resumeUrl}#toolbar=0`}
                    style={{
                      width: "100%",
                      height: 400,
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                    }}
                    title="Resume preview"
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Personal tab */}
        {activeTab === "personal" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              style={{
                padding: 28,
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
                {[
                  { key: "name", label: "Full Name" },
                  { key: "firstName", label: "First Name (Display)" },
                  { key: "lastName", label: "Last Name (Display)" },
                  { key: "title", label: "Professional Title" },
                  { key: "email", label: "Email" },
                  { key: "phone", label: "Phone" },
                  { key: "location", label: "Location" },
                  { key: "linkedin", label: "LinkedIn URL" },
                ].map((field) => (
                  <div key={field.key}>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.625rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--color-text-muted)",
                        marginBottom: 6,
                      }}
                    >
                      {field.label}
                    </label>
                    <input
                      type="text"
                      value={
                        (personalData as Record<string, string>)[field.key] || ""
                      }
                      onChange={(e) =>
                        setPersonalData({
                          ...personalData,
                          [field.key]: e.target.value,
                        })
                      }
                      className="input-field"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-text-muted)",
                    marginBottom: 6,
                  }}
                >
                  Tagline
                </label>
                <textarea
                  value={personalData.tagline}
                  onChange={(e) =>
                    setPersonalData({
                      ...personalData,
                      tagline: e.target.value,
                    })
                  }
                  className="input-field"
                  rows={3}
                />
              </div>

              <button
                onClick={savePortfolio}
                className="btn-primary"
                style={{ alignSelf: "flex-start", marginTop: 8 }}
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        )}

        {/* Experience tab */}
        {activeTab === "experience" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="admin-cards-grid">
            {experiences.map((exp, i) => (
              <div
                key={exp.id}
                style={{
                  padding: 24,
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      color: "var(--color-accent)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    EXPERIENCE #{i + 1}
                  </span>
                  <div style={{ display: "flex", gap: 8 }}>
                    {i > 0 && (
                      <button
                        onClick={() => moveExperience(i, "up")}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.625rem",
                          color: "var(--color-text)",
                          background: "none",
                          border: "1px solid var(--color-border)",
                          padding: "4px 12px",
                          borderRadius: "var(--radius-sm)",
                          cursor: "pointer",
                        }}
                      >
                        ↑ Move Up
                      </button>
                    )}
                    {i < experiences.length - 1 && (
                      <button
                        onClick={() => moveExperience(i, "down")}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.625rem",
                          color: "var(--color-text)",
                          background: "none",
                          border: "1px solid var(--color-border)",
                          padding: "4px 12px",
                          borderRadius: "var(--radius-sm)",
                          cursor: "pointer",
                        }}
                      >
                        ↓ Move Down
                      </button>
                    )}
                    <button
                      onClick={() => removeExperience(exp.id)}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.625rem",
                        color: "#e57373",
                        background: "none",
                        border: "1px solid #e57373",
                        padding: "4px 12px",
                        borderRadius: "var(--radius-sm)",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 12 }}>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.5625rem",
                        color: "var(--color-text-muted)",
                        marginBottom: 4,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      Role
                    </label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) =>
                        updateExperience(exp.id, "role", e.target.value)
                      }
                      className="input-field"
                      placeholder="Job Title"
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.5625rem",
                        color: "var(--color-text-muted)",
                        marginBottom: 4,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(exp.id, "company", e.target.value)
                      }
                      className="input-field"
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.5625rem",
                        color: "var(--color-text-muted)",
                        marginBottom: 4,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) =>
                        updateExperience(exp.id, "location", e.target.value)
                      }
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.5625rem",
                        color: "var(--color-text-muted)",
                        marginBottom: 4,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      Period
                    </label>
                    <input
                      type="text"
                      value={exp.period}
                      onChange={(e) =>
                        updateExperience(exp.id, "period", e.target.value)
                      }
                      className="input-field"
                      placeholder="e.g., June 2026 - August 2026"
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.5625rem",
                          color: "var(--color-text-muted)",
                          marginBottom: 4,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                        }}
                      >
                        Image URL (Custom Link)
                      </label>
                      <input
                        type="text"
                        value={exp.image || ""}
                        onChange={(e) =>
                          updateExperience(exp.id, "image", e.target.value)
                        }
                        className="input-field"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.5625rem",
                          color: "var(--color-text-muted)",
                          marginBottom: 4,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                        }}
                      >
                        Or Select Default Image
                      </label>
                      <ImageDropdown
                        value={exp.image || ""}
                        onChange={(val) =>
                          updateExperience(exp.id, "image", val)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.5625rem",
                      color: "var(--color-text-muted)",
                      marginBottom: 4,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    Description (one bullet point per line)
                  </label>
                  <textarea
                    value={exp.description.join("\n")}
                    onChange={(e) =>
                      updateExperience(
                        exp.id,
                        "description",
                        e.target.value.split("\n")
                      )
                    }
                    className="input-field"
                    rows={8}
                    placeholder="Each line becomes a bullet point"
                  />
                </div>
              </div>
            ))}
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={addExperience} className="btn-outline">
                + Add Experience
              </button>
              <button onClick={savePortfolio} className="btn-primary">
                Save All
              </button>
            </div>
          </motion.div>
        )}

        {/* Projects tab */}
        {activeTab === "projects" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="admin-cards-grid">
            {projects.map((proj, i) => (
              <div
                key={proj.id}
                style={{
                  padding: 24,
                  background: "var(--color-bg-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      color: "var(--color-accent)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    PROJECT #{i + 1}
                  </span>
                  <div style={{ display: "flex", gap: 8 }}>
                    {i > 0 && (
                      <button
                        onClick={() => moveProject(i, "up")}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.625rem",
                          color: "var(--color-text)",
                          background: "none",
                          border: "1px solid var(--color-border)",
                          padding: "4px 12px",
                          borderRadius: "var(--radius-sm)",
                          cursor: "pointer",
                        }}
                      >
                        ↑ Move Up
                      </button>
                    )}
                    {i < projects.length - 1 && (
                      <button
                        onClick={() => moveProject(i, "down")}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.625rem",
                          color: "var(--color-text)",
                          background: "none",
                          border: "1px solid var(--color-border)",
                          padding: "4px 12px",
                          borderRadius: "var(--radius-sm)",
                          cursor: "pointer",
                        }}
                      >
                        ↓ Move Down
                      </button>
                    )}
                    <button
                      onClick={() => removeProject(proj.id)}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.625rem",
                        color: "#e57373",
                        background: "none",
                        border: "1px solid #e57373",
                        padding: "4px 12px",
                        borderRadius: "var(--radius-sm)",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 12 }}>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.5625rem",
                        color: "var(--color-text-muted)",
                        marginBottom: 4,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) =>
                        updateProject(proj.id, "title", e.target.value)
                      }
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.5625rem",
                        color: "var(--color-text-muted)",
                        marginBottom: 4,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      Category
                    </label>
                    <input
                      type="text"
                      value={proj.category}
                      onChange={(e) =>
                        updateProject(proj.id, "category", e.target.value)
                      }
                      className="input-field"
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.5625rem",
                          color: "var(--color-text-muted)",
                          marginBottom: 4,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                        }}
                      >
                        Image URL (Custom Link)
                      </label>
                      <input
                        type="text"
                        value={proj.image || ""}
                        onChange={(e) =>
                          updateProject(proj.id, "image", e.target.value)
                        }
                        className="input-field"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.5625rem",
                          color: "var(--color-text-muted)",
                          marginBottom: 4,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                        }}
                      >
                        Or Select Default Image
                      </label>
                      <ImageDropdown
                        value={proj.image || ""}
                        onChange={(val) =>
                          updateProject(proj.id, "image", val)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: 12 }}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.5625rem",
                      color: "var(--color-text-muted)",
                      marginBottom: 4,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    Description
                  </label>
                  <textarea
                    value={proj.description}
                    onChange={(e) =>
                      updateProject(proj.id, "description", e.target.value)
                    }
                    className="input-field"
                    rows={4}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.5625rem",
                      color: "var(--color-text-muted)",
                      marginBottom: 4,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    Tools (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={proj.tools.join(", ")}
                    onChange={(e) =>
                      updateProject(
                        proj.id,
                        "tools",
                        e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                      )
                    }
                    className="input-field"
                    placeholder="e.g., Revit, AutoCAD, Primavera P6"
                  />
                </div>
              </div>
            ))}
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={addProject} className="btn-outline">
                + Add Project
              </button>
              <button onClick={savePortfolio} className="btn-primary">
                Save All
              </button>
            </div>
          </motion.div>
        )}

        {/* Skills tab */}
        {activeTab === "skills" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              style={{
                padding: 28,
                background: "var(--color-bg-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                marginBottom: 16
              }}
            >
              {[
                { category: 'technical', title: 'Technical Skills' },
                { category: 'competency', title: 'Core Competencies' },
                { category: 'certification', title: 'Certifications' }
              ].map(group => {
                const categorySkills = skills.filter(s => s.category === group.category);
                return (
                  <div key={group.category} style={{ marginBottom: 36 }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", marginBottom: 16, borderBottom: "1px solid var(--color-border)", paddingBottom: 8 }}>{group.title}</h3>
                    <div className="admin-grid-2">
                      {categorySkills.map(skill => (
                        <div key={skill.id} style={{ display: 'flex', gap: 8 }}>
                          <input 
                            type="text"
                            value={skill.name}
                            onChange={e => updateSkill(skill.id, e.target.value)}
                            className="input-field"
                            placeholder="Skill Name"
                          />
                          <button 
                            onClick={() => removeSkill(skill.id)} 
                            style={{ 
                              color: "#e57373", 
                              padding: "0 14px", 
                              border: "1px solid #e57373", 
                              borderRadius: "var(--radius-sm)", 
                              cursor: "pointer", 
                              background: "transparent",
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.75rem"
                            }}
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={() => addSkill(group.category as 'technical' | 'competency' | 'certification')} 
                      className="btn-outline" 
                      style={{ marginTop: 8 }}
                    >
                      + Add {group.title}
                    </button>
                  </div>
                )
              })}
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={savePortfolio} className="btn-primary">
                Save All
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
