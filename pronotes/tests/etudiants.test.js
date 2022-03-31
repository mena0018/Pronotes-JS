/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {
    ajouteMoyenne,
    ajouteMoyenneMatiere,
    ajouteRangParMoyenne,
} from "../src/etudiants";

const etudiants = require("./etudiants.test.json");
const matieres = require("./matieres.test.json");

// Test ajouteMoyenne(etudiants, matieres)
test("Nouveau tableau d'étudiants : ", () => {
    expect(ajouteMoyenne(etudiants, matieres)[0].moyenne).toBe(10);
});
test("Nouveau tableau d'étudiants : ", () => {
    expect(ajouteMoyenne(etudiants, matieres)[1].moyenne).toBe(11);
});
test("Nouveau tableau d'étudiants : ", () => {
    expect(ajouteMoyenne(etudiants, matieres)[2].moyenne).toBe(10);
});
test("Nouveau tableau d'étudiants : ", () => {
    expect(ajouteMoyenne(etudiants, matieres)[3].moyenne).toBe(null);
});

// Test ajouteMoyenneMatiere(etudiants, idMatiere)
test("La moyenne de l'étudiant 1 d'idmatiere 1 est : 18 ", () => {
    expect(ajouteMoyenneMatiere(etudiants, 1)[0].moyenne).toBe(18);
});
test("La moyenne de l'étudiant 1 d'idmatiere 2 est : 13.5 ", () => {
    expect(ajouteMoyenneMatiere(etudiants, 2)[0].moyenne).toBe(13.5);
});

// Test ajouteRangParMoyenne(etudiants)
test("Le rang de l'étudiant 1 est :  ", () => {
    let etuds = ajouteMoyenne(etudiants,matieres);
    console.log(ajouteRangParMoyenne(etuds));
    expect(ajouteRangParMoyenne(etuds)[2].rang).toBe(2);
});
