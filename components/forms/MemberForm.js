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
};

export default function MemberForm({ obj }) {
  const { user } = useAuth();
  console.warn('User:', user);
  const [formInput, setFormInput] = useState({ ...initialState, uid: user.uid });
  const [, setMember] = useState([]);
  const [teams, setTeams] = useState([]);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput };
    if (obj.firebaseKey) {
      updateMember(payload).then(() => router.push('/members'));
    } else {
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/members');
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
    <Form className="custom-form" onSubmit={handleSubmit}>
      <h3 className="text">{obj.firebaseKey ? 'Update' : 'Create'} Member</h3>

      <Form.Group controlId="validationCustom01">
        <Form.Label className="text">Name</Form.Label>
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
        <Form.Label className="text">Picture</Form.Label>
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
        <Form.Label className="text">Role</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter member's Role"
          name="role"
          value={formInput.role}
          onChange={handleChange}
        />

      </Form.Group>

      <Form.Group md="4" controlId="validationCustom02">
        <Form.Label className="text">Team</Form.Label>
        <Form.Select
          required
          type="text"
          placeholder="Enter member's Role"
          name="team_id"
          value={formInput.team_id}
          onChange={handleChange}
        >
          <option value="">Select a Team</option>
          {
            teams.map((team) => (
              <option
                key={team.firebaseKey}
                value={team.firebaseKey}
              >
                {team.team_name}
              </option>
            ))
          }
        </Form.Select>
      </Form.Group>
      <Button className="form-button button" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Member</Button>
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
