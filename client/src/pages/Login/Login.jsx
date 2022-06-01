import React, { useState, useEffect } from 'react'
import './login.css'
import MainScreen from '../../components/MainContainer/MainScreen';
import { Form, Button, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, login } from '../../actions/userActions';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);

  const { loading, error, userInfo } = userLogin;
  
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }

  useEffect(() => {
    error && setTimeout(() => {
      dispatch(clearError())
    }, 5000);
  }, [error, dispatch]);

  useEffect(() => {
    userInfo && navigate('/my-notes');
  }, [userInfo]);

  return <MainScreen title="LOGIN">
    <div className="loginContainer">
      { loading && <Loader /> }
      { error && <ErrorMessage variant='danger'> { error } </ErrorMessage> }
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
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