import React from 'react';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

import "./Teams.css"

import Captain from '../assets/images/icons/roles/captain-armband-icon.png';
import Manager from '../assets/images/icons/roles/manager-icon.png';
import BestPlayer from '../assets/images/icons/trophies/ballon-dor-icon.png';
import BundesligaTrophy from "../assets/images/icons/trophies/bundesliga-trophy-icon.png";
import UCLTrophy from "../assets/images/icons/trophies/ucl-trophy-icon.webp";
import DFBPokalTrophy from "../assets/images/icons/trophies/dfb-pokal-trophy-icon.png";
import DFBLigapokalTrophy from "../assets/images/icons/trophies/dfb-ligapokal-trophy-icon.png";
import UEFASupercup from "../assets/images/icons/trophies/uefa-supercup-trophy-icon.png";
import CWCTrophy from "../assets/images/icons/trophies/club-wc-trophy-icon.png";

function RoleIcon(props) {
  return <Image src={props.role} alt='Role icon' className='role-icon' />;
}

function TrophyIcon(props) {
  return <Image src={props.trophy} alt='Trophy icon' className='trophy-icon' />
}

const Teams = () => {
  return (
    <Container fluid className="main-body p-0">
      <div className='main-panel'>
        <h1 className="fw-light text-center">1973-74</h1>
        <Container fluid className='d-flex justify-content-center'>
          <TrophyIcon trophy={BundesligaTrophy} />
          <TrophyIcon trophy={UCLTrophy} />
          <TrophyIcon trophy={DFBPokalTrophy} />
        </Container>
        <ul className="fw-light text-center">
          <li>
            <RoleIcon role={Captain} />
            Franz Beckenbauer
          </li>
          <li>
            <RoleIcon role={Manager} />
            Udo Lattek
          </li>
          <li>
            <RoleIcon role={BestPlayer} />
            Gerd Müller
          </li>
        </ul>
        <div id="panel-background-1" className='panel-background'></div>
      </div>
      <div className='main-panel'>
        <h1 className="fw-light text-center">2000-01</h1>
        <Container fluid className='d-flex justify-content-center'>
          <TrophyIcon trophy={UCLTrophy} />
          <TrophyIcon trophy={DFBLigapokalTrophy} />
        </Container>
        <ul className="fw-light text-center">
          <li>
            <RoleIcon role={Captain} />
            Stefan Effenberg
          </li>
          <li>
            <RoleIcon role={Manager} />
            Ottmar Hitzfeld
          </li>
          <li>
            <RoleIcon role={BestPlayer} />
            Oliver Kahn
          </li>
        </ul>
        <div id="panel-background-2" className='panel-background'></div>
      </div>
      <div className='main-panel'>
        <h1 className="fw-light text-center">2012-13</h1>
        <Container fluid className='d-flex justify-content-center'>
          <TrophyIcon trophy={BundesligaTrophy} />
          <TrophyIcon trophy={UCLTrophy} />
          <TrophyIcon trophy={DFBPokalTrophy} />
          <TrophyIcon trophy={UEFASupercup} />
          <TrophyIcon trophy={CWCTrophy} />
        </Container>
        <ul className="fw-light text-center">
          <li>
            <RoleIcon role={Captain} />
            Philipp Lahm
          </li>
          <li>
            <RoleIcon role={Manager} />
            Jupp Heynckes
          </li>
          <li>
            <RoleIcon role={BestPlayer} />
            Bastian Schweinsteiger
          </li>
        </ul>
        <div id="panel-background-3" className='panel-background'></div>
      </div>
      <div className='main-panel'>
        <h1 className="fw-light text-center">2019-20</h1>
        <Container fluid className='d-flex justify-content-center'>
          <TrophyIcon trophy={BundesligaTrophy} />
          <TrophyIcon trophy={UCLTrophy} />
          <TrophyIcon trophy={DFBPokalTrophy} />
        </Container>
        <ul className="fw-light text-center">
          <li>
            <RoleIcon role={Captain} />
            Manuel Neuer
          </li>
          <li>
            <RoleIcon role={Manager} />
            Hansi Flick
          </li>
          <li>
            <RoleIcon role={BestPlayer} />
            Robert Lewandowski 
          </li>
        </ul>
        <div id="panel-background-4" className='panel-background'></div>
      </div>
    </Container>
  );
}

export default Teams;