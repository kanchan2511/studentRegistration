import React, { useState } from "react";
import "./StudentRes.css"; // Add this CSS file

const StudentRes = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    gender: "",
    agree: false,
  });

  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) =>
    /^\d{10}$/.test(phone);

  const handleSubmit = (e) => {
  e.preventDefault();
  const { fullName, email, phone, course, gender, agree } = formData;

  // Required fields
  if (!fullName.trim()) {
    return setMessage({ type: "error", text: "Full Name is required." });
  }
  if (!email.trim()) {
    return setMessage({ type: "error", text: "Email is required." });
  }
  if (!validateEmail(email)) {
    return setMessage({ type: "error", text: "Invalid email format." });
  }
  if (!phone.trim()) {
    return setMessage({ type: "error", text: "Phone number is required." });
  }
  if (!validatePhone(phone)) {
    return setMessage({ type: "error", text: "Phone number must be 10 digits." });
  }
  if (!course.trim()) {
    return setMessage({ type: "error", text: "Course is required." });
  }
  if (!gender) {
    return setMessage({ type: "error", text: "Gender is required." });
  }
  if (!agree) {
    return setMessage({ type: "error", text: "You must agree to terms." });
  }

  // Success
  setStudents([...students, formData]);
  setFormData({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    gender: "",
    agree: false,
  });
  setMessage({ type: "success", text: "Student registered successfully!" });
};

  return (
    <div className="form-container">
      <h2>Student Registration Form</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
        />

        <label>Email:</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Phone Number:</label>
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />

        <label>Course:</label>
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
        />

        <div className="gender-group">
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            /> Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            /> Female
          </label>
        </div>

        <label className="checkbox">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
          /> I agree to terms and conditions
        </label>

        <button type="submit" className="submit-btn">Register</button>
      </form>

      {message && (
        <p className={message.type === "error" ? "error-msg" : "success-msg"}>
          {message.text}
        </p>
      )}

      <h3>Registered Students:</h3>
      <ul className="student-list">
        {students.map((student, index) => (
          <li key={index}>
            <strong>Name:</strong> {student.fullName}<br />
            <strong>Email:</strong> {student.email}<br />
            <strong>Phone:</strong> {student.phone}<br />
            <strong>Course:</strong> {student.course}<br />
            <strong>Gender:</strong> {student.gender}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentRes;
