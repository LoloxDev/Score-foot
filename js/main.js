let items = document.querySelectorAll(".drop,.drag");
items.forEach(function (item) {
    item.addEventListener('dragstart', dragstart_handler);
    item.addEventListener('dragover', dragover_handler);
    item.addEventListener('drop', drop_handler);
    item.addEventListener('dragenter', dragenter_handler);
    item.addEventListener('dragleave', dragleave_handler);

  function dragstart_handler(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
  }

  function dragover_handler(e) {
    e.preventDefault();
  }

  function drop_handler(e) {
    e.preventDefault();
    var data = e.dataTransfer.getData("text/plain");
    document
      .getElementById(e.target.id)
      .appendChild(document.getElementById(data));
  }
});
