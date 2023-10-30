import { useEffect, useState } from "react";
import { Button, Col, Image, ListGroup, Row, Container } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import '../fontstyle.css'
import 'sweetalert2/dist/sweetalert2.min.css';

const Cart = () => {
    const userJSON = localStorage.getItem('user');
    const userObject = JSON.parse(userJSON);
    let userId = null
    if (userObject != null) {
        userId = userObject.Id;
    }
    const { user } = useAuthContext();
    const [cart, setCart] = useState([]);
    const Swal = require('sweetalert2')
    let sum = 0;
    const navigate = useNavigate()
    useEffect(() => {
        console.log(userObject)
        sum = 0;
        if (userObject == null) {
            Swal.fire({
                icon: 'error', // Use an error icon
                title: 'User not logged in' // Display the error message from the server
            });
            navigate('/')
            return
        }
        fetch(`/api/cart/getcart/${userId}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                setCart(data.data.cart);
            })
            .catch((error) => {
                console.error("Error fetching cart data:", error);
            });
    }, []);
    const handleRemoveItem = (bookId) => {
        // Make a DELETE request to the server to remove the book from the cart
        console.log(bookId)
        //console.log(user.Id)
        fetch(`/api/cart/removecart`, {
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
    const handleCheckout = () => {
        // You can add your checkout logic here.
        // For example, you can send a request to the server to create an order.

        // Assuming you have a function to place an order on the server, you can do something like this:
        fetch("/api/order/createorder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,  // You should replace this with the actual user ID
                //cart: cart,  // Pass the cart items to the server
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Order placed successfully',
                    });

                    // Clear the cart in your client-side state
                    setCart([]);

                    // You can also navigate to a success page or perform any other desired action.
                } else {
                    console.error("Error placing order:", data.message);
                }
            })
            .catch((error) => {
                console.error("Error placing order:", error);
            });
    };

    return (
        <div className="home">
            <Container className="text-center py-3">
                <span className="fontStyle">My Cart</span>
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
                                        <Button type="button" variant="light" onClick={() => handleRemoveItem(prod._id)}>
                                            <AiFillDelete fontSize="2rem" />
                                        </Button>
                                        {/* <Button variant="success" > Add to Cart</Button>{" "} */}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        );
                    })}
                    <ListGroup.Item>
                        <Row className="font-weight-bold">
                            <Col md={2}></Col>
                            <Col md={4}>Total Price</Col>
                            <Col md={2}>৳{sum}</Col>
                            <Col md={4} className="d-flex justify-content-center align-items-center p-2">
                                <Button variant="success" onClick={handleCheckout}>Checkout {sum}</Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
            </div>
        </div>
    );
};

export default Cart;
