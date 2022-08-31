 const InputSelect = props => {
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <select 
                className={`form-control ${props.error && props.showError ? 'is-invalid' : ''}`}
                value={props.value}
                onChange={e => props.onChange(e.target.value)}>
                    {props.options.map(option => 
                        <option value={option.value}>{option.label}</option>
                    )}
                </select>
            <div className="invalid-feedback">props.error</div>
        </div>
    )
 }

 const InputText = props => {
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <input 
                className={`form-control ${props.error && props.showError ? 'is-invalid' : ''}`}
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
            <div className="invalid-feedback">props.error</div>
        </div>
    )
 }

 const InputCheckbox = props => {
    const toggleFeatures = e => {
        if(e.target.checked){
            const newFeatures = [...props.value, e.target.value]
             props.onChange(newFeatures);
        }else{
            const newFeatures = props.value.filter(x => x !== e.target.value);
            props.onChange(newFeatures);
        }
    }
    return (
        <>
        <h3>{props.label}</h3>
        <div className="form-group">
            {props.options.map(option => (
                <div class="custom-control custom-checkbox" key={option.value}>
                <input 
                    type="checkbox"
                    class="custom-control-input"
                    id={option.value}
                    value={option.value}
                    onChange={toggleFeatures}
                    checked={props.value.find(x => x === option.value)}
                />
                <label class="custom-control-label" htmlFor={option.value}>{option.label}</label>
            </div>
            ))}
        </div>
        </>
    )
 }

 const InputRadio = props => {
    return (
    <>
        <h3>Status</h3>
        <div className="form-group">
        {props.options.map(option => (
            <div className="custom-control custom-radio">
                <input 
                    type="radio" 
                    name={props.name}
                    value={option.value}
                    onChange={e => props.onChange(e.target.value)}
                    checked={props.value == option.value}
                    class="custom-control-input"
                />
                <label class="custom-control-label" for="status-active">{option.label}</label>
            </div>
        )
        )}
    </div>
    </>
    )
 }

 const InputFile = props => {
    const changeHandler = (e) => {
        const value = e.target.files[0];
        props.onChange(value);
    }

    return (
        <div className="form-group" value={props.image}>
            <h3>{props.label}</h3>
            <input 
                type="file" 
                ref={props.imageRef} 
                onChange={changeHandler}/>
        </div>
    )
 }
 
 function Input(props){
    switch(props.type){
        case 'select':
            return <InputSelect {...props} />
        case 'checkbox':
            return <InputCheckbox {...props} />
        case 'file':
            return <InputFile {...props} />
        case 'radio':
            return <InputRadio {...props} />
        default:
            return <InputText {...props} />
    }
}

Input.defaultProps = {
    type: 'text',
    isValid: true,
    showError: false
}

export default Input;