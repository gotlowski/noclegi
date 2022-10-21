import axios from "../../axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";

export default function Hotel() {
    const { id } = useParams();
    const [hotel, setHotel] = useState({});

    const search = async () => {
        try {
            const res = await axios.get(`/hotels/${id}.json`)
            setHotel(res.data);
        } catch (ex) {
            console.log(ex);
        }
    }

    useEffect(() => {
        search();
    }, []);
    
    return (
         <h1>Hotel: {hotel.name}</h1>
    )
}