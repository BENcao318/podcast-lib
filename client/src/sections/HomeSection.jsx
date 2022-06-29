import { useEffect, useState } from 'react'
import axios from 'axios';
import Podcasts from '../components/Podcasts';

const API_URL = 'http://localhost:3000/api/v1/podcasts';

function HomeSection() {
  const [podcasts, setPodcasts] = useState([]);

  const getAPIData = () => {
    return axios.get(API_URL).then((response) => response.data.results)
  }

  useEffect(() => {
    getAPIData()
      .then(podcastItems => {
        console.log(podcastItems);
        setPodcasts(podcastItems);
      })
  }, []);

  return (
    <section className='justify-self-center gap-12 w-8/12'>
      <Podcasts podcasts={podcasts} />
      <div className='h-36'></div>
    </section>
  )
}

export default HomeSection