import React from "react";
import "./forms.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as userService from "../../services/userService";

const SignUp = (props) => {
  const { setUser, setUserData } = props;
  const navigate = useNavigate();
  const [message, setMessage] = useState([""]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    valid: true,
    email: "",
    phoneNumber: "",
    address: "",
    type: "Individual",
  });

  const {
    username,
    password,
    passwordConfirm,
    email,
    phoneNumber,
    address,
    type,
  } = formData;

  const updateMessage = (message) => {
    setMessage(message);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      password
    );

    let passwordError = "";
    if (password.length < minLength) {
      passwordError += "Password must be at least 8 characters long.\n";
      return "Needs more characters (8 total).";
    }
    if (!hasUppercase) {
      passwordError += "Password must contain at least one uppercase letter.\n";
      return "Must contain uppercase letter.";
    }
    if (!hasLowercase) {
      passwordError += "Password must contain at least one lowercase letter.\n";
      return "Must contain lowercase letter.";
    }
    if (!hasNumber) {
      passwordError += "Password must contain at least one number.\n";
      return "Must contain number.";
    }
    if (!hasSpecialChar) {
      passwordError +=
        "Password must contain at least one special character.\n";
      return "Must contain special character.";
    } else {
      return;
    }
  };

  useEffect(() => {
    const passwordMatch = formData.password === formData.passwordConfirm;
    setFormData({ ...formData, valid: passwordMatch });
  }, [formData.password, formData.passwordConfirm]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.valid) {
      setMessage("Please fix password errors before submitting.");
      return;
    }
    try {
      if (event.target.name === "password") {
        validatePassword(event.target.value);
      }
      let isValid = true;
      if (formData.password !== formData.passwordConfirm) {
        isValid = false;
        setMessage("Passwords must match.");
      }
      setFormData({ ...formData, valid: isValid });

      const newUserResponse = await userService.signup(formData);
      const userData = await userService.getUserData(newUserResponse._id);
      setUser(newUserResponse.user);
      setUserData(userData);
      navigate("/");
      setMessage("");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const handleCancel = () => {
    setFormData({
      username: "",
      password: "",
      passwordConfirm: "",
      valid: "",
      email: "",
      phoneNumber: "",
      address: "",
      type: "Individual",
    });
    setMessage("");
  };

  return (
    <div className="form-container">
      <h2>Create An Account</h2>
      <p>{message}</p>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            placeholder="Enter username"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            value={passwordConfirm}
            placeholder="Confirm password"
            onChange={handleChange}
          />
        </div>
        {!formData.valid && <p className="invalid">Passwords must match.</p>}
        {formData.valid && <p className="valid">Passwords match!</p>}
        {validatePassword(password)}

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="phoneNumber"
            name="phoneNumber"
            id="phoneNumber"
            value={phoneNumber}
            placeholder="Enter your phone number"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="address"
            name="address"
            id="address"
            value={address}
            placeholder="Enter your address"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Account Type:</label>
          <select
            type="type"
            name="type"
            id="type"
            value={type}
            onChange={handleChange}
          >
            <option value="Individual">Individual</option>
            <option value="Vendor">Vendor</option>
          </select>
        </div>
        <p>
          Note: If you are not creating an account for a business, you're
          probably an individual account!
        </p>
        {formData.valid && (
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Create Account
          </button>
        )}
        <Link to="/">
          <button
            className="btn btn-primary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
