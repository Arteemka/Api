let findInput = document.getElementsByClassName("find-item-text")[0];
const buttonFind = document.getElementsByClassName("find-item-button")[0];
const output = document.getElementsByClassName("output")[0];
let modal = document.getElementsByClassName("modal")[0];
const flex = document.getElementsByClassName("flex")[0];
let arr;

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

    let elements = document.querySelectorAll(".flex");

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
  const createTableImg = document.createElement("IMG");

  createFlexDivContainer.className = "flex";
  output.appendChild(createFlexDivContainer);

  createMainDivContainer.className = "main";
  createFlexDivContainer.appendChild(createMainDivContainer);

  createSideDivContainer.className = "sidemain";
  createFlexDivContainer.appendChild(createSideDivContainer);

  createTableImg.src = `${img}`;
  createTableImg.className = "img";
  createMainDivContainer.appendChild(createTableImg);

  createFlexItemOutTitle.className = "item title";
  createSideDivContainer.appendChild(createFlexItemOutTitle);

  createFlexItemOutbathroom.className = "item bathroom_number";
  createSideDivContainer.appendChild(createFlexItemOutbathroom);

  createFlexItemOutbedroom.className = "item bedroom_number";
  createSideDivContainer.appendChild(createFlexItemOutbedroom);

  createFlexItemOutPrice.className = "item price";
  createSideDivContainer.appendChild(createFlexItemOutPrice);

  createFlexItemOutbathroom.textContent = `BathRooms - ${bathroom_number}`;
  createFlexItemOutbedroom.textContent = `BedRooms - ${bedroom_number}`;
  createFlexItemOutPrice.textContent = ` Price $ ${price}`;
  createFlexItemOutTitle.textContent = `${title}`;
}

function createModal(title, type, summary, img) {
  const modalChange = document.getElementsByClassName("modal-main")[0];

  if (modalChange === undefined) {
    const createFlexDivContainer = document.createElement("DIV");
    const createFlexItemOutSummary = document.createElement("DIV");
    const createFlexItemOutFlat = document.createElement("DIV");
    const createFlexItemOutTitle = document.createElement("DIV");
    const createSideDivContainer = document.createElement("DIV");
    const createCloseSpan = document.createElement("SPAN");
    const createTableImg = document.createElement("IMG");
    const createMainDivContainer = document.createElement("DIV");

    createFlexDivContainer.className = "modal-main";
    modal.appendChild(createFlexDivContainer);

    createMainDivContainer.className = "main";
    createFlexDivContainer.appendChild(createMainDivContainer);

    createSideDivContainer.className = "sidemain";
    createFlexDivContainer.appendChild(createSideDivContainer);

    createCloseSpan.className = "item2 close";
    createCloseSpan.innerHTML = "&times;";

    createTableImg.src = `${img}`;
    createTableImg.className = "img2";
    createMainDivContainer.appendChild(createTableImg);

    createSideDivContainer.appendChild(createCloseSpan);

    createFlexItemOutTitle.className = "item2 title";
    createSideDivContainer.appendChild(createFlexItemOutTitle);

    createFlexItemOutSummary.className = "item2 summary";
    createSideDivContainer.appendChild(createFlexItemOutSummary);

    createFlexItemOutFlat.className = "item2 flat";
    createSideDivContainer.appendChild(createFlexItemOutFlat);

    createFlexItemOutFlat.textContent = `Type - ${type}`;
    createFlexItemOutSummary.textContent = `${summary}`;
    createFlexItemOutTitle.textContent = `${title}`;
  }

  document.getElementsByClassName("item2 title")[0].textContent = `${title}`;
  document.getElementsByClassName(
    "item2 summary"
  )[0].textContent = `${summary}`;
  document.getElementsByClassName(
    "item2 flat"
  )[0].textContent = `Type - ${type}`;
  document.querySelector(".img2").src = img;

  const span = document.getElementsByClassName("close")[0];

  span.addEventListener("click", function() {
    modal.style.display = "none";
  });
}
