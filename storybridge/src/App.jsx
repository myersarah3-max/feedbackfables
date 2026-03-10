import { useState, useEffect } from "react";

// ── DEVELOPMENTAL LANGUAGE GUIDELINES ──────────────────────────────────────────
const DEV = {
  "4-5": { label:"Ages 4–5 (Pre-K)", sent:"Very short sentences, 5–8 words max.", vocab:"Only simple everyday words. Name emotions directly: happy, sad, mad, scared.", concept:"Concrete only. No metaphors. Simple cause-effect.", para:"1–2 sentences per paragraph.", level:"Read-aloud / picture book." },
  "6-7": { label:"Ages 6–7 (Grade 1–2)", sent:"Short sentences 6–10 words. Use 'and', 'but', 'so'.", vocab:"Sight words plus basic feelings with some nuance.", concept:"Simple sequence and problem-solution.", para:"2–3 sentences per paragraph.", level:"Early reader." },
  "8-9": { label:"Ages 8–9 (Grade 3–4)", sent:"Medium sentences 8–14 words. Some compound-complex.", vocab:"Broader vocabulary. Simple similes OK. Nuanced emotions.", concept:"Can understand multiple perspectives and confusion.", para:"2–4 sentences per paragraph.", level:"Chapter book." },
  "10-12": { label:"Ages 10–12 (Grade 5–7)", sent:"Varied length, up to 20 words. Complex sentences.", vocab:"Rich vocabulary, metaphor, abstract: identity, self-advocacy.", concept:"Nuanced identity, neurodiversity, systemic difference.", para:"3–5 sentences per paragraph.", level:"Middle-grade novel." }
};
function getDev(age) {
  const n = parseInt(age);
  if (!n || n <= 5) return DEV["4-5"];
  if (n <= 7) return DEV["6-7"];
  if (n <= 9) return DEV["8-9"];
  return DEV["10-12"];
}

// ── STORAGE ─────────────────────────────────────────────────────────────────────
async function loadBank() { try { const r = await window.storage.get("sb2"); return r ? JSON.parse(r.value) : []; } catch { return []; } }
async function saveBank(b) { try { await window.storage.set("sb2", JSON.stringify(b)); } catch {} }

// ── STYLES ───────────────────────────────────────────────────────────────────────
const S = {
  tb: { background:"rgba(255,255,255,0.13)", border:"1px solid rgba(255,255,255,0.22)", color:"white", padding:"7px 16px", borderRadius:20, fontSize:13, cursor:"pointer", fontFamily:"sans-serif" },
  nav: d => ({ width:48, height:48, borderRadius:"50%", border:"none", background:d?"#2a2a3a":"white", color:d?"#555":"#1a1a2e", fontSize:22, cursor:d?"not-allowed":"pointer" }),
  inp: { width:"100%", padding:"11px 13px", border:"2px solid #d1fae5", borderRadius:10, fontSize:15, fontFamily:"sans-serif", background:"white", color:"#1a1a2e", outline:"none", boxSizing:"border-box" },
  lbl: { display:"block", fontSize:11, fontWeight:700, color:"#2d6a4f", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:5 },
  card: { background:"white", borderRadius:16, padding:"20px", boxShadow:"0 2px 12px rgba(45,106,79,0.1)", marginBottom:14 }
};

// ── SVG ILLUSTRATIONS ─────────────────────────────────────────────────────────
// Each is a React component function
function IllCover() {
  return (
    <svg viewBox="0 0 520 340" style={{width:"100%",borderRadius:12,display:"block"}}>
      <defs>
        <linearGradient id="cSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#87CEEB"/><stop offset="100%" stopColor="#E0F4FF"/></linearGradient>
        <radialGradient id="cSun" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FFFDE7"/><stop offset="60%" stopColor="#FFE082"/><stop offset="100%" stopColor="#FFB300"/></radialGradient>
        <radialGradient id="cBody" cx="35%" cy="30%" r="70%"><stop offset="0%" stopColor="#E8C87A"/><stop offset="60%" stopColor="#C09040"/><stop offset="100%" stopColor="#8B6020"/></radialGradient>
        <radialGradient id="cHead" cx="40%" cy="35%" r="65%"><stop offset="0%" stopColor="#DEBA70"/><stop offset="60%" stopColor="#C09040"/><stop offset="100%" stopColor="#8B6020"/></radialGradient>
        <filter id="cShad"><feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#000" floodOpacity="0.18"/></filter>
      </defs>
      <rect width="520" height="340" fill="url(#cSky)"/>
      <ellipse cx="130" cy="275" rx="185" ry="80" fill="#B8DFA8" opacity="0.5"/>
      <ellipse cx="390" cy="270" rx="175" ry="75" fill="#A8D898" opacity="0.45"/>
      <circle cx="418" cy="62" r="36" fill="url(#cSun)" filter="url(#cShad)"/>
      <ellipse cx="411" cy="56" rx="5" ry="6" fill="#E65100"/><ellipse cx="425" cy="56" rx="5" ry="6" fill="#E65100"/>
      <path d="M406 68 Q418 78 430 68" stroke="#E65100" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <line x1="418" y1="20" x2="418" y2="11" stroke="#FFD54F" strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="418" y1="113" x2="418" y2="104" stroke="#FFD54F" strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="376" y1="62" x2="367" y2="62" stroke="#FFD54F" strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="460" y1="62" x2="469" y2="62" stroke="#FFD54F" strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="388" y1="32" x2="382" y2="26" stroke="#FFD54F" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="448" y1="32" x2="454" y2="26" stroke="#FFD54F" strokeWidth="2.5" strokeLinecap="round"/>
      <ellipse cx="115" cy="68" rx="56" ry="24" fill="white" opacity="0.94"/>
      <ellipse cx="85" cy="74" rx="34" ry="20" fill="white" opacity="0.94"/>
      <ellipse cx="148" cy="72" rx="40" ry="21" fill="white" opacity="0.94"/>
      <ellipse cx="296" cy="48" rx="44" ry="20" fill="white" opacity="0.88"/>
      <ellipse cx="271" cy="54" rx="28" ry="16" fill="white" opacity="0.88"/>
      <ellipse cx="323" cy="52" rx="30" ry="17" fill="white" opacity="0.88"/>
      <rect x="0" y="278" width="520" height="62" fill="#76C442"/>
      <ellipse cx="260" cy="278" rx="280" ry="22" fill="#8AD04A"/>
      <rect x="10" y="150" width="20" height="175" rx="6" fill="#5C3A1E" opacity="0.7"/>
      <ellipse cx="20" cy="140" rx="52" ry="56" fill="#2E6A20" opacity="0.65"/>
      <rect x="466" y="148" width="20" height="178" rx="6" fill="#5C3A1E" opacity="0.7"/>
      <ellipse cx="476" cy="138" rx="50" ry="54" fill="#2E6A20" opacity="0.65"/>
      <ellipse cx="260" cy="300" rx="200" ry="38" fill="#90CAF9" opacity="0.75"/>
      <ellipse cx="260" cy="298" rx="188" ry="28" fill="#B3E5FC" opacity="0.45"/>
      <ellipse cx="260" cy="298" rx="70" ry="22" fill="#4CAF50"/>
      <ellipse cx="260" cy="296" rx="66" ry="19" fill="#66BB6A"/>
      <ellipse cx="260" cy="255" rx="78" ry="52" fill="url(#cBody)" filter="url(#cShad)"/>
      <ellipse cx="260" cy="268" rx="50" ry="32" fill="#D8BA88"/>
      <ellipse cx="205" cy="295" rx="22" ry="12" fill="#A07828"/><ellipse cx="315" cy="295" rx="22" ry="12" fill="#A07828"/>
      <ellipse cx="205" cy="303" rx="18" ry="9" fill="#7A5818"/><ellipse cx="315" cy="303" rx="18" ry="9" fill="#7A5818"/>
      <ellipse cx="260" cy="198" rx="58" ry="47" fill="url(#cHead)" filter="url(#cShad)"/>
      <ellipse cx="230" cy="195" rx="16" ry="14" fill="#E8C870" opacity="0.4"/>
      <ellipse cx="290" cy="195" rx="16" ry="14" fill="#E8C870" opacity="0.4"/>
      <ellipse cx="260" cy="218" rx="30" ry="18" fill="#B08838"/>
      <ellipse cx="260" cy="224" rx="23" ry="12" fill="#907030"/>
      <ellipse cx="252" cy="220" rx="5" ry="4" fill="#604818" opacity="0.85"/>
      <ellipse cx="268" cy="220" rx="5" ry="4" fill="#604818" opacity="0.85"/>
      <ellipse cx="210" cy="166" rx="19" ry="15" fill="#B08838"/><ellipse cx="210" cy="166" rx="14" ry="10" fill="#D08060" opacity="0.85"/>
      <ellipse cx="310" cy="166" rx="19" ry="15" fill="#B08838"/><ellipse cx="310" cy="166" rx="14" ry="10" fill="#D08060" opacity="0.85"/>
      <ellipse cx="240" cy="190" rx="15" ry="17" fill="#1A1208"/><ellipse cx="280" cy="190" rx="15" ry="17" fill="#1A1208"/>
      <ellipse cx="240" cy="192" rx="11" ry="13" fill="#3D2800"/><ellipse cx="280" cy="192" rx="11" ry="13" fill="#3D2800"/>
      <ellipse cx="234" cy="185" rx="6" ry="7" fill="white" opacity="0.92"/><ellipse cx="274" cy="185" rx="6" ry="7" fill="white" opacity="0.92"/>
      <circle cx="247" cy="196" r="2.5" fill="white" opacity="0.6"/><circle cx="287" cy="196" r="2.5" fill="white" opacity="0.6"/>
      <path d="M244 212 Q260 223 276 212" stroke="#604818" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <ellipse cx="223" cy="205" rx="13" ry="8" fill="#FF8A65" opacity="0.28"/><ellipse cx="297" cy="205" rx="13" ry="8" fill="#FF8A65" opacity="0.28"/>
      <ellipse cx="260" cy="162" rx="45" ry="14" fill="#43A047" transform="rotate(-6 260 162)"/>
      <ellipse cx="260" cy="159" rx="42" ry="12" fill="#66BB6A" transform="rotate(-6 260 159)"/>
      <path d="M218 158 Q260 142 302 158" stroke="#2E7D32" strokeWidth="1.5" fill="none" opacity="0.7"/>
      <circle cx="298" cy="148" r="9" fill="#E53935"/><circle cx="298" cy="148" r="9" fill="none" stroke="#1A1208" strokeWidth="1.2"/>
      <line x1="298" y1="141" x2="298" y2="155" stroke="#1A1208" strokeWidth="1.2"/>
      <circle cx="298" cy="141" r="5" fill="#1A1208"/>
      <circle cx="293" cy="145" r="2" fill="#1A1208"/><circle cx="303" cy="145" r="2" fill="#1A1208"/>
      <circle cx="100" cy="290" r="9" fill="#F06292"/><circle cx="100" cy="290" r="5" fill="#FFE082"/>
      <circle cx="420" cy="288" r="9" fill="#CE93D8"/><circle cx="420" cy="288" r="5" fill="#FFF9C4"/>
      <circle cx="142" cy="286" r="7" fill="#FFE082"/><circle cx="142" cy="286" r="4" fill="white"/>
      <circle cx="378" cy="284" r="7" fill="#EF5350"/><circle cx="378" cy="284" r="4" fill="#FFE082"/>
    </svg>
  );
}

function IllPage1() {
  return (
    <svg viewBox="0 0 520 300" style={{width:"100%",borderRadius:12,display:"block"}}>
      <defs>
        <linearGradient id="p1s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#B8E4FF"/><stop offset="100%" stopColor="#D8F0C8"/></linearGradient>
        <radialGradient id="p1b" cx="38%" cy="32%" r="68%"><stop offset="0%" stopColor="#E8C870"/><stop offset="60%" stopColor="#C09040"/><stop offset="100%" stopColor="#8B6020"/></radialGradient>
        <radialGradient id="p1m" cx="38%" cy="32%" r="68%"><stop offset="0%" stopColor="#D4AA58"/><stop offset="60%" stopColor="#A87830"/><stop offset="100%" stopColor="#7A5210"/></radialGradient>
        <filter id="p1sh"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000" floodOpacity="0.15"/></filter>
      </defs>
      <rect width="520" height="300" fill="url(#p1s)"/>
      <polygon points="0,215 90,120 180,215" fill="#B8DFA8" opacity="0.55"/>
      <polygon points="100,215 210,95 320,215" fill="#A8D898" opacity="0.5"/>
      <polygon points="240,215 360,105 480,215" fill="#B8DFA8" opacity="0.45"/>
      <circle cx="455" cy="42" r="22" fill="#FFD54F"/>
      <ellipse cx="170" cy="52" rx="52" ry="22" fill="white" opacity="0.92"/><ellipse cx="142" cy="58" rx="32" ry="19" fill="white" opacity="0.92"/><ellipse cx="202" cy="57" rx="36" ry="20" fill="white" opacity="0.92"/>
      <path d="M0 248 Q130 232 260 242 Q390 252 520 238" fill="#90CAF9" opacity="0.65"/>
      <rect x="0" y="235" width="520" height="65" fill="#76C442"/>
      <ellipse cx="260" cy="235" rx="280" ry="18" fill="#8AD04A"/>
      <rect x="328" y="162" width="132" height="92" rx="5" fill="#FFE0B2" filter="url(#p1sh)"/>
      <polygon points="318,164 394,110 463,164" fill="#EF5350" filter="url(#p1sh)"/>
      <rect x="366" y="207" width="36" height="48" rx="4" fill="#795548"/>
      <rect x="335" y="178" width="30" height="24" rx="3" fill="#B3E5FC" stroke="#8D6E63" strokeWidth="2"/>
      <line x1="350" y1="178" x2="350" y2="202" stroke="#8D6E63" strokeWidth="1.5"/><line x1="335" y1="190" x2="365" y2="190" stroke="#8D6E63" strokeWidth="1.5"/>
      <rect x="410" y="178" width="30" height="24" rx="3" fill="#B3E5FC" stroke="#8D6E63" strokeWidth="2"/>
      <line x1="425" y1="178" x2="425" y2="202" stroke="#8D6E63" strokeWidth="1.5"/><line x1="410" y1="190" x2="440" y2="190" stroke="#8D6E63" strokeWidth="1.5"/>
      <rect x="25" y="148" width="24" height="142" rx="7" fill="#5C3A1E"/>
      <ellipse cx="37" cy="138" rx="58" ry="62" fill="#2E7D32" filter="url(#p1sh)"/>
      <ellipse cx="12" cy="170" rx="36" ry="40" fill="#388E3C"/><ellipse cx="68" cy="165" rx="40" ry="44" fill="#1B5E20"/>
      <rect x="178" y="170" width="18" height="120" rx="5" fill="#5C3A1E"/>
      <ellipse cx="187" cy="160" rx="44" ry="48" fill="#33691E" filter="url(#p1sh)"/>
      <ellipse cx="175" cy="228" rx="58" ry="38" fill="url(#p1m)" filter="url(#p1sh)"/>
      <ellipse cx="175" cy="237" rx="40" ry="25" fill="#C4A058" opacity="0.7"/>
      <ellipse cx="142" cy="256" rx="16" ry="9" fill="#8A6218"/><ellipse cx="208" cy="256" rx="16" ry="9" fill="#8A6218"/>
      <ellipse cx="175" cy="188" rx="44" ry="34" fill="#C8A050" filter="url(#p1sh)"/>
      <ellipse cx="175" cy="200" rx="23" ry="14" fill="#A87838"/>
      <ellipse cx="140" cy="170" rx="11" ry="9" fill="#B88030"/><ellipse cx="140" cy="173" rx="8" ry="6" fill="#D08060" opacity="0.8"/>
      <ellipse cx="210" cy="170" rx="11" ry="9" fill="#B88030"/><ellipse cx="210" cy="173" rx="8" ry="6" fill="#D08060" opacity="0.8"/>
      <ellipse cx="162" cy="182" rx="10" ry="11" fill="#1A1208"/><ellipse cx="188" cy="182" rx="10" ry="11" fill="#1A1208"/>
      <ellipse cx="161" cy="180" rx="5" ry="6" fill="white" opacity="0.9"/><ellipse cx="187" cy="180" rx="5" ry="6" fill="white" opacity="0.9"/>
      <path d="M162 195 Q175 204 188 195" stroke="#6A4A10" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="150" cy="192" rx="10" ry="6" fill="#FF8A65" opacity="0.25"/><ellipse cx="200" cy="192" rx="10" ry="6" fill="#FF8A65" opacity="0.25"/>
      <ellipse cx="260" cy="234" rx="50" ry="35" fill="url(#p1b)" filter="url(#p1sh)"/>
      <ellipse cx="260" cy="243" rx="35" ry="23" fill="#D8B870" opacity="0.65"/>
      <ellipse cx="232" cy="259" rx="14" ry="8" fill="#9A7828"/><ellipse cx="288" cy="259" rx="14" ry="8" fill="#9A7828"/>
      <ellipse cx="260" cy="196" rx="40" ry="32" fill="#D4AA60" filter="url(#p1sh)"/>
      <ellipse cx="260" cy="208" rx="20" ry="12" fill="#B08838"/>
      <ellipse cx="230" cy="180" rx="10" ry="8" fill="#C09040"/><ellipse cx="230" cy="183" rx="7" ry="5" fill="#D07858" opacity="0.8"/>
      <ellipse cx="290" cy="180" rx="10" ry="8" fill="#C09040"/><ellipse cx="290" cy="183" rx="7" ry="5" fill="#D07858" opacity="0.8"/>
      <ellipse cx="249" cy="189" rx="11" ry="12" fill="#1A1208"/><ellipse cx="271" cy="189" rx="11" ry="12" fill="#1A1208"/>
      <ellipse cx="248" cy="186" rx="6" ry="7" fill="white" opacity="0.95"/><ellipse cx="270" cy="186" rx="6" ry="7" fill="white" opacity="0.95"/>
      <path d="M249 202 Q260 212 271 202" stroke="#6A4A10" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="240" cy="198" rx="9" ry="6" fill="#FF8A65" opacity="0.3"/><ellipse cx="280" cy="198" rx="9" ry="6" fill="#FF8A65" opacity="0.3"/>
      <ellipse cx="330" cy="250" rx="32" ry="22" fill="#DABA68" filter="url(#p1sh)"/>
      <ellipse cx="330" cy="234" rx="26" ry="20" fill="#E8C878" filter="url(#p1sh)"/>
      <ellipse cx="319" cy="224" rx="7" ry="8" fill="#1A1208"/><ellipse cx="341" cy="224" rx="7" ry="8" fill="#1A1208"/>
      <ellipse cx="318" cy="222" rx="4" ry="5" fill="white" opacity="0.9"/><ellipse cx="340" cy="222" rx="4" ry="5" fill="white" opacity="0.9"/>
      <path d="M322 232 Q330 238 338 232" stroke="#6A4A10" strokeWidth="2" fill="none"/>
      <ellipse cx="312" cy="261" rx="11" ry="7" fill="#A07820"/><ellipse cx="348" cy="261" rx="11" ry="7" fill="#A07820"/>
      <circle cx="50" cy="248" r="9" fill="#F06292"/><circle cx="50" cy="248" r="5" fill="#FFE082"/>
      <circle cx="76" cy="253" r="7" fill="#CE93D8"/><circle cx="76" cy="253" r="4" fill="#FFF9C4"/>
      <circle cx="432" cy="250" r="8" fill="#FFCC02"/><circle cx="432" cy="250" r="4.5" fill="#FFF9C4"/>
      <circle cx="460" cy="255" r="7" fill="#F48FB1"/><circle cx="460" cy="255" r="4" fill="#FFF9C4"/>
    </svg>
  );
}

function IllPage2() {
  return (
    <svg viewBox="0 0 520 300" style={{width:"100%",borderRadius:12,display:"block"}}>
      <defs>
        <linearGradient id="p2s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFF3E0"/><stop offset="100%" stopColor="#E8F5E9"/></linearGradient>
        <radialGradient id="p2b" cx="38%" cy="32%" r="68%"><stop offset="0%" stopColor="#E8C870"/><stop offset="60%" stopColor="#C09040"/><stop offset="100%" stopColor="#8B6020"/></radialGradient>
        <filter id="p2sh"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000" floodOpacity="0.14"/></filter>
      </defs>
      <rect width="520" height="300" fill="url(#p2s)"/>
      <rect x="0" y="248" width="520" height="52" fill="#DEB887"/>
      <line x1="0" y1="262" x2="520" y2="262" stroke="#C9A870" strokeWidth="1.5" opacity="0.4"/>
      <line x1="85" y1="248" x2="85" y2="300" stroke="#C9A870" strokeWidth="1" opacity="0.3"/>
      <line x1="205" y1="248" x2="205" y2="300" stroke="#C9A870" strokeWidth="1" opacity="0.3"/>
      <line x1="345" y1="248" x2="345" y2="300" stroke="#C9A870" strokeWidth="1" opacity="0.3"/>
      <line x1="465" y1="248" x2="465" y2="300" stroke="#C9A870" strokeWidth="1" opacity="0.3"/>
      <rect x="22" y="180" width="155" height="13" rx="5" fill="#795548" filter="url(#p2sh)"/>
      <rect x="28" y="193" width="14" height="60" rx="5" fill="#6D4C41"/><rect x="148" y="193" width="14" height="60" rx="5" fill="#6D4C41"/>
      <rect x="42" y="150" width="55" height="40" rx="3" fill="#FFFDE7" stroke="#8D6E63" strokeWidth="2.5" filter="url(#p2sh)"/>
      <rect x="44" y="152" width="51" height="36" rx="2" fill="#E3F2FD"/>
      <ellipse cx="69" cy="164" rx="14" ry="11" fill="#D4AA60"/>
      <ellipse cx="63" cy="157" rx="4" ry="3" fill="#1A1208"/><ellipse cx="75" cy="157" rx="4" ry="3" fill="#1A1208"/>
      <circle cx="64" cy="156" r="2" fill="white" opacity="0.8"/><circle cx="76" cy="156" r="2" fill="white" opacity="0.8"/>
      <path d="M63 165 Q69 170 75 165" stroke="#604818" strokeWidth="1.5" fill="none"/>
      <ellipse cx="112" cy="174" rx="8" ry="6" fill="#90A4AE" stroke="#607D8B" strokeWidth="1.5"/>
      <rect x="104" y="156" width="4" height="20" rx="1" fill="#8D6E63"/><ellipse cx="106" cy="155" rx="3" ry="5" fill="#E53935"/>
      <rect x="110" y="153" width="4" height="23" rx="1" fill="#5C3A1E"/><ellipse cx="112" cy="152" rx="3" ry="5" fill="#42A5F5"/>
      <rect x="116" y="157" width="4" height="19" rx="1" fill="#6D4C41"/><ellipse cx="118" cy="156" rx="3" ry="5" fill="#66BB6A"/>
      <ellipse cx="148" cy="170" rx="20" ry="14" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1.5"/>
      <circle cx="135" cy="166" r="4" fill="#EF5350"/><circle cx="145" cy="163" r="4" fill="#42A5F5"/><circle cx="156" cy="163" r="4" fill="#FFD54F"/><circle cx="163" cy="168" r="4" fill="#66BB6A"/>
      <rect x="308" y="218" width="168" height="36" rx="4" fill="#66BB6A" filter="url(#p2sh)"/>
      <circle cx="322" cy="222" r="3" fill="#4CAF50"/><circle cx="338" cy="222" r="3" fill="#4CAF50"/><circle cx="354" cy="222" r="3" fill="#4CAF50"/><circle cx="370" cy="222" r="3" fill="#4CAF50"/><circle cx="386" cy="222" r="3" fill="#4CAF50"/><circle cx="402" cy="222" r="3" fill="#4CAF50"/><circle cx="418" cy="222" r="3" fill="#4CAF50"/><circle cx="434" cy="222" r="3" fill="#4CAF50"/>
      <circle cx="322" cy="236" r="3" fill="#4CAF50"/><circle cx="338" cy="236" r="3" fill="#4CAF50"/><circle cx="354" cy="236" r="3" fill="#4CAF50"/><circle cx="370" cy="236" r="3" fill="#4CAF50"/><circle cx="386" cy="236" r="3" fill="#4CAF50"/><circle cx="402" cy="236" r="3" fill="#4CAF50"/>
      <rect x="340" y="197" width="48" height="22" rx="3" fill="#EF5350" filter="url(#p2sh)"/>
      <circle cx="352" cy="196" r="5" fill="#C62828"/><circle cx="366" cy="196" r="5" fill="#C62828"/>
      <rect x="348" y="176" width="34" height="22" rx="3" fill="#42A5F5" filter="url(#p2sh)"/>
      <circle cx="358" cy="175" r="5" fill="#1565C0"/><circle cx="372" cy="175" r="5" fill="#1565C0"/>
      <rect x="355" y="158" width="24" height="19" rx="3" fill="#FFD54F" filter="url(#p2sh)"/>
      <circle cx="363" cy="157" r="4.5" fill="#F9A825"/><circle cx="375" cy="157" r="4.5" fill="#F9A825"/>
      <ellipse cx="220" cy="238" rx="50" ry="34" fill="url(#p2b)" filter="url(#p2sh)"/>
      <ellipse cx="220" cy="247" rx="35" ry="22" fill="#D8B870" opacity="0.65"/>
      <ellipse cx="192" cy="260" rx="14" ry="8" fill="#9A7828"/><ellipse cx="248" cy="260" rx="14" ry="8" fill="#9A7828"/>
      <ellipse cx="220" cy="200" rx="40" ry="32" fill="#D4AA60" filter="url(#p2sh)"/>
      <ellipse cx="220" cy="212" rx="20" ry="12" fill="#B08838"/>
      <ellipse cx="190" cy="184" rx="10" ry="8" fill="#C09040"/><ellipse cx="190" cy="187" rx="7" ry="5" fill="#D07858" opacity="0.8"/>
      <ellipse cx="250" cy="184" rx="10" ry="8" fill="#C09040"/><ellipse cx="250" cy="187" rx="7" ry="5" fill="#D07858" opacity="0.8"/>
      <ellipse cx="209" cy="192" rx="11" ry="12" fill="#1A1208"/><ellipse cx="231" cy="192" rx="11" ry="12" fill="#1A1208"/>
      <ellipse cx="208" cy="189" rx="6" ry="7" fill="white" opacity="0.95"/><ellipse cx="230" cy="189" rx="6" ry="7" fill="white" opacity="0.95"/>
      <path d="M208 207 Q220 218 232 207" stroke="#604818" strokeWidth="2.5" fill="#FFB74D" strokeLinecap="round"/>
      <ellipse cx="198" cy="202" rx="10" ry="7" fill="#FF8A65" opacity="0.35"/><ellipse cx="242" cy="202" rx="10" ry="7" fill="#FF8A65" opacity="0.35"/>
      <text x="256" y="178" fontSize="26" fill="#7B1FA2" fontFamily="serif" opacity="0.9">&#9835;</text>
      <text x="278" y="160" fontSize="20" fill="#9C27B0" fontFamily="serif" opacity="0.85">&#9833;</text>
      <text x="148" y="172" fontSize="20" fill="#7B1FA2" fontFamily="serif" opacity="0.75">&#9835;</text>
      <text x="130" y="190" fontSize="15" fill="#9C27B0" fontFamily="serif" opacity="0.65">&#9833;</text>
      <ellipse cx="332" cy="110" rx="34" ry="24" fill="#F8FBFF" stroke="#CFD8DC" strokeWidth="1.8"/>
      <circle cx="308" cy="118" r="5" fill="#ECEFF1" opacity="0.88"/>
      <circle cx="320" cy="110" r="7" fill="#ECEFF1" opacity="0.88"/>
      <ellipse cx="332" cy="96" rx="10" ry="8" fill="#D4AA60" opacity="0.8"/>
      <ellipse cx="352" cy="96" rx="10" ry="8" fill="#BDBDBD" opacity="0.7"/>
      <ellipse cx="330" cy="93" rx="3" ry="3" fill="#1A1208" opacity="0.7"/><ellipse cx="354" cy="93" rx="3" ry="3" fill="#1A1208" opacity="0.7"/>
      <text x="338" y="110" fontSize="14" fill="#9E9E9E" fontFamily="sans-serif" fontWeight="bold">?</text>
    </svg>
  );
}

function IllPage3() {
  return (
    <svg viewBox="0 0 520 300" style={{width:"100%",borderRadius:12,display:"block"}}>
      <defs>
        <linearGradient id="p3s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#C8E6C9"/><stop offset="100%" stopColor="#A5D6A7"/></linearGradient>
        <radialGradient id="p3c" cx="38%" cy="32%" r="68%"><stop offset="0%" stopColor="#E8C870"/><stop offset="60%" stopColor="#C09040"/><stop offset="100%" stopColor="#8B6020"/></radialGradient>
        <radialGradient id="p3ch" cx="42%" cy="30%" r="68%"><stop offset="0%" stopColor="#FFE082"/><stop offset="60%" stopColor="#FFCC02"/><stop offset="100%" stopColor="#E6A800"/></radialGradient>
        <filter id="p3sh"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000" floodOpacity="0.16"/></filter>
      </defs>
      <rect width="520" height="300" fill="url(#p3s)"/>
      <rect x="-5" y="45" width="30" height="255" rx="9" fill="#4E342E"/>
      <ellipse cx="10" cy="35" rx="68" ry="74" fill="#1B5E20"/>
      <ellipse cx="-10" cy="70" rx="44" ry="50" fill="#2E7D32"/><ellipse cx="40" cy="65" rx="48" ry="52" fill="#245A16"/>
      <rect x="480" y="38" width="30" height="262" rx="9" fill="#4E342E"/>
      <ellipse cx="495" cy="28" rx="65" ry="70" fill="#1B5E20"/>
      <ellipse cx="472" cy="65" rx="42" ry="48" fill="#2E7D32"/><ellipse cx="510" cy="60" rx="44" ry="50" fill="#245A16"/>
      <rect x="205" y="108" width="40" height="192" rx="12" fill="#4E342E" filter="url(#p3sh)"/>
      <path d="M205 255 Q185 267 170 262" stroke="#4E342E" strokeWidth="14" fill="none" strokeLinecap="round"/>
      <path d="M245 255 Q265 269 278 265" stroke="#4E342E" strokeWidth="14" fill="none" strokeLinecap="round"/>
      <ellipse cx="225" cy="95" rx="88" ry="82" fill="#2E7D32" filter="url(#p3sh)"/>
      <ellipse cx="188" cy="120" rx="58" ry="60" fill="#388E3C"/><ellipse cx="268" cy="115" rx="62" ry="64" fill="#1B5E20"/>
      <ellipse cx="200" cy="85" rx="30" ry="24" fill="#43A047" opacity="0.5"/>
      <rect x="0" y="258" width="520" height="42" fill="#66BB6A"/>
      <ellipse cx="260" cy="258" rx="280" ry="18" fill="#81C784"/>
      <ellipse cx="350" cy="195" rx="10" ry="16" fill="#F48FB1" transform="rotate(-18 350 195)"/>
      <ellipse cx="350" cy="195" rx="10" ry="16" fill="#F06292" transform="rotate(42 350 195)"/>
      <ellipse cx="350" cy="195" rx="10" ry="16" fill="#EC407A" transform="rotate(102 350 195)"/>
      <circle cx="350" cy="195" r="6" fill="#FFE082"/>
      <ellipse cx="148" cy="258" rx="46" ry="32" fill="url(#p3c)" filter="url(#p3sh)"/>
      <ellipse cx="148" cy="266" rx="32" ry="21" fill="#D8B870" opacity="0.65"/>
      <ellipse cx="118" cy="278" rx="13" ry="8" fill="#9A7828"/><ellipse cx="178" cy="278" rx="13" ry="8" fill="#9A7828"/>
      <ellipse cx="148" cy="222" rx="38" ry="31" fill="#D4AA60" filter="url(#p3sh)"/>
      <ellipse cx="148" cy="234" rx="19" ry="12" fill="#B08838"/>
      <ellipse cx="119" cy="206" rx="10" ry="8" fill="#C09040"/><ellipse cx="119" cy="209" rx="7" ry="5" fill="#D07858" opacity="0.8"/>
      <ellipse cx="177" cy="206" rx="10" ry="8" fill="#C09040"/><ellipse cx="177" cy="209" rx="7" ry="5" fill="#D07858" opacity="0.8"/>
      <ellipse cx="137" cy="214" rx="10" ry="11" fill="#1A1208"/><ellipse cx="159" cy="214" rx="10" ry="11" fill="#1A1208"/>
      <ellipse cx="136" cy="211" rx="5" ry="6" fill="white" opacity="0.9"/><ellipse cx="158" cy="211" rx="5" ry="6" fill="white" opacity="0.9"/>
      <path d="M130 207 Q137 203 144 207" stroke="#7A5818" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M152 207 Q159 203 166 207" stroke="#7A5818" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M138 227 Q148 228 158 227" stroke="#7A5818" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <rect x="106" y="238" width="44" height="32" rx="4" fill="white" stroke="#90CAF9" strokeWidth="2" filter="url(#p3sh)" transform="rotate(-5 106 238)"/>
      <line x1="113" y1="247" x2="143" y2="246" stroke="#90CAF9" strokeWidth="1.5" transform="rotate(-5 106 238)"/>
      <line x1="112" y1="253" x2="142" y2="252" stroke="#90CAF9" strokeWidth="1.5" transform="rotate(-5 106 238)"/>
      <line x1="113" y1="259" x2="143" y2="258" stroke="#90CAF9" strokeWidth="1.5" transform="rotate(-5 106 238)"/>
      <text x="115" y="250" fontSize="8" fill="#1565C0" transform="rotate(-5 106 238)">&#9833; &#9835;</text>
      <ellipse cx="358" cy="253" rx="52" ry="35" fill="url(#p3ch)" filter="url(#p3sh)"/>
      <ellipse cx="342" cy="248" rx="6" ry="5" fill="#5D4037" opacity="0.55"/>
      <ellipse cx="365" cy="243" rx="6" ry="5" fill="#5D4037" opacity="0.55"/>
      <ellipse cx="380" cy="252" rx="5" ry="4" fill="#5D4037" opacity="0.55"/>
      <ellipse cx="330" cy="276" rx="14" ry="9" fill="#E6A800"/><ellipse cx="386" cy="276" rx="14" ry="9" fill="#E6A800"/>
      <path d="M410 250 Q436 235 428 215 Q420 198 406 206" stroke="#E6A800" strokeWidth="14" fill="none" strokeLinecap="round"/>
      <ellipse cx="406" cy="206" rx="12" ry="10" fill="#FFCC02"/>
      <ellipse cx="356" cy="216" rx="44" ry="34" fill="#FFCC02" filter="url(#p3sh)"/>
      <ellipse cx="324" cy="198" rx="13" ry="11" fill="#FFCC02"/><ellipse cx="324" cy="201" rx="9" ry="7" fill="#FF8F00" opacity="0.6"/>
      <ellipse cx="388" cy="198" rx="13" ry="11" fill="#FFCC02"/><ellipse cx="388" cy="201" rx="9" ry="7" fill="#FF8F00" opacity="0.6"/>
      <ellipse cx="338" cy="225" rx="5" ry="4" fill="#5D4037" opacity="0.5"/><ellipse cx="374" cy="225" rx="5" ry="4" fill="#5D4037" opacity="0.5"/>
      <ellipse cx="342" cy="210" rx="12" ry="13" fill="#1A1208"/><ellipse cx="370" cy="210" rx="12" ry="13" fill="#1A1208"/>
      <ellipse cx="344" cy="214" rx="8" ry="9" fill="#4A2800"/><ellipse cx="372" cy="214" rx="8" ry="9" fill="#4A2800"/>
      <ellipse cx="338" cy="207" rx="5" ry="6" fill="white" opacity="0.95"/><ellipse cx="366" cy="207" rx="5" ry="6" fill="white" opacity="0.95"/>
      <ellipse cx="356" cy="226" rx="17" ry="11" fill="#FFA726"/>
      <ellipse cx="356" cy="231" rx="12" ry="8" fill="#E65100"/>
      <path d="M342 235 Q356 245 370 235" stroke="#5D4037" strokeWidth="2.5" fill="#FFAB91"/>
      <ellipse cx="326" cy="222" rx="12" ry="7" fill="#FF8A65" opacity="0.3"/><ellipse cx="386" cy="222" rx="12" ry="7" fill="#FF8A65" opacity="0.3"/>
      <ellipse cx="314" cy="110" rx="82" ry="44" fill="white" stroke="#FFD54F" strokeWidth="2" opacity="0.97"/>
      <polygon points="286,146 276,168 296,153" fill="white" stroke="#FFD54F" strokeWidth="1.5"/>
      <text x="252" y="96" fontSize="11" fill="#E65100" fontFamily="sans-serif" fontWeight="bold">My new Lego set</text>
      <text x="255" y="112" fontSize="11" fill="#E65100" fontFamily="sans-serif" fontWeight="bold">has 1,000 pieces!</text>
      <text x="264" y="128" fontSize="11" fill="#E65100" fontFamily="sans-serif" fontWeight="bold">So amazing!</text>
      <ellipse cx="222" cy="200" rx="28" ry="18" fill="white" stroke="#CFD8DC" strokeWidth="1.5" opacity="0.92"/>
      <circle cx="210" cy="200" r="3.5" fill="#BDBDBD"/>
      <circle cx="222" cy="200" r="3.5" fill="#BDBDBD"/>
      <circle cx="234" cy="200" r="3.5" fill="#BDBDBD"/>
    </svg>
  );
}

function IllPage4() {
  return (
    <svg viewBox="0 0 520 300" style={{width:"100%",borderRadius:12,display:"block"}}>
      <defs>
        <linearGradient id="p4s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFF8E1"/><stop offset="100%" stopColor="#FFF3E0"/></linearGradient>
        <radialGradient id="p4w" cx="38%" cy="32%" r="68%"><stop offset="0%" stopColor="#E8C870"/><stop offset="60%" stopColor="#C09040"/><stop offset="100%" stopColor="#8B6020"/></radialGradient>
        <radialGradient id="p4m" cx="38%" cy="32%" r="68%"><stop offset="0%" stopColor="#D4AA58"/><stop offset="60%" stopColor="#A87830"/><stop offset="100%" stopColor="#7A5210"/></radialGradient>
        <filter id="p4sh"><feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#000" floodOpacity="0.14"/></filter>
      </defs>
      <rect width="520" height="300" fill="url(#p4s)"/>
      <rect x="0" y="244" width="520" height="56" fill="#C8A06A"/>
      <rect x="0" y="242" width="520" height="8" fill="#A0784A"/>
      <line x1="0" y1="262" x2="520" y2="262" stroke="#B0884A" strokeWidth="1" opacity="0.4"/>
      <line x1="90" y1="244" x2="90" y2="300" stroke="#B0884A" strokeWidth="1" opacity="0.3"/>
      <line x1="210" y1="244" x2="210" y2="300" stroke="#B0884A" strokeWidth="1" opacity="0.3"/>
      <line x1="340" y1="244" x2="340" y2="300" stroke="#B0884A" strokeWidth="1" opacity="0.3"/>
      <rect x="28" y="38" width="92" height="72" rx="5" fill="#FFF9C4" stroke="#8D6E63" strokeWidth="3.5" filter="url(#p4sh)"/>
      <rect x="31" y="41" width="86" height="66" rx="3" fill="#E3F2FD"/>
      <ellipse cx="74" cy="68" rx="22" ry="16" fill="#D4AA60" opacity="0.9"/>
      <ellipse cx="50" cy="76" rx="14" ry="11" fill="#C09040" opacity="0.8"/>
      <ellipse cx="100" cy="76" rx="14" ry="11" fill="#C09040" opacity="0.8"/>
      <path d="M67 72 Q74 78 81 72" stroke="#604818" strokeWidth="1.5" fill="none"/>
      <rect x="345" y="32" width="130" height="110" rx="7" fill="#B3E5FC" stroke="#8D6E63" strokeWidth="4" filter="url(#p4sh)"/>
      <rect x="347" y="34" width="126" height="106" rx="5" fill="#FFB74D" opacity="0.25"/>
      <rect x="347" y="80" width="126" height="60" rx="0" fill="#B3E5FC" opacity="0.6"/>
      <line x1="410" y1="34" x2="410" y2="140" stroke="#8D6E63" strokeWidth="3"/>
      <line x1="347" y1="87" x2="473" y2="87" stroke="#8D6E63" strokeWidth="3"/>
      <circle cx="415" cy="52" r="15" fill="#FFD54F" opacity="0.6"/>
      <rect x="356" y="72" width="10" height="68" fill="#5C3A1E" opacity="0.7"/>
      <ellipse cx="361" cy="66" rx="26" ry="26" fill="#2E7D32" opacity="0.65"/>
      <path d="M347,34 Q328,72 340,140 L347,140 L347,34" fill="#FF8A65" opacity="0.82"/>
      <path d="M473,34 Q492,72 480,140 L473,140 L473,34" fill="#FF8A65" opacity="0.82"/>
      <rect x="48" y="192" width="295" height="70" rx="16" fill="#EF5350" filter="url(#p4sh)"/>
      <rect x="48" y="176" width="295" height="32" rx="12" fill="#E53935"/>
      <rect x="48" y="178" width="34" height="84" rx="12" fill="#C62828"/>
      <rect x="309" y="178" width="34" height="84" rx="12" fill="#C62828"/>
      <ellipse cx="148" cy="194" rx="60" ry="20" fill="#EF9A9A" opacity="0.7"/>
      <ellipse cx="242" cy="194" rx="60" ry="20" fill="#EF9A9A" opacity="0.7"/>
      <rect x="438" y="162" width="10" height="88" rx="4" fill="#8D6E63"/>
      <ellipse cx="443" cy="162" rx="28" ry="10" fill="#FFF9C4" stroke="#FFD54F" strokeWidth="2"/>
      <ellipse cx="443" cy="149" rx="32" ry="20" fill="#FFFDE7" opacity="0.75"/>
      <ellipse cx="138" cy="214" rx="54" ry="36" fill="url(#p4m)" filter="url(#p4sh)"/>
      <ellipse cx="138" cy="222" rx="38" ry="24" fill="#C4A058" opacity="0.65"/>
      <ellipse cx="106" cy="238" rx="15" ry="9" fill="#8A6218"/><ellipse cx="170" cy="238" rx="15" ry="9" fill="#8A6218"/>
      <ellipse cx="138" cy="175" rx="42" ry="34" fill="#C8A050" filter="url(#p4sh)"/>
      <ellipse cx="138" cy="187" rx="22" ry="13" fill="#A87838"/>
      <ellipse cx="120" cy="164" rx="12" ry="9" fill="#B88030"/><ellipse cx="120" cy="167" rx="8" ry="6" fill="#D08060" opacity="0.75"/>
      <ellipse cx="156" cy="164" rx="12" ry="9" fill="#B88030"/><ellipse cx="156" cy="167" rx="8" ry="6" fill="#D08060" opacity="0.75"/>
      <ellipse cx="127" cy="168" rx="11" ry="12" fill="#1A1208"/><ellipse cx="149" cy="168" rx="11" ry="12" fill="#1A1208"/>
      <ellipse cx="126" cy="165" rx="6" ry="7" fill="white" opacity="0.9"/><ellipse cx="148" cy="165" rx="6" ry="7" fill="white" opacity="0.9"/>
      <path d="M127 181 Q138 190 149 181" stroke="#6A4A10" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="193" cy="192" rx="18" ry="11" fill="#A87838" transform="rotate(25 193 192)" filter="url(#p4sh)"/>
      <ellipse cx="258" cy="218" rx="48" ry="33" fill="url(#p4w)" filter="url(#p4sh)"/>
      <ellipse cx="258" cy="226" rx="34" ry="22" fill="#D8B870" opacity="0.65"/>
      <ellipse cx="228" cy="240" rx="14" ry="8" fill="#9A7828"/><ellipse cx="288" cy="240" rx="14" ry="8" fill="#9A7828"/>
      <ellipse cx="258" cy="180" rx="38" ry="30" fill="#D4AA60" filter="url(#p4sh)"/>
      <ellipse cx="258" cy="192" rx="19" ry="11" fill="#B08838"/>
      <ellipse cx="238" cy="170" rx="10" ry="8" fill="#C09040"/><ellipse cx="238" cy="173" rx="7" ry="5" fill="#D07858" opacity="0.8"/>
      <ellipse cx="278" cy="170" rx="10" ry="8" fill="#C09040"/><ellipse cx="278" cy="173" rx="7" ry="5" fill="#D07858" opacity="0.8"/>
      <ellipse cx="248" cy="172" rx="10" ry="11" fill="#1A1208"/><ellipse cx="268" cy="172" rx="10" ry="11" fill="#1A1208"/>
      <ellipse cx="247" cy="169" rx="5" ry="6" fill="white" opacity="0.9"/><ellipse cx="267" cy="169" rx="5" ry="6" fill="white" opacity="0.9"/>
      <path d="M242 165 Q248 161 254 165" stroke="#7A5818" strokeWidth="2" fill="none"/>
      <path d="M262 165 Q268 161 274 165" stroke="#7A5818" strokeWidth="2" fill="none"/>
      <path d="M248 185 Q258 192 268 185" stroke="#604818" strokeWidth="2.5" fill="#FFB74D" strokeLinecap="round"/>
      <ellipse cx="370" cy="115" rx="95" ry="50" fill="white" stroke="#CFD8DC" strokeWidth="1.5" opacity="0.97"/>
      <polygon points="295,148 280,175 305,160" fill="white" stroke="#CFD8DC" strokeWidth="1"/>
      <text x="307" y="100" fontSize="10.5" fill="#424242" fontFamily="sans-serif">Cassie wouldn&apos;t stop</text>
      <text x="307" y="115" fontSize="10.5" fill="#424242" fontFamily="sans-serif">talking! Then she</text>
      <text x="307" y="130" fontSize="10.5" fill="#424242" fontFamily="sans-serif">ignored me later!</text>
    </svg>
  );
}

function IllPage5() {
  return (
    <svg viewBox="0 0 520 300" style={{width:"100%",borderRadius:12,display:"block"}}>
      <defs>
        <linearGradient id="p5s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1A3A1A"/><stop offset="100%" stopColor="#0D2A10"/></linearGradient>
        <radialGradient id="p5gl" cx="50%" cy="35%" r="55%"><stop offset="0%" stopColor="#FFFDE7" stopOpacity="0.22"/><stop offset="100%" stopColor="#FFFDE7" stopOpacity="0"/></radialGradient>
        <radialGradient id="p5ig" cx="45%" cy="38%" r="62%"><stop offset="0%" stopColor="#81C784"/><stop offset="60%" stopColor="#4CAF50"/><stop offset="100%" stopColor="#1B5E20"/></radialGradient>
        <radialGradient id="p5ih" cx="45%" cy="38%" r="62%"><stop offset="0%" stopColor="#A5D6A7"/><stop offset="60%" stopColor="#66BB6A"/><stop offset="100%" stopColor="#2E7D32"/></radialGradient>
        <radialGradient id="p5cp" cx="38%" cy="32%" r="68%"><stop offset="0%" stopColor="#E8C870"/><stop offset="60%" stopColor="#C09040"/><stop offset="100%" stopColor="#8B6020"/></radialGradient>
        <filter id="p5sh"><feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="#000" floodOpacity="0.35"/></filter>
      </defs>
      <rect width="520" height="300" fill="url(#p5s)"/>
      <ellipse cx="260" cy="120" rx="220" ry="130" fill="url(#p5gl)"/>
      <rect x="-10" y="30" width="38" height="270" rx="10" fill="#0D2010"/>
      <ellipse cx="9" cy="20" rx="72" ry="78" fill="#0A1E0A"/>
      <rect x="480" y="22" width="38" height="278" rx="10" fill="#0D2010"/>
      <ellipse cx="499" cy="12" rx="68" ry="74" fill="#0A1E0A"/>
      <rect x="62" y="58" width="26" height="242" rx="8" fill="#132012"/>
      <ellipse cx="75" cy="46" rx="64" ry="70" fill="#152815" filter="url(#p5sh)"/>
      <rect x="418" y="52" width="26" height="248" rx="8" fill="#132012"/>
      <ellipse cx="431" cy="40" rx="60" ry="66" fill="#152815" filter="url(#p5sh)"/>
      <path d="M20 168 Q120 140 220 155 Q320 168 440 148 Q480 140 510 148" stroke="#4E2E16" strokeWidth="30" fill="none" strokeLinecap="round"/>
      <path d="M20 168 Q120 140 220 155 Q320 168 440 148 Q480 140 510 148" stroke="#5C3A20" strokeWidth="20" fill="none" strokeLinecap="round"/>
      <ellipse cx="165" cy="200" rx="12" ry="20" fill="#CE93D8" transform="rotate(-22 165 200)"/>
      <ellipse cx="165" cy="200" rx="12" ry="20" fill="#BA68C8" transform="rotate(38 165 200)"/>
      <circle cx="165" cy="200" r="7" fill="#FFF9C4"/>
      <ellipse cx="348" cy="190" rx="11" ry="18" fill="#F48FB1" transform="rotate(18 348 190)"/>
      <ellipse cx="348" cy="190" rx="11" ry="18" fill="#F06292" transform="rotate(78 348 190)"/>
      <circle cx="348" cy="190" r="6" fill="#FFF9C4"/>
      <rect x="0" y="262" width="520" height="38" fill="#1A4A18"/>
      <ellipse cx="260" cy="262" rx="280" ry="16" fill="#226620"/>
      <ellipse cx="260" cy="272" rx="80" ry="14" fill="#1976D2" opacity="0.38"/>
      <ellipse cx="170" cy="270" rx="22" ry="12" fill="#263238"/><ellipse cx="170" cy="266" rx="18" ry="8" fill="#2E7D32" opacity="0.5"/>
      <ellipse cx="350" cy="268" rx="20" ry="11" fill="#263238"/><ellipse cx="350" cy="264" rx="16" ry="7" fill="#2E7D32" opacity="0.5"/>
      <ellipse cx="295" cy="155" rx="70" ry="26" fill="url(#p5ig)" filter="url(#p5sh)"/>
      <polygon points="228,138 222,118 234,138" fill="#1B5E20"/>
      <polygon points="243,133 238,112 250,133" fill="#1B5E20"/>
      <polygon points="259,130 255,108 267,130" fill="#1B5E20"/>
      <polygon points="276,128 273,105 285,128" fill="#2E7D32"/>
      <polygon points="294,127 292,104 304,127" fill="#2E7D32"/>
      <polygon points="312,128 311,105 322,128" fill="#2E7D32"/>
      <path d="M365 155 Q408 162 432 148 Q458 132 452 115 Q446 100 432 108" stroke="#2E7D32" strokeWidth="22" fill="none" strokeLinecap="round"/>
      <path d="M365 155 Q408 162 432 148 Q458 132 452 115 Q446 100 432 108" stroke="#66BB6A" strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.5"/>
      <ellipse cx="432" cy="108" rx="14" ry="12" fill="#66BB6A"/>
      <ellipse cx="250" cy="170" rx="14" ry="8" fill="#43A047"/><ellipse cx="342" cy="170" rx="14" ry="8" fill="#43A047"/>
      <ellipse cx="224" cy="138" rx="50" ry="34" fill="url(#p5ih)" filter="url(#p5sh)"/>
      <ellipse cx="200" cy="130" rx="16" ry="14" fill="#43A047"/><ellipse cx="248" cy="130" rx="16" ry="14" fill="#43A047"/>
      <ellipse cx="224" cy="162" rx="28" ry="16" fill="#FFCC02" opacity="0.88"/>
      <ellipse cx="205" cy="128" rx="14" ry="15" fill="#1A1208"/><ellipse cx="243" cy="128" rx="14" ry="15" fill="#1A1208"/>
      <ellipse cx="205" cy="130" rx="9" ry="10" fill="#FF8F00"/><ellipse cx="243" cy="130" rx="9" ry="10" fill="#FF8F00"/>
      <ellipse cx="205" cy="130" rx="3" ry="9" fill="#1A1208"/><ellipse cx="243" cy="130" rx="3" ry="9" fill="#1A1208"/>
      <ellipse cx="200" cy="124" rx="5" ry="6" fill="white" opacity="0.7"/><ellipse cx="238" cy="124" rx="5" ry="6" fill="white" opacity="0.7"/>
      <path d="M210 148 Q224 156 238 148" stroke="#2E7D32" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="218" cy="142" r="3" fill="#1B5E20"/><circle cx="230" cy="142" r="3" fill="#1B5E20"/>
      <text x="135" y="116" fontSize="18" fill="#FFD54F" opacity="0.9">&#10022;</text>
      <text x="308" y="96" fontSize="14" fill="#FFE082" opacity="0.85">&#10022;</text>
      <text x="120" y="158" fontSize="11" fill="#FFFDE7" opacity="0.8">&#10022;</text>
      <text x="356" y="130" fontSize="11" fill="#FFFDE7" opacity="0.8">&#10022;</text>
      <ellipse cx="145" cy="276" rx="42" ry="28" fill="url(#p5cp)" filter="url(#p5sh)"/>
      <ellipse cx="145" cy="283" rx="29" ry="18" fill="#D8B870" opacity="0.65"/>
      <ellipse cx="118" cy="292" rx="12" ry="7" fill="#9A7828"/><ellipse cx="172" cy="292" rx="12" ry="7" fill="#9A7828"/>
      <ellipse cx="148" cy="248" rx="34" ry="28" fill="#D4AA60" filter="url(#p5sh)"/>
      <ellipse cx="148" cy="260" rx="17" ry="11" fill="#B08838"/>
      <ellipse cx="128" cy="238" rx="9" ry="7" fill="#C09040"/><ellipse cx="168" cy="238" rx="9" ry="7" fill="#C09040"/>
      <ellipse cx="137" cy="242" rx="12" ry="14" fill="#1A1208"/><ellipse cx="159" cy="242" rx="12" ry="14" fill="#1A1208"/>
      <ellipse cx="133" cy="236" rx="7" ry="8" fill="white" opacity="0.96"/><ellipse cx="155" cy="236" rx="7" ry="8" fill="white" opacity="0.96"/>
      <ellipse cx="148" cy="256" rx="6" ry="5" fill="#604818" stroke="#604818" strokeWidth="1"/>
      <ellipse cx="128" cy="252" rx="10" ry="6" fill="#FF8A65" opacity="0.32"/><ellipse cx="168" cy="252" rx="10" ry="6" fill="#FF8A65" opacity="0.32"/>
    </svg>
  );
}

function IllPage6() {
  return (
    <svg viewBox="0 0 520 300" style={{width:"100%",borderRadius:12,display:"block"}}>
      <defs>
        <linearGradient id="p6s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#C8E6C9"/><stop offset="100%" stopColor="#A5D6A7"/></linearGradient>
        <radialGradient id="p6cp" cx="38%" cy="32%" r="68%"><stop offset="0%" stopColor="#E8C870"/><stop offset="60%" stopColor="#C09040"/><stop offset="100%" stopColor="#8B6020"/></radialGradient>
        <radialGradient id="p6mm" cx="38%" cy="32%" r="68%"><stop offset="0%" stopColor="#D4AA58"/><stop offset="60%" stopColor="#A87830"/><stop offset="100%" stopColor="#7A5210"/></radialGradient>
        <radialGradient id="p6ig" cx="45%" cy="38%" r="62%"><stop offset="0%" stopColor="#A5D6A7"/><stop offset="60%" stopColor="#66BB6A"/><stop offset="100%" stopColor="#2E7D32"/></radialGradient>
        <filter id="p6sh"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000" floodOpacity="0.16"/></filter>
      </defs>
      <rect width="520" height="300" fill="url(#p6s)"/>
      <rect x="0" y="72" width="30" height="228" rx="9" fill="#3E2416"/>
      <ellipse cx="15" cy="60" rx="68" ry="74" fill="#1B5E20" filter="url(#p6sh)"/>
      <ellipse cx="-6" cy="95" rx="44" ry="50" fill="#2E7D32"/><ellipse cx="48" cy="90" rx="50" ry="54" fill="#245A16"/>
      <rect x="476" y="65" width="30" height="235" rx="9" fill="#3E2416"/>
      <ellipse cx="491" cy="53" rx="64" ry="70" fill="#1B5E20" filter="url(#p6sh)"/>
      <ellipse cx="468" cy="90" rx="42" ry="48" fill="#245A16"/><ellipse cx="510" cy="86" rx="44" ry="50" fill="#2E7D32"/>
      <rect x="196" y="118" width="24" height="182" rx="7" fill="#3E2416"/>
      <ellipse cx="208" cy="106" rx="62" ry="66" fill="#2E7D32" filter="url(#p6sh)"/>
      <ellipse cx="180" cy="136" rx="40" ry="44" fill="#388E3C"/><ellipse cx="238" cy="130" rx="44" ry="48" fill="#1B5E20"/>
      <rect x="0" y="248" width="520" height="52" fill="#66BB6A"/>
      <ellipse cx="260" cy="248" rx="280" ry="18" fill="#7DC840"/>
      <circle cx="100" cy="252" r="9" fill="#F06292" filter="url(#p6sh)"/><circle cx="100" cy="252" r="5" fill="#FFE082"/>
      <circle cx="124" cy="257" r="7" fill="#CE93D8"/><circle cx="124" cy="257" r="4" fill="#FFF9C4"/>
      <circle cx="148" cy="254" r="8" fill="#FFE082" filter="url(#p6sh)"/><circle cx="148" cy="254" r="4.5" fill="white"/>
      <circle cx="372" cy="251" r="9" fill="#EF5350" filter="url(#p6sh)"/><circle cx="372" cy="251" r="5" fill="#FFE082"/>
      <circle cx="396" cy="256" r="7" fill="#F48FB1"/><circle cx="396" cy="256" r="4" fill="#FFF9C4"/>
      <circle cx="420" cy="252" r="8" fill="#FFCC02"/><circle cx="420" cy="252" r="4.5" fill="#FFF9C4"/>
      <rect x="306" y="178" width="145" height="24" rx="9" fill="#4E342E"/>
      <ellipse cx="298" cy="170" rx="48" ry="20" fill="url(#p6ig)" filter="url(#p6sh)"/>
      <polygon points="260,158 255,143 267,157" fill="#1B5E20"/>
      <polygon points="275,154 271,138 283,153" fill="#1B5E20"/>
      <polygon points="291,151 288,134 300,150" fill="#1B5E20"/>
      <path d="M346 170 Q378 176 398 165 Q420 153 415 140" stroke="#2E7D32" strokeWidth="18" fill="none" strokeLinecap="round"/>
      <ellipse cx="272" cy="184" rx="13" ry="8" fill="#43A047"/><ellipse cx="326" cy="184" rx="13" ry="8" fill="#43A047"/>
      <ellipse cx="258" cy="158" rx="46" ry="30" fill="#66BB6A" filter="url(#p6sh)"/>
      <ellipse cx="238" cy="152" rx="14" ry="12" fill="#43A047"/><ellipse cx="278" cy="152" rx="14" ry="12" fill="#43A047"/>
      <ellipse cx="258" cy="178" rx="24" ry="13" fill="#FFCC02" opacity="0.85"/>
      <ellipse cx="244" cy="154" rx="12" ry="13" fill="#1A1208"/><ellipse cx="272" cy="154" rx="12" ry="13" fill="#1A1208"/>
      <ellipse cx="244" cy="156" rx="7" ry="8" fill="#FF8F00"/><ellipse cx="272" cy="156" rx="7" ry="8" fill="#FF8F00"/>
      <ellipse cx="244" cy="156" rx="2.5" ry="7" fill="#1A1208"/><ellipse cx="272" cy="156" rx="2.5" ry="7" fill="#1A1208"/>
      <ellipse cx="240" cy="150" rx="4" ry="5" fill="white" opacity="0.8"/><ellipse cx="268" cy="150" rx="4" ry="5" fill="white" opacity="0.8"/>
      <path d="M246 168 Q258 176 270 168" stroke="#2E7D32" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <ellipse cx="172" cy="105" rx="100" ry="52" fill="white" stroke="#A5D6A7" strokeWidth="2" opacity="0.97"/>
      <polygon points="222,148 230,172 240,155" fill="white" stroke="#A5D6A7" strokeWidth="1"/>
      <text x="92" y="85" fontSize="11" fill="#1B5E20" fontFamily="sans-serif" fontWeight="bold">You don&apos;t have to change.</text>
      <text x="105" y="101" fontSize="11" fill="#1B5E20" fontFamily="sans-serif" fontWeight="bold">Always be YOUR true self!</text>
      <text x="156" y="121" fontSize="13">&#128154;</text>
      <ellipse cx="108" cy="258" rx="48" ry="33" fill="url(#p6cp)" filter="url(#p6sh)"/>
      <ellipse cx="108" cy="266" rx="34" ry="22" fill="#D8B870" opacity="0.65"/>
      <ellipse cx="78" cy="280" rx="14" ry="8" fill="#9A7828"/><ellipse cx="138" cy="280" rx="14" ry="8" fill="#9A7828"/>
      <ellipse cx="108" cy="220" rx="40" ry="32" fill="#D4AA60" filter="url(#p6sh)"/>
      <ellipse cx="108" cy="232" rx="20" ry="12" fill="#B08838"/>
      <ellipse cx="86" cy="210" rx="10" ry="8" fill="#C09040"/><ellipse cx="86" cy="213" rx="7" ry="5" fill="#D07858" opacity="0.8"/>
      <ellipse cx="130" cy="210" rx="10" ry="8" fill="#C09040"/><ellipse cx="130" cy="213" rx="7" ry="5" fill="#D07858" opacity="0.8"/>
      <ellipse cx="97" cy="212" rx="12" ry="13" fill="#1A1208"/><ellipse cx="119" cy="212" rx="12" ry="13" fill="#1A1208"/>
      <ellipse cx="96" cy="208" rx="7" ry="8" fill="white" opacity="0.97"/><ellipse cx="118" cy="208" rx="7" ry="8" fill="white" opacity="0.97"/>
      <path d="M95 226 Q108 240 121 226" stroke="#604818" strokeWidth="3" fill="#FFCC80" strokeLinecap="round"/>
      <ellipse cx="82" cy="223" rx="12" ry="8" fill="#FF8A65" opacity="0.38"/><ellipse cx="134" cy="223" rx="12" ry="8" fill="#FF8A65" opacity="0.38"/>
      <ellipse cx="46" cy="266" rx="40" ry="27" fill="url(#p6mm)" filter="url(#p6sh)"/>
      <ellipse cx="46" cy="250" rx="32" ry="26" fill="#C8A050" filter="url(#p6sh)"/>
      <ellipse cx="34" cy="238" rx="9" ry="10" fill="#1A1208"/><ellipse cx="58" cy="238" rx="9" ry="10" fill="#1A1208"/>
      <ellipse cx="33" cy="234" rx="5" ry="6" fill="white" opacity="0.9"/><ellipse cx="57" cy="234" rx="5" ry="6" fill="white" opacity="0.9"/>
      <path d="M36 252 Q46 260 56 252" stroke="#6A4A10" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="76" cy="248" rx="18" ry="11" fill="#A87838" transform="rotate(20 76 248)" filter="url(#p6sh)"/>
      <text x="346" y="62" fontSize="20" fill="#FFD54F" opacity="0.9">&#9733;</text>
      <text x="370" y="44" fontSize="15" fill="#FFE082" opacity="0.85">&#9733;</text>
      <text x="398" y="64" fontSize="12" fill="#FFD54F">&#10022;</text>
      <text x="418" y="47" fontSize="20" fill="#FFD54F" opacity="0.9">&#9733;</text>
      <text x="160" y="180" fontSize="18" fill="#E91E63" opacity="0.7">&#10084;</text>
      <text x="174" y="162" fontSize="13" fill="#F48FB1" opacity="0.65">&#10084;</text>
    </svg>
  );
}

function IllPage7() {
  return (
    <svg viewBox="0 0 520 300" style={{width:"100%",borderRadius:12,display:"block"}}>
      <defs>
        <linearGradient id="p7s" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#B8E4FF"/><stop offset="55%" stopColor="#D4F4C8"/><stop offset="100%" stopColor="#A5D6A7"/></linearGradient>
        <radialGradient id="p7cp" cx="38%" cy="32%" r="68%"><stop offset="0%" stopColor="#E8C870"/><stop offset="60%" stopColor="#C09040"/><stop offset="100%" stopColor="#8B6020"/></radialGradient>
        <radialGradient id="p7ch" cx="42%" cy="30%" r="68%"><stop offset="0%" stopColor="#FFE082"/><stop offset="60%" stopColor="#FFCC02"/><stop offset="100%" stopColor="#E6A800"/></radialGradient>
        <radialGradient id="p7ig" cx="45%" cy="38%" r="62%"><stop offset="0%" stopColor="#A5D6A7"/><stop offset="60%" stopColor="#66BB6A"/><stop offset="100%" stopColor="#2E7D32"/></radialGradient>
        <filter id="p7sh"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000" floodOpacity="0.15"/></filter>
      </defs>
      <rect width="520" height="300" fill="url(#p7s)"/>
      <rect x="38" y="18" width="12" height="7" rx="2" fill="#EF5350" transform="rotate(25 38 18)"/>
      <rect x="100" y="22" width="10" height="6" rx="2" fill="#FFD54F" transform="rotate(40 100 22)"/>
      <rect x="175" y="14" width="11" height="6" rx="2" fill="#CE93D8" transform="rotate(22 175 14)"/>
      <rect x="254" y="8" width="10" height="6" rx="2" fill="#42A5F5" transform="rotate(45 254 8)"/>
      <rect x="334" y="20" width="10" height="6" rx="2" fill="#66BB6A" transform="rotate(18 334 20)"/>
      <rect x="412" y="9" width="11" height="6" rx="2" fill="#FFCC02" transform="rotate(-38 412 9)"/>
      <rect x="488" y="22" width="10" height="6" rx="2" fill="#EF5350" transform="rotate(30 488 22)"/>
      <rect x="68" y="8" width="11" height="6" rx="2" fill="#42A5F5" transform="rotate(-18 68 8)"/>
      <rect x="138" y="10" width="12" height="7" rx="2" fill="#66BB6A" transform="rotate(-32 138 10)"/>
      <rect x="372" y="9" width="11" height="6" rx="2" fill="#F48FB1" transform="rotate(-38 372 9)"/>
      <rect x="450" y="12" width="12" height="7" rx="2" fill="#EF5350" transform="rotate(-22 450 12)"/>
      <circle cx="78" cy="32" r="5" fill="#EF5350" opacity="0.85"/>
      <circle cx="268" cy="36" r="5" fill="#FFD54F" opacity="0.85"/>
      <circle cx="440" cy="34" r="5" fill="#66BB6A" opacity="0.85"/>
      <circle cx="188" cy="28" r="4" fill="#42A5F5" opacity="0.85"/>
      <circle cx="352" cy="28" r="4" fill="#CE93D8" opacity="0.85"/>
      <rect x="0" y="242" width="520" height="58" fill="#76C442"/>
      <ellipse cx="260" cy="242" rx="280" ry="20" fill="#8AD04A"/>
      <rect x="12" y="98" width="24" height="184" rx="7" fill="#3E2416"/>
      <ellipse cx="24" cy="86" rx="58" ry="63" fill="#1B5E20" filter="url(#p7sh)"/>
      <ellipse cx="4" cy="120" rx="36" ry="40" fill="#2E7D32"/><ellipse cx="52" cy="114" rx="40" ry="44" fill="#245A16"/>
      <rect x="476" y="90" width="24" height="192" rx="7" fill="#3E2416"/>
      <ellipse cx="488" cy="78" rx="55" ry="60" fill="#1B5E20" filter="url(#p7sh)"/>
      <ellipse cx="464" cy="112" rx="34" ry="38" fill="#2E7D32"/><ellipse cx="508" cy="108" rx="36" ry="40" fill="#245A16"/>
      <circle cx="177" cy="246" r="10" fill="#F06292" filter="url(#p7sh)"/><circle cx="177" cy="246" r="5.5" fill="#FFE082"/>
      <circle cx="338" cy="248" r="9" fill="#CE93D8" filter="url(#p7sh)"/><circle cx="338" cy="248" r="5" fill="#FFF9C4"/>
      <rect x="326" y="110" width="130" height="20" rx="7" fill="#4E342E"/>
      <ellipse cx="318" cy="104" rx="44" ry="18" fill="url(#p7ig)" filter="url(#p7sh)"/>
      <polygon points="280,94 275,80 287,93" fill="#1B5E20"/>
      <polygon points="294,91 290,76 302,90" fill="#1B5E20"/>
      <polygon points="309,89 306,74 318,88" fill="#1B5E20"/>
      <path d="M362 104 Q392 111 410 100 Q428 88 423 76" stroke="#2E7D32" strokeWidth="15" fill="none" strokeLinecap="round"/>
      <ellipse cx="304" cy="100" rx="34" ry="22" fill="#66BB6A" filter="url(#p7sh)"/>
      <ellipse cx="290" cy="94" rx="11" ry="10" fill="#43A047"/><ellipse cx="318" cy="94" rx="11" ry="10" fill="#43A047"/>
      <ellipse cx="304" cy="113" rx="17" ry="9" fill="#FFCC02" opacity="0.82"/>
      <ellipse cx="290" cy="91" rx="9" ry="10" fill="#1A1208"/><ellipse cx="318" cy="91" rx="9" ry="10" fill="#1A1208"/>
      <ellipse cx="290" cy="91" rx="5" ry="6" fill="#FF8F00"/><ellipse cx="318" cy="91" rx="5" ry="6" fill="#FF8F00"/>
      <ellipse cx="286" cy="87" rx="4" ry="5" fill="white" opacity="0.8"/><ellipse cx="314" cy="87" rx="4" ry="5" fill="white" opacity="0.8"/>
      <path d="M294 104 Q304 111 314 104" stroke="#2E7D32" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <ellipse cx="434" cy="88" rx="22" ry="18" fill="#1A1208" filter="url(#p7sh)"/>
      <ellipse cx="424" cy="90" rx="14" ry="10" fill="#FFFDE7"/>
      <path d="M418 82 Q400 88 398 98 Q400 106 418 100" fill="#EF6C00" stroke="#E65100" strokeWidth="1.2"/>
      <path d="M418 82 Q400 88 398 95 Q400 100 418 94" fill="#FFD54F"/>
      <circle cx="428" cy="80" r="6" fill="#1A1208"/><circle cx="428" cy="80" r="3" fill="#66BB6A"/>
      <circle cx="426" cy="78" r="2" fill="white" opacity="0.9"/>
      <ellipse cx="358" cy="252" rx="54" ry="36" fill="url(#p7ch)" filter="url(#p7sh)"/>
      <ellipse cx="340" cy="245" rx="7" ry="6" fill="#5D4037" opacity="0.5"/>
      <ellipse cx="368" cy="240" rx="7" ry="6" fill="#5D4037" opacity="0.5"/>
      <ellipse cx="382" cy="254" rx="6" ry="5" fill="#5D4037" opacity="0.5"/>
      <ellipse cx="332" cy="276" rx="15" ry="10" fill="#E6A800"/><ellipse cx="384" cy="276" rx="15" ry="10" fill="#E6A800"/>
      <path d="M412 248 Q440 230 433 210 Q426 192 412 200" stroke="#E6A800" strokeWidth="16" fill="none" strokeLinecap="round"/>
      <ellipse cx="412" cy="200" rx="14" ry="12" fill="#FFCC02"/>
      <ellipse cx="358" cy="218" rx="46" ry="36" fill="#FFCC02" filter="url(#p7sh)"/>
      <ellipse cx="324" cy="198" rx="15" ry="13" fill="#FFCC02"/><ellipse cx="324" cy="201" rx="10" ry="8" fill="#FF8F00" opacity="0.55"/>
      <ellipse cx="392" cy="198" rx="15" ry="13" fill="#FFCC02"/><ellipse cx="392" cy="201" rx="10" ry="8" fill="#FF8F00" opacity="0.55"/>
      <ellipse cx="340" cy="228" rx="6" ry="5" fill="#5D4037" opacity="0.45"/><ellipse cx="376" cy="228" rx="6" ry="5" fill="#5D4037" opacity="0.45"/>
      <ellipse cx="344" cy="212" rx="13" ry="14" fill="#1A1208"/><ellipse cx="372" cy="212" rx="13" ry="14" fill="#1A1208"/>
      <ellipse cx="344" cy="214" rx="8" ry="9" fill="#4A2800"/><ellipse cx="372" cy="214" rx="8" ry="9" fill="#4A2800"/>
      <ellipse cx="340" cy="207" rx="6" ry="7" fill="white" opacity="0.96"/><ellipse cx="368" cy="207" rx="6" ry="7" fill="white" opacity="0.96"/>
      <ellipse cx="358" cy="228" rx="18" ry="12" fill="#FFA726"/>
      <ellipse cx="358" cy="234" rx="13" ry="9" fill="#E65100"/>
      <path d="M344 238 Q358 250 372 238" stroke="#5D4037" strokeWidth="2.5" fill="#FFAB91"/>
      <ellipse cx="326" cy="226" rx="14" ry="8" fill="#FF8A65" opacity="0.32"/><ellipse cx="390" cy="226" rx="14" ry="8" fill="#FF8A65" opacity="0.32"/>
      <ellipse cx="310" cy="236" rx="18" ry="10" fill="#E6A800" transform="rotate(-45 310 236)" filter="url(#p7sh)"/>
      <ellipse cx="406" cy="236" rx="18" ry="10" fill="#E6A800" transform="rotate(45 406 236)" filter="url(#p7sh)"/>
      <ellipse cx="248" cy="158" rx="78" ry="38" fill="white" stroke="#FFD54F" strokeWidth="2" opacity="0.97"/>
      <polygon points="238,188 228,208 248,192" fill="white" stroke="#FFD54F" strokeWidth="1.5"/>
      <text x="190" y="142" fontSize="11" fill="#E65100" fontFamily="sans-serif" fontWeight="bold">Sure, Wallace!</text>
      <text x="192" y="157" fontSize="11" fill="#E65100" fontFamily="sans-serif" fontWeight="bold">Good luck! &#127925;&#10024;</text>
      <ellipse cx="142" cy="258" rx="52" ry="36" fill="url(#p7cp)" filter="url(#p7sh)"/>
      <ellipse cx="142" cy="267" rx="37" ry="24" fill="#D8B870" opacity="0.65"/>
      <ellipse cx="110" cy="281" rx="15" ry="9" fill="#9A7828"/><ellipse cx="174" cy="281" rx="15" ry="9" fill="#9A7828"/>
      <ellipse cx="142" cy="218" rx="43" ry="34" fill="#D4AA60" filter="url(#p7sh)"/>
      <ellipse cx="142" cy="230" rx="22" ry="13" fill="#B08838"/>
      <ellipse cx="112" cy="207" rx="11" ry="9" fill="#C09040"/><ellipse cx="112" cy="210" rx="7" ry="6" fill="#D07858" opacity="0.8"/>
      <ellipse cx="172" cy="207" rx="11" ry="9" fill="#C09040"/><ellipse cx="172" cy="210" rx="7" ry="6" fill="#D07858" opacity="0.8"/>
      <ellipse cx="130" cy="208" rx="12" ry="13" fill="#1A1208"/><ellipse cx="154" cy="208" rx="12" ry="13" fill="#1A1208"/>
      <ellipse cx="129" cy="204" rx="7" ry="8" fill="white" opacity="0.97"/><ellipse cx="153" cy="204" rx="7" ry="8" fill="white" opacity="0.97"/>
      <path d="M128 222 Q142 236 156 222" stroke="#604818" strokeWidth="3.5" fill="#FFCC80" strokeLinecap="round"/>
      <ellipse cx="116" cy="220" rx="14" ry="9" fill="#FF8A65" opacity="0.42"/><ellipse cx="168" cy="220" rx="14" ry="9" fill="#FF8A65" opacity="0.42"/>
      <rect x="68" y="222" width="46" height="36" rx="5" fill="white" stroke="#90CAF9" strokeWidth="2.5" filter="url(#p7sh)" transform="rotate(-10 68 222)"/>
      <line x1="75" y1="232" x2="108" y2="229" stroke="#90CAF9" strokeWidth="1.8" transform="rotate(-10 68 222)"/>
      <line x1="74" y1="239" x2="107" y2="236" stroke="#90CAF9" strokeWidth="1.8" transform="rotate(-10 68 222)"/>
      <line x1="75" y1="246" x2="108" y2="243" stroke="#90CAF9" strokeWidth="1.8" transform="rotate(-10 68 222)"/>
      <text x="78" y="234" fontSize="10" fill="#1565C0" transform="rotate(-10 68 222)">&#9833; &#9835; &#9833;</text>
      <text x="38" y="196" fontSize="24" fill="#FFD54F" opacity="0.95">&#9733;</text>
      <text x="56" y="174" fontSize="17" fill="#FFE082" opacity="0.9">&#9733;</text>
      <text x="192" y="192" fontSize="22" fill="#FFD54F" opacity="0.95">&#9733;</text>
      <text x="212" y="172" fontSize="16" fill="#FFE082" opacity="0.9">&#9733;</text>
      <text x="200" y="178" fontSize="22" fill="#7B1FA2" fontFamily="serif" opacity="0.9">&#9835;</text>
      <text x="222" y="160" fontSize="17" fill="#9C27B0" fontFamily="serif" opacity="0.85">&#9833;</text>
    </svg>
  );
}

const ILLUS_COMPONENTS = [IllPage1, IllPage2, IllPage3, IllPage4, IllPage5, IllPage6, IllPage7];

// ── PROMPT BUILDER ─────────────────────────────────────────────────────────────
function buildPrompt(f) {
  const dev = getDev(f.age);
  const sub = "Specially written for " + f.childName + " by " + (f.clinicianName || "your therapist");
  return "Write a personalized neuro-affirming therapeutic storybook.\n\nCHILD: " + f.childName + ", age " + (f.age||"school-age") + ", pronouns " + f.pronouns + "\nAnimal: " + (f.animal||"choose a warm fitting animal") + " | Interests: " + (f.interests||"not specified") + " | Strengths: " + (f.strengths||"not specified") + "\nChallenge: " + f.challenge + " | Clinician: " + (f.clinicianName||"their therapist") + "\n\nDEVELOPMENTAL LANGUAGE (" + dev.label + "):\n- Sentences: " + dev.sent + "\n- Vocabulary: " + dev.vocab + "\n- Concepts: " + dev.concept + "\n- Paragraphs: " + dev.para + "\n\nMANDATORY 7-PAGE HERO JOURNEY:\nPAGE 1: Celebrate child as their animal. Real interests and strengths. No problems. Pure joy.\nPAGE 2: Life is good but the challenge keeps confusing them. Frame as puzzling not a flaw.\nPAGE 3: Specific scene — challenge causes social situation to go wrong. Friend confused/hurt. Child doesn't know why. End confused.\nPAGE 4: Tells trusted caregiver. Adult validates + gives ONE concrete tip phrase. Goes to wise animal guide.\nPAGE 5: Guide explains: child is autistic. Brain DIFFERENT not worse. Lead with STRENGTHS first. Then gently name what's harder.\nPAGE 6: Child asks 'should I act like everyone else?' Guide says NO — be yourself. Ask for help. Lean into strengths. Caregiver smiles.\nPAGE 7: SAME situation as page 3. Uses tip from page 4. Works. Friend responds kindly. Child proud. Empowering identity ending.\n\nWrite at EXACTLY the developmental level above. Output ONLY raw JSON:\n" + '{"title":"...","subtitle":"' + sub + '","pages":[{"paragraphs":["..."]},{"paragraphs":["..."]},{"paragraphs":["...","..."]},{"paragraphs":["...","...","..."]},{"paragraphs":["...","..."]},{"paragraphs":["...","..."]},{"paragraphs":["...","...","..."]}]}';
}

// ── PDF DOWNLOAD ─────────────────────────────────────────────────────────────
function downloadPDF(pages, title, childName, clinicianName) {
  const win = window.open("", "_blank");
  const storyPages = pages.filter(p => p.type === "content");
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${title}</title><style>
    @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
    *{margin:0;padding:0;box-sizing:border-box;}body{font-family:'Lora',Georgia,serif;background:white;}
    .cover{width:100%;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:80px 60px;background:#f9fdfb;page-break-after:always;border:10px solid #2d6a4f;}
    .cover-emoji{font-size:100px;margin-bottom:32px;}.cover-title{font-size:40px;font-weight:600;color:#2d6a4f;margin-bottom:20px;}.cover-sub{font-size:17px;font-style:italic;color:#6b7280;}
    .page{padding:65px 75px;min-height:100vh;page-break-after:always;}.page-num{font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:.1em;margin-bottom:36px;font-family:sans-serif;}
    p{font-size:17px;line-height:2;color:#1a1a2e;margin-bottom:1.4em;}p:last-child{margin-bottom:0;}
    .footer{margin-top:40px;font-size:11px;color:#d1d5db;text-align:center;border-top:1px solid #f3f4f6;padding-top:16px;font-family:sans-serif;}
    @media print{.cover,.page{page-break-after:always;}}
    .print-btn{position:fixed;bottom:20px;right:20px;padding:12px 24px;background:#2d6a4f;color:white;border:none;border-radius:8px;font-size:16px;cursor:pointer;}
  </style></head><body>
  <button class="print-btn" onclick="window.print()">Print / Save PDF</button>
  <div class="cover"><div class="cover-emoji">🦫</div><div class="cover-title">${title}</div><div class="cover-sub">Specially written for ${childName} by ${clinicianName||"your therapist"}</div></div>
  ${storyPages.map(pg=>`<div class="page"><div class="page-num">Page ${pg.num}</div>${(pg.paragraphs||[]).map(p=>`<p>${p}</p>`).join("")}<div class="footer">${title} &middot; StoryBridge</div></div>`).join("")}
  </body></html>`;
  win.document.write(html);
  win.document.close();
}

// ── WALLACE DEMO DATA ─────────────────────────────────────────────────────────
const WALLACE_PAGES = [
  { type:"cover", title:"Wallace the Capybara", subtitle:"Specially written for [child name] by [clinician name]" },
  { type:"content", num:1, paragraphs:["Far away, in a world not so different from our own, lived all sorts of magical talking animals. One of those animals was a young capybara named Wallace who lived with his family in a house by the river."] },
  { type:"content", num:2, paragraphs:["Wallace was a kind, happy, and fun capybara. He loved to create art and play with Legos. He was also a great brother. He had a lot of fun being with his family. He really liked when they all played games!","Wallace also really liked singing in chorus and hanging out with his friends. He tried his best to be a good friend! But sometimes it could be tough. Wallace also needed to spend some time by himself. He didn't always know how to tell his friends what he wanted or how he felt."] },
  { type:"content", num:3, paragraphs:["One day, Wallace was at singing practice. The big performance was coming up, and he couldn't wait! As excited as he was, he was also nervous that he wouldn't remember the lyrics to his solo. When it was time for the group to take a break, Wallace was glad to get some time to finish learning his song lines.","Wallace sat under a big tree reading his music. Then one of his friends, Cassie the Cheetah, came over and started talking up a storm! She was excited to tell him all about her new Lego set. Usually Wallace loved talking about Legos with Cassie. But at that moment, he felt upset. He wanted quiet so he could practice his solo, but he didn't say anything. Cassie kept talking, and Wallace got more and more frustrated. He ended up walking away from Cassie so he could focus on learning his lines.","Later that day, Wallace went to talk to Cassie about the upcoming big performance. She barely said anything back to him. And she looked kind of confused and upset. Wallace wasn't sure why."] },
  { type:"content", num:4, paragraphs:["When he got home from school, Wallace told his mom about what happened. \"I wanted to practice my song, but Cassie kept talking! I have no idea why she wouldn't stop! And then later when I tried to talk to her, she didn't want to talk to me!\"","His mother listened and nodded. \"Wallace, sometimes friends don't know what you need unless you tell them. It's okay to say, 'Cassie, I need some quiet time to practice my song.' That way, she understands how you feel.\"","This wasn't the first time something like this had happened though. His mother decided they needed to do something to better understand Wallace and the way he connects with others in order to help him. Luckily, his mom knew of a wise lizard named Ivy the Iguana who lived deep in the jungle. She would know how to help!","The next day, his mother took Wallace on a journey into the forest to visit Ivy. Wallace and his mother spent a long, long time talking with Ivy about everything that had been happening. Ivy listened carefully. Then at the end of the day, she spoke to Wallace."] },
  { type:"content", num:5, paragraphs:["\"Wallace, thank you for talking with me today. It was so helpful to spend time hanging out and learning about you. Now, I have a pretty good idea about what's going on.\"","Ivy looked at Wallace and continued. \"You're an autistic capybara. That means that your brain works in a special way that's a little different from other animals. It can make some things harder sometimes, but it's also the reason for lots of your strengths. Think about your creativity and curiosity! You can focus on the things you love a lot, like singing and creating art, for way longer than some of the other animals your age. You are great at following rules and always being true to yourself. You love being with family, and you're a great brother. These are all awesome things!\"","\"It sounds like it's harder for you to figure out what to do with jungle animals you aren't as close with, like some of the animals at school. It can be tough for you to know what they're thinking. Talking with them about what you're thinking or feeling seems pretty tough too, especially when you feel things deeply. Those strong emotions can feel like a lot sometimes.\""] },
  { type:"content", num:6, paragraphs:["Wallace listened to everything Ivy said. He nodded and smiled. \"That does sound like me!\" His smile quickly went away though and he looked back at Ivy with a confused expression. \"So, what should I do? Act like everyone else? I wouldn't know where to start.\"","Ivy smiled. \"No! You should always be yourself! Autism can make some things tricky for sure. There are things that may come easy to other kids but are hard for you. But there are also things that you do easily that can be really hard for other animals. And that is where to start — with those things you are so good at!\"","\"Different doesn't mean worse or better! It just helps us understand why some things might be harder for you. And that's ok! You can learn to ask for help and what you need when things get hard. And, of course, keep relying on your loving family!\"","Wallace looked at his mother, who smiled. He knew she would always be there to support him. And to help him feel more comfortable!"] },
  { type:"content", num:7, paragraphs:["The next day at music practice, Wallace saw Cassie coming over during the break. He took a deep breath and thought of his talks with Ivy and his mother. He said, \"Cassie, I need some quiet time to practice my song. Can we talk after?\"","Cassie smiled and said, \"Sure, Wallace! Good luck with your song.\"","Wallace felt proud. He was so happy that he learned more about himself and what to do when he was having a tough time. He now knew that telling his friends what he needs helps them to understand him better.","Wallace kept practicing talking to the other animals about what's important to him. Some days were great! Other days were more challenging. That's just part of life! With all that he learned and the support of his family, Wallace now knew he could get through hard days. Not only that, but he could learn from them and come back even stronger!","Wallace didn't want to act like someone else. And now, he knew he didn't need to. He was just becoming more of his true self. A creative, funny, and kind autistic capybara who loves art, playing games with others, and his friends and family!"] },
];

const WALLACE_ENTRY = { id:"wallace-demo", title:"Wallace the Capybara", childName:"[child name]", clinicianName:"[clinician name]", age:"8", pronouns:"he/him", interests:"art, Legos, singing", strengths:"creative, kind, great brother", challenge:"Difficulty expressing needs to friends", animal:"capybara", createdAt:"Example story", pages:WALLACE_PAGES };

// ── READER ────────────────────────────────────────────────────────────────────
function Reader({pages, title, childName, clinicianName, onHome, onEdit}) {
  const [idx, setIdx] = useState(0);
  const pg = pages[idx];

  function speak() {
    window.speechSynthesis.cancel();
    const text = pg.type === "cover" ? pg.title + ". " + pg.subtitle : (pg.paragraphs||[]).join(" ");
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.88;
    window.speechSynthesis.speak(u);
  }

  function go(d) {
    window.speechSynthesis.cancel();
    setIdx(i => Math.max(0, Math.min(pages.length - 1, i + d)));
  }

  const IllComp = (pg.type === "content" && pg.num >= 1 && pg.num <= 7) ? ILLUS_COMPONENTS[pg.num - 1] : null;

  return (
    <div style={{minHeight:"100vh", background:"#1a1a2e", display:"flex", flexDirection:"column"}}>
      <div style={{background:"#111827", padding:"12px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid rgba(255,255,255,0.08)", flexWrap:"wrap", gap:8}}>
        <span style={{fontFamily:"Georgia,serif", color:"white", fontSize:15}}>{title}</span>
        <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
          <button onClick={speak} style={S.tb}>&#128266; Read Aloud</button>
          <button onClick={() => window.speechSynthesis.cancel()} style={S.tb}>&#9632; Stop</button>
          <button onClick={() => downloadPDF(pages, title, childName, clinicianName)} style={S.tb}>&#128196; PDF</button>
          {onEdit && <button onClick={onEdit} style={S.tb}>&#9999; Edit</button>}
          <button onClick={onHome} style={S.tb}>&#127968; Home</button>
        </div>
      </div>

      <div style={{flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"32px 20px"}}>
        <div style={{background:"#fffdf7", borderRadius:"4px 16px 16px 4px", width:"min(660px,100%)", padding:"40px 44px", boxShadow:"-8px 0 0 rgba(0,0,0,0.5),0 24px 60px rgba(0,0,0,0.6)", position:"relative"}}>
          {pg.type === "cover" ? (
            <div style={{textAlign:"center"}}>
              <div style={{marginBottom:22, borderRadius:12, overflow:"hidden"}}>
                <IllCover/>
              </div>
              <h1 style={{fontFamily:"Georgia,serif", fontSize:27, color:"#2d6a4f", marginBottom:12, lineHeight:1.3}}>{pg.title}</h1>
              <p style={{fontFamily:"Georgia,serif", fontStyle:"italic", color:"#888", fontSize:14}}>{pg.subtitle}</p>
            </div>
          ) : (
            <div>
              {(pg.paragraphs||[]).map((p, i) => (
                <p key={i} style={{fontFamily:"Georgia,serif", fontSize:16, lineHeight:1.9, color:"#1a1a2e", marginBottom: i < pg.paragraphs.length - 1 ? "1.4em" : 0}}>{p}</p>
              ))}
              {IllComp && (
                <div style={{marginTop:22, borderRadius:12, overflow:"hidden", border:"1px solid #e8e8e8"}}>
                  <IllComp/>
                </div>
              )}
              <div style={{position:"absolute", bottom:16, left:"50%", transform:"translateX(-50%)", color:"#bbb", fontSize:11, fontStyle:"italic"}}>Page {pg.num}</div>
            </div>
          )}
        </div>
      </div>

      <div style={{display:"flex", alignItems:"center", justifyContent:"center", gap:24, padding:"14px 20px 24px"}}>
        <button onClick={() => go(-1)} disabled={idx===0} style={S.nav(idx===0)}>&#8592;</button>
        <span style={{color:"rgba(255,255,255,0.4)", fontSize:14}}>{idx+1} / {pages.length}</span>
        <button onClick={() => go(1)} disabled={idx===pages.length-1} style={S.nav(idx===pages.length-1)}>&#8594;</button>
      </div>
    </div>
  );
}

// ── FORM ──────────────────────────────────────────────────────────────────────
function Form({onGenerate, onBack, prefill}) {
  const [f, setF] = useState(prefill || {childName:"", clinicianName:"", age:"", pronouns:"he/him", interests:"", strengths:"", challenge:"", animal:""});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const set = (k, v) => setF(p => ({...p, [k]:v}));
  const dev = getDev(f.age);

  async function generate() {
    if (!f.childName || !f.challenge) { setError("Child's name and challenge are required."); return; }
    setError(""); setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:6000,
          system:"You are a children's therapeutic storybook author specializing in neuro-affirming autism disclosure stories. Output ONLY raw valid JSON — no markdown fences, no preamble, nothing else.",
          messages:[{role:"user", content:buildPrompt(f)}]
        })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const text = data.content[0].text.trim();
      const start = text.indexOf("{"), end = text.lastIndexOf("}");
      if (start === -1) throw new Error("No JSON in response");
      const story = JSON.parse(text.slice(start, end+1));
      const pages = [
        {type:"cover", title:story.title, subtitle:story.subtitle},
        ...story.pages.map((p,i) => ({type:"content", num:i+1, paragraphs:p.paragraphs}))
      ];
      onGenerate(pages, story.title, f);
    } catch(e) { setError("Error: " + e.message); setLoading(false); }
  }

  if (loading) return (
    <div style={{minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"#e8f5e9", gap:16}}>
      <div style={{fontSize:72}}>🦫</div>
      <p style={{fontFamily:"Georgia,serif", fontSize:24, color:"#2d6a4f"}}>Writing your story…</p>
      <p style={{color:"#6b7280", fontSize:14}}>Tailoring language for age {f.age||"school-age"} · About 30 seconds</p>
    </div>
  );

  return (
    <div style={{minHeight:"100vh", background:"#e8f5e9", padding:"40px 20px"}}>
      <div style={{maxWidth:580, margin:"0 auto"}}>
        <button onClick={onBack} style={{background:"none", border:"none", color:"#2d6a4f", cursor:"pointer", fontSize:15, marginBottom:24, fontWeight:600}}>&#8592; Back</button>
        <h1 style={{fontFamily:"Georgia,serif", fontSize:32, color:"#2d6a4f", marginBottom:4}}>{prefill ? "Edit Story" : "Create a Story"}</h1>
        <p style={{color:"#6b7280", marginBottom:24, fontSize:14}}>AI will write a developmentally appropriate, neuro-affirming storybook.</p>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14}}>
          {[["Child's Name *","childName","text","e.g. Maya"],["Clinician's Name","clinicianName","text","e.g. Dr. Patel"],["Age *","age","number","e.g. 8"]].map(([lbl,key,type,ph]) => (
            <div key={key}><label style={S.lbl}>{lbl}</label><input type={type} placeholder={ph} value={f[key]} onChange={e => set(key, e.target.value)} style={S.inp}/></div>
          ))}
          <div><label style={S.lbl}>Pronouns</label>
            <select value={f.pronouns} onChange={e => set("pronouns", e.target.value)} style={S.inp}>
              <option value="he/him">He/Him</option>
              <option value="she/her">She/Her</option>
              <option value="they/them">They/Them</option>
            </select>
          </div>
        </div>
        {f.age && <div style={{background:"#d1fae5", borderRadius:10, padding:"10px 14px", marginBottom:16, fontSize:13, color:"#065f46"}}><strong>{dev.label}</strong> &middot; {dev.level}</div>}
        {[
          ["Interests & Hobbies","interests","e.g. soccer, drawing, Minecraft",false],
          ["Strengths","strengths","e.g. kind, creative, funny",false],
          ["Animal Character (optional)","animal","e.g. fox, rabbit — leave blank for AI to choose",false],
          ["Main Challenge or Theme *","challenge","e.g. difficulty expressing needs to friends, anxiety in new situations",true],
        ].map(([lbl,key,ph,big]) => (
          <div key={key} style={{marginBottom:14}}>
            <label style={S.lbl}>{lbl}</label>
            {big ? <textarea placeholder={ph} value={f[key]} onChange={e => set(key, e.target.value)} style={{...S.inp, minHeight:85, resize:"vertical"}}/> : <input placeholder={ph} value={f[key]} onChange={e => set(key, e.target.value)} style={S.inp}/>}
          </div>
        ))}
        {error && <p style={{color:"#dc2626", fontSize:13, marginBottom:10}}>{error}</p>}
        <button onClick={generate} style={{width:"100%", padding:16, background:"linear-gradient(135deg,#2d6a4f,#52b788)", color:"white", border:"none", borderRadius:12, fontSize:17, fontFamily:"Georgia,serif", cursor:"pointer", marginTop:4}}>
          &#10024; {prefill ? "Regenerate Story" : "Generate Storybook"}
        </button>
      </div>
    </div>
  );
}

// ── BANK ──────────────────────────────────────────────────────────────────────
function Bank({onRead, onCreate, onEdit, onBack}) {
  const [bank, setBank] = useState(null);
  useEffect(() => { loadBank().then(b => setBank([WALLACE_ENTRY, ...b])); }, []);
  if (!bank) return <div style={{minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#e8f5e9"}}><p style={{color:"#6b7280"}}>Loading…</p></div>;
  return (
    <div style={{minHeight:"100vh", background:"#e8f5e9", padding:"40px 20px"}}>
      <div style={{maxWidth:720, margin:"0 auto"}}>
        <button onClick={onBack} style={{background:"none", border:"none", color:"#2d6a4f", cursor:"pointer", fontSize:15, marginBottom:24, fontWeight:600}}>&#8592; Home</button>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28, flexWrap:"wrap", gap:12}}>
          <h1 style={{fontFamily:"Georgia,serif", fontSize:32, color:"#2d6a4f"}}>Story Bank</h1>
          <button onClick={onCreate} style={{padding:"10px 20px", background:"#2d6a4f", color:"white", border:"none", borderRadius:10, fontSize:14, cursor:"pointer"}}>+ New Story</button>
        </div>
        {bank.map(entry => (
          <div key={entry.id} style={{...S.card, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12}}>
            <div style={{flex:1}}>
              <div style={{fontFamily:"Georgia,serif", fontSize:18, color:"#1a1a2e", marginBottom:4}}>{entry.title}</div>
              <div style={{fontSize:13, color:"#6b7280"}}>For <strong>{entry.childName}</strong> &middot; Age {entry.age} &middot; {entry.pronouns} &middot; {entry.createdAt}</div>
              {entry.challenge && <div style={{fontSize:12, color:"#9ca3af", marginTop:3}}>Theme: {entry.challenge}</div>}
            </div>
            <div style={{display:"flex", gap:8}}>
              <button onClick={() => onRead(entry)} style={{padding:"8px 16px", background:"#2d6a4f", color:"white", border:"none", borderRadius:8, fontSize:13, cursor:"pointer"}}>&#128214; Read</button>
              {entry.id !== "wallace-demo" && <button onClick={() => onEdit(entry)} style={{padding:"8px 16px", background:"white", color:"#2d6a4f", border:"2px solid #d1fae5", borderRadius:8, fontSize:13, cursor:"pointer"}}>&#9999; Edit</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── LANDING ───────────────────────────────────────────────────────────────────
function Landing({onNew, onBank}) {
  return (
    <div style={{minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"#e8f5e9", padding:40, textAlign:"center"}}>
      <div style={{fontFamily:"Georgia,serif", fontSize:50, color:"#2d6a4f", fontWeight:700, marginBottom:8}}>StoryBridge</div>
      <p style={{color:"#4a7c59", marginBottom:8, fontSize:16}}>Personalized neuro-affirming storybooks for every child</p>
      <p style={{color:"#9ca3af", marginBottom:52, fontSize:13, maxWidth:400}}>Share this page link with any provider &mdash; no login needed</p>
      <div style={{display:"flex", gap:20, flexWrap:"wrap", justifyContent:"center"}}>
        {[
          {icon:"&#127807;", title:"Create New Story", desc:"Generate a personalized illustrated storybook with AI.", fn:onNew},
          {icon:"&#128218;", title:"Story Bank", desc:"Browse, edit, and re-read saved stories.", fn:onBank},
        ].map(c => (
          <div key={c.title} onClick={c.fn}
            style={{background:"white", borderRadius:20, padding:"32px 24px", width:240, cursor:"pointer", boxShadow:"0 4px 20px rgba(45,106,79,0.1)", transition:"transform 0.2s"}}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
            <div style={{fontSize:44, marginBottom:12}} dangerouslySetInnerHTML={{__html:c.icon}}/>
            <h2 style={{fontFamily:"Georgia,serif", fontSize:19, color:"#2d6a4f", marginBottom:8}}>{c.title}</h2>
            <p style={{fontSize:13, color:"#6b7280", lineHeight:1.6}}>{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [pages, setPages] = useState([]);
  const [storyTitle, setStoryTitle] = useState("");
  const [currentEntry, setCurrentEntry] = useState(null);
  const [editPrefill, setEditPrefill] = useState(null);

  async function handleGenerate(pages, title, formData) {
    const entry = {
      id: Date.now().toString(), title,
      childName: formData.childName, clinicianName: formData.clinicianName,
      age: formData.age, pronouns: formData.pronouns,
      interests: formData.interests, strengths: formData.strengths,
      challenge: formData.challenge, animal: formData.animal,
      createdAt: new Date().toLocaleDateString(), pages
    };
    const bank = await loadBank();
    const existing = bank.findIndex(e => editPrefill && e.id === editPrefill.id);
    if (existing >= 0) { bank[existing] = entry; } else { bank.unshift(entry); }
    await saveBank(bank);
    setPages(pages); setStoryTitle(title); setCurrentEntry(entry);
    setEditPrefill(null); setScreen("reader");
  }

  if (screen === "reader") return (
    <Reader pages={pages} title={storyTitle} childName={currentEntry?.childName||""} clinicianName={currentEntry?.clinicianName||""}
      onHome={() => setScreen("landing")}
      onEdit={currentEntry?.id !== "wallace-demo" ? () => { setEditPrefill(currentEntry); setScreen("form"); } : null}
    />
  );
  if (screen === "form") return (
    <Form prefill={editPrefill} onBack={() => setScreen(editPrefill ? "bank" : "landing")} onGenerate={handleGenerate}/>
  );
  if (screen === "bank") return (
    <Bank
      onRead={e => { setPages(e.pages); setStoryTitle(e.title); setCurrentEntry(e); setScreen("reader"); }}
      onCreate={() => { setEditPrefill(null); setScreen("form"); }}
      onEdit={e => { setEditPrefill(e); setScreen("form"); }}
      onBack={() => setScreen("landing")}
    />
  );
  return <Landing onNew={() => { setEditPrefill(null); setScreen("form"); }} onBank={() => setScreen("bank")}/>;
}
