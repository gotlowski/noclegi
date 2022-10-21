import { useState } from "react";
import { Navigate } from 'react-router-dom';
import useAuth from "../../../hooks/useAuth";
import axios from "../../../axios-auth";
import { useNavigate } from "react-router";

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth();
    const [valid, setValid] = useState(null);
    const [error, setError] = useState();
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('accounts:signInWithPassword', {
                email,
                password,
                returnSecureToken: true
            });
            console.log(res);
            setAuth({
                email: res.data.email,
                token: res.data.idToken,
                userId: res.data.localId
            });
            navigate('/');
            
        } catch (ex) {
            console.log(ex);
            setError(ex.response.data.error.message);
        }
        // if (false){
        //     setAuth(true);
        // }else{
        //     setValid(false);
        //     setPassword('');
        // }
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
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    {error ? (
                        <div className="alert alert-danger">{error}</div>
                    ) : null
                    }
                    <button className="btn btn-primary">Zapisz</button>
                </form>
            </div>)
    );
}