import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";

export default function Hotel() {
    const { id } = useParams();
    const [hotel, setHotel] = useState({});

    const [loading, setLoading] = useState(true);
    const setTitle = useWebsiteTitle();

    const fetchHotel = () => {
        setHotel({
            id:id,
            name: 'Dębowy'
        })
        setTitle(`Hotel: Dębowy`);
        setLoading(false);
    }

    useEffect(() => {
        setTimeout(() => {
            fetchHotel();
        }, 500);
    }, []);
    
    return loading ? <LoadingIcon /> :  (
         <h1>Hotel: {hotel.name} id: {hotel.id}</h1>
    )
}