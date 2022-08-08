/* variables de la page */
let cellule_old_value = "";
let cellule_old_item = "0";

function editabled(item) {
  document.querySelectorAll(".tab_input").forEach((element) => {
    //console.log(element.id+" / "+item.id);
    /* si l'element n'est pas identique a l'item */
    if (element.id != item.id || element.id != cellule_old_item) {
      /* verifier que l'element n'est pas identique a la verion cliquer avant le changement */
      if (cellule_old_item == element.id) {
        //console.log('vfffc');
        /* si c'est d'une version cliquer avant */
        /* on recupere les anciennes informations (en cas d'erreur) */
        let value_old = cellule_old_value;
        let id_old = element.id;
        /* verifier qu'on a bien changer les valeurs */
        let modif = element.innerHTML != cellule_old_value;
        /* on vide les informations */
        cellule_old_value = "";
        cellule_old_item = "0";
        /* si on a modifier la valeur */
        if (modif) {
          //console.log('cc');
          /* on modifier les valeur dans la base */
          if (id_old.startsWith("score")) {
            let score = [];
            for (let index = 1; index < 96; index++) {
              let recupScore = document.getElementById(
                "score" + index
              ).innerHTML;
              score.push(recupScore);
            }

            localStorage.matchx = JSON.stringify(score);
            /*console.log(JSON.parse(localStorage.matchx));*/
          }

          if (id_old.startsWith("equipe")) {
            let equipe = [];
            for (let index = 1; index < 17; index++) {
              let recupEquipe = document.getElementById(
                "equipe" + index
              ).innerHTML;
              equipe.push(recupEquipe);
            }
            localStorage.equipe = JSON.stringify(equipe);
            /*console.log(JSON.parse(localStorage.matchx));*/
          }

          if (id_old.startsWith("scoreEnd")) {
            console.log("test");
            let scoreEnd = [];
            for (let index = 1; index < 30; index++) {
              let recupscoreEnd = document.getElementById("scoreEnd"+index).innerHTML;
              scoreEnd.push(recupscoreEnd);
            }
            localStorage.scoreEnd = JSON.stringify(scoreEnd);
            
          }
        }
        /* on desactive la cellule */
        element.contentEditable = false;
      }
    }
  });
}
/**
 * Action si on touche le bouton entrer du clavier.
 */
document.body.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    editabled(event);
  }
});

function input_edit(e) {
  /* remetre les cellules sous format non editable */
  editabled(e.target);
  /* recupere les informations de la cellule */
  cellule_old_value = e.target.innerText;
  cellule_old_item = e.target.id;
  /* rends celle-ci editable */
  e.target.contentEditable = true;
}

document.querySelectorAll(".tab_input").forEach((element) => {
  element.addEventListener("dblclick", input_edit);
});

/*permet d'afficher les données*/
let scoreTab = JSON.parse(localStorage.matchx);
for (let index = 0; index < scoreTab.length; index++) {
    const element = scoreTab[index];
    document.getElementById(
        "score" + (index+1)
      ).innerHTML = element;
}
/*console.log(localStorage.equipe);
console.log(JSON.parse(localStorage.equipe)); /*un tableau contenu dans une chaine de carctères*/ 
let equipeTab = JSON.parse(localStorage.equipe);
for (let index = 0; index < equipeTab.length; index++) {
    const element = equipeTab[index];
    document.getElementById(
        "equipe" + (index+1)
      ).innerHTML = element;
}


function loadLocal() {
    var scoreFoot = localStorage.getItem('scoreFoot');
    if(scoreFoot !== undefined && scoreFoot != "") {
        let values = JSON.parse(scoreFoot);
        if(values != undefined && values != "") {
            equipeTab = values.equipeTab;
            scoreTab = values.scoreTab;
            addValueTab();
        }
    }
}
/*
sauvegarde de la page cree 
*/
function saveFile() {
    let name_file = "new_file_" + Date.now() + ".json";
    let values = {
        "score" : scoreTab,
        "equipe" : equipeTab,
    }
    var blob = new Blob([JSON.stringify(values)], { type: "text" });
    const blobUrl = URL.createObjectURL(blob);
    
    var fileLink = document.createElement("a");
    fileLink.href = blobUrl;
    
    fileLink.download = name_file;
    
    fileLink.click();
}
function loadFiles(event) {
    let files = event.target.files;

    if (files.length <= 0) {
        return false;
    }
  
    var fr = new FileReader();
  
    fr.onload = function(e) {
    var result = JSON.parse(e.target.result);
    scoreTab = result.scoreTab;
    equipeTab = result.equipeTab;
    addValueTab();
  }
  
  fr.readAsText(files.item(0));
}
function listFind(find) {
    let values = [];
    listData.forEach(element => {
        if(element.scoreTab.toLowerCase().includes(find.toLowerCase()) || 
            element.equipeTab.toLowerCase().includes(find.toLowerCase()))
     {
                values.push(element);
    }
    });
    return values;
}



document.getElementById("save").addEventListener("click", saveFile);

// en cas de changement de fichier (ici d'image)
document.getElementById('fileToUpload').addEventListener('change', loadFiles);

loadLocal();
