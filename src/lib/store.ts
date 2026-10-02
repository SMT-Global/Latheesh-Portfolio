import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const RESUME_FILE = path.join(DATA_DIR, "resume.json");
const PORTFOLIO_FILE = path.join(DATA_DIR, "portfolio-overrides.json");

function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    // Ignore EROFS errors on Vercel read-only filesystem
    console.warn("Could not create data dir, likely read-only filesystem (Vercel)");
  }
}

// ─── Resume URL store ───

export function getResumeUrl(): string {
  ensureDataDir();
  try {
    if (fs.existsSync(RESUME_FILE)) {
      const data = JSON.parse(fs.readFileSync(RESUME_FILE, "utf-8"));
      return data.url || "";
    }
  } catch {
    // File doesn't exist or is malformed
  }
  return "";
}

export function setResumeUrl(url: string): void {
  ensureDataDir();
  fs.writeFileSync(RESUME_FILE, JSON.stringify({ url, updatedAt: new Date().toISOString() }));
}

// ─── Portfolio overrides store ───

export interface PortfolioOverrides {
  personal?: Record<string, string>;
  experience?: Array<Record<string, unknown>>;
  projects?: Array<Record<string, unknown>>;
  skills?: Array<Record<string, unknown>>;
  education?: Array<Record<string, unknown>>;
  leadership?: string[];
}

export function getOverrides(): PortfolioOverrides {
  ensureDataDir();
  try {
    if (fs.existsSync(PORTFOLIO_FILE)) {
      return JSON.parse(fs.readFileSync(PORTFOLIO_FILE, "utf-8"));
    }
  } catch {
    // File doesn't exist or is malformed
  }
  return {};
}

export function setOverrides(overrides: PortfolioOverrides): void {
  ensureDataDir();
  fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(overrides, null, 2));
}
