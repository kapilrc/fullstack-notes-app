import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap'
import MainScreen from '../../components/MainContainer/MainScreen'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, register } from '../../actions/userActions';

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    imageURL: 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'
  });

  const [picMessage, setPicMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(register(user));
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
        const { data:resp } = await axios.post(CLOUDINARY_URL, data)
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
      dispatch(clearError());
    }, 5000);
  }, [error, dispatch]);

  useEffect(() => {
    picMessage && setTimeout(() => {
      setPicMessage(false);
    }, 5000);
  }, [picMessage]);

  useEffect(() => {
    userInfo && navigate('/my-notes');
  }, [userInfo]);

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