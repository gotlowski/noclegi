import axios from "../../../../axios";
import { useNavigate } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import HotelForm from "../HotelForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditHotel(props){
    const { id } = useParams();
    const navigate = useNavigate();
    const [hotel, setHotel] = useState(null);
    const [auth] = useAuth();

    const submit = async form => {        
        try{
            const res = await axios.put(`/hotels/${id}.json?auth=${auth.token}`, form);
            navigate('/profil/hotele');
        }catch(ex){
            console.log(ex.response);
        }
    }

    const fetchHotel = async () => {
        try{
            const res = await axios.get(`/hotels/${id}.json`);
            setHotel(res.data);
        }catch(ex){
            console.log(ex.response);
        }
    }

    useEffect(() => {
        fetchHotel();
    }, [])

    return (
        <div className="card">
            <div className="card-header">Edytuj hotel</div>
            <div className="card-body">
                <HotelForm 
                    onSubmit = {submit} 
                    buttonText="Zapisz!"
                     hotel = {hotel} 
                    /> 
            </div>
        </div>
    )
}