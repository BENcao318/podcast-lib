import { useEffect, useState } from 'react'
import axios from 'axios';
import Podcasts from '../components/Podcasts';

const API_URL = 'http://localhost:3000/api/v1/podcasts';

function HomeSection() {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
      .then((response) => {
        setPodcasts([...response.data.results])
      })
      .catch((error) => {
        console.log(error);
      })

  }, []);

  return (
    <section className='justify-self-center gap-12 w-8/12'>
      <h1 className='font-bold text-3xl mb-12 mt-6'>Top Podcasts</h1>
      <Podcasts podcasts={podcasts} />
      <div className='h-36'></div>
    </section>
  )
}

export default HomeSection