import { useEffect, useState } from 'react';
import MainScreen from '../../components/MainContainer/MainScreen'
import { Link } from 'react-router-dom';
import { Accordion, Badge, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import './mynotes.css'

const MyNotes = () => {
  const [notes, setNotes] = useState([]);

  const onDelete = id => {
    console.log("deleting ", id)
  }

  const getNotes = async () => {
    const { data } = await axios.get('http://localhost:3001/api/notes');
    setNotes(data);
  }

  useEffect(() => getNotes, [])

  return (
    <MainScreen title="Welcome back Kapil">
      <Link to="/create-note">
        <Button size="lg">Create new note</Button>
      </Link>
      <Accordion defaultActiveKey={['0']} alwaysOpen>
      {
        notes.map((note, idx) => (
          <Accordion.Item key={note._id} eventKey={idx}>
            <Card style={{ marginTop: 10 }}>
              <Card.Header style={{ display: "flex", alignItems: 'center' }}>
                <span style={{
                  flex: 1, 
                  fontSize: '1.2rem',
                  cursor: 'pointer'
                  }}>
                  <Accordion.Header as={Card.Text}>
                    {note.title}
                  </Accordion.Header>
                </span>
                  <div>
                    <Link to={`/note/${note._id}`}><Button>Edit</Button></Link>
                    <Button variant='danger' className='mx-2' onClick={() => onDelete(note._id)}>Delete</Button>
                  </div>
              </Card.Header>
              <Accordion.Body eventKey="0">
                <Card.Body>
                    <div className="badge bg-success mb-3">Category - {note.category}</div>
                    <blockquote className="blockquote mb-0">
                      <p>
                        {note.content}
                      </p>
                      <footer className="blockquote-footer">
                        created on - date
                      </footer>
                    </blockquote>
                </Card.Body>
              </Accordion.Body>
            </Card>
          </Accordion.Item>
        ))
      }
      </Accordion>     
    </MainScreen>
  )
}

export default MyNotes