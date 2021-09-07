import React, { useContext, useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { UserData } from "../../App";
import { googleSignIn, signInWithEmail } from "../../component/utils/Auth";
import { useHistory, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState(null);
  const [loggenIn, setLoggedIn] = useContext(UserData);

  let location = useLocation();
  let history = useHistory();
  let { from } = location.state || { from: { pathname: "/" } };

  const onSubmit = async (data) => {
    setError(null);
    const res = await  signInWithEmail(data.email, data.password)
      if (res.email) {
        setLoggedIn(res);
        history.push(from);
      } else {
        setError(res);
      }
  };
  const google = async () =>{
    const res = await googleSignIn()
    if (res.email) {
      setLoggedIn(res);
      history.push(from);
    } else {
      setError(res);
    }
  }
  return (
    <Container>
      <Card className="p-5 mx-auto my-5 form" style={{ width: "500px" }}>
        <h2>Login</h2>
        {error && <span>*{error}</span>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mt-4">
            <Form.Control
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
            />
            {errors.email && <span>*This field is required</span>}
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Control
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
            />
            {errors.password && <span>*This field is required</span>}
          </Form.Group>
          <Button className="w-100 orange-btn mt-5" type="submit">
            Login
          </Button>
        </Form>
        <p className="my-2 text-center">
          Don’t have an account?{" "}
          <Link to="/register">
            <u className="orange">Create an account</u>
          </Link>
        </p>
        <p className="mt-3 p-2 border rounded-pill text-center" style={{cursor: 'pointer'}} onClick={google}>
          <FcGoogle style={{fontSize: '2rem'}}/>
        </p>
      </Card>
    </Container>
  );
};

export default Login;
