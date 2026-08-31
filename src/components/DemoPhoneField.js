import React from 'react';
import { PHONE_COUNTRIES } from '../constants/phoneCountries';

const PhoneIcon = () => (
  <svg className="demo-phone-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6.5 3h3l1.2 4.8-1.6 1.1a11 11 0 005 5l1.1-1.6L20.5 14v3a1.5 1.5 0 01-1.4 1.5C10.9 19.2 4.8 13.1 4.5 7.9A1.5 1.5 0 016 6.5z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function DemoPhoneField({
  id = 'phone',
  label,
  countryCode,
  onCountryChange,
  value,
  onChange,
  placeholder,
  countryLabel,
}) {
  return (
    <div className="demo-field demo-field--phone">
      <label htmlFor={id}>{label}</label>
      <div className="demo-phone-row">
        <PhoneIcon />
        <select
          className="demo-phone-country"
          value={countryCode}
          onChange={(e) => onCountryChange(e.target.value)}
          aria-label={countryLabel}
        >
          {PHONE_COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.dial ? `${c.dial} ${c.label}` : c.label}
            </option>
          ))}
        </select>
        <input
          id={id}
          name={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="demo-phone-input"
        />
      </div>
    </div>
  );
}
