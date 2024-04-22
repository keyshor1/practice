import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";
import Header from './MyComponents/Header'; // Importing Header component
import About from './MyComponents/About';
import Home from './MyComponents/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentForm from './MyComponents/StudentForm';

function App() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    async function getAllStudent() {
      try {
        // retrieve data from api
        const students = await axios.get("http://127.0.0.1:8000/api/student/")
        // store the data in set student in array
        console.log(students.data)
        setStudents(students.data)
      }
      catch (error) {
        console.log(error)
      }
    }
    getAllStudent()
  }, [])

  return (
    <>
      <Router>
        <Header title='Kishor django-react list' searchbar={true} />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About students={students} />} />
          <Route path="/studentform" element={<StudentForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
