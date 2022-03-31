const faker = require("faker")

const NB_ETUDIANTS = 10
const MIN_NOTES_PAR_MATIERE = 5
const MAX_NOTES_PAR_MATIERE = 15
const NB_DOUBLONS = 2



const matieres = [
  { id: 1, nom: "Mathématique", coefficient: 7 },
  { id: 2, nom: "Français", coefficient: 2 },
  { id: 3, nom: "Histoire-Géographie", coefficient: 3 },
  { id: 4, nom: "Physique-Chimie", coefficient: 5 },
  { id: 5, nom: "Sciences de la vie et de la Terre", coefficient: 3 },
  { id: 6, nom: "Sciences de l'ingénieur", coefficient: 3 },
  { id: 7, nom: "Éducation physique et sportive", coefficient: 2 },
  { id: 8, nom: "Philosophie", coefficient: 3 },
  { id: 9, nom: "Langue vivante 1", coefficient: 3 },
  { id: 10, nom: "Langue vivante 2", coefficient: 2 },
]






const nbNotesParMatieres = matieres.reduce((res, matiere) => {
  res[matiere.id] = entierAleatoire(MIN_NOTES_PAR_MATIERE, MAX_NOTES_PAR_MATIERE)
  return res
}, {})


function entierAleatoire(min, max) {
  return Math.floor(min + (max - min) * Math.random())
}

function configNotesMatieresAleatoires() {
  const matieresCpy = [...matieres]
  const alea = []
  for (let i=0; i<3; i++) {
    alea.push(matieresCpy.splice(entierAleatoire(0, matieresCpy.length), 1)[0].id)
  }
  return {
    idMatiereNull: alea[0],
    idMatiereNoteNull: alea[1],
    idMatiereNoteZero: alea[2],
  }
}

function creerNoteAleatoire(idMatiere, idMatiereNull) {
  return {idMatiere, valeur: idMatiere === idMatiereNull ? null : entierAleatoire(0,40)/2}
}

function notesAleatoires(matiere, config) {
  const notes = new Array(nbNotesParMatieres[matiere.id])
    .fill(null)
    .map(() => creerNoteAleatoire(matiere.id, config.idMatiereNull))
  if (matiere.id === config.idMatiereNoteNull) {
    notes[entierAleatoire(0, notes.length)].valeur = null
  }
  if (matiere.id === config.idMatiereNoteZero) {
    notes[entierAleatoire(0, notes.length)].valeur = 0
  }
  return notes
}

function creerEtudiantAleatoire() {
  const config = configNotesMatieresAleatoires()
  const notes = matieres.reduce((res,matiere) => res.concat(notesAleatoires(matiere, config)), [])
  return {
    nom: faker.name.lastName(),
    prenom: faker.name.firstName(),
    notes,
  }
}

function creerEtudiantDoublon(etudiant) {
  return {
    nom: faker.name.lastName(),
    prenom: faker.name.firstName(),
    notes: [...etudiant.notes],
  }
}

function etudiants(nb) {
  const etudiants = new Array(Math.max(NB_DOUBLONS, nb-NB_DOUBLONS))
    .fill(null)
    .map(creerEtudiantAleatoire)
  for (let i=0; i<NB_DOUBLONS; i++) {
    etudiants.push(creerEtudiantDoublon(etudiants[i]))
  }
  return etudiants
}








module.exports = () => ({
  etudiants: etudiants(NB_ETUDIANTS),
  matieres,
})
