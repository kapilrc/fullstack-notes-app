import React, { useState, useEffect } from 'react'
import MainScreen from '../../components/MainContainer/MainScreen';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, login, updateProfile } from '../../actions/userActions';
import Api from '../../api';
import Image from 'react-bootstrap/Image'
import './profile.css';

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;

const Profile = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector(state => state.userUpdate);
  const { loading, error, data } = userUpdate;

  const [profile, setProfile] = useState({
    ...userInfo,
    password: ""
  });

  const [picMessage, setPicMessage] = useState(null);

  const onChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
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
        const { data:resp } = await Api.post(CLOUDINARY_URL, data)
        console.log(resp);
        setProfile({
          ...profile,
          imageURL: resp.url
        });
      }catch(err) {
        setPicMessage(err.response?.data?.error?.message || err?.message)
      }

    }else {
      setPicMessage(pic.type + " is not valid format. Please upload Image only")
    }
    
  }
  
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(updateProfile(profile));
  }
  useEffect(() => {
    data && setTimeout(() => navigate('/my-notes'), 5000);
  }, [data]);

  useEffect(() => {
    if(!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    (error || data) && setTimeout(() => {
      dispatch(clearError())
    }, 5000);
  }, [error, data, dispatch]);

  return <MainScreen title="EDIT PROFILE">
    <div className="loginContainer">
      { loading && <Loader /> }
      { error && <ErrorMessage variant='danger'> { error } </ErrorMessage> }
      { data && <ErrorMessage variant='success'> User update successfully! </ErrorMessage> }
      
      <Form onSubmit={submitHandler}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" 
              name="name"
              placeholder="Enter name"
              value={profile.name}
              onChange={onChange} 
              autoComplete="name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" 
              name="email"
              placeholder="Email address"
              value={profile.email}
              onChange={onChange} 
              autoComplete="current-email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" 
              name="password"
              placeholder="Password"
              value={profile.password}
              onChange={onChange} 
              autoComplete="current-password" />
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

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
          </Col>
          <Col className="text-center profile-container">
            <Image width="60%" src={profile.imageURL} />
          </Col>
        </Row>
        
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  </MainScreen>
}

export default Profile