let findInput = document.getElementsByClassName("find-item-text")[0];
const buttonFind = document.getElementsByClassName("find-item-button")[0];
const output = document.getElementsByClassName("output")[0];
let modal = document.getElementsByClassName("modal")[0];
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

    output.addEventListener("click", function(e) {
      const index = Array.from(e.target.parentElement.children).indexOf(
        e.target
      );

      createModal(
        arr[index].title,
        arr[index].property_type,
        arr[index].summary,
        arr[index].img_url
      );
      modal.style.display = "block";
    });

    window.addEventListener("click", event => {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
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

function createModal(title, type, summary, img) {
  const modalChange = document.getElementsByClassName("modal-main")[0];

  if (modalChange === undefined) {
    const createMaDivContainer = document.createElement("DIV");
    const createTableColumOutSummary = document.createElement("DIV");
    const createTableColumOutFlat = document.createElement("DIV");
    const createTableColumOutTitle = document.createElement("DIV");
    const createSideDivContainer = document.createElement("DIV");
    const createCloseSpan = document.createElement("SPAN");
    const createTableImg = document.createElement("IMG");

    createMaDivContainer.className = "modal-main";
    modal.appendChild(createMaDivContainer);

    createCloseSpan.className = "close";
    createCloseSpan.innerHTML = "&times;";

    createTableImg.src = `${img}`;
    createTableImg.className = "img2";
    createSideDivContainer.appendChild(createTableImg);

    createSideDivContainer.className = "item2 img";
    createMaDivContainer.appendChild(createSideDivContainer);

    createTableColumOutTitle.className = "item2 title";
    createMaDivContainer.appendChild(createTableColumOutTitle);

    createTableColumOutSummary.className = "item2 summary";
    createMaDivContainer.appendChild(createTableColumOutSummary);

    createTableColumOutFlat.className = "item2 flat";
    createMaDivContainer.appendChild(createTableColumOutFlat);

    createMaDivContainer.appendChild(createCloseSpan);

    createTableColumOutFlat.textContent = `Type - ${type}`;
    createTableColumOutSummary.textContent = `${summary}`;
    createTableColumOutTitle.textContent = ` title: ${title}`;
  }

  document.getElementsByClassName(
    "item2 title"
  )[0].textContent = `title: ${title}`;
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
