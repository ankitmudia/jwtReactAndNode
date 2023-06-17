import { useState } from "react";
import { setToken } from "../services/token.service";
import { login } from "../services/user.service";

function LoginForm(props) {
  const [formData, setFormData] = useState({
    email: "patelvirendra62@gmail.com",
    password: "1234567890",
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    login(formData)
      .then((response) => {
        const {
          data: { message, token, type },
        } = response;

        setToken({ token, type });

        setSuccessMessage(message);
        setErrorMessage(null);
      })
      .catch((error) => {
        const {
          response: {
            data: { message },
          },
        } = error;
        setSuccessMessage(null);
        setErrorMessage(message);
      });
  };

  const handleOnChange = ({ target: { name, value } }) => {
    // if(name == 'email'){
    //     return setFormData({
    //         ...formData ,
    //         email : value
    //     })
    // }

    // if (name == "password") {
    //   return setFormData({
    //     ...formData,
    //     password: value,
    //   });
    // }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h4>Login Form.</h4>
      <hr />

      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      {successMessage && (
        <p className="alert alert-success">{successMessage}</p>
      )}

      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label>Email address</label>
          <input
            name="email"
            type="email"
            onChange={handleOnChange}
            value={formData.email}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            name="password"
            type="password"
            onChange={handleOnChange}
            value={formData.password}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-success">
          Login
        </button>
      </form>
    </div>
  );
}

export { LoginForm };
