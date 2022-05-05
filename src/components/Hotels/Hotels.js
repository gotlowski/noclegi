import Hotel from './Hotel/Hotel';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo } from 'react';

const propTypes = {
    hotels: PropTypes.array.isRequired
}

const slowFunction = (count) => {
    for(let i=1;i<1000000000;i++) {}
    return count;
}

function Hotels(props)  {
    const count = useMemo(() => {
         return slowFunction(props.hotels.length)
     }, [props.hotels.length]);

    return(
        <div className='container'>
            <h2>Oferty ({ count }):</h2>
            {props.hotels.map(hotel => 
            <Hotel 
                key={ hotel.id } {...hotel}/>)}
        </div>
    );
}

Hotels.propTypes = propTypes;

const areEqual = (prevProps, nextProps) => {
    console.log(prevProps.hotels);
    console.log('next');
    console.log(nextProps.hotels);
    return prevProps.hotels === nextProps.hotels;
}

export default Hotels;
//export default React.memo(Hotels, areEqual);