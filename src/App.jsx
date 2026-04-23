import { useState, useRef, useEffect } from "react";

// ─── SVG ICON LIBRARY ────────────────────────────────────────────────────────
const Icon = ({ name, size = 22, color = "#fff", style = {} }) => {
  const s = { width: size, height: size, display: "block", flexShrink: 0, ...style };
  const icons = {
    home: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1H5a1 1 0 01-1-1V10.5z" fill={color} opacity=".15"/><path d="M3 10.5L12 3l9 7.5M9 21v-8h6v8" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    search: <svg viewBox="0 0 24 24" fill="none" style={s}><circle cx="11" cy="11" r="7.5" stroke={color} strokeWidth="1.8"/><path d="M16.5 16.5L21 21" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>,
    qr: <svg viewBox="0 0 24 24" fill="none" style={s}><rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.8"/><rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.8"/><rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="1.8"/><rect x="5" y="5" width="3" height="3" fill={color}/><rect x="16" y="5" width="3" height="3" fill={color}/><rect x="5" y="16" width="3" height="3" fill={color}/><path d="M14 14h2v2h-2zM18 14h3v2h-1v1h-2v-1M17 18h4v3h-2v-1h-2z" fill={color}/></svg>,
    bell: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M12 2a7 7 0 017 7v4l2 3H3l2-3V9a7 7 0 017-7z" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/><path d="M9.5 19a2.5 2.5 0 005 0" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>,
    history: <svg viewBox="0 0 24 24" fill="none" style={s}><circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8"/><path d="M12 7v5.5l3.5 2" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    phone: <svg viewBox="0 0 24 24" fill="none" style={s}><rect x="5" y="2" width="14" height="20" rx="3" fill={color} opacity=".12"/><rect x="5" y="2" width="14" height="20" rx="3" stroke={color} strokeWidth="1.7"/><circle cx="12" cy="17.5" r="1" fill={color}/></svg>,
    bank: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M3 10h18M12 3L3 9h18L12 3z" stroke={color} strokeWidth="1.7" strokeLinejoin="round"/><path d="M5 10v8M9 10v8M15 10v8M19 10v8M3 18h18" stroke={color} strokeWidth="1.7" strokeLinecap="round"/></svg>,
    wallet: <svg viewBox="0 0 24 24" fill="none" style={s}><rect x="2" y="6" width="20" height="14" rx="2.5" fill={color} opacity=".12"/><rect x="2" y="6" width="20" height="14" rx="2.5" stroke={color} strokeWidth="1.7"/><path d="M16 13a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill={color}/><path d="M2 10h20" stroke={color} strokeWidth="1.7"/></svg>,
    rupee: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M7 5h10M7 10h10M7 10c0 4.4 3 8 7 8" stroke={color} strokeWidth="1.9" strokeLinecap="round"/><path d="M11 10l5 9" stroke={color} strokeWidth="1.9" strokeLinecap="round"/></svg>,
    lightning: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill={color} opacity=".2"/><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" stroke={color} strokeWidth="1.7" strokeLinejoin="round"/></svg>,
    calendar: <svg viewBox="0 0 24 24" fill="none" style={s}><rect x="3" y="5" width="18" height="17" rx="2" stroke={color} strokeWidth="1.7"/><path d="M8 3v4M16 3v4M3 10h18" stroke={color} strokeWidth="1.7" strokeLinecap="round"/></svg>,
    creditcard: <svg viewBox="0 0 24 24" fill="none" style={s}><rect x="2" y="5" width="20" height="14" rx="2.5" stroke={color} strokeWidth="1.7"/><path d="M2 10h20" stroke={color} strokeWidth="1.7"/><rect x="5" y="14" width="4" height="2" rx=".8" fill={color}/></svg>,
    bike: <svg viewBox="0 0 24 24" fill="none" style={s}><circle cx="6" cy="17" r="3" stroke={color} strokeWidth="1.7"/><circle cx="18" cy="17" r="3" stroke={color} strokeWidth="1.7"/><path d="M6 17l3-6h5l2-3h2M9 11l4 6M14 8l-1 3" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    car: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M4 14l2-5h12l2 5" stroke={color} strokeWidth="1.7" strokeLinejoin="round"/><rect x="2" y="14" width="20" height="5" rx="1.5" stroke={color} strokeWidth="1.7"/><circle cx="7" cy="19" r="1.5" fill={color}/><circle cx="17" cy="19" r="1.5" fill={color}/></svg>,
    health: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M12 21C12 21 4 15.5 4 9.5a5 5 0 018-4 5 5 0 018 4C20 15.5 12 21 12 21z" stroke={color} strokeWidth="1.7" fill={color} fillOpacity=".12"/><path d="M9 12h6M12 9v6" stroke={color} strokeWidth="1.9" strokeLinecap="round"/></svg>,
    umbrella: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M3 12A9 9 0 0121 12" stroke={color} strokeWidth="1.7" strokeLinecap="round"/><path d="M12 3v9M12 16v2a2 2 0 01-4 0" stroke={color} strokeWidth="1.7" strokeLinecap="round"/></svg>,
    chart: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M4 20V14M8 20V10M12 20V6M16 20V12M20 20V8" stroke={color} strokeWidth="1.9" strokeLinecap="round"/></svg>,
    gold: <svg viewBox="0 0 24 24" fill="none" style={s}><circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.7"/><path d="M12 7l1.5 3H17l-2.5 2 1 3L12 13.5 8.5 15l1-3L7 10h3.5z" fill={color}/></svg>,
    gift: <svg viewBox="0 0 24 24" fill="none" style={s}><rect x="3" y="9" width="18" height="4" rx="1" stroke={color} strokeWidth="1.7"/><rect x="5" y="13" width="14" height="8" rx="1" stroke={color} strokeWidth="1.7"/><path d="M12 9V21M12 9c0-2 1-4 3-3s1 3-3 3M12 9c0-2-1-4-3-3s-1 3 3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>,
    star: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M12 2l2.9 6.3L22 9.3l-5 5 1.2 7L12 18.2 5.8 21.3 7 14.3l-5-5 7.1-1z" fill={color} opacity=".8" stroke={color} strokeWidth="1.4" strokeLinejoin="round"/></svg>,
    send: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M22 2L11 13" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><path d="M22 2L15 22l-4-9-9-4 20-7z" fill={color} opacity=".15" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/></svg>,
    arrow_right: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M9 6l6 6-6 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    back: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M15 18l-6-6 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    download: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M12 3v13M7 12l5 5 5-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 20h16" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>,
    share: <svg viewBox="0 0 24 24" fill="none" style={s}><circle cx="18" cy="5" r="2.5" stroke={color} strokeWidth="1.7"/><circle cx="6" cy="12" r="2.5" stroke={color} strokeWidth="1.7"/><circle cx="18" cy="19" r="2.5" stroke={color} strokeWidth="1.7"/><path d="M8.5 10.5l7-4M8.5 13.5l7 4" stroke={color} strokeWidth="1.6" strokeLinecap="round"/></svg>,
    copy: <svg viewBox="0 0 24 24" fill="none" style={s}><rect x="9" y="9" width="12" height="12" rx="2" stroke={color} strokeWidth="1.7"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke={color} strokeWidth="1.7" strokeLinecap="round"/></svg>,
    question: <svg viewBox="0 0 24 24" fill="none" style={s}><circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.7"/><path d="M9.5 9a2.5 2.5 0 015 .8c0 2-2.5 2.5-2.5 4" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="17" r="1" fill={color}/></svg>,
    mic: <svg viewBox="0 0 24 24" fill="none" style={s}><rect x="9" y="2" width="6" height="11" rx="3" stroke={color} strokeWidth="1.7"/><path d="M5 11a7 7 0 0014 0M12 18v4M9 22h6" stroke={color} strokeWidth="1.7" strokeLinecap="round"/></svg>,
    settings: <svg viewBox="0 0 24 24" fill="none" style={s}><circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.7"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke={color} strokeWidth="1.5"/></svg>,
    filter: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M4 6h16M7 12h10M10 18h4" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>,
    check: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M5 12l5 5L20 7" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    crown: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M3 18h18M3 18l2-8 4 4 3-6 3 6 4-4 2 8H3z" fill={color} fillOpacity=".15" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/></svg>,
    shield: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.5C16.5 22.15 20 17.25 20 12V6L12 2z" fill={color} fillOpacity=".15" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    infinite: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M12 12c-2-2.5-4-4-6-4a4 4 0 000 8c2 0 4-1.5 6-4zm0 0c2 2.5 4 4 6 4a4 4 0 000-8c-2 0-4 1.5-6 4z" stroke={color} strokeWidth="1.9" strokeLinecap="round"/></svg>,
    upi: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M12 2l8 14H4L12 2z" fill={color} fillOpacity=".2" stroke={color} strokeWidth="1.7" strokeLinejoin="round"/><path d="M9 16l3 6 3-6" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    dice: <svg viewBox="0 0 24 24" fill="none" style={s}><rect x="3" y="3" width="18" height="18" rx="3" stroke={color} strokeWidth="1.8"/><circle cx="8" cy="8" r="1.2" fill={color}/><circle cx="12" cy="12" r="1.2" fill={color}/><circle cx="16" cy="16" r="1.2" fill={color}/><circle cx="16" cy="8" r="1.2" fill={color}/><circle cx="8" cy="16" r="1.2" fill={color}/></svg>,
    telegram: <svg viewBox="0 0 24 24" fill="none" style={s}><path d="M22 2L11 13" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><path d="M22 2L15 22l-4-9-9-4 20-7z" fill={color} opacity=".2" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  };
  return icons[name] || <svg viewBox="0 0 24 24" style={s}/>;
};

// ─── QR CODE SVG ─────────────────────────────────────────────────────────────
const QRCode = () => {
  const N = 25, cs = 8;
  const rng = (r, c) => Math.sin(r * 127.1 + c * 311.7 + r * c * 0.3) > 0.08;
  const cells = [];
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
    const tl = r < 7 && c < 7, tr = r < 7 && c > N - 8, bl = r > N - 8 && c < 7;
    let fill = "#000";
    if (tl || tr || bl) {
      const lr = tl ? r : r - (bl ? N - 7 : 0), lc = tl ? c : tr ? c - (N - 7) : c;
      const outer = lr === 0 || lr === 6 || lc === 0 || lc === 6;
      const inner = lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4;
      fill = (outer || inner) ? "#000" : "#fff";
    } else if (r === 6 || c === 6) fill = (r + c) % 2 === 0 ? "#000" : "#fff";
    else fill = rng(r, c) ? "#000" : "#fff";
    cells.push(<rect key={`${r}${c}`} x={c * cs} y={r * cs} width={cs - 0.5} height={cs - 0.5} fill={fill} />);
  }
  const total = N * cs;
  return (
    <svg width={total} height={total} viewBox={`0 0 ${total} ${total}`} style={{ display: "block" }}>
      <rect width={total} height={total} fill="#fff" />
      {cells}
      <circle cx={total / 2} cy={total / 2} r={18} fill="#1a1a1a" />
      <text x={total / 2} y={total / 2 + 6} textAnchor="middle" fontSize={13} fontWeight={900} fill="#fff" fontFamily="sans-serif">Pe</text>
    </svg>
  );
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const txns = [
  { id: 1, sub: "Received from", name: "Amit Kumar", date: "1 day ago", amt: 200, type: "credit", bank: "Jio", initials: "AK", color: "#1c3050" },
  { id: 2, sub: "Received from", name: "Sunita Devi", date: "1 day ago", amt: 500, type: "credit", bank: "Jio", initials: "SD", color: "#2a1040" },
  { id: 3, sub: "Received from", name: "Vikram Singh", date: "19 Apr", amt: 1000, type: "credit", bank: "Fino", initials: "VS", color: "#0a2a1a" },
  { id: 4, sub: "Paid to", name: "Mahesh Pareek", date: "17 Apr", amt: 150, type: "debit", bank: "Jio", initials: "MP", color: "#1a1a30" },
  { id: 5, sub: "Paid to", name: "Mobile Recharge", date: "15 Apr", amt: 299, type: "debit", bank: "Jio", initials: "JI", color: "#30180a" },
  { id: 6, sub: "Received from", name: "Deepak Sharma", date: "14 Apr", amt: 350, type: "credit", bank: "Jio", initials: "DS", color: "#0a2030" },
];

const contacts = [
  { name: "Amit K.", initials: "AK", color: "#1c3050" },
  { name: "Vikram", initials: "VS", color: "#0a2a1a" },
];

const chatList = [
  { name: "Amit Kumar", msg: "₹200 - Received Instantly", date: "21/04", dot: true, initials: "AK", color: "#1c3050" },
  { name: "Sunita Devi", msg: "You : 👍", date: "SENDING", dot: false, initials: "SD", color: "#2a1040" },
  { name: "Vikram Singh", msg: "₹1,000 - Received Instantly", date: "19/04", dot: true, initials: "VS", color: "#0a2a1a" },
  { name: "*****3890", msg: "You : 👍", date: "SENDING", dot: false, initials: "**", color: "#1a3a1a" },
];

// ─── ADMIN CONFIG ─────────────────────────────────────────────────────────────


const TELEGRAM_USERNAME = "Bmoney2026";

// ─── STYLES ───────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
:root{
  --bg:#000;--bg2:#0d0d0d;--card:#1c1c1e;--card2:#252527;
  --border:#2c2c2e;--border2:#38383a;
  --purple:#6023c0;--purple2:#7b35e0;
  --green:#30d158;--text:#fff;--t2:#8e8e93;--t3:#48484a;
  --gold:#f7c948;--gold2:#ffd700;
}
html,body{background:#000;font-family:'Manrope',system-ui,sans-serif;color:#fff}
.app{max-width:390px;margin:0 auto;min-height:100vh;background:var(--bg);position:relative;overflow:hidden}
.page{height:calc(100dvh - 66px);overflow-y:auto;overflow-x:hidden;scrollbar-width:none}
.page::-webkit-scrollbar{display:none}

/* ── PAYWALL SCREEN ── */
.pw-screen{
  position:fixed;inset:0;z-index:9999;
  background:#000;
  display:flex;flex-direction:column;
  max-width:390px;margin:0 auto;
  overflow-y:auto;scrollbar-width:none;
}
.pw-screen::-webkit-scrollbar{display:none}

.pw-top-glow{
  position:absolute;top:-60px;left:50%;transform:translateX(-50%);
  width:320px;height:320px;border-radius:50%;
  background:radial-gradient(circle,rgba(96,35,192,.45) 0%,rgba(96,35,192,.08) 60%,transparent 80%);
  pointer-events:none;
}
.pw-header{
  padding:52px 24px 0;
  text-align:center;
  position:relative;
  z-index:1;
}
.pw-logo-wrap{
  width:72px;height:72px;border-radius:22px;
  background:linear-gradient(135deg,#3a0ea0,#7b35e0);
  display:flex;align-items:center;justify-content:center;
  margin:0 auto 18px;
  box-shadow:0 8px 32px rgba(96,35,192,.5);
}
.pw-logo-txt{font-size:28px;font-weight:900;letter-spacing:-1px;color:#fff}
.pw-badge{
  display:inline-flex;align-items:center;gap:6px;
  background:rgba(247,201,72,.12);border:1px solid rgba(247,201,72,.3);
  border-radius:20px;padding:5px 14px;
  font-size:11px;font-weight:700;color:var(--gold);
  letter-spacing:.4px;margin-bottom:16px;
}
.pw-headline{font-size:26px;font-weight:900;letter-spacing:-.6px;line-height:1.25;color:#fff;margin-bottom:8px}
.pw-headline span{
  background:linear-gradient(90deg,#a78fff,#7b35e0);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.pw-subline{font-size:14px;color:var(--t2);font-weight:500;line-height:1.6;padding:0 12px}

/* PLAN CARDS */
.pw-plans{padding:22px 18px 0;display:flex;flex-direction:column;gap:12px}
.pw-plan{
  border-radius:18px;padding:18px;cursor:pointer;
  border:1.5px solid var(--border2);
  background:var(--card);
  transition:all .18s;
  position:relative;overflow:hidden;
}
.pw-plan.free{border-color:var(--border2)}
.pw-plan.premium{
  border-color:#7b35e0;
  background:linear-gradient(135deg,#1a0a38 0%,#250d50 100%);
}
.pw-plan.premium.selected{
  border-color:#a78fff;
  box-shadow:0 0 0 2px rgba(123,53,224,.4),0 8px 32px rgba(96,35,192,.25);
}
.pw-plan.free.selected{
  border-color:var(--t2);
  box-shadow:0 0 0 2px rgba(142,142,147,.2);
}
.pw-pop-badge{
  position:absolute;top:14px;right:14px;
  background:linear-gradient(90deg,#f7c948,#ff9500);
  color:#000;border-radius:8px;padding:3px 10px;
  font-size:10px;font-weight:800;letter-spacing:.4px;
}
.pw-plan-row{display:flex;align-items:center;gap:14px}
.pw-plan-ico{
  width:48px;height:48px;border-radius:14px;
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;
}
.pw-plan-ico.free-ico{background:rgba(255,255,255,.06)}
.pw-plan-ico.prem-ico{background:rgba(123,53,224,.25)}
.pw-plan-info{flex:1}
.pw-plan-name{font-size:16px;font-weight:800;letter-spacing:-.3px}
.pw-plan-sub{font-size:12px;color:var(--t2);margin-top:2px;font-weight:500}
.pw-plan-price{text-align:right}
.pw-price-big{font-size:22px;font-weight:900;letter-spacing:-.5px}
.pw-price-big.free-clr{color:var(--t2)}
.pw-price-big.prem-clr{color:#fff}
.pw-price-tag{font-size:10px;color:var(--t2);font-weight:600;margin-top:1px}

/* FEATURES LIST */
.pw-feats{background:var(--card);border-radius:16px;padding:16px 16px 12px;border:1px solid var(--border)}
.pw-feat-title{font-size:12px;font-weight:700;color:var(--t2);letter-spacing:.8px;text-transform:uppercase;margin-bottom:14px}
.pw-feat{display:flex;align-items:center;gap:12px;padding:6px 0}
.pw-feat-ico{width:30px;height:30px;border-radius:9px;background:rgba(96,35,192,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.pw-feat-txt{font-size:13px;font-weight:600;color:#fff;flex:1}
.pw-feat-sep{height:.5px;background:var(--border);margin:2px 0}

/* CTA AREA */
.pw-cta{padding:18px 18px 8px}
.pw-cta-btn{
  width:100%;padding:17px;border:none;border-radius:16px;cursor:pointer;
  font-family:inherit;font-size:16px;font-weight:800;letter-spacing:-.2px;
  display:flex;align-items:center;justify-content:center;gap:10px;
  transition:all .18s;
}
.pw-cta-btn.pay{
  background:linear-gradient(135deg,#5010b8,#8030e0);
  color:#fff;
  box-shadow:0 8px 28px rgba(96,35,192,.5);
}
.pw-cta-btn.pay:active{transform:scale(.97)}
.pw-cta-btn.skip{
  background:none;color:var(--t2);
  font-size:13px;font-weight:600;margin-top:4px;
  text-decoration:underline;text-underline-offset:3px;
}
.pw-note{text-align:center;font-size:11px;color:var(--t3);padding:0 24px 6px;line-height:1.7}
.pw-secure{display:flex;align-items:center;justify-content:center;gap:5px;font-size:11px;color:var(--t3);padding-bottom:28px}

/* ── PAYMENT FLOW SCREEN ── */
.pf-screen{
  position:fixed;inset:0;z-index:10000;
  background:#000;
  display:flex;flex-direction:column;
  max-width:390px;margin:0 auto;
  overflow-y:auto;scrollbar-width:none;
}
.pf-screen::-webkit-scrollbar{display:none}
.pf-header{
  padding:52px 24px 24px;
  text-align:center;
  background:linear-gradient(180deg,#0d0228 0%,#000 100%);
}
.pf-back{
  position:absolute;top:52px;left:20px;
  width:36px;height:36px;border-radius:50%;
  background:rgba(255,255,255,.08);border:1px solid var(--border2);
  display:flex;align-items:center;justify-content:center;cursor:pointer;
}
.pf-title{font-size:22px;font-weight:900;letter-spacing:-.5px;color:#fff;margin-bottom:4px}
.pf-sub{font-size:13px;color:var(--t2);font-weight:500}

/* Lucky Number Display */
.pf-number-card{
  margin:0 20px;
  background:linear-gradient(135deg,#1a0a38,#250d50);
  border:1.5px solid rgba(123,53,224,.5);
  border-radius:20px;padding:24px;text-align:center;
}
.pf-number-label{font-size:12px;font-weight:700;color:var(--t2);letter-spacing:.8px;text-transform:uppercase;margin-bottom:12px}
.pf-number-big{
  font-size:72px;font-weight:900;line-height:1;
  background:linear-gradient(135deg,#a78fff,#7b35e0);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  margin-bottom:16px;
}
.pf-copy-btn{
  display:inline-flex;align-items:center;gap:8px;
  background:rgba(123,53,224,.2);border:1.5px solid rgba(123,53,224,.5);
  border-radius:12px;padding:10px 20px;
  font-size:13px;font-weight:700;color:#a78fff;cursor:pointer;
  transition:all .15s;
}
.pf-copy-btn:active{background:rgba(123,53,224,.4)}
.pf-copy-btn.copied{
  background:rgba(48,209,88,.1);border-color:rgba(48,209,88,.5);color:var(--green);
}

/* Transaction ID Input */
.pf-form{padding:20px 20px 0}
.pf-input-label{font-size:12px;font-weight:700;color:var(--t2);letter-spacing:.5px;text-transform:uppercase;margin-bottom:8px}
.pf-input{
  width:100%;background:var(--card);border:1.5px solid var(--border2);
  border-radius:14px;padding:16px;
  font-family:inherit;font-size:18px;font-weight:700;color:#fff;
  letter-spacing:2px;text-align:center;outline:none;
  transition:border-color .18s;
}
.pf-input:focus{border-color:#7b35e0}
.pf-input::placeholder{color:var(--t3);letter-spacing:normal;font-size:14px;font-weight:500}
.pf-input-hint{font-size:11px;color:var(--t3);margin-top:6px;text-align:center}
.pf-input.error{border-color:#ff453a}

/* Telegram Button */
.pf-tg-btn{
  margin:16px 20px 0;
  width:calc(100% - 40px);
  padding:14px;background:#0088cc;
  border:none;border-radius:14px;
  font-family:inherit;font-size:14px;font-weight:700;color:#fff;
  display:flex;align-items:center;justify-content:center;gap:10px;cursor:pointer;
  transition:opacity .15s;
}
.pf-tg-btn:active{opacity:.85}

/* Submit Button */
.pf-submit-btn{
  margin:14px 20px 0;
  width:calc(100% - 40px);
  padding:17px;
  background:linear-gradient(135deg,#5010b8,#8030e0);
  border:none;border-radius:16px;
  font-family:inherit;font-size:16px;font-weight:800;color:#fff;
  display:flex;align-items:center;justify-content:center;gap:10px;cursor:pointer;
  transition:all .18s;
  box-shadow:0 8px 28px rgba(96,35,192,.45);
}
.pf-submit-btn:active{transform:scale(.97)}
.pf-submit-btn:disabled{opacity:.5;cursor:not-allowed;transform:none}
.pf-bottom-note{text-align:center;font-size:11px;color:var(--t3);padding:12px 24px 32px;line-height:1.7}

/* Success Screen */
.success-screen{
  position:fixed;inset:0;z-index:10001;
  background:#000;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  max-width:390px;margin:0 auto;
  padding:32px 24px;text-align:center;
}
.success-icon{font-size:72px;margin-bottom:20px}
.success-title{font-size:24px;font-weight:900;color:#fff;margin-bottom:8px}
.success-sub{font-size:14px;color:var(--t2);line-height:1.7;margin-bottom:28px}

/* Loader spinner */
@keyframes spin{to{transform:rotate(360deg)}}
.spinner{
  width:20px;height:20px;border-radius:50%;
  border:2.5px solid rgba(255,255,255,.3);
  border-top-color:#fff;
  animation:spin .7s linear infinite;
  flex-shrink:0;
}

/* ── ORIGINAL APP STYLES ── */
.sb{display:flex;align-items:center;justify-content:space-between;padding:12px 18px 8px;font-size:13px;font-weight:600;letter-spacing:-.2px}
.sb-r{display:flex;align-items:center;gap:5px;font-size:11px;color:var(--t2)}
.tb{display:flex;align-items:center;justify-content:space-between;padding:2px 18px 10px}
.avwrap{position:relative;cursor:pointer}
.av{width:42px;height:42px;border-radius:12px;background:var(--card2);border:1.5px solid var(--border2);display:flex;align-items:center;justify-content:center;overflow:hidden}
.av-txt{font-size:14px;font-weight:800;letter-spacing:-.5px}
.av-qr{position:absolute;bottom:-3px;right:-3px;background:#111;border:1.5px solid var(--border2);border-radius:5px;width:18px;height:18px;display:flex;align-items:center;justify-content:center}
.helpbtn{width:34px;height:34px;border-radius:50%;border:1.5px solid var(--border2);background:transparent;display:flex;align-items:center;justify-content:center;cursor:pointer}
.pscroll{display:flex;gap:10px;overflow-x:auto;padding:0 18px 14px;scrollbar-width:none}
.pscroll::-webkit-scrollbar{display:none}
.pbanner{min-width:calc(100% - 50px);border-radius:16px;padding:18px 16px;display:flex;gap:12px;align-items:center;justify-content:space-between;flex-shrink:0;cursor:pointer}
.pb1{background:linear-gradient(135deg,#2d0e6e 0%,#5c1fb8 100%)}
.pb2{background:linear-gradient(135deg,#7a2900 0%,#bf4b10 100%)}
.pb-l{flex:1}
.pb-eyebrow{font-size:10px;font-weight:600;color:rgba(255,255,255,.55);letter-spacing:.6px;text-transform:uppercase;margin-bottom:5px}
.pb-title{font-size:18px;font-weight:800;line-height:1.2;color:#fff}
.pb-title span{color:#f7c948}
.pb-sub{font-size:12px;color:rgba(255,255,255,.6);margin-top:3px;font-weight:500}
.pb-btn{display:inline-flex;align-items:center;gap:4px;margin-top:10px;border:1.5px solid rgba(255,255,255,.25);border-radius:20px;padding:6px 14px;font-size:12px;font-weight:700;color:#fff;cursor:pointer;background:rgba(255,255,255,.08);width:fit-content}
.pb-icon{width:60px;height:60px;border-radius:14px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sh{display:flex;align-items:center;justify-content:space-between;padding:16px 18px 10px}
.stitle{font-size:16px;font-weight:700;letter-spacing:-.3px}
.slink{font-size:13px;color:var(--purple2);font-weight:600}
.ref-pill{display:flex;align-items:center;gap:5px;background:#241500;border-radius:20px;padding:5px 12px;font-size:11px;font-weight:700;color:#f7c948}
.grid4{display:grid;grid-template-columns:repeat(4,1fr);padding:0 6px 4px}
.gi{display:flex;flex-direction:column;align-items:center;gap:9px;padding:10px 4px;border-radius:14px;cursor:pointer;background:none;border:none;transition:background .12s;position:relative}
.gi:active{background:var(--card)}
.gi-icon{width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;position:relative}
.gi-dot{position:absolute;top:3px;right:3px;width:9px;height:9px;background:var(--green);border-radius:50%;border:2px solid var(--bg)}
.gi-lbl{font-size:11px;font-weight:600;color:var(--text);text-align:center;line-height:1.35;letter-spacing:-.1px}
.pillrow{display:flex;gap:8px;overflow-x:auto;padding:0 18px 14px;scrollbar-width:none}
.pillrow::-webkit-scrollbar{display:none}
.pill{display:flex;align-items:center;gap:8px;background:var(--card);border-radius:10px;padding:10px 14px;flex-shrink:0;cursor:pointer;border:1px solid var(--border)}
.pill-lbl{font-size:12px;font-weight:600;color:var(--text);white-space:nowrap}
.strip{margin:0 18px 12px;background:var(--card);border-radius:12px;padding:13px 14px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;border:1px solid var(--border)}
.strip-l{display:flex;align-items:center;gap:10px}
.strip-txt{font-size:13px;font-weight:600}
.div{height:8px;background:#080808}
.mgmt{margin:0 18px 14px;background:#141832;border-radius:14px;padding:16px 16px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;border:1px solid #1e2550}
.mgmt-l{display:flex;align-items:center;gap:14px}
.mgmt-t{font-size:15px;font-weight:700}
.mgmt-s{font-size:12px;color:var(--t2);margin-top:2px}
.rewrow{display:flex;gap:10px;padding:0 18px 16px;overflow-x:auto;scrollbar-width:none}
.rewrow::-webkit-scrollbar{display:none}
.rc{min-width:118px;background:var(--card);border-radius:14px;padding:14px;cursor:pointer;flex-shrink:0;border:1px solid var(--border)}
.rc-ico{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:10px}
.rc-t{font-size:13px;font-weight:700;line-height:1.3}
.rc-badge{display:inline-block;border-radius:5px;padding:2px 7px;font-size:10px;font-weight:700;margin-top:6px}
.rc-s{font-size:11px;color:var(--t2);margin-top:4px}
.phdr{padding:10px 18px 0;display:flex;align-items:center;justify-content:space-between}
.ptitle{font-size:24px;font-weight:800;letter-spacing:-.5px}
.stmtbtn{display:flex;align-items:center;gap:7px;border:1.5px solid var(--border2);border-radius:20px;padding:7px 14px;background:none;color:var(--text);font-family:inherit;font-size:12px;font-weight:700;cursor:pointer}
.sbar{display:flex;align-items:center;gap:10px;background:var(--card);border-radius:12px;padding:12px 16px;margin:14px 18px 0;border:1px solid var(--border)}
.sinput{flex:1;background:none;border:none;outline:none;font-size:15px;color:var(--text);font-family:inherit}
.sinput::placeholder{color:var(--t2)}
.mlbl{padding:16px 18px 8px;font-size:11px;font-weight:700;color:var(--t2);letter-spacing:1px;text-transform:uppercase}
.txrow{display:flex;align-items:center;gap:12px;padding:13px 18px;border-bottom:.5px solid var(--border);cursor:pointer;transition:background .1s}
.txrow:active{background:var(--card)}
.txav{width:46px;height:46px;border-radius:13px;flex-shrink:0;display:flex;align-items:center;justify-content:center;position:relative}
.upi-tag{position:absolute;bottom:0;left:0;right:0;text-align:center;background:#d44a0e;font-size:7px;font-weight:800;color:#fff;padding:1.5px 0;border-radius:0 0 6px 6px;letter-spacing:.5px}
.tx-init{font-size:14px;font-weight:800;letter-spacing:-.3px}
.tx-mid{flex:1}
.tx-sub{font-size:11px;color:var(--t2);font-weight:500;margin-bottom:1px}
.tx-name{font-size:14px;font-weight:700}
.tx-date{font-size:11px;color:var(--t2);margin-top:2px}
.tx-r{text-align:right}
.tx-amt{font-size:15px;font-weight:700}
.tx-amt.cr{color:var(--green)}
.tx-to{font-size:10px;color:var(--t2);margin-top:3px;display:flex;align-items:center;gap:3px;justify-content:flex-end}
.bbadge{width:16px;height:16px;border-radius:4px;display:inline-flex;align-items:center;justify-content:center;font-size:8px;font-weight:800}
.pgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:0 18px 18px}
.pi{display:flex;flex-direction:column;align-items:center;gap:8px;padding:14px 4px;background:var(--card);border-radius:14px;cursor:pointer;border:none;border:1px solid var(--border);transition:background .12s}
.pi:active{background:var(--card2)}
.pi-ico{width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center}
.pi-lbl{font-size:11px;font-weight:600;color:var(--text);text-align:center;line-height:1.35}
.nrow{display:flex;gap:10px;overflow-x:auto;padding:0 18px;scrollbar-width:none}
.nrow::-webkit-scrollbar{display:none}
.nc{min-width:168px;border-radius:16px;overflow:hidden;cursor:pointer;flex-shrink:0}
.nc-img{height:96px;display:flex;align-items:flex-end;padding:12px;justify-content:space-between}
.nc-body{background:var(--card);padding:12px;border:1px solid var(--border);border-top:none;border-radius:0 0 16px 16px}
.nc-t{font-size:13px;font-weight:700}
.nc-s{font-size:11px;color:var(--t2);margin-top:3px;line-height:1.45}
.ae{display:flex;align-items:center;justify-content:center;height:calc(100dvh - 130px)}
.ae-t{font-size:16px;color:var(--t2);font-weight:500}
.qrcard{background:var(--card);border-radius:20px;padding:20px;margin:0 18px 14px;border:1px solid var(--border)}
.qr-bnk{display:flex;align-items:center;gap:10px;margin-bottom:18px}
.jio-b{width:34px;height:34px;border-radius:50%;background:#f7921e;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#fff}
.qr-bn{font-size:14px;font-weight:700}
.qr-box{background:#fff;border-radius:14px;padding:16px;display:flex;align-items:center;justify-content:center;margin-bottom:14px}
.qr-upi{display:flex;align-items:center;justify-content:center;gap:8px}
.qr-uid{font-size:13px;color:var(--t2);font-weight:500}
.qr-vbtn{text-align:center;color:var(--purple2);font-size:14px;font-weight:700;margin-top:12px;cursor:pointer;padding:4px}
.qract{display:flex;gap:12px;margin:0 18px 14px}
.qab{flex:1;padding:14px;background:var(--card);border:1.5px solid var(--border2);border-radius:14px;color:var(--text);font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:8px;transition:background .12s}
.qab:active{background:var(--card2)}
.walrow{background:var(--card);border-radius:16px;margin:0 18px;display:flex;border:1px solid var(--border)}
.wh{flex:1;display:flex;align-items:center;gap:12px;padding:16px;cursor:pointer}
.wh:first-child{border-right:.5px solid var(--border)}
.wh-ico{width:40px;height:40px;border-radius:12px;background:var(--card2);display:flex;align-items:center;justify-content:center}
.wh-l{font-size:11px;color:var(--t2);font-weight:600}
.wh-b{font-size:15px;font-weight:800;margin-top:1px}
.bkhdr{display:flex;align-items:center;gap:14px;padding:4px 18px 14px}
.bkbtn{width:34px;height:34px;border-radius:10px;background:var(--card);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer}
.controw{display:flex;gap:18px;padding:0 18px 18px}
.cont{display:flex;flex-direction:column;align-items:center;gap:7px;cursor:pointer}
.cav{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;position:relative}
.cupi{position:absolute;bottom:-1px;left:50%;transform:translateX(-50%);background:#d44a0e;border-radius:3px;padding:1.5px 5px;font-size:7px;font-weight:800;color:#fff;white-space:nowrap}
.cnm{font-size:12px;font-weight:600;color:var(--text)}
.pc-lbl{font-size:10px;font-weight:700;letter-spacing:1px;color:var(--t2);padding:0 18px 10px;text-transform:uppercase}
.chrow{display:flex;align-items:center;gap:12px;padding:13px 18px;border-bottom:.5px solid var(--border);cursor:pointer}
.chav{width:50px;height:50px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;flex-shrink:0;position:relative}
.ch-upi{position:absolute;bottom:0;left:0;right:0;text-align:center;background:#d44a0e;font-size:7px;font-weight:800;color:#fff;border-radius:0 0 25px 25px;padding:1.5px}
.ch-mid{flex:1}
.ch-nm{font-size:15px;font-weight:700}
.ch-msg{font-size:13px;color:var(--t2);margin-top:1px}
.ch-r{text-align:right}
.ch-dt{font-size:12px;color:var(--t2)}
.ch-dot{width:8px;height:8px;background:var(--green);border-radius:50%;margin:4px 0 0 auto}
.newpaybtn{position:sticky;bottom:16px;display:flex;justify-content:flex-end;padding:0 18px;margin-top:8px}
.npb{display:flex;align-items:center;gap:8px;background:var(--purple);color:#fff;border:none;border-radius:28px;padding:14px 22px;font-size:15px;font-weight:800;cursor:pointer;box-shadow:0 6px 24px rgba(96,35,192,.55);font-family:inherit;letter-spacing:-.2px}
.gb{margin:14px 18px;background:var(--card);border-radius:14px;padding:16px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;border:1px solid var(--border)}
.gb-t{font-size:14px;font-weight:700}
.gb-s{font-size:12px;color:var(--t2);margin-top:2px}
.gb-arr{width:30px;height:30px;background:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center}
.bklist{padding:0 18px}
.bkrow{display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:.5px solid var(--border);cursor:pointer}
.bkrow:last-child{border:none}
.bklogo{width:42px;height:42px;border-radius:13px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:900;flex-shrink:0}
.bkinfo{flex:1}
.bkname{font-size:15px;font-weight:700}
.bktype{font-size:12px;color:var(--t2);margin-top:2px}
.bnav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:390px;background:rgba(10,10,10,.96);border-top:.5px solid var(--border);height:66px;display:flex;align-items:center;z-index:100;padding:0 4px;backdrop-filter:blur(20px)}
.ni{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;background:none;border:none;cursor:pointer;padding:6px 0}
.ni-lbl{font-size:10px;font-weight:600}
.qrbtn{width:56px;height:56px;border-radius:50%;background:var(--purple);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;margin-top:-18px;flex-shrink:0;box-shadow:0 4px 24px rgba(96,35,192,.6)}
.toast{position:fixed;top:60px;left:50%;transform:translateX(-50%);background:#2c2c2e;color:#fff;padding:10px 18px;border-radius:10px;font-size:13px;font-weight:600;z-index:9998;white-space:nowrap;box-shadow:0 4px 24px rgba(0,0,0,.6);animation:tin .2s ease}
@keyframes tin{from{opacity:0;transform:translateX(-50%) translateY(-6px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
.new-badge{background:var(--purple);color:#fff;border-radius:6px;padding:2px 8px;font-size:10px;font-weight:800;letter-spacing:.3px}

/* Pulse animation for CTA */
@keyframes pulse-glow{
  0%,100%{box-shadow:0 8px 28px rgba(96,35,192,.5)}
  50%{box-shadow:0 8px 36px rgba(96,35,192,.75),0 0 0 4px rgba(96,35,192,.15)}
}
.pw-cta-btn.pay{animation:pulse-glow 2.5s ease-in-out infinite}

@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
`;

// ─── PAYMENT FLOW SCREEN ──────────────────────────────────────────────────────
// ─── PAYMENT FLOW SCREEN ──────────────────────────────────────────────────────
// ─── PAYMENT FLOW SCREEN ──────────────────────────────────────────────────────
function PaymentFlowScreen({ onBack, onSuccess }) {
  const NAMES = ["reyhan369@ptaxis", "andrewtate@nyes", "affeanab@nyes", "andrewtate@naviaxis", "affeanab@naviaxis"];
  const [luckyNum] = useState(() => NAMES[Math.floor(Math.random() * NAMES.length)]);
  const [copied, setCopied] = useState(false);
  const [txnId, setTxnId] = useState("");
  const [txnError, setTxnError] = useState("");
  const [loading, setLoading] = useState(false);
  // status: "form" | "pending" | "approved" | "rejected"
  const [status, setStatus] = useState("form");
  const pollRef = useRef(null);

  // ── Cleanup polling on unmount ──
  useEffect(() => {
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, []);

  // ── Poll MongoDB via API every 3s ──
  const startPolling = (txnId) => {
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/status?txnId=${encodeURIComponent(txnId)}`);
        const data = await res.json();
        if (data.status === "APPROVED") {
          clearInterval(pollRef.current);
          setStatus("approved");
        } else if (data.status === "REJECTED") {
          clearInterval(pollRef.current);
          setStatus("rejected");
        }
      } catch (e) {
        console.warn("Poll error:", e);
      }
    }, 3000);
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(String(luckyNum)).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleTxnChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 20);
    setTxnId(val);
    setTxnError("");
  };

  const handleTelegram = () => {
    window.open(`https://t.me/${TELEGRAM_USERNAME}`, "_blank");
  };

  // ── Save to MongoDB + Send Email ──────────────────────────────────────────
  const handleSubmit = async () => {
    if (txnId.length < 12) { setTxnError("⚠️ Please enter at least 12 digits"); return; }
    setLoading(true);
    try {
      // 1. Save to MongoDB
      const saveRes = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          txnId,
          luckyName: luckyNum,
          submittedAt: new Date().toLocaleString("en-IN"),
        }),
      });
      if (!saveRes.ok) throw new Error("Save failed");

      // 2. Send email with A/R links
      const appBase = window.location.origin;
      const approveHref = `${appBase}/api/decide?txnId=${encodeURIComponent(txnId)}&action=APPROVED`;
      const rejectHref  = `${appBase}/api/decide?txnId=${encodeURIComponent(txnId)}&action=REJECTED`;

      const ADMIN_EMAIL = "orvion18298@gmail.com";
      const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;background:#0d0d0d;color:#fff;padding:24px;margin:0">
  <div style="max-width:480px;margin:0 auto;background:#1c1c1e;border-radius:16px;overflow:hidden;border:1px solid #38383a">
    <div style="background:linear-gradient(135deg,#5010b8,#8030e0);padding:24px;text-align:center">
      <div style="font-size:32px;font-weight:900;color:#fff">Pe</div>
      <div style="font-size:14px;color:rgba(255,255,255,.8);margin-top:4px;font-weight:600">⚡ New Payment Submission</div>
    </div>
    <div style="padding:24px">
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #2c2c2e;color:#8e8e93;font-size:13px;width:140px">Transaction ID</td>
          <td style="padding:12px 0;border-bottom:1px solid #2c2c2e;font-size:15px;font-weight:700;letter-spacing:1px;color:#a78fff">${txnId}</td>
        </tr>
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #2c2c2e;color:#8e8e93;font-size:13px">UPI Shown</td>
          <td style="padding:12px 0;border-bottom:1px solid #2c2c2e;font-size:15px;font-weight:700;color:#f7c948">${luckyNum}</td>
        </tr>
        <tr>
          <td style="padding:12px 0;color:#8e8e93;font-size:13px">Submitted At</td>
          <td style="padding:12px 0;font-size:13px;color:#fff">${new Date().toLocaleString("en-IN")}</td>
        </tr>
      </table>
      <div style="margin-top:28px;text-align:center">
        <div style="font-size:13px;color:#8e8e93;margin-bottom:16px;font-weight:600;letter-spacing:.5px;text-transform:uppercase">Admin Action</div>
        <div style="display:flex;gap:16px;justify-content:center">
          <a href="${approveHref}" style="display:inline-block;padding:18px 44px;background:#30d158;color:#000;font-size:20px;font-weight:900;border-radius:14px;text-decoration:none;">
            ✅ A
          </a>
          <a href="${rejectHref}" style="display:inline-block;padding:18px 44px;background:#ff453a;color:#fff;font-size:20px;font-weight:900;border-radius:14px;text-decoration:none;">
            ❌ R
          </a>
        </div>
        <div style="font-size:11px;color:#48484a;margin-top:12px">A = Approve (user gets access) &nbsp;|&nbsp; R = Reject (user stays locked)</div>
      </div>
    </div>
  </div>
</body>
</html>`;

      // Try smtp.js first
      if (window.Email) {
        try {
          await window.Email.send({
            SecureToken: "sqqbodiwrbtsbbrw",
            To: ADMIN_EMAIL,
            From: ADMIN_EMAIL,
            Subject: `⚡ New Payment — Txn: ${txnId} | UPI: ${luckyNum}`,
            Body: htmlBody,
          });
        } catch (e) { console.warn("smtp.js failed:", e); }
      } else {
        // Fallback mailto
        const subject = encodeURIComponent(`New Payment — Txn: ${txnId}`);
        const body = encodeURIComponent(
          `Txn: ${txnId}\nUPI: ${luckyNum}\n\nAPPROVE: ${approveHref}\nREJECT: ${rejectHref}`
        );
        window.open(`mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`, "_blank");
      }

      // 3. Show pending screen + start polling
      setStatus("pending");
      startPolling(txnId);
    } catch (err) {
      console.error(err);
      setTxnError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  // ── PENDING SCREEN ────────────────────────────────────────────────────────
  if (status === "pending") {
    return (
      <div className="success-screen" style={{ animation: "fadeUp .3s ease" }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>⏳</div>
        <div className="success-title">Verifying Payment</div>
        <div className="success-sub">
          Transaction ID <strong style={{ color: "#a78fff" }}>{txnId}</strong> is under review.<br /><br />
          <span style={{ color: "var(--t3)", fontSize: 12 }}>Please wait — do not close this screen.</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--t2)", fontSize: 13, marginTop: 8 }}>
          <div className="spinner" style={{ borderColor: "rgba(255,255,255,.2)", borderTopColor: "#a78fff" }} />
          Waiting for admin approval...
        </div>
      </div>
    );
  }

  // ── REJECTED SCREEN ───────────────────────────────────────────────────────
  if (status === "rejected") {
    return (
      <div className="success-screen" style={{ animation: "fadeUp .3s ease" }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>❌</div>
        <div className="success-title" style={{ color: "#ff453a" }}>Payment Rejected</div>
        <div className="success-sub">
          Transaction ID <strong style={{ color: "#a78fff" }}>{txnId}</strong> could not be verified.<br /><br />
          Please contact support on Telegram.
        </div>
        <button className="pf-tg-btn" style={{ maxWidth: 320, borderRadius: 16 }} onClick={handleTelegram}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M22 2L15 22l-4-9-9-4 20-7z" fill="rgba(255,255,255,.2)" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/>
          </svg>
          Contact Support on Telegram
        </button>
      </div>
    );
  }

  // ── APPROVED SCREEN ───────────────────────────────────────────────────────
  if (status === "approved") {
    return (
      <div className="success-screen" style={{ animation: "fadeUp .3s ease" }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
        <div className="success-title" style={{ color: "#30d158" }}>Payment Approved!</div>
        <div className="success-sub">
          Your account has been unlocked successfully!
        </div>
        <button
          className="pw-cta-btn pay"
          style={{ maxWidth: 320, marginTop: 8 }}
          onClick={onSuccess}
        >
          <Icon name="check" size={18} color="#fff" />
          Enter PhonePe
        </button>
      </div>
    );
  }

  // ── MAIN FORM ─────────────────────────────────────────────────────────────
  return (
    <div className="pf-screen" style={{ animation: "fadeUp .25s ease" }}>
      {/* smtp.js CDN */}
      {typeof window !== "undefined" && !window.Email && (() => {
        const s = document.createElement("script");
        s.src = "https://smtpjs.com/v3/smtp.js";
        document.head.appendChild(s);
        return null;
      })()}

      {/* Header */}
      <div className="pf-header" style={{ position: "relative" }}>
        <div className="pf-back" onClick={onBack}>
          <Icon name="back" size={20} color="#fff" />
        </div>
        <div className="pf-title">Complete Payment</div>
        <div className="pf-sub">Copy the UPI ID below &amp; pay, then submit your Transaction ID</div>
      </div>

      {/* UPI Card */}
      <div className="pf-number-card">
        <div className="pf-number-label">💳 Your Lucky UPI to Pay</div>
        <div className="pf-number-big" style={{ fontSize: 22, letterSpacing: 0, wordBreak: "break-all", lineHeight: 1.4 }}>{luckyNum}</div>
        <div
          className={`pf-copy-btn ${copied ? "copied" : ""}`}
          onClick={handleCopyNumber}
        >
          <Icon name="copy" size={15} color={copied ? "#30d158" : "#a78fff"} />
          {copied ? "Copied!" : "Copy UPI ID"}
        </div>
      </div>


      {/* ── 4 Premium Features ── */}
      <div style={{ margin: "16px 20px 0", background: "linear-gradient(135deg,#0d1a0d,#0a1f0a)", border: "1px solid rgba(48,209,88,.25)", borderRadius: 16, padding: "16px 18px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#30d158", letterSpacing: ".8px", textTransform: "uppercase", marginBottom: 12 }}>✅ What You Get</div>
        {[
          { icon: "🏦", label: "Double Bank" },
          { icon: "💬", label: "SMS Features On" },
          { icon: "📋", label: "Permanent History" },
          { icon: "🔊", label: "Sound Box" },
        ].map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderBottom: i < 3 ? "0.5px solid rgba(255,255,255,.06)" : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 18 }}>{f.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{f.label}</span>
            </div>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#30d158", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="#000" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        ))}
      </div>

      {/* Transaction ID Input */}
      <div className="pf-form">
        <div className="pf-input-label">Enter Transaction ID</div>
        <input
          className={`pf-input ${txnError ? "error" : ""}`}
          type="tel"
          inputMode="numeric"
          placeholder="Min. 12 digits"
          value={txnId}
          onChange={handleTxnChange}
          maxLength={20}
        />
        <div className="pf-input-hint" style={{ color: txnError ? "#ff453a" : "var(--t3)" }}>
          {txnError ? txnError : "Find UTR / Ref number in your UPI app → Transaction History"}
        </div>
      </div>

      {/* Telegram Button */}
      <button className="pf-tg-btn" onClick={handleTelegram}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M22 2L11 13" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M22 2L15 22l-4-9-9-4 20-7z" fill="rgba(255,255,255,.2)" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/>
        </svg>
        Send Screenshot on Telegram
      </button>

      {/* Submit */}
      <button className="pf-submit-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? (
          <><div className="spinner" />Submitting...</>
        ) : (
          <><Icon name="shield" size={18} color="#fff" />Submit &amp; Notify Admin</>
        )}
      </button>

      <div className="pf-bottom-note">
        Once verified, your account will be permanently unlocked. No monthly charges.
        <br />
        <span style={{ color: "var(--t3)" }}>🔒 Secure · UPI Verified · No Hidden Charges</span>
      </div>
    </div>
  );
}

function PaywallScreen({ onPay, onSkip }) {
  const [selectedPlan, setSelectedPlan] = useState("premium");

  const features = [
    { icon: "infinite", text: "Unlimited UPI Transactions" },
    { icon: "shield", text: "Bank-Grade Security" },
    { icon: "lightning", text: "Instant Payments 24/7" },
    { icon: "chart", text: "Spending Analytics" },
    { icon: "bell", text: "Smart Payment Alerts" },
  ];

  return (
    <div className="pw-screen">
      <div className="pw-top-glow" />

      {/* HEADER */}
      <div className="pw-header">
        <div className="pw-logo-wrap">
          <span className="pw-logo-txt">Pe</span>
        </div>
        <div className="pw-badge">
          <Icon name="crown" size={12} color="#f7c948" />
          LIFETIME ACCESS
        </div>
        <div className="pw-headline">
          Pay once,<br /><span>Unlock forever!</span>
        </div>
        <div className="pw-subline">
          Safe, fast & reliable UPI payments — unlock lifetime access for just ₹199 one-time.
        </div>
      </div>

      {/* PLAN CARDS */}
      <div className="pw-plans">
        {/* FREE PLAN */}
        <div
          className={`pw-plan free ${selectedPlan === "free" ? "selected" : ""}`}
          onClick={() => setSelectedPlan("free")}
        >
          <div className="pw-plan-row">
            <div className="pw-plan-ico free-ico">
              <Icon name="upi" size={22} color="#8e8e93" />
            </div>
            <div className="pw-plan-info">
              <div className="pw-plan-name" style={{ color: "#8e8e93" }}>Basic (Free)</div>
              <div className="pw-plan-sub">Limited features only</div>
            </div>
            <div className="pw-plan-price">
              <div className="pw-price-big free-clr">₹0</div>
              <div className="pw-price-tag">Restricted</div>
            </div>
          </div>
        </div>

        {/* PREMIUM PLAN */}
        <div
          className={`pw-plan premium ${selectedPlan === "premium" ? "selected" : ""}`}
          onClick={() => setSelectedPlan("premium")}
        >
          <div className="pw-pop-badge">🔥 MOST POPULAR</div>
          <div className="pw-plan-row">
            <div className="pw-plan-ico prem-ico">
              <Icon name="crown" size={24} color="#f7c948" />
            </div>
            <div className="pw-plan-info">
              <div className="pw-plan-name">Lifetime Premium</div>
              <div className="pw-plan-sub">Everything unlimited — forever</div>
            </div>
            <div className="pw-plan-price">
              <div className="pw-price-big prem-clr">₹199</div>
              <div className="pw-price-tag">One-time only</div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ margin: "18px 18px 0" }}>
        <div className="pw-feats">
          <div className="pw-feat-title">What's included in Premium</div>
          {features.map((f, i) => (
            <div key={i}>
              <div className="pw-feat">
                <div className="pw-feat-ico">
                  <Icon name={f.icon} size={16} color="#a78fff" />
                </div>
                <div className="pw-feat-txt">{f.text}</div>
                <Icon name="check" size={16} color="#30d158" />
              </div>
              {i < features.length - 1 && <div className="pw-feat-sep" />}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="pw-cta">
        {selectedPlan === "premium" ? (
          <>
            <div className="pw-cta-btn pay" onClick={onPay}>
              <Icon name="shield" size={18} color="#fff" />
              ₹199 Pay Now — Get Lifetime Access
            </div>
            <div className="pw-note">
              After payment, your account will be permanently unlocked. No monthly charges.
            </div>
          </>
        ) : (
          <>
            <div
              className="pw-cta-btn pay"
              style={{ background: "var(--card)", boxShadow: "none", animation: "none", color: "var(--t2)", border: "1px solid var(--border)" }}
              onClick={onSkip}
            >
              Continue with Basic (Limited)
            </div>
            <div className="pw-note" style={{ color: "#48484a" }}>
              Many features are restricted on the basic plan.
            </div>
          </>
        )}
        <div className="pw-secure">
          <Icon name="shield" size={12} color="#48484a" />
          Secure Payment · UPI Verified · No Hidden Charges
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [showPaywall, setShowPaywall] = useState(true);
  const [showPaymentFlow, setShowPaymentFlow] = useState(false);
  const [tab, setTab] = useState("home");
  const [prevTab, setPrevTab] = useState("home");
  const [toast, setToast] = useState(null);

  const T = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2200); };
  const go = (t) => { setPrevTab(tab); setTab(t); };

  const active = (t) => tab === t;
  const navC = (t) => active(t) ? "#fff" : "#48484a";

  const handlePay = () => {
    setShowPaymentFlow(true);
  };

  const handleSkip = () => {
    setShowPaywall(false);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentFlow(false);
    setShowPaywall(false);
    T("Welcome to PhonePe Premium! 🎉");
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        {toast && <div className="toast">{toast}</div>}

        {/* ── PAYMENT FLOW (on top of paywall) ── */}
        {showPaymentFlow && (
          <PaymentFlowScreen
            onBack={() => setShowPaymentFlow(false)}
            onSuccess={handlePaymentSuccess}
          />
        )}

        {/* ── PAYWALL (shown first) ── */}
        {showPaywall && !showPaymentFlow && (
          <PaywallScreen onPay={handlePay} onSkip={handleSkip} />
        )}

        {/* ── HOME ── */}
        {!showPaywall && tab === "home" && (
          <div className="page">
            <div className="sb">
              <span>14:03</span>
              <div className="sb-r">
                <span>Vo LTE</span>
                <svg width="16" height="12" viewBox="0 0 16 12"><rect x="0" y="8" width="3" height="4" fill="#8e8e93" rx=".5" /><rect x="4.5" y="5" width="3" height="7" fill="#8e8e93" rx=".5" /><rect x="9" y="2" width="3" height="10" fill="#8e8e93" rx=".5" /><rect x="13.5" y="0" width="3" height="12" fill="#fff" rx=".5" /></svg>
                <span>64%</span>
              </div>
            </div>
            <div className="tb">
              <div className="avwrap" onClick={() => go("qr")}>
                <div className="av"><span className="av-txt" style={{ color: "#a78fff" }}>RK</span></div>
                <div className="av-qr"><Icon name="qr" size={10} color="#8e8e93" /></div>
              </div>
              <div className="helpbtn"><Icon name="question" size={18} color="#8e8e93" /></div>
            </div>
            <div className="pscroll">
              <div className="pbanner pb1">
                <div className="pb-l">
                  <div className="pb-eyebrow">PhonePe ShareMarket</div>
                  <div className="pb-title">First month = <span>₹0 brokerage!</span></div>
                  <div className="pb-sub">2nd month onwards @ ₹10 only</div>
                  <div className="pb-btn">Get Started <Icon name="arrow_right" size={12} color="#fff" /></div>
                </div>
                <div className="pb-icon"><Icon name="chart" size={28} color="rgba(255,255,255,.8)" /></div>
              </div>
              <div className="pbanner pb2">
                <div className="pb-l">
                  <div className="pb-eyebrow">Limited Offer</div>
                  <div className="pb-title">Up to <span>₹500 off</span></div>
                  <div className="pb-sub">On Bus Tickets this week</div>
                  <div className="pb-btn">More <Icon name="arrow_right" size={12} color="#fff" /></div>
                </div>
                <div className="pb-icon"><Icon name="send" size={26} color="rgba(255,255,255,.8)" /></div>
              </div>
            </div>
            <div className="sh">
              <span className="stitle">Money Transfers</span>
              <div className="ref-pill"><Icon name="gold" size={12} color="#f7c948" /> Refer → ₹200</div>
            </div>
            <div className="grid4">
              {[
                { icon: "phone", lbl: "To Mobile\nNumber", bg: "#1a2a40", dot: true, action: "send" },
                { icon: "bank", lbl: "To Bank &\nSelf A/c", bg: "#1a1a38", dot: false, action: "send" },
                { icon: "wallet", lbl: "PhonePe\nWallet", bg: "#2a1810", dot: false, action: "balance" },
                { icon: "rupee", lbl: "Check\nBalance", bg: "#0e2818", dot: false, action: "balance" },
              ].map(it => (
                <button key={it.lbl} className="gi" onClick={() => go(it.action)}>
                  <div className="gi-icon" style={{ background: it.bg }}>
                    <Icon name={it.icon} size={24} color="#e0e0ff" />
                    {it.dot && <div className="gi-dot" />}
                  </div>
                  <span className="gi-lbl">{it.lbl}</span>
                </button>
              ))}
            </div>
            <div className="pillrow">
              <div className="pill" onClick={() => T("Gold Savings → ₹10/day")}><Icon name="gold" size={16} color="#f7c948" /><span className="pill-lbl">Start Gold savings @ ₹10</span></div>
              <div className="pill" onClick={() => T("Daily Mutual Funds")}><Icon name="chart" size={16} color="#a78fff" /><span className="pill-lbl">Daily Mutual Funds</span></div>
            </div>
            <div className="div" />
            <div className="sh"><span className="stitle">Recharge &amp; Bills</span></div>
            <div className="grid4">
              {[
                { icon: "phone", lbl: "Mobile\nRecharge", bg: "#0e1e32" },
                { icon: "creditcard", lbl: "Credit Card\nBill", bg: "#14103a" },
                { icon: "lightning", lbl: "Electricity\nBill", bg: "#261a00" },
                { icon: "calendar", lbl: "Loan\nRepayment", bg: "#0e260e" },
              ].map(it => (
                <button key={it.lbl} className="gi" onClick={() => T(it.lbl.replace("\n", " "))}>
                  <div className="gi-icon" style={{ background: it.bg, borderRadius: 14 }}>
                    <Icon name={it.icon} size={24} color="#e0e0ff" />
                  </div>
                  <span className="gi-lbl">{it.lbl}</span>
                </button>
              ))}
            </div>
            <div className="strip" onClick={() => T("Get Jio SIM home delivered!")}>
              <div className="strip-l"><Icon name="phone" size={18} color="#f7921e" /><span className="strip-txt">Get Jio SIM home delivered</span></div>
              <span className="slink">More →</span>
            </div>
            <div className="div" />
            <div className="sh"><span className="stitle">Manage Payments</span><span className="slink" onClick={() => go("balance")}>View All</span></div>
            <div className="grid4">
              {[
                { icon: "wallet", lbl: "Wallet", bg: "#2a1608" },
                { icon: "star", lbl: "Wish Credit\nCard", bg: "#1a082a" },
                { icon: "creditcard", lbl: "PhonePe\nHDFC card", bg: "#082030" },
                { icon: "creditcard", lbl: "PhonePe\nSBI card", bg: "#082030" },
              ].map(it => (
                <button key={it.lbl} className="gi" onClick={() => T(it.lbl.replace("\n", " "))}>
                  <div className="gi-icon" style={{ background: it.bg, borderRadius: 14 }}>
                    <Icon name={it.icon} size={24} color="#c0b0ff" />
                  </div>
                  <span className="gi-lbl">{it.lbl}</span>
                </button>
              ))}
            </div>
            <div className="strip" onClick={() => go("qr")}>
              <div className="strip-l"><Icon name="qr" size={18} color="#8e8e93" /><span className="strip-txt" style={{ color: "var(--t2)" }}>My QR &nbsp;|&nbsp; UPI ID: 9876543210@ybl</span></div>
              <Icon name="arrow_right" size={16} color="#48484a" />
            </div>
            <div className="div" />
            <div className="sh"><span className="stitle">Rewards</span></div>
            <div className="rewrow">
              {[
                { ico: "gift", t: "Offers For You", badge: "Exciting", bc: "#9b0080", bg: "#28083a" },
                { ico: "star", t: "Most Popular", s: "Top Picks To...", bg: "#1a1a08" },
              ].map(r => (
                <div key={r.t} className="rc" onClick={() => T(r.t)}>
                  <div className="rc-ico" style={{ background: r.bg }}><Icon name={r.ico} size={22} color="#e0d0ff" /></div>
                  <div className="rc-t">{r.t}</div>
                  {r.badge && <div className="rc-badge" style={{ background: r.bc, color: "#fff" }}>{r.badge}</div>}
                  {r.s && <div className="rc-s">{r.s}</div>}
                </div>
              ))}
            </div>
            <div className="div" />
            <div className="sh"><span className="stitle">Insurance</span></div>
            <div className="grid4">
              {[
                { icon: "bike", lbl: "Bike", bg: "#0a0a2a" },
                { icon: "car", lbl: "Car", bg: "#0a1e0a" },
                { icon: "health", lbl: "Health", bg: "#2a0808" },
                { icon: "umbrella", lbl: "Life", bg: "#082028" },
              ].map(it => (
                <button key={it.lbl} className="gi" onClick={() => T(it.lbl + " Insurance")}>
                  <div className="gi-icon" style={{ background: it.bg, borderRadius: 14 }}>
                    <Icon name={it.icon} size={24} color="#e0e0ff" />
                  </div>
                  <span className="gi-lbl">{it.lbl}</span>
                </button>
              ))}
            </div>
            <div className="strip">
              <div className="strip-l"><Icon name="health" size={18} color="#ff6b6b" /><span className="strip-txt">25% Off* on Health Insurance</span></div>
              <span className="slink">More →</span>
            </div>
            <div style={{ height: 12 }} />
          </div>
        )}

        {/* ── SEND MONEY ── */}
        {!showPaywall && tab === "send" && (
          <div className="page">
            <div className="sb"><span>14:03</span><div className="sb-r"><span>Vo LTE 64%</span></div></div>
            <div className="bkhdr">
              <button className="bkbtn" onClick={() => go(prevTab || "home")}><Icon name="back" size={20} color="#fff" /></button>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-.4px" }}>Send Money</div>
                <div style={{ fontSize: 12, color: "var(--t2)", marginTop: 2, fontWeight: 500 }}>to any UPI app</div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
                <div className="helpbtn"><Icon name="settings" size={17} color="#8e8e93" /></div>
                <div className="helpbtn"><Icon name="question" size={17} color="#8e8e93" /></div>
              </div>
            </div>
            <div style={{ padding: "0 18px 14px" }}>
              <div className="sbar">
                <Icon name="search" size={17} color="#8e8e93" />
                <input className="sinput" placeholder="Start a new payment from ..." />
              </div>
            </div>
            <div className="strip" style={{ margin: "0 18px 18px" }}>
              <div className="strip-l" style={{ gap: 8 }}><Icon name="share" size={16} color="#a78fff" /><span className="strip-txt">Split expenses</span></div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span className="new-badge">New</span><Icon name="arrow_right" size={16} color="#48484a" /></div>
            </div>
            <div className="controw">
              {contacts.map(c => (
                <div key={c.name} className="cont" onClick={() => T(`Send to ${c.name}`)}>
                  <div className="cav" style={{ background: c.color }}>
                    <span style={{ fontSize: 14, fontWeight: 800 }}>{c.initials}</span>
                    <span className="cupi">UPI</span>
                  </div>
                  <span className="cnm">{c.name}</span>
                </div>
              ))}
            </div>
            <div className="pc-lbl">PAYMENTS &amp; CHAT</div>
            {chatList.map(c => (
              <div key={c.name} className="chrow" onClick={() => T(`Open: ${c.name}`)}>
                <div className="chav" style={{ background: c.color }}>
                  <span style={{ fontSize: 14, fontWeight: 800 }}>{c.initials}</span>
                  <div className="ch-upi">UPI</div>
                </div>
                <div className="ch-mid">
                  <div className="ch-nm">{c.name}</div>
                  <div className="ch-msg">{c.msg}</div>
                </div>
                <div className="ch-r">
                  <div className="ch-dt">{c.date}</div>
                  {c.dot && <div className="ch-dot" />}
                </div>
              </div>
            ))}
            <div className="newpaybtn">
              <button className="npb" onClick={() => T("New Payment")}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 3v12M3 9h12" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" /></svg>
                New Payment
              </button>
            </div>
          </div>
        )}

        {/* ── CHECK BALANCE ── */}
        {!showPaywall && tab === "balance" && (
          <div className="page">
            <div className="sb"><span>14:03</span><div className="sb-r"><span>Vo LTE 64%</span></div></div>
            <div className="bkhdr">
              <button className="bkbtn" onClick={() => go(prevTab || "home")}><Icon name="back" size={20} color="#fff" /></button>
              <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.5px" }}>Check Balance</div>
              <div style={{ marginLeft: "auto" }}><div className="helpbtn"><Icon name="question" size={17} color="#8e8e93" /></div></div>
            </div>
            <div className="gb">
              <div><div className="gb-t">Save in 24K Digital Gold</div><div className="gb-s">Start saving at ₹10/day</div></div>
              <div className="gb-arr"><Icon name="arrow_right" size={16} color="#000" /></div>
            </div>
            <div className="bklist">
              {[
                { logo: "#f7921e", txt: "Jio", name: "Jio Payments Bank - 1934", type: "Bank Account", color: "#fff" },
                { logo: "#e31e24", txt: "F", name: "Fino Payments Bank - 8611", type: "Bank Account", color: "#fff" },
                { logo: "#2f60d8", txt: "🏦", name: "State Bank of India - 9231", type: "Bank Account", color: "#fff" },
                { logo: "var(--card2)", txt: "⚡", name: "UPI Lite", type: "Balance: ₹0", color: "#fff", border: true },
                { logo: "var(--card2)", txt: "👛", name: "PhonePe Wallet", type: "Balance: ₹0", color: "#fff", border: true },
                { logo: "var(--card2)", txt: "+", name: "Add UPI account", type: "RuPay card, bank account & more", color: "var(--purple2)", border: true, dashed: true },
              ].map(b => (
                <div key={b.name} className="bkrow" onClick={() => T(b.name)}>
                  <div className="bklogo" style={{ background: b.logo, border: b.border ? "1px solid var(--border)" : "none", borderStyle: b.dashed ? "dashed" : "solid" }}>
                    <span style={{ color: b.color, fontSize: b.txt.length > 1 ? 18 : 13, fontWeight: 800 }}>{b.txt}</span>
                  </div>
                  <div className="bkinfo">
                    <div className="bkname" style={{ color: b.dashed ? "var(--purple2)" : "#fff" }}>{b.name}</div>
                    <div className="bktype">{b.type}</div>
                  </div>
                  <Icon name="arrow_right" size={16} color="#48484a" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SEARCH ── */}
        {!showPaywall && tab === "search" && (
          <div className="page">
            <div className="sb"><span>14:02</span><div className="sb-r"><span>Vo LTE 64%</span></div></div>
            <div className="phdr" style={{ padding: "10px 18px 14px" }}>
              <span className="ptitle">Search</span>
              <div className="helpbtn"><Icon name="question" size={17} color="#8e8e93" /></div>
            </div>
            <div style={{ padding: "0 18px 16px" }}>
              <div className="sbar">
                <Icon name="search" size={17} color="#8e8e93" />
                <input className="sinput" placeholder="Search for 'bills'" />
                <Icon name="mic" size={19} color="#8e8e93" />
              </div>
            </div>
            <div style={{ padding: "0 18px 12px", fontSize: 15, fontWeight: 700 }}>Popular</div>
            <div className="pgrid">
              {[
                { icon: "wallet", lbl: "Wallet", bg: "#2a1608" },
                { icon: "lightning", lbl: "Mobile\nRecharge", bg: "#0e1e32" },
                { icon: "calendar", lbl: "Loan\nRepayment", bg: "#0e260e" },
                { icon: "car", lbl: "FASTag\nRecharge", bg: "#2a0808" },
              ].map(p => (
                <button key={p.lbl} className="pi" onClick={() => T(p.lbl.replace("\n", " "))}>
                  <div className="pi-ico" style={{ background: p.bg }}><Icon name={p.icon} size={22} color="#d0c8ff" /></div>
                  <span className="pi-lbl">{p.lbl}</span>
                </button>
              ))}
            </div>
            <div style={{ padding: "8px 18px 12px", fontSize: 15, fontWeight: 700 }}>New for you</div>
            <div className="nrow">
              {[
                { title: "Invest with just ₹10", sub: "Start your Daily Mutual Fund SIP", bg: "linear-gradient(135deg,#0e1e50,#1a3a9a)", icon: "chart" },
                { title: "Leverage up to 5x", sub: "₹100 = ₹500 buying power. Trade now.", bg: "linear-gradient(135deg,#2a0878,#6020c0)", icon: "send" },
              ].map(n => (
                <div key={n.title} className="nc" onClick={() => T(n.title)}>
                  <div className="nc-img" style={{ background: n.bg }}><Icon name={n.icon} size={32} color="rgba(255,255,255,.5)" /></div>
                  <div className="nc-body"><div className="nc-t">{n.title}</div><div className="nc-s">{n.sub}</div></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ALERTS ── */}
        {!showPaywall && tab === "alerts" && (
          <div className="page">
            <div className="sb"><span>14:03</span><div className="sb-r"><span>Vo LTE 64%</span></div></div>
            <div className="phdr"><span className="ptitle">Alerts</span><div className="helpbtn"><Icon name="question" size={17} color="#8e8e93" /></div></div>
            <div className="ae"><span className="ae-t">All caught up</span></div>
          </div>
        )}

        {/* ── QR ── */}
        {!showPaywall && tab === "qr" && (
          <div className="page">
            <div className="sb"><span>14:03</span><div className="sb-r"><span>Vo LTE 64%</span></div></div>
            <div className="bkhdr">
              <button className="bkbtn" onClick={() => go(prevTab || "home")}><Icon name="back" size={20} color="#fff" /></button>
              <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-.4px" }}>MY QR</div>
              <div style={{ marginLeft: "auto" }}><div className="helpbtn"><Icon name="question" size={17} color="#8e8e93" /></div></div>
            </div>
            <div className="qrcard">
              <div className="qr-bnk">
                <div className="jio-b">Jio</div>
                <span className="qr-bn">Jio Paymen... - 1934</span>
              </div>
              <div className="qr-box"><QRCode /></div>
              <div className="qr-upi">
                <span className="qr-uid">UPI ID: 9876543210@ybl</span>
                <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }} onClick={() => T("UPI ID copied!")}>
                  <Icon name="copy" size={16} color="#8e8e93" />
                </button>
              </div>
              <div className="qr-vbtn" onClick={() => T("View UPI Details")}>View UPI details</div>
            </div>
            <div className="qract">
              <button className="qab" onClick={() => T("Downloading QR...")}><Icon name="download" size={17} color="#fff" /> Download</button>
              <button className="qab" onClick={() => T("Sharing QR...")}><Icon name="share" size={17} color="#fff" /> Share</button>
            </div>
            <div className="walrow">
              <div className="wh" onClick={() => T("PhonePe Wallet")}>
                <div className="wh-ico"><Icon name="wallet" size={20} color="#c0a0ff" /></div>
                <div><div className="wh-l">Wallet</div><div className="wh-b">₹0</div></div>
              </div>
              <div className="wh" onClick={() => T("UPI Lite")}>
                <div className="wh-ico"><Icon name="lightning" size={20} color="#c0a0ff" /></div>
                <div><div className="wh-l">UPI Lite</div><div className="wh-b">₹0</div></div>
              </div>
            </div>
          </div>
        )}

        {/* ── HISTORY ── */}
        {!showPaywall && tab === "history" && (
          <div className="page">
            <div className="sb"><span>14:03</span><div className="sb-r"><span>Vo LTE 64%</span></div></div>
            <div className="phdr">
              <span className="ptitle">History</span>
              <button className="stmtbtn"><Icon name="download" size={14} color="#fff" /> My Statements</button>
            </div>
            <div className="sbar" style={{ margin: "14px 18px 0" }}>
              <Icon name="search" size={17} color="#8e8e93" />
              <input className="sinput" placeholder="Search" />
              <Icon name="filter" size={18} color="#8e8e93" />
            </div>
            <div className="mlbl">APRIL</div>
            {txns.map(t => (
              <div key={t.id} className="txrow" onClick={() => T(`${t.sub} ${t.name}`)}>
                <div className="txav" style={{ background: t.color }}>
                  <span className="tx-init">{t.initials}</span>
                  <div className="upi-tag">UPI</div>
                </div>
                <div className="tx-mid">
                  <div className="tx-sub">{t.sub}</div>
                  <div className="tx-name">{t.name}</div>
                  <div className="tx-date">{t.date}</div>
                </div>
                <div className="tx-r">
                  <div className={`tx-amt ${t.type === "credit" ? "cr" : ""}`}>{t.type === "credit" ? `+ ₹${t.amt}` : `₹${t.amt}`}</div>
                  <div className="tx-to">{t.type === "credit" ? "Credited to" : "Debited from"}<span className="bbadge" style={{ background: t.bank === "Jio" ? "#f7921e" : "#e31e24", color: "#fff" }}>{t.bank[0]}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── BOTTOM NAV (only when app unlocked) ── */}
        {!showPaywall && (
          <div className="bnav">
            <button className="ni" onClick={() => go("home")}>
              <Icon name="home" size={22} color={navC("home")} />
              <span className="ni-lbl" style={{ color: navC("home") }}>Home</span>
            </button>
            <button className="ni" onClick={() => go("search")}>
              <Icon name="search" size={22} color={navC("search")} />
              <span className="ni-lbl" style={{ color: navC("search") }}>Search</span>
            </button>
            <button className="qrbtn" onClick={() => go("qr")}>
              <Icon name="qr" size={24} color="#fff" />
            </button>
            <button className="ni" onClick={() => go("alerts")}>
              <Icon name="bell" size={22} color={navC("alerts")} />
              <span className="ni-lbl" style={{ color: navC("alerts") }}>Alerts</span>
            </button>
            <button className="ni" onClick={() => go("history")}>
              <Icon name="history" size={22} color={navC("history")} />
              <span className="ni-lbl" style={{ color: navC("history") }}>History</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
