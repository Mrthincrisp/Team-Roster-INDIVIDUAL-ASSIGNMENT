import { getSingleMember } from './memberData';
import { getSingleTeam } from './teamData';

const memberAndTeamData = (memberFirebaseKey) => new Promise((resolve, reject) => {
  getSingleMember(memberFirebaseKey).then((memberObj) => {
    getSingleTeam(memberObj.team_id).then((teamObj) => {
      resolve({ teamObj, ...memberObj });
    });
  }).catch((error) => reject(error));
});

export default memberAndTeamData;
