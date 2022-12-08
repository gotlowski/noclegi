import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import useAuth from "../../hooks/useAuth";

export default function Hotel(props) {
    const { id } = useParams();
    const [auth] = useAuth();
    const [hotel, setHotel] = useState({});
    const [rating, setRating] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const search = async () => {
        try {
            const res = await axios.get(`/hotels/${id}.json`)
            setHotel(res.data);
        } catch (ex) {
            console.log(ex);
        }
    }

    const rateHotel = async () => {
        try {
            await axios.put(`/hotels/${id}/rating.json?auth=${auth.token}`, rating)
            navigate('/');
        } catch (ex) {
            console.log(ex);
        }
    }

    useEffect(() => {
        search();
        setLoading(false);
    }, []);

    const login = () => {
        navigate('/zaloguj');
    }

    return (
        loading ? "" : (
            <div className="card">
                <div className="card-header">
                    <h1>Hotel: {hotel.name}</h1>
                </div>
                <div className="card-body">
                    <img
                        src={'https://placeimg.com/420/180/arch'}
                        alt=""
                        className="img-fluid mb-4"
                    />
                    <p>Miejscowość: <b>{hotel.city}</b></p>
                    <p>Pokoje: <b>{hotel.rooms}</b></p>
                    <p>{hotel.description}</p>
                    <p>Wyposażenie:
                        <ul>
                            {hotel.features?.map(item =>
                                <li key={item}>{item}</li>
                            )}
                        </ul>
                    </p>
                    <p><h4>Ocena: {hotel.rating ? hotel.rating : 'brak ocen'} </h4></p>
                </div>
                <div className="card-footer">
                    {auth ? (
                        <div className="form-group row mt-4">
                            <div className="col">
                                <select class="form-control form-select-lg mb-3"
                                    value={rating}
                                    onChange={e => setRating(e.target.value)}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <div className="col">
                                <button className="btn btn-info" onClick={rateHotel}>Oceń</button>

                            </div>
                        </div>
                    ) : <button className="btn btn-info" onClick={login}>Zaloguj aby ocenić</button>}
                </div>
            </div>
        )
    )
}