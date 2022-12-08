import React, { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import { validateEmail } from "../../helpers/validations";
import axios from "../../axios-auth";

export default function ProfileDetails(props) {
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [auth, setAuth] = useAuth();
    const [email, setEmail] = useState(auth.email);
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const submit = async (e) => {
        e.preventDefault();

        try{
            const data = {
                idToken: auth.token,
                email: email,
                returnSecureToken: true
            };
            if(password){
                data.password = password
            }
            const res = await axios.post('accounts:update', data);
            setAuth({
                email: res.data.email,
                token: res.data.idToken,
                userId: res.data
            })
            setSuccess(true);
            console.log(res);
        }catch (ex){
            console.log(ex.response);
        }
    }

    useEffect(() => {
        if (validateEmail(email)) {
            setErrors({ ...errors, email: '' });
        } else {
            setErrors({ ...errors, email: 'Niepoprawny email' });
        }
    }, [email])

    useEffect(() => {
        if (password.length >= 6 || !password) {
            setErrors({ ...errors, password: '' });
        } else {
            setErrors({ ...errors, password: 'Zbyt krótkie hasło' });
        }
    }, [password])

    return (
        <div>
            <h2>Logowanie</h2>
            <form onSubmit={submit}>
                {success ? (
                    <div className="alert alert-success">Dane zapisane</div>
                ) : null}
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
                        className={`form-control ${!password ? '' : (errors.password ? 'is-invalid' : 'is-valid')}`}
                        value={password}
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className="invalid-feedback">{errors.password}</div>
                </div>
                <button className="btn btn-primary">Zapisz</button>
            </form>
        </div>
    );
}