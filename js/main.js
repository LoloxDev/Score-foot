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
