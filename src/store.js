import api from './api'

const bookmarks = [];
const adding = false;
const filter = 0;
const error = null;
const expanded = false;


function findById(id) {
  return this.items.find(item => item.id === id);
}

function findAndUpdate(id, newData) {
  const bookmark = this.findById(id)
  Object.assign(bookmark, newData)
}


function addBookmark(bookmark) {
   bookmark.expanded = false;
   this.bookmarks.push(bookmark);

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
  findAndUpdate,
  findById,
  addBookmark,
  findAndDelete,
  toggleRatingFilter,
  setError
};