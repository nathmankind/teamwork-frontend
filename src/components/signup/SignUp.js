import React, { useState } from "react";
import { Form, Col, Button, Container, Toast } from "react-bootstrap";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [address, setAddress] = useState("");
  const [showToast, setShowToast] = useState(false);

  const base_url = process.env.REACT_APP_BACKEND_URL;

  const formSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      gender: gender,
      job_role: jobRole,
      department: department,
      address: address,
      //   is_admin: isAdmin,
    };
    axios.post(`${base_url}/auth/signup`, data).then(
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
  };

  return (
    <div>
      <div>
        <Container>
          <div className="form-wrapper">
            <h1>Create user</h1>
            <Form>
              <Form.Row>
                <Form.Group as={Col} md="6" sm="12" xs="12">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    placeholder="First name"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" sm="12" xs="12">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={lastName}
                    placeholder="Last name"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => {
                    const { value } = e.target;
                    setEmail(value);
                  }}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <Form.Text id="passwordHelpInline" muted>
                  Must be 8-20 characters long.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  placeholder="1234 Main St"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  custom
                >
                  <option value="">Select option</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formGridDepartment">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  placeholder="Maintenance"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formGridJobRole">
                <Form.Label>Job Role</Form.Label>
                <Form.Control
                  placeholder="Asst. Maintenance Supervisor"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                />
              </Form.Group>

              {/* <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>User Type</Form.Label>
                <Form.Control
                  as="select"
                  value={userType}
                  onChange={(e) => {
                    const { value } = e.target;
                    setuserType(value);

                    value === "employee" ? setIsAdmin(false) : setIsAdmin(true);
                  }}
                  custom
                >
                  <option value="">Select uer type</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </Form.Control>
              </Form.Group> */}

              <Toast show={showToast} onClose={() => setShowToast(!showToast)}>
                <Toast.Header>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded mr-2"
                    alt=""
                  />
                  <strong className="mr-auto">User create Successful</strong>
                </Toast.Header>
                <Toast.Body>Your creating was successful</Toast.Body>
              </Toast>
              <Button variant="primary" type="submit" onClick={formSubmit}>
                Submit
              </Button>
            </Form>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default SignUp;
