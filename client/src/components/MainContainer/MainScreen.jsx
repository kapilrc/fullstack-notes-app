import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import './mainscreen.css'
import { Link } from 'react-router-dom';

const MainScreen = ({ children, title }) => {
  return (
    <div className='mainback'>
      <Container fluid="sm">
        <Row>
          <div className="page">
            { title && (
              <>
                <h1 className="heading">{title}</h1>
                <hr />
              </>
            )}
            { children }
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default MainScreen