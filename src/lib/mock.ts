export const savingsTrend = [
  { m: "Jan", saved: 22000, projected: 22000 },
  { m: "Feb", saved: 25800, projected: 24500 },
  { m: "Mar", saved: 28400, projected: 27000 },
  { m: "Apr", saved: 31200, projected: 29800 },
  { m: "May", saved: 34100, projected: 32600 },
  { m: "Jun", saved: 36900, projected: 35400 },
  { m: "Jul", saved: 38400, projected: 38200 },
  { m: "Aug", saved: 41200, projected: 41000 },
  { m: "Sep", saved: 44100, projected: 43800 },
];

export const goalProgress = [
  { name: "Goa Trip", value: 68 },
  { name: "Emergency Fund", value: 70 },
  { name: "New Phone", value: 35 },
  { name: "Down Payment", value: 22 },
];

export const expenseSplit = [
  { name: "Essentials", value: 42 },
  { name: "Lifestyle", value: 23 },
  { name: "Investing", value: 21 },
  { name: "EMIs", value: 14 },
];

export const projection = [
  { y: "2026", base: 5.2, optimized: 5.2 },
  { y: "2027", base: 8.6, optimized: 9.4 },
  { y: "2028", base: 12.1, optimized: 14.0 },
  { y: "2029", base: 15.9, optimized: 19.6 },
  { y: "2030", base: 20.0, optimized: 26.3 },
];

export const insights = [
  {
    tone: "success" as const,
    title: "You're on track to achieve your Goa Trip goal.",
    body: "At your current pace, you'll reach ₹1,80,000 by March 2027 — 2 weeks ahead.",
  },
  {
    tone: "primary" as const,
    title: "Consider increasing your monthly SIP by ₹2,500.",
    body: "This can bring the Down Payment goal 8 months closer.",
  },
  {
    tone: "warning" as const,
    title: "Your emergency fund is below target.",
    body: "Hold off on the ₹1,20,000 phone purchase or split into 6 EMIs to stay protected.",
  },
];
