import Head from 'next/head'
import { useEffect } from 'react';

import { useRouter } from 'next/router';


export default function Results() {

  const router = useRouter();
  const {
    query: { data },
  } = router;

  // useEffect(() => {
  //   console.log(data);
  // },[]);


  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>{data}</h1>
    </div>
  )
}

