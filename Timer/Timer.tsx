import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'

type Props = {
  stylingClasses: string;
}

export default function Timer({ stylingClasses }: Props) {
  
  const [time, setTime]: [number, Dispatch<SetStateAction<number>>] = useState(0);
  
  // timer
  useEffect(() => { 
    const timer = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
    return () => clearInterval(timer);
   }, []);

  return (
    <div className={`${stylingClasses}`}>Time: {time}</div>
  )
}