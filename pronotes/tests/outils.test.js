import { moyenne } from "../src/outils";

test("La moyenne des notes 13, 5 et 15 doit être 11", () => {
  const notes = [
    { idMatiere: 1, valeur: 13 },
    { idMatiere: 1, valeur: 5 },
    { idMatiere: 1, valeur: 15 },
  ];

  expect(moyenne(notes)).toBe(11); // Je m'attend a ce que le resultat de la moyenne me donne 11
});

test("La moyenne d'un tableau vide doit être null", () => {
  expect(moyenne([])).toBe(null);
});

test("La moyenne des notes null doit être null", () => {
  const notes = [{ idMatiere: 1, valeur: null }];
  expect(moyenne(notes)).toBe(null); // Je m'attend a ce que le resultat de la moyenne me donne 11
});

