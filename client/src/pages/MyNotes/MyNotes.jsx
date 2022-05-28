import MainScreen from '../../components/MainContainer/MainScreen'
import { Link } from 'react-router-dom';
import { Badge, Button, Card } from 'react-bootstrap';
import notes from './../../db/notes.json'

const MyNotes = () => {

  const onDelete = id => {
    console.log("deleting ", id)
  }

  return (
    <MainScreen title="Welcome back Kapil">
      <Link to="/create-note">
        <Button size="lg">Create new note</Button>
      </Link>

      {
        notes.map(note => (
          <Card key={note._id} style={{ margin: 10 }}>
            <Card.Header style={{ display: "flex", alignItems: 'center' }}>
              <span style={{
                flex: 1, 
                fontSize: '1.2rem',
                cursor: 'pointer'
              }}>{note.title}</span>
              <div>
                <Link to={`/note/${note._id}`}><Button>Edit</Button></Link>
                <Button variant='danger' className='mx-2' onClick={() => onDelete(note._id)}>Delete</Button>
              </div>
            </Card.Header>
            <Card.Body>
              <div class="badge bg-success mb-3">Category - {note.category}</div>
              <blockquote className="blockquote mb-0">
                <p>
                  {note.content}
                </p>
                <footer className="blockquote-footer">
                  created on - date
                </footer>
              </blockquote>
            </Card.Body>
          </Card>
        ))
      }

        
    </MainScreen>
  )
}

export default MyNotes