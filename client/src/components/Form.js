import React from "react";
import { Form, Field, withFormik } from "formik";

class FormComponent extends React.Component {
  constructor() {
    super(props);
    console.log(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  render() {
    return (
      <Form>
        <Field type="text" name="username" placeholder="username" />
        <Field type="password" name="password" placeholder="password" />
        <button type="submit">Submit</button>
      </Form>
    );
  }
}

const FormikForm = withFormik({
  mapPropsToValues: ({ username, password }) => {
    return {
      username: username || "",
      password: password || ""
    };
  }
})(FormComponent);

export default FormikForm;
