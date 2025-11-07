import styles from '../Generator.module.scss';

interface PasswordDisplayProps {
  password: string;
  displayPassword: string;
  isAnimating: boolean;
  onRefresh: () => void;
}

function PasswordDisplay({ password, displayPassword, isAnimating, onRefresh }: PasswordDisplayProps) {
  return (
    <div className={styles.passwordDisplay}>
      <div className={isAnimating ? styles.passwordAnimating : ''}>
        {displayPassword || password}
      </div>
      <button onClick={onRefresh} className={styles.refreshButton} title="生成新密码">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 2v6h-6"></path>
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
          <path d="M3 22v-6h6"></path>
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
        </svg>
      </button>
    </div>
  );
}

export default PasswordDisplay;
