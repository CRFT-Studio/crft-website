/**
 * Concept 1 tab content. Edit this list to change labels, photos, and cards.
 * `k` matches a photo imported in CaregilityConceptHero.astro.
 * `ai` picks the small icon on the lower card: "ok" or "warn".
 * Room numbers, names, and times are illustrative placeholders.
 */
export type CareSetting = {
  k: "medsurg" | "obs" | "ed" | "icu" | "cc";
  tab: string;
  pos: string;
  lbl: string;
  what: string;
  prods: string[];
  ep: string;
  et: string;
  title: string;
  meta: string;
  av: string;
  who: string;
  mc: string;
  mk: string;
  ml: string;
  ai: "ok" | "warn";
  at: string;
  as: string;
};

export const careSettings: CareSetting[] = [
  {
    k: "medsurg",
    tab: "Med/Surg",
    pos: "60% 40%",
    lbl: "In Med/Surg",
    what: "A virtual nurse handles admissions, discharge education and check-ins on the in-room TV, so the bedside nurse can stay hands-on.",
    prods: ["Virtual Nursing", "In-room camera + TV", "iCare Coordinator"],
    ep: "Virtual Nursing",
    et: "Room 412 · 1:32 PM",
    title: "Virtual nurse joined Room 412",
    meta: "Discharge education started on the in-room TV. Bedside RN freed for meds pass.",
    av: "KM",
    who: "K. Moore, RN · Virtual Nurse Hub",
    mc: "Proven at scale",
    mk: "19,000+",
    ml: "patient rooms run on the Caregility platform",
    ai: "ok",
    at: "Discharge checklist 4/6 done",
    as: "Synced to the EHR",
  },
  {
    k: "obs",
    tab: "Virtual Observation",
    pos: "50% 45%",
    lbl: "In Virtual Observation",
    what: "One observer watches a dozen or more at-risk patients at once, with AI flagging bed exits and falls before they happen.",
    prods: ["Virtual Patient Observation", "Augmented Observation AI", "iObserver"],
    ep: "AI · Augmented Observation",
    et: "Room 318 · 2:14 AM",
    title: "Bed-exit risk detected, Room 318",
    meta: "Observer spoke to the patient through the in-room speaker within seconds.",
    av: "JD",
    who: "J. Diaz · Virtual Observer, 16 rooms",
    mc: "Always on",
    mk: "99.99%",
    ml: "platform availability, fleet checked every 60 seconds",
    ai: "warn",
    at: "AI alert · fall risk",
    as: "Escalated to bedside team",
  },
  {
    k: "ed",
    tab: "Emergency",
    pos: "50% 40%",
    lbl: "In the Emergency Department",
    what: "A telehealth cart brings a remote specialist to the bedside on demand, so time-critical calls happen without waiting for travel.",
    prods: ["Virtual Visits & Consults", "Telehealth cart", "Peripheral devices"],
    ep: "Virtual Consult",
    et: "ED Bay 7 · 9:48 PM",
    title: "Cardiology joined ED Bay 7",
    meta: "Remote cardiologist listening live through the connected stethoscope.",
    av: "AP",
    who: "Dr. A. Patel · Remote Cardiology",
    mc: "Expert support",
    mk: "24x7x365",
    ml: "live support behind every connected endpoint",
    ai: "ok",
    at: "Consult connected in 0:42",
    as: "On-demand specialist pool",
  },
  {
    k: "icu",
    tab: "ICU",
    pos: "50% 40%",
    lbl: "In the ICU",
    what: "Tele-critical care teams round on every bed remotely, with live video and vitals side by side, especially on nights and weekends.",
    prods: ["Tele-Critical Care", "Vitals Trending AI", "Two-way video"],
    ep: "Tele-Critical Care",
    et: "ICU · Night rounds",
    title: "eICU rounding: 18 beds",
    meta: "Remote intensivist reviewing vitals trends and video on one console.",
    av: "LS",
    who: "Dr. L. Shah · Tele-ICU Intensivist",
    mc: "Built to keep running",
    mk: "55+",
    ml: "platform releases with no service interruption",
    ai: "warn",
    at: "Vitals trending · Bed 9",
    as: "HR rising over 2 hrs",
  },
  {
    k: "cc",
    tab: "Command Center",
    pos: "50% 0%",
    lbl: "In the Command Center",
    what: "iCare Coordinator puts every room, task and AI alert on one screen, so virtual and bedside teams work from the same queue.",
    prods: ["iCare Coordinator", "Task routing", "AI alerts"],
    ep: "iCare Coordinator",
    et: "General Hospital West",
    title: "42 rooms live · 3 urgent tasks",
    meta: "High-priority vitals check routed to the nearest available nurse.",
    av: "SL",
    who: "S. Lewis · Command Center lead",
    mc: "Secure by design",
    mk: "HIPAA",
    ml: "compliant, ISO 27001 & 27701 certified",
    ai: "ok",
    at: "Task closed · GH-ICU-Rm 124",
    as: "Loop closed in 3 min",
  },
];
