import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Podcasts from '../components/Podcasts'

const serverURL = 'http://localhost:3000/api/v1'

function GenresSection() {
  const [podcasts, setPodcasts] = useState([])
  const { name, id } = useParams()

  useEffect(() => {
    axios.get(`${serverURL}/genres/${id}`)
      .then((response) => {
        if (response.data.success) {
          const topPodcasts = JSON.parse(response.data.podcasts).results
          setPodcasts(topPodcasts);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }, [id])

  console.log(podcasts);

  return (
    <section className='justify-self-center gap-12 w-8/12'>
      <h1 className='font-bold text-3xl mb-12 mt-6'>
        Top
        <span className='text-sky-600'> {name} </span>
        podcasts
      </h1>
      <Podcasts podcasts={podcasts} />
      <div className='h-36'></div>
    </section>
  )
}

export default GenresSection