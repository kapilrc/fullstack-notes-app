import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap'
import MainScreen from '../../components/MainContainer/MainScreen'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    imageURL: 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [picMessage, setPicMessage] = useState(null);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if(user.password !== user.confirmPassword) {
      setError('Passwords don not match!')
      return;
    }
    
    setError(false);

    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }
      setLoading(true);
      const { name, email, password, imageURL } = user;
      const { data } = await axios.post('http://localhost:3001/api/user', {
        name, email, password, imageURL
      }, config);
      // localStorage.setItem("userInfo", JSON.stringify(data))
      navigate('/login');
    }catch(err) {
      console.log(err?.response?.data?.message);
      setError(err?.response?.data?.message || err?.message);
    }finally {
      setLoading(false);
    }
  }

  const uploadPic = async (pic) => {
    console.log("pic uploading..", pic)
    if(!pic) {
      setPicMessage('Please select an image');
      return;
    }
    
    if(pic.type.includes("image")) {
      const data = new FormData();
      data.append('file', pic)
      data.append('upload_preset', 'kapilrc')
      data.append('cloud_name', 'notesapp')
      try {
        const { data:resp } = await axios.post('https://api.cloudinary.com/v1_1/notesapp/image/upload', data)
        console.log(resp);
        setUser({...user, imageURL: resp.url});
      }catch(err) {
        setPicMessage(err.response?.data?.error?.message || err?.message)
      }

    }else {
      setPicMessage(pic.type + " is not valid format. Please upload Image only")
    }
  }

  useEffect(() => {
    error && setTimeout(() => {
      setError(false);
    }, 5000);
  }, [error]);

  useEffect(() => {
    picMessage && setTimeout(() => {
      setPicMessage(false);
    }, 5000);
  }, [picMessage]);

  return (
    <MainScreen title="REGISTER">
      { loading && <Loader /> }
      { error && <ErrorMessage variant='danger'> { error } </ErrorMessage> }
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name *</Form.Label>
          <Form.Control 
            type="text"
            value={user.name}
            placeholder="Enter email"
            onChange={(e) => setUser({...user, name: e.target.value})}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address *</Form.Label>
          <Form.Control 
            type="email" 
            value={user.email}
            placeholder="Enter email"
            onChange={(e) => setUser({...user, email: e.target.value})}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password *</Form.Label>
          <Form.Control 
            type="password" 
            value={user.password}
            placeholder="Password"
            onChange={(e) => setUser({...user, password: e.target.value})}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password *</Form.Label>
          <Form.Control 
            type="password" 
            value={user.confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setUser({...user, confirmPassword: e.target.value})}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Profile picture</Form.Label>
          <Form.Control 
            type="file"
            label="Upload Profile picture"
            onChange={(e) => uploadPic(e.target.files[0])}
          />
        </Form.Group>
        { picMessage && <p className='text-danger'> { picMessage } </p> }

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </MainScreen>
  )
}

export default Register