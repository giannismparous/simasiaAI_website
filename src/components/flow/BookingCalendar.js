import React, { useMemo, useState } from 'react';

/*
 * A week of 30-minute slots, 09:00–17:00, Monday to Friday (Greek time).
 * A typical day: mornings open, 12:00–16:00 taken, 16:00–17:00 open again.
 * Each day has at most 7 free slots; everything else shows as booked.
 * The pattern varies by date but is stable for the same date.
 */

const SLOTS = Array.from({ length: 16 }, (_, i) => ({ i, h: 9 + Math.floor(i / 2), m: (i % 2) * 30 }));
const label = (s) => `${String(s.h).padStart(2, '0')}:${s.m ? '30' : '00'}`;
const endLabel = (s) => label(SLOTS[s.i + 1] || { h: 17, m: 0 });

// free slot indices (0 = 09:00 … 14 = 16:00, 15 = 16:30); never more than 7
const PATTERNS = [
  [0, 1, 2, 3, 5, 14, 15],
  [0, 2, 3, 4, 5, 14, 15],
  [1, 2, 3, 4, 14, 15],
  [0, 1, 3, 4, 5, 15],
  [0, 1, 2, 4, 5, 14, 15],
  [2, 3, 4, 5, 7, 14],
];

const dayKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const dayOfYear = (d) => Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - Date.UTC(d.getFullYear(), 0, 0)) / 864e5);

export const freeSlotsFor = (d, now = new Date()) => {
  const wd = d.getDay();
  if (wd === 0 || wd === 6) return [];
  const pattern = PATTERNS[(dayOfYear(d) * 7 + wd) % PATTERNS.length];
  const sameDay = dayKey(d) === dayKey(now);
  if (d < new Date(now.getFullYear(), now.getMonth(), now.getDate())) return [];
  // today: only slots at least 2 hours ahead
  return pattern.filter((i) => !sameDay || (SLOTS[i].h * 60 + SLOTS[i].m) >= now.getHours() * 60 + now.getMinutes() + 120);
};

const mondayOf = (d) => { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); const wd = (x.getDay() + 6) % 7; x.setDate(x.getDate() - wd); return x; };

const BookingCalendar = ({ c, lang, value, onChange, taken = [] }) => {
  const now = useMemo(() => new Date(), []);
  // start from this week; on Friday evening or the weekend, start from next week
  const firstMonday = useMemo(() => {
    const m = mondayOf(now);
    const fri = new Date(m); fri.setDate(m.getDate() + 4);
    if (now.getDay() === 0 || now.getDay() === 6 || (dayKey(now) === dayKey(fri) && !freeSlotsFor(fri, now).length)) m.setDate(m.getDate() + 7);
    return m;
  }, [now]);
  const [week, setWeek] = useState(0);
  const days = useMemo(() => Array.from({ length: 5 }, (_, n) => { const d = new Date(firstMonday); d.setDate(firstMonday.getDate() + week * 7 + n); return d; }), [firstMonday, week]);
  const loc = lang === 'en' ? 'en-GB' : 'el-GR';
  const fmtDay = (d) => d.toLocaleDateString(loc, { weekday: 'short' }).replace('.', '');
  const fmtDate = (d) => d.toLocaleDateString(loc, { day: 'numeric', month: 'short' }).replace('.', '');
  const range = `${days[0].toLocaleDateString(loc, { day: 'numeric', month: 'long' })} – ${days[4].toLocaleDateString(loc, { day: 'numeric', month: 'long' })}`;

  return (
    <div className="bk">
      <div className="bk-head">
        <button type="button" className="bk-arrow" onClick={() => setWeek((w) => Math.max(0, w - 1))} disabled={week === 0} aria-label={c.prevWeek}>←</button>
        <p className="bk-range">{range}</p>
        <button type="button" className="bk-arrow" onClick={() => setWeek((w) => Math.min(3, w + 1))} disabled={week === 3} aria-label={c.nextWeek}>→</button>
      </div>
      <div className="bk-legend" aria-hidden="true">
        <span><i className="bk-k-free" />{c.free}</span>
        <span><i className="bk-k-booked" />{c.booked}</span>
        <span className="bk-tz">{c.tz}</span>
      </div>
      <div className="bk-grid" role="grid" aria-label={c.gridAria}>
        <div className="bk-corner" />
        {days.map((d) => (
          <div key={dayKey(d)} className={`bk-day${dayKey(d) === dayKey(now) ? ' is-today' : ''}`} role="columnheader">
            <b>{fmtDay(d)}</b><span>{fmtDate(d)}</span>
          </div>
        ))}
        {SLOTS.map((s) => (
          <React.Fragment key={s.i}>
            <div className={`bk-time${s.m ? ' is-half' : ''}`}>{s.m ? '' : label(s)}</div>
            {days.map((d) => {
              const id = `${dayKey(d)} ${label(s)}`;
              const free = freeSlotsFor(d, now).includes(s.i) && !taken.includes(id);
              const on = value && value.id === id;
              if (!free) return <div key={id} className="bk-cell is-booked" title={c.booked} aria-label={`${fmtDay(d)} ${label(s)} ${c.booked}`} role="gridcell" />;
              return (
                <button
                  key={id} type="button" role="gridcell"
                  className={`bk-cell is-free${on ? ' is-on' : ''}`}
                  aria-pressed={on}
                  aria-label={`${fmtDay(d)} ${fmtDate(d)} ${label(s)}–${endLabel(s)} ${c.free}`}
                  onClick={() => onChange({ id, date: d, start: label(s), end: endLabel(s), text: `${d.toLocaleDateString(loc, { weekday: 'long', day: 'numeric', month: 'long' })}, ${label(s)}–${endLabel(s)}` })}
                >
                  <span>{label(s)}</span>
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BookingCalendar;
