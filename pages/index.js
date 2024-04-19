/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getTeams } from '../api/teamData';
import { useAuth } from '../utils/context/authContext';
import TeamCard from '../components/TeamCard';

export default function Team() {
  const { user } = useAuth();
  const [teams, setTeams] = useState([]);

  const getAllTeams = () => {
    getTeams(user.uid).then(setTeams);
  };

  useEffect(() => {
    getAllTeams();
  }, []);

  return (
    <div className="home-container">
      <h1 className="text"> Welcome, {user.displayName}! Here are your pantheons. </h1>
      <div className="display-container">
        {teams.map((team) => (
          <TeamCard className="card" key={team.firebaseKey} teamObj={team} onUpdate={getAllTeams} />
        ))}
      </div>
    </div>
  );
}
