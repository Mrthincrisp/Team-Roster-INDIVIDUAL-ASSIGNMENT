import { getSingleMember } from './memberData';
import { getSingleTeam } from './teamData';

const memberAndTeamData = (memberFirebaseKey) => new Promise((resolve, reject) => {
  getSingleMember(memberFirebaseKey)
    .then((memberObj) => {
      console.warn('Member:', memberObj);
      getSingleTeam(memberObj.team_id)
        .then((teamObj) => {
          console.warn('Team:', teamObj);
          resolve({ teamObj, memberObj });
        })
        .catch((error) => reject(error));
    })
    .catch((error) => reject(error));
});

/* const memberAndTeamData = (memberFirebaseKey) => new Promise((resolve, reject) => {
  getSingleMember(memberFirebaseKey).then((memberObj) => {
    getSingleTeam(memberObj.team_id).then((teamObj) => {
      resolve({ teamObj, ...memberObj });
    });
  }).catch((error) => reject(error));
}); */

export default memberAndTeamData;
