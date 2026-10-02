export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  type: "work" | "academic" | "leadership";
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tools: string[];
  image?: string;
  link?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: "technical" | "competency" | "certification";
  icon?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  gpa: string;
  period: string;
  location: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    firstName: string;
    lastName: string;
    title: string;
    tagline: string;
    email: string;
    phone: string;
    location: string;
    resumeUrl: string;
    linkedin?: string;
    website?: string;
  };
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  leadership: string[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Challa Sai Latheesh Reddy",
    firstName: "Latheesh",
    lastName: "Reddy",
    title: "Construction Management & Architecture",
    tagline:
      "Building the future through digital twins, BIM integration, and data-driven infrastructure management - from blueprint to built environment.",
    email: "latheeshreddy@nyu.edu",
    phone: "9296202030",
    location: "New York City, USA",
    resumeUrl: "",
    linkedin: "https://linkedin.com/in/latheeshreddy",
  },
  education: [
    {
      id: "edu-1",
      institution: "New York University",
      degree: "M.S. in Construction Management",
      gpa: "3.945 / 4.0",
      period: "Sept 2025 - Present",
      location: "Tandon School of Engineering, NYC",
    },
    {
      id: "edu-2",
      institution: "M S Ramaiah Institute of Technology",
      degree: "Bachelor of Architecture",
      gpa: "3.5 / 4.0",
      period: "Jan 2021 - June 2025",
      location: "Bangalore, India",
    },
  ],
  experience: [
    {
      id: "exp-1",
      role: "Field Intern",
      company: "New York State Department of Transportation (NYSDOT)",
      location: "New York",
      period: "June 2026 - August 2026",
      description: [
        "Conducted field inspections and condition assessments of culvert and stormwater infrastructure across New York State, documenting asset conditions and identifying maintenance needs.",
        "Reviewed engineering drawings, historical records, and site information to support inspection planning, infrastructure evaluation, and field operations.",
        "Collected, analyzed, and maintained quality-controlled infrastructure data to support asset management, rehabilitation planning, and capital improvement decision-making.",
        "Collaborated with multidisciplinary teams to execute inspection activities while adhering to NYSDOT safety standards and operational protocols.",
      ],
      type: "work",
    },
    {
      id: "exp-2",
      role: "Sustainability Lead",
      company: "MakerSpace, New York University",
      location: "New York City",
      period: "Sept 2025 - Present",
      description: [
        "Lead the MakerSpace Sustainability Team, planning and implementing waste reduction and material-reuse initiatives to improve operational efficiency and resource management.",
        "Coordinate machine trainings, space tours, and workshops, mentoring student design projects and ensuring safe, compliant use of fabrication equipment.",
        "Support MakerSpace and MakerGarage operations through equipment coordination, maintenance assistance, administrative support, and adherence to safety protocols.",
        "Collaborate with managers, staff, and a diverse campus user base to support project execution, stakeholder communication, and day-to-day facility operations.",
      ],
      type: "work",
    },
    {
      id: "exp-3",
      role: "Mentor",
      company: "Liberty Partnerships Program (LPP), New York University",
      location: "New York City",
      period: "Jan 2026 - Present",
      description: [
        "Mentor and tutor high school students in Richard R Green High School, providing academic support in small-group settings across core subjects.",
        "Deliver socio-emotional guidance and mentorship, helping students improve confidence, engagement, and academic performance.",
        "Collaborate with teachers, counselors, and administrators to support individualized student learning plans.",
        "Maintain detailed session reports and tracked student progress, ensuring accurate documentation and program accountability.",
      ],
      type: "work",
    },
    {
      id: "exp-4",
      role: "BIM & Architect Intern",
      company: "Brick & Bolt",
      location: "India",
      period: "Feb 2025 - June 2025",
      description: [
        "Played a key role in BIM-based modeling using Autodesk Revit, developing Revit families, templates, and standardized workflows to improve design consistency and model quality.",
        "Coordinated cross-functionally with Sales, QS, Technical, and 3D Visualization teams, representing the design team in daily coordination and strategic meetings.",
        "Contributed to discussions with stakeholders by enabling the development of Revit-based BOQ & system workflows.",
        "Took initiative to train fellow interns on Revit standards and company protocols, earning multiple letters of recommendation and a certificate of appreciation for leadership and communication.",
      ],
      type: "work",
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "Digital Twin - Wunsch Building",
      category: "Digital Twin & BIM",
      description:
        "Developed comprehensive Digital Twins for the Wunsch Building using FARO scanning, Revit modeling, and WireTwin (Augment) for real-time asset and facilities management visualization.",
      tools: ["FARO", "Revit", "WireTwin (Augment)"],
    },
    {
      id: "proj-2",
      title: "Digital Twin - PS-281 Pumping Station",
      category: "Digital Twin & BIM",
      description:
        "Created a digital twin for the NYC DEP PS-281 Pumping Station, integrating 3D scanning data with BIM models for comprehensive asset management and facility planning.",
      tools: ["FARO", "Revit", "WireTwin", "NYC DEP Systems"],
    },
    {
      id: "proj-3",
      title: "Bronx District 12 Garage - Bid Package",
      category: "Cost Estimation & Scheduling",
      description:
        "Developed complete bid package and Construction Management plan for Bronx District 12 Garage using advanced quantity takeoff and cost estimation methodologies.",
      tools: ["CostX", "On-Screen Takeoff", "RSMeans"],
    },
    {
      id: "proj-4",
      title: "Project Controls & Scheduling",
      category: "Project Management",
      description:
        "Developed WBS, activity sequencing, and critical path analysis; integrated resources and project controls for comprehensive construction project management.",
      tools: ["Primavera P6", "MS Project", "Excel"],
    },
    {
      id: "proj-5",
      title: "Biophilic Urbanism Publication",
      category: "Research & Publication",
      description:
        'Author of "Biophilic Urbanism" published in Render (2023), exploring the intersection of nature-integrated design principles with urban development and sustainable architecture.',
      tools: ["Research", "Academic Writing", "Urban Design"],
    },
    {
      id: "proj-6",
      title: "Heritage Documentation - Bangalore",
      category: "Heritage & Documentation",
      description:
        "Contributed to heritage documentation projects in Bangalore, preserving architectural history through detailed surveys, drawings, and digital records of significant structures.",
      tools: ["AutoCAD", "Photoshop", "SketchUp", "Lumion"],
    },
  ],
  skills: [
    { id: "sk-1", name: "Autodesk Revit (BIM)", category: "technical" },
    { id: "sk-2", name: "AutoCAD", category: "technical" },
    { id: "sk-3", name: "Navisworks", category: "technical" },
    { id: "sk-4", name: "Primavera P6", category: "technical" },
    { id: "sk-5", name: "MS Office Suite", category: "technical" },
    { id: "sk-6", name: "Procore", category: "technical" },
    { id: "sk-7", name: "Bluebeam Revu", category: "technical" },
    { id: "sk-8", name: "CostX", category: "technical" },
    { id: "sk-9", name: "On-Screen Takeoff", category: "technical" },
    { id: "sk-10", name: "QGIS", category: "technical" },
    { id: "sk-11", name: "Adobe Photoshop", category: "technical" },
    { id: "sk-12", name: "SketchUp", category: "technical" },
    { id: "sk-13", name: "Lumion", category: "technical" },
    {
      id: "sk-14",
      name: "Project & Construction Management",
      category: "competency",
    },
    {
      id: "sk-15",
      name: "Quantity Takeoffs & Cost Estimation",
      category: "competency",
    },
    {
      id: "sk-16",
      name: "Scheduling & Project Controls",
      category: "competency",
    },
    { id: "sk-17", name: "BIM Workflow Management", category: "competency" },
    { id: "sk-18", name: "Digital Twin Integration", category: "competency" },
    { id: "sk-19", name: "Field Coordination", category: "competency" },
    {
      id: "sk-20",
      name: "Stakeholder Communication",
      category: "competency",
    },
    { id: "sk-21", name: "Change Order Management", category: "competency" },
    {
      id: "sk-22",
      name: "Registered Architect (Council of Architecture, India)",
      category: "certification",
    },
    {
      id: "sk-23",
      name: "Procore Project Management Certified",
      category: "certification",
    },
    {
      id: "sk-24",
      name: "Procore BIM Manager Certified",
      category: "certification",
    },
    {
      id: "sk-25",
      name: "BIM 2.0 (Autodesk Authorized)",
      category: "certification",
    },
    { id: "sk-26", name: "GIS in Urban Design", category: "certification" },
    {
      id: "sk-27",
      name: "OSHA 30-Hour Construction Safety",
      category: "certification",
    },
  ],
  leadership: [
    "Treasurer of CMAA NYU chapter",
    "UniBuddy Ambassador for the Construction Management Department at NYU",
    "President, Ramaiah Animal Rescue Club - overseeing rescue & rehabilitation efforts that led to 37 successful adoptions",
    "Sponsorship Head, School of Architecture (MSRIT) - leading industry outreach and raising $3,600 for student events",
    "Master of Ceremony for large university events with audiences exceeding 1,000",
    'Author of "Biophilic Urbanism" (Render, 2023) and contributor to heritage documentation projects in Bangalore',
  ],
};
