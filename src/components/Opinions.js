import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// import Review from '../Review/Review';
import Opinion from './Opinion';
import './Opinions.css'
const Opinions = () => {
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
                    reviews?.map(review => <Opinion
                        key={review._id}
                        review={review}
                    />)
                }

            </Slider>
        </Container>
        </div>
        <br />
        <br />
        <br />
        </Container>
    );
};

export default Opinions;