"use client";
import React, { useState , useEffect } from 'react';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClick = async () => {
    if (!inputValue) return; // Don't call API if input is empty
    fetch('/api/name',{
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({"name": inputValue}), // body data type must match "Content-Type" header
      })
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            const {content} = data.text.message
            console.log(content)
            setOutput(content)
          })
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Title</h1>
      <input type="text" placeholder="Enter text here" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleClick}>Click Me</button>
      {
        output &&
      <div>{output}</div>

      }
    </div>
  );
}