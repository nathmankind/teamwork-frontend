import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Toast } from "react-bootstrap";

import axios from "axios";

const EditPostModal = (props) => {
  const [postTitle, setPostTitle] = useState("");
  const [article, setArticle] = useState();
  const [gif, setGif] = useState();
  const [isFlagged, setIsFlagged] = useState();
  const [gifFile, setGifFile] = useState();
  const [showToast, setShowToast] = useState(false);

  const base_url = `http://localhost:8000/api/v1`;
  const token = JSON.parse(sessionStorage.getItem("user_payload")).token;

  useEffect(() => {
    if (props.show === true) {
      axios
        .get(`${base_url}/posts/${props.post_id}`, {
          headers: {
            token: `${token}`,
          },
        })
        .then((res) => {
          setArticle(res.data.data[0].article);
          setGif(res.data.data[0].gif);
          setPostTitle(res.data.data[0].title);
          setIsFlagged(res.data.data[0].is_flagged);
        });
    }
  }, [base_url, props.post_id, props.show, token]);

  const handleEditSubmit = () => {
    if (gifFile !== undefined) {
      const fileData = new FormData();
      fileData.append("gif", gifFile);
      fileData.append("title", postTitle);
      fileData.append("is_flagged", isFlagged);

      axios
        .put(`${base_url}/posts/${props.post_id}`, fileData, {
          headers: {
            token: `${token}`,
          },
        })
        .then(
          (response) => {
            if ([200, 201].includes(response.status)) {
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
    }

    if (article !== null) {
      const data = {
        title: postTitle,
        article: article,
        is_flagged: isFlagged,
      };
      axios
        .put(`${base_url}/posts/${props.post_id}`, data, {
          headers: {
            token: `${token}`,
          },
        })
        .then(
          (response) => {
            if ([200, 201].includes(response.status)) {
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
    }
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
        <Modal.Title id="contained-modal-title-vcenter">Edit Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Post Title</Form.Label>
          <Form.Control
            type="text"
            value={postTitle}
            onChange={(e) => {
              const { value } = e.target;
              setPostTitle(value);
            }}
          />
        </Form.Group>
        {article !== null && (
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Article</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={article}
              onChange={(e) => {
                const { value } = e.target;
                setArticle(value);
              }}
            />
          </Form.Group>
        )}
        {gif !== null && (
          <Form.Group>
            <img src={gif} alt="gif post" style={{ width: 250 }} />
            <Form.File
              id="exampleFormControlFile1"
              className="form-file-modal"
              label="Upload a new gif"
              name="gif"
              accept=".gif"
              onChange={(e) => {
                const file = e.target.files;
                setGifFile(file[0]);
              }}
            />
          </Form.Group>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPostModal;
