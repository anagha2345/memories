import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

function Edit() {

  const [mid, setId] = useState('')
  const [memTitle, setTitle] = useState('')
  const [memImage, setImage] = useState('')
  const [memDetails, setDetails] = useState('')
  const [date, setDate] = useState('')


  const params=useParams()
  console.log(params.viewid);
  const fetchAmemory=async ()=>{
   const result =await axios.get('http://localhost:8000/getaMemory/' + params.editid)
   console.log(result);

   setId(result.data.memory.id)
   setTitle(result.data.memory.title)
   setImage(result.data.memory.image)
   setDetails(result.data.memory.description)
   setDate(result.data.memory.date)

  }
  const location=useNavigate()
  const handleEdit=async (e)=>{
     e.preventDefault()
     const body={
      mid,
      memTitle,
      memDetails,
      memImage,
      date
     }
    const result=await axios.post('http://localhost:8000/update',body)
    console.log(result);
    alert(result.data.message)
    location('/')
      }

  useEffect(()=>{
    fetchAmemory()
  },[])
  return (
    <div className='container mt-5 w-50'>
      <h3 className='text-center'>Edit Here</h3>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail" >
              <Form.Label>Memory title</Form.Label>
              <Form.Control type="text" value={memTitle} onChange={(e)=>setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>add the details</Form.Label>
              <Form.Control type="text" value={memDetails} onChange={(e)=>setDetails(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>date</Form.Label>
              <Form.Control type="text" value={date} onChange={(e)=>setDate(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>image</Form.Label>
              <Form.Control type="text"  value={memImage} onChange={(e)=>setImage(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e)=>handleEdit(e)}>Update</Button>
          </Form>
    </div>
  )
}

export default Edit