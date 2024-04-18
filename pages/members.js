import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getMembers } from '../api/memberData';
import MemberCard from '../components/MemberCard';
import SearchBar from '../components/SearchBar';

function Home() {
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);

  const getAllMembers = () => {
    getMembers(user.uid).then((data) => {
      setMembers(data);
      setFilteredMembers(data);
    });
  };

  useEffect(() => {
    getAllMembers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (searchInput) => {
    const filtered = members.filter((member) => (
      member.name.toLowerCase().includes(searchInput.toLowerCase())
        || member.role.toLowerCase().includes(searchInput.toLowerCase())
    ));
    setFilteredMembers(filtered);
  };

  return (
    <div
      className="text-center my-4"
    >
      <h1>{user.displayName}, here are the members of your teams. </h1>
      <SearchBar handleSearch={handleSearch} />
      <div className="d-flex flex-wrap">
        {filteredMembers.map((mem) => (
          <MemberCard key={mem.firebaseKey} memberObj={mem} onUpdate={getAllMembers} />
        ))}
      </div>
    </div>
  );
}

export default Home;
