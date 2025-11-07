//ANNO NEL FOOTER DINAMICO
const setYearFooter = function () {
  const footer = document.getElementById('year');
  footer.innerText = new Date().getFullYear();
};

setYearFooter();

//API URL
const productsURL = 'https://striveschool-api.herokuapp.com/api/product';

//SEZIONE PER IDENTIFICARE ID PIANTA
const allTheParameters = new URLSearchParams(location.search); // new URLSearchParams(url);
const id = allTheParameters.get('_id');
console.log('ID pianta', id);



  const titleText = document.getElementById('title-text');
  const formBtn = document.getElementById('form-btn');

//SE L'ID E' PRESENTE NELL'url, TRAMITE GET RIEMPIO IL FORM CON I DETTAGLI DELLA PIANTA
if (id) {

  titleText.innerText = 'Modifica la tua pianta';
  formBtn.innerText = 'Aggiungi modifica';

  fetch(productsURL + '/' + id, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYThmZGY0YmQ0NzAwMTU4NWIxZDQiLCJpYXQiOjE3NjI1MDI5MDksImV4cCI6MTc2MzcxMjUwOX0.3WGWCMj_IY_STgHbGw6on4dYStvlUyaStPzC6MOBGzk',
      'Content-Type': 'application/json',
    },
  }) //QUA USO GET
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
    })
    //compilo il form
    .then((plantDetails) => {
      document.getElementById('name-input').value = plantDetails.name;
      document.getElementById('description-input').value = plantDetails.description;
      document.getElementById('brand-input').value = plantDetails.brand;
      document.getElementById('image-url-input').value = plantDetails.imageUrl;
      document.getElementById('price-input').value = plantDetails.price;
    })
    .catch((err) => {
      console.log('form non completato correttamente:', err);
    });
}

class Product {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

const form = document.getElementById('product-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nameInput = document.getElementById('name-input');
  const descriptionInput = document.getElementById('description-input');
  const brandInput = document.getElementById('brand-input');
  const imageUrlInput = document.getElementById('image-url-input');
  const priceInput = document.getElementById('price-input');

  const name = nameInput.value;
  const description = descriptionInput.value;
  const brand = brandInput.value;

  const imageUrl = imageUrlInput.value;
  const price = priceInput.value;

  const newProduct = new Product(name, description, brand, imageUrl, price);
  console.log('prodotto inserito: ', newProduct);

  //SE L'ID E' PRESENTE NEL SERVER UTILIZZO PUT (MODIFICA) SE NO UTILIZZO POST(AGGIUNGI) E CAMBIO I BOTTONI


  let apiMethod;
  let fullUrl;

  if (id) {
    fullUrl = productsURL + '/' + id;
    apiMethod = 'PUT';
  } else {
    fullUrl = productsURL;
    apiMethod = 'POST';
  }

  fetch(fullUrl, {
    method: apiMethod,
    body: JSON.stringify(newProduct),
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkYThmZGY0YmQ0NzAwMTU4NWIxZDQiLCJpYXQiOjE3NjI1MDI5MDksImV4cCI6MTc2MzcxMjUwOX0.3WGWCMj_IY_STgHbGw6on4dYStvlUyaStPzC6MOBGzk',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.ok) {
        if(apiMethod === 'POST') {
        alert('Bentvenuta in famiglia!');
        form.reset();
        location.assign('./index.html');
        } else {
          alert('Pianta modificata!');
        form.reset();
        location.assign('./index.html');
        }
      } else {
        throw new Error(
          `Ops! Qualcosa è andato storto nella risposta: ${res.status}`
        );
      }
    })
    .catch((err) => {
      console.log('La tua pianta non è stata aggiunta:', err);
    });
});
