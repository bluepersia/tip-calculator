import { useEffect, useState } from 'react';
import styles from './Calculator.module.css';

type FormData = {
  bill: number;
  tip: number;
  numPeople: number;
};

export default function Calculator(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    bill: 0,
    tip: 0,
    numPeople: 0,
  });
  const [custom, setCustom] = useState<number>();

  function handleInputChange(e: React.ChangeEvent): void {
    const { name, value } = e.target as HTMLInputElement;

    setFormData((formData) => ({ ...formData, [name]: value }));
  }

  useEffect(() => {
    if (custom) setFormData((formData) => ({ ...formData, tip: custom / 100 }));
  }, [custom]);

  function setTip(tip: number): void {
    setFormData((formData) => ({ ...formData, tip }));
  }

  function calculateTipPerPerson(): number {
    const tipTotal = formData.bill * formData.tip;

    return tipTotal / formData.numPeople;
  }

  function calculateTotalPerPerson(): number {
    return formData.bill / formData.numPeople;
  }

  function reset(): void {
    setFormData((formData) => ({ ...formData, bill: 0, tip: 0, numPeople: 0 }));
  }

  return (
    <div className={styles.calculator}>
      <div className={styles.calculatorInput}>
        <div className={styles.inputWrapper}>
          <h4 className={styles.inputTitle}>Bill</h4>
          <input
            type='number'
            className={styles.inputNumber}
            name='bill'
            value={formData.bill}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.tipWrapper}>
          <button onClick={() => setTip(0.05)} className={styles.btnTip}>
            5%
          </button>
          <button onClick={() => setTip(0.1)} className={styles.btnTip}>
            10%
          </button>
          <button onClick={() => setTip(0.15)} className={styles.btnTip}>
            15%
          </button>
          <button onClick={() => setTip(0.25)} className={styles.btnTip}>
            25%
          </button>
          <button onClick={() => setTip(0.5)} className={styles.btnTip}>
            50%
          </button>
          <input
            className={styles.btnCustom}
            type='number'
            placeholder='Custom'
            value={custom}
            onChange={(e) =>
              setCustom(Number((e.target as HTMLInputElement).value))
            }
          />
        </div>
        <div className={styles.inputWrapper}>
          <h4 className={styles.inputTitle}>Number of People</h4>
          <input
            type='number'
            className={styles.inputNumber}
            name='numPeople'
            value={formData.numPeople}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className={styles.result}>
        <div className={styles.resultWrapper}>
          <h4 className={styles.resultLabel}>
            <span>Tip Amount</span>
            <br />/ person
          </h4>
          <h2 className={styles.resultVal}>
            ${calculateTipPerPerson().toFixed(2)}
          </h2>
        </div>
        <div className={styles.resultWrapper}>
          <h4 className={styles.resultLabel}>
            <span>Total</span>
            <br />/ person
          </h4>
          <h2 className={styles.resultVal}>
            ${calculateTotalPerPerson().toFixed(2)}
          </h2>
        </div>
        <button onClick={reset} className={styles.btnReset}>
          RESET
        </button>
      </div>
    </div>
  );
}
