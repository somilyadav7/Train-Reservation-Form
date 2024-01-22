import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    username: "",
    email: "",
    age: "",
    gender: "",
    source: "",
    destination: "",
    date: "",
    class: "",
    password: "",
    fare: 0,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      calculateFare();
      displayInfo();
    }
  }, [formErrors, isSubmit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};

    //all fields
    if (!values.name || !values.username ||  !values.email || !values.source || !values.destination || !values.date || !values.password || !values.age || !values.class || !values.gender) {
      errors.allFields = "Please fill in all the details.";
    }

    //name section
    if (!values.name) {
      errors.name = "Name is required!";
    } 
    else if (!/^[a-zA-Z\s]+$/.test(values.name)) {
      errors.name = "Name can only contain letters";
    }
    else if(values.name.length<3){
      errors.name = "Name should be atleast 3 characters";
    }    
    else if(values.name.length>30){
      errors.name = "Name should be less than 30 characters";
    }

    //username section
    if (!values.username) {
      errors.username = "Username is required!";
    } 
    else if (/\s/.test(values.username)) {
      errors.username = "Username should not contain spaces";
    }

    //email field
    const verifyEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!values.email){
      errors.email = "Email is required";
    }
    else if(!verifyEmail.test(values.email)) {
      errors.email = "Please enter a valid email address";
    }

    //password section
    const verifyPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{6,16}$/i;
    if(!values.password){
      errors.password = "Please Enter Password!";
    }
    else if(values.password.length < 6 || values.password.length > 16){
      errors.password = "Password must be between 6 and 16 characters";
    }
    else if(!verifyPassword.test(values.password)){
      errors.password = "Password Must Contain Atleast 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character";
    }

    //age section
    if (!values.age) {
      errors.age = "Age is required!";
    }
    else if(values.age<1 || values.age>122 ){
      errors.age = "Age is invalid!";
    }

    //gender section
    if(!values.gender){
      errors.gender = "Gender is Required";
    }
    
    //source and destination section

    if(!values.source){
      errors.source = "Please Select Source!"
    }

    if(!values.destination){
      errors.destination = "Please Select Destination!"
    }

    if(values.source && values.destination && values.source === values.destination) {
      errors.source = "Source and destination cannot be the same";
      errors.destination = "Source and destination cannot be the same";
    }

    //class section
    if(!values.class){
      errors.class = "Please select Class";
    }

    //date section
    if (!values.date) {
      errors.date = "Date is required!";
    } 

    return errors;
  };

  const calculateFare = () => {
    // Check if source and destination are not empty
    if (formValues.source && formValues.destination) {
      let fareMapping = {};
      if(formValues.class === "General"){
        fareMapping = {
          Goa: { Mumbai: 100, Delhi: 160, Bangalore: 150, Kolkata: 200 },
          Mumbai: { Goa: 100, Delhi: 190, Bangalore: 120, Kolkata: 200 },
          Delhi: { Goa: 160, Mumbai: 190, Bangalore: 160, Kolkata: 150 },
          Bangalore: { Goa: 150, Mumbai: 120, Delhi: 160, Kolkata: 170 },
          Kolkata: { Goa: 200, Mumbai: 200, Delhi: 150, Bangalore: 170 },
        };
      }
      else if(formValues.class === "Sleeper"){
        fareMapping = {
          Goa: { Mumbai: 300, Delhi: 700, Bangalore: 350, Kolkata: 800 },
          Mumbai: { Goa: 300, Delhi: 500, Bangalore: 200, Kolkata: 650 },
          Delhi: { Goa: 700, Mumbai: 500, Bangalore: 220, Kolkata: 500 },
          Bangalore: { Goa: 350, Mumbai: 200, Delhi: 220, Kolkata: 700 },
          Kolkata: { Goa: 800, Mumbai: 650, Delhi: 500, Bangalore: 700 },
        };
      }
      else if(formValues.class === "Third AC"){
        fareMapping = {
          Goa: { Mumbai: 500, Delhi: 1500, Bangalore: 600, Kolkata: 2500 },
          Mumbai: { Goa: 500, Delhi: 800, Bangalore: 800, Kolkata: 1800 },
          Delhi: { Goa: 1500, Mumbai: 800, Bangalore: 1700, Kolkata: 1000 },
          Bangalore: { Goa: 600, Mumbai: 800, Delhi: 1700, Kolkata: 1600 },
          Kolkata: { Goa: 2500, Mumbai: 1800, Delhi: 1000, Bangalore: 1600 },
        };
      }
      else if(formValues.class === "Second AC"){
        fareMapping = {
          Goa: { Mumbai: 800, Delhi: 2200, Bangalore: 1000, Kolkata: 3200 },
          Mumbai: { Goa: 800, Delhi: 2000, Bangalore: 1400, Kolkata: 3000 },
          Delhi: { Goa: 2200, Mumbai: 2000, Bangalore: 2200, Kolkata: 1800 },
          Bangalore: { Goa: 1000, Mumbai: 1400, Delhi: 2200, Kolkata: 2700 },
          Kolkata: { Goa: 3200, Mumbai: 3000, Delhi: 1800, Bangalore: 2700 },
        };
      }
      else if(formValues.class === "First AC"){
        fareMapping = {
          Goa: { Mumbai: 1000, Delhi: 3000, Bangalore: 1200, Kolkata: 4500 },
          Mumbai: { Goa: 1000, Delhi: 2500, Bangalore: 1800, Kolkata: 4000 },
          Delhi: { Goa: 3000, Mumbai: 2500, Bangalore: 3500, Kolkata: 2500 },
          Bangalore: { Goa: 1200, Mumbai: 1800, Delhi: 3500, Kolkata: 4000 },
          Kolkata: { Goa: 4500, Mumbai: 4000, Delhi: 2500, Bangalore: 4000 },
        };
      }

  
      // Check if source and destination exist in the fareMapping object
      if (fareMapping[formValues.source] && fareMapping[formValues.source][formValues.destination]) {
        const fare = fareMapping[formValues.source][formValues.destination];
        setFormValues({ ...formValues, fare });
      } else {
        console.error("Invalid source or destination");
      }
    } else {
      console.error("Source or destination is empty");
    }
  };
  

  const displayInfo = () => {
    console.log("Registration Done Successfully");
    console.log("Name:", formValues.name);
    console.log("Username:", formValues.username);
    console.log("Email:", formValues.email);
    console.log("Age:", formValues.age);
    console.log("Gender:", formValues.gender);
    console.log("Source:", formValues.source);
    console.log("Destination:", formValues.destination);
    console.log("Class:", formValues.class);
    console.log("Date of Journey:", formValues.date);
    console.log("Total Fare:", formValues.fare);
  };

  return (
    <div className="train-reservation-container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="success-message">
          <h2>Journey Details</h2>
          <p>Name: {formValues.name}</p>
          <p>Username: {formValues.username}</p>
          <p>Email: {formValues.email}</p>
          <p>Age: {formValues.age}</p>
          <p>Gender: {formValues.gender}</p>
          <p>Source: {formValues.source}</p>
          <p>Destination: {formValues.destination}</p>
          <p>Class: {formValues.class}</p>
          <p>Date of Journey: {formValues.date}</p>
          <h2>Total Fare</h2>
          <p>${formValues.fare}</p>
        </div>
      ) : (
        <div className="reservation-form">
          <form onSubmit={handleSubmit}>
            <h1>Train Reservation Form</h1>
            {formErrors.allFields && (
              <div className="error-message">{formErrors.allFields}</div>
            )}
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
              />
              {formErrors.name && (
                <div className="error-message">{formErrors.name}</div>
              )}
            </div>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formValues.username}
                onChange={handleChange}
              />
              {formErrors.username && (
                <div className="error-message">{formErrors.username}</div>
              )}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
              {formErrors.email && (
                <div className="error-message">{formErrors.email}</div>
              )}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
              />
              {formErrors.password && (
                <div className="error-message">{formErrors.password}</div>
              )}
            </div>
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={formValues.age}
                onChange={handleChange}
              />
              {formErrors.age && (
                <div className="error-message">{formErrors.age}</div>
              )}
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={formValues.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {formErrors.gender && (
                <div className="error-message">{formErrors.gender}</div>
              )}
            </div>

            <div className="form-group">
              <label>Source</label>
              <select
                name="source"
                value={formValues.source}
                onChange={handleChange}
              >
                <option value="">Select Source</option>
                <option value="Goa">Goa</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Kolkata">Kolkata</option>
              </select>
              {formErrors.source && (
                <div className="error-message">{formErrors.source}</div>
              )}
            </div>
            <div className="form-group">
              <label>Destination</label>
              <select
                name="destination"
                value={formValues.destination}
                onChange={handleChange}
              >
                <option value="">Select Destination</option>
                <option value="Goa">Goa</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Kolkata">Kolkata</option>
              </select>
              {formErrors.destination && (
                <div className="error-message">{formErrors.destination}</div>
              )}
            </div>
            <div className="form-group">
              <label>Select class</label>
              <select
                name="class"
                value={formValues.class}
                onChange={handleChange}
              >
                <option value="">Select Class</option>
                <option value="General">General</option>
                <option value="Sleeper">Sleeper</option>
                <option value="Third AC">Third AC</option>
                <option value="Second AC">Second AC</option>
                <option value="First AC">First AC</option>
              </select>
              {formErrors.class && (
                <div className="error-message">{formErrors.class}</div>
              )}
            </div>
            <div className="form-group">
              <label>Date of Journey</label>
              <input
                type="date"
                name="date"
                value={formValues.date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]} // Set min attribute to today's date
              />
              {formErrors.date && (
                <div className="error-message">{formErrors.date}</div>
              )}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
