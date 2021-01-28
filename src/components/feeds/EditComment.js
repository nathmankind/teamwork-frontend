import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Toast, Spinner } from "react-bootstrap";
import { CommentsSelectors } from "../store";
import axios from "axios";
import { useSelector } from "react-redux";

const EditCommentModal = (props) => {
  const [comment, setComment] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const base_url = `http://localhost:8000/api/v1`;
  const token = JSON.parse(sessionStorage.getItem("user_payload")).token;

  const { selectAllComments } = CommentsSelectors;
  const allComments = useSelector(selectAllComments);

  useEffect(() => {
    if (props.show === true && allComments !== undefined) {
      const data = allComments.data.data.find((comment) => {
        return comment.id === props.commentId;
      });
      setComment(data.comment);
    }
  }, [allComments, props.show, props.commentId]);

  const handleEditSubmit = () => {
    const data = {
      comment: comment,
    };

    axios
      .put(`${base_url}/comments/${props.commentId}`, data, {
        headers: {
          token: `${token}`,
        },
      })
      .then(
        (response) => {
          if ([200, 201].includes(response.status)) {
            setIsClicked(false);
            setTimeout(() => {
              setShowToast(true);
              window.location.reload();
            }, 3000);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <Modal
      {...props}
      show={props.show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Toast show={showToast} onClose={() => setShowToast(!showToast)}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Edit Successful</strong>
          </Toast.Header>
          <Toast.Body>Your edit was successful</Toast.Body>
        </Toast>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Comment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            onChange={(e) => {
              const { value } = e.target;
              setComment(value);
            }}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        {isClicked ? (
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="sr-only">Loading...</span>
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => {
              handleEditSubmit(setIsClicked(true));
            }}
          >
            Save
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default EditCommentModal;
