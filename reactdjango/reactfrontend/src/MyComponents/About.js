import React from 'react'

const About = ({students}) => {
    return (
        <div className="App">
            <h1>Connection betweeen react and Django</h1>
            {
                students.map((student) => {
                    return (
                        <h3 key={student.id} >{student.studname} {student.email}</h3>
                    )
                })
            }
        </div>
    )
}

export default About
