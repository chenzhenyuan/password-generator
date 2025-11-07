import { useEffect, useMemo, useState, useRef } from 'react';
import styles from './Generator.module.scss';
import CheckboxOption from './CheckboxOption';
import PasswordDisplay from './components/PasswordDisplay';
import StrengthMeter from './components/StrengthMeter';
import { usePasswordSettings, type PasswordOptions } from './hooks/usePasswordSettings';
import { usePasswordGenerator } from './hooks/usePasswordGenerator';
import { useScrambleAnimation } from './hooks/useScrambleAnimation';
import { calculateStrength } from './utils/passwordStrength';

function Generator() {
  const { length, setLength, options, setOption, selectedCount, saveSettings } = usePasswordSettings();
  const { password, generate } = usePasswordGenerator();
  const { displayPassword, isAnimating, startScramble } = useScrambleAnimation();

  const handleGenerate = () => {
    const result = generate({ ...options, length, selectedCount });
    if (result) startScramble(result, () => {});
  };

  useEffect(() => {
    saveSettings();
    handleGenerate();
  }, [length, options]);

  // 更新 slider 的 CSS 变量 --progress（把样式逻辑放到 effect 中，避免在 JSX 里写 inline style）
  useEffect(() => {
    if (!rangeRef.current) return;
    const pct = ((length - 4) / (32 - 4)) * 100;
    rangeRef.current.style.setProperty('--progress', `${pct}%`);
  }, [length]);

  const strength = useMemo(
    () => calculateStrength(password, length, options, selectedCount),
    [password, length, options, selectedCount]
  );

  const [copied, setCopied] = useState(false);
  const rangeRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<number | null>(null);

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopied(false), 1000);
  };


  return (
    <div className={styles.container}>
      <h2>密码生成器</h2>

      {password && (
        <div className={styles.passwordResult}>
          <PasswordDisplay
            password={password}
            displayPassword={displayPassword}
            isAnimating={isAnimating}
            onRefresh={handleGenerate}
          />
          <StrengthMeter level={strength.level} text={strength.text} color={strength.color} />
          <button onClick={copyPassword} className={`${styles.copyButton} ${copied ? styles.copied : ''}`}>
            {copied ? '复制成功 ✓' : '复制密码 ♲'}
          </button>
        </div>
      )}

      <div className={styles.inputGroup}>
        <label className={styles.lengthLimit}>
          <div className={styles.sm}>密码长度: {length}</div>
          <div className={styles.rangeControls}>
            <button className={styles.lengthButton} onClick={() => setLength(Math.max(4, length - 1))} disabled={length <= 4}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M2 6h8" />
              </svg>
            </button>
            <input
              ref={rangeRef}
              type="range"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              min="4"
              max="32"
              className={styles.lengthSlider}
            />
            <button className={styles.lengthButton} onClick={() => setLength(Math.min(32, length + 1))} disabled={length >= 32}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 2v8M2 6h8" />
              </svg>
            </button>
          </div>
        </label>
      </div>

      <div className={styles.checkboxGroup}>
        {([
          ['includeUppercase', 'ABC'],
          ['includeLowercase', 'abc'],
          ['includeNumbers', '123'],
          ['includeSymbols', '@&#'],
        ] as const).map(([key, label]) => (
          <CheckboxOption
            key={key}
            checked={options[key as keyof PasswordOptions]}
            onChange={(v) => setOption(key as keyof PasswordOptions, v)}
            disabled={options[key as keyof PasswordOptions] && selectedCount === 1}
            label={label}
          />
        ))}
      </div>
    </div>
  )
}

export default Generator;