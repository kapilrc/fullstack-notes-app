import { useEffect, useState } from 'react';
import MainScreen from '../../components/MainContainer/MainScreen'
import { Link } from 'react-router-dom';
import { Accordion, Badge, Button, Card } from 'react-bootstrap';
import './mynotes.css'
import { useDispatch, useSelector } from 'react-redux';
import { listNotes } from '../../actions/notesActions';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const MyNotes = () => {
  const dispatch = useDispatch();

  const notesList = useSelector(state => state.notesList);
  const { loading, error, notes } = notesList;

  const onDelete = id => {
    console.log("deleting ", id)
  }

  useEffect(() => {
    dispatch(listNotes());
  }, [dispatch])
  
  useEffect(() => {
    error && setTimeout(() => {
      dispatch(clearError())
    }, 5000);
  }, [error, dispatch]);

  return (
    <MainScreen title="Welcome back Kapil">
      <Link to="/create-note">
        <Button size="lg">Create new note</Button>
      </Link>
      <Accordion defaultActiveKey={['0']} alwaysOpen>
        {
          loading && <Loader />
        }
        {
          notes?.map((note, idx) => (
            <Accordion.Item key={note._id} eventKey={idx}>
              <Card style={{ marginTop: 10 }}>
                <Card.Header style={{ display: "flex", alignItems: 'center' }}>
                  <span style={{
                    flex: 1, 
                    fontSize: '1.2rem',
                    cursor: 'pointer'
                    }}>
                    <Accordion.Header as={Card.Text}>
                      {note.title} 1
                    </Accordion.Header>
                  </span>
                    <div>
                      <Link to={`/note/${note._id}`}><Button>Edit</Button></Link>
                      <Button variant='danger' className='mx-2' onClick={() => onDelete(note._id)}>Delete</Button>
                    </div>
                </Card.Header>
                <Accordion.Body>
                  <Card.Body>
                      <div className="badge bg-success mb-3">Category - {note.category}</div>
                      <blockquote className="blockquote mb-0">
                        <p>
                          {note.content}
                        </p>
                        <footer className="blockquote-footer">
                          created on {" "}
                          <cite title="Source Title">
                            {note.createdAt.substring(0, 10)}
                          </cite>
                        </footer>
                      </blockquote>
                  </Card.Body>
                </Accordion.Body>
              </Card>
            </Accordion.Item>
          ))
        }
        { error && <ErrorMessage variant='danger'> { error } </ErrorMessage> }
      </Accordion>     
    </MainScreen>
  )
}

export default MyNotes