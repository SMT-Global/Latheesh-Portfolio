import clientPromise from "./mongodb";

export interface PortfolioOverrides {
  personal?: Record<string, string>;
  experience?: Array<Record<string, unknown>>;
  projects?: Array<Record<string, unknown>>;
  skills?: Array<Record<string, unknown>>;
  education?: Array<Record<string, unknown>>;
  leadership?: string[];
}

export async function getResumeUrl(): Promise<string> {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");
    const doc = await db.collection("resume").findOne({ _id: "resume-url" as any });
    return doc?.url || "";
  } catch (err) {
    console.error("Failed to fetch resume URL from MongoDB:", err);
    return "";
  }
}

export async function setResumeUrl(url: string): Promise<void> {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");
    await db.collection("resume").updateOne(
      { _id: "resume-url" as any },
      { $set: { url, updatedAt: new Date().toISOString() } },
      { upsert: true }
    );
  } catch (err) {
    console.error("Failed to update resume URL in MongoDB:", err);
    throw err;
  }
}

export async function getOverrides(): Promise<PortfolioOverrides> {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");
    const doc = await db.collection("overrides").findOne({ _id: "portfolio-overrides" as any });
    if (doc) {
      const { _id, ...data } = doc;
      return data;
    }
  } catch (err) {
    console.error("Failed to fetch overrides from MongoDB:", err);
  }
  return {};
}

export async function setOverrides(overrides: PortfolioOverrides): Promise<void> {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");
    await db.collection("overrides").updateOne(
      { _id: "portfolio-overrides" as any },
      { $set: overrides },
      { upsert: true }
    );
  } catch (err) {
    console.error("Failed to update overrides in MongoDB:", err);
    throw err;
  }
}
