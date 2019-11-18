let findInput = document.getElementsByClassName("find-item-text")[0];
const buttonFind = document.getElementsByClassName("find-item-button")[0];
const output = document.getElementsByClassName("output")[0];
let modal = document.getElementsByClassName("modal")[0];
let arr;
let pannier = [];

buttonFind.addEventListener('click', getDate);

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
    arr = date.response.listings;

    for (let prop of arr) {
      createCard(
        prop.title,
        prop.bathroom_number,
        prop.bedroom_number,
        prop.price,
        prop.img_url
      );
    }

    let elements = document.querySelectorAll(".item");
    let favorites = document.querySelectorAll(".favorites");

    elements.forEach(function(element, index) {
      element.addEventListener("click", function() {
        createModal(
          arr[index].title,
          arr[index].property_type,
          arr[index].summary,
          arr[index].img_url
        );

        modal.style.display = "block";
      });
    });

    favorites.forEach(function(element, index) {
      element.addEventListener("click", function(event) {
        event.stopPropagation();

        if (pannier.includes(arr[index])) {
          let itemFavorites = pannier.indexOf(arr[index]);
          pannier.splice(itemFavorites, 1);
        } else {
          pannier.push(arr[index]);
        }
      });
    });

    window.addEventListener("click", event => {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  }
}

function createCard(title, bathroom_number, bedroom_number, price, img) {
  const createMainDivContainer = document.createElement("DIV");
  const createSideDivContainer = document.createElement("DIV");
  const createFlexDivContainer = document.createElement("DIV");
  const createFlexItemOutbathroom = document.createElement("DIV");
  const createFlexItemOutPrice = document.createElement("DIV");
  const createFlexItemOutbedroom = document.createElement("DIV");
  const createFlexItemOutTitle = document.createElement("DIV");
  const createFlexItemOutFavorites = document.createElement("DIV");
  const createTableImg = document.createElement("IMG");

  createFlexDivContainer.className = "item";
  output.appendChild(createFlexDivContainer);

  createMainDivContainer.className = "item-image";
  createFlexDivContainer.appendChild(createMainDivContainer);

  createSideDivContainer.className = "item-info";
  createFlexDivContainer.appendChild(createSideDivContainer);

  createTableImg.src = `${img}`;
  createTableImg.className = "img";
  createMainDivContainer.appendChild(createTableImg);
  
  createFlexItemOutFavorites.className = "item-info-block favorites";
  createFlexItemOutFavorites.innerHTML = "&#10084;";
  createSideDivContainer.appendChild(createFlexItemOutFavorites);

  createFlexItemOutTitle.className = "item-info-block title";
  createSideDivContainer.appendChild(createFlexItemOutTitle);

  createFlexItemOutbathroom.className = "item-info-block bathroom_number";
  createSideDivContainer.appendChild(createFlexItemOutbathroom);

  createFlexItemOutbedroom.className = "item-info-block bedroom_number";
  createSideDivContainer.appendChild(createFlexItemOutbedroom);

  createFlexItemOutPrice.className = "item-info-block price";
  createSideDivContainer.appendChild(createFlexItemOutPrice);

  createFlexItemOutbathroom.textContent = `BathRooms - ${bathroom_number}`;
  createFlexItemOutbedroom.textContent = `BedRooms - ${bedroom_number}`;
  createFlexItemOutPrice.textContent = ` Price $ ${price}`;
  createFlexItemOutTitle.textContent = `${title}`;
}

function createModal(title, type, summary, img) {
  const modalChange = document.getElementsByClassName("item-modal")[0];

  if (modalChange === undefined) {
    const createFlexDivContainer = document.createElement("DIV");
    const createFlexItemOutSummary = document.createElement("DIV");
    const createFlexItemOutFlat = document.createElement("DIV");
    const createFlexItemOutTitle = document.createElement("DIV");
    const createSideDivContainer = document.createElement("DIV");
    const createCloseSpan = document.createElement("SPAN");
    const createTableImg = document.createElement("IMG");
    const createMainDivContainer = document.createElement("DIV");

    createFlexDivContainer.className = "item-modal";
    modal.appendChild(createFlexDivContainer);

    createMainDivContainer.className = "item-image";
    createFlexDivContainer.appendChild(createMainDivContainer);

    createSideDivContainer.className = "item-info";
    createFlexDivContainer.appendChild(createSideDivContainer);

    createCloseSpan.className = "item-info-block2 close";
    createCloseSpan.innerHTML = "&times;";

    createTableImg.src = `${img}`;
    createTableImg.className = "img2";
    createMainDivContainer.appendChild(createTableImg);

    createSideDivContainer.appendChild(createCloseSpan);

    createFlexItemOutTitle.className = "item-info-block2 title2";
    createSideDivContainer.appendChild(createFlexItemOutTitle);

    createFlexItemOutSummary.className = "item-info-block2 summary2";
    createSideDivContainer.appendChild(createFlexItemOutSummary);

    createFlexItemOutFlat.className = "item-info-block2 flat2";
    createSideDivContainer.appendChild(createFlexItemOutFlat);

    createFlexItemOutFlat.textContent = `Type - ${type}`;
    createFlexItemOutSummary.textContent = `${summary}`;
    createFlexItemOutTitle.textContent = `${title}`;
  }

  document.getElementsByClassName(
    "item-info-block2 title2"
  )[0].textContent = `${title}`;
  document.getElementsByClassName(
    "item-info-block2 summary2"
  )[0].textContent = `${summary}`;
  document.getElementsByClassName(
    "item-info-block2 flat2"
  )[0].textContent = `Type - ${type}`;
  document.querySelector(".img2").src = img;

  const span = document.getElementsByClassName("close")[0];

  span.addEventListener("click", function() {
    modal.style.display = "none";
  });
}
