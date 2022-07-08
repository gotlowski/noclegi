import LastHotel from '../../components/Hotels/LastHotel/LastHotel';
import Hotels from '../../components/Hotels/Hotels';
import useStateStorage from '../../hooks/useStateStorage'
import BestHotel from '../../components/Hotels/BestHotel/BestHotel';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import  { useEffect, useCallback, useState } from 'react';
import LoadingIcon from  '../../components/UI/LoadingIcon/LoadingIcon'

const defaultHotels = [
    {
      id: 1,
      name: 'Pod akacjami',
      city: 'Warszawa',
      rating: 8.3,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consequat id lorem vitae accumsan.',
      image: ''
    },
    {
      id: 2,
      name: 'Dębowy',
      city: 'Lublin',
      rating: 8.8,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consequat id lorem vitae accumsan.',
      image: ''
    }
  ];

export default function Home(props) {
    useWebsiteTitle('Strona główna');
    const [lastHotel, setLastHotel] = useStateStorage('last-hotel', null);

    const [loading, setLoading] = useState(true);
    const [hotels, setHotels] = useState([]);
  
    useEffect(() =>
        {
        setTimeout(() => {
            setHotels(defaultHotels);
            setLoading(false);
        }, 1000);
        }, []
    );

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