import { moyenneGenerale, moyenneMatiere} from "./etudiant";

/**
 *  retourne un nouveau tableau d’étudiants contenant chacun un attribut
 *  moyenne référençant leur moyenne générale.
 */
export function ajouteMoyenne(etudiants, matieres) {
  return etudiants.map((etudiant) => {
    const newEtud = {
      ...etudiant,
      moyenne: moyenneGenerale(etudiant, matieres),
    };
    return newEtud;
  });
}

/**
 *  retourne un nouveau tableau d’étudiants contenant chacun un attribut moyenne
 *  référençant leur moyenne dans la matière identifiée par idMatiere.
 */
export function ajouteMoyenneMatiere(etudiants, idMatiere) {
  return etudiants.map((etudiant) => {
    const newEtud = {
      ...etudiant,
      moyenne: moyenneMatiere(etudiant, idMatiere),
    };
    return newEtud;
  });
}

/**
 * retourne un nouveau tableau étudiants contenant l’attribut rang correspondant
 * au classement de l’étudiant basé sur l’attribut moyenne de chaque étudiant.
 * Attention des étudiants ayant la même moyenne doivent avoir le même classement.
 */
export function ajouteRangParMoyenne(etudiants) {
  return etudiants
    .sort((etudiant1, etudiant2) => etudiant2.moyenne - etudiant1.moyenne)
    .map((etudiant,index) => {
          const newEtud = {
            ...etudiant,
            rang: index,
          };
          return newEtud;
        })
    .reduce((etudiant1, etudiant2, i) => {
      let rang = 1 //Fait en sorte de commencer le classement à 1 au lieux de 0
      if (i > 0) {
        rang = i + 1 
        if (etudiant1[i - 1].moyenne === etudiant2.moyenne) { //Si les etudiants n'ont pas la même moyenne 
          rang += -1;
        }
      }
      return [...etudiant1, { ...etudiant2, rang }];
    }, []);
}

