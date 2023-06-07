// función buscar por nivel
function searchByLevel() {
    const input = document.getElementById("buscapornivel").value;

    if (input === "Busca por nivel") {
      mensajeDeError("Elige una de las opciones");
      return;
    }
    
    fetch("https://digimon-api.vercel.app/api/digimon")
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("digimon-list").style.display = "none";
        document.getElementById("digimon-div").style.display = "none";
        const resultDiv = document.getElementById("resultados");
        resultDiv.innerHTML = "";  
        let filtrados;
        if (input.toLowerCase() === "in training") {
          filtrados = data.filter(
            (digimon) =>
              digimon.level.toLowerCase() === "in training" ||
              digimon.level.toLowerCase() === "training"
          );
        } else {
          filtrados = data.filter(
            (digimon) => digimon.level.toLowerCase() === input.toLowerCase()
          );
        } 
        const levelTitle = document.createElement("div");
        levelTitle.innerHTML = `
          <div class="row">
            <h1 class="text-center text-primary">Nivel: ${input}</h1>
            <p class="text-center">Hay <strong>${filtrados.length}</strong> Digimon de este nivel en nuestra Digibase!</p>
          </div>
        `;
        resultDiv.appendChild(levelTitle);

        filtrados.forEach((digimon) => {
          const card = document.createElement("div");
          card.classList.add("card", "justify-content-center", "text-center", "col-xs-6", "col-sm-6", "col-md-4", "col-lg-2", "col-xl-2", "m-2", "pb-4");
          card.innerHTML = `
                <div class="col-sm-12 col-md-3 modal-content justify-content-center">                 
                  <div class="row card-header-name justify-content-center bg-warning">${digimon.name}
                  </div>
                  <div class="col-md-12">
                    <div class="modal-content justify-content-center pt-3 pl-3">
                    <img src="${digimon.img}" class="d-block">
                    </div>      
                  </div>
                </div>
                `;
          card.addEventListener('click', () => {
            showModal(digimon);
          });
          resultDiv.appendChild(card);
        }); 
        document.getElementById("buscapornivel").value = "all";
        document.getElementById("buscapornivel").blur();
      })
      .catch((error) => {
        mensajeDeError("Ocurrió un error en la solicitud.");
        console.error(error);
      });
  }

  function mensajeDeError(message) {
    const errorDiv = document.getElementById("error-message");
    errorDiv.innerText = message;
    errorDiv.style.display = "block";
  }

  function showModal(digimon) {
    var modal = $('<div id="card-modal-style" class="modal fade" tabindex="-1">');
    var dialog = $('<div class="modal-dialog modal-dialog-centered modal-sm">');
    var content = $('<div class="modal-content card ml-3 pr-3">');
    var header = $('<div id="card-header-name" class="modal-header card-header text-end bg-warning">').text(digimon.name);
    var body = $('<div class="modal-content">');
    var img = $('<img>').addClass("img-fluid").attr('src', digimon.img);
    var level = $('<p id="card-level-p">').addClass("text-center mt-5").text('DIGINivel: ' + digimon.level);
    var closeButton = $('<button type="button" class="btn text-dark bg-warning" data-dismiss="modal"><i class="fa fa-times"></i></button>');
    closeButton.on('click', function () {
      modal.modal('hide');
    });
    body.append(img, level);
    body.append(img);
    header.append(closeButton);
    content.append(header, body);
    dialog.append(content);
    modal.append(dialog);
    $('body').append(modal);
    modal.modal('show');
  }