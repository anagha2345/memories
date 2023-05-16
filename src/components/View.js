import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './view.css'

function View() {
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [image, setImage] = useState('')
  const [date, setDate] = useState('')
  const params = useParams()
  const fetchAmemory = async () => {
    const result = await axios.get('http://localhost:8000/getaMemory/' + params.id)
    console.log(result.data.memory);
    setId(result.data.memory.id)
    setDetails(result.data.memory.description)
    setImage(result.data.memory.image)
    setTitle(result.data.memory.title)
    setDate(result.data.memory.date)
    console.log(id, title, details, date, image);
  }
  useEffect(() => {
    fetchAmemory()
  }, [])
  return (
    <div className='container'>
        <div class="col-md-8">
          <h1 className='pb-4 pt-5'>{title}</h1>
          <h4 className=''>{date}</h4>
          <p>{details}</p>
          <img className='img1' src={image}></img>
        </div>
    </div>
  )
}

export default View