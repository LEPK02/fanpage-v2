import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import "./HelpButton.css"
import { useSelector } from 'react-redux';

function HelpButton() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // themeSlice from Redux
  const themePrimary = useSelector((state) => state.theme.themePrimary);
  const themeSecondary = useSelector((state) => state.theme.themeSecondary);

  return (
    <>
      <Modal show={show} onHide={handleClose} className={`modal-${themePrimary}`} centered>
        <Modal.Header>
          <Modal.Title>Help</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Click or tap on a picture to see more!
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-center'>
          <Button variant={`outline-${themeSecondary}`} onClick={handleClose} className="w-100">OK</Button>
        </Modal.Footer>
      </Modal>
      {show ? null : <Button onClick={handleShow} id="help" className={`${themePrimary}`}>?</Button>}
    </>
  );
}

export default HelpButton;