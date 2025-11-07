import { useState, useMemo } from 'react';

export interface PasswordOptions {
  includeNumbers: boolean;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeSymbols: boolean;
}

const DEFAULT_SETTINGS = {
  length: 16,
  options: {
    includeNumbers: true,
    includeUppercase: true,
    includeLowercase: true,
    includeSymbols: false,
  }
};

export function usePasswordSettings() {
  const loadSettings = () => {
    const saved = localStorage.getItem('passwordGeneratorSettings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  };

  const initial = loadSettings();
  const [length, setLength] = useState(initial.length);
  const [options, setOptions] = useState<PasswordOptions>(initial.options);

  const selectedCount = useMemo(() => 
    Object.values(options).filter(Boolean).length,
    [options]
  );

  const setOption = <K extends keyof PasswordOptions>(key: K, value: boolean) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    localStorage.setItem('passwordGeneratorSettings', JSON.stringify({ length, options }));
  };

  return { length, setLength, options, setOption, selectedCount, saveSettings };
}
