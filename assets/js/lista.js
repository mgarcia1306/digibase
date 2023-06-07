// lista inicio
const apiUrl = 'https://digimon-api.vercel.app/api/digimon';

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const digimonDiv = document.getElementById('digimon-div');
    const textoBienvenida = document.createElement('div');
    textoBienvenida.classList.add('text-center', 'row');
    textoBienvenida.innerHTML = `<h4>Haz click sobre uno de estos Digimon o busca por nombre o nivel!</h4>`;
    digimonDiv.appendChild(textoBienvenida);

    const digimonList = document.getElementById('digimon-list');
    data.forEach(digimon => {
      const digimonItem = document.createElement('div');
      digimonItem.classList.add('border-secondary-subtle');
      digimonItem.innerHTML = `<img src="${digimon.img}" >`;

      digimonItem.addEventListener('click', () => {
        showModal(digimon);
      });

      digimonList.appendChild(digimonItem);
    });
  })

  .catch(error => console.error(error));

function showModal(digimon) {
  var modal = $('<div id="card-modal-style" class="modal fade" tabindex="-1">');
  var dialog = $('<div class="modal-dialog modal-dialog-centered modal-sm">');
  var content = $('<div class="modal-content card ml-3 pr-3">');
  var header = $('<div id="card-header-name" class="modal-header card-header text-end bg-warning">').text(digimon.name);
  var body = $('<div class="modal-content">');
  var img = $('<img>').addClass("img-fluid").attr('src', digimon.img);
  var level = $('<p id="card-level-p">').addClass("text-center mt-5").text('Nivel: ' + digimon.level);
  var closeButton = $('<button type="button" class="btn text-dark bg-warning" data-dismiss="modal"><i class="fa fa-times"></i></button>');
  
  closeButton.on('click', function () {
    modal.modal('hide');
  });
  
  body.append(img, level);
  header.append(closeButton);
  content.append(header, body);
  dialog.append(content);
  modal.append(dialog);
  $('body').append(modal);
  modal.modal('show');
}