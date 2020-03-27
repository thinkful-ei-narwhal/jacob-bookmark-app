import "../styles.css";
import api from './api';
import $ from 'jquery';
import bookmarks from './bookmarks'

const main = function () {
    api.createBookmark('Title')
        .then(res => res.json())
        .then((newBookmark) => {
            return api.getBookmarks();
        })
        .then(res => res.json())
        .then((bookmarks) => {
            console.log(bookmarks);
        })
    // bookmarks.bindEventListeners();
    // bookmarks.render();
  };
  

  $(main);