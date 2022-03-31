
//import generateur from "../index";
const { etudiants, matieres } = require("../index.js")();


expect.extend({
  toBeNumberOrNull(received) {
    const pass = typeof received === "number" || received === null;
    return (pass) ? {
      message: () => `OK`,
      pass: true,
    } : {
      message: () => `s'attend à ce que ${received} soit un nombre ou null`,
      pass: false,
    };
  },
});

describe("Matières", () => {

  test("matieres est un tableau non null", () => {
    expect(Array.isArray(matieres)).toBe(true);
    expect(matieres).not.toHaveLength(0);
  });

  test("matieres ne contient que des objets avec un id, nom et coefficient", () => {
    const pattern = {
      id: expect.any(Number),
      nom: expect.any(String),
      coefficient: expect.any(Number),
    }
    matieres.forEach(m => expect(m).toMatchObject(pattern));
  });

});


describe("Étudiants", () => {

  test("etudiants est un tableau non null", () => {
    expect(Array.isArray(etudiants)).toBe(true);
    expect(etudiants).not.toHaveLength(0);
  });

  test("etudiants ne contient que des objets avec un nom, prenom et un tableau de notes", () => {
    const pattern = {
      nom: expect.any(String),
      prenom: expect.any(String),
      notes: expect.any(Array),
    }
    etudiants.forEach(e => expect(e).toMatchObject(pattern));
  });

});


describe("Notes", () => {

  test("Les notes sont des tableaux non null", () => {
    etudiants.forEach(e => {
      expect(Array.isArray(e.notes)).toBe(true);
      expect(e.notes).not.toHaveLength(0);
    });
  });

  test("Les notes ne contiennent que des objets avec idMatiere et valeur", () => {
    const pattern = {
      idMatiere: expect.any(Number),
      valeur: expect.toBeNumberOrNull(),
    }
    etudiants.forEach(e => {
      e.notes.forEach(n => expect(n).toMatchObject(pattern));
    })
  });

});
