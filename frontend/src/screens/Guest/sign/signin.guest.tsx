import React, { useState } from 'react'
import "../guest.css"
import viteLogo from '/vite.svg'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { setAppProfile, setAuthToken } from '../../../utility/storage'
import { toast } from 'react-toastify'
import axiosClient from '../../../utility/axios'

export default function SignIn() {
    const history = useHistory();
    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    const processAction = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.stopPropagation();
        history.push("/home/default");

        try {
            const {data} = await (axiosClient()).post("v1/login", input);

            setAuthToken(data?.payload?.token)
            setAppProfile(data?.payload);
            toast("Account logged-in Successfully", {
                position: "top-center"
            });

            history.push("/home/default");
        } catch (error) {
            console.log(error)
            // @ts-ignore
            toast(`error logging into account: ${error?.response?.data?.message}`, {
                position: "top-center",
                type: "error"
            });
        }
    }
  return (
    <div id="content" className='content-guest'>
        <h2 id='app-title'>Sign In</h2>

        <form onSubmit={e => {
            e.preventDefault();
            // @ts-ignore
            processAction(null);
        }} className='w3-container' style={{ height: 500 }}>
            <div>
                <input value={input?.email} onChange={e => setInput({...input, email: e.target.value})} placeholder='Enter email/username' className='w3-input w3-white' required/>
                <label className='w3-label w3-validate w3-small w3-left'>Email/Username</label>
            </div>
            <br />

            <div>
                <input value={input?.password} onChange={e => setInput({...input, password: e.target.value})} placeholder='Enter Password' className='w3-input w3-white' type='password' required/>
                <label className='w3-label w3-validate w3-small w3-left'>Password</label>
            </div>

            <br />

            <button type='button' onClick={(e)=> processAction(e)} className='w3-btn w3-blue w3-block'>Submit</button>
        </form>
        <div>
            <div>
                Don't have an account,  
                <Link to={"/signup"}><a> click to sign up</a></Link>
            </div>

            <Link to={"/"}>
                <button className='w3-button w3-white'> <FontAwesomeIcon icon={faChevronLeft} /> Go Back</button>
            </Link>
        </div>
    </div>
  )
}
