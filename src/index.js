import "../styles.css";
import api from './api';
import $ from 'jquery';
import bookmarks from './bookmarks'
import store from './store'

const main = function () {
console.log(api.getBookmarks());
 

api.getBookmarks()
    .then((bookmarks) => {
        return Object.keys(bookmarks).forEach((bookmark) => store.addBookmark(bookmark))
     })

     

    bookmarks.bindEventListeners();
    bookmarks.render();
  };
  

  $(main);