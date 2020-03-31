import "../styles.css";
import api from './api';
import $ from 'jquery';
import bookmarks from './bookmarks'
import store from './store'

const main = function () {

api.getBookmarks()
    // .then(res => res.json())
    .then((bookmarks) => {
        console.log('index 13', bookmarks)
        return bookmarks.forEach((bookmark) => store.addBookmark(bookmark))
     })
     .then(event =>
        {
        bookmarks.bindEventListeners();

         bookmarks.render();
        })
    .catch((error) => {
        store.setError(error.message);
        bookmarks.renderError();
    })
  };
  

  $(main);