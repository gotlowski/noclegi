import { useEffect, useRef, useState } from "react";
import Input from "../../../components/Input/Input";
import { validate } from "../../../helpers/validations";
import useAuth from "../../../hooks/useAuth";

const HotelForm = props => {
    const [auth] = useAuth();
    const [form, setForm] = useState({
        name: {
            value: '',
            showError: false,
            error: '',
            rules: ['required', { rule: 'min', length: 4 }]
        },
        description: {
            value: '',
            showError: false,
            error: '',
            rules: ['required', { rule: 'min', length: 4 }]
        },
        city: {
            value: '',
            showError: false,
            error: '',
            rules: ['required']
        },
        rooms: {
            value: 2,
            showError: false,
            error: '',
            rules: ['required']
        },
        features: { 
            value: ['tv'],
            showError: false,
            error: ''
        },
        image: { 
            value: null,
            showError: false,
            error: ''
        },
        status: {
            value: '1',
            showError: false,
            error: '',
            rules: ['required']
        }
    });

    const changeHandler = (val, fieldName) => {
        const error = validate(form[fieldName].rules, val);
        setForm({
            ...form,
            [fieldName]: {
                ...form[fieldName],
                value: val,
                showError: true,
                error: error
            }
        });
    }

    const submit = async e => {        
        e.preventDefault();
        try{
            props.onSubmit({
                name: form.name.value,
                description: form.description.value,
                city: form.city.value,
                rooms: form.rooms.value,
                features: form.features.value,
                status: form.status.value,
                user_id: auth.userId
            });
        }catch(ex){
            console.log(ex.response);
        }
    }

    useEffect(() => {
        const newForm = {...form};
        for (const key in props.hotel) {
            if(newForm[key]){
                newForm[key].value = props.hotel[key];
            }             
        }
        setForm(newForm);
    }, [props.hotel]);

    return (
        <>
        <form onSubmit={submit}>
            <Input
                label="Nazwa"
                value={form.name.value}
                onChange={value => changeHandler(value, 'name')}
                isValid={true}
                showError={form.name.showError}
                error={form.name.error} />
            <Input
                label="Opis"
                value={form.description.value}
                onChange={value => changeHandler(value, 'description')}
                isValid={true}
                showError={form.description.showError}
                error={form.description.error} />
            <Input
                label="Miejscowość"
                value={form.city.value}
                onChange={value => changeHandler(value, 'city')}
                isValid={true}
                showError={form.city.showError}
                error={form.city.error} />
            <Input
                label="Ilość pokoi"
                value={form.rooms.value}
                onChange={value => changeHandler(value, 'rooms')}
                isValid={true}
                showError={false}
                options={[
                    { value: 1, label: 1 },
                    { value: 2, label: 2 },
                    { value: 3, label: 3 },
                    { value: 4, label: 4 }
                ]}
                type="select" />
            <Input
                label="Udogodnienia"
                value={form.features.value}
                onChange={value => changeHandler(value, 'features') }
                error=""
                showError={false}
                options={[
                    { value: 'tv', label: 'TV' },
                    { value: 'wifi', label: 'Wi-Fi' },
                    { value: 'parking', label: 'Parking' }
                ]}
                type="checkbox" />
            <Input
                label="Zdjęcie"
                value={form.image}
                onChange={e => setForm({ ...form, image: e })}
                error=""
                showError={false}
                type="file" />
            <Input
                label="Status"
                value={form.status.value}
                onChange={value => changeHandler(value, 'status') }
                error=""
                showError={false}
                options={[
                    { value: 1, label: 'Aktywny' },
                    { value: 0, label: 'Ukryty' }
                ]}
                type="radio" />
        </form>
        <button className="btn btn-primary" onClick={submit}>{props.buttonText}</button>
        </>
    )
}

export default HotelForm;