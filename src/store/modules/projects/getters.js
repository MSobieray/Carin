const projects = state => state.projects,
  projectData = state => state.projectData;

// How do you use js doc to document a function that returns a function?
const findPage = (state, getters) => (id, data = null) => {
  const pages = data || state.projectData.pages;
  let page;
  let next = [];
  for (let i = 0; i < pages.length; i++) {
    page = pages[i].pages.find(page => page.id === id);
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
  if (next.length) {
    page = getters.findPage(id, next);
  }
  return page;
};

export default {
  projects,
  projectData,
  findPage
};
