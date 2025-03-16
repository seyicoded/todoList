import { faGear, faHouse, faListCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Switch, Route, useHistory } from "react-router-dom";
import "./auth.css"
import Default from './default';
import Profile from './profile.auth';
import List from './list.list.auth';

export default function Home() {
    const [active, setActive] = useState(0);
    const history = useHistory();
    const tabBar = [
        {
            title: "Home",
            icon: faHouse,
        },
        {
            title: "List",
            icon: faListCheck,
        },
        {
            title: "Profile",
            icon: faUser,
        },
    ];
    return (
        <div id="app-container">
            {/* content */}
            <div id="app-content">
                <Switch>
                    {/* auth */}
                    <Route path="/home/default" component={Default} />
                    <Route path="/home/list" component={List} />
                    <Route path="/home/profile" component={Profile} />
        
                </Switch>
            </div>

            {/* footer: tabbar */}
            <div id="app-footer">
                {
                    tabBar.map(({title, icon}, index) => (
                        <div onClick={() => {
                                setActive(index);

                                switch (index) {
                                    case 0:
                                        history.push("/home/default");
                                        break;
                                    case 1:
                                        history.push("/home/list");
                                        break;
                                    case 2:
                                        history.push("/home/profile");
                                        break;
                                
                                    default:
                                        break;
                                }
                            }}>
                            <FontAwesomeIcon className={` ${active == index ? "active-tab" : ""} `} size={'lg'} icon={icon} />
                            <br />
                            <span className={` ${active == index ? "active-tab" : ""} `}>{title}</span>
                        </div>
                    ))
                }

            </div>
            {/* <FontAwesomeIcon icon={faHouse} /> */}

        </div>
    )
}
