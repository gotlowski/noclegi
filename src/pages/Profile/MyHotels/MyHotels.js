import { Link } from "react-router-dom";

export default function MyHotels(props){
    return (
        <div>
            <p>moje hotele</p>
            <Link to="/profil/hotele/dodaj" className="btn btn-primary">Dodaj hotel</Link>
        </div>
    )
}