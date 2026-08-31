import React, { createContext, useContext, useState } from 'react';

const BILLING_CYCLE_KEY = 'simasia-pyxida-billing-cycle';
const ANNUAL_HINT_KEY = 'simasia-pyxida-annual-hint-seen';

const BillingPreferenceContext = createContext(null);

const readBillingCycle = () => {
  try {
    return sessionStorage.getItem(BILLING_CYCLE_KEY) === 'annual' ? 'annual' : 'monthly';
  } catch {
    return 'monthly';
  }
};

const readAnnualHintSeen = () => {
  try {
    return sessionStorage.getItem(ANNUAL_HINT_KEY) === '1';
  } catch {
    return false;
  }
};

export const useBillingPreference = () => {
  const context = useContext(BillingPreferenceContext);
  if (!context) {
    throw new Error('useBillingPreference must be used within a BillingPreferenceProvider');
  }
  return context;
};

export const BillingPreferenceProvider = ({ children }) => {
  const [billingCycle, setBillingCycleState] = useState(readBillingCycle);
  const [annualHintSeen, setAnnualHintSeenState] = useState(readAnnualHintSeen);

  const setBillingCycle = (cycle) => {
    const next = cycle === 'annual' ? 'annual' : 'monthly';
    setBillingCycleState(next);
    try {
      sessionStorage.setItem(BILLING_CYCLE_KEY, next);
    } catch {
      /* ignore storage failures */
    }

    if (next === 'annual' && !annualHintSeen) {
      setAnnualHintSeenState(true);
      try {
        sessionStorage.setItem(ANNUAL_HINT_KEY, '1');
      } catch {
        /* ignore storage failures */
      }
    }
  };

  return (
    <BillingPreferenceContext.Provider
      value={{
        billingCycle,
        setBillingCycle,
        showAnnualHint: !annualHintSeen,
      }}
    >
      {children}
    </BillingPreferenceContext.Provider>
  );
};
