let findInput = document.getElementsByClassName("find-item-text")[0];
const buttonFind = document.getElementsByClassName("find-item-button")[0];
const output = document.getElementsByClassName("output")[0];
let modal = document.getElementsByClassName("modal")[0];
let box = document.getElementsByClassName("box")[0];
let modalBox = document.getElementsByClassName("modal-box")[0];
let whiteCanvas = document.getElementsByClassName("white-canvas")[0];
let text = document.createElement("P");
let close = document.createElement("SPAN");
let blockTextAndClose = document.createElement("div");
const createModalItemBox = document.createElement("div");
let changeButtonLoad = document.querySelector(".button-LoadMore");
let changeButtonPagination = document.querySelector(".button-Pagination");
let buttonLoad = document.getElementsByClassName("LoadMore")[0];
let span = document.getElementsByClassName("page-output")[0];
let arr = [];
let pannier = [];
let code = "";
let size = 100,
  page = 1;

whiteCanvas.appendChild(blockTextAndClose);

blockTextAndClose.className = "block-Text-And-Close";
blockTextAndClose.appendChild(text);
text.textContent = "Корзина пуста, вы ничего не добавили!!!";

close.className = "close_modal_box";
blockTextAndClose.appendChild(close);
close.innerHTML = "&times;";
createModalItemBox.className = "modal-items";

buttonFind.addEventListener("click", getDate);

document.addEventListener("DOMContentLoaded", init, false);

function getDate(page) {
  fetch(
    `https://api.nestoria.co.uk/api?encoding=json&pretty=1&action=search_listings&country=uk&listing_type=rent&page=${page}&place_name=${findInput.value}`
  )
    .then(function(response) {
      return response.json();
    })
    .then(getDateBedroom)
    .catch(function(error) {
      alert(error);
    });

  function getDateBedroom(date) {
    if (buttonLoad.style.display == "block") {
      output.innerHTML = "";
      arr = [...arr, ...date.response.listings];
    } else {
      arr = [...date.response.listings];
    }

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
          let itemFavorite = pannier.indexOf(arr[index]);
          pannier.splice(itemFavorite, 1);
        } else {
          pannier.push(arr[index]);
        }
      });
    });

    window.addEventListener("click", function(event) {
      switch (event.target) {
        case modal:
          modal.style.display = "none";
          break;
        case modalBox:
          modalBox.style.display = "none";
          break;
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

    createCloseSpan.className = "item-info-modal-block close";
    createCloseSpan.innerHTML = "&times;";

    createTableImg.src = `${img}`;
    createTableImg.className = "img-info-modal-block";
    createMainDivContainer.appendChild(createTableImg);

    createSideDivContainer.appendChild(createCloseSpan);

    createFlexItemOutTitle.className = "item-info-modal-block title-modal";
    createSideDivContainer.appendChild(createFlexItemOutTitle);

    createFlexItemOutSummary.className = "item-info-modal-block summary-modal";
    createSideDivContainer.appendChild(createFlexItemOutSummary);

    createFlexItemOutFlat.className = "item-info-modal-block flat-modal";
    createSideDivContainer.appendChild(createFlexItemOutFlat);

    createFlexItemOutFlat.textContent = `Type - ${type}`;
    createFlexItemOutSummary.textContent = `${summary}`;
    createFlexItemOutTitle.textContent = `${title}`;
  }

  document.getElementsByClassName(
    "item-info-modal-block title-modal"
  )[0].textContent = `${title}`;
  document.getElementsByClassName(
    "item-info-modal-block summary-modal"
  )[0].textContent = `${summary}`;
  document.getElementsByClassName(
    "item-info-modal-block flat-modal"
  )[0].textContent = `Type - ${type}`;
  document.querySelector(".img-info-modal-block").src = img;

  const span = document.getElementsByClassName("close")[0];

  span.addEventListener("click", function() {
    modal.style.display = "none";
  });
}

box.addEventListener("click", function() {
  createModalItemBox.innerHTML = "";
  modalBox.style.display = "block";

  if (pannier.length == 0) {
    blockTextAndClose.getElementsByTagName("p")[0].style.display = "block";
  }

  pannier.forEach(function(item) {
    blockTextAndClose.getElementsByTagName("p")[0].style.display = "none";
    addCardInBox(item.img_url, item.bedroom_number, item.title);
  });

  let deleteItem = document.querySelectorAll(".close_box");

  deleteItem.forEach(function(item, index) {
    item.addEventListener("click", function(event) {
      if (createModalItemBox.childNodes.length === 0) {
        document.getElementsByTagName("p")[0].style.display = "block";
      }
      event.target.parentNode.remove();
      pannier.splice(index, 1);
    });
  });

  close.addEventListener("click", function() {
    modalBox.style.display = "none";
  });
});

function addCardInBox(img, bedroom, title) {
  const createFlexDivContainer = document.createElement("DIV");
  const createFlexItemOutbedroom = document.createElement("DIV");
  const createFlexItemOutTitle = document.createElement("DIV");
  const createCloseSpan = document.createElement("SPAN");
  const createImg = document.createElement("IMG");

  createFlexDivContainer.className = "item-box";
  whiteCanvas.appendChild(createModalItemBox);
  createModalItemBox.appendChild(createFlexDivContainer);

  createImg.src = `${img}`;
  createImg.className = "img-box";

  createCloseSpan.className = "item-box-block close_box";
  createCloseSpan.innerHTML = "&times;";
  createFlexDivContainer.appendChild(createCloseSpan);
  createFlexDivContainer.appendChild(createImg);

  createFlexItemOutbedroom.className = "item-box-block bedroom_number_box";
  createFlexDivContainer.appendChild(createFlexItemOutbedroom);

  createFlexItemOutTitle.className = "item-box-block title_box";
  createFlexDivContainer.appendChild(createFlexItemOutTitle);

  createFlexItemOutbedroom.textContent = `Bedroom - ${bedroom}`;
  createFlexItemOutTitle.textContent = `${title}`;
}

changeButtonLoad.addEventListener("click", function() {
  document.getElementById("pagination").style.display = "none";
  buttonLoad.style.display = "block";
});

buttonLoad.addEventListener("click", function() {
  page++;
  getDate(page);
});

changeButtonPagination.addEventListener("click", function() {
  buttonLoad.style.display = "none";
  document.getElementById("pagination").style.display = "block";
});

function init() {
  function addPage(a, b) {
    for (let i = a; i < b; i++) {
      code += "<a>" + i + "</a>";
    }
  }

  function clickOnPage() {
    output.innerHTML = "";
    page = +this.innerHTML;

    startPage();
    getDate(page);
  }

  function finishPage() {
    output.innerHTML = "";
    page = 100;

    getDate(page);
    startPage();
  }

  function startclickPage() {
    output.innerHTML = "";
    page = 1;

    getDate(page);
    startPage();
  }

  function currentPage() {
    let a = document.querySelectorAll("a");

    for (let i = 0; i < a.length; i++) {
      if (+a[i].innerHTML === page) a[i].className = "current";
      a[i].addEventListener("click", clickOnPage, false);
    }
  }

  function outputOnPage() {
    span.innerHTML = code;
    code = "";

    currentPage();
  }

  function startPage() {
    if (page < 5) {
      addPage(1, 6);
    } else if (page > 97) {
      addPage(96, 101);
    } else {
      addPage(page - 2, page + 3);
    }
    outputOnPage();
  }

  document
    .getElementsByClassName("finish")[0]
    .addEventListener("click", finishPage, false);
  document
    .getElementsByClassName("start")[0]
    .addEventListener("click", startclickPage, false);

  startPage();
}
