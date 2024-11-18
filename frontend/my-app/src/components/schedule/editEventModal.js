import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import moment from 'moment';

const EditEventModal = ({ showModal, setShowModal, modalEvent, setModalEvent, handleFormSubmit, handleDeleteEvent, isEditing }) => {
  // Function to close the modal
  const handleClose = () => setShowModal(false);

  return (
    <Modal show={showModal} onHide={handleClose} centered dialogClassName="custom-modal">
      <Modal.Body className="modal-form-container">
        <Form>
          <div className="d-flex align-items-center mb-3">
            <div style={{ backgroundColor: '#5B9BD5', width: '20px', height: '20px', borderRadius: '4px', marginRight: '10px' }}></div>
            <Form.Group controlId="formEventTitle" className="flex-grow-1">
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                type="text"
                value={modalEvent.title}
                onChange={(e) => setModalEvent({ ...modalEvent, title: e.target.value })}
                placeholder="Enter event title"
              />
            </Form.Group>
          </div>
          <Form.Group controlId="formEventStart" className="mt-3">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={moment(modalEvent.start).format('YYYY-MM-DDTHH:mm')}
              onChange={(e) => setModalEvent({ ...modalEvent, start: new Date(e.target.value) })}
            />
          </Form.Group>
          <Form.Group controlId="formEventEnd" className="mt-3">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={moment(modalEvent.end).format('YYYY-MM-DDTHH:mm')}
              onChange={(e) => setModalEvent({ ...modalEvent, end: new Date(e.target.value) })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {isEditing && (
          <Button variant="danger" onClick={() => handleDeleteEvent(modalEvent)}>
            Delete
          </Button>
        )}
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleFormSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditEventModal;
