import React from 'react';
import { Card, Container } from 'react-bootstrap';
import * as RiIcons from 'react-icons/ri';
import * as ImIcons from 'react-icons/im'
import './Opinion.css';

const Opinion = ({ review }) => {

  const { description, name, rating,address } = review;

  return (
      <Container>
      <Card style={{height:'200px'}} className="container cardContainer">
        <div>
        <div className="cs" >
          <div>
          {/* <Card.Img variant="top" src={!img} className="image-revw" /> */}
            <h2 className='text-2xl'>{name}</h2>
            <br />
            <Card.Text className="flex">
              <ImIcons.ImLocation2/>{address}
            </Card.Text>
            </div>
        </div>
          {
            rating === 1 && <Card.Text className="items-center justify-center flex text-yellow-400">
              <ImIcons.ImStarFull
 />
            </Card.Text>
          }
          {
            rating === 1.5 && <Card.Text className="items-center justify-center flex text-yellow-400">
            <ImIcons.ImStarFull/>
            <ImIcons.ImStarHalf />
            </Card.Text>
          }
          {
            rating === 2 && <Card.Text className="items-center justify-center flex text-yellow-400">
              <ImIcons.ImStarFull/>
              <ImIcons.ImStarFull/>
            </Card.Text>
          }
          {
            rating === 2.5 && <Card.Text className="items-center justify-center flex text-yellow-400">
            <ImIcons.ImStarFull/>
            <ImIcons.ImStarFull/>
            <ImIcons.ImStarHalf />
            </Card.Text>
          }
          {
            rating === 3 && <Card.Text className="items-center justify-center flex text-yellow-400">
              <ImIcons.ImStarFull/>
              <ImIcons.ImStarFull/>
              <ImIcons.ImStarFull/>
            </Card.Text>
          }
          {
            rating === 3.5 && <Card.Text className="items-center justify-center flex text-yellow-400">
                <ImIcons.ImStarFull/>
                <ImIcons.ImStarFull/>
                <ImIcons.ImStarFull/>
              <ImIcons.ImStarHalf />
            </Card.Text>
          }
          {
            rating === 4 && <Card.Text className="items-center justify-center flex text-yellow-400">
              <ImIcons.ImStarFull/>
              <ImIcons.ImStarFull/>
              <ImIcons.ImStarFull/>
              <ImIcons.ImStarFull/>
            </Card.Text>
          }
          {
            rating === 4.5 && <Card.Text className=" items-center justify-center flex text-yellow-400">
                <ImIcons.ImStarFull/>
                <ImIcons.ImStarFull/>
                <ImIcons.ImStarFull/>
                <ImIcons.ImStarFull/>
              <ImIcons.ImStarHalf />
            </Card.Text>
          }
          {
            rating === 5 && <Card.Text className="items-center justify-center flex text-yellow-400">
              <ImIcons.ImStarFull
 />
              <ImIcons.ImStarFull
 />
              <ImIcons.ImStarFull
 />
              <ImIcons.ImStarFull
 />
              <ImIcons.ImStarFull
 />
            </Card.Text>
          }

          <Card.Text className="text-muted">
            <RiIcons.RiDoubleQuotesL className="quote" />{description?.slice(0, 120)}...<RiIcons.RiDoubleQuotesR className="quote" />
          </Card.Text>
        </div>
      </Card>
      </Container>


  );
};

export default Opinion;