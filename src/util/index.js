import { auth } from "@/firebase/config";
import store from "@/store";
import router from "@/router";
/**
 *
 * @param {Array} pages an array with nested objects
 * @param {Number} fromValue the object identifier you are looking for in the array
 * @param {Number} toValue the value of the id you are moving to
 * @return {Object} the object in the nested array that matches the key value
 */

// TODO: break out the loop into a reusable function

// export function findPage(pages, fromValue, toValue) {
//   let page;
//   let next = [];
//   for (let i = 0; i < pages.length; i++) {
//     if (pages[i]) {
//       page = pages[i].pages.find((page, index) => {
//         if (page.id === fromValue && fromValue !== toValue) {
//           pages[i].pages.splice(index, 1);
//           return page;
//         }
//       });
//       if (page) {
//         return page;
//       } else {
//         pages[i].pages.forEach(page => {
//           if (page.pages.length) {
//             next.push({
//               pages: page.pages
//             });
//           }
//         });
//       }
//     }
//   }
//   if (next.length) {
//     page = findPage(next, fromValue, toValue);
//   }
//   return page;
// }

export function addPage(pages, toPageId, toIndex, newPage) {
  let next = [];
  for (let i = 0; i < pages.length; i++) {
    if (pages[i]) {
      const findObj = pages[i].pages.find(dropTo => {
        if (dropTo.id === toPageId) {
          return dropTo;
        }
      });
      if (findObj && toPageId !== newPage.id) {
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
    addPage(next, toPageId, toIndex, newPage);
  }
  return null;
}

export function removePage(allPages, removedPage, toPageId) {
  let page;
  let next = [];
  for (let i = 0; i < allPages.length; i++) {
    if (allPages[i]) {
      page = allPages[i].pages.find(page => {
        return page.id === removedPage.id;
      });
    }
    if (page) {
      const pageIndex = allPages[i].pages.findIndex(page => {
        return page.id === removedPage.id;
      });
      if (page.id !== toPageId) {
        allPages[i].pages.splice(pageIndex, 1);
      } else {
        break;
      }
      break;
    } else {
      allPages[i].pages.forEach(page => {
        if (page.pages.length) {
          next.push({
            pages: page.pages
          });
        }
      });
    }
  }

  if (next.length) {
    removePage(next, removedPage, toPageId);
  }
}

export function editPage(pages, updatedPage) {
  let page;
  let next = [];
  for (let i = 0; i < pages.length; i++) {
    if (pages[i]) {
      page = pages[i].pages.find(page => {
        return page.id === updatedPage.id;
      });
    }
    if (page) {
      const pageIndex = pages[i].pages.findIndex(page => {
        return page.id === updatedPage.id;
      });
      pages[i].pages.splice(pageIndex, 1, updatedPage);
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
  if (next.length) {
    editPage(next, updatedPage);
  }
}

export const checkAuthStatus = () => {
  return new Promise((resolve, reject) => {
    try {
      auth.onAuthStateChanged(user => {
        if (user && !store.state.Auth.user.uid) {
          store.dispatch("Auth/setUser", user);
          store.dispatch("loading", true);
          store.dispatch("Auth/createUser", user);
          store.dispatch("Sidebar/set", { type: "main" }, { root: true });
          if (router.currentRoute.name === "login") {
            router.push({ name: "dashboard" });
          }
          resolve(user);
        } else if (user && store.state.Auth.user.uid) {
          resolve("already logged in");
        } else {
          resolve("not logged in");
        }
      });
    } catch {
      reject("api failed");
    }
  });
};
