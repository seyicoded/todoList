import React from 'react'
import { useHistory } from 'react-router';

export default function Profile() {
    const history = useHistory();
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
                    <td>Smith</td>
                </tr>
                <tr>
                    <td>First Name</td>
                    <td>Smith</td>
                </tr>
                <tr>
                    <td>Last Name</td>
                    <td>Smith</td>
                </tr>
            </tbody>
        </table>

        <button className='w3-button w3-white' onClick={()=> {
            history.push("/")
        }}>logout</button>
    </div>
  )
}
