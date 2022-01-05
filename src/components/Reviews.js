// import axios from "axios";
// import React from "react";
// import { Button, Card } from "react-bootstrap";
// import toast from "react-hot-toast";
// import swal from "sweetalert";
// import "../../Home/Oponions/Oponions.css";




// const Review = ({
//   review: { name, description, address, _id },
//   setEdit,
// }) => {
//   const handleDeleteReview = (id) => {
//     swal({


//       buttons: [true, "Yes"],
//       dangerMode: true,
//     }).then((wantDelete) => {
//       if (wantDelete) {
//         const loading = toast.loading("Deleting...Please wait!");
//         axios
//           .delete(`https://radiant-ravine-14055.herokuapp.com/deleteReview/${id}`)
//           .then((res) => {
//             toast.dismiss(loading);
//             if (res.data) {
//               return (
//                 "ok"
//               );
//             }
//             swal(
//               "oops!",
//               "error",

//             );
//           })
//           .catch((err) => {
//             toast.dismiss(loading);
//             swal(
//               "error",
//               { dangerMode: true }
//             );
//           });
//       }
//     });
//   };

//   return (
//     <section>
//       <div
//         className=""
//         style={{ borderRadius: "15px", maxWidth: "16rem" }}
//       >
//         <div className="review-title pt-2 text-center">
//           <h2>Reviews</h2>
//         </div>
//         <Card className="my-4 mx-auto " style={{ maxWidth: "25rem" }}>

//           <Card.Body className="">
//             <h5>
//               {name} <br />
//               <span>{address}</span>
//             </h5>
//             <Card.Text>{description}</Card.Text>
//           </Card.Body>
//         </Card>
//         <div className="text-center">
//           <Button
//             variant="outline-success"
//             onClick={() => setEdit(true)}
//             className="py-1 px-4"
//           >
//             Edit
//           </Button>
//           <Button
//             variant="outline-primary"
//             onClick={() => handleDeleteReview(_id)}
//             className="py-1 px-2 ml-4"
//           >
//             Delete
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Review;
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Review from '../Review/Review';
import './Reviews.css'
const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("https://radiant-ravine-14055.herokuapp.com/reviews")
            .then(res => res.json())
            .then(data => setReviews(data))
    }, []);

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "0px",
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        speed: 300,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },

            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]

    };

    return (
        <Container>
        <div style={{height: '100%', width: '100%', overflowX:'hidden'}} 
       className='container' >
            <Container className="item text-center">
            <Slider {...settings}>

                {
                    reviews?.map(review => <Review
                        key={review._id}
                        review={review}
                    />)
                }

            </Slider>
        </Container>
        </div>
        </Container>
    );
};

export default Reviews;