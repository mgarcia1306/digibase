// función buscar por nombre
function searchByName() {
  const input = document.getElementById("buscapornombre").value;

  fetch(`https://digimon-api.vercel.app/api/digimon/name/${input}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        mensajeDeError("Digimon no encontrado");
        document.getElementById("resultados").innerHTML = "";
      } else {
        document.getElementById("digimon-list").style.display = "none";
        document.getElementById("digimon-div").style.display = "none";
        const resultDiv = document.getElementById("resultados");
        resultDiv.innerHTML = "";
        data.forEach((digimon) => {
          const card = document.createElement("div");
          card.classList.add("card", "col-md-4", "pb-4");
          card.innerHTML = `
          <div class="col-sm-12 col-md-3 modal-content">         
            <div class="row card-header-name justify-content-center bg-warning">${digimon.name}
            </div>
            <div class="row">
            <div class="col-md-12 text-center justify-content-center">
              <div class="modal-content justify-content-center pt-3 pb-4">
              <img src="${digimon.img}" class="img-fluid d-block">
              </div>
              <div class="col-md-12">
              <p id="card-level-p">Nivel: ${digimon.level}</p>
              </div>      
            </div>
            </div>
          </div>
          `;
          resultDiv.appendChild(card);
          document.getElementById("buscapornombre").value = "";
        });
      }
    })

    .catch((error) => {
      mensajeDeError("Nada por aquí, nada por allá...");
      console.error(error);
    });
}

function mensajeDeError(message) {
  const errorDiv = document.getElementById("error-message");
  errorDiv.innerText = message;
  errorDiv.style.display = "block";
}