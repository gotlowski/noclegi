import { Link } from 'react-router-dom'

function LastHotel(props) {
    return (
        <div className = "card mb-2 bg-light">
            <dev className = "card-header">
            Osatnio oglądałeś ten hotel. Wciąż zainteresowany?
            </dev>
            <dev className = "card-body">
                <dev className= "d-flex justify-content-between">
                <h5 className="card-title">{props.name}</h5> 
                <p>{props.city}</p>
                </dev>
            </dev>
            <dev style={{width: '100px'}} className="ml-auto d-flex justify-content-between">
                <Link href="#" className="btn btn-sm btn-dark">TAK!</Link>
                <button onClick={props.onRemove} className="btn btn-sm btn-dark">Nie</button>
            </dev>
        </div>
    );
}

export default LastHotel;