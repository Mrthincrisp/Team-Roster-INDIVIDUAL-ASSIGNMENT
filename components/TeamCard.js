import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import Link from 'next/link';
import { deleteTeamAndMembers } from '../api/mergedData';

export default function TeamCard({ teamObj, onUpdate }) {
  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${teamObj.team_name}?  This WILL delete ALL team members as well.`)) {
      deleteTeamAndMembers(teamObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem' }} className="custom-card">
      <Card.Text className="card-text">
        <h4 className="text-card">{teamObj.team_name} </h4>
      </Card.Text>
      <Card.Text className="card-text">
        Creator: {teamObj.uid}
      </Card.Text>
      <div className="button-container">
        <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
          <Button variant="primary" className="card-button button">Edit</Button>
        </Link>
        <Link href={`/team/${teamObj.firebaseKey}`} passHref>
          <Button variant="primary" className="card-button button">View</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisTeam} className="card-button button">Delete</Button>
      </div>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    team_name: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    creator: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
