import LastHotel from '../../components/Hotels/LastHotel/LastHotel';
import Hotels from '../../components/Hotels/Hotels';
import useStateStorage from '../../hooks/useStateStorage'
import BestHotel from '../../components/Hotels/BestHotel/BestHotel';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import  React, { useEffect, useCallback, useState } from 'react';
import LoadingIcon from  '../../components/UI/LoadingIcon/LoadingIcon'
import axios from '../../axios';
import useAuth from '../../hooks/useAuth';

export default function Home(props) {
    useWebsiteTitle('Strona główna');
    const [lastHotel, setLastHotel] = useStateStorage('last-hotel', null);

    const [loading, setLoading] = useState(true);
    const [hotels, setHotels] = useState([]);
    const [auth] = useAuth();
  
    const fetchHotels = async () => {
      try{
          const res = await axios.get(`/hotels.json`)

          const newHotels = [];
          for(const key in res.data){
              newHotels.push({...res.data[key], id: key});
          }
          setHotels(newHotels.filter(hotel => hotel.status === '1'));
          setLoading(false);
      }catch(ex){
          console.log(ex);
      }
  }

  useEffect(() => {
       fetchHotels();
  }, []);

    const openHotel = (hotel) => setLastHotel(hotel);
    const removeLastHotel = () => setLastHotel(null);
    const getBestHotel = useCallback((options) => {
        if(hotels.length < options.minHotels){
          return null;
        }else {
          return hotels.sort((a, b) => a.rating > b.rating ? -1 : 1)
          [0];
        }
      }, [hotels]);

    const bestHotel =  getBestHotel({minHotels: 2}) ? <BestHotel getHotel={getBestHotel} /> : null;

    return loading ? <LoadingIcon /> : (
        <>
        {lastHotel ? <LastHotel {...lastHotel} onRemove={removeLastHotel} /> : null}
        { bestHotel }
        <Hotels onOpen={openHotel} hotels={hotels} />
        </>
    )
}