import React from 'react';
import './GateIllustrations.css';

/*
 * Anthropic-style SVG illustrations:
 * — Very large rounded heads (~40% of figure height)
 * — Smooth pill/rounded-rect bodies
 * — Two dot eyes, tiny curved smile
 * — Arms as gentle ellipses
 * — Flat colors, no gradients
 * — 4-pointed sparkle stars (equal-length axes)
 * — Animated with CSS keyframes
 */

/* Reusable 4-pointed sparkle star centered at 0,0 */
const Star4 = ({ x, y, r = 10, color = '#d97757', opacity = 1, className = '' }) => (
  <g transform={`translate(${x},${y})`} className={className} style={{ color }}>
    <path
      d={`M0,${-r} C${r*0.18},${-r*0.18} ${r*0.18},${-r*0.18} ${r},0 C${r*0.18},${r*0.18} ${r*0.18},${r*0.18} 0,${r} C${-r*0.18},${r*0.18} ${-r*0.18},${r*0.18} ${-r},0 C${-r*0.18},${-r*0.18} ${-r*0.18},${-r*0.18} 0,${-r} Z`}
      fill={color} opacity={opacity}
    />
  </g>
);

/* ── CLINIC ILLUSTRATION ──────────────────────────────────────
   Doctor (tall, white coat, orange cross) stands beside a seated
   patient. A phone floats top-right with a checkmark — inbox zero.
   Orange sparkle stars orbit the scene in a slow arc.
   ──────────────────────────────────────────────────────────── */
export const ClinicIllustration = () => (
  <div className="gate-illus gate-illus--clinic" aria-hidden="true">
    <svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="gate-illus-svg">

      {/* ── Sparkle stars — orbit via CSS ── */}
      <Star4 x="140" y="24"  r="9"   color="#d97757" className="gi-star gi-star--1"/>
      <Star4 x="244" y="105" r="6.5" color="#d97757" opacity={0.7} className="gi-star gi-star--2"/>
      <Star4 x="218" y="228" r="5"   color="#faf9f5" opacity={0.55} className="gi-star gi-star--3"/>
      <Star4 x="58"  y="220" r="5"   color="#d97757" opacity={0.5} className="gi-star gi-star--4"/>
      <Star4 x="36"  y="108" r="6"   color="#faf9f5" opacity={0.6} className="gi-star gi-star--5"/>

      {/* ── DOCTOR FIGURE — center-left ── */}
      <g className="gi-doctor">
        {/* Head — large, round, cream */}
        <ellipse cx="108" cy="98" rx="26" ry="28" fill="#f2ede6"/>
        {/* Hair — dark rounded cap, organic */}
        <ellipse cx="108" cy="83" rx="26" ry="14" fill="#2c2825"/>
        {/* Eyes — simple dots */}
        <circle cx="100" cy="100" r="3" fill="#1a1816"/>
        <circle cx="116" cy="100" r="3" fill="#1a1816"/>
        {/* Smile */}
        <path d="M101 110 Q108 116 115 110"
          stroke="#1a1816" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Neck */}
        <rect x="103" y="124" width="10" height="10" rx="5" fill="#f2ede6"/>
        {/* White coat body — tall rounded rect */}
        <rect x="82" y="132" width="52" height="68" rx="14" fill="#ede8e0"/>
        {/* Coat collar V */}
        <path d="M108 132 L96 150 L96 200" stroke="#c8c3bb" strokeWidth="1.5" fill="none"/>
        <path d="M108 132 L120 150 L120 200" stroke="#c8c3bb" strokeWidth="1.5" fill="none"/>
        {/* Orange medical cross */}
        <rect x="103" y="158" width="10" height="3.5" rx="1.75" fill="#d97757"/>
        <rect x="106" y="155" width="3.5" height="10" rx="1.75" fill="#d97757"/>
        {/* Left arm */}
        <ellipse cx="74" cy="152" rx="10" ry="7" fill="#ede8e0" transform="rotate(-15 74 152)"/>
        {/* Right arm */}
        <ellipse cx="142" cy="152" rx="10" ry="7" fill="#ede8e0" transform="rotate(15 142 152)"/>
        {/* Trousers */}
        <rect x="86"  cy="200" x2="86"  y="198" width="20" height="34" rx="8" fill="#3a3630"/>
        <rect x="110" cy="200" x2="110" y="198" width="20" height="34" rx="8" fill="#3a3630"/>
        {/* Shoes */}
        <ellipse cx="96"  cy="232" rx="12" ry="5" fill="#252220"/>
        <ellipse cx="120" cy="232" rx="12" ry="5" fill="#252220"/>
      </g>

      {/* ── PATIENT FIGURE — seated right, looking up at doctor ── */}
      <g className="gi-patient">
        {/* Head */}
        <ellipse cx="200" cy="164" rx="20" ry="21" fill="#f2ede6"/>
        {/* Hair */}
        <ellipse cx="200" cy="151" rx="20" ry="11" fill="#5c4838"/>
        {/* Eyes — slightly upward looking */}
        <circle cx="193" cy="165" r="2.4" fill="#1a1816"/>
        <circle cx="207" cy="165" r="2.4" fill="#1a1816"/>
        {/* Gentle calm smile */}
        <path d="M194 173 Q200 178 206 173"
          stroke="#1a1816" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        {/* Body — sitting, casual */}
        <rect x="182" y="183" width="36" height="42" rx="10" fill="#b8c0cc"/>
        {/* Arm reaching toward doctor */}
        <ellipse cx="172" cy="197" rx="11" ry="6.5" fill="#b8c0cc" transform="rotate(-20 172 197)"/>
        {/* Legs — folded sitting */}
        <rect x="184" y="222" width="14" height="22" rx="7" fill="#3a3630"/>
        <rect x="202" y="222" width="14" height="22" rx="7" fill="#3a3630"/>
      </g>

      {/* ── Dashed connection line doctor → patient ── */}
      <path className="gi-connect-arc"
        d="M148 165 Q174 148 184 183"
        stroke="#d97757" strokeWidth="1.5" fill="none"
        strokeLinecap="round" strokeDasharray="4 3" opacity="0.55"/>

      {/* ── Floating phone / check: answered inbox ── */}
      <g className="gi-phone-float">
        <rect x="50" y="142" width="22" height="34" rx="6" fill="#2a2826"/>
        <rect x="54" y="147" width="14" height="20" rx="3" fill="#1a1816"/>
        {/* Check on screen */}
        <path d="M57 157 L60.5 161 L67 153"
          stroke="#d97757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Home button */}
        <circle cx="61" cy="172" r="2.5" fill="#d97757" opacity="0.7"/>
      </g>

      {/* Small sparkle dots */}
      <circle cx="162" cy="62" r="2.5" fill="#d97757" className="gi-dot gi-dot--1"/>
      <circle cx="245" cy="172" r="2"   fill="#faf9f5" opacity="0.4" className="gi-dot gi-dot--2"/>
      <circle cx="42"  cy="185" r="2"   fill="#d97757" opacity="0.55" className="gi-dot gi-dot--3"/>
    </svg>
  </div>
);

/* ── NGO ILLUSTRATION ─────────────────────────────────────────
   A welcoming central figure with arms wide open — two smaller
   figures lean in from each side. A pulsing green heart floats
   above, connecting all three. Green stars orbit.
   ──────────────────────────────────────────────────────────── */
export const NgoIllustration = () => (
  <div className="gate-illus gate-illus--ngo" aria-hidden="true">
    <svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="gate-illus-svg">

      {/* ── Green sparkle stars ── */}
      <Star4 x="140" y="22"  r="9"   color="#6aab6a" className="gi-star gi-star--1"/>
      <Star4 x="248" y="108" r="6.5" color="#6aab6a" opacity={0.65} className="gi-star gi-star--2"/>
      <Star4 x="215" y="232" r="5"   color="#faf9f5" opacity={0.5} className="gi-star gi-star--3"/>
      <Star4 x="62"  y="228" r="5"   color="#6aab6a" opacity={0.55} className="gi-star gi-star--4"/>
      <Star4 x="32"  y="108" r="6"   color="#faf9f5" opacity={0.6} className="gi-star gi-star--5"/>

      {/* ── CENTRAL FIGURE — arms wide, welcoming ── */}
      <g className="gi-center-person">
        {/* Head — large and round */}
        <ellipse cx="140" cy="95" rx="28" ry="29" fill="#f2ede6"/>
        {/* Hair */}
        <ellipse cx="140" cy="80" rx="28" ry="15" fill="#2c2825"/>
        {/* Eyes — warm, open */}
        <circle cx="131" cy="97" r="3" fill="#1a1816"/>
        <circle cx="149" cy="97" r="3" fill="#1a1816"/>
        {/* Big warm smile */}
        <path d="M130 107 Q140 115 150 107"
          stroke="#1a1816" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Neck */}
        <rect x="135" y="122" width="10" height="10" rx="5" fill="#f2ede6"/>
        {/* Body — green top, open stance */}
        <rect x="114" y="130" width="52" height="58" rx="14" fill="#6aab6a"/>
        {/* Left arm — extended wide out */}
        <path d="M114 148 Q90 138 66 145"
          stroke="#6aab6a" strokeWidth="13" strokeLinecap="round"/>
        {/* Right arm — extended wide out */}
        <path d="M166 148 Q190 138 214 145"
          stroke="#6aab6a" strokeWidth="13" strokeLinecap="round"/>
        {/* Trousers */}
        <rect x="118" y="185" width="18" height="32" rx="8" fill="#3a3630"/>
        <rect x="144" y="185" width="18" height="32" rx="8" fill="#3a3630"/>
        {/* Shoes */}
        <ellipse cx="127" cy="217" rx="13" ry="5.5" fill="#252220"/>
        <ellipse cx="153" cy="217" rx="13" ry="5.5" fill="#252220"/>
      </g>

      {/* ── LEFT FIGURE — leaning in, smaller ── */}
      <g className="gi-left-person">
        {/* Head */}
        <ellipse cx="68" cy="170" rx="18" ry="19" fill="#f2ede6"/>
        {/* Hair */}
        <ellipse cx="68" cy="157" rx="18" ry="10" fill="#6c4c38"/>
        {/* Eyes */}
        <circle cx="62"  cy="171" r="2.2" fill="#1a1816"/>
        <circle cx="74"  cy="171" r="2.2" fill="#1a1816"/>
        {/* Smile */}
        <path d="M62 179 Q68 184 74 179"
          stroke="#1a1816" strokeWidth="1.7" fill="none" strokeLinecap="round"/>
        {/* Body — tilted toward center */}
        <rect x="52" y="187" width="32" height="38" rx="10" fill="#a8b8c0"
          transform="rotate(-8 68 206)"/>
        {/* Legs */}
        <rect x="55" y="224" width="12" height="22" rx="6" fill="#3a3630"/>
        <rect x="71" y="226" width="12" height="22" rx="6" fill="#3a3630"/>
      </g>

      {/* ── RIGHT FIGURE — leaning in, smaller ── */}
      <g className="gi-right-person">
        {/* Head */}
        <ellipse cx="212" cy="170" rx="18" ry="19" fill="#f2ede6"/>
        {/* Hair */}
        <ellipse cx="212" cy="157" rx="18" ry="10" fill="#2c3848"/>
        {/* Eyes */}
        <circle cx="206" cy="171" r="2.2" fill="#1a1816"/>
        <circle cx="218" cy="171" r="2.2" fill="#1a1816"/>
        {/* Smile */}
        <path d="M206 179 Q212 184 218 179"
          stroke="#1a1816" strokeWidth="1.7" fill="none" strokeLinecap="round"/>
        {/* Body — tilted toward center */}
        <rect x="196" y="187" width="32" height="38" rx="10" fill="#a8b8c0"
          transform="rotate(8 212 206)"/>
        {/* Legs */}
        <rect x="198" y="224" width="12" height="22" rx="6" fill="#3a3630"/>
        <rect x="214" y="226" width="12" height="22" rx="6" fill="#3a3630"/>
      </g>

      {/* ── Floating heart above ── */}
      <g className="gi-heart-float">
        <path d="M140 72 C140 72 122 55 122 44 C122 36 130 30 140 40 C150 30 158 36 158 44 C158 55 140 72 140 72 Z"
          fill="#6aab6a" opacity="0.9"/>
      </g>

      {/* ── Connection arcs from arms to side figures ── */}
      <path d="M71 167 Q88 155 114 148"
        stroke="#6aab6a" strokeWidth="1.2" strokeDasharray="3 2.5"
        opacity="0.45" fill="none" className="gi-connect-arc"/>
      <path d="M209 167 Q192 155 166 148"
        stroke="#6aab6a" strokeWidth="1.2" strokeDasharray="3 2.5"
        opacity="0.45" fill="none" className="gi-connect-arc"/>

      {/* Small sparkle dots */}
      <circle cx="162" cy="56" r="2.5" fill="#6aab6a" className="gi-dot gi-dot--1"/>
      <circle cx="250" cy="175" r="2"   fill="#faf9f5" opacity="0.4" className="gi-dot gi-dot--2"/>
      <circle cx="30"  cy="175" r="2"   fill="#6aab6a" opacity="0.5" className="gi-dot gi-dot--3"/>
    </svg>
  </div>
);
