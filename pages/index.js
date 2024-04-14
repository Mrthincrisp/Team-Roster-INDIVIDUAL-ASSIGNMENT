import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getMembers } from '../api/memberData';
import MemberCard from '../components/MemberCard';

function Home() {
  const { user } = useAuth();
  const [member, setMember] = useState([]);

  const getAllMembers = () => {
    getMembers(user.uid).then(setMember);
  };

  useEffect(() => {
    getAllMembers();
  }, []);

  return (
    <div
      className="text-center my-4"
    >
      <h1>{user.displayName}, here are the members of your team. </h1>
      <div className="d-flex flex-wrap">
        {member.map((mem) => (
          <MemberCard key={mem.firebaseKey} memberObj={mem} onUpdate={getAllMembers} />
        ))}
      </div>
    </div>
  );
}

export default Home;
