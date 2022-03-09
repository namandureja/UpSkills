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
import logo from './resume.svg'; // with import

import './style/login.css';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [error, setError] = React.useState('');
  const history = useHistory();

  const login = (e) => {
    e.preventDefault();
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: pass,
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then((res) => {
        if (res.status == 1) {
          console.log('login success');
          history.push('/admin/user-profile');
        } else if (res.status == 0) {
          setError('Error : Invalid Parameters');
        } else if (res.status == 2) {
          setError('Error: No user found');
        } else if (res.status == 3) {
          setError('Error : Invalid Password');
        }
      });
  };

  return (
    <>
      <Col lg="12" md="12">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <Row className="box-login">
              <Col lg="5">
                <div className="text-lg-left text-center text-muted mb-4 head-text">
                  <small>Sign in with credentials</small>
                </div>
                <Form
                  role="form"
                  onSubmit={(e) => {
                    login(e);
                  }}
                >
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        autoComplete="new-email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className="my-2">
                    <InputGroup className="input-group-alternative ">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        autoComplete="new-password"
                        name="password"
                        value={pass}
                        onChange={(e) => {
                          setPass(e.target.value);
                        }}
                        required
                      />
                    </InputGroup>
                  </FormGroup>

                  <div className="text-lg-left text-center">
                    <Button className="my-3" color="primary" type="submit">
                      Sign in
                    </Button>
                  </div>
                </Form>
                <div className="error-msg text-lg-left text-center">
                  {error}
                </div>
              </Col>
              <Col lg="6" className="img-wrap">
                <img src={logo} className="login-img" />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
