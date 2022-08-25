import { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

export default function ProfileDetails(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth();
    const [errors, setErrors] = useState({
        email: '',
        password: 'Zbyt krótkie hasło'
    });

    const submit = (e) => {
        if (false){
            setAuth(true);
        }else{
            setPassword('');
        }
    }

    useEffect(() => {
        if (validateEmail(email)){
            setErrors({...errors, email: ''});
        }else{
            setErrors({...errors, email: 'Niepoprawny email'});
        }
    }, [email])

    const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };

    return (
        <div>
            <h2>Logowanie</h2>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        className={`form-control ${errors.email ? 'is-invalid' : 'is-valid'}`}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                     />
                     <div className="invalid-feedback">{errors.email}</div>
                </div>
                <div className="form-group">
                    <label>Hasło</label>
                    <input 
                        className="form-control is-invalid" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className="invalid-feedback">{errors.password}</div>
                </div>
                <button className="btn btn-primary">Zapisz</button>
            </form>
        </div>
    );
}