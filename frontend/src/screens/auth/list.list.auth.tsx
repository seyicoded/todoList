import { faHourglassHalf, faPenNib, faPenToSquare, faPlus, faSquareCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { faGear, faHouse, faListCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import "./auth.css"
import CreateListModel from '../../components/modals/createList.component';
import EditListModel from '../../components/modals/editList.component';
import axiosClient from '../../utility/axios';
import { toast } from 'react-toastify';

export default function List() {
    const [visible, setVisible] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [editData, setEditData] = useState({});
    const [myList, setMyList] = useState([]);

    const fetchItems = async ()=>{
        try {
            const {data: {payload: {res}}} = await (axiosClient()).get("/v1/list");

            setMyList(res);
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        fetchItems()
    }, []);

    const markAsDone = async(id: number)=>{
        try {
            const {data} = await (axiosClient()).post("v1/list/edit/"+id, {
                isDone: true
            });
    
            toast("Marked Successfully", {
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
    
        fetchItems();
    }

    const deleteNow = async(id: number)=>{
        try {
            const {data} = await (axiosClient()).delete("v1/list/action/"+id);
    
            toast("Deleted Successfully", {
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
    
        fetchItems();
    }

    const Card = ({item}: any)=>{
        return (
            <div className='w3-card w3-round w3-padding' style={{ marginTop: 20, position: 'relative' }}>
                <div style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'left', marginTop: 10 }}>{item?.title}</div>
                <div style={{ fontSize: 11, textAlign: 'left' }}>{item?.desc}</div>

                <div style={{ position: 'absolute', top: 4, right: 6 }}>
                    {/* <FontAwesomeIcon size={'lg'} icon={icon} /> */}
                    {
                        (item?.isDone) ? 
                        <>
                            <FontAwesomeIcon icon={faSquareCheck} />
                            <FontAwesomeIcon onClick={()=> deleteNow(item?.id)} icon={faTrash} style={{ marginLeft: 12, cursor: 'pointer' }} />
                        </>
                        :
                        (<>
                            <FontAwesomeIcon onClick={()=>{
                                setEditData(item);
                                setVisibleEdit(true);
                            }} icon={faPenToSquare} style={{ marginRight: 12, cursor: 'pointer' }} />
                            <FontAwesomeIcon onClick={()=> markAsDone(item?.id)} color='yellow' icon={faHourglassHalf} style={{ marginRight: 12, cursor: 'pointer' }} />
                            <FontAwesomeIcon onClick={()=> deleteNow(item?.id)} icon={faTrash} style={{ cursor: 'pointer' }} />
                        </>)
                    }
                                      
                </div>
            </div>
        );
    }
    return (
        <div style={{ position: 'relative' }}>
            <h5>My Lists</h5>
            <FontAwesomeIcon onClick={()=> setVisible(true)} className='plus-icon' size={'lg'} icon={faPlus} />

            <div className='app-content'>
                {
                    ((myList.length == 0) && (
                        <div>
                            No List currently available
                        </div>
                    ))
                }

                {
                    myList.map((item, index)=> <Card item={item} key={index} />)
                }
            </div>

            <CreateListModel visible={visible} setVisible={setVisible} callAction={fetchItems} />
            <EditListModel editData={editData} visible={visibleEdit} setVisible={setVisibleEdit} callAction={fetchItems} />
        </div>
    )
}
