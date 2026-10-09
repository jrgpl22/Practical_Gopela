

import axios from "axios";
import { useEffect, useState } from "react";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
function App() {

    const [students, setStudents] = useState([]);
    const [name, setName] = useState("");
    const [course, setCourse] = useState("");
    const [age, setAge] = useState("");
    const [editingId, setEditingId] = useState(null);

    const getStudents = () => {
        axios.get(`${API}/students`)
            .then((response) => {
                setStudents(response.data);
            });
    };

    useEffect(() => {
        getStudents();
    }, []);

    const resetForm = () => {
        setName("");
        setCourse("");
        setAge("");
        setEditingId(null);
    };

    const handleSubmit = () => {
        const studentData = {
            name: name,
            course: course,
            age: age
        };

        if (editingId === null) {
           axios.post(`${API}/students`, studentData)
                .then(() => {
                    getStudents();
                    resetForm();
                });
        } else {
           axios.put(`${API}/students/${editingId}`, studentData)
                .then(() => {
                    getStudents();
                    resetForm();
                });
        }
    };

    const handleEdit = (student) => {
        setEditingId(student._id);
        setName(student.name);
        setCourse(student.course);
        setAge(student.age);
    };

    const handleDelete = (id) => {
          axios.delete(`${API}/students/${id}`)
            .then(() => {
                getStudents();
            });
    };

    return (
        <div>

            <h1>Student Management System</h1>

            <h2>{editingId === null ? "Add Student" : "Edit Student"}</h2>

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <br />

            <input
                type="text"
                placeholder="Course"
                value={course}
                onChange={(event) => setCourse(event.target.value)}
            />
            <br />

            <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(event) => setAge(event.target.value)}
            />
            <br />

            <button onClick={handleSubmit}>
                {editingId === null ? "Add Student" : "Update Student"}
            </button>

            <h2>Students</h2>

            {students.map((student) => (
                <div key={student._id}>
                    <p>Name: {student.name}</p>
                    <p>Course: {student.course}</p>
                    <p>Age: {student.age}</p>
                    <button onClick={() => handleEdit(student)}>Edit</button>
                    <button onClick={() => handleDelete(student._id)}>Delete</button>
                </div>
            ))}

        </div>
    );
}

export default App;
