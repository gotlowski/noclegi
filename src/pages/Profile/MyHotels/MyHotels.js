import axios from "../../../axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function MyHotels(props){
    const [hotels, setHotels] = useState([]);
    const [auth] = useAuth();

    const fetchHotels = async () => {
        try{
            const res = await axios.get('/hotels.json')

            const newHotels = [];
            for(const key in res.data){
                newHotels.push({...res.data[key], id: key});
            }
            setHotels(newHotels.filter(hotel => hotel.user_id === auth.userId));
        }catch(ex){
            console.log(ex);
        }
    }

    useEffect(() => {
         fetchHotels();
    }, []);

    return (
        <div>
            {hotels ? (
<table className="table">
    <thead>
        <th>Nazwa</th>
        <th>Opcja</th>
    </thead>
    <tbody>
       {hotels.map(hotel => (
             <tr>
             <td>{hotel.name}</td>
             <td>
                 <button className="btn btn-warning">Edytuj</button>
                 <button className="ml2 btn btn-danger">Usuń</button>
             </td>
         </tr>
       ))}
    </tbody>
</table>
            ) : (
            <p>moje hotele</p>
        )}
            <Link to="/profil/hotele/dodaj" className="btn btn-primary">Dodaj hotel</Link>
        </div>
    )
}