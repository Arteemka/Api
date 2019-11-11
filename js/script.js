let findInput = document.getElementsByClassName('find-item-text')[0];
const buttonFind = document.getElementsByClassName('find-item-button')[0];

buttonFind.addEventListener('click',createScript);

function createScript() {
    const script = document.createElement('script');
    const url = constructQueryParams(findInput.value);
    script.type = 'text/javascript';    
    script.src = url;
    document.body.appendChild(script);
    script.parentNode.removeChild(script);
}

function constructQueryParams(searchInput, page = 1) {
    const url = 'https://api.nestoria.co.uk/api?';
    let params = new URLSearchParams();

    params.append('encoding', 'json');
    params.append('pretty', '1');
    params.append('action', 'search_listings');
    params.append('country', 'uk');
    params.append('listing_type', 'rent');
    params.append('page', `${page}`);
    params.append('place_name', searchInput);
    params.append('callback', 'date');
  
    return url + params;
}

function date (obj) {
console.log(obj.response.listings);
}

