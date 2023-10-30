import { useEffect, useState } from "react";
import { Button, Col, Image, ListGroup, Row, Container } from "react-bootstrap";
import { AiOutlineDownload } from "react-icons/ai";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import '../fontstyle.css'
import 'sweetalert2/dist/sweetalert2.min.css';
import jsPDF from 'jspdf';


const MyOrder = () => {
    const userJSON = localStorage.getItem('user');
    const userObject = JSON.parse(userJSON);
    let userId = null
    if (userObject != null) {
        userId = userObject.Id;
    }
    const { user } = useAuthContext();
    const [book, setBook] = useState([]);
    const Swal = require('sweetalert2')
    let sum = 0;
    const navigate = useNavigate()
    useEffect(() => {
        console.log(userId)

        // if (userObject == null) {
        //     Swal.fire({
        //         icon: 'error', // Use an error icon
        //         title: 'User not logged in' // Display the error message from the server
        //     });
        //     navigate('/')
        //     return
        // } 
        fetch(`/api/order/getorder/${userId}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                //setCart(data.data.cart);
                console.log(data.data[0].books)
                setBook(data.data[0].books)
            })
            .catch((error) => {
                console.error("Error fetching cart data:", error);
            });
    }
        , []);
    function generatePDF(title) {
        const doc = new jsPDF();
        doc.text('Hello, this is a PDF!', 10, 10);
        doc.save(title);
    }

    return (
        <div className="home">
            <Container className="text-center py-3">
                <span className="fontStyle">My Order</span>
            </Container>
            <div className="productContainer">
                <ListGroup>
                    <ListGroup.Item>
                        <Row className="font-weight-bolder h4">
                            <Col md={2}>Book Image</Col>
                            <Col md={4}>Book Title</Col>
                            <Col md={2}>Price</Col>
                            <Col md={4}></Col>
                        </Row>
                    </ListGroup.Item>
                    {book.map((prod) => {
                        sum += parseFloat(prod.price); // Calculate total price
                        //console.log(prod)
                        return (
                            <ListGroup.Item key={prod._id}>
                                <Row className="align-items-center h5">
                                    <Col md={2}>
                                        <Image src={prod.imagePath} alt={prod.name} fluid rounded style={{ width: '150px', height: '150px' }} />
                                    </Col>
                                    <Col md={4}>
                                        <span>{prod.title}</span>
                                    </Col>
                                    <Col md={2}>৳ {prod.price}</Col>
                                    <Col md={4} className="d-flex justify-content-center align-items-center">
                                        <Button type="button" variant="light" onClick={() => generatePDF(prod.title)} >
                                            <AiOutlineDownload fontSize="2rem" />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        );
                    })}

                </ListGroup>
            </div>
        </div>

    );
};

export default MyOrder;
