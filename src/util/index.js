/**
 *
 * @param {Array} pages an array with nested objects
 * @param {Number} fromValue the object identifier you are looking for in the array
 * @param {Number} toValue the value of the id you are moving to
 * @return {Object} the object in the nested array that matches the key value
 */

// TODO: break out the loop into a reusable function

export function findPage(pages, fromValue, toValue) {
  let page;
  let next = [];
  for (let i = 0; i < pages.length; i++) {
    if (pages[i]) {
      page = pages[i].pages.find((page, index) => {
        if (page.id === fromValue && fromValue !== toValue) {
          pages[i].pages.splice(index, 1);
          return page;
        }
      });
      if (page) {
        return page;
      } else {
        pages[i].pages.forEach(page => {
          if (page.pages.length) {
            next.push({
              pages: page.pages
            });
          }
        });
      }
    }
  }
  if (next.length) {
    page = findPage(next, fromValue, toValue);
  }
  return page;
}

export function addPage(pages, toValue, toIndex, newPage) {
  let next = [];
  for (let i = 0; i < pages.length; i++) {
    if (pages[i]) {
      const findObj = pages[i].pages.find(dropTo => {
        if (dropTo.id === toValue) {
          return dropTo;
        }
      });
      if (findObj) {
        findObj.pages.splice(toIndex, 0, newPage);
        break;
      } else {
        pages[i].pages.forEach(page => {
          if (page.pages.length) {
            next.push({
              pages: page.pages
            });
          }
        });
      }
    }
  }
  if (next.length) {
    addPage(next, toValue, toIndex, newPage);
  }
  return null;
}
