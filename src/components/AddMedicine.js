import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'; // Import Axios for making HTTP requests

export default function Addstudent() {
  const navigate = useNavigate();
  const [student, setstudent] = useState({
    name: "",
    regno: "",
    year: "",
    slot: "",
    rollno: "",
    place: "",
  });

  const [bill, setBill] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleFileUpload = (files) => {
    setBill(files[0]);
  };

  const handleAddstudent = async () => {
    try {
      const formData = new FormData();
      formData.append('name', student.name);
      formData.append('regno', student.regno);
      formData.append('year', student.year);
      formData.append('slot', student.slot);
      formData.append('rollno', student.rollno);
      formData.append('place', student.place);
      formData.append('bill', bill); // Append the uploaded file

      const serverResponse = await axios.post('http://localhost:5000/api/students', formData, {
        headers: {
          'Content-slot': 'multipart/form-data'
        }
      });

      setSuccessMsg(serverResponse.data.message);
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/");
      }, 1000);
    } catch (error) {
      setErrorMsg("Failed to add student. Please try again.");
      console.error('Error adding student:', error);
    }
  };

  return (
    <>

      <div>
        <div>
          <div>
            <h4>Create student</h4>
            <div>
              <div>
                <div>
                  <div>
                    New student Details
                    <Link to="/inventory">
                      Go BACK
                    </Link>{" "}
                  </div>
                </div>
                <div>
                  <div>
                    <label htmlFor="name">student Name</label>
                    <input
                      slot="text"
                      value={student.name}
                      id="name"
                      onChange={(event) =>
                        setstudent((prev) => ({ ...prev, name: event.target.value }))
                      }
                      placeholder="Enter student Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="regno">student regno</label>
                    <input
                      slot="text"
                      value={student.regno}
                      id="regno"
                      onChange={(event) =>
                        setstudent((prev) => ({ ...prev, regno: event.target.value }))
                      }
                      placeholder="Enter student regno"
                    />
                  </div>
                  <div>
                    <label htmlFor="exampleFormControlSelect1">student year</label>
                    <select
                      onChange={(event) =>
                        setstudent((prev) => ({ ...prev, year: event.target.value }))
                      }
                    >
                      <option value="">Select a year...</option>
                      <option value="Syrup">1</option>
                      <option value="Tablet">2</option>
                      <option value="Injection">3</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="exampleFormControlSelect2">student slot</label>
                    <select
                      onChange={(event) =>
                        setstudent((prev) => ({ ...prev, slot: event.target.value }))
                      }
                    >
                      <option value="">Select a slot...</option>
                      <option value="Siddha">A</option>
                      <option value="Omeopathy">B</option>
                      <option value="Ayurvedic">C</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="rollno">student rollno (in ₹.)</label>
                    <input
                      slot="text"
                      value={student.rollno}
                      id="rollno"
                      onChange={(event) =>
                        setstudent((prev) => ({ ...prev, rollno: event.target.value }))
                      }
                      placeholder="Enter student Rollno"
                    />
                  </div>
                  <div>
                    <label htmlFor="place">student place</label>
                    <input
                      slot="text"
                      value={student.place}
                      id="place"
                      onChange={(event) =>
                        setstudent((prev) => ({ ...prev, place: event.target.value }))
                      }
                      placeholder="Enter student place"
                    />
                  </div>
                  <div>
                    <label htmlFor="bill">Upload Bill</label>
                    <input
                      type="file"
                      id="bill"
                      onChange={(event) => handleFileUpload(event.target.files)}
                    />
                  </div>
                  <div>
                    <div>{errorMsg}</div>
                    <div>{successMsg}</div>
                    <button onClick={handleAddstudent}>
                      Add student
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
