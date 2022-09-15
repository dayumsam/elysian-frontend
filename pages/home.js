import styles from '../styles/Home.module.scss'
import { useState, useEffect } from 'react';

import ContactForm from '../components/ContactForm';
import Header from '../components/Header';
import Form from '../components/From';
import ResultSection from '../components/Results';
import Loader  from '../components/Loader';

export default function Home() {

    const [imgData, setImgData] = useState(null)
    const [imgLoading, setImgLoading] = useState(false)

    const [selection, setSelection] = useState({})

    const [contactVisible, setContactVisible] = useState(false)

    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)
    
    useEffect(() => {
        setImgLoading(true)
        fetch('https://elysian.dayumsam.com/get_image')
        .then((res) => res.json())
        .then((data) => {
            setImgData(data)
            setImgLoading(false)
        })
    }, [])
    
    const contactFormClose = () => {
        setContactVisible(false)
    }

    const handleClick = el => {
        if (selection.hasOwnProperty(el.target.getAttribute('data-id'))){
            let newDict = {...selection}
            delete newDict[el.target.getAttribute('data-id')]

            setSelection(newDict)
        }

        else{
            let newSelection = {}
            newSelection[el.target.getAttribute('data-id')] = el.target.value
            let newDict = {
                ...selection,
                ...newSelection
            }

            setSelection(newDict);
        } 
    };

    function SubmitSection(){

        const contactFormOpen = (event) => {
            event.preventDefault()
    
            if (Object.keys(selection).length < 1){
                alert("Please select atleast one style")
                return false;
            }
            else{
                setLoading(true)
                setContactVisible(true)
            }
        }

        return(
            <div className={styles.submitsection}>
                <div className={styles.container}>
                    <button onClick={contactFormOpen}>Next</button>
                </div>
            </div>
        )
    }
    
    return (
        <div>
            <div className={styles.container}>

                <Header/>

                {contactVisible? <ContactForm contactFormClose={contactFormClose} setResponse={setResponse} data={selection}/> : <></>}

                {
                    imgLoading ? <p>Loading...</p> : !imgData ? <></> 
                    : !response ? <Form data={imgData} handleClick={handleClick}/> 
                    : <ResultSection data={response} setContactVisible={setContactVisible}/>
                }

                {!response ? <SubmitSection/> : <></>}
            </div>
        </div>
    )
  }
  