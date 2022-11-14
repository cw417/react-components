import React, { useRef } from 'react';
import './Input.css';

type Props = {
  numberOfInputs: 1 | 2;
  submitFunction: Function;
  labelText?: string;
  buttonText: string | JSX.Element;
  placeholder1: string;
  placeholder2?: string;
  stylingClasses?: string;
}

export default function BudgetInput({ numberOfInputs, submitFunction, labelText, buttonText, placeholder1, placeholder2, stylingClasses } : Props) {
  
  const input1Ref = useRef<HTMLInputElement | null>(null);
  const input2Ref = useRef<HTMLInputElement | null>(null);


  function handleSubmit() {
    /**
     * Calls the update function and passes in the infoRef as a string.
     * Clears the inputRef when finished.
     */
    const input1: string | undefined = (input1Ref.current?.value !== null) ? input1Ref.current?.value : '' ;
    if (input1 === '') return;
    if (numberOfInputs === 1) {
      submitFunction(input1);
    }
    else {
      const input2: string | undefined = (input2Ref.current?.value !== null) ? input2Ref.current?.value : '' ;
      if (input2 === '') return;
      submitFunction(input1, input2);
    }
    input1Ref.current!.value = null!;
    input2Ref.current!.value = null!;
    input1Ref.current!.focus();
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLElement>) {
    /**
     * Watches for 'Enter' keypress.
     * @param event  Keypress event watching for 'Enter' key.
     */
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }

  return (
    <div className={`input-container my-2 ${stylingClasses}`}>
      <label>{labelText}</label>
      <input 
        className='input'
        ref={input1Ref}
        type='text'
        placeholder={placeholder1}
        onKeyUp={handleKeyPress}
      />
      <input
        className='input ml-1'
        ref={input2Ref}
        type='text'
        placeholder={placeholder2}
        onKeyUp={handleKeyPress}
        style={{display: numberOfInputs === 1 ? 'none' : 'inline' }}
      />
      <button
        className='button'
        onClick={handleSubmit}
      >{buttonText}</button>
    </div>
  )
}
