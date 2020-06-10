; (function () {

  let articleSection = document.querySelector('.article');

  let articleItems = articleSection.querySelectorAll('.article__item')
  console.log(articleItems.length);

  scrollWidthFunction();
  window.addEventListener("resize", scrollWidthFunction);

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
    } else if (scrollWidth >= 768) {
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
  }


})();