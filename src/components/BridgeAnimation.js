import React from 'react';
import './BridgeAnimation.css';

const BridgeAnimation = () => {
  return (
    <section className="bridge-animation-section">
      <div className="container">
        <div className="bridge-animation-wrapper">
          <section className="simasia-painter" aria-label="Human-centered AI: a hand draws bridges from an AI hub to people">
            <svg viewBox="0 0 1200 520" width="100%" xmlns="http://www.w3.org/2000/svg" role="img">
              <defs>
                <style>
                  {`
                    .simasia-painter{
                      --bg: var(--light-bg, #F7FAFC);
                      --dark: var(--dark-text, #1F2D3D);
                      --p: var(--primary, #3E8ED0);
                      --s: var(--secondary, #A0D2EB);
                      --a: var(--accent, #78C0E0);
                      --warm: var(--primary-warm, #C8643B);
                      background: var(--bg);
                      padding: clamp(8px,2vw,16px);
                      border-radius: 18px;
                    }

                    /* Hub */
                    .hub-outer{ stroke: var(--s); stroke-width: 10; fill: none; }
                    .hub-inner{ stroke: var(--a); stroke-width: 2;  fill: none; opacity:.9; }
                    .hub-arc  { stroke: var(--p); stroke-width: 12; stroke-linecap: round; fill: none;
                                transform-origin: 600px 260px; animation: spin 10s linear infinite; }

                    /* Bridges */
                    .guide{ stroke: var(--s); stroke-width: 10; opacity:.10; fill:none; }
                    .bridge-base{ stroke: var(--a); stroke-width: 2; opacity:.25; fill:none; }
                    .bridge-draw{ stroke: var(--p); stroke-width: 6; fill:none; stroke-linecap:round;
                                  stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: draw 9s linear infinite; }

                    /* Warm "care" dash riding each bridge */
                    .care{ stroke: var(--warm); stroke-width: 6; fill:none; stroke-linecap: round;
                           stroke-dasharray: 1 140; animation: flow 2.4s linear infinite; filter: url(#softGlow); }

                    /* People (minimal + halo) */
                    .person{ fill: var(--dark); }
                    .halo{ fill:none; stroke: var(--a); stroke-width: 4; opacity:.18; transform-origin:center;
                           animation: breathe 3.2s ease-in-out infinite; }

                    /* Hand (cubist hint) */
                    .hand{ fill: var(--dark); opacity:0; }
                    .hand-hi{ fill: var(--s); }
                    .handShow{ animation: show .01s forwards; }

                    /* Timing offsets per bridge (stagger for "one hand at a time") */
                    .b1 .bridge-draw{ animation-delay:   0s; } .b1 .care{ animation-delay: .0s; }
                    .b2 .bridge-draw{ animation-delay: 1.5s; } .b2 .care{ animation-delay: 1.5s; }
                    .b3 .bridge-draw{ animation-delay: 3.0s; } .b3 .care{ animation-delay: 3.0s; }
                    .b4 .bridge-draw{ animation-delay: 4.5s; } .b4 .care{ animation-delay: 4.5s; }
                    .b5 .bridge-draw{ animation-delay: 6.0s; } .b5 .care{ animation-delay: 6.0s; }
                    .b6 .bridge-draw{ animation-delay: 7.5s; } .b6 .care{ animation-delay: 7.5s; }

                    /* Animations */
                    @keyframes draw   { from{stroke-dashoffset:1000} to{stroke-dashoffset:0} }
                    @keyframes flow   { from{stroke-dashoffset:0}    to{stroke-dashoffset:-140} }
                    @keyframes spin   { to{ transform: rotate(360deg) } }
                    @keyframes breathe{ 0%,100%{ transform:scale(1)} 50%{ transform:scale(1.18)} }
                    @keyframes show   { to{ opacity:1 } }

                    /* Motion accessibility */
                    @media (prefers-reduced-motion: reduce){
                      .hub-arc,.bridge-draw,.care,.halo{ animation: none !important; stroke-dashoffset:0; transform:none; opacity:1; }
                    }
                  `}
                </style>

                {/* Soft glow for warm dash */}
                <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="b"/>
                  <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              {/* Background guide */}
              <path className="guide" d="M60,390 C240,280 380,380 520,300 S820,200 1140,280" pathLength="1000"/>

              {/* Central AI hub */}
              <g aria-hidden="true">
                <circle className="hub-outer" cx="600" cy="260" r="92"/>
                <circle className="hub-inner" cx="600" cy="260" r="64"/>
                <path className="hub-arc" d="M600,168 a92,92 0 0 1 70,38"/>
              </g>

              {/* PEOPLE (left) */}
              <g>
                <circle className="halo"  cx="260" cy="360" r="18"/>
                <circle className="person" cx="260" cy="360" r="7"/>
                <circle className="halo"  cx="210" cy="240" r="18"/>
                <circle className="person" cx="210" cy="240" r="7"/>
                <circle className="halo"  cx="300" cy="150" r="18"/>
                <circle className="person" cx="300" cy="150" r="7"/>
              </g>

              {/* PEOPLE (right) */}
              <g>
                <circle className="halo"  cx="970" cy="330" r="18"/>
                <circle className="person" cx="970" cy="330" r="7"/>
                <circle className="halo"  cx="1040" cy="220" r="18"/>
                <circle className="person" cx="1040" cy="220" r="7"/>
                <circle className="halo"  cx="900" cy="140" r="18"/>
                <circle className="person" cx="900" cy="140" r="7"/>
              </g>

              {/* BRIDGE GROUPS (each: faint base + drawing stroke + warm dash + moving hand) */}
              {/* L1 */}
              <g className="b1">
                <path id="p1" className="bridge-base" d="M600,260 C520,300 420,330 260,360" pathLength="1000"/>
                <path className="bridge-draw" d="M600,260 C520,300 420,330 260,360" pathLength="1000"/>
                <path className="care" d="M600,260 C520,300 420,330 260,360"/>
                {/* Hand moving along path */}
                <g className="hand handShow">
                  <g>
                    <animateMotion dur="9s" begin="0s" repeatCount="indefinite" keyTimes="0;1">
                      <mpath xlinkHref="#p1"/>
                    </animateMotion>
                    {/* Brush tip */}
                    <circle cx="0" cy="0" r="4" fill="var(--dark)"/>
                    {/* Angled hand facets */}
                    <polygon className="hand" points="0,0 -14,-6 -2,10 10,2"/>
                    <polygon className="hand-hi" points="-4,-2 0,0 6,3"/>
                  </g>
                </g>
              </g>

              {/* L2 */}
              <g className="b2">
                <path id="p2" className="bridge-base" d="M600,260 C500,240 430,230 210,240" pathLength="1000"/>
                <path className="bridge-draw" d="M600,260 C500,240 430,230 210,240" pathLength="1000"/>
                <path className="care" d="M600,260 C500,240 430,230 210,240"/>
                <g className="hand" style={{opacity:0}}>
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.167;0.333;0.334" dur="9s" begin="1.5s" repeatCount="indefinite"/>
                  <g>
                    <animateMotion dur="9s" begin="1.5s" repeatCount="indefinite"><mpath xlinkHref="#p2"/></animateMotion>
                    <circle cx="0" cy="0" r="4" fill="var(--dark)"/>
                    <polygon className="hand" points="0,0 -14,-6 -2,10 10,2"/>
                    <polygon className="hand-hi" points="-4,-2 0,0 6,3"/>
                  </g>
                </g>
              </g>

              {/* L3 */}
              <g className="b3">
                <path id="p3" className="bridge-base" d="M600,260 C520,200 450,170 300,150" pathLength="1000"/>
                <path className="bridge-draw" d="M600,260 C520,200 450,170 300,150" pathLength="1000"/>
                <path className="care" d="M600,260 C520,200 450,170 300,150"/>
                <g className="hand" style={{opacity:0}}>
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.167;0.333;0.334" dur="9s" begin="3s" repeatCount="indefinite"/>
                  <g>
                    <animateMotion dur="9s" begin="3s" repeatCount="indefinite"><mpath xlinkHref="#p3"/></animateMotion>
                    <circle cx="0" cy="0" r="4" fill="var(--dark)"/>
                    <polygon className="hand" points="0,0 -14,-6 -2,10 10,2"/>
                    <polygon className="hand-hi" points="-4,-2 0,0 6,3"/>
                  </g>
                </g>
              </g>

              {/* R1 */}
              <g className="b4">
                <path id="p4" className="bridge-base" d="M600,260 C700,290 830,300 970,330" pathLength="1000"/>
                <path className="bridge-draw" d="M600,260 C700,290 830,300 970,330" pathLength="1000"/>
                <path className="care" d="M600,260 C700,290 830,300 970,330"/>
                <g className="hand" style={{opacity:0}}>
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.167;0.333;0.334" dur="9s" begin="4.5s" repeatCount="indefinite"/>
                  <g>
                    <animateMotion dur="9s" begin="4.5s" repeatCount="indefinite"><mpath xlinkHref="#p4"/></animateMotion>
                    <circle cx="0" cy="0" r="4" fill="var(--dark)"/>
                    <polygon className="hand" points="0,0 -14,-6 -2,10 10,2"/>
                    <polygon className="hand-hi" points="-4,-2 0,0 6,3"/>
                  </g>
                </g>
              </g>

              {/* R2 */}
              <g className="b5">
                <path id="p5" className="bridge-base" d="M600,260 C740,220 880,210 1040,220" pathLength="1000"/>
                <path className="bridge-draw" d="M600,260 C740,220 880,210 1040,220" pathLength="1000"/>
                <path className="care" d="M600,260 C740,220 880,210 1040,220"/>
                <g className="hand" style={{opacity:0}}>
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.167;0.333;0.334" dur="9s" begin="6s" repeatCount="indefinite"/>
                  <g>
                    <animateMotion dur="9s" begin="6s" repeatCount="indefinite"><mpath xlinkHref="#p5"/></animateMotion>
                    <circle cx="0" cy="0" r="4" fill="var(--dark)"/>
                    <polygon className="hand" points="0,0 -14,-6 -2,10 10,2"/>
                    <polygon className="hand-hi" points="-4,-2 0,0 6,3"/>
                  </g>
                </g>
              </g>

              {/* R3 */}
              <g className="b6">
                <path id="p6" className="bridge-base" d="M600,260 C720,200 820,170 900,140" pathLength="1000"/>
                <path className="bridge-draw" d="M600,260 C720,200 820,170 900,140" pathLength="1000"/>
                <path className="care" d="M600,260 C720,200 820,170 900,140"/>
                <g className="hand" style={{opacity:0}}>
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.167;0.333;0.334" dur="9s" begin="7.5s" repeatCount="indefinite"/>
                  <g>
                    <animateMotion dur="9s" begin="7.5s" repeatCount="indefinite"><mpath xlinkHref="#p6"/></animateMotion>
                    <circle cx="0" cy="0" r="4" fill="var(--dark)"/>
                    <polygon className="hand" points="0,0 -14,-6 -2,10 10,2"/>
                    <polygon className="hand-hi" points="-4,-2 0,0 6,3"/>
                  </g>
                </g>
              </g>
            </svg>
          </section>
        </div>
      </div>
    </section>
  );
};

export default BridgeAnimation;

