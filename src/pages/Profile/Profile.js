import { Redirect, Outlet, NavLink } from 'react-router-dom';
import React from "react";

export default function Profile(props) {
    return (
        <div className="card">
            <div className="card-header">
                <h2>Mój profil</h2>
            </div>
            <div className="card-body">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <NavLink className="nav-link active" to="/profil/edytuj">Profil</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link active" to="/profil/hotele">Hotele</NavLink>
                    </li>
                </ul>

                <div className="pt-4">

                    <Outlet />
                </div>

            </div>
        </div>
    )
}