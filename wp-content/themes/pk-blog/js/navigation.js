/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
( function() {
  var menu = document.getElementsByClassName('main-navigation')[0],
      menuBtn = document.getElementsByClassName('menu-toggle')[0],
      menuCloseBtn = document.getElementsByClassName('menu-close-btn')[0],
      searchForm = document.getElementsByClassName('widget_search')[0],
      searchMenuBtn = document.getElementsByClassName('menu-item-53')[0].childNodes[0],
      searchBtn = document.getElementsByClassName('search-submit')[0],
      baseFontSize = parseInt(getStyle(document.getElementsByTagName('html')[0],
                              'font-size'), 10),
      menuHeight,
      menuHeightRem,
      searchHeight,
      searchHeightRem,
      tabletWidth = 600,
      windowState;

  document.addEventListener('DOMContentLoaded', function() {
    navigationInit();
    window.addEventListener('resize', reInit);
  });

  function navigationInit() {
    searchInit();
    menuInit();
    searchMenuInit();
    menuBtnInit();
    menuCloseBtnInit();
    searchBtnInit();
    setWindowState();
  };

  function reInit() {
    if (windowStateIsChanged()) {
      resetNavInit();
      navigationInit();
    }
  }

  function searchInit() {
    searchHeight = searchForm.offsetHeight;
    searchHeightRem = searchHeight / baseFontSize;
    searchForm.style.maxHeight = '0';
    searchForm.style.transition = '0.7s';
    searchForm.classList.add('hidden');
    if (!isMobile()) {
      searchForm.style.transform = 'none';
      searchForm.style.position = 'static';
    }
  }

  function menuInit() {
    if (isMobile()) {
      menuHeight = menu.offsetHeight;
      menuHeightRem = menuHeight / baseFontSize;
      menu.style.position = 'relative';
      menu.style.background = '#292929';
      menu.style.maxHeight = '0';
      menu.style.transition = '0.7s';
      menu.style.transform = 'none';
      menu.classList.add('hidden');
    }
  }

  function searchMenuInit() {
    searchMenuBtn.addEventListener('click', searchMenuBtnClick);
  }

  function menuBtnInit() {
    if (isMobile()) {
      menuBtn.addEventListener('click', menuBtnClick);
    }
  }

  function menuCloseBtnInit() {
    if (isMobile()) {
      menuCloseBtn.addEventListener('click', menuCloseBtnClick);
    }
  }

  function searchBtnInit() {
    searchBtn.classList.add('fa');
    searchBtn.value = "";
  }

  function resetNavInit() {
    searchForm.removeAttribute('style');
    searchForm.classList.remove('hidden');
    menu.removeAttribute('style');
    menu.classList.remove('hidden');
    searchMenuBtn.removeEventListener('click', menuBtnClick);
    menuBtn.removeEventListener('click', menuBtnClick);
    menuCloseBtn.removeEventListener('click', menuCloseBtnClick);
  }

  function setWindowState() {
    windowState = isMobile();
  }

  function windowStateIsChanged() {
    return windowState !== isMobile();
  }

  function isMobile() {
    return window.innerWidth < tabletWidth;
  }

  function searchMenuBtnClick() {
    if (searchIsHidden()) {
      slideDown(searchForm, searchHeightRem);
      if (isMobile()) {
        slideDown(menu, menuHeightRem + searchHeightRem);
      }
    } else {
      slideUp(searchForm);
      if (isMobile()) {
        slideUp(menu, menuHeightRem);
      }
    }
  }

  function menuBtnClick() {
    if (menuIsHidden()) {
      if (searchIsHidden()) {
        slideDown(menu, menuHeightRem);
      } else {
        slideDown(menu, menuHeightRem + searchHeightRem);
      }
    } else {
      slideUp(menu);
    }
  }

  function menuCloseBtnClick() {
    slideUp(menu);
  }

  function slideUp(element, heightRem = 0) {
    element.style.maxHeight = heightRem + 'rem';
    if (!heightRem) {
      element.classList.add('hidden');
    }
  }

  function slideDown(element, heightRem) {
    element.style.maxHeight = heightRem + 'rem';
    element.classList.remove('hidden');
  }

  function menuIsHidden() {
    return menu.classList.contains('hidden');
  }

  function searchIsHidden() {
    return searchForm.classList.contains('hidden');
  }

  function getStyle(element,styleProp) {
    var camelize = function (str) {
      return str.replace(/\-(\w)/g, function(str, letter){
        return letter.toUpperCase();
      });
    };

    if (element.currentStyle) {
      return element.currentStyle[camelize(styleProp)];
    } else if (document.defaultView && document.defaultView.getComputedStyle) {
      return document.defaultView.getComputedStyle(element,null)
                                 .getPropertyValue(styleProp);
    } else {
      return element.style[camelize(styleProp)];
    }
  }
} )();
