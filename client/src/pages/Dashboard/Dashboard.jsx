import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import './dashboard.css'

const Dashboard = () => {
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
              <a href="/login">
                <Button size="lg" className='landingBtn'>Login</Button>
              </a>
              <a href="/register">
                <Button size="lg" className='landingBtn' variant='outline-primary'>Register</Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default Dashboard