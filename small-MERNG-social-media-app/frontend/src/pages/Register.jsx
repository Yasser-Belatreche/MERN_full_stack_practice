import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useGlobalContext } from "../context/auth";
import { useMutation } from "@apollo/client";

const Register = (props) => {
  const { login } = useGlobalContext();

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputsChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      ...values,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser();
    console.log(errors);
  };

  return (
    <div className="Register">
      <Form onSubmit={handleSubmit} className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          type="text"
          placeholder="Username..."
          name="userName"
          value={values.userName}
          error={errors.userName ? true : false}
          onChange={handleInputsChanges}
        />
        <Form.Input
          label="Email"
          type="text"
          placeholder="Email..."
          name="email"
          value={values.email}
          error={errors.email ? true : false}
          onChange={handleInputsChanges}
        />
        <Form.Input
          label="Password"
          type="password"
          placeholder="Password..."
          name="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={handleInputsChanges}
        />
        <Form.Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          value={values.confirmPassword}
          error={errors.password ? true : false}
          onChange={handleInputsChanges}
        />

        <Button type="submit" primary>
          Register
        </Button>
      </Form>

      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((err) => {
              return <li key={err}>{err}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $userName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        userName: $userName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      userName
      createdAt
      token
    }
  }
`;

export default Register;
