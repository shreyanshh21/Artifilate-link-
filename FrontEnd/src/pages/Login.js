import { useState } from "react";
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { serverEndpoint } from "../config/config";
import { useDispatch } from "react-redux";
import { SET_USER } from "../redux/user/actions";

function Login() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let isValid = true;
    let newErrors = {};

    if (formData.username.length === 0) {
      isValid = false;
      newErrors.username = "Username is mandatory";
    }

    if (formData.password.length === 0) {
      isValid = false;
      newErrors.password = "Password is mandatory";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const body = {
        username: formData.username,
        password: formData.password
      };
      const config = { withCredentials: true };
      try {
        const response = await axios.post(`${serverEndpoint}/auth/login`, body, config);
        dispatch({
          type: SET_USER,
          payload: response.data.user
        });
      } catch (error) {
        console.log(error);
        setErrors({ message: "Something went wrong, please try again" });
      }
    }
  };

  const handleGoogleSuccess = async (authResponse) => {
    try {
      const response = await axios.post(`${serverEndpoint}/auth/google-auth`, {
        idToken: authResponse.credential
      }, {
        withCredentials: true
      });
      dispatch({
        type: SET_USER,
        payload: response.data.user
      });
    } catch (error) {
      console.log(error);
      setErrors({ message: 'Error processing google auth, please try again' });
    }
  };

  const handleGoogleError = async (error) => {
    console.log(error);
    setErrors({ message: 'Error in google authorization flow, please try again' });
  }

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <h2>Sign in to Continue</h2>

          {errors.message && (
            <div className="error-message">
              {errors.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? "input-error" : ""}
              />
              {errors.username && (
                <div className="input-error-message">
                  {errors.username}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && (
                <div className="input-error-message">
                  {errors.password}
                </div>
              )}
            </div>

            <button type="submit" className="submit-button">Submit</button>
          </form>

          <div className="divider">OR</div>

          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </GoogleOAuthProvider>
        </div>
      </div>

      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #4f46e5, #6d28d9);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .login-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 40px 30px;
          border-radius: 15px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 4px 30px rgba(0,0,0,0.1);
          color: white;
        }

        .login-card h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        .error-message {
          background: rgba(255,0,0,0.2);
          padding: 10px;
          margin-bottom: 15px;
          border-radius: 5px;
          text-align: center;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
        }

        .form-group input {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: none;
          outline: none;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          transition: background 0.3s;
        }

        .form-group input:focus {
          background: rgba(255, 255, 255, 0.3);
        }

        .input-error {
          border: 1px solid red;
        }

        .input-error-message {
          color: red;
          font-size: 12px;
          margin-top: 4px;
        }

        .submit-button {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 999px;
          background: linear-gradient(45deg, #ec4899, #8b5cf6);
          color: white;
          font-weight: bold;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 0 10px #ec4899;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .submit-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px #ec4899;
        }

        .divider {
          text-align: center;
          margin: 20px 0;
          position: relative;
        }

        .divider::before, .divider::after {
          content: "";
          position: absolute;
          top: 50%;
          width: 40%;
          height: 1px;
          background: rgba(255, 255, 255, 0.3);
        }

        .divider::before {
          left: 0;
        }

        .divider::after {
          right: 0;
        }
      `}</style>
    </>
  );
}

export default Login;
