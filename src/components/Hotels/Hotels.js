import  { Component } from 'react';
import Hotel from './Hotel/Hotel';
import PropTypes from 'prop-types';

const propTypes = {
    hotels: PropTypes.array.isRequired
}

class Hotels extends Component {
    static contextType
    componentWillUnmount() {
        console.log('komponent Hotels odmontowany')
      }

    render(){
        return(
            <div className='container'>
                <h2>Oferty:</h2>
                {this.props.hotels.map(hotel => 
                <Hotel 
                    key={ hotel.id } {...hotel}/>)}
            </div>
        )
    }
}

Hotels.propTypes = propTypes;

export default Hotels;