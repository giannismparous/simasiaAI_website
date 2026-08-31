import React, { createContext, useContext } from 'react';

const ProductVisualLanguageContext = createContext('el');

export const ProductVisualLanguageProvider = ({ language, children }) => (
  <ProductVisualLanguageContext.Provider value={language === 'en' ? 'en' : 'el'}>
    {children}
  </ProductVisualLanguageContext.Provider>
);

export const useProductVisualLanguage = () => useContext(ProductVisualLanguageContext);
