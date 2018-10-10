const baseURL = 'https://api.edamam.com/search'; //1
const key = "34d0af076d3c193208c509bdfef0f91d"; //2
const appId = "b6d34534";
let url;

const searchTerm = document.querySelector('.search');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');

//RESULTS NAVIGATION
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');

//RESULTS SECTION
const section = document.querySelector('section');

// nav.style.display = 'none';

let pageNumber = 0;
let displayNav = false;

searchForm.addEventListener('submit', fetchResults);
// nextBtn.addEventListener('click', nextPage);
// previousBtn.addEventListener('click', previousPage);

//Fetch Results
function fetchResults(e) {
    e.preventDefault();

    url = baseURL + '?api_id' + appId + '?api_key=' + key + '&q=' + searchTerm.value;
    console.log("URL:", url);

    fetch(url).then(function(result) {
        return result.json();
    }).then(function(json) {
        displayResults(json);
    });

}

function displayResults(json) {

    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }

    let articles = json.response.docs;

    if(articles.length === 10) {
        nav.style.display = 'block';
    } else {
        nav.style.display = 'none';
    }

    if (articles.lenth === 0) {
        console.log("no results");
    } else {
        for(let i = 0; i < articles.length; i++) {
            let article = document.createElement('article');
            let heading = document.createElement('h2');
            let link = document.createElement('a');
            let img = document.createElement('img');
            let para = document.createElement('p');
            let clearfix = document.createElement('div');

            let current = articles[i];
            console.log('Current:', current);

            link.href = current.web_url;
            link.textContent = current.headline.main;

            para.textContent = 'Keywords: ';

            for(let j = 0; j < current.keywords.length; j++) {
                let span = document.createElement('span');
                span.textContent += current.keywords[j].value + ' ';
                para.appendChild(span);
            }

            if(current.multimedia.length > 0) {
                img.src = 'http://www.nytimes.com/' + current.multimedia[0].url;
                img.alt = current.headline.main;
            }

            clearfix.setAttribute('class', 'clearfix');

            article.appendChild(heading);
            heading.appendChild(link);
            article.appendChild(img);
            article.appendChild(para);
            article.appendChild(clearfix);
            section.appendChild(article);
        }
    }
};

function nextPage(e) {
    pageNumber++;
    fetchResults(e);
    console.log("Page number:", pageNumber);
};

function previousPage(e) {
    if(pageNumber > 0) {
        pageNumber--;
    } else {
        return;
    }
    fetchResults(e);
    console.log("Page:", pageNumber);
}
