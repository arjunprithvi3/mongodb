import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from 'axios'; // Import Axios for making HTTP requests

export default function Updatestudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setstudent] = useState({
    name: "",
    regno: "",
    year: "",
    slot: "",
    rollno: 0,
    place: 0,
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchstudent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/students/${id}`);
        setstudent(response.data); // Update student state with fetched data
      } catch (error) {
        console.error('Error fetching student:', error);
      }
    };
    fetchstudent();
  }, [id]);

  const handleUpdatestudent = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/students/${id}`, student);
      setSuccessMsg(response.data.message);
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/");
      }, 1000);
    } catch (error) {
      setErrorMsg("Failed to update student. Please try again.");
      console.error('Error updating student:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setstudent((prevstudent) => ({
      ...prevstudent,
      [name]: value,
    }));
  };

  return (
    <>
      <div>
        <div>
          <h4>Change student</h4>
          <div>
            <div>
              <h4>
                Edit student Details
                <Link to="/">
                  Go BACK
                </Link>{" "}
              </h4>
            </div>
            <div>
              <div>
                <div>
                  <label htmlFor="name">student Name</label>
                  <input
                    slot="text"
                    value={student.name}
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter student Name"
                  />
                </div>

                <div>
                  <label htmlFor="regno">student regno</label>
                  <input
                    slot="text"
                    value={student.regno}
                    name="regno"
                    onChange={handleChange}
                    placeholder="Enter student regno"
                  />
                </div>
                <div>
                  <label htmlFor="exampleFormControlSelect1">student year</label>
                  <select
                    value={student.year}
                    name="year"
                    onChange={handleChange}
                  >
                    <option value="">Select a year...</option>
                    <option value="Syrup">Syrup</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Injection">Injection</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="exampleFormControlSelect2">student slot</label>
                  <select
                    value={student.slot}
                    name="slot"
                    onChange={handleChange}
                  >
                    <option value="">Select a slot...</option>
                    <option value="Siddha">Siddha</option>
                    <option value="Omeopathy">Omeopathy</option>
                    <option value="Ayurvedic">Ayurvedic</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="rollno">student rollno (in ₹.)</label>
                  <input
                    slot="number"
                    value={student.rollno}
                    name="rollno"
                    onChange={handleChange}
                    placeholder="Enter student rollno"
                  />
                </div>
                <div>
                  <label htmlFor="place">student place</label>
                  <input
                    slot="number"
                    value={student.place}
                    name="place"
                    onChange={handleChange}
                    placeholder="Enter student place"
                  />
                </div>
              </div>
              <div>
                <div>{errorMsg}</div>
                <div>{successMsg}</div>
                <button onClick={handleUpdatestudent}>
                  Update student
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
