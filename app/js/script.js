; (function () {

  let articleSection = document.querySelector('.article');
  let articleItems = articleSection.querySelectorAll('.article__item');
  let moreBtn = document.querySelector('.article-more__btn');

  moreArticles();
  scrollWidthFunction();

  moreBtn.onclick = function() {
    moreArticles();
  }

  window.addEventListener("resize", scrollWidthFunction);
  // функция переноса строки в зависимости от ширины экрана
  function scrollWidthFunction() {
    let scrollWidth = document.body.scrollWidth;
    let allClearfix = articleSection.querySelectorAll('.clearfix');
    console.log(allClearfix.length);
    for (let clearfix of allClearfix) {
      clearfix.remove();
      console.log('del clearfix');
    }
    if (scrollWidth >= 1000) {
      for (let i = 2; i <= articleItems.length - 1; i = i + 3) {
        let lineBreak = document.createElement('div');
        lineBreak.classList.add('clearfix');
        lineBreak.classList.add('maxWidth');
        articleItems[i].after(lineBreak);
      }
    } else if (scrollWidth >= 650) {
      for (let i = 1; i <= articleItems.length - 1; i = i + 2) {

        let lineBreak = document.createElement('div');
        lineBreak.classList.add('clearfix');
        lineBreak.classList.add('maxWidth');
        articleItems[i].after(lineBreak);
      }
    } else {
      for (let i = 0; i <= articleItems.length -1; i++) {
        let lineBreak = document.createElement('div');
        lineBreak.classList.add('clearfix');
        lineBreak.classList.add('maxWidth');
        articleItems[i].after(lineBreak);
      }
    }
  };

  // функция добавления статей
  function moreArticles() {
    noActiveArticle = document.querySelectorAll('.article__no-active');
    for (let i = 0; i <= noActiveArticle.length -1 && i < 6; i++){
      noActiveArticle[i].classList.remove('article__no-active');
      noActiveArticle[i].classList.add('is-active');      
    }
    if (noActiveArticle.length <= 6 ) {
      moreBtn.classList.add('hidden-Element');
    }
  }


})();