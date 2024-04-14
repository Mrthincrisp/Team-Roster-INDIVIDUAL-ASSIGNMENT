import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

export default function MemberCard({ memberObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img src={memberObj.image} />
      <Card.Body>
        <Card.Title>{memberObj.name}</Card.Title>
        <Card.Text>
          {memberObj.role}
        </Card.Text>
        <Button variant="primary">Edit</Button>
        <Button variant="danger">Delete</Button>
      </Card.Body>
    </Card>
  );
}

MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};
