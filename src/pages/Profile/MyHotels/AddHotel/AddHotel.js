import { useRef, useState } from "react";

export default function AddHotel(props){
    const imageRef = useRef();
    const [form, setForm]= useState({
        name: '',
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

    const toggleFeatures = e => {
        if(e.target.checked){
            const newFeatures = [...form.features, e.target.value]
            setForm({...form, features: newFeatures})
        }else{
            const newFeatures = form.features.filter(x => x !== e.target.value);
            setForm({...form, features: newFeatures})
        }
    }
    
    return (
        <div className="card">
            <div className="card-header">Nowy hotel</div>
            <div className="card-body">
                <form onSubmit={submit}>
                    <label>Nazwa</label>
                    <input 
                        type="text"
                        value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})}
                        className={`form-control ${false ? 'is-invalid' : ''}`}/>
                    
                    <div className="invalid-feedback">Błąd</div>

                    <label>Opis</label>
                    <input 
                        type="textarea"
                        value={form.description}
                        onChange={e => setForm({...form, description: e.target.value})}
                        className={`form-control ${false ? 'is-invalid' : ''}`}/>
                    
                    <div className="invalid-feedback">Błąd</div>

                    <label>Miejscowość</label>
                    <input 
                        type="text"
                        value={form.city}
                        onChange={e => setForm({...form, city: e.target.value})}
                        className={`form-control ${false ? 'is-invalid' : ''}`}/>
                    
                    <div className="invalid-feedback">Błąd</div>

                    <label>Ilość pokoi</label>
                    <select className="form-control" value={form.rooms}
                        onChange={e => setForm({...form, rooms: e.target.value})}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    
                    <div className="invalid-feedback">Błąd</div>

                    <h3>Udogodnienia</h3>
                    <div className="form-group">
                        <div class="custom-control custom-checkbox">
                            <input 
                                type="checkbox"
                                class="custom-control-input"
                                value="tv"
                                onChange={toggleFeatures}
                                checked={form.features.find(x => x === 'tv')}
                                id="tv"
                            />
                            <label class="custom-control-label" for="tv">TV</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input 
                                type="checkbox"
                                class="custom-control-input"
                                id="wifi"
                                value="wifi"
                                onChange={toggleFeatures}
                                checked={form.features.find(x => x === 'wifi')}
                            />
                            <label class="custom-control-label" for="wifi">Wi-Fi</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input 
                                type="checkbox"
                                class="custom-control-input"
                                id="parking"
                                value="parking"
                                onChange={toggleFeatures}
                                checked={form.features.find(x => x === 'parking')}
                            />
                            <label class="custom-control-label" for="parking">Parking</label>
                        </div>
                    </div>

                    <div className="form-group" value={form.image}>
                        <h3>Zdjęcie</h3>
                        <input 
                            type="file" 
                            ref={imageRef} 
                            onChange={e => setForm({...form, image: e.target.files})}/>
                    </div>

                    <h3>Status</h3>
                    <div className="form-group">
                        <div className="custom-control custom-radio">
                            <input 
                                type="radio" 
                                name="status"
                                value="1"
                                onChange={e => setForm({...form, status: e.target.value})}
                                checked={form.status == 1}
                                class="custom-control-input"
                            />
                            <label class="custom-control-label" for="status-active">Aktywny</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input 
                                type="radio" 
                                name="status"
                                value="0"
                                onChange={e => setForm({...form, status: e.target.value})}
                                checked={form.status == 0}
                                class="custom-control-input"
                            />
                            <label class="custom-control-label" for="status-active">Ukryty</label>
                        </div>
                    </div>
                </form>  
            </div>
            <button className="btn btn-primary" onClick={submit}>Zapisz</button>
        </div>
    )
}