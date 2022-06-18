import React from 'react'
import { useParams } from 'react-router-dom'

function SearchSection() {
  const { id } = useParams();

  return (
    <div>
      SearchSection
      <div>
        {id}
      </div>
    </div>
  )
}

export default SearchSection