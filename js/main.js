
let items = document.querySelectorAll(".drop,.drag");
items.forEach(function (item) {
    item.addEventListener('dragstart', dragstart_handler);
    item.addEventListener('dragover', dragover_handler);
    item.addEventListener('drop', drop_handler);
    item.addEventListener('dragenter', dragenter_handler);
    item.addEventListener('dragleave', dragleave_handler);

  function dragstart_handler(e) {
    e.dataTransfer.setData("text/html", e.target.outerHTML);
  }

  function dragover_handler(e) {
    e.preventDefault();
  }

  function drop_handler(e) {
    e.preventDefault();
    if(e.target.classList.contains('drop')) {
          e.target.innerHTML += e.dataTransfer.getData("text/html");
          document.querySelectorAll(".tab_input").forEach((element) => {
            element.addEventListener("dblclick", input_edit);
          });
    }
    
    let elementdrag = e.target.querySelector(".drag");
    let scoredrag = e.target.querySelector(".score");
    let idtarget = this.getAttribute('id');
    let idtarget2 = this.getAttribute('id').split("empty")[1];
    var regEmptyBox = new RegExp('empty');
    idtarget = idtarget.replace(regEmptyBox, 'box');
    idtarget2 = idtarget2.replace(regEmptyBox, 'Endscore');
    elementdrag.setAttribute("oldId",elementdrag.id);
    scoredrag.innerHTML="";
    elementdrag.id = idtarget;
    scoredrag.id = "Endscore" + idtarget2;
    document.querySelectorAll(".tab_input").forEach((element) => {
      element.addEventListener("dblclick", input_edit);



      
    });
    let emptyscoreSave = emptyscore;

    emptyscore = [];
    document.querySelectorAll(".drop").forEach(element => {
      let elementdrag1 = element.querySelector(".drag");
      if (elementdrag1 != undefined) {
        console.log(element);
        console.log(elementdrag1);
        console.log(elementdrag1.getAttribute("oldId"));
        if ( elementdrag1.getAttribute("oldId") != undefined ) {
        emptyscore.push(element.id+":"+elementdrag1.id+":"+elementdrag1.getAttribute("oldId"));
        localStorage.emptyscore = JSON.stringify(emptyscore);
      }
      }
    });
    if (emptyscore.length<=0) {
      emptyscore=emptyscoreSave;
    }
}

function dragenter_handler(e) {
  if ( e.target.className.includes("drop") ) {
        e.target.style.background = "silver";
  }
}

function dragleave_handler(e) {
  if ( e.target.className.includes("drop") ) {
    e.target.style.background = "white";
}
}
  
});