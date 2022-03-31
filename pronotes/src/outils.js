/**
 * Calcul la moyenne des notes fournies dans le tableau en paramètre
 * */
export function moyenne(notes) {
  const notesNonNull = notes.filter((note) => note.valeur !== null);

  if (notesNonNull.length === 0) {
    return null;
  }
  const sommeTotal = notesNonNull.reduce(
    (somme, note) => somme + note.valeur,
    0
  );

  return sommeTotal / notesNonNull.length;
}
