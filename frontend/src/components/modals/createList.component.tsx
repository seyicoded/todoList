import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function CreateListModel({
    visible,
    setVisible,
    callAction
}: {
    visible: boolean;
    setVisible: any,
    callAction: any
}) {
    const show = visible;

  const handleClose = () => setVisible(false);
  const handleShow = () => setVisible(true);
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create A Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={e => {
                e.preventDefault();
                // @ts-ignore
                // processAction(null);
            }} className='w3-container'>
                <div>
                    <input placeholder='Enter Title' className='w3-input w3-white' required/>
                    <label className='w3-label w3-validate w3-small w3-left'>Title</label>
                </div>
                <br />

                <div>
                    <input placeholder='Enter Description' className='w3-input w3-white' required/>
                    <label className='w3-label w3-validate w3-small w3-left'>Description</label>
                </div>
                <br />

                <div>
                    <input type='datetime-local' placeholder='Enter Due Date' className='w3-input w3-white' required/>
                    <label className='w3-label w3-validate w3-small w3-left'>Due Date</label>
                </div>
                <br />

            </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Create Now
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
