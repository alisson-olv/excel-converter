import React, { useState } from 'react';
import { DarkThemeToggle, Flowbite } from 'flowbite-react';

function App() {
  const [inputList, setInputList] = useState('');
  const [outputList, setOutputList] = useState('');
  const [optionChosed, setOptionChosed] = useState('apostrofo');
  const [characterLength, setCharacterLength] = useState(0);

  const handleOptionChosed = (e) => {
    setOptionChosed(e.target.value)
    setOutputList('');
    setInputList('');
    setCharacterLength(0)
  }

  const handleInputChange = (event) => {
    setInputList(event.target.value);
  };

  const handleCharacterLength = (e) => {
    setCharacterLength(e.target.value)
  }

  console.log(characterLength);

  const convertListCharacter = () => {
    const items = inputList.split('\n');
    const convertedItems = items.map(item => {
      const trimmedItem = item.trim().replace("'", "");
      if (trimmedItem.length < characterLength) {
        const paddedItem = '0'.repeat(characterLength - trimmedItem.length) + trimmedItem;
        return paddedItem;
      }
      return trimmedItem;
    });
    setOutputList(convertedItems.join('\n'));
  };

  const convertListApostrophe = () => {
    const items = inputList.split('\n');
    const convertedItems = items.map(item => {
      const trimmedItem = item.trim().replace("'", "");
      return trimmedItem;
    });
    setOutputList(convertedItems.join('\n'));
  };

  const clearList = () => {
    setOutputList('');
    setInputList('');
  }

  return (
    <main className='dark:bg-slate-800 min-h-screen'>
      <div className="container mx-auto pt-20 grid gap-10">
        <div className='flex justify-between items-center'>
          <div className='flex gap-3 items-center'>
            <img src="/absolut.png" width={200} />
            <h1 className='block text-4xl font-bold text-sky-700 dark:text-white'>Conversão de Nº de NF</h1>
          </div>
          <Flowbite>
            <div className='flex gap-3 items-center'>
              <p className='text-sm font-bold text-gray-900 dark:text-white'>Tema</p>
              <DarkThemeToggle className='w-12 flex items-center justify-center border-4 border-pink-400 text-pink-400' />
            </div>
          </Flowbite>
        </div>
        <hr />

        <div>
          <h2 className='block mb-4 text-3xl font-medium text-gray-900 dark:text-white'>
            Opção escolhida
          </h2>
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={handleOptionChosed}
              type="button"
              value={'apostrofo'}
              className={`${optionChosed === 'apostrofo' ? 'bg-pink-400 text-white font-bold dark:bg-pink-400' : ''} px-4 py-2 text-xl font-medium text-gray-900 border border-gray-200 rounded-l-lg hover:bg-pink-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-gray-900 dark:hover:bg-pink-200 dark:focus:ring-blue-500 dark:focus:text-white`}
            >
              Retirar '
            </button>
            <button
              onClick={handleOptionChosed}
              type="button"
              value={'caracteres'}
              className={`${optionChosed === 'caracteres' ? 'bg-pink-400 text-white font-bold dark:bg-pink-400' : ''} px-4 py-2 text-xl font-medium text-gray-900 border border-gray-200 rounded-r-md hover:bg-pink-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-gray-900 dark:hover:bg-pink-200 dark:focus:ring-blue-500 dark:focus:text-white`}
            >
              Caracteres
            </button>
          </div>
        </div>

        {optionChosed === 'caracteres' &&
          <div>
            <label htmlFor="quantity-caracteres" className="block mb-2 text-3xl font-medium text-gray-900 dark:text-white">
              Digite a quantidade de caracteres
            </label>
            <input
              value={characterLength}
              type="number"
              id="quantity-caracteres"
              onChange={handleCharacterLength}
              className="block w-20 p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
          </div>
        }

        <div className='flex gap-20'>
          <div>
            <label
              htmlFor="itensToConvert"
              className="block mb-2 text-3xl font-medium text-gray-900 dark:text-white"
            >
              Lista para conversão
            </label>

            <textarea
              id="itensToConvert"
              rows="10"
              cols="50"
              value={inputList}
              onChange={handleInputChange}
              className="block p-4 text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cole a lista de itens do Excel aqui">
            </textarea>

            {optionChosed === 'apostrofo' ?
              <button
                onClick={convertListApostrophe}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 mt-4 font-medium rounded-lg text-xl px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Converter
              </button>
              :
              <button
                onClick={convertListCharacter}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 mt-4 font-medium rounded-lg text-xl px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Converter
              </button>
            }
          </div>

          <div>
            <label
              htmlFor="itensToConvert"
              className="block mb-2 text-3xl font-medium text-gray-900 dark:text-white"
            >
              Lista convertida {characterLength > 0 && `para ${characterLength} caracteres!`}
            </label>

            <textarea
              id="itensToConvert"
              rows="10"
              cols="50"
              onChange={handleInputChange}
              value={outputList}
              readOnly
              className="block p-4 text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cole a lista de itens do Excel aqui">
            </textarea>
            <button
              onClick={clearList}
              type="button"
              className="focus:outline-none text-white mt-4 bg-red-700 hover:bg-red-800 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Limpar
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;