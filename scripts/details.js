//ANNO NEL FOOTER DINAMICO
const setYearFooter = function () {
  const footer = document.getElementById('year');
  footer.innerText = new Date().getFullYear();
};

setYearFooter();

const errorModal = document.getElementById('errorModal');
const errorModalText = document.getElementById('errorModalText');

// SEZZIONE PER IDENTIFICARE ID DELLA PIANTA
const allTheParameters = new URLSearchParams(location.search); // new URLSearchParams(url);
const id = allTheParameters.get('_id');
console.log('ID pianta', id);

const productsURL = 'https://striveschool-api.herokuapp.com/api/product';
const detailsRow = document.getElementById('details-row');

const getPlantDetails = () => {
  fetch(productsURL + '/' + id, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYThmZGY0YmQ0NzAwMTU4NWIxZDQiLCJpYXQiOjE3NjI1MDI5MDksImV4cCI6MTc2MzcxMjUwOX0.3WGWCMj_IY_STgHbGw6on4dYStvlUyaStPzC6MOBGzk',
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Ops! Errore dalla risposta:', res.status);
      }
    })
    .then((plantDetails) => {
      console.log(plantDetails);
      detailsRow.innerHTML += `
            <div class="col col-12 col-md-6 col-lg-4">
                <div class="card h-100 d-flex flex-column bg-dark shadow-lg">
                    <img src="${plantDetails.imageUrl}" class="card-img-top" alt="...">
                    <div class="card-body flex-grow-1">
                        <h5 class="card-title">${plantDetails.name}</h5>
                        <p class="card-text">${plantDetails.description}</p>
                        <p class="card-text">${plantDetails.brand}</p>
                        <p class="card-text">${plantDetails.price} €</p>
                    </div>
                    <div class="p-3">
               <button type="button" onclick="editPlant()" class="btn btn-warning">Modifica</button>
               <button type="button" class="btn btn-danger" data-bs-toggle="modal"
              data-bs-target="#deleteModal">Elimina</button>
               <div
              class="modal fade"
              id="deleteModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                      Sicuro di voler eliminare la pianta?
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Annulla
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      data-bs-dismiss="modal"
                      onclick="deletePlant()"
                    >
                      Elimina
                    </button>
                  </div>
                </div>
              </div>
            </div>
                </div>
                </div>
            </div>
        `;
    })
    .catch((err) => {
      alert('Ops! Errore dal server:' + err);
    });
};

getPlantDetails();

// edit btn

const editPlant = () => {
  location.assign('./backoffice.html?_id=' + id);
};

// delete btn
const deletePlant = () => {
  fetch(productsURL + '/' + id, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYThmZGY0YmQ0NzAwMTU4NWIxZDQiLCJpYXQiOjE3NjI1MDI5MDksImV4cCI6MTc2MzcxMjUwOX0.3WGWCMj_IY_STgHbGw6on4dYStvlUyaStPzC6MOBGzk',
    },
    method: 'DELETE',
  })
    .then((res) => {
      if (res.ok) {
        alert('La pianta è stata eliminata!');
        location.assign('./index.html');
      } else {
        throw new Error(`Ops! Errore dalla risposta: ${res.status}`);
      }
    })
    .catch((err) => {
      errorModal.show();
      errorModalText.innerText = 'Ops! Errore dal server:' + err;
    });
};
