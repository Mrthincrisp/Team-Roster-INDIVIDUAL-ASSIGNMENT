import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteMember } from '../api/memberData';
import { memberAndTeamData } from '../api/mergedData';

export default function MemberCard({ memberObj, onUpdate }) {
  const [teamAndMember, setTeamAndMember] = useState({});

  useEffect(() => {
    memberAndTeamData(memberObj.firebaseKey).then(setTeamAndMember);
  }, [memberObj.firebaseKey]);

  const deleteThisMember = () => {
    if (window.confirm(`Fire ${memberObj.name} from the team?`)) {
      deleteMember(memberObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '12rem' }}>
      <div className="picture-container">
        <Card.Img src={memberObj.image} className="picture" />
      </div>
      <Card.Body>
        <Card.Title className="text-card">{memberObj.name}</Card.Title>
        <Card.Text>
          <p>Role: {memberObj.role}</p>
          {teamAndMember.teamObj && (
            <p>Team: {teamAndMember.teamObj.team_name || 'Unknown'}</p>
          )}
        </Card.Text>
        <div className="button-container">
          <Link href={`/member/edit/${memberObj.firebaseKey}`} passHref>
            <Button className="button" variant="primary">Edit</Button>
          </Link>
          <Button className="button" variant="danger" onClick={deleteThisMember}>Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
