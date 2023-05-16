import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import uuid from 'react-uuid';
import './Home.css'

function Home() {
  const [allMemories, setMemories] = useState([])
  const [showForm, setForm] = useState(false)
  const [mid, setId] = useState('')
  const [memTitle, setTitle] = useState('')
  const [memImage, setImage] = useState('')
  const [memDetails, setDetails] = useState('')
  const [date, setDate] = useState('')
  const [likedItems,setLikedItems]=useState([])

  const handleClick = () => {
    setForm(true)

  }
  

  const fetchData = async () => {
    const result = await axios.get('http://localhost:8000/getmemories')
 
    setMemories(result.data.memories)

  }


  const handleDelete=async(id) => {
  const result=await axios.delete('http://localhost:8000/deleteMemory/'+id)
  
  alert(result.data.message)
  fetchData()
  }

  const likeclick=(id)=>{
    if(likedItems.includes(id)){
      setLikedItems(likedItems.filter(item=>item !==id))
    }
    else{
      setLikedItems([...likedItems,id])
    }
    
  }



  const addMemory = async (n) => {
    n.preventDefault()
    console.log(uuid().slice(0, 3));
    const body = {
      id: mid,
      title: memTitle,
      date,
      description: memDetails,
      image: memImage

    }
    const memResult = await axios.post('http://localhost:8000/addMemory', body)
    alert(memResult.data.message)
    
     fetchData()
    setForm(false)
  }

  


  useEffect(() => {
    fetchData()
    setId(uuid().slice(0, 3))
  }, [])

  return (
    <div className='container'>
      <div class="row container">
       
        <div className="col-sm-3  col-md-6 container mt-5 ">
         {!showForm && <Button onClick={handleClick} className='container mb-5 mt-5 text-center w-25' style={{height:'250px'}}><i class=" fa-solid fa-circle-plus "></i></Button>}
          {showForm && <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail" >
              <Form.Label>Memory title</Form.Label>
              <Form.Control type="text" onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>add the details</Form.Label>
              <Form.Control type="text" onChange={(r) => setDetails(r.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>date</Form.Label>
              <Form.Control type="text" onChange={(u) => setDate(u.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>image</Form.Label>
              <Form.Control type="text" onChange={(e) => setImage(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(n) => addMemory(n)} >
              Submit
            </Button>
          </Form>}
          <div>
            <h2>favorites</h2>
           {
            likedItems.map(ids=>{
              const fav=allMemories.find(item=>(item.id==ids))
              return(
                <div className='row'>
                  <img className='' lg={3} src={fav.image}></img>
                  </div>
              )
               })
           
           }
              
            
          </div>
        </div> 
        <div className="container col-md-6 ">
          <div class="ps-2 pe-2 pt-3">
            <h2 className='text-center'>memories</h2>
          </div>
          <div class=" row  memory_row ">
            {
              allMemories?.map(item => (
                <div class="container w-50 sm={12} pt-5" >
                  <Col className='' >
                    <Card  className=''>
                    <Card.Img variant="top" src={item.image} style={{height:'300px'}}/>

                      {/* <i class="fa-solid fa-ellipsis-vertical d-flex justify-content-end font-size: 24px me-2 mt-2"></i> */}

                      <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>
                          {item.description}
                        </Card.Text>
                       <div className='row1'>
                          <Link onClick={()=>likeclick(item.id)} className={likedItems.includes(item.id)?'liked':''}><i class="fa-solid fa-heart"></i></Link>
                        <Link to={'view/'+item.id}><Button variant="primary">view</Button></Link>
                          <Link onClick={()=>handleDelete(item.id)}><i class="fa-solid fa-trash d-flex justify-content-end"></i></Link>
                          </div>
                          </Card.Body>
                     

                    </Card>
                  </Col>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home