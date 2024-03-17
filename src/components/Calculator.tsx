import { useEffect, useState } from 'react';
import styles from './Calculator.module.css';

type FormData = {
  bill: number;
  tip: number;
  numPeople: number;
};

type InputErrors = {
  bill: string;
  numPeople: string;
};

export default function Calculator(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    bill: 0,
    tip: 0,
    numPeople: 0,
  });
  const [custom, setCustom] = useState<number>();
  const [inputErrors, setInputErrors] = useState<InputErrors>({
    bill: '',
    numPeople: '',
  });

  function handleInputChange(e: React.ChangeEvent): void {
    const { name, value } = e.target as HTMLInputElement;

    setFormData((formData) => ({ ...formData, [name]: Number(value) }));
  }

  useEffect(() => {
    if (custom) setFormData((formData) => ({ ...formData, tip: custom / 100 }));
  }, [custom]);

  useEffect(() => {
    setInputErrors((errs) => ({
      ...errs,
      bill: formData.bill === 0 ? "Can't be zero" : '',
    }));
  }, [formData.bill]);

  useEffect(() => {
    setInputErrors((errs) => ({
      ...errs,
      numPeople: formData.numPeople === 0 ? "Can't be zero" : '',
    }));
  }, [formData.numPeople]);

  function setTip(tip: number): void {
    setFormData((formData) => ({ ...formData, tip }));
  }

  function calculateTipPerPerson(): number {
    const tipTotal = formData.bill * formData.tip;

    return formData.numPeople ? tipTotal / formData.numPeople : 0;
  }

  function calculateTotalPerPerson(): number {
    return formData.numPeople ? formData.bill / formData.numPeople : 0;
  }

  function reset(): void {
    setFormData((formData) => ({ ...formData, bill: 0, tip: 0, numPeople: 0 }));
  }

  return (
    <div className={styles.calculator}>
      <div className={styles.calculatorInput}>
        <div className={styles.inputWrapper + ' ' + styles.inputWrapperBill}>
          <h4 className={styles.inputTitle}>Bill</h4>
          <input
            type='number'
            className={
              styles.input + ' ' + (inputErrors.bill ? styles.invalid : '')
            }
            name='bill'
            value={formData.bill}
            onChange={handleInputChange}
            min={0}
          />
          <p className={styles.inputError}>{inputErrors.bill}</p>
        </div>
        <div className={styles.tipWrapper}>
          <h3 className={styles.inputTitle}>Select Tip %</h3>
          <div className={styles.tipGrid}>
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
              className={styles.inputCustom}
              type='number'
              placeholder='Custom'
              value={custom}
              min={0}
              onChange={(e) =>
                setCustom(Number((e.target as HTMLInputElement).value))
              }
            />
          </div>
        </div>
        <div
          className={styles.inputWrapper + ' ' + styles.inputWrapperNumPeople}
        >
          <h4 className={styles.inputTitle}>Number of People</h4>
          <input
            type='number'
            className={
              styles.input + ' ' + (inputErrors.numPeople ? styles.invalid : '')
            }
            name='numPeople'
            value={formData.numPeople}
            onChange={handleInputChange}
            min={0}
          />

          <p className={styles.inputError}>{inputErrors.numPeople}</p>
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
