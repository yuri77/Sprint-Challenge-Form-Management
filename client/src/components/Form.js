import React from "react";
import { Form, Field, withFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

class FormComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      users: []
    };
  }

  componentDidUpdate(prevProps, presState) {
    if (prevProps.status !== this.props.status) {
      //const headers = { authorization: this.props.status.token };
      axios
        .get("http://localhost:8000/api/restricted/data")
        .then(res => {
          console.log("response from status change", res.data);
          this.setState({ users: res.data });
        })
        .catch(error => {
          console.log("error");
        });
    }
  }

  render() {
    //const { values, touched, errors, status } = props;
    return (
      <>
        <label>
          User Login Page
          <Form>
            <label>
              UserName
              <Field type="text" name="username" placeholder="username" />
              {this.props.touched.username && this.props.errors.username && (
                <p className="error">{this.props.errors.username}</p>
              )}
            </label>
            <label>
              Password
              <Field type="password" name="password" placeholder="password" />
              {this.props.touched.password && this.props.errors.password && (
                <p className="error">{this.props.errors.password}</p>
              )}
            </label>
            <button type="submit">Submit</button>
          </Form>
        </label>
        <div>
          {this.users ? (
            this.users.map(user => <div key={user.id}>{user.name}</div>)
          ) : (
            <p>none</p>
          )}
        </div>
      </>
    );
  }
}

const FormikForm = withFormik({
  mapPropsToValues: ({ username, password }) => {
    console.log("formik props", username);
    return {
      username: username || "",
      password: password || ""
    };
  },
  validationSchema: yup.object().shape({
    username: yup.string().required("username is a required field"),
    password: yup
      .string()
      .min(4, "Password must be at least 4 characters long")
      .required("password is required")
  }),
  handleSubmit: (values, { resetForm, setStatus }) => {
    console.log("axios", values);
    axios
      .post("http://localhost:8000/api/register", values)
      .then(res => {
        console.log("Res from posting", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(error => {
        console.log("error", error);
      });
  }
})(FormComponent);

function UserCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.course}</p>
      <p>{props.technique}</p>
    </div>
  );
}

export default FormikForm;
