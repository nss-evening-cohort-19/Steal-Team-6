import { getSingleProject, getProjectLists } from './projectData';
import { getSingleList, getListCards } from './listData';
// test //
const viewProjectDetails = (projectFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleProject(projectFirebaseKey), getProjectLists(projectFirebaseKey)])
    .then(([projectObject, projectListsArray]) => {
      resolve({ ...projectObject, lists: projectListsArray });
      console.warn(projectObject, projectListsArray);
    }).catch((error) => reject(error));
});

const viewListDetails = (listFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleList(listFirebaseKey), getListCards(listFirebaseKey)])
    .then(([listObject, listCardsArray]) => {
      resolve({ ...listObject, cards: listCardsArray });
    }).catch((error) => reject(error));
});

export {
  viewListDetails,
  viewProjectDetails,
};
