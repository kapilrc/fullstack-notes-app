import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage, updateNote, getANote } from '../../actions/notesActions';
import MainScreen from '../../components/MainContainer/MainScreen';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { Form, Button, Card, Tabs, Tab } from 'react-bootstrap';
import ReactMarkDown from 'react-markdown';

const EditNote = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [note, setNote] = useState({
    title: '',
    content: '',
    category: '',
    updatedAt: ''
  });

  const updatedNoteState = useSelector( state => state.noteUpdate );
  const { loading, error, updatedNote } = updatedNoteState;


  const currentNoteState = useSelector( state => state.noteGet );
  const { error: currentNoteError, note: currentNote } = currentNoteState;

  const submitHandler = (e) => {
    e.preventDefault();
    
    const { title, content, category } = note;
    if(!title || !content || !category) {
      // dispatch(createNoteError("Please provide all required fields")); WIP
      return;
    };
    dispatch(updateNote(note));
  }

  useEffect(() => {
    dispatch(getANote(id));
  }, [id]);

  useEffect(() => {
    setNote(currentNote);
  }, [currentNote]);

  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value
    });
  };  

  useEffect(() => {
    if(updatedNote) {
      navigate('/my-notes');
      dispatch(clearMessage());
    }
  }, [updatedNote, dispatch]);

  useEffect(() => {
    (error) && setTimeout(() => {
      dispatch(clearMessage());
    }, 5000);
  }, [error, dispatch]);

  return (
    <MainScreen title="Edit Note">
      { currentNoteError ? 
        <ErrorMessage variant='danger'> { currentNoteError } </ErrorMessage> 
        :

        <Card>
        <Card.Header>
          Edit a note
        </Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            { loading && <Loader /> }
            { (error || currentNoteError) && <ErrorMessage variant='danger'> { error || currentNoteError } </ErrorMessage> }
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title *</Form.Label>
              <Form.Control 
                type="text"
                value={note?.title}
                name="title"
                placeholder="Title"
                onChange={onChange}
              />
            </Form.Group>

            <Tabs defaultActiveKey="content" className="mb-3">
              <Tab eventKey="content" title="Content" className="mb-3">
                <Form.Group controlId="content">
                  <Form.Control 
                    as="textarea"
                    rows={5}
                    value={note?.content}
                    name="content"
                    placeholder="Content"
                    onChange={onChange}
                  />
                </Form.Group>
              </Tab>
              <Tab eventKey="preview" title="Preview" className="mb-3">
                <Card>
                  <Card.Header>
                    Note Preview
                  </Card.Header>
                  <Card.Body>
                    <ReactMarkDown>{note?.content}</ReactMarkDown>
                  </Card.Body>
                </Card>
              </Tab>
            </Tabs>

            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category *</Form.Label>
              <Form.Control 
                type="text" 
                name="category"
                value={note?.category}
                placeholder="Category"
                onChange={onChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className='mb-3'>
              Submit
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          { note?.updatedAt ? `Created on - ${new Date(note.updatedAt).toLocaleDateString()}` : 'loading...' }
        </Card.Footer>
      </Card>
      
      }
    </MainScreen>
  )
}

export default EditNote