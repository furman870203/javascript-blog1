'use strict';
function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');
   
  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post');

  for(let activeArticle of activeArticles){
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
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles) {

    
    /* get the article id */
    const articleId = article.getAttribute('id');
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;   /* get the title from the title element */

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    
    /* insert link into titleList */
    titleList.innerHTML = titleList.innerHTML + linkHTML;
  }
}

generateTitleLinks();

function generateTags(){
    /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for(let article of articles) {
      
        /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector); 
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      
      /* START LOOP: for each tag */
        for(let tag of articleTagsArray) {
        /* generate HTML of the link */
        const tagHTML = '<li><a href="#' + articleTags + '"><span>' + tag + '</span></a></li>';
        /* add generated code to html variable */
            html = html + tagHTML;
      /* END LOOP: for each tag */
        }
      /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = tagsWrapper.innerHTML + tagHTML;
    /* END LOOP: for every article: */
  }
}
  generateTags();
  
const links = document.querySelectorAll('.titles a');
  
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}