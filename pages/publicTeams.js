import React, { useEffect, useState } from 'react';
import { getPublicTeams } from '../api/teamData';
import TeamCard from '../components/TeamCard';

export default function PublicTeams() {
  const [teams, setTeams] = useState([]);

  const publicTeam = () => {
    getPublicTeams().then(setTeams);
  };

  useEffect(() => {
    publicTeam();
  }, []);

  return (
    <div className="home-container">
      <h1 className="text"> These are all the public pantheons.</h1>
      <div className="d-flex flex-wrap">
        {teams.map((team) => (
          <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={publicTeam} />
        ))}
      </div>
    </div>
  );
}
