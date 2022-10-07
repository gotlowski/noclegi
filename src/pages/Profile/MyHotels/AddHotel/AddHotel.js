import { useRef, useState } from "react";
import Input from "../../../../components/Input/Input";
import { validate } from "../../../../helpers/validations";

export default function AddHotel(props){
    const [form, setForm]= useState({
        name: {
            value: '',
            showError: false,
            error: '',
            rules: ['required', { rule: 'min', length: 4 }]
        },
        description: '',
        city: '',
        rooms: '3',
        features: ['tv'],
        image: null,
        status: '1'
    });

    const submit = e => {
        e.preventDefault();
        console.log(form);
    }

    const changeHandler = (val, fieldName) => {
        const error = validate(form[fieldName].rules, val);
        setForm({
            ...form, 
            [fieldName]: {
                ...form[fieldName], 
                value: val,
                showError: true,
                error: error
    }});
    }

    return (
        <div className="card">
            <div className="card-header">Nowy hotel</div>
            <div className="card-body">
                <form onSubmit={submit}>
                    <Input
                        label = "Nazwa"
                        value = {form.name.value}
                        onChange = {value => changeHandler(value, 'name')}
                        isValid = {true}
                        showError = {form.name.showError}
                        error = {form.name.error} />
                    <Input
                        label = "Opis"
                        value = {form.description}
                        onChange = {value => setForm({...form, description: value})}
                        isValid = {true}
                        showError = {false} />
                    <Input
                        label = "Miejscowość"
                        value = {form.city}
                        onChange = {value => setForm({...form, city: value})}
                        isValid = {true}
                        showError = {false} />
                    <Input
                        label = "Ilość pokoi"
                        value = {form.rooms}
                        onChange = {value => setForm({...form, rooms: value})}
                        isValid = {true}
                        showError = {false} 
                        options={[
                            { value: 1, label: 1},
                            { value: 2, label: 2},
                            { value: 3, label: 3},
                            { value: 4, label: 4}
                        ]}
                        type = "select"/>
                    <Input
                        label = "Udogodnienia"
                        value = {form.features}
                        onChange = {value => setForm({...form, features: value})}
                        error = ""
                        showError = {false} 
                        options={[
                            { value: 'tv', label: 'TV'},
                            { value: 'wifi', label: 'Wi-Fi'},
                            { value: 'parking', label: 'Parking'}
                        ]}
                        type = "checkbox"/>
                    <Input
                        label = "Zdjęcie"
                        value = {form.image}
                        onChange={e => setForm({...form, image: e})}
                        error = ""
                        showError = {false} 
                        type = "file"/>
                    <Input
                        label = "Status"
                        value = {form.status}
                        onChange = {value => setForm({...form, status: value})}
                        error = ""
                        showError = {false} 
                        options={[
                            { value: '1', label: 'Aktywny'},
                            { value: '0', label: 'Ukryty'}
                        ]}
                        type = "radio"/>
                </form>  
            </div>
            <button className="btn btn-primary" onClick={submit}>Zapisz</button>
        </div>
    )
}