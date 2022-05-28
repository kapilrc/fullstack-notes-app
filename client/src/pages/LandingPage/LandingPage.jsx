import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import './landing.css'
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className='main'>
      <Container fluid="sm">
        <Row>
          <div className="intro-text">
            <div>
              <h1 className='title'>Welcome to the Notes App</h1>
              <p className='subtitle'>A safe place for all your notes</p>
            </div>
            <div className="buttonContainer">
              <Link to="/login">
                <Button size="lg" className='landingBtn'>Login</Button>
              </Link>
              <Link to="/register">
                <Button size="lg" className='landingBtn' variant='outline-primary'>Register</Button>
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default LandingPage