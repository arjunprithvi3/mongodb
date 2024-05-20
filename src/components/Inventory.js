import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'; // Import Axios for making HTTP requests

export default function Inventory() {
  const [students, setstudents] = useState([]);

  const getstudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students'); // Replace with your server URL
      setstudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleDeleteButton = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`); // Replace with your server URL
      getstudents(); // Refresh students after deletion
    } catch (error) {
      console.error('Error deleting student:', error.response.data.error);
    }
  };

  useEffect(() => {
    getstudents();
  }, []);

  return (
    <>
      <div>
        <div>
          <h4>student Inventory</h4>
          <div>
            <div>
              <h6>
                Inventory List{" "}
                <Link to="/addstudent">
                  Add new student
                </Link>{" "}
              </h6>
            </div>
            <div>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>
                        student Name
                      </th>
                      <th>regno</th>
                      <th>student year</th>
                      <th>student slot</th>
                      <th>student rollno</th>
                      <th>place</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr key={student._id}>
                        <td>{index + 1}</td>
                        <td>
                          {student.name}
                        </td>
                        <td>{student.regno}</td>
                        <td>{student.year}</td>
                        <td>{student.slot}</td>
                        <td>₹{student.rollno}</td>
                        <td>{student.place}</td>
                        <td>
                          <div>
                          <Link to={`/updatestudent/${student._id}`}>
                              <button
                                slot="button"
                  
                                >
                                <i></i>Edit
                              </button>
                            </Link>
                            <button
                              slot="button"
                              onClick={() => {
                                handleDeleteButton(student._id); // Corrected to use student._id
                              }}
                              >Delete
                              <i></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
