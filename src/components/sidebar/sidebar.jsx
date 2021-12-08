import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import user from '../../redux/user';
import { links } from './links';
import './sidebar.css';
export default class SideBar extends Component {
    constructor(props){
        super();

    }
    componentDidMount(){
        
        console.log(user);
    }
    render(){
        const user = JSON.parse(localStorage.getItem('user_meta'))
        return (
            <aside className="sidebar">
                <div className="sidebar-header">
                    <img src="%PUBLIC_URL%/assets/logo.png" alt="App logo"/>
                </div>
                <div className="sidebar-content">
                    <div className="sidebar-links">
                        <ul>
                            {
                                links.map(({label,icon,path,key})=>{
                                    
                                    return (
                                        <li className={key===this.props.itemKey ? 'active' : ''} key={key}>
                                            <Link to={path}>
                                                <img src={`../assets/icons/${icon}`} alt={`${label} Icon`}/>
                                                {label}
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                            
                            
                        </ul>
                    </div>
                    <div className="sidebar-profile">
                        <div className="profile-head">
                            BD Contact Information
                        </div>
                        <div className="profile-body">
                                
                                <div className="owner-infos">
                                    <div className="owner">
                                        <div className="owner-sup">
                                          EMAIL
                                        </div>
                                        <div className="owner-sub">
                                            {user.data.email}
                                        </div>
                                    </div>
                                    
                                </div>
                            
                        </div>
                    </div>
                </div>
                <div className="sidebar-footer">
                    <Link to="/logout">
                       <i className="fa fa-sign-out"></i> Logout
                    </Link>
                </div>
            </aside>
        )
    }
}