import styles from '../styles/Home.module.scss'
import { useState, useEffect } from 'react';

import ContactForm from '../components/ContactForm';
import Form from '../components/From';
import ResultSection from '../components/Results';

export default function Home() {

    const [imgData, setImgData] = useState(null)
    const [imgLoading, setImgLoading] = useState(false)
    const [imgErr, setImgErr] = useState(false)

    const [selection, setSelection] = useState({})

    const [contactVisible, setContactVisible] = useState(false)

    const [response, setResponse] = useState(null)
    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [response])

    let baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`

    useEffect(() => {
        setImgLoading(true)
        fetch(`${baseUrl}/images`)
        .then((res) => res.json())
        .catch((err)=>{
            alert("Something went wrong");
            setImgErr(true)
        })
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

                {!contactVisible ? <></> : <ContactForm contactFormClose={contactFormClose} setResponse={setResponse} data={selection}/>}

                {
                    !imgErr ?
                    imgLoading ? <p>Loading...</p> : !imgData ? <></> 
                    : !response ? <Form data={imgData} handleClick={handleClick}/>
                    : <ResultSection data={response} setContactVisible={setContactVisible}/>
                    : <p>Something went wrong please reload the page...</p>
                }

                {!response && !imgErr ? <SubmitSection/> : <></>}
            </div>
        </div>
    )
  }
  