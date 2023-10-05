import React, { useState } from 'react';

import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Form from 'react-bootstrap/Form';

import './VotePlayer.css';

function VotePlayer() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const [category, setCategory] = useState(null);
  
  const handleCategory = (value) => {
    setCategory(value);
  }

  const CategoryOptions = () => {
    switch (category) {
      case "GK":
        return (
          <>
            <option>Oliver Kahn</option>
            <option>Manuel Neuer</option>
            <option>Sepp Maier</option>
          </>
        );
      case "DEF":
        return (
          <>
            <option>Franz Beckenbauer</option>
            <option>Philipp Lahm</option>
            <option>Paul Breitner</option>
          </>
        );
      case "MID":
        return (
          <>
            <option>Thomas Müller</option>
            <option>Lothar Matthäus</option>
            <option>Bastian Schweinsteiger</option>
          </>
        );
      case "ATT":
        return (
          <>
            <option>Gerd Müller</option>
            <option>Robert Lewandowski</option>
            <option>Karl-Heinz Rummenigge</option>
          </>
        );
      default:
        return;
    }
  }

  const CarouselNext = () => {
    if (index === 1 && category === null) {
      return;
    } else if (index === 2) {
      return <Button variant="secondary">Submit</Button>;
    } else {
      return <Button variant="secondary">Next</Button>;
    }
  }
  const CarouselPrev = () => {
    if (index === 3) {
      return;
    } else {
      return <Button variant="secondary">Prev</Button>;
    }
  }

  // TODO: Only allow one vote per account
  // TODO: show voting results/rankings after voting --> show who voted for which player
  return (
    <>
      <Container fluid id="favourite-players-carousel">
        <Container>
          <Carousel
            controls={true}
            activeIndex={index}
            onSelect={handleSelect}
            interval={null}
            indicators={false}
            wrap={false}
            nextIcon={<CarouselNext />}
            prevIcon={<CarouselPrev />}
          >
            <Carousel.Item>
              <Container className='form-container'>
                <h1 className="fw-light text-center w-100">Favourite Players</h1>
                <p className='text-center w-100'>Vote for your favourite player!</p>
              </Container>
            </Carousel.Item>
            <Carousel.Item>
              <Container className='form-container'>
                <h1 className="fw-light text-center w-100">Pick a category</h1>
                <p className="fw-light text-center w-100">{category === null ? "Selected: None" : `Selected: ${category}`}</p>
                <Container fluid className="d-flex justify-content-evenly">
                  <ButtonGroup aria-label="category-buttons">
                    <OverlayTrigger key="GK" placement="bottom" overlay={
                      <Tooltip>Goalkeepers</Tooltip>
                    }>
                      <Button variant="outline-light" onClick={() => handleCategory("GK")}>
                        <Image fluid src={require('../assets/images/icons/roles/goalkeeper-gloves.png')} alt='Goalkeeper gloves (goalkeeper icon)'/>
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger key="DEF" placement="bottom" overlay={
                      <Tooltip>Defenders</Tooltip>
                    }>
                      <Button variant="outline-light" onClick={() => handleCategory("DEF")}>
                        <Image fluid src={require('../assets/images/icons/roles/shield.png')} alt='Shield (defender icon)'/>
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger key="MID" placement="bottom" overlay={
                      <Tooltip>Midfielders</Tooltip>
                    }>
                      <Button variant="outline-light" onClick={() => handleCategory("MID")}>
                        <Image fluid src={require('../assets/images/icons/roles/football-boots.png')} alt='Football boot (midfielder icon)'/>
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger key="ATT" placement="bottom" overlay={
                      <Tooltip>Attackers</Tooltip>
                    }>
                      <Button variant="outline-light" onClick={() => handleCategory("ATT")}>
                        <Image fluid src={require('../assets/images/icons/roles/football-fire.png')} alt='Football (attacker icon)'/>
                      </Button>
                    </OverlayTrigger>
                  </ButtonGroup>
                </Container>
              </Container>
            </Carousel.Item>
            <Carousel.Item>
              <Container className='form-container'>
                <Form>
                  <Form.Group className="d-flex flex-column align-items-center" controlId="category">
                    <Form.Label className="fw-light text-center w-100">
                      <h1 className="fw-light text-center">Pick your favourite player</h1>
                    </Form.Label>
                    <Form.Select className="w-75">
                      <CategoryOptions />
                    </Form.Select>
                  </Form.Group>
                </Form>
              </Container>
            </Carousel.Item>
            <Carousel.Item>
              <Container className='form-container'>
                <h1 className="fw-light text-center w-100">Thank you!</h1>
              </Container>
            </Carousel.Item>
          </Carousel>
        </Container>
      </Container>
    </>
  );
}

export default VotePlayer;