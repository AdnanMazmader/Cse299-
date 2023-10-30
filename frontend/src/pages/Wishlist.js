import { useEffect, useState } from "react";
import { Button, Col, Image, ListGroup, Row, Container } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { useAuthContext } from "../hooks/useAuthContext";
import '../fontstyle.css'
import { useNavigate } from "react-router-dom";
import 'sweetalert2/dist/sweetalert2.min.css';

const Wishlist = () => {
    const userJSON = localStorage.getItem('user');
    const userObject = JSON.parse(userJSON);
    const userId = userObject.Id;
    const [cart, setCart] = useState([]);
    let sum = 0;
    const navigate = useNavigate()
    const Swal = require('sweetalert2')

    useEffect(() => {

        sum = 0;
        fetch(`/api/wishlist/getList/${userId}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                setCart(data.data.wishlist);
            })
            .catch((error) => {
                console.error("Error fetching cart data:", error);
            });
    }, []);
    const handleRemoveItem = (bookId) => {
        // Make a DELETE request to the server to remove the book from the cart
        console.log(bookId)
        //console.log(user.Id)
        fetch(`/api/wishlist/removeList`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                bookId,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 200) {
                    // Successfully removed the item, update the cart in the state
                    Swal.fire({
                        icon: 'success', // Use an error icon
                        title: 'Successfully removed' // Display the error message from the server
                    });

                    setCart((prevCart) => prevCart.filter((item) => item.id !== bookId));
                    setTimeout(() => {
                        window.location.reload();
                    }, 300);
                } else {
                    console.error("Error removing item from cart:", data.message);
                }
            })
            .catch((error) => {
                console.error("Error removing item from cart:", error);

            });


    };
    const addToCart = (productId) => {
        if (userObject != null) {
            // Send a POST request to your server's API to add the item to the cart
            fetch("/api/cart/addcart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userId, // Assuming you have user information available
                    productId: productId,
                }),
            })
                .then((response) => {
                    if (response.ok) {
                        // If the request is successful, update the cart state
                        //setCart((prevCart) => [...prevCart, productId]);
                        Swal.fire({
                            icon: 'success', // Use an error icon
                            title: 'Successfully added to cart' // Display the error message from the server
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error adding to cart: ", error);
                });
        } else {
            Swal.fire({
                icon: 'error', // Use an error icon
                title: 'Must be Registered to use cart' // Display the error message from the server
            });
        }
    };


    return (
        <div className="home">
            <Container className="text-center py-3">
                <span className="fontStyle">My Wishlist</span>
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
                    {cart.map((prod) => {
                        //sum += parseFloat(prod.price); // Calculate total price
                        return (
                            <ListGroup.Item key={prod.id}>
                                <Row className="align-items-center h5">
                                    <Col md={2}>
                                        <a href={`/bookdetails/${prod._id}`}>
                                            <Image src={prod.imagePath} alt={prod.name} fluid rounded style={{ width: '150px', height: '150px' }} />
                                        </a>
                                    </Col>
                                    <Col md={4}>
                                        <span>{prod.title}</span>
                                    </Col>
                                    <Col md={2}>৳ {prod.price}</Col>
                                    <Col md={4} className="d-flex justify-content-center align-items-center">
                                        <Button className="m-4" variant="success" onClick={() => addToCart(prod._id)} > Add to Cart</Button>{" "}
                                        <Button type="button" variant="light" onClick={() => handleRemoveItem(prod._id)}>
                                            <AiFillDelete fontSize="2rem" />
                                        </Button>

                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        );
                    })}
                    {/* <ListGroup.Item>
                        <Row className="font-weight-bold">
                            <Col md={2}></Col>
                            <Col md={4}>Total Price</Col>
                            <Col md={2}>৳{sum}</Col>
                            <Col md={4} className="d-flex justify-content-center align-items-center p-2">
                                <Button variant="success">Checkout {sum}</Button>
                            </Col>
                        </Row>
                    </ListGroup.Item> */}
                </ListGroup>
            </div>
        </div>
    );
};

export default Wishlist;
