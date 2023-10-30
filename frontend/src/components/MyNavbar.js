// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import { useLogout } from "../hooks/useLogout";
// import { useAuthContext } from "../hooks/useAuthContext";

// function GlobalNavbar() {
//   const { logout } = useLogout();
//   const { user } = useAuthContext();

//   const handleClick = () => {
//     logout();
//   };

//   return (
//     <Navbar bg="dark" data-bs-theme="dark">
//       <Container>
//         <Navbar.Brand href="#home">Ebook Store</Navbar.Brand>
//         <Nav className="bg-body-tertiary justify-content-between">
//           <Nav.Link href="/">Home</Nav.Link>
//           <Nav.Link href="/veiwbooks">View Books</Nav.Link>
//           <Nav.Link href="/addbooks">Add Books</Nav.Link>
//           <Nav.Link href="/recomendatons">Recomendations</Nav.Link>
//           <Nav.Link href="/cart">Cart</Nav.Link>
//           {user && (
//             <div>
//               <button onClick={handleClick}>Log out</button>
//             </div>
//           )}
//           {!user && (
//             <div>
//               <Nav.Link href="/login">Login</Nav.Link>

//               <Nav.Link href="/signup">Signup</Nav.Link>
//             </div>
//           )}
//         </Nav>
//       </Container>
//     </Navbar>
//   );
// }

// export default GlobalNavbar;
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import '../fontstyle.css'
import { TiShoppingCart } from 'react-icons/ti'
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
function GlobalNavbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <Navbar data-bs-theme="dark" style={{ height: '5rem', backgroundColor: '#333d79ff' }}>
      <Container fluid>
        <Navbar.Brand className='fontStyle'>Ebook Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>

            {user && user.Admin && (

              <Nav.Link href="/addbooks">Add Books</Nav.Link>

            )}

            {user && user.Admin && (

              <Nav.Link href="/veiwbooks">Viewbooks</Nav.Link>
            )}

            <Nav.Link href="/recomendatons">Recomendations</Nav.Link>
            <Nav.Link href="/wishlist">Wishlist</Nav.Link>
            <Nav.Link href="/myorder">My Orders</Nav.Link>

            {user && (

              <div>
                <Button style={{ backgroundColor: 'black' }} onClick={handleClick} >Logout</Button>
              </div>
            )}
            {!user && (
              <NavDropdown title="Acount" id="navbarScrollingDropdown" >
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/signup">
                  Sign Up
                </NavDropdown.Item>

              </NavDropdown>
            )}


          </Nav>

          <Nav className="ml-auto " style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link href="/cart"><TiShoppingCart color='white' fontSize='2.5rem' /></Nav.Link>
          </Nav>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default GlobalNavbar;