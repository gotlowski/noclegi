import { useState, useEffect } from "react";
import moment from 'moment';
import { Link } from 'react-router-dom'

const BestHotel = (props) => {
    const [time, setTime] = useState('');

    const endTime = moment().add(23, 'minutes').add(34, 'seconds');
    const hotel = props.getHotel({ minHotels: 2});
    let interval = null;
    
    useEffect(() => {
        interval = setInterval(() => {
            const leftTime = -moment().diff(endTime) / 1000;
            const minutes = Math.floor(leftTime / 60);
            const seconds = Math.floor(leftTime % 60);
            setTime(`minut: ${minutes} sekund: ${seconds}`);
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    if(!hotel) return null; 

    return (
        <div className = "card bg-success text-white">
            <dev className = "card-header">
            Najlepsza oferta !!!
            </dev>
            <dev className = "card-body">
                <dev className= "d-flex justify-content-between">
                <h5 className="card-title">{hotel.name}</h5> 
                <p>{hotel.rating}</p>
            </dev>
            <p>Do końca oferty pozostało: {time}</p>
                <Link to={`/hotele/${hotel.id}`} href="#" className="btn btn-sm btn-light">Pokaż</Link>
            </dev>
        </div>
    )
}

export default BestHotel;