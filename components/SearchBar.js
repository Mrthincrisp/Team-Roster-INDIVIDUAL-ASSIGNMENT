import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function SearchBar({ handleSearch }) {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);
    handleSearch(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Form inline onSubmit={handleSubmit}>
      <Row>
        <Col xs="auto">
          <Form.Control
            type="search"
            placeholder="Search"
            onChange={handleChange}
            value={searchInput}
          />
        </Col>
      </Row>
    </Form>
  );
}

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
