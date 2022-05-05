import { useEffect, useState, useLayoutEffect } from "react";

const styles = {
    position: 'absolute',
    top: '20px',
    left: 0,
    right: 0,
    color: '#fff',
    textAlign: 'center',
    padding: '10px',
    fontStyle: 'italic'
}

const quotes = [
    'Mówić w danym języku to stawić czoło światu i kulturze.',
    'Nic tak nie rozwija inteligencji jak podróżowanie',
    'Należy podróżować, by się czegoś nauczyć'
]
function InspiringQuote(props) {
    const [quote, setQuote]= useState('Wczytywanie cytatu');
    const [loading, setLoading]= useState(true);

    useEffect(()=> {
        setLoading(false);

    });

    useEffect(()=> {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, [loading])

    return (
        <p style={styles}>{quote}</p>
    );
}

export default InspiringQuote;