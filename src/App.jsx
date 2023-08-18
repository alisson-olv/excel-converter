import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputList, setInputList] = useState('');
  const [outputList, setOutputList] = useState('');

  const handleInputChange = (event) => {
    setInputList(event.target.value);
  };

  const convertList = () => {
    const items = inputList.split('\n');
    const convertedItems = items.map(item => {
      const trimmedItem = item.trim();
      if (trimmedItem.length < 9) {
        const paddedItem = '0'.repeat(9 - trimmedItem.length) + trimmedItem;
        return paddedItem;
      }
      return trimmedItem;
    });
    setOutputList(convertedItems.join('\n'));
  };

  const clearList = () => {
    setOutputList('');
    setInputList('');
  }

  return (
    <div className="App">
      <img style={{ marginBottom: 20 }} src="/bruce-arya.jpg" alt="" width={200} />
      <h1 style={{ margin: 0 }}>Conversão de Nº de NF</h1>
      <p>O programa abaixo pega os números de NF's e adiciona à ela "0" à esquerda até que tenha o total de 9 dígitos.</p>
      <br />
      <textarea
        rows="10"
        cols="50"
        placeholder="Cole a lista de itens do Excel aqui"
        value={inputList}
        onChange={handleInputChange}
      ></textarea>
      <br />
      <button onClick={convertList}>Converter</button>
      <h2>Lista Convertida</h2>
      <textarea
        rows="10"
        cols="50"
        placeholder="Lista convertida"
        value={outputList}
        readOnly
      ></textarea>
      <br />
      <button onClick={clearList}>Limpar</button>
    </div>
  );
}

export default App;