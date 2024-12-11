// import React from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import moment from 'moment';
// import './editEventModal.css'; // Add your custom styling

// const EditEventModal = ({ showModal, setShowModal, modalEvent, setModalEvent, handleFormSubmit, handleDeleteEvent, isEditing }) => {
//   // Function to close the modal
//   const handleClose = () => setShowModal(false);

//   return (
//     <Modal show={showModal} onHide={handleClose} centered dialogClassName="custom-modal">
//       <Modal.Body className="modal-form-container">
//         <Form>
//           <div className="d-flex align-items-center mb-3">
//             <div style={{ backgroundColor: '#5B9BD5', width: '20px', height: '20px', borderRadius: '4px', marginRight: '10px' }}></div>
//             <Form.Group controlId="formEventTitle" className="flex-grow-1">
//               <Form.Label>Event Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={modalEvent.title}
//                 onChange={(e) => setModalEvent({ ...modalEvent, title: e.target.value })}
//                 placeholder="Enter event title"
//               />
//             </Form.Group>
//           </div>
//           <Form.Group controlId="formEventStart" className="mt-3">
//             <Form.Label>Start Time</Form.Label>
//             <Form.Control
//               type="datetime-local"
//               value={moment(modalEvent.start).format('YYYY-MM-DDTHH:mm')}
//               onChange={(e) => setModalEvent({ ...modalEvent, start: new Date(e.target.value) })}
//             />
//           </Form.Group>
//           <Form.Group controlId="formEventEnd" className="mt-3">
//             <Form.Label>End Time</Form.Label>
//             <Form.Control
//               type="datetime-local"
//               value={moment(modalEvent.end).format('YYYY-MM-DDTHH:mm')}
//               onChange={(e) => setModalEvent({ ...modalEvent, end: new Date(e.target.value) })}
//             />
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         {isEditing && (
//           <Button variant="danger" onClick={() => handleDeleteEvent(modalEvent)}>
//             Delete
//           </Button>
//         )}
//         <Button variant="secondary" onClick={handleClose}>
//           Cancel
//         </Button>
//         <Button variant="primary" onClick={handleFormSubmit}>
//           Save
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default EditEventModal;

import React from 'react';
import moment from 'moment';
import './editEventModal.css'; // Ensure this contains the styles mentioned below

const EditEventModal = ({ showModal, setShowModal, modalEvent, setModalEvent, handleFormSubmit, handleDeleteEvent, isEditing }) => {
  if (!showModal) return null; // Render nothing if modal is not shown

  return (
    <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{isEditing ? 'Edit Event' : 'Add Event'}</h3>
          <button className="close-button" onClick={() => setShowModal(false)}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="form-group">
              <label>Event Title</label>
              <input
                type="text"
                className="form-control"
                value={modalEvent.title}
                onChange={(e) => setModalEvent({ ...modalEvent, title: e.target.value })}
                placeholder="Enter event title"
              />
            </div>
            <div className="form-group">
              <label>Start Time</label>
              <input
                type="datetime-local"
                className="form-control"
                value={moment(modalEvent.start).format('YYYY-MM-DDTHH:mm')}
                onChange={(e) => setModalEvent({ ...modalEvent, start: new Date(e.target.value) })}
              />
            </div>
            <div className="form-group">
              <label>End Time</label>
              <input
                type="datetime-local"
                className="form-control"
                value={moment(modalEvent.end).format('YYYY-MM-DDTHH:mm')}
                onChange={(e) => setModalEvent({ ...modalEvent, end: new Date(e.target.value) })}
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          {isEditing && (
            <button className="delete-button" onClick={() => handleDeleteEvent(modalEvent)}>
              Delete
            </button>
          )}
          <button className="cancel-button" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button className="save-button" onClick={handleFormSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEventModal;
