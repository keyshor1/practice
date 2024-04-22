import { useEffect, useState } from "react";
import api from "../api";
import Note from "../components/Note";
import Header from "./Header";
import '../styles/Home.css';
import Carousel from "./Carousel";

function Home() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [students, setStudents] = useState([]);

    useEffect(() => {
        getNotes();
        getAllStudents();
    }, []);

    const getNotes = () => {
        api
            .get(`/api/notes/`)
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
            })
            .catch((err) => console.error(err));
    };

    const getAllStudents = () => {
        api
            .get("/api/student/")
            .then((res) => {
                setStudents(res.data);
            })
            .catch((err) => console.error(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) {
                    alert("Note Deleted!");
                    getNotes();
                } else {
                    alert("Failed to delete note");
                }
            })
            .catch((error) => console.error(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) {
                    alert("Notes created successfully");
                    getNotes();
                } else {
                    alert("Failed to create notes");
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <div>
            {/* <Header title="Home" searchbar={false} /> */}
            <Carousel />
            <br />
            <br />
            <hr />
            <div className="text-center">
                <div className="Notes">
                    <h1>Notes</h1>
                    <br />
                    <br />
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Created Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.map((note) => (
                                <tr key={note.id}>
                                    <td>{note.title}</td>
                                    <td>{note.content}</td>
                                    <td>{note.created_time}</td>
                                    <td>
                                        <button onClick={() => deleteNote(note.id)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h1>Create Notes</h1>
            </div>

            <form onSubmit={createNote}>
                <label htmlFor="title">Title: </label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <br />
                <label htmlFor="content">Content: </label>
                <br />
                <textarea
                    name="content"
                    id="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <br />
                <input type="submit" value="Submit" />
            </form><br />
            <br />
            <hr />
            <div className="student-list">
                <h1 className="text-center">Student data from Admin panel</h1>
                <div className="table-responsive">
                    <table className="table table-bordered mx-auto">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{student.studname}</td>
                                    <td>{student.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <br />
            <br />
            <hr />

        </div>
    );
}

export default Home;
