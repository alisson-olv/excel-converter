import { useContext, useEffect, useState } from 'react';
import { DarkThemeToggle, Flowbite, Tooltip } from 'flowbite-react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { ModalsContext } from './context/ModalContext';
import WelcomeModal from './modal';
import { BsArrowReturnRight } from "react-icons/bs";

function App() {
  const [inputList, setInputList] = useState('');
  const [outputList, setOutputList] = useState('');
  const [optionChosed, setOptionChosed] = useState('apostrofo');
  const [characterLength, setCharacterLength] = useState(0);
  const [hasCopied, setHasCopied] = useState(false);

  const { setModalIsOpen } = useContext(ModalsContext);

  const openModal = () => {
    setModalIsOpen(true)
  }

  const TIMEOUT_MS = 2000;

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkTheme") === "true";

    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  const handleDarkThemeToggle = () => {
    document.body.classList.toggle("dark");

    const isDarkMode = document.body.classList.contains("dark");
    localStorage.setItem("darkTheme", isDarkMode);
  };

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
      <div className="App">
        <WelcomeModal />
      </div>
      <div className='pb-10'>
        <img src="banner-absolut.jpg" className='object-contain' />
      </div>
      <div className="container max-w-[1300px] mx-auto pb-20 px-10 grid gap-10">
        <div className='grid gap-10'>
          <div className='flex gap-10 justify-between items-center'>
            <h1 className='block text-4xl text-gray-900 font-bold dark:text-white'>Conversão de Nº de NF</h1>
            <Flowbite>
              <div className='flex gap-3 items-center'>
                <p className='text-sm font-bold text-gray-900 dark:text-white'>Tema</p>
                <DarkThemeToggle onClick={handleDarkThemeToggle} className='w-12 flex items-center justify-center border-4 border-[#1e4b00] text-[#1e4b00] dark:text-white dark:border-white' />
              </div>
            </Flowbite>
          </div>
          <div className='max-w-[250px]'>
            <p onClick={openModal} className='bg-[#c4cbd4] flex gap-3 p-4 rounded-md items-center justify-center text-sm font-medium text-gray-900 cursor-pointer hover:bg-slate-300'>
              <BsArrowReturnRight />  Reveja as últimas atualizações
            </p>
          </div>
        </div>
        <hr />
        <div>
          <h2 className='block mb-4 text-3xl font-medium text-gray-900 dark:text-white'>
            Tipos de Ajustes
          </h2>
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <Tooltip className='dark:bg-white dark:text-black' content="Retira o ' (apóstrofo) do texto/número que o excel insere para forçar a formatação como texto.">
              <button
                onClick={handleOptionChosed}
                type="button"
                value={'apostrofo'}
                className={`${optionChosed === 'apostrofo' ? 'bg-[#1e4b00] text-white font-bold dark:bg-[#1e4b00]' : ''} px-4 py-2 text-xl font-medium hover:text-white border border-gray-200 rounded-l-lg hover:bg-[#2d7100] dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-[#2d7100] dark:focus:ring-blue-500 dark:focus:text-white`}
              >
                Retirar &apos;
              </button>
            </Tooltip>
            <Tooltip className='dark:bg-white dark:text-black' content="Adiciona zeros à esquerda para que todas as linhas tenham o mesmo tamanho, definido pela quantidade de caracteres escolhida.">
              <button
                onClick={handleOptionChosed}
                type="button"
                value={'caracteres'}
                className={`${optionChosed === 'caracteres' ? 'bg-[#1e4b00] text-white font-bold dark:bg-[#1e4b00]' : ''} px-4 py-2 text-xl font-medium hover:text-white border border-gray-200 hover:bg-[#2d7100] dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-[#2d7100] dark:focus:ring-blue-500 dark:focus:text-white`}
              >
                Caracteres
              </button>
            </Tooltip>
            <Tooltip className='dark:bg-white dark:text-black' content="Remove ponto, traço e barra dos CPNJ's.">
              <button
                onClick={handleOptionChosed}
                type="button"
                value={'cnpj'}
                className={`${optionChosed === 'cnpj' ? 'bg-[#1e4b00] text-white font-bold dark:bg-[#1e4b00]' : ''} px-4 py-2 text-xl font-medium hover:text-white border border-gray-200 hover:bg-[#2d7100] dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-[#2d7100] dark:focus:ring-blue-500 dark:focus:text-white`}
              >
                CNPJ
              </button>
            </Tooltip>
            <Tooltip className='dark:bg-white dark:text-black' content="Remove o espaço entre números/textos.">
              <button
                onClick={handleOptionChosed}
                type="button"
                value={'spaces'}
                className={`${optionChosed === 'spaces' ? 'bg-[#1e4b00] text-white font-bold dark:bg-[#1e4b00]' : ''} px-4 py-2 text-xl font-medium hover:text-white border border-gray-200 hover:bg-[#2d7100] dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-[#2d7100] dark:focus:ring-blue-500 dark:focus:text-white`}
              >
                Retirar espaço
              </button>
            </Tooltip>
            <Tooltip className='dark:bg-white dark:text-black' content="Retorna apenas os dois primeiros dígitos do número inserido que é usado como filial da empresa.">
              <button
                onClick={handleOptionChosed}
                type="button"
                value={'company-branch'}
                className={`${optionChosed === 'company-branch' ? 'bg-[#1e4b00] text-white font-bold dark:bg-[#1e4b00]' : ''} px-4 py-2 text-xl font-medium hover:text-white border border-gray-200 hover:bg-[#2d7100] dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-[#2d7100] dark:focus:ring-blue-500 dark:focus:text-white`}
              >
                Filial
              </button>
            </Tooltip>
            <Tooltip className='dark:bg-white dark:text-black' content="Retorna o tipo do pedido.">
              <button
                onClick={handleOptionChosed}
                type="button"
                value={'order-type'}
                className={`${optionChosed === 'order-type' ? 'bg-[#1e4b00] text-white font-bold dark:bg-[#1e4b00]' : ''} px-4 py-2 text-xl font-medium hover:text-white border border-gray-200 hover:bg-[#2d7100] dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-[#2d7100] dark:focus:ring-blue-500 dark:focus:text-white rounded-r-md`}
              >
                Tipo de pedido
              </button>
            </Tooltip>
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

        <div className='flex flex-wrap gap-20'>
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
                className="text-white bg-[#0060a9] hover:bg-[#0045a0] mt-4 font-medium rounded-lg text-xl px-5 py-2.5 dark:bg-[#0060a9] dark:hover:bg-[#0045a0] focus:outline-none dark:focus:ring-blue-800"
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
              className="focus:outline-none text-white flex items-center justify-center w-24 h-12 mt-4 bg-[#0060a9] hover:bg-[#0045a0] font-medium rounded-lg text-xl px-5 py-2.5 dark:bg-[#0060a9] dark:hover:bg-[#0045a0] dark:focus:ring-red-900"
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