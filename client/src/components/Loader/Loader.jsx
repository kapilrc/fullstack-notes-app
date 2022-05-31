import React from 'react'
import { Spinner } from 'react-bootstrap'
import './loader.css'

const Loader = ({ size }) => {
  return (
    <div className="loader">
      <Spinner
        style={{
          width: size,
          height: size
        }}
        animation="border"
      />
    </div>
  )
}

export default Loader