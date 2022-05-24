import React, { useContext } from 'react';
import styles from './Hotel.module.css';
import img from '../../../assets/images/hotel.jpg'
import PropTypes from 'prop-types'
import ThemeContext from '../../../context/themeContext';
import useAuth from '../../../hooks/useAuth';

const propTypes = {
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired
}

function Hotel(props) {
    const theme = useContext(ThemeContext);
    const [auth, setAuth] = useAuth();

    const openHotel = e => {
        e.preventDefault();
        props.onOpen(props);
    }

    return(
                <div className={`card ${styles.card} `}>
                    <div className={`card-body ${styles.hotel} `}>
                        <div className={`row `} >
                            <div className='col-4'>
                            <img src={img} alt="" className='img-fluid img-thumbnail' />
                            </div>
                            <div className='col-8'>
                                <div className='row'>
                                    <div className='col'>
                                        <p className={styles.title}>{props.name}</p>
                                        <span>{props.city}</span>
                                    </div>
                                    <div className='col'>
                                        <h4>Ocena {props.rating}</h4>
                                        <a href='#' onClick={openHotel} className={`btn btn-${theme.color} mt-2 px-5`}>Pokaż</a>
                                    </div>
                                </div>
                            
                            
                            </div>
                        </div>
                        <div>
                            <p>{props.description} </p>
                            <p>Dostępność: {auth ?  "4 pokoje" : "widoczne dla zalogowanych" }
                            </p>
                        </div>
                    </div>
                </div>
    )
}

Hotel.propTypes = propTypes;


export default Hotel;