import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createTeam, getTeams, updateTeam } from '../../api/teamData';

const initialState = {
  team_name: '',
  privacy: true,
};

export default function TeamForm({ obj }) {
  const { user } = useAuth();
  const [formInput, SetFormInput] = useState({ ...initialState, uid: user.uid, creator: user.displayName });
  const [, setTeams] = useState([]);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput };
    if (obj.firebaseKey) {
      updateTeam(payload).then(() => router.push('/'));
    } else {
      createTeam(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTeam(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  useEffect(() => {
    getTeams(user.uid).then(setTeams);
    if (obj.firebaseKey) SetFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>{obj.firebaseKey ? 'Update' : 'Create'} Team</h3>

      <Form.Group>
        <Form.Label>Team Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Name the Team"
          name="team_name"
          value={formInput.team_name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Check
        type="switch"
        id="privacy"
        name="privacy"
        label={formInput.privacy ? 'Public' : 'Private'}
        checked={formInput.privacy}
        onChange={(e) => {
          SetFormInput((prevState) => ({
            ...prevState,
            privacy: e.target.checked,
          }));
        }}
      />
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Team</Button>
    </Form>
  );
}

TeamForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    team_name: PropTypes.string,
    privacy: PropTypes.bool,
  }),
};

TeamForm.defaultProps = {
  obj: initialState,
};
