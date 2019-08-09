import React from "react";
import { Form, Field, withFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

class FormComponent extends React.Component {
  constructor(props) {
    super();
    console.log(props);
    //const { values, touched, errors, status } = props;
    // this.state = {
    //   username: "",
    //   password: ""
    // };
  }

  render() {
    return (
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
  handleSubmit: (values, { resetForm, setStatus, setErrors }) => {
    axios
      .post("http://localhost:5000/api/register", values)
      .then(res => {
        console.log(res);
        setStatus(res);
        resetForm();
      })
      .catch(error => {
        console.log("error", error);
      });
  }
})(FormComponent);

export default FormikForm;
