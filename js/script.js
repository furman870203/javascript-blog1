'use strict';
function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');


  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorListSelector = '.authors.list';


function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for (let article of articles) {


    /* get the article id */
    const articleId = article.getAttribute('id');
    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* insert link into titleList */
    titleList.innerHTML = titleList.innerHTML + linkHTML;
  }
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags) {
  let paramsMinimum = Math.min(999999);
  let paramsMaximum = Math.max(0);
  for (let tag in tags) {

    if (tags[tag] > paramsMaximum) {
      paramsMaximum = tags[tag];
    }
    if (tags[tag] < paramsMinimum) {
      paramsMinimum = tags[tag];
    }
  }
  return {
    max: paramsMaximum,
    min: paramsMinimum
  };
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const tagHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      /* add generated code to html variable */
      html = html + tagHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  /* [NEW2] */
  const tagsParams = calculateTagsParams(allTags);


  /* [NEW] create variable for all links HTMl code */
  let allTagsHTML = '';
  /* [NEW] start loop: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
    allTagsHTML += tagLinkHTML;

  }

  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;

}
generateTags();

function tagClickHandler(event) {

  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {
    /* remove class active */
    activeTagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll(href);
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags() {
  /* find all links to tags */
  const linkTags = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let linkTag of linkTags) {
    /* add tagClickHandler as event listener for that link */
    linkTag.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */

  }
}
addClickListenersToTags();

function generateAuthors() {

  let allAuthors = {};

  const articles = document.querySelectorAll('article');
  for (let article of articles) {
    const author = article.getAttribute('data-author');
    allAuthors[author] = author;
    const authorHTML = '<li><a href="#author-' + author + '"><span>' + author + '</span></a></li>';
    article.querySelector(optArticleAuthorSelector).innerHTML = authorHTML;
  }
  const authorList = document.querySelector(optAuthorListSelector);

  let allAuthorsHTML = '';
  for (let author in allAuthors) {

    const authorLinkHTML = '<li><a href="#author-' + author + '"><span>' + author + '</span></a></li>';
    allAuthorsHTML += authorLinkHTML;

  }

  authorList.innerHTML = allAuthorsHTML;
}
generateAuthors();


function authorClickHandler(event) {

  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');

  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  for (let activeAuthor of activeAuthors) {

    activeAuthor.classList.remove('active');

  }

  const authorLinks = document.querySelectorAll(href);
  for (let authorLink of authorLinks) {

    authorLink.classList.add('active');

  }
  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors() {

  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  for (let authorLink of authorLinks) {

    authorLink.addEventListener('click', authorClickHandler);


  }
}


addClickListenersToAuthors();
