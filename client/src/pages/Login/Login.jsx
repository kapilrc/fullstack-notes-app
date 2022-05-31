import React, { useState, useEffect } from 'react'
import './login.css'
import MainScreen from '../../components/MainContainer/MainScreen';
import { Form, Button, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userInfo, setUserInfo] = useState(localStorage.getItem('userInfo'))

  const navigate = useNavigate();
  
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(email, password);

    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }
      setLoading(true);
      const { data } = await axios.post('http://localhost:3001/api/user/login', {
        email, password
      }, config);
      
      setUserInfo(() => localStorage.setItem("userInfo", JSON.stringify(data)))
      
    }catch(err) {
      console.log(err?.response?.data?.message);
      setError(err?.response?.data?.message);
      
    }finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    error && setTimeout(() => {
      setError(false)
    }, 5000);
  }, [error]);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');

    userInfo && navigate('/my-notes');
  }, [userInfo]);

  return <MainScreen title="LOGIN">
    <div className="loginContainer">
      { loading && <Loader /> }
      { error && <ErrorMessage variant='danger'> { error } </ErrorMessage> }
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <Button disabled={ !email && !password } variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Row className='py-3'>
        New Customer? <Link to="/register">Register here</Link>
      </Row>
    </div>
  </MainScreen>
}

export default Login