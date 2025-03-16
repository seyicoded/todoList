import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axiosClient from '../../utility/axios';
import { toast } from 'react-toastify';

export default function EditListModel({
    visible,
    setVisible,
    callAction,
    editData
}: {
    visible: boolean;
    setVisible: any,
    callAction: any,
    editData: any
}) {
    const show = visible;
    const [input, setInput] = useState({
        title: "",
        desc: "",
        dueDate: "",
    });

    useEffect(()=>{
        setInput({
            title: editData?.title,
            desc: editData?.desc,
            dueDate: editData?.dueDate,
        });
    }, [editData])

  const handleClose = () => setVisible(false);
  const handleShow = () => setVisible(true);

  const processCreate = async ()=>{

    try {
        const {data} = await (axiosClient()).post("v1/list/edit/"+editData?.id, input);

        toast("Task Updated Successfully", {
            position: "top-center"
        });

    } catch (error) {
        console.log(error)
        // @ts-ignore
        toast(`error logging into account: ${error?.response?.data?.message}`, {
            position: "top-center",
            type: "error"
        });
    }

    callAction();
    handleClose();
  }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit A Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={e => {
                e.preventDefault();
                // @ts-ignore
                // processAction(null);
            }} className='w3-container'>
                <div>
                    <input value={input?.title} onChange={e => setInput({...input, title: e.target.value})} placeholder='Enter Title' className='w3-input w3-white' required/>
                    <label className='w3-label w3-validate w3-small w3-left'>Title</label>
                </div>
                <br />

                <div>
                    <input value={input?.desc} onChange={e => setInput({...input, desc: e.target.value})} placeholder='Enter Description' className='w3-input w3-white' required/>
                    <label className='w3-label w3-validate w3-small w3-left'>Description</label>
                </div>
                <br />

                <div>
                    <input value={input?.dueDate} onChange={e => setInput({...input, dueDate: e.target.value})} type='datetime-local' placeholder='Enter Due Date' className='w3-input w3-white' required/>
                    <label className='w3-label w3-validate w3-small w3-left'>Due Date</label>
                </div>
                <br />

            </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={processCreate}>
                    Edit Now
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
