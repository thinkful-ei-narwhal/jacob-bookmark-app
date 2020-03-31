

const bookmarks = [];
const adding = false;
const filter = 0;
const error = null;

function findById(id) {
  return this.bookmarks.find(bookmark => bookmark.id === id);
}

function findAndUpdate(id, newData) {
  const bookmark = this.findById(id)
  Object.assign(bookmark, newData)
}


function addBookmark(bookmark) {
    const newBookmark = {
        id: bookmark.id,
        title: bookmark.title,
        rating: bookmark.rating,
        url: bookmark.url,
        desc: bookmark.desc,
        expanded: false
    };

   this.bookmarks.push(newBookmark);
}

function toggleExpandeView(bookmark) {
    bookmark.expanded = !bookmark.expanded;
}

function findAndDelete(id) {
    this.bookmarks = this.bookmarks.filter(item => item.id !== id);
}

function toggleRatingFilter(rating) {
    this.filter = rating;
   
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
  setError,
  toggleExpandeView,
  toggleRatingFilter,
  filter,
  error
};