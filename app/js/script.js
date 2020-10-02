(function () {
  const articleSection = document.querySelector('.article')
  const articleItems = articleSection.querySelectorAll('.article__item')
  const moreBtn = document.querySelector('.article-more__btn')
  const articlesSport = articleSection.querySelectorAll('.sport')
  const articlesHome = articleSection.querySelectorAll('.home')
  const articlesLife = articleSection.querySelectorAll('.life')
  const articles = document.querySelector('.article')
  const articlesNav = document.querySelector('.articles-nav')

  moreArticles(articlesSport)
  scrollWidthFunction()

  moreBtn.onclick = function () {
    const btnArticle = articlesNav.querySelector('.is-active')
    if (btnArticle.getAttribute('data-filter') === 'in-sport') {
      moreArticles(articlesSport)
    } else if (btnArticle.getAttribute('data-filter') === 'in-home') {
      moreArticles(articlesHome)
    } else if (btnArticle.getAttribute('data-filter') === 'in-life') {
      moreArticles(articlesLife)
    }
    scrollWidthFunction()
  }

  window.addEventListener('resize', scrollWidthFunction());
  // функция переноса строки в зависимости от ширины экрана
  function scrollWidthFunction () {
    const scrollWidth = document.body.scrollWidth;
    const allClearfix = articleSection.querySelectorAll('.clearfix');
    for (const clearfix of allClearfix) {
      clearfix.remove();
    }
    const eArticles = articleSection.querySelectorAll('.is-active');

    if (scrollWidth >= 1000) {
      for (let i = 2; i <= eArticles.length - 1; i = i + 3) {
        const lineBreak = document.createElement('div');
        lineBreak.classList.add('clearfix');
        lineBreak.classList.add('maxWidth');
        eArticles[i].after(lineBreak);
      }
    } else if (scrollWidth >= 650) {
      for (let i = 1; i <= articleItems.length - 1; i = i + 2) {

        const lineBreak = document.createElement('div');
        lineBreak.classList.add('clearfix');
        lineBreak.classList.add('maxWidth');
        articleItems[i].after(lineBreak);
      }
    } else {
      for (let i = 0; i <= articleItems.length - 1; i++) {
        const lineBreak = document.createElement('div');
        lineBreak.classList.add('clearfix');
        lineBreak.classList.add('maxWidth');
        articleItems[i].after(lineBreak);
      }
    }
  };

  // функция - скрыть все блоки статей
  function articlesHiddenfunction () {
    for (const articleItem of articleItems) {
      articleItem.classList.remove('is-active')
      articleItem.classList.add('article__no-active')
    }
  }

  // функция добавления статей
  function moreArticles (articlesCategory) {
    const noActiveArticle = articlesCategory;
    const lengthArticle = articleSection.querySelectorAll('.is-active').length
    let j = lengthArticle;
    for (let i = 0; i < 6; i++) {
      if (noActiveArticle[j+1] === undefined) {
        moreBtn.classList.add('hidden-Element')
        noActiveArticle[j].classList.remove('article__no-active')
        noActiveArticle[j].classList.add('is-active')
        return
      } else {
        moreBtn.classList.remove('hidden-Element')
      }
      noActiveArticle[j].classList.remove('article__no-active')
      noActiveArticle[j].classList.add('is-active')
      j++
    }
  }

  const removeChildren = function (item) {
    while (item.firstChild) {
      item.removeChild(item.firstChild)
    }

  }

  const updateChildren = function (item, children) {
    removeChildren(item);

    for (let i = 0; i <= children.length - 1; i++) {
      item.appendChild(children[i])
    }
    scrollWidthFunction()
  }

  // библиотека для кнопок навигации
  window.myLib = {}
  window.myLib.closestItemByClass = function (item, className) {
    let node = item

    while (node) {
      if (node.classList.contains(className)) {
        return node
      }
      node = node.parentElement
    }
    return null
  }

  // сортировка по категориям
  articlesNav.addEventListener('click', function (e) {
    const target = e.target
    const item = window.myLib.closestItemByClass(target, 'articles-nav__btn')

    if (item === null || item.classList.contains('is-active')) {
      return
    }
    e.preventDefault()
    var filterValue = item.getAttribute('data-filter')
    const previousBtnActive = articlesNav.querySelector('.articles-nav__btn.is-active')

    previousBtnActive.classList.remove('is-active')
    item.classList.add('is-active')

    // if (filterValue === 'in-sport') {
    //   updateChildren(articles, articleItems);
    //   return;
    // }

    const filteredItems = [];
    for (let i = 0; i < articleItems.length; i += 1) {
      const current = articleItems[i]
      if (current.getAttribute('data-category') === filterValue) {
        filteredItems.push(current)
      }
    }
    if (filterValue === 'in-home') {
      moreArticles(articlesHome)
    } else if (filterValue === 'in-life') {
      moreArticles(articlesLife)
    } else if (filterValue === 'in-sport') {
      moreArticles(articlesSport)
    }

    updateChildren(articles, filteredItems)
  })

  const btnCategorySport = articlesNav.querySelector('.articles__sport')
  const btnCategoryHome = articlesNav.querySelector('.articles__home')
  const btnCategoryLife = articlesNav.querySelector('.articles__life')

  btnCategorySport.addEventListener('click', () => {
    articlesHiddenfunction()
  })

  btnCategoryHome.addEventListener('click', () => {
    articlesHiddenfunction()
  })

  btnCategoryLife.addEventListener('click', () => {
    articlesHiddenfunction()
  })
})()
