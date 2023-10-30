import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { MdFavorite } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
function SingleBook() {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id)
    const [Book, setBook] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/book/${id}`);
                const data = await response.json();
                //console.log(data)

                if (response.status === 200) {
                    setBook(data);
                    setLoading(false);
                    console.log(Book)
                } else if (response.status === 404) {
                    // swal("Error", data.message, "error");
                    navigate("/admin/viewbooks");

                }
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle other error cases here
            }
        };

        fetchData();
    }, [id]);


    return (
        <div className="container mt-3" style={{ backgroundColor: "white", borderRadius: "1rem" }}>

            <section class="padding-y">
                <div class="container">

                    <div class="row">
                        <aside class="col-lg-6">
                            <article class="gallery-wrap py-3">
                                <div class="img-big-wrap img-thumbnail ">

                                    <img height="500" src={Book.imagePath} />

                                </div>
                            </article>
                        </aside>
                        <main class="col-lg-6 pt-3">
                            <article class="ps-lg-3">
                                <h4 class="title text-dark">{Book.title}</h4>


                                <div class="mb-3">
                                    {/* <var class="price h5">{Book.price}</var> */}
                                    <span class="text-muted">By {Book.author}</span>
                                </div>
                                <p>{Book.description}</p>
                                <p>Modern look and quality demo item is a streetwear-inspired collection that continues to break away from the conventions of mainstream fashion. Made in Italy, these black and brown clothing low-top shirts for men.</p>

                                <hr />





                                <Button variant="success">Add to Cart</Button>{" "}

                                <span className="favorite-icon"><Button variant=""><MdFavorite size=' 2rem' ></MdFavorite></Button>{" "}</span>

                            </article>
                        </main>
                    </div>

                </div>
            </section>



        </div>


    );
}
export default SingleBook;
