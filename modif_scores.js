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

let EndscoreTab = JSON.parse(localStorage.Endscore);
for (let index = 0; index < EndscoreTab.length; index++){
    const element = EndscoreTab[index];
    let element2 = element.split(':');
    document.getElementById(("Endscore") + (element2[0])).innerHTML = element2[1];
}

