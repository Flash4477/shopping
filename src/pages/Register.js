import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "../FileCss/Register.css";

function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    name_User: "",
    email: "",
    password: "",
    address: "",
    phone_number: "",
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [nameUserError, setNameUserError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ || '';

    const isValidPhoneNumber = /^[0-9]{10}$/ || '';

    if (name === 'email') {
      if (!emailRegex.test(value)) {
        setEmailError('Invalid email format');
      } else {
        setEmailError('');
      }
    }

    if (name === 'phone_number') {
      if (!isValidPhoneNumber.test(value)) {
        setPhoneNumberError('Invalid phone number format. Must be 10 digits.');
      } else {
        setPhoneNumberError('');
      }
    }

    if (name === 'first_name') {
      if (!value) {
        setFirstNameError('Please enter First Name.');
      } else {
        setFirstNameError('');
      }
    }

    if (name === 'last_name') {
      if (!value) {
        setLastNameError('Please enter Last Name.');
      } else {
        setLastNameError('');
      }
    }

    if (name === 'name_User') {
      if (!value) {
        setNameUserError('Please enter Name User.');
      } else {
        setNameUserError('');
      }
    }

    if (name === 'address') {
      if (!value) {
        setAddressError('Please enter Address.');
      } else {
        setAddressError('');
      }
    }

    if (name === 'password') {
      if (value.length < 6) {
        setPasswordError('Password must be at least 6 characters.');
      } else {
        setPasswordError('');
      }
    }



    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any of the required fields are empty
    for (const key in formData) {
      if (!formData[key]) {
        if (key === 'first_name') {
          setFirstNameError('Please enter First Name.');
        } else if (key === 'last_name') {
          setLastNameError('Please enter Last Name.');
        } else if (key === 'name_User') {
          setNameUserError('Please enter Name User.');
        } else if (key === 'email') {
          setEmailError('Please enter Email.');
        } else if (key === 'phone_number') {
          setPhoneNumberError('Please enter Phone Number.');
        } else if (key === 'address') {
          setAddressError('Please enter Address.');
        } else if (key === 'password') {
          setPasswordError('Please enter Password.');
        }
        return;
      }
    }

    // Check if there's an email validation error before submitting
    if (emailError) {
      console.error('Please fix the email validation error before submitting.');
      return;
    }

    try {
      // Your existing code for form submission
      console.log(formData);
      const result = await fetch("http://localhost:8081/api/v2/user/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (result.ok) {
        const data = await result.json();
        if (data.status) {
          setRegistrationSuccess("Đăng ký thành công!");
          setTimeout(() => {
            navigate("/dang-nhap");
          }, 2000);
        } else {
          console.error("Đăng ký thất bại: " + data.message);
        }
      } else {
        console.error("Lỗi kết nối tới máy chủ.");
      }
    } catch (error) {
      console.error("Lỗi xảy ra: " + error);
    }
  };


  return (
    <div className="Register">
      <Header />
      {registrationSuccess && (
        <div className="alert alert-success text-center">
          {registrationSuccess}
        </div>
      )}
      <div className="form-container">
        <form onSubmit={handleSubmit} className="container mt-4">
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="first_name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className={`form-control ${firstNameError ? 'is-invalid' : ''}`}
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
              {firstNameError && <div className="invalid-feedback">{firstNameError}</div>}
            </div>
            <div className="col">
              <label htmlFor="last_name" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className={`form-control ${lastNameError ? 'is-invalid' : ''}`}
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
              {lastNameError && <div className="invalid-feedback">{lastNameError}</div>}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="name_User" className="form-label">
              Name User
            </label>
            <input
              type="text"
              className={`form-control ${nameUserError ? 'is-invalid' : ''}`}
              id="name_User"
              name="name_User"
              value={formData.name_User}
              onChange={handleChange}
            />
            {nameUserError && <div className="invalid-feedback">{nameUserError}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className={`form-control ${emailError ? 'is-invalid' : ''}`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {emailError && <div className="invalid-feedback">{emailError}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${passwordError ? 'is-invalid' : ''}`}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {passwordError && <div className="invalid-feedback">{passwordError}</div>}
          </div>

          <div className="row mb-3">
            <div className="col">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className={`form-control ${addressError ? 'is-invalid' : ''}`}
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              {addressError && <div className="invalid-feedback">{addressError}</div>}
            </div>
            <div className="col">
              <label htmlFor="phone_number" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className={`form-control ${phoneNumberError ? 'is-invalid' : ''}`}
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
              />
              {phoneNumberError && <div className="invalid-feedback">{phoneNumberError}</div>}
            </div>
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
