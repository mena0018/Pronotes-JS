/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {
  aNoteDansMatiere,
  listeNotesParMatiere,
  moyenneMatiere,
  sommePondereeMoyennes,
  sommePonderations,
  moyenneGenerale,
} from "../src/etudiant";

const etudiants = require("./etudiants.test.json");
const matieres = require("./matieres.test.json");


// Test listeNotesParMatiere(etudiant, idMatiere)
test("Les notes non null, de l'étudiant 1, d'idMatiere 3 sont : ", () => {
  expect(listeNotesParMatiere(etudiants[0], 3)).toEqual([
    { idMatiere: 3, valeur: 0 },
  ]);
});
test("Les notes non null de l'étudiant 1 d'idMatiere 4 est : ", () => {
  expect(listeNotesParMatiere(etudiants[0], 4)).toEqual([]);
});

// Test moyenneMatiere(etudiant, idMatiere)
test("La moyenne des notes non null, de l'étudiant 3, d'idMatiere 2 est : ", () => {
  expect(moyenneMatiere(etudiants[2], 2)).toBe(null);
});
test("La moyenne des notes non null, de l'étudiant 2, d'idMatiere 3 est : ", () => {
  expect(moyenneMatiere(etudiants[1], 3)).toBe(13);
});

// Test sommePondereeMoyennes(etudiant, matieres)
test("La somme des moyenne des matières pondérées de l'étudiant 1 est : ", () => {
  expect(sommePondereeMoyennes(etudiants[0],matieres )).toBe(90);
});
test("La somme des moyenne des matières pondérées de l'étudiant 3 est : ", () => {
  expect(sommePondereeMoyennes(etudiants[2],matieres )).toBe(70);
});
test("La somme des moyenne des matières pondérées de l'étudiant 4 est : ", () => {
  expect(sommePondereeMoyennes(etudiants[3],matieres )).toBe(null);
});


// Test aNoteDansMatiere(etudiant, idMatiere)
test("L'étudiant 1 à au moins une note non null dans la matière 2 : ", () => {
  expect(aNoteDansMatiere(etudiants[1], 2)).toBe(true);
});
test("L'étudiant 1 à au moins une note non null dans la matière 4 : ", () => {
  expect(aNoteDansMatiere(etudiants[0], 4)).toBe(false);
});
test("L'étudiant 4 à au moins une note non null dans la matière 5 : ", () => {
  expect(aNoteDansMatiere(etudiants[3], 5)).toBe(false);
});

// Test sommePonderations(etudiant, matieres)
test("La somme des coefficients des matières de l'étudiant 1 est de : ", () => {
  expect(sommePonderations(etudiants[0],matieres )).toBe(9);
});
test("La somme des coefficients des matières de l'étudiant 3 est de : ", () => {
  expect(sommePonderations(etudiants[2],matieres )).toBe(7);
});
test("La somme des coefficients des matières de l'étudiant 4 est de : ", () => {
  expect(sommePonderations(etudiants[3],matieres )).toBe(null);
});

// Test moyenneGenerale(etudiant, matieres)
test("La moyenne générale de l'étudiant 3 est de 10 : ", () => {
  expect(moyenneGenerale(etudiants[2],matieres )).toBe(10);
});
test("La moyenne générale de l'étudiant 4 est de null : ", () => {
  expect(moyenneGenerale(etudiants[3],matieres )).toBe(null);
});
test("La moyenne générale de l'étudiant 1 est de null : ", () => {
  expect(moyenneGenerale(etudiants[0],matieres )).toBe(10);
});
