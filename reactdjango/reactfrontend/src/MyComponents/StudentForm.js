import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = () => {
    const [studname, setStudName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/create-student/', {
                studname,
                email
            });
            console.log('Data inserted:', response.data);
            // Optionally, you can reset the form fields here
            setStudName('');
            setEmail('');
        } catch (error) {
            console.error('Error inserting data:', error);
        }
    };


    return (
        <div>
            <br />
            <br />
            <h2>Add Student</h2>
            <br />
            <form onSubmit={handleSubmit}>
                <label>
                    Student Name:
                    <input type="text" value={studname} onChange={(e) => setStudName(e.target.value)} />
                </label>
                <br />
                <br />
                <label>
                    Email:
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default StudentForm;
