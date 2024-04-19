/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar className="navbar" collapseOnSelect expand="lg" variant="dark">
      <Container className="navbar__center">
        <Link passHref href="/">
          <Navbar.Brand>Team8</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="navbar__links">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/members">
              <Nav.Link className="navbar__link">Members</Nav.Link>
            </Link>
            <Link passHref href="/member/new">
              <Nav.Link className="navbar__link">Create a Member</Nav.Link>
            </Link>
            <Link passHref href="/">
              <Nav.Link className="navbar__link">Teams</Nav.Link>
            </Link>
            <Link passHref href="/team/new">
              <Nav.Link className="navbar__link">Create a Team</Nav.Link>
            </Link>
            <Link passHref href="/publicTeams">
              <Nav.Link className="navbar__link">Public Teams</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <div className="navbar__end">
        <Button className="navbar__button button" variant="danger" onClick={signOut}>Sign Out</Button>
      </div>
    </Navbar>
  );
}
