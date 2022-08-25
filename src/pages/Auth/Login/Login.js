import { useState } from "react";
import { Navigate } from 'react-router-dom';
import useAuth from "../../../hooks/useAuth";

export default function Login(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth();
    const [valid, setValid] = useState(null);

    const submit = (e) => {
        if (false){
            setAuth(true);
        }else{
            setValid(false);
            setPassword('');
        }
    }

    return (
        auth ?
        (<Navigate to="/" />)
        :
        (<div>
            {valid === false ? (
                <div className="alert alert-danger">Niepoprawne dane logowania</div>
            )
            : null}
            <h2>Logowanie</h2>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        className="form-control"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                     />
                </div>
                <div className="form-group">
                    <label>Hasło</label>
                    <input 
                        className="form-control" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary">Zapisz</button>
            </form>
        </div>)
    );
}