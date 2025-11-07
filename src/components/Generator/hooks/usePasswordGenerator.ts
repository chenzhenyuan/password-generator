import { useState, useCallback } from 'react';

const CHARSETS = {
  numbers: '0123456789',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  symbols: '~!@#$%&_-+[].<>'
} as const;

interface GenerateOptions {
  includeNumbers: boolean;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeSymbols: boolean;
  length: number;
  selectedCount: number;
}

export function usePasswordGenerator() {
  const [password, setPassword] = useState('');

  const generate = useCallback((options: GenerateOptions) => {
    const parts: string[] = [];
    if (options.includeNumbers) parts.push(CHARSETS.numbers);
    if (options.includeUppercase) parts.push(CHARSETS.upper);
    if (options.includeLowercase) parts.push(CHARSETS.lower);
    if (options.includeSymbols) parts.push(CHARSETS.symbols);

    const chars = parts.join('');
    if (!chars) return '';

    const forbidConsecutiveSymbols = options.includeSymbols && options.selectedCount > 1;
    const nonSymbolChars = parts.filter(p => p !== CHARSETS.symbols).join('');

    let result = '';
    for (let i = 0; i < options.length; i++) {
      let candidate = '';
      let attempts = 0;

      do {
        candidate = (i === 0 && nonSymbolChars.length)
          ? nonSymbolChars.charAt(Math.floor(Math.random() * nonSymbolChars.length))
          : chars.charAt(Math.floor(Math.random() * chars.length));

        attempts++;

        if (!forbidConsecutiveSymbols) break;

        const prevIsSymbol = result.length > 0 && CHARSETS.symbols.includes(result[result.length - 1]);
        const candIsSymbol = CHARSETS.symbols.includes(candidate);

        if (!(prevIsSymbol && candIsSymbol)) break;

        if (attempts > 10) {
          if (nonSymbolChars.length) {
            candidate = nonSymbolChars.charAt(Math.floor(Math.random() * nonSymbolChars.length));
          }
          break;
        }
      } while (true);

      result += candidate;
    }

    setPassword(result);
    return result;
  }, []);

  return { password, generate };
}
