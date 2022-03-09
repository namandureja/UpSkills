import React from 'react';
import { useHistory } from 'react-router';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from 'reactstrap';

import './style/login.css';
import logo from './resume.svg'; // with import

const Register = () => {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [error, setError] = React.useState('');

  const history = useHistory();

  const signup = (e) => {
    e.preventDefault();
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: pass,
        username: username,
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then((res) => {
        if (res.status == 1) {
          console.log('Success!');
          history.push('/admin/user-profile');
        } else if (res.status == 0) {
          setError('Error : Invalid Parameters');
        } else if (res.status == 2) {
          setError('Error: User already exists');
        }
      });
  };

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4 head-text">
              <small>Sign up with credentials</small>
            </div>
            <Form
              role="form"
              onSubmit={(e) => {
                signup(e);
              }}
            >
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Username"
                    name="username"
                    required
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    required
                    autoComplete="new-email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    name="password"
                    required
                    type="password"
                    autoComplete="new-password"
                    value={pass}
                    onChange={(e) => {
                      setPass(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormGroup>

              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Create account
                </Button>
              </div>
            </Form>
            <div className="error-msg text-center mt-3">{error}</div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
