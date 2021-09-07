import React, { useContext, useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { googleSignIn, registerWithEmail } from "../../component/utils/Auth";
import "./Register.css";
import { useHistory, useLocation } from "react-router-dom";
import { UserData } from "../../App";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
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
    if (data.password !== data.cf_password)
      return setError("Password not matched");
    const res = await registerWithEmail(data.name, data.email, data.password);
    if (res.email) {
      setLoggedIn({...res, fullName: data.name});
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
        <h2>Create an account</h2>
        {error && <span>*{error}</span>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mt-3">
            <Form.Control
              type="text"
              {...register("name", { required: true })}
              placeholder="Name"
            />
            {errors.name && <span>*This field is required</span>}
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Control
              type="text"
              {...register("email", {
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <span>*This field is required</span>
            )}
            {errors.email?.type === "pattern" && <span>*Invalid Email</span>}
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Control
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <span>*This field is required</span>
            )}
            {errors.password?.type === "minLength" && (
              <span>*Password must be 6 characters long.</span>
            )}
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Control
              type="password"
              {...register("cf_password", { required: true })}
              placeholder="Confirm Password"
            />
            {errors.cf_password && <span>*This field is required</span>}
          </Form.Group>
          <Button className="w-100 orange-btn mt-4" type="submit">
            Create an account
          </Button>
        </Form>
        <p className="my-2 text-center">
          Already have an account?{" "}
          <Link to="/login">
            <u className="orange">Login</u>
          </Link>
        </p>
        <p className="mt-3 p-2 border rounded-pill text-center" style={{cursor: 'pointer'}} onClick={google}>
          <FcGoogle style={{fontSize: '2rem'}}/>
        </p>
      </Card>
    </Container>
  );
};

export default Register;
