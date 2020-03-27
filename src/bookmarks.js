// import $ from 'jquery';

// const generateBookmarkElement = function (bookmark) {
//     let BookmarkTitle =  `<li class = 'bookmark-li'> ${store.bookmarks.title} </li>`
    
// }

// const generateBookmarkElementString = function (bookmarkList) {
//     const bookmarks = bookmarkList.map((item) => generateBookmarkElement(bookmark));
//     return bookmarks.join('');
//   };


// const generateAddBookmarkPage = function () {
//     //if add bookark clicked generate this HTML
// }

// const generateExpandedViewPage = function () {
//     //if bookmark clicked generate this html
// }

// const generateError = function (message) {
//     //HTML for error message
// }

// const renderError = function () {
//     // if there is an error add the HTML for the error message
//     if (store.error) {
//         const el = generateError(store.error);
//         $('.error-container').html(el);
//       } else {
//         $('.error-container').empty();
//       }
// }

// const handleCloseError = function {
//     //on click of X remove the HTML for the error message
//     $('.error-container').on('click', '#cancel-error', () => {
//         store.setError(null);
//         renderError();
//       });

// }

// const render = function () {
//     renderError();

// }

// const handleAddBookmarkPage = function () {
//     generateAddBookmarkPage();
// }

// const handleNewBookmarkSubmit = function () {
//     // upon submitting a new bookmark -> add the html into the page
//     //for instance -> if add new is submitted call the generateBookmarkElement()
//     generateBookmarkElement()


// }


// const handleFilterBySubmit = function () {
//     //upon clicking on a rating handle the proper elements in the DOM
//     //if 3 stars call upon function to display only 3 star bookmarks
//     //change the filter value in the store to toggle filter

// }

// const handleExpandedView = function () {
//     //handle click of bookmark to go into detailed view
//     //change boolean value of expanded in the store
//     generateExpandedViewPage();
// }


// const bindEventListeners = function () {
//     handleNewBookmarkSubmit();
//     handleExpandedView();
//     handleFilterBySubmit();
//     handleCloseError();
//     handleAddBookmarkPage();
  
// }

// export default {
//     render,
//     bindEventListeners
// };