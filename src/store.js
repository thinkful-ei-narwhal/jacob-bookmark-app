
const bookmarks = [];
const adding = false;
const filter = 0;
const error = null;


function findById(id) {
  return this.items.find(item => item.id === id);
}

function findAndUpdate(id, newData) {
  const bookmark = this.findById(id)
  Object.assign(bookmark, newData)
}


function addItem(item) {
   this.items.push(item);
}

function findAndDelete(id) {
  this.items = this.items.filter(item => item.id !== id);
}

function toggleRatingFilter() {
  this.hideCheckedItems = !this.hideCheckedItems;
}

const setError = function (error) {
  this.error = error;
};

export default {
  bookmarks,
  hideCheckedItems,
  findAndUpdate,
  findById,
  addItem,
  findAndDelete,
  toggleRatingFilter,
  setError
};