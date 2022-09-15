import styles from '../styles/Home.module.scss'
import { useState } from 'react';


export default function ContactForm({data, contactFormClose, setResponse}){
    
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        let keys = Object.keys(data);
        let tempList = []

        keys.forEach(function(key){
            tempList.push(data[key])
        });

        let tempDict = {
            'fname': fname,
            'lname': lname,
            'email': email
        }

        let body = {'data': tempList, 'contact': tempDict}
        console.log(body)

        const endpoint = 'https://elysian.dayumsam.com/generate_result'

        fetch(endpoint, {
            method: 'POST', 
            mode: 'cors', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(body) // body data type must match "Content-Type" header
        }).then(function(response) {
            return response.json();
            }).then(function(data) {
            setResponse(data)
            });
    }

    return(
        <div className={styles.wrapper}>
            <div className={`${styles.formContainer}`}>

                <button className={styles.closeButton} onClick={contactFormClose}>x</button>

                <h1>Get the results on your email address!</h1>

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
        </div>
    )    
}