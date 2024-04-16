/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import MemberCard from '../components/MemberCard';
import { getMembers } from '../api/memberData';
import { useAuth } from '../utils/context/authContext';

export default function team() {
  const { user } = useAuth();
  const [members, setMembers] = useState([]);

  const getAllMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAllMembers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>{user.displayName}, here are the teams. </h1>
      <div className="d-flex flex-wrap">
        {members.map((mem) => (
          <MemberCard key={mem.firebaseKey} memberObj={mem} onUpdate={getAllMembers} />
        ))}
      </div>
    </>
  );
}
