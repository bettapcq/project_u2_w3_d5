//ANNO NEL FOOTER DINAMICO
const setYearFooter = function () {
  const footer = document.getElementById('year');
  footer.innerText = new Date().getFullYear();
};

setYearFooter();

const productsURL = 'https://striveschool-api.herokuapp.com/api/product';

const errorModal = document.getElementById('errorModal');
const errorModalText = document.getElementById('errorModalText');

const getProducts = function () {
  //mostro lo spinner
  const spinner = document.getElementById('spinner');
  spinner.classList.remove('d-none');
  fetch(productsURL, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYThmZGY0YmQ0NzAwMTU4NWIxZDQiLCJpYXQiOjE3NjI1MDI5MDksImV4cCI6MTc2MzcxMjUwOX0.3WGWCMj_IY_STgHbGw6on4dYStvlUyaStPzC6MOBGzk',
    },
    // method: 'GET',
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(
          alert('Ops! qualcosa è andato storto nella risposta:' + res.status)
        );
      }
    })
    .then((plantsArray) => {
      console.log(plantsArray);
      const productsRow = document.getElementById('products-row');
      plantsArray.forEach((plant) => {
        productsRow.innerHTML += `
            <div class="col">
                <div class="card h-100 d-flex flex-column bg-dark">
                    <img src="${plant.imageUrl}" class="card-img-top" alt="plant">
                    <div class="card-body flex-grow-1">
                        <h5 class="card-title">${plant.name}</h5>
                        <p class="card-text">${plant.description}</p>
                        <p class="card-text">${plant.brand}</p>
                        <p class="card-text">${plant.price} €</p>
                    </div>
               <a href="./details.html?_id=${plant._id}" target="_blank" class="btn btn-success m-2">Vai ai dettagli</a>
                </div>
            </div>
        `;
      });
      // tolgo lo spinner
      spinner.classList.add('d-none');
    })
    .catch((err) => {
      errorModal.show();
      errorModalText.innerText = "Ops, c'è un problema con il server: " + err;
    });
};

getProducts();
