import { useEffect, useContext } from 'react';
import { withCookies } from 'react-cookie';
import Modal from 'react-modal';
import { ModalsContext } from '../contexts/ModalContext';

Modal.setAppElement('#root');

function WelcomeModal({ cookies }) {
  const { modalIsOpen, setModalIsOpen } = useContext(ModalsContext);

  useEffect(() => {
    const hasVisitedBefore = cookies.get('visitedBefore');
    if (!hasVisitedBefore) {
      setModalIsOpen(true);
    }
  }, []);

  const closeModal = () => {
    setModalIsOpen(false);
    cookies.set('visitedBefore', true, { path: '/' });
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Modal"
      className="focus:outline-none bg-white shadow-lg border p-10 rounded-md w-full max-w-[500px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100"
    >
      <div className='relative'>
        <h2 className='block mb-5 text-2xl text-gray-900'>
          Últimas atualizações
        </h2>
        <p className='mb-2 text-md text-gray-900 flex items-center'>
          <img src="garrafa1.png" /> - O menu possui explicação do que cada item faz, basta descansar o mouse em cima;
        </p>
        <p className='mb-2 text-md text-gray-900 flex items-center'>
          <img src="garrafa2.png" /> - Ajuste para CNPJ;
        </p>
        <p className='mb-2 text-md text-gray-900 flex items-center'>
          <img src="garrafa3.png" /> - O tema é salvo em sessão conforme a sua última escolha;
        </p>
        <p className='mb-5 text-md text-gray-900 flex items-center'>
          <img src="garrafa4.png" /> - Novo layout e cores;
        </p>
        <p className='mb-2 text-md text-gray-900 flex items-center'>
          <img src="garrafa1.png" /> - Consulta de AN8 de fornecedor.
        </p>
        <p className='block mb-2 text-md text-gray-900'>
          Para mais pedidos consultar a maravilhosa Amanda.
        </p>
        <button
          onClick={closeModal}
          type="button"
          className="text-white bg-[#0060a9] hover:bg-[#0045a0] mt-4 font-medium rounded-lg text-md px-5 py-2.5 dark:bg-[#0060a9] dark:hover:bg-[#0045a0] focus:outline-none dark:focus:ring-blue-800"
        >
          Entendido
        </button>
      </div>
    </Modal>
  );
}

export default withCookies(WelcomeModal);
