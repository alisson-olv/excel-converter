import { useEffect, useState } from 'react';
import { DarkThemeToggle, Flowbite } from 'flowbite-react';
import { AiFillCheckCircle } from 'react-icons/ai';

function App() {
  const [inputList, setInputList] = useState('');
  const [outputList, setOutputList] = useState('');
  const [optionChosed, setOptionChosed] = useState('apostrofo');
  const [characterLength, setCharacterLength] = useState(0);
  const [hasCopied, setHasCopied] = useState(false);

  const TIMEOUT_MS = 2000;

  const handleOptionChosed = (e) => {
    setOptionChosed(e.target.value);
    setOutputList('');
    setInputList('');
    setCharacterLength(0);
  };

  const handleInputChange = (event) => {
    setInputList(event.target.value);
  };

  const handleCharacterLength = (e) => {
    setCharacterLength(e.target.value);
  };

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, TIMEOUT_MS);

  }, [hasCopied])

  const copyToClipboard = () => {
    setHasCopied(true)

    if (!navigator.clipboard) {
      return;
    }

    return navigator.clipboard.writeText(outputList);
  }

  const clearList = () => {
    setOutputList('');
    setInputList('');
    setHasCopied(false)
  };

  const handleConverter = () => {

    if (optionChosed === 'apostrofo') {
      const items = inputList.split('\n');

      const convertedItems = items.map(item => {
        const trimmedItem = item.trim().replaceAll("'", "");
        return trimmedItem;
      });

      setOutputList(convertedItems.join('\n'));

    } else if (optionChosed === 'caracteres') {
      const items = inputList.split('\n');

      const convertedItems = items.map(item => {
        const trimmedItem = item.trim().replaceAll("'", "");
        if (trimmedItem.length < characterLength) {
          const paddedItem = '0'.repeat(characterLength - trimmedItem.length) + trimmedItem;
          return paddedItem;
        }

        return trimmedItem;
      });

      setOutputList(convertedItems.join('\n'));

    } else if (optionChosed === 'cnpj') {
      const items = inputList.split('\n');

      const convertedItems = items.map(item => {
        const trimmedItem = item.trim().replaceAll(".", "").replaceAll(" ", "").replaceAll("-", "").replaceAll("/", "");
        return trimmedItem;
      });

      setOutputList(convertedItems.join('\n'));

    } else if (optionChosed === 'spaces') {
      const items = inputList.split('\n');

      const convertedItems = items.map(item => {
        const trimmedItem = item.trim().replaceAll(" ", "").replaceAll("'", "");
        return trimmedItem;
      });

      setOutputList(convertedItems.join('\n'));

    } else if (optionChosed === 'company-branch') {
      const items = inputList.split('\n');
      const convertedItems = items.map(item => {
        const twoDigits = item.substring(0, 2);
        return twoDigits;
      });

      setOutputList(convertedItems.join('\n'));

    } else if (optionChosed === 'order-type') {
      const items = inputList.toUpperCase().split('\n');
      const convertedItems = items.map(item => {
        if (item.includes('OUTROS')) {
          const anotherOrder = item;
          return anotherOrder;

        } else {
          const twoDigitsOrder = item.substring(0, 2);
          return twoDigitsOrder;
        }
      });

      setOutputList(convertedItems.join('\n'));
    }
  };

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
              Retirar &apos;
            </button>
            <button
              onClick={handleOptionChosed}
              type="button"
              value={'caracteres'}
              className={`${optionChosed === 'caracteres' ? 'bg-pink-400 text-white font-bold dark:bg-pink-400' : ''} px-4 py-2 text-xl font-medium text-gray-900 border border-gray-200 hover:bg-pink-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-gray-900 dark:hover:bg-pink-200 dark:focus:ring-blue-500 dark:focus:text-white`}
            >
              Caracteres
            </button>
            <button
              onClick={handleOptionChosed}
              type="button"
              value={'cnpj'}
              className={`${optionChosed === 'cnpj' ? 'bg-pink-400 text-white font-bold dark:bg-pink-400' : ''} px-4 py-2 text-xl font-medium text-gray-900 border border-gray-200 hover:bg-pink-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-gray-900 dark:hover:bg-pink-200 dark:focus:ring-blue-500 dark:focus:text-white`}
            >
              CNPJ
            </button>
            <button
              onClick={handleOptionChosed}
              type="button"
              value={'spaces'}
              className={`${optionChosed === 'spaces' ? 'bg-pink-400 text-white font-bold dark:bg-pink-400' : ''} px-4 py-2 text-xl font-medium text-gray-900 border border-gray-200 hover:bg-pink-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-gray-900 dark:hover:bg-pink-200 dark:focus:ring-blue-500 dark:focus:text-white`}
            >
              Retirar espaço
            </button>
            <button
              onClick={handleOptionChosed}
              type="button"
              value={'company-branch'}
              className={`${optionChosed === 'company-branch' ? 'bg-pink-400 text-white font-bold dark:bg-pink-400' : ''} px-4 py-2 text-xl font-medium text-gray-900 border border-gray-200 hover:bg-pink-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-gray-900 dark:hover:bg-pink-200 dark:focus:ring-blue-500 dark:focus:text-white`}
            >
              Filial
            </button>
            <button
              onClick={handleOptionChosed}
              type="button"
              value={'order-type'}
              className={`${optionChosed === 'order-type' ? 'bg-pink-400 text-white font-bold dark:bg-pink-400' : ''} px-4 py-2 text-xl font-medium text-gray-900 border border-gray-200 rounded-r-md hover:bg-pink-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-gray-900 dark:hover:bg-pink-200 dark:focus:ring-blue-500 dark:focus:text-white`}
            >
              Tipo de pedido
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

            <div className='flex gap-3'>
              <button
                onClick={handleConverter}
                type="button"
                className="text-white bg-green-700 hover:bg-green-800 mt-4 font-medium rounded-lg text-xl px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Converter
              </button>

              <button
                onClick={clearList}
                type="button"
                className="focus:outline-none text-white mt-4 bg-red-700 hover:bg-red-800 font-medium rounded-lg text-xl px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Limpar
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="itensConverted"
              className="block mb-2 text-3xl font-medium text-gray-900 dark:text-white"
            >
              Lista convertida {characterLength > 0 && `para ${characterLength} caracteres!`}
            </label>

            <textarea
              id="itensConverted"
              rows="10"
              cols="50"
              onChange={handleInputChange}
              value={outputList}
              readOnly
              className="block p-4 text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </textarea>
            <button
              onClick={copyToClipboard}
              type="button"
              className="focus:outline-none text-white flex items-center justify-center w-24 h-12 mt-4 bg-green-700 hover:bg-green-800 font-medium rounded-lg text-xl px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-900"
            >
              {!hasCopied ? 'Copiar' : <AiFillCheckCircle />}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;