import styles from './Generator.module.scss';

interface CheckboxOptionProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  label: string
}

function CheckboxOption({ checked, onChange, disabled = false, label: textContent }: CheckboxOptionProps) {
  return (
    <div className={styles.inputGroup}>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        {textContent}
      </label>
    </div>
  );
}

export default CheckboxOption;