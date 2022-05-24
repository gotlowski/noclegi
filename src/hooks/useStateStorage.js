import {useState} from 'react';

function useStateStorage(key, defaultValue) {
    
    const [state, setState] = useState(() => {
        let value;
        const storageValue = window.localStorage.getItem(key);

        if(storageValue){
            value = JSON.parse(storageValue);
        }else{
            value = defaultValue;
        }

        return value;
    });

    const setValue = val => {
        setState(val);
        window.localStorage.setItem(key, JSON.stringify(val));
    }

    return [state, setValue];
}

export default useStateStorage;