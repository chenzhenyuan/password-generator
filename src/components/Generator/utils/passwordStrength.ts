import { PasswordOptions } from '../hooks/usePasswordSettings';

export function calculateStrength(
  password: string,
  length: number,
  options: PasswordOptions,
  selectedCount: number
) {
  if (!password) return { level: 0, text: '', color: 'weak' };

  const onlyLetters = options.includeUppercase && options.includeLowercase && selectedCount === 2;

  if (length < 8 || selectedCount === 1 || onlyLetters) {
    return { level: 1, text: '很弱', color: 'weak' };
  }

  let score = 1;
  if (length >= 8) score += 1;
  if (length >= 12) score += 1;
  if (length >= 16) score += 1;
  if (selectedCount >= 3) score += 1;

  const levels = ['很弱', '较弱', '中等', '较强', '很强'];
  const colors = ['weak', 'fair', 'good', 'strong', 'very-strong'];
  return { level: score, text: levels[score - 1], color: colors[score - 1] };
}
