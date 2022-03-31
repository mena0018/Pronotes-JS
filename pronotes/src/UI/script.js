const conteneurEtudiants = document.querySelector("div.etudiants");
const conteneurMatieres  = document.querySelector("div.matieres");
const conteneurVues      = document.querySelector("div.vues");
const histogramme        = document.querySelector("div.histogramme");
const supp               = document.querySelector(".ag-chart-wrapper");
const spanTitre          = document.querySelector('h1 span');

// Variables globales pour les données des étudiants, matières et gridOptions
let donneesEtudiants, donneesMatieres, gridOptions;


/**
 * Méthode appelée au chargement des données.
 * Doit mémoriser les paramètres dans les variables globales prévues à cet effet
 * Doit insérer un bouton par matière dans le conteneur de matière prévu à cet effet
 * @param {Array[Etudiant]} etudiants
 * @param {Array[Matiere]} matieres
 */
function initDonnees(etudiants, matieres) {
  donneesEtudiants = etudiants;
  donneesMatieres = matieres;

  afficheBoutonVues();
  matieres.forEach(element => conteneurMatieres.appendChild(creerBouton(element.nom, element.id)));
  conteneurMatieres.appendChild(creerBoutonMoyGen());

  var columnDefs = [
    { field: 'nom',     sortable: true},
    { field: 'prenom',  sortable: true},
    { field: 'moyenne', sortable: true,
     valueFormatter: formatNumber,
     filter: true,
     cellClassRules: {
       'warning' : params => params.value === null || params.value === undefined
     }
    },
    { field: 'rang', sortable: true },
  ];

  gridOptions = {
    columnDefs,
    rowData: etudiants, // tableau des étudiants
  }

  // Création et insertion de la grille dans la div étudiant (conteneurEtudiant)
  new agGrid.Grid(conteneurEtudiants, gridOptions);
}

/**
 * Méthode appelée au clic sur un bouton de matière.
 * Doit récupérer les moyennes des étudiants pour la matière concernée.
 * Doit vider le conteneur html des étudiants des éléments présents.
 * Doit ensuite insérer une ligne par étudiant dans le conteneur prévu à cet effet.
 * Doit mettre à  jour le nom de la matière dans le span prévue à cet effet.
 * @param {number} id id de la matière
 */
function selectionneMatiere(id) {
videElement(histogramme);
 let etudiantsPlusMoy = pronotesKernel.ajouteMoyenneMatiere(donneesEtudiants,id);
  spanTitre.innerHTML = donneesMatieres[id-1].nom;

  let etudRang = pronotesKernel.ajouteRangParMoyenne(etudiantsPlusMoy);
   gridOptions.api.setRowData(etudRang);

   creerHistogramme('Histogramme des moyennes par matière', etudiantsPlusMoy);
}

/**
 * Identique à SelectionneMatière mais pour la deuxième vue.
 */
function selectionneVue2(id) {
  videElement(histogramme);
  let etudiantsPlusMoy = pronotesKernel.ajouteMoyenneMatiere(donneesEtudiants,id);
  spanTitre.innerHTML = donneesMatieres[id-1].nom;

  creerHistogramme('Histogramme des moyennes par matière', etudiantsPlusMoy);
}

/**
 * Méthode appelée au clic sur un bouton de matière.
 * Doit récupérer les moyennes des étudiants pour la matière concernée.
 * Doit vider le conteneur html des étudiants des éléments présents.
 * Doit ensuite insérer une ligne par étudiant dans le conteneur prévu à cet effet.
 * Doit mettre à  jour le nom de la matière dans le span prévue à cet effet.
 */
function selectionneMoyenne() {
  videElement(histogramme);
  const etuds = pronotesKernel.ajouteMoyenne(donneesEtudiants, donneesMatieres);
   spanTitre.innerHTML = "Moyenne Générale";

   let moyRang = pronotesKernel.ajouteRangParMoyenne(etuds);
    gridOptions.api.setRowData(moyRang);

    creerHistogramme('Histogramme des moyennes générale', etuds);
}


/**
 * Fonction qui permet d'afficher les différentes vues en fonction de l'Id passé en paramètre.
 * Id 1 = Liste étudiants 
 * Id 2 = Liste matières
 */
function selectionneVues(id) {
  if (id === 1) {
    videConteneur();
    initDonnees(donneesEtudiants, donneesMatieres);
  }
  if (id === 2) {
    videConteneur();
    afficheBoutonVues();
    donneesMatieres.forEach(element => conteneurMatieres.appendChild(creerBoutonVue2(element.nom, element.id)));
    
    matieres = donneesMatieres.map((matiere) => {
      let moyenneEtuds = []
      let i = 0
      donneesEtudiants.forEach(() => {
          res = pronotesKernel.ajouteMoyenneMatiere(donneesEtudiants,matiere.id)[i].moyenne   
          moyenneEtuds.push(res)
          i += 1
      })
      
      // Ne pas afficher 0 comme moyenne la plus basse pour les moyennes qui sont null
      Moyenne = moyenneEtuds.filter((note) => note !== null);

      moyenneMat = Moyenne.reduce((total, note) => total + note, 0)/Moyenne.length
      moyennePlus  = Math.max(...Moyenne);
      moyenneMoins = Math.min(...Moyenne);

      const newMat = {
        ...matiere,
        moyenne: moyenneMat,
        moyenne_plus: moyennePlus,
        moyenne_moins: moyenneMoins,
      };
      return newMat;
    });

    var columnDefs = [
      { field: 'nom',         sortable: true, flex: 1},
      { field: 'coefficient', sortable: true, flex: 1},
      // Menu déroulant pour pouvoir afficher les moyennes les plus élevés et les moyennes plus basses.
      { headerName: 'Détails moyenne',
        children: [
            {
              columnGroupShow: 'closed', field: "moyenne",
              sortable: true,
              filter: true,
              flex: 1,
              valueFormatter: formatNumber,
              cellClassRules: {
                'warning' : params => params.value === null || params.value === undefined
              }, 
            },
            {columnGroupShow: 'open', field: "moyenne_plus", 
                                      headerName: 'Moyenne la + élevé',
                                      flex: 1, 
                                      sortable: true,
                                      valueFormatter: formatNumber, 
            },
            {columnGroupShow: 'open', field: "moyenne_moins", 
                                      headerName: 'Moyenne la + basse',
                                      flex: 1,
                                      sortable: true,
                                      valueFormatter: formatNumber,
            },
        ]
    },
    ];
    
    gridOptions = {
      columnDefs,
      rowData: matieres,  
    }

    new agGrid.Grid(conteneurEtudiants, gridOptions);
  }
}

/**
 * Créer et retourne un bouton html avec le nom de la matière comme valeur. 
 * Un clic sur ce bouton déclenchera la méthode selectionneMatiere.
 * @param {*} nom nom de la matière
 * @param {*} id id de la matière
 * @return le bouton html associé à la matière
 */
function creerBouton(nom, id) {
  const b = document.createElement('input');
  b.type = 'button';
  b.value = nom;
  b.id = id;
  b.addEventListener('click', () => selectionneMatiere(id));
  return b;
}

/**
 * Créer et retourne un bouton html avec le nom de la matière comme valeur. 
 * Un clic sur ce bouton déclenchera la méthode selectionneVue2.
 */
function creerBoutonVue2(nom, id) {
  const b = document.createElement('input');
  b.type = 'button';
  b.value = nom;
  b.id = id;
  b.addEventListener('click', () => selectionneVue2(id));
  return b;
}

/**
 * Créer et retourne un bouton html avec le nom comme valeur. 
 * Un clic sur ce bouton déclenchera la méthode ajouteMoyenne. 
 */
 function creerBoutonMoyGen() {
  const b = document.createElement('input');
  b.type = 'button';
  b.value = "Moyenne Générale";
  b.addEventListener('click', () => selectionneMoyenne());
  return b;
}

/**
 * Créer et retourne un bouton html avec le nom comme valeur. 
 * Un clic sur ce bouton déclenchera la méthode ajouteMoyenne. 
 */
 function creerBoutonVues(nom, id) {
  const b = document.createElement('input');
  b.type = 'button';
  b.value = nom;
  b.id = id;
  b.addEventListener('click', () => selectionneVues(id));
  return b;
}

/**
 * Fonction permettant de créer des histogrammes en spécifiant
 * les données et le titre.
 */
function creerHistogramme(title, data) {
  const options = {
    container: histogramme,
    title: {
      text: title,
    },
    data: data,
    series: [{
      type: 'histogram',
      xKey: 'moyenne',
    }],
    axes: [
      {
        type: 'number',
        position: 'bottom',
        title: { text: 'notes' },
      },
      {
        type: 'number',
        position: 'left',
        title: { text: 'nombres de notes' },
      }
    ],
  }
  agCharts.AgChart.create(options);
}

/**
 * Fonction permettant de créer les 3 boutons permettant la
 * circulation entre les 3 vues.
 */
function afficheBoutonVues() {
  conteneurVues.appendChild(creerBoutonVues("Liste étudiants", 1));
  conteneurVues.appendChild(creerBoutonVues("Liste matières", 2));
}

/**
 * Fonction permettant de vider les différents éléments de la page.
 */
function videConteneur(){
  videElement(conteneurEtudiants);
  videElement(conteneurMatieres);
  videElement(conteneurVues);
  videElement(histogramme);
  videElement(spanTitre);
}

/**
 * Permet de formater la moyenne à 2 chiffres après
 *  la virgule ou afficher 'sans notes'.
 */
function formatNumber(params) {
  return params.value !== undefined && params.value !== null?
   params.value.toFixed(2): 'sans note'
}

/**
 * Supprime tous les fils de l'élement en paramètre
 * @param {Element} elt
 */
function videElement(elt) {
  while (elt.firstChild) {
    elt.removeChild(elt.firstChild);
  }
}
