import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import './Mission.css';

const BridgeSection = () => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const timersRef = useRef([]);

  // Generate fixed random offsets for each person circle (so they don't change on re-render)
  const randomOffsets = useMemo(() => [
    Math.random() * 50 + 900,  // 900-950px down
    Math.random() * 50 + 900,
    Math.random() * 50 + 900,
    Math.random() * 50 + 900,
    Math.random() * 50 + 900,
    Math.random() * 50 + 900,
  ], []);

  // Original point positions (base positions, never change)
  const originalPoints = useMemo(() => [
    { cx: 80, cy: 360 + randomOffsets[0] },
    { cx: 30, cy: 240 + randomOffsets[1] },
    { cx: 120, cy: 150 + randomOffsets[2] },
    { cx: 1170, cy: 330 + randomOffsets[3] },
    { cx: 1240, cy: 220 + randomOffsets[4] },
    { cx: 1100, cy: 140 + randomOffsets[5] },
  ], [randomOffsets]);

  // State to store current point positions (will be remapped)
  const [currentPoints, setCurrentPoints] = useState(originalPoints);

  // Animation timing: each bridge takes 9s, with different start delays
  const animationDelays = useMemo(() => [0, 1.5, 3, 4.5, 6, 7.5], []);
  const animationDuration = 9; // seconds

  // Memoized remap function to avoid recreating on each render
  const remapPoint = useCallback((index, basePoint) => {
    // Random offset: 0-100px down, -100 to 100px left/right from base position
    const downOffset = Math.random() * 100;
    const sideOffset = (Math.random() * 200) - 100; // -100 to 100

    setCurrentPoints(prev => {
      // Only update if the point actually changed (optimization)
      const newPoint = {
        cx: basePoint.cx + sideOffset,
        cy: basePoint.cy + downOffset,
      };
      
      // Check if position actually changed to avoid unnecessary updates
      if (prev[index] && 
          prev[index].cx === newPoint.cx && 
          prev[index].cy === newPoint.cy) {
        return prev; // No change, return previous state
      }
      
      const updated = [...prev];
      updated[index] = newPoint;
      return updated;
    });
  }, []);

  // Handle hover state by checking parent wrapper
  useEffect(() => {
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    // Find the parent wrapper element
    const wrapper = ref.current?.closest('.about-mission-wrapper');
    if (wrapper) {
      wrapper.addEventListener('mouseenter', handleMouseEnter);
      wrapper.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (wrapper) {
        wrapper.removeEventListener('mouseenter', handleMouseEnter);
        wrapper.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    // Cleanup any existing timers first
    timersRef.current.forEach(timer => {
      if (typeof timer === 'number') {
        clearTimeout(timer);
      } else {
        clearInterval(timer);
      }
    });
    timersRef.current = [];

    // Remap points when each animation completes
    originalPoints.forEach((basePoint, index) => {
      // Remap point after first animation completes
      const firstTimer = setTimeout(() => {
        remapPoint(index, basePoint);
        // Then remap every animation cycle
        const intervalTimer = setInterval(() => {
          remapPoint(index, basePoint);
        }, animationDuration * 1000);
        timersRef.current.push(intervalTimer);
      }, (animationDelays[index] + animationDuration) * 1000);

      timersRef.current.push(firstTimer);
    });

    // Cleanup function
    return () => {
      timersRef.current.forEach(timer => {
        if (typeof timer === 'number') {
          clearTimeout(timer);
        } else {
          clearInterval(timer);
        }
      });
      timersRef.current = [];
    };
  }, [originalPoints, remapPoint, animationDelays, animationDuration]);

  return (
    <section className="bridge-section">
      <div className="container">
        <div 
          ref={ref}
          className="about-network-visualization"
        >
          <section className="simasia-painter" aria-label="Human-centered AI: a hand draws bridges from an AI hub to people">
            <svg viewBox="-200 0 1600 1400" width="100%" xmlns="http://www.w3.org/2000/svg" role="img">
              <defs>
                <style>
                  {`
                    .simasia-painter{
                      --bg: transparent;
                      --dark: var(--dark-text, #1F2D3D);
                      --p: var(--primary-warm, #2C7A7B);
                      --s: var(--secondary-warm, #5FB3B4);
                      --a: var(--accent-warm, #E07A5F);
                      --warm: var(--primary-warm, #2C7A7B);
                      background: var(--bg);
                      padding: 0;
                      border-radius: 0;
                    }

                    .hub-outer{ stroke: var(--s); stroke-width: 10; fill: none; opacity: ${isHovered ? 0.4 : 0.12}; transition: opacity 0.5s ease-in-out; }
                    .hub-inner{ stroke: var(--a); stroke-width: 2; fill: none; opacity: ${isHovered ? 0.35 : 0.1}; transition: opacity 0.5s ease-in-out; }
                    .hub-arc{ stroke: var(--p); stroke-width: 12; stroke-linecap: round; fill: none;
                              transform-origin: 600px 260px; animation: spin 10s linear infinite; opacity: ${isHovered ? 0.5 : 0.15}; transition: opacity 0.5s ease-in-out; }

                    .bridge-base{ stroke: var(--a); stroke-width: 2; opacity: ${isHovered ? 0.3 : 0.08}; fill: none; transition: opacity 0.5s ease-in-out; }
                    .bridge-draw{ stroke: var(--p); stroke-width: 6; fill: none; stroke-linecap: round;
                                  stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: draw 9s linear infinite; opacity: ${isHovered ? 0.5 : 0.15}; transition: opacity 0.5s ease-in-out; }

                    .care{ stroke: var(--warm); stroke-width: 6; fill: none; stroke-linecap: round;
                           stroke-dasharray: 1 140; animation: flow 2.4s linear infinite; filter: url(#softGlow); opacity: ${isHovered ? 0.6 : 0.18}; transition: opacity 0.5s ease-in-out; }

                    .person{ fill: var(--dark); opacity: ${isHovered ? 0.7 : 0.2}; transition: opacity 0.5s ease-in-out; }
                    .halo{ fill: none; stroke: var(--a); stroke-width: 4; opacity: ${isHovered ? 0.3 : 0.08};
                           transform-origin: center; animation: breathe 3.2s ease-in-out infinite; transition: opacity 0.5s ease-in-out; }

                    .hand{ fill: var(--dark); opacity: 0; }
                    .hand-hi{ fill: var(--s); }
                    .handShow{ animation: show .01s forwards; }

                    .b1 .bridge-draw{ animation-delay: 0s; } .b1 .care{ animation-delay: .0s; }
                    .b2 .bridge-draw{ animation-delay: 1.5s; } .b2 .care{ animation-delay: 1.5s; }
                    .b3 .bridge-draw{ animation-delay: 3.0s; } .b3 .care{ animation-delay: 3.0s; }
                    .b4 .bridge-draw{ animation-delay: 4.5s; } .b4 .care{ animation-delay: 4.5s; }
                    .b5 .bridge-draw{ animation-delay: 6.0s; } .b5 .care{ animation-delay: 6.0s; }
                    .b6 .bridge-draw{ animation-delay: 7.5s; } .b6 .care{ animation-delay: 7.5s; }

                    @keyframes draw{ from{stroke-dashoffset:1000} to{stroke-dashoffset:0} }
                    @keyframes flow{ from{stroke-dashoffset:0} to{stroke-dashoffset:-140} }
                    @keyframes spin{ to{ transform: rotate(360deg) } }
                    @keyframes breathe{ 0%,100%{ transform:scale(1)} 50%{ transform:scale(1.18)} }
                    @keyframes show{ to{ opacity:1 } }
                    .person, .halo{ transition: cx 0.3s ease-out, cy 0.3s ease-out; }

                    @media (prefers-reduced-motion: reduce){
                      .hub-arc,.bridge-draw,.care,.halo{ animation: none !important; stroke-dashoffset:0; transform:none; opacity:0.15; }
                    }
                  `}
                </style>

                <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="b"/>
                  <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              <g aria-hidden="true">
                <circle className="hub-outer" cx="600" cy="260" r="92"/>
                <circle className="hub-inner" cx="600" cy="260" r="64"/>
                <path className="hub-arc" d="M600,168 a92,92 0 0 1 70,38"/>
              </g>

              <g>
                <circle className="halo" cx={currentPoints[0]?.cx || originalPoints[0].cx} cy={currentPoints[0]?.cy || originalPoints[0].cy} r="18"/>
                <circle className="person" cx={currentPoints[0]?.cx || originalPoints[0].cx} cy={currentPoints[0]?.cy || originalPoints[0].cy} r="7"/>
                <circle className="halo" cx={currentPoints[1]?.cx || originalPoints[1].cx} cy={currentPoints[1]?.cy || originalPoints[1].cy} r="18"/>
                <circle className="person" cx={currentPoints[1]?.cx || originalPoints[1].cx} cy={currentPoints[1]?.cy || originalPoints[1].cy} r="7"/>
                <circle className="halo" cx={currentPoints[2]?.cx || originalPoints[2].cx} cy={currentPoints[2]?.cy || originalPoints[2].cy} r="18"/>
                <circle className="person" cx={currentPoints[2]?.cx || originalPoints[2].cx} cy={currentPoints[2]?.cy || originalPoints[2].cy} r="7"/>
              </g>

              <g>
                <circle className="halo" cx={currentPoints[3]?.cx || originalPoints[3].cx} cy={currentPoints[3]?.cy || originalPoints[3].cy} r="18"/>
                <circle className="person" cx={currentPoints[3]?.cx || originalPoints[3].cx} cy={currentPoints[3]?.cy || originalPoints[3].cy} r="7"/>
                <circle className="halo" cx={currentPoints[4]?.cx || originalPoints[4].cx} cy={currentPoints[4]?.cy || originalPoints[4].cy} r="18"/>
                <circle className="person" cx={currentPoints[4]?.cx || originalPoints[4].cx} cy={currentPoints[4]?.cy || originalPoints[4].cy} r="7"/>
                <circle className="halo" cx={currentPoints[5]?.cx || originalPoints[5].cx} cy={currentPoints[5]?.cy || originalPoints[5].cy} r="18"/>
                <circle className="person" cx={currentPoints[5]?.cx || originalPoints[5].cx} cy={currentPoints[5]?.cy || originalPoints[5].cy} r="7"/>
              </g>

              <g className="b1">
                <path id="p1" className="bridge-base" d={`M600,260 C400,300 250,330 ${currentPoints[0]?.cx || originalPoints[0].cx},${currentPoints[0]?.cy || originalPoints[0].cy}`} pathLength="1000"/>
                <path className="bridge-draw" d={`M600,260 C400,300 250,330 ${currentPoints[0]?.cx || originalPoints[0].cx},${currentPoints[0]?.cy || originalPoints[0].cy}`} pathLength="1000"/>
                <path className="care" d={`M600,260 C400,300 250,330 ${currentPoints[0]?.cx || originalPoints[0].cx},${currentPoints[0]?.cy || originalPoints[0].cy}`}/>
                <g className="hand handShow">
                  <g>
                    <animateMotion dur="9s" begin="0s" repeatCount="indefinite" keyTimes="0;1">
                      <mpath xlinkHref="#p1"/>
                    </animateMotion>
                    <circle cx="0" cy="0" r="4" fill="var(--dark)"/>
                    <polygon className="hand" points="0,0 -14,-6 -2,10 10,2"/>
                    <polygon className="hand-hi" points="-4,-2 0,0 6,3"/>
                  </g>
                </g>
              </g>

              <g className="b2">
                <path id="p2" className="bridge-base" d={`M600,260 C400,240 200,230 ${currentPoints[1]?.cx || originalPoints[1].cx},${currentPoints[1]?.cy || originalPoints[1].cy}`} pathLength="1000"/>
                <path className="bridge-draw" d={`M600,260 C400,240 200,230 ${currentPoints[1]?.cx || originalPoints[1].cx},${currentPoints[1]?.cy || originalPoints[1].cy}`} pathLength="1000"/>
                <path className="care" d={`M600,260 C400,240 200,230 ${currentPoints[1]?.cx || originalPoints[1].cx},${currentPoints[1]?.cy || originalPoints[1].cy}`}/>
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

              <g className="b3">
                <path id="p3" className="bridge-base" d={`M600,260 C400,200 250,170 ${currentPoints[2]?.cx || originalPoints[2].cx},${currentPoints[2]?.cy || originalPoints[2].cy}`} pathLength="1000"/>
                <path className="bridge-draw" d={`M600,260 C400,200 250,170 ${currentPoints[2]?.cx || originalPoints[2].cx},${currentPoints[2]?.cy || originalPoints[2].cy}`} pathLength="1000"/>
                <path className="care" d={`M600,260 C400,200 250,170 ${currentPoints[2]?.cx || originalPoints[2].cx},${currentPoints[2]?.cy || originalPoints[2].cy}`}/>
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

              <g className="b4">
                <path id="p4" className="bridge-base" d={`M600,260 C800,290 1000,300 ${currentPoints[3]?.cx || originalPoints[3].cx},${currentPoints[3]?.cy || originalPoints[3].cy}`} pathLength="1000"/>
                <path className="bridge-draw" d={`M600,260 C800,290 1000,300 ${currentPoints[3]?.cx || originalPoints[3].cx},${currentPoints[3]?.cy || originalPoints[3].cy}`} pathLength="1000"/>
                <path className="care" d={`M600,260 C800,290 1000,300 ${currentPoints[3]?.cx || originalPoints[3].cx},${currentPoints[3]?.cy || originalPoints[3].cy}`}/>
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

              <g className="b5">
                <path id="p5" className="bridge-base" d={`M600,260 C840,220 1080,210 ${currentPoints[4]?.cx || originalPoints[4].cx},${currentPoints[4]?.cy || originalPoints[4].cy}`} pathLength="1000"/>
                <path className="bridge-draw" d={`M600,260 C840,220 1080,210 ${currentPoints[4]?.cx || originalPoints[4].cx},${currentPoints[4]?.cy || originalPoints[4].cy}`} pathLength="1000"/>
                <path className="care" d={`M600,260 C840,220 1080,210 ${currentPoints[4]?.cx || originalPoints[4].cx},${currentPoints[4]?.cy || originalPoints[4].cy}`}/>
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

              <g className="b6">
                <path id="p6" className="bridge-base" d={`M600,260 C820,200 1020,170 ${currentPoints[5]?.cx || originalPoints[5].cx},${currentPoints[5]?.cy || originalPoints[5].cy}`} pathLength="1000"/>
                <path className="bridge-draw" d={`M600,260 C820,200 1020,170 ${currentPoints[5]?.cx || originalPoints[5].cx},${currentPoints[5]?.cy || originalPoints[5].cy}`} pathLength="1000"/>
                <path className="care" d={`M600,260 C820,200 1020,170 ${currentPoints[5]?.cx || originalPoints[5].cx},${currentPoints[5]?.cy || originalPoints[5].cy}`}/>
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

export default BridgeSection;

