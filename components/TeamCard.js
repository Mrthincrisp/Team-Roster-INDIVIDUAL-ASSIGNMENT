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
    <Card style={{ width: '18rem' }}>
      <Card.Text>
        {teamObj.team_name}
      </Card.Text>
      <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
        <Button variant="primary">Edit</Button>
      </Link>
      <Link href={`/team/${teamObj.firebaseKey}`} passHref>
        <Button variant="primary">View</Button>
      </Link>
      <Button variant="danger" onClick={deleteThisTeam}>Delete</Button>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    team_name: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
