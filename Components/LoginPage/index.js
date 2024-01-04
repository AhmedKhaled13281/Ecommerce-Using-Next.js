import React from 'react'
import { Container , Row , Col} from 'react-bootstrap'
import bg from '../../assets/bg.jpg'
import LoginForm from './LoginForm'

const LoginPage = () => {
  return (
    <Container className=" rounded-4 mx-auto p-3 ">
      <Row style={{height : "100%"}}>
        <Col lg={6} md={6} sm={12} className="loginBg">
          <div>
          <h1 style={{fontSize : "50px"}} >Welcome Back!</h1>
            </div>
        </Col>
        <Col className="p-5 mx-auto bg-light">
            <LoginForm />
        </Col>
      </Row>
    </Container>
  );
}


export default LoginPage

