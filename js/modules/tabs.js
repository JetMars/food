function tabs(tabsContentSelector, tabsSelector, tabsParentSelector, activeClass) {

  const tabs = document.querySelectorAll(tabsSelector);
  const tabContents = document.querySelectorAll(tabsContentSelector);
  const tabParent = document.querySelector(tabsParentSelector);

  function hideTabContents() {
    tabContents.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show');
    });
  }

  function showTabContents(i = 0) {
    tabContents[i].classList.remove('hide', 'fade');
    tabContents[i].classList.add('show', 'fade');
  }


  hideTabContents();
  showTabContents();

  tabParent.addEventListener('click', (e) => {

    const target = e.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {


      tabs.forEach((item, i) => {

        item.classList.remove(activeClass);

        if (item == target) {
          item.classList.add(activeClass);

          hideTabContents();
          showTabContents(i);
        }
      });
    }
  });
}

export default tabs;