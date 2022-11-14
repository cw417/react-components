import React, { useRef } from 'react';
import './Input.css';

type Props = {
  numberOfInputs: 1 | 2;
  updateFunction: Function;
  labelText?: string;
  buttonText: string | JSX.Element;
  placeholder1: string;
  placeholder2?: string;
  styling?: string;
}

export default function BudgetInput({ numberOfInputs, updateFunction, labelText, buttonText, placeholder1, placeholder2, styling } : Props) {
  
  const input1Ref = useRef<HTMLInputElement | null>(null);
  const input2Ref = useRef<HTMLInputElement | null>(null);


  function handleUpdateInfo() {
    /**
     * Calls the update function and passes in the infoRef as a string.
     * Clears the inputRef when finished.
     */
    const input1: string | undefined = (input1Ref.current?.value !== null) ? input1Ref.current?.value : '' ;
    if (input1 === '') return;
    if (numberOfInputs === 1) {
      updateFunction(input1);
    }
    else {
      const input2: string | undefined = (input2Ref.current?.value !== null) ? input2Ref.current?.value : '' ;
      if (input2 === '') return;
      updateFunction(input1, input2);
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
      handleUpdateInfo();
    }
  }

  return (
    <div className={`input-container my-2 ${styling}`}>
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
        onClick={handleUpdateInfo}
      >{buttonText}</button>
    </div>
  )
}
