import { createPortal } from 'react-dom';

const Portal = ({ children, domNode = document.body }) => {
  return createPortal(children, domNode);
};

export default Portal;
