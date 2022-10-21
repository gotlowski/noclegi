import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "../../axios";
import Hotels from "../../components/Hotels/Hotels";

export default function Search(props) {
    const { term } = useParams();

    const [hotels, setHotels] = useState([]);

    const search = async () => {
        try {
            const res = await axios.get('/hotels.json')

            const newHotels = [];
            for (const key in res.data) {
                newHotels.push({ ...res.data[key], id: key });
            }
            setHotels(newHotels.filter(hotel => hotel.name.includes(term)));
        } catch (ex) {
            console.log(ex);
        }
    }

    useEffect(() => {
        search();
    }, [term]);

    return (
        <div>
            <h2>Wyniki wyszukiwania dla frazy: {term}</h2>
            <Hotels hotels={hotels} />
        </div>
    )
}