import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";
import { MdFavorite } from "react-icons/md";
import '../styles.css'
import 'sweetalert2/dist/sweetalert2.min.css'; // Import SweetAlert2 CSS
import { Link } from "react-router-dom";


const Home = () => {
  const { user } = useAuthContext();
  const [books, setBooks] = useState(null);
  const [cart, setCart] = useState([])
  const [wishlish, setWishlist] = useState([])
  const Swal = require('sweetalert2')

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("/api/book");
      const json = await response.json();
      if (response.ok) {
        setBooks(json);
      }
    };

    fetchBooks();
  }, []);

  const addToWishlist = (productId) => {
    if (user != null) {
      // Send a POST request to your server's API to add the item to the wishlist
      fetch("/api/wishlist/addList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.Id, // Assuming you have user information available
          productId: productId,
        }),
      })
        .then((response) => {
          if (response.ok) {
            Swal.fire({
              icon: 'success', // Use an error icon
              title: 'Successfully added to Wishlist' // Display the error message from the server
            });
          }
        })
        .catch((error) => {
          console.error("Error adding to wishlist: ", error);
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Must be registered to add to wishlist',
      });
    }
  };

  const addToCart = (productId) => {
    if (user != null) {
      // Send a POST request to your server's API to add the item to the cart
      fetch("/api/cart/addcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.Id, // Assuming you have user information available
          productId: productId,
        }),
      })
        .then((response) => {
          console.log(response)
          if (response.ok) {
            // If the request is successful, update the cart state
            setCart((prevCart) => [...prevCart, productId]);
          }
          if (response.status == 400) {
            Swal.fire({
              icon: 'error', // Use an error icon
              title: 'Item already in cart' // Display the error message from the server
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


  // State to track the "see more" status for each book
  const [seeMore, setSeeMore] = useState({});

  // Function to toggle the "see more" status for a book
  const toggleSeeMore = (bookId) => {
    setSeeMore((prevState) => ({
      ...prevState,
      [bookId]: !prevState[bookId],
    }));
  };

  return (
    <div>
      <div className="d-flex flex-row flex-wrap">
        {books &&
          books.map((book) => (
            <Card style={{ borderRadius: "2rem", margin: "1rem", height: "37rem", width: " 15rem" }} key={book._id} className="m-3">
              <Card.Img style={{ width: "15rem", height: "20rem" }} variant="top" src={book.imagePath} />
              <Card.Body >
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                  {seeMore[book._id]
                    ? book.description
                    : book.description.slice(0, 50) + "..."}
                  {book.description.length > 100 && (

                    <Link to={`/bookdetails/${book._id}`}>View details</Link>
                  )}
                </Card.Text>
                <Card.Text>
                  <h4>Price: TK {book.price}</h4>
                </Card.Text>
                <div>
                  <Button variant="success" onClick={() => addToCart(book._id)}>{cart.includes(book._id) ? "Added to Cart" : "Add to Cart"}</Button>{" "}

                  <span className="favorite-icon"><Button variant="" onClick={() => addToWishlist(book._id)}><MdFavorite size=' 2rem' ></MdFavorite></Button>{" "}</span>
                  {console.log(cart)}
                </div>
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Home;
