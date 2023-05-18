import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './view.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


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
    <div className='container w-50'>
        <div class="col-md-8">
          <h1 className='pb-4 pt-5'>{title}</h1>
          <h4 className=''>{date}</h4>
          <p>{details}</p>
          <img className='img1 w-100'  src={image}></img>
        </div>
        <div className='pt-5'>
        <Link to={'edit/'+id}><Button variant="secondary">Edit</Button></Link>
         <Button className='ms-2'>Add more photos</Button>
        </div>
    </div>

  )
}

export default View