import { deleteMember, getSingleMember } from './memberData';
import { deleteTeam, getSingleTeam, getTeamMembers } from './teamData';

const memberAndTeamData = (memberFirebaseKey) => new Promise((resolve, reject) => {
  getSingleMember(memberFirebaseKey)
    .then((memberObj) => {
      getSingleTeam(memberObj.team_id)
        .then((teamObj) => {
          resolve({ teamObj, memberObj });
        })
        .catch((error) => reject(error));
    })
    .catch((error) => reject(error));
});

const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getTeamMembers(teamFirebaseKey)]).then(([teamObject, teamMemberArray]) => {
    resolve({ ...teamObject, member: teamMemberArray });
  }).catch((error) => reject(error));
});

const deleteTeamAndMembers = (teamId) => new Promise((resolve, reject) => {
  getTeamMembers(teamId).then((membersArray) => {
    const deleteTeamMembers = membersArray.map((member) => deleteMember(member.firebaseKey));
    Promise.all(deleteTeamMembers).then(() => {
      deleteTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { memberAndTeamData, viewTeamDetails, deleteTeamAndMembers };
