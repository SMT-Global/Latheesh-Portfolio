# Portfolio Context & Prompt Information

This document contains all the necessary context for generating or modifying the portfolio website for Challa Sai Latheesh Reddy.

## 1. Professional Profile
- **Name:** Challa Sai Latheesh Reddy
- **Tagline:** Building the future through digital twins, BIM integration, and data-driven infrastructure management — from blueprint to built environment.
- **Sector/Industry:** Construction Management, Architecture, BIM (Building Information Modeling), Digital Twins, and Infrastructure.
- **Base Location:** New York City, USA
- **Education:** 
  - M.S. in Construction Management @ New York University (Tandon School of Engineering) - GPA: 3.945 / 4.0
  - Bachelor of Architecture @ M S Ramaiah Institute of Technology - GPA: 3.5 / 4.0

## 2. Core Experience
- **Field Intern @ New York State Department of Transportation (NYSDOT):** Field inspections, condition assessments of culvert and stormwater infrastructure.
- **Sustainability Lead @ MakerSpace, NYU:** Planning/implementing waste reduction, material-reuse initiatives, and machine training.
- **Mentor @ Liberty Partnerships Program (NYU):** Mentoring high school students in academic support and socio-emotional guidance.
- **BIM & Architect Intern @ Brick & Bolt:** BIM modeling using Autodesk Revit, developing templates, workflows, and cross-functional coordination.

## 3. Selected Projects (Focus on Digital Twins & Cost Estimation)
1. **Digital Twin — Wunsch Building:** FARO scanning, Revit modeling, WireTwin (Augment).
2. **Digital Twin — PS-281 Pumping Station:** 3D scanning integrated with BIM models for NYC DEP.
3. **Bronx District 12 Garage — Bid Package:** Cost estimation, scheduling, quantity takeoff (CostX, On-Screen Takeoff).
4. **Project Controls & Scheduling:** WBS, critical path analysis (Primavera P6, MS Project).
5. **Biophilic Urbanism Publication:** Published in Render (2023) on nature-integrated design.

## 4. Technical Skills & Competencies
- **Software:** Autodesk Revit (BIM), AutoCAD, Navisworks, Primavera P6, Procore, Bluebeam Revu, CostX, QGIS, SketchUp, Lumion.
- **Core Competencies:** Quantity Takeoffs, Cost Estimation, Scheduling, Project Controls, BIM Workflow Management, Digital Twin Integration, Field Coordination.
- **Certifications:** Registered Architect (India), Procore Project Management & BIM Manager Certified, OSHA 30-Hour Construction Safety.

---

## 5. Website Design & Aesthetic Requirements

The website MUST strictly adhere to a **"Swiss Architecture" minimalist aesthetic**. The design should feel like a high-end physical architectural firm, not a tech startup. 

**Core Design Rules (Based on reference: aditanera.com):**
- **No "SaaS" Bento Grids:** Avoid blocky, dashboard-style UI. 
- **No Full-Screen Background Images:** Do not place text over massive, unreadable background images.
- **No Heavy Animations:** Remove smooth-scrolling (Lenis) and complex scroll-triggered reveal animations. Keep scrolling native and transitions subtle (e.g., simple hover lifts on cards).
- **Structure First:** Layout must rely on large negative space, tight typographical hierarchy, and structural grids (like a 3-column project layout).

**Color Palette (Strict):**
- **Background:** Warm off-white / Light Concrete (`#f7f5f0`)
- **Text:** Charcoal / Deep Black (`#151515` to `#222222`)
- **Accents:** Warm Amber / Brass (`#9b7a4f`)
- **Borders & Lines:** Delicate, thin 1px lines (`#dedbd3`)
- **Cards/Surfaces:** Pristine White (`#ffffff`)

**Typography:**
- Clean, structural Sans-Serif fonts (e.g., Inter, Space Grotesk, Helvetica).
- Use massive `clamp()` sizing for Hero H1s (e.g., `clamp(4rem, 12vw, 10rem)`).
- Use small, heavily letter-spaced uppercase text (`letter-spacing: 0.18em`) for "eyebrows" (category labels).

**Functional Requirements:**
- **Projects Section:** Should display realistic architectural imagery (e.g., point clouds, structural blueprints, high-res renders) inside clean cards.
- **Skills Section:** Grouped logically into "Technical Skills", "Core Competencies", and "Certifications", not just a random wall of tags.
- **Admin Panel:** The site must include a secure `/admin` route where the owner can paste a PDF URL to live-update the embedded Résumé on the site.
