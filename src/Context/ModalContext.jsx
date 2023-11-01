import { createContext, useState } from 'react';

export const ModalsContext = createContext();

const ModalContext = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <ModalsContext.Provider value={{ modalIsOpen, setModalIsOpen }}>
      {children}
    </ModalsContext.Provider>
  )
}

export default ModalContext;