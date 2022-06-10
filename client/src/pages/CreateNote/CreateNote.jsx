import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNote, clearError } from '../../actions/notesActions';
import MainScreen from '../../components/MainContainer/MainScreen';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { Form, Button, Card, Tabs, Tab } from 'react-bootstrap';
import ReactMarkDown from 'react-markdown';

const CreateNote = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emptyNote = {
    title: '',
    content: '',
    category: ''
  }

  const [note, setNote] = useState({...emptyNote});

  const newNote = useSelector(state => state.noteCreate);
  const { loading, error, success } = newNote;

  const submitHandler = (e) => {
    e.preventDefault();
    
    const { title, content, category } = note;
    if(!title || !content || !category) {
      // dispatch(createNoteError("Please provide all required fields")); WIP
      return;
    };
     dispatch(createNote(note))
  }

  useEffect(() => {
    if(success && note.title) {
      setNote({...emptyNote});
      navigate('/my-notes');
    } 
  }, [success]);

  useEffect(() => {
    error && setTimeout(() => {
      dispatch(clearError());
    }, 5000);
  }, [error, dispatch]);

  return (
    <MainScreen title="NEW NOTE">
      <Card>
        <Card.Header>
          Create a new Note
        </Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            { loading && <Loader /> }
            { error && <ErrorMessage variant='danger'> { error } </ErrorMessage> }
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title *</Form.Label>
              <Form.Control 
                type="text"
                value={note.title}
                placeholder="Title"
                onChange={(e) => setNote({...note, title: e.target.value})}
              />
            </Form.Group>

            <Tabs defaultActiveKey="content" className="mb-3">
              <Tab eventKey="content" title="Content" className="mb-3">
                <Form.Group controlId="content">
                  <Form.Control 
                    as="textarea"
                    rows={5}
                    value={note.content}
                    placeholder="Content"
                    onChange={(e) => setNote({...note, content: e.target.value})}
                  />
                </Form.Group>
              </Tab>
              <Tab eventKey="preview" title="Preview" className="mb-3">
                <Card>
                  <Card.Header>
                    Note Preview
                  </Card.Header>
                  <Card.Body>
                    <ReactMarkDown>{note.content}</ReactMarkDown>
                  </Card.Body>
                </Card>
              </Tab>
            </Tabs>

            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category *</Form.Label>
              <Form.Control 
                type="text" 
                value={note.category}
                placeholder="Category"
                onChange={(e) => setNote({...note, category: e.target.value})}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className='mb-3'>
              Submit
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - { new Date().toLocaleDateString() }
        </Card.Footer>
      </Card>
    </MainScreen>
  )
}

export default CreateNote