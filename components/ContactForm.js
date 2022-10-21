import styles from '../styles/Home.module.scss'
import { useState, useEffect } from 'react';


export default function ContactForm({data, contactFormClose, setResponse}){
    
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')

    const [loading, setLoading] = useState(false)
    const [resultData, seResultData] = useState(null)

    let loadingText = [
        "Hang tight as we analyze your choices...",
        "...reviewing your style preferences with our super fancy algorithm...",
        "...preparing a few style tips for you...",
        "...thank you for your patience!"
    ]

    const [textIndex, setTextIndex] = useState(0);

    function Loader(){

        useEffect(() => {
            let timeout;
            if (textIndex < loadingText.length) {
                timeout = setTimeout(() => {
                    setTextIndex(textIndex + 1)
                }, 1800);
            }

            if(textIndex === loadingText.length){
                setResponse(resultData);
                setLoading(false);
            }
        
            return () => {
                clearTimeout(timeout);
            };
        
        }, [textIndex]);
    
        return (
            <div className={styles.loader}>
                <p>
                    {loadingText[textIndex]}
                </p>
            </div>
        )
    }


    const handleSubmit = async (event) => {
        event.preventDefault()

        setLoading(true)

        let keys = Object.keys(data);
        let formData = []

        keys.forEach(function(key){
            formData.push(data[key])
        });

        let contact = {
            'fname': fname,
            'lname': lname,
            'email': email
        }

        let body = {'data': formData, 'contact': contact}

        let baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`

        fetch(`${baseUrl}/generate_result`, {
            method: 'POST', 
            mode: 'cors', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body) // body data type must match "Content-Type" header
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            seResultData(data);
        })
        .catch(err => {
            alert("Error try again in a few minutes");
            seResultData(null);
            setLoading(false);
            contactFormClose();
        })
    }

    return(

        <>
        {loading ? 
        
            <Loader/> :

            <div className={styles.wrapper}>
                <div className={`${styles.formContainer}`}>

                    <button className={styles.closeButton} onClick={contactFormClose}>x</button>

                    <h1>Share your interest with us!</h1>

                    <form action="" onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <fieldset>
                                <input type="text" name='fname'placeholder='First Name' value={fname} onChange={(e) => setFname(e.target.value)} required/>
                            </fieldset>

                            <fieldset>
                                <input type="text" name='lname' placeholder='Last Name' value={lname} onChange={(e) => setLname(e.target.value)} required/>
                            </fieldset>
                        </div>

                        <fieldset>
                            <input type="email" name="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        </fieldset>

                        <fieldset>
                            <button className={styles.submitButton}>Generate Results</button>
                        </fieldset>
                    </form>
                </div>
            </div>}
        </>
    )    
}