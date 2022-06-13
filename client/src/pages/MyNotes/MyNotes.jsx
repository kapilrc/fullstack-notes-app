import { useEffect, useState } from 'react';
import MainScreen from '../../components/MainContainer/MainScreen'
import { Link, useNavigate } from 'react-router-dom';
import { Accordion, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage, deleteNote, listNotes } from '../../actions/notesActions';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import ReactMarkDown from 'react-markdown';
import './mynotes.css'

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const notesList = useSelector(state => state.notesList);
  const { loading, error, notes } = notesList;

  const newNote = useSelector(state => state.noteCreate);
  const { success: successCreate } = newNote;

  const noteDeleteState = useSelector(state => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete, data: dataDelete } = noteDeleteState;

  const onDelete = id => {
    if(window.confirm('Are you sure you want to delete this note?')) {
      dispatch(deleteNote(id));
    }
  }

  useEffect(() => {
    dispatch(listNotes());
    if(!userInfo) {
      navigate('/');
    }
  }, [dispatch, successCreate, userInfo, dataDelete])
  
  useEffect(() => {
    error && setTimeout(() => {
      dispatch(clearMessage())
    }, 5000);
  }, [error, dispatch]);

  return (
    <MainScreen title="Welcome back Kapil">
      <Link to="/create-note">
        <Button size="lg">Create new note</Button>
      </Link>
      { loadingDelete && <Loader /> }
      { errorDelete && <ErrorMessage variant='danger'> { errorDelete } </ErrorMessage> }
      <Accordion defaultActiveKey={['0']} alwaysOpen>
        { loading && <Loader /> }

        { error && <ErrorMessage variant='danger'> { error } </ErrorMessage> }

        { !loading && 
          notes?.reverse()
          .filter(filteredNotes => filteredNotes?.title?.toLowerCase().includes(search.toLowerCase()))
          .map((note, idx) => (
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
                      <Button 
                        variant='danger' 
                        className='mx-2' 
                        disabled={loadingDelete}
                        onClick={() => onDelete(note._id)}>
                          {loadingDelete ? 'Deleting' : 'Delete'}
                        </Button>
                    </div>
                </Card.Header>
                <Accordion.Body>
                  <Card.Body className='p-1'>
                      <div className="badge bg-success mb-3">Category - {note.category}</div>
                      <blockquote className="blockquote mb-0">
                        <ReactMarkDown>
                          {note.content}
                        </ReactMarkDown>
                        <footer className="blockquote-footer mt-3">
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
        { !loading && notes?.length === 0 && <div className="text-center mt-5">No notes found! Please create a new note...</div> }
      </Accordion>     
    </MainScreen>
  )
}

export default MyNotes