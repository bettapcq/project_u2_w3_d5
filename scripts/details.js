//ANNO NEL FOOTER DINAMICO
const setYearFooter = function () {
  const footer = document.getElementById('year');
  footer.innerText = new Date().getFullYear();
};

setYearFooter();

// SEZZIONE PER IDENTIFICARE ID DELLA PIANTA
const url = location.search;
const allTheParameters = new URLSearchParams(location.search) // new URLSearchParams(url);
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
      detailsRow.innerHTML += `
            <div class="col col-12 col-md-8 col-lg-6">
                <div class="card h-100 d-flex flex-column bg-dark">
                    <img src="${plantDetails.imageUrl}" class="card-img-top" alt="...">
                    <div class="card-body flex-grow-1">
                        <h5 class="card-title">${plantDetails.name}</h5>
                        <p class="card-text">${plantDetails.description}</p>
                        <p class="card-text">${plantDetails.brand}</p>
                        <p class="card-text">${plantDetails.price} €</p>
                    </div>
                    <div>
               <button type="button" onclick="editPlant()" class="btn btn-warning">Modifica</button>
               <button type="button" onclick="deletePlant()" class="btn btn-danger">Elimina</button>
                </div>
                </div>
            </div>
        `;
    })
    .catch((err) => {
      alert('Ops! Errore dal server:', err);
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
      console.log('Ops! Errore dal server:', err);
    });
};
