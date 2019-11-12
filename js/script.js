let findInput = document.getElementsByClassName("find-item-text")[0];
const buttonFind = document.getElementsByClassName("find-item-button")[0];
const output = document.getElementsByClassName("output")[0];
let title;
let bathroom_number;
let bedroom_number;
let price;
let img;

buttonFind.addEventListener("click", getDate);

function getDate() {
  fetch(
    `https://api.nestoria.co.uk/api?encoding=json&pretty=1&action=search_listings&country=uk&listing_type=rent&page=1&place_name=${findInput.value}`
  )
    .then(function(response) {
      return response.json();
    })
    .then(getDateBedroom)
    .catch(function(error) {
      alert(error);
    });
  function getDateBedroom(date) {
    for (let prop of date.response.listings) {
      title = prop.title;
      bathroom_number = prop.bathroom_number;
      bedroom_number = prop.bedroom_number;
      price = prop.price_formatted;
      img = prop.img_url;

      createCard(title, bathroom_number, bedroom_number, price, img);
    }
  }
}

function createCard(title, bathroom_number, bedroom_number, price, img) {
  const createMaDivContainer = document.createElement("DIV");
  const createSideDivContainer = document.createElement("DIV");
  const createTableColumOutText = document.createElement("DIV");
  const createTableColumOutPrice = document.createElement("DIV");
  const createTableColumOutDate = document.createElement("DIV");
  const createTableColumOutTitle = document.createElement("DIV");
  const createTableImg = document.createElement("IMG");

  createMaDivContainer.className = "main";
  output.appendChild(createMaDivContainer);

  createTableImg.src = `${img}`;
  createTableImg.className = "img";
  createSideDivContainer.appendChild(createTableImg);

  createSideDivContainer.className = "sideitem";
  createMaDivContainer.appendChild(createSideDivContainer);

  createSideDivContainer.className = "item img";
  createMaDivContainer.appendChild(createSideDivContainer);

  createTableColumOutTitle.className = "item title";
  createMaDivContainer.appendChild(createTableColumOutTitle);

  createTableColumOutText.className = "item bathroom_number";
  createMaDivContainer.appendChild(createTableColumOutText);

  createTableColumOutDate.className = "item bedroom_number";
  createMaDivContainer.appendChild(createTableColumOutDate);

  createTableColumOutPrice.className = "item price";
  createMaDivContainer.appendChild(createTableColumOutPrice);

  createTableColumOutText.textContent = `BathRooms - ${bathroom_number}`;
  createTableColumOutDate.textContent = `BedRooms - ${bedroom_number}`;
  createTableColumOutPrice.textContent = ` Price $ ${price}`;
  createTableColumOutTitle.textContent = `${title}`;
}
