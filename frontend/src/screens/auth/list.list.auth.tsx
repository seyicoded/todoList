import { faHourglassHalf, faPenNib, faPenToSquare, faPlus, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { faGear, faHouse, faListCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import "./auth.css"
import CreateListModel from '../../components/modals/createList.component';
import EditListModel from '../../components/modals/editList.component';

export default function List() {
    const [visible, setVisible] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
    const [myList, setMyList] = useState([
        {
            title: "I have to Cook",
            desc: "this is to remind me to cook",
            dueDate: null,
            isDone: false,
        }
    ]);

    const Card = ({item}: any)=>{
        return (
            <div className='w3-card w3-round w3-padding' style={{ marginTop: 20, position: 'relative' }}>
                <div style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'left' }}>{item?.title}</div>
                <div style={{ fontSize: 11, textAlign: 'left' }}>{item?.desc}</div>

                <div style={{ position: 'absolute', top: 4, right: 6 }}>
                    {/* <FontAwesomeIcon size={'lg'} icon={icon} /> */}
                    {
                        (item?.isDone) ? 
                        <FontAwesomeIcon icon={faSquareCheck} />
                        :
                        (<>
                            <FontAwesomeIcon icon={faPenToSquare} style={{ marginRight: 12, cursor: 'pointer' }} />
                            <FontAwesomeIcon icon={faHourglassHalf} />
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

            <CreateListModel visible={visible} setVisible={setVisible} callAction={null} />
            <EditListModel visible={visibleEdit} setVisible={setVisibleEdit} callAction={null} />
        </div>
    )
}
