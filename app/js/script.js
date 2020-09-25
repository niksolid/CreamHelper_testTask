; (function () {

  let articleSection = document.querySelector('.article');
  let articleItems = articleSection.querySelectorAll('.article__item');
  let moreBtn = document.querySelector('.article-more__btn');
  let articlesSport = articleSection.querySelectorAll('.sport');
  let articlesHome = articleSection.querySelectorAll('.home');
  let articlesLife = articleSection.querySelectorAll('.life');
  let articles = document.querySelector('.article');
  let articlesNav = document.querySelector('.articles-nav');

  moreArticles(articlesSport);
  scrollWidthFunction();


  moreBtn.onclick = function () {
    btnArticle = articlesNav.querySelector('.is-active');
    if (btnArticle.getAttribute('data-filter') === "in-sport") {
      moreArticles(articlesSport);
    } else if (btnArticle.getAttribute('data-filter') === "in-home") {
      moreArticles(articlesHome);
    } else if (btnArticle.getAttribute('data-filter') === "in-life") {
      moreArticles(articlesLife);
    }
    scrollWidthFunction();
  }


  window.addEventListener("resize", scrollWidthFunction());
  // функция переноса строки в зависимости от ширины экрана
  function scrollWidthFunction() {
    let scrollWidth = document.body.scrollWidth;
    let allClearfix = articleSection.querySelectorAll('.clearfix');
    for (let clearfix of allClearfix) {
      clearfix.remove();
    }
    let eArticles = articleSection.querySelectorAll('.is-active');

    if (scrollWidth >= 1000) {
      for (let i = 2; i <= eArticles.length - 1; i = i + 3) {
        let lineBreak = document.createElement('div');
        lineBreak.classList.add('clearfix');
        lineBreak.classList.add('maxWidth');
        eArticles[i].after(lineBreak);
      }
    } else if (scrollWidth >= 650) {
      for (let i = 1; i <= articleItems.length - 1; i = i + 2) {

        let lineBreak = document.createElement('div');
        lineBreak.classList.add('clearfix');
        lineBreak.classList.add('maxWidth');
        articleItems[i].after(lineBreak);
      }
    } else {
      for (let i = 0; i <= articleItems.length - 1; i++) {
        let lineBreak = document.createElement('div');
        lineBreak.classList.add('clearfix');
        lineBreak.classList.add('maxWidth');
        articleItems[i].after(lineBreak);
      }
    }
  };

  //функция - скрыть все блоки статей
  function articlesHiddenfunction() {
    for (articleItem of articleItems) {
      articleItem.classList.remove('is-active')
      articleItem.classList.add('article__no-active');
    }
  }

  // функция добавления статей
  function moreArticles(articlesCategory) {
    let noActiveArticle = articlesCategory;
    let lengthArticle = articleSection.querySelectorAll('.is-active').length;
    let j = lengthArticle;
    for (let i = 0; i < 6; i++) {
      if (noActiveArticle[j+1] === undefined) {
        moreBtn.classList.add('hidden-Element');
        noActiveArticle[j].classList.remove('article__no-active');
        noActiveArticle[j].classList.add('is-active');
        return;
      } else {
        moreBtn.classList.remove('hidden-Element');
      }
      noActiveArticle[j].classList.remove('article__no-active');
      noActiveArticle[j].classList.add('is-active');
      j++;
    }
  }

  let removeChildren = function (item) {
    while (item.firstChild) {
      item.removeChild(item.firstChild);
    }

  }

  let updateChildren = function (item, children) {
    removeChildren(item);

    for (let i = 0; i <= children.length - 1; i++) {
      item.appendChild(children[i]);
    }
    scrollWidthFunction();

  };
  //библиотека для кнопок навигации
  window.myLib = {};
  window.myLib.closestItemByClass = function (item, className) {
    let node = item;

    while (node) {
      if (node.classList.contains(className)) {
        return node;
      }
      node = node.parentElement;
    }
    return null;
  };

  //сортировка по категориям
  articlesNav.addEventListener('click', function (e) {
    let target = e.target;
    let item = myLib.closestItemByClass(target, 'articles-nav__btn');

    if (item === null || item.classList.contains('is-active')) {
      return;
    }
    e.preventDefault();
    var filterValue = item.getAttribute('data-filter');
    let previousBtnActive = articlesNav.querySelector('.articles-nav__btn.is-active');

    previousBtnActive.classList.remove('is-active');
    item.classList.add('is-active');

    // if (filterValue === 'in-sport') {
    //   updateChildren(articles, articleItems);
    //   return;
    // }

    let filteredItems = [];
    for (let i = 0; i < articleItems.length; i += 1) {
      let current = articleItems[i];
      if (current.getAttribute('data-category') === filterValue) {
        filteredItems.push(current);
      }
    }
    if (filterValue === 'in-home') {
      moreArticles(articlesHome);
    } else if (filterValue === 'in-life') {
      moreArticles(articlesLife);
    } else if (filterValue === 'in-sport') {
      moreArticles(articlesSport);
    }


    updateChildren(articles, filteredItems);


  });

  let btnCategorySport = articlesNav.querySelector('.articles__sport');
  let btnCategoryHome = articlesNav.querySelector('.articles__home');
  let btnCategoryLife = articlesNav.querySelector('.articles__life');

  btnCategorySport.addEventListener('click', () => {
    articlesHiddenfunction();
  })

  btnCategoryHome.addEventListener('click', () => {
    articlesHiddenfunction();
  })

  btnCategoryLife.addEventListener('click', () => {
    articlesHiddenfunction();
  })

})();