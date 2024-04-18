import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TeamForm from '../../../components/forms/TeamForm';
import { getSingleTeam } from '../../../api/teamData';

export default function EditTeam() {
  const [item, setItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setItem);
  }, [firebaseKey]);

  return (<TeamForm obj={item} />);
}
