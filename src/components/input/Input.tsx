// import React, { useState, useEffect } from 'react';
// import {saveToLocalStorage, loadFromLocalStorage} from '../../utility/localstorage.ts'
//
// type InputProps = {
//     changeValue: (ev: ChangeEvent<HTMLInputElement>) => void
//     handlePressKey: (ev: KeyboardEvent<HTMLInputElement>) => void
//     placeholderValue: string
//     idInput: string
//     typeValue: string
//     stylesValue: string
// }
//
// export const Input:React.FC<InputProps> = ({
//     changeValue,
//     handlePressKey,
//     placeholderValue,
//     idInput,
//     typeValue,
//     stylesValue
// }) => {
//     const [inputValue, setInputValue] = useState(() => loadFromLocalStorage('inputValue') || '')
//
//     useEffect(() => {
//         saveToLocalStorage('myInput', inputValue);
//     }, [inputValue]);
//
//     const handleChange = (event) => {
//         setInputValue(event.target.value);
//     };
//
//     return (
//         <input
//             autoFocus
//             onChange={changeValue}
//             onKeyDown={handlePressKey}
//             value={inputValue}
//             placeholder={placeholderValue}
//             id={idInput}
//             className={stylesValue}
//             type={typeValue} />
//     )
// }
