import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Modal,
  Icon,
  Grid,
  Message,
} from "semantic-ui-react";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";

const { Field } = Form;

export const EditPostModal = ({ postId, ...rest }) => {
  const [open, setOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [article, setArticle] = useState("");
  const [gif, setGif] = useState();
  const [posts, setPosts] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const base_url = `http://localhost:8000/api/v1`;
  const token = JSON.parse(sessionStorage.getItem("user_payload")).token;

  useEffect(() => {
    axios
      .get(`${base_url}/posts/${postId}`, {
        headers: {
          token: `${token}`,
        },
      })
      .then((res) => {
        setPosts(res.data.data);
        console.log(res.data.data);
      });
  }, [base_url, postId, token]);

  useEffect(() => {
    if (open && posts !== []) {
      setArticle(posts[0].article);
      setPostTitle(posts[0].title);
    }
  }, [posts, open]);

  //   const clearForm = () => {
  //     setFirstName("");
  //     setLastName("");
  //     setEmail("");
  //     setPhoneNumber("");
  //   };

  const close = () => {
    setOpen(false);
    setSuccess(false);
  };
  const clearMessage = () => {
    setSuccess(false);
    setError(false);
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setOpen(false);
        window.location.reload();
      }, 1000);
    }
  }, [success]);

  return (
    <Modal
      // className="o-admin__edit-modal"
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      size="small"
      trigger={
        <AiFillEdit
          style={{ width: 30, height: 25, color: "#c1c1c1" }}
          onClick={() => {
            setOpen(true);
          }}
          {...rest}
        />
      }
    >
      <Modal.Header>Edit Profile</Modal.Header>
      <Modal.Content>
        <Grid centered>
          <Grid.Column width="16">
            {error && <Message error header="Error" content="An error occur" />}
            {success && (
              <Message
                success
                header="Update was successful"
                content="Post has been successfully updated"
              />
            )}
            <Form>
              <Field>
                <label>Post Title</label>
                <Input
                  placeholder="Enter first name"
                  type="text"
                  value={postTitle}
                  onChange={(e) => {
                    setPostTitle(e.target.value);
                    clearMessage();
                  }}
                />
                <label>Article</label>
                <Input
                  placeholder="Enter first name"
                  type="text"
                  value={article}
                  onChange={(e) => {
                    setArticle(e.target.value);
                    clearMessage();
                  }}
                />
              </Field>
            </Form>
          </Grid.Column>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="red"
          inverted
          onClick={() => {
            close();
          }}
        >
          No
        </Button>

        <Button
          color="blue"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
