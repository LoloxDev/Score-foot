/* variables de la page */
let cellule_old_value = "";
let cellule_old_item = "0";
let equipeTab = [];
let scoreTab = [];
let scoreEndTab = [];

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
                        scoreTab = score;
                        saveLocal();
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
                        equipeTab = equipe;
                        saveLocal();

                        /*console.log(JSON.parse(localStorage.matchx));*/
                    }

                    if (id_old.startsWith("scoreEnd")) {
                        let scoreEnd = [];
                        for (let index = 1; index < 30; index++) {
                            let recupscoreEnd = document.getElementById("scoreEnd" + index).innerHTML;
                            scoreEnd.push(recupscoreEnd);
                        }
                        scoreEndTab = scoreEnd;
                        saveLocal();


                    }
                }
                /* on desactive la cellule */
                element.contentEditable = false;
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

          if (id_old.startsWith("Endscore")) {
            console.log("test");
            let Endscore = [];
            for (let index = 1; index < 31; index++) {
                if (document.getElementById("Endscore"+index)!=undefined) {
              let recupEndscore = document.getElementById("Endscore"+index).innerHTML;
              Endscore.push(index+":"+recupEndscore);}
            }
            localStorage.Endscore = JSON.stringify(Endscore);
            console.log(JSON.parse(localStorage.Endscore));


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

function afficherDonnees() {
    //localStorage.scoreEnd = JSON.stringify(scoreEndTab);
     /*permet d'afficher les données*/
     if (localStorage.getItem("score") != undefined && localStorage.getItem("score") != null) {
        scoreEndTab = JSON.parse(localStorage.getItem("score"));
        if(scoreEndTab != undefined) {
            for (let index = 0; index < scoreTab.length; index++) {
                /*const element = scoreTab[index];
                document.getElementById(
                    "score" + (index + 1)
                ).innerHTML = element;*/
            }
        }
    }

    /*permet d'afficher les données*/
    if (localStorage.getItem("matchx") != undefined && localStorage.getItem("matchx") != null) {
        scoreTab = JSON.parse(localStorage.getItem("matchx"));
        if(scoreTab != undefined) {
            for (let index = 0; index < scoreTab.length; index++) {
                const element = scoreTab[index];
                document.getElementById(
                    "score" + (index + 1)
                ).innerHTML = element;
            }
        }
    }
    /*console.log(localStorage.equipe);
    console.log(JSON.parse(localStorage.equipe)); /*un tableau contenu dans une chaine de carctères*/
    if (localStorage.getItem("equipe") != undefined && localStorage.getItem("equipe") != null) {
        equipeTab = JSON.parse(localStorage.getItem("equipe"));
        if(equipeTab != undefined) {
            for (let index = 0; index < equipeTab.length; index++) {
                const element = equipeTab[index];
                document.getElementById(
                    "equipe" + (index + 1)
                ).innerHTML = element;
            }
        }
    }
}

function saveLocal() {
    localStorage.matchx = JSON.stringify(scoreTab);
    localStorage.equipe = JSON.stringify(equipeTab);
    localStorage.score = JSON.stringify(scoreEndTab);

}
function loadLocal() {
    scoreTab = localStorage.getItem("matchx");
    equipeTab = localStorage.getItem("equipe");
    scoreEndTab = localStorage.getItem("score");
}
/*
sauvegarde de la page cree 
*/
function saveFile() {
    let name_file = "new_file_" + Date.now() + ".json";
    let scoreFoot = {
        "score": scoreEndTab,
        "equipe": equipeTab,
        "matchx": scoreTab,
    }
    var blob = new Blob([JSON.stringify(scoreFoot)], { type: "text" });
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

    fr.onload = function (e) {
        var result = JSON.parse(e.target.result);
        scoreTab = result.matchx;
        equipeTab = result.equipe;
        scoreEndTab = result.score;
        if(scoreTab == undefined) {
            scoreTab = [];
        }
        if(equipeTab == undefined) {
            equipeTab = [];
        }
        if(scoreEndTab == undefined) {
            scoreEndTab = [];
        }
        saveLocal();
        afficherDonnees();
    }

    fr.readAsText(files.item(0));
    
}
function listFind(find) {
    let scoreFoot = [];
    listData.forEach(element => {
        if (element.scoreTab.toLowerCase().includes(find.toLowerCase()) ||
            element.equipeTab.toLowerCase().includes(find.toLowerCase())) {
            scoreFoot.push(element);
        }
    });
    return scoreFoot;
}



document.getElementById("save").addEventListener("click", saveFile);

// en cas de changement de fichier (ici d'image)
document.getElementById('fileToUpload').addEventListener('change', loadFiles);


document.querySelectorAll(".delete").forEach(element => {
    element.addEventListener("click", function (e) {
        localStorage.removeItem('matchx');
        localStorage.removeItem('equipe');
    
    });
});


loadLocal();
afficherDonnees();


let EndscoreTab = JSON.parse(localStorage.Endscore);
for (let index = 0; index < EndscoreTab.length; index++){
    const element = EndscoreTab[index];
    let element2 = element.split(':');
    document.getElementById(("Endscore") + (element2[0])).innerHTML = element2[1];
}


