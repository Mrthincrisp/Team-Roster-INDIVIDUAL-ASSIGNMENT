import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { viewTeamDetails } from '../../api/mergedData';
import MemberCard from '../../components/MemberCard';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewTeamDetails(firebaseKey).then(setTeamDetails);
  }, [firebaseKey]);
  console.warn(teamDetails);
  return (
    <>
      <div className="mt-5 d-flex flex-column align-items-center">
        <div className="text-white details mb-3">
          <Card.Title>
            {teamDetails.team_name}
          </Card.Title>
          <p>This team is set to {teamDetails.privacy ? 'Public' : 'Private'}</p>
        </div>
        <div className="d-flex flex-wrap justify-content-center">
          { teamDetails.member?.map((member) => (
            <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={viewTeamDetails} />
          ))}
        </div>
      </div>
    </>
  );
}
