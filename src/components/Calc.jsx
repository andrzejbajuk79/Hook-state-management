import React, {useState, useEffect} from 'react';
import {useLocalStorage} from '../hooks/useLocalStorage';

// const getStateFromLocalStorage = () => {
//   const storage = localStorage.getItem ('counterState');
//   console.log (JSON.parse (storage));
//   if (storage) return JSON.parse (storage).count;

//   return {count: 0};
// };
const storeStateToLocalStorage = (count) => {
 localStorage.setItem('counterState', JSON.stringify({count}));
};
const Calc = ({max, step}) => {
 const [count, setCount] = useLocalStorage(0, 'count');
 // const [count, setCount] = useState (getStateFromLocalStorage ());

 const increment = () => setCount(count + 1);
 const decrement = () => setCount(count - 1);
 const reset = () => setCount(0);
 useEffect(() => {
  setCount(count);
 }, [count]);
 return (
  <div>
   <h1>kalkulator</h1>
   <h1>{count}</h1>
   <button onClick={decrement}>Decrement</button>
   <button onClick={increment}>Increment</button>
   <button onClick={reset}>Reset</button>
  </div>
 );
};
export default Calc;
