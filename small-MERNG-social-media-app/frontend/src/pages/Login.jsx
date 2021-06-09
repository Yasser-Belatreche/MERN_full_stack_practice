import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useGlobalContext } from "../context/auth";

const Login = (props) => {
  const { login } = useGlobalContext();

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });

  const handleInputsChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [addUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      login(userData);
      props.history.push("/");
    },
    onError(err) {
      if (err.graphQLErrors[0].extensions.errors) {
        setErrors({ ...err.graphQLErrors[0].extensions.errors });
      } else {
        setErrors({ error: err.message });
      }
    },
    variables: {
      ...values,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  return (
    <div className="Register">
      <Form onSubmit={handleSubmit} className={loading ? "loading" : ""}>
        <h1>Login</h1>
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
          label="Password"
          type="password"
          placeholder="Password..."
          name="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={handleInputsChanges}
        />

        <Button type="submit" primary>
          Login
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

const LOGIN_USER = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      id
      email
      userName
      createdAt
      token
    }
  }
`;

export default Login;
