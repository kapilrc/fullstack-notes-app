import React, { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import './mainscreen.css'

const MainScreen = ({ children, title }) => {

  useEffect(() => {
    document.title = title;
  }, [title]);

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