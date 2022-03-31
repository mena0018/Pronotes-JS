import { moyenne } from "./outils";


/**
 * Retourne le tableau des notes, non null, de la matiere
 * idMatiere.
 * */
export function listeNotesParMatiere(etudiant, idMatiere) {
  const notesNonNull = etudiant.notes.filter(
    (note) => note.valeur !== null && note.idMatiere === idMatiere
  );
  return notesNonNull;
}

/**
 *  retourne la moyenne des notes non null de la matiere idMatiere.
 *  retourne null si l’étudiant n’a pas de note dans la matière.
 */
export function moyenneMatiere(etudiant, idMatiere) {
  const notes = listeNotesParMatiere(etudiant, idMatiere);
  return moyenne(notes);
}

/**
 * retourne la somme des moyennes des matières pondérées par
 * leur coéfficient. retourne null si l’étudiant n’a aucune note
 * non null.
 */
export function sommePondereeMoyennes(etudiant, matieres) {
  if (etudiant.notes.every((note) => note === null)) return null;

  return matieres.reduce((somme, mat) => {
    const moy = moyenneMatiere(etudiant, mat.id);
    return somme + moy * mat.coefficient;
  }, 0);
}

/**
 *  retourne un booléen indiquant si l’étudiant à au moins une note non
 *  null dans la matière.
 */
export function aNoteDansMatiere(etudiant, idMatiere) {
  return listeNotesParMatiere(etudiant, idMatiere).length !== 0;
}

/**
 *  retourne la somme des coéfficients des matieres pour lesquelles
 *  l’étudiant à au moins une note. retourne null si l’étudiant n’a 
 *  aucune note non null.
 */
export function sommePonderations(etudiant,matieres){
  let sommeCoef = matieres.reduce((somme, mat) => {
    if (aNoteDansMatiere(etudiant, mat.id)===false) return somme + 0;
    return somme + mat.coefficient;
  }, 0);
  return sommeCoef === 0 ? null: sommeCoef;
}


/**  
 * retourne la moyenne générale de l’étudiant (moyenne pondérée) 
 * ou null si l’étudiant n’a aucune note.
 */
export function moyenneGenerale(etudiant, matieres){
  if (etudiant.notes.every((note) => note.length === 0)) return null;
  return sommePondereeMoyennes(etudiant, matieres) / 
  sommePonderations(etudiant,matieres);
}
