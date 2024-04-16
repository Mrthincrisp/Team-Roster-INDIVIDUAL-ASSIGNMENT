import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createMember, getMembers, updateMember } from '../../api/memberData';
import { getTeams } from '../../api/teamData';

const initialState = {
  name: '',
  image: '',
  role: '',
  team: '',
};

export default function MemberForm({ obj }) {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState({ ...initialState, uid: user.uid });
  const [, setMember] = useState([]);
  const [teams, setTeams] = useState([]);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput };
    if (obj.firebaseKey) {
      updateMember(payload).then(() => router.push('/'));
    } else {
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  useEffect(() => {
    getTeams(user.uid).then(setTeams);
  }, [obj, user]);

  useEffect(() => {
    getMembers(user.uid).then(setMember);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>{obj.firebaseKey ? 'Update' : 'Create'} Member</h3>

      <Form.Group md="4" controlId="validationCustom01">
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group md="4" controlId="validationCustom02">
        <Form.Label>Picture</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter image URL"
          name="image"
          value={formInput.image}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group md="4" controlId="validationCustom02">
        <Form.Label>Role</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter member's Role"
          name="role"
          value={formInput.role}
          onChange={handleChange}
        />
        <option value="">Select a Team</option>
        {
            teams.map((team) => (
              <option
                key={team.firebaseKey}
                value={team.firebaseKey}
              >
                {team.name}
              </option>
            ))
          }
      </Form.Group>
      <Form.Group md="4" controlId="validationCustom02">
        <Form.Label>Team</Form.Label>
        <Form.Select
          required
          type="text"
          placeholder="Enter image URL"
          name="team_id"
          value={formInput.team_id}
          onChange={handleChange}
        />
      </Form.Group>
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Member</Button>
    </Form>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    image: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};
