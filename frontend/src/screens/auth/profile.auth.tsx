import React from 'react'
import { useHistory } from 'react-router';
import { getAppProfile, setAppProfile, setAuthToken } from '../../utility/storage';

export default function Profile() {
    const history = useHistory();
    const profile = getAppProfile()
    console.log(profile, "profile")
    return (
        <div>
            <h3>Profile</h3>
            
            <table className="w3-table">
                {/* <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead> */}
                <tbody>
                    <tr>
                        <td>Email</td>
                        <td>{profile?.user?.email}</td>
                    </tr>
                    <tr>
                        <td>First Name</td>
                        <td>{profile?.user?.first_name}</td>
                    </tr>
                    <tr>
                        <td>Last Name</td>
                        <td>{profile?.user?.last_name}</td>
                    </tr>
                </tbody>
            </table>

            <button className='w3-button w3-white' onClick={()=> {
                setAuthToken({});
                setAppProfile({});
                history.push("/");
            }}>logout</button>
        </div>
    )
}
