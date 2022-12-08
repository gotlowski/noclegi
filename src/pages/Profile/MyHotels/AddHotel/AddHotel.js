import axios from "../../../../axios";
import { useNavigate } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import HotelForm from "../HotelForm";
import React, { Component }  from 'react';

export default function AddHotel(props){
    const [auth] = useAuth()
    const navigate = useNavigate();

    const submit = async form => {        
        try{
            await axios.post(`/hotels.json?auth=${auth.token}`, form);
         navigate('/');
        }catch(ex){
            console.log(ex.response);
        }
    }

    return (
        <div className="card">
            <div className="card-header">Nowy hotel</div>
            <div className="card-body">
                <HotelForm 
                    onSubmit = {submit} 
                    buttonText="Zapisz!" /> 
            </div>
        </div>
    )
}