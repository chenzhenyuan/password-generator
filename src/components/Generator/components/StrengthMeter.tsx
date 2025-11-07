import styles from '../Generator.module.scss';

interface StrengthMeterProps {
  level: number;
  text: string;
  color: string;
}

function StrengthMeter({ level, text, color }: StrengthMeterProps) {
  return (
    <div className={styles.strengthMeter}>
      <div className={styles.strengthBar}>
        {[1, 2, 3, 4, 5].map(l => (
          <div
            key={l}
            className={`${styles.strengthSegment} ${level >= l ? `${styles.active} ${styles[color]}` : ''}`}
          />
        ))}
      </div>
      <span className={`${styles.strengthText} ${styles[color]}`}>{text}</span>
    </div>
  );
}

export default StrengthMeter;
