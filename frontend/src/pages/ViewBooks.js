import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'sweetalert2/dist/sweetalert2.min.css';
import { useAuthContext } from "../hooks/useAuthContext";

function ViewBooks() {
    const [viewBook, setBook] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const { user } = useAuthContext();
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
        const fetchBooks = async () => {
            const response = await fetch('/api/book')
            const json = await response.json()
            if (response.ok) {
                setBook(json)
                setLoading(false)
            }
        }
        fetchBooks()
    }, [user, navigate]);
    // const deleteBook = (e, _id) => {
    //     e.preventDefault();
    //     const thisClicked = e.currentTarget;
    //     thisClicked.innerText = 'Deleting';

    //     fetch(`/api/book/${_id}`, {
    //         method: 'DELETE',
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             if (data.status === 200) {
    //                 //swal('Success', data.message, 'success');
    //                 thisClicked.closest('tr').remove();
    //                 navigate('/addbooks')

    //             } else if (data.status === 404) {
    //                 //swal('Error', data.message, 'error');
    //                 thisClicked.innerText = 'Delete';
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Error deleting book:', error);
    //             thisClicked.innerText = 'Delete';
    //         });
    // };
    const deleteBook = (e, _id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = 'Deleting';

        fetch(`/api/book/${_id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 200) {
                    console.log('Book deleted successfully'); // Add debugging log
                    thisClicked.closest('tr').remove();
                    //navigate('/addbooks');

                } else if (data.status === 404) {
                    console.error('Book not found:', data.message); // Add debugging log
                    thisClicked.innerText = 'Delete';
                } else {
                    console.error('Error deleting book:', data.message); // Add debugging log
                    thisClicked.innerText = 'Delete';
                }
            })
            .catch((error) => {
                console.error('Error deleting book:', error);
                thisClicked.innerText = 'Delete';
            });
        setTimeout(() => {
            navigate('/addbooks', { replace: true });
        }, 1000);
    };

    let display_book_data = "";
    if (loading) {
        return <h4>Loading</h4>;
    } else {
        display_book_data = viewBook.map((book) => {
            return (
                <tr key={book._id}>
                    <td style={{ color: 'white', backgroundColor: "#CF9FFF" }}>{book.title}</td>

                    <td style={{ color: 'white', backgroundColor: "#CF9FFF" }}><img src={book.imagePath} width="70px" alt="Image" /></td>

                    <td style={{ color: 'white', backgroundColor: "#CF9FFF" }}>Tk {book.price}</td>
                    <td style={{ backgroundColor: "#CF9FFF" }}>
                        <Link style={{ color: "white" }}>Edit</Link>
                    </td>
                    <td style={{ backgroundColor: "#CF9FFF" }}><button type="button" onClick={(e) => deleteBook(e, book._id)} className="btn btn-danger btn-sm" >Delete</button></td>
                </tr>
            );
        });
    }
    return (
        <div className="d-flex justify-content-center vh-100">
            <div className="card mt-3 container" style={{ backgroundColor: '#28282B', width: "90rem" }}>
                <div style={{ textAlign: 'center' }}>
                    <h4 style={{ color: "white" }}>View Inventory</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped" >
                            <thead>
                                <tr>
                                    <th style={{ color: 'white', backgroundColor: "#aa336a" }}>Book Name</th>
                                    <th style={{ color: 'white', backgroundColor: "#aa336a" }}>Image</th>
                                    <th style={{ color: 'white', backgroundColor: "#aa336a" }}>Price</th>
                                    <th style={{ color: 'white', backgroundColor: "#aa336a" }}>Edit</th>
                                    <th style={{ color: 'white', backgroundColor: "#aa336a" }}>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {display_book_data}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default ViewBooks;