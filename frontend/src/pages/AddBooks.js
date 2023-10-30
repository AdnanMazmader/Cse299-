import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import 'sweetalert2/dist/sweetalert2.min.css';
import { useNavigate } from "react-router-dom";



function AddBooks() {
    const { user } = useAuthContext();
    const navigate = useNavigate()
    const Swal = require('sweetalert2')
    const userJSON = localStorage.getItem('user');
    const userObject = JSON.parse(userJSON);

    useEffect(() => {
        if (userObject === null) {
            Swal.fire({
                icon: 'error',
                title: 'Unauthorized User'
            });
            setTimeout(() => {
                navigate('/')
            }, 300);
            return;
        }

        else if (userObject.Admin === false) {
            Swal.fire({
                icon: 'error',
                title: 'Unauthorized User'
            });
            setTimeout(() => {
                navigate('/')
            }, 300);
        }
    }, [user, navigate]);
    const [bookInput, setBook] = useState({
        title: "",
        author: "",
        description: "",
        price: "",
        imagePath: "", // Change to imagePath
    });
    const [errorList, setErrorList] = useState({});

    const handleInput = (e) => {
        setBook({ ...bookInput, [e.target.name]: e.target.value });
    };

    const submitBook = (e) => {
        e.preventDefault();

        fetch("/api/book", {
            method: "POST",
            body: JSON.stringify(bookInput),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to add book.");
                }
            })
            .then((data) => {
                if (data.status === 200) {
                    //swal("Success", data.message);
                    setErrorList({});
                    setBook({
                        title: "",
                        author: "",
                        description: "",
                        price: "",
                        imagePath: "",
                    });
                }
            })
            .catch((error) => {
                console.error("Error adding book:", error);
            });
    };

    return (
        <div className="container-fluid px-4" style={{ height: "30rem", width: "40rem", borderRadius: "3rem" }}>
            <div className="card mt-4">
                <div className="card-header" style={{ textAlign: 'center' }}>
                    <h4>Add Book</h4>
                </div>
                <div className="card-body" style={{ backgroundColor: " #28282B" }}>
                    <form
                        onSubmit={submitBook}
                        method="POST"
                        encType="multipart/form-data"
                        style={{ height: "30rem" }}
                    >
                        <div className="form-group mb-3 mt-3 ms-3">
                            <label style={{ color: 'white' }} className="mb-1">Book Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                onChange={handleInput}
                                value={bookInput.title}
                            />
                            <span className="text-danger" style={{ color: 'white' }}>{errorList.title}</span>
                        </div>
                        <div className="form-group mb-3 mt-3 ms-3">
                            <label style={{ color: 'white' }} className="mb-1">Author</label>
                            <input
                                type="text"
                                name="author"
                                className="form-control"
                                onChange={handleInput}
                                value={bookInput.author}
                            />
                            <span className="text-danger">{errorList.author}</span>
                        </div>
                        <div className="form-group mb-3 mt-3 ms-3" >
                            <label className="mb-1" style={{ color: 'white' }}>Description</label>
                            <textarea
                                name="description"
                                className="form-control"
                                onChange={handleInput}
                                value={bookInput.description}
                            ></textarea>
                            <span className="text-danger">{errorList.description}</span>
                        </div>
                        <div className="form-group mb-3 mt-3 ms-3">
                            <label style={{ color: 'white' }} className="mb-1">Price</label>
                            <input
                                type="text"
                                name="price"
                                className="form-control"
                                onChange={handleInput}
                                value={bookInput.price}
                            />
                            <span className="text-danger">{errorList.price}</span>
                        </div>
                        <div className="form-group mb-3 mt-3 ms-3">
                            <label className="mb-1" style={{ color: 'white' }}>Image URL</label>
                            <input
                                type="text"
                                name="imagePath"
                                className="form-control"
                                onChange={handleInput}
                                value={bookInput.imagePath}
                            />
                            <span className="text-danger">{errorList.imagePath}</span>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary px-4 mt-2">
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddBooks;
