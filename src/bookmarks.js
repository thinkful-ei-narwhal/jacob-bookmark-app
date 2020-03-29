import $ from 'jquery';
import store from './store'
import api from './api';
import index from './index'

const generateAddandFilterButton = function () {
    return  `
    <div id = 'add-filter-buttons'>  
     <div class = 'add-new-button'>
        <button class = 'add-new'> + Bookmark </button> 
    </div>
    <div class = 'dropdown'>
        <form id = 'filter-form'>
            <button class= "dropbtn" > Filter By </button>
                <div class="dropdown-content">
                    <ul id = 'filter-stars'>
                        <li><span> &#9733; </span></li>
                        <li><span> &#9733; &#9733; </span> </li>
                        <li><span> &#9733; &#9733; &#9733; </span></li>
                        <li><span> &#9733; &#9733; &#9733; &#9733; </span></li>
                        <li><span> &#9733; &#9733; &#9733; &#9733; &#9733; </span></li>
                </div>
        </form>
     </div>
    </div>`; 
}



//for the title the stars change to trashcan, background changes to grey, higlight background
//when not checked it looks like all the rest




//create element with generatebookmark element 
//add that to the HTML
//then call generateExpandedView
//pass it bookmark.id



const generateBookmarkElement = function(bookmark) {
       return  ` 
       <div id = '${bookmark.id}' class = 'bookmark'>
            <div id = 'title'> ${bookmark.title}<span id = 'stars'> ${generateStars(bookmark.rating)} </span> </div>
            <div id = 'expand'> <button id = 'collapsible' type = 'collapsible'>&#x2193</button> </div>
            
            <div id = 'content' hidden> 
                <div> 
                   <a href = '${bookmark.url}'> <button type = 'button' id = 'visit-site'> Visit Site </button> </a>
                    <span> ${bookmark.rating} </span>
                </div>
                <p> ${bookmark.desc} </p> 
            </div>
        </div> ` //onclick unhide the div

}

const handleExpandView = function () {
    $('#add-new-filter-container').on('click', '#collapsible', event => {
        event.preventDefault();
        $('#content').closest('div').toggle(500);
    });

} 
const generateStars = function (numOfStars) {
    let stars = '';
   // &#9733  -> filled in 
   //&#9734 -- unfilled
    for (let i = 0; i < 5; i++) {
        if (numOfStars > 0) {
            stars += '&#9733 '
        } else {
            stars += '&#9734 '
        }
        numOfStars--;
    }
return stars;
}



const generateBookmarkElementString = function (bookmarkList) {
    let bookmarks = bookmarkList.map(bookmark => generateBookmarkElement(bookmark)).join("");
    console.log('line 76', bookmarkList)
    console.log(generateBookmarkElement(bookmarks))
    return bookmarks;
  };



const generateAddBookmarkPage = function () {
    //if add bookark clicked generate this HTML
}

// const generateError = function (message) {
//     //HTML for error message
// }


const generateAddandFilterForms = function() {
    return `
    <form id ='submit-bookmark-form'>
        <label for = 'url-input'> URL: </label>
        <input type = 'text' id = 'url-input' name = 'submit-bookmark-form' placeholder = 'url'>
        <label for = 'bookmark-input'> Bookmark: </label>
        <input type = 'text' id = 'bookmark-input' name = 'submit-bookmark-form' placeholder = 'Bookmark Name'>
        <label for = 'rating-input'> 1 - 5  </label>
        <input type = 'text' id = 'rating-input' name = 'submit-bookmark-form' placeholder = '1 - 5'>
        <label for = 'description-input'>Description: </label>
        <input type = 'text' id = 'description-input' name = 'submit-bookmark-form' placeholder = 'Enter your description here:'>
        <button id = 'create' type = 'submit'> Create </button>
        <button id = 'cancel-button' type = 'submit'> Cancel </button>
    </form>
    `;

}

const renderError = function () {
    // if there is an error add the HTML for the error message
    if (store.error) {
        const el = generateError(store.error);
        $('.error-container').html(el);
      } else {
        $('.error-container').empty();
      }
}

// const handleCloseError = function {
//     //on click of X remove the HTML for the error message
//     $('.error-container').on('click', '#cancel-error', () => {
//         store.setError(null);
//         renderError();
//       });

// }

const render = function () {
    renderError();
    
    if (!store.adding){
        console.log('line 137 working');
        let bookmarks = [...store.bookmarks];
        

        const addAndFilterButtons = generateAddandFilterButton();

        const bookmarkElement = generateBookmarkElementString(bookmarks);
        // console.log(generateBookmarkElementString(bookmarks))
        const bringThemTogether =`${addAndFilterButtons} ${bookmarkElement}`;
        $('#add-new-filter-container').html(bringThemTogether);
        // $('#add-new-filter-container').html('<div id = "bookmark-element-string">'  + bookmarkElementString + '</div>');
        //if you want an edit function you need the id to call on to edit


    }

    else {
        console.log('not working');
        const addingNewBookmark = generateAddandFilterForms()
        $('#add-new-filter-container').html(addingNewBookmark);
    }
};

const handleFilterBy = function() {
    $('#add-new-filter-container').on('click', '.dropdown-content', event => {
        event.preventDefault();
        let bookmarks = [...store.bookmarks];
        if(store.bookmark.rating === 0) {
            bookmarks.filter(bookmarks => bookmarks.rating === 0)
        } else if (store.bookmark.rating === 1){
            bookmarks.filter(bookmarks => bookmarks.rating === 1)
        } else if (store.bookmark.rating === 2){
            bookmarks.filter(bookmarks => bookmarks.rating === 2)
        } else if (store.bookmark.rating === 3){
            bookmarks.filter(bookmarks => bookmarks.rating === 3)
        } else if (store.bookmark.rating === 4){
            bookmarks.filter(bookmarks => bookmarks.rating === 4)
        } else {
            bookmarks.filter(bookmarks => bookmarks.rating === 5)
        }
    })
}

const handleAddBookmarkPage = function () {
   
}

const handleNewBookmarkSubmit = function () {
    // upon submitting a new bookmark -> add the html into the page
    //for instance -> if add new is submitted call the generateBookmarkElement()

    $('#add-new-filter-container').on('click', '.add-new', event => {
         event.preventDefault();
         const addForm = generateAddandFilterForms();
         $('#add-new-filter-container').html(addForm);
    });
}


const handleCreateBookmarkSubmit = function() {
    $('#add-new-filter-container').on('submit', '#submit-bookmark-form', event => {
        event.preventDefault();

        const newBookmarks = {
            url:  $('#url-input').val(),
            title: $('#bookmark-input').val(),
            desc: $('#description-input').val(),
            rating: $('#rating-input').val()
        };
        
        api.createBookmark(newBookmarks)
            .then(res => res.json())
            .then((newBookmarks) => {
                store.addBookmark(newBookmarks);
                render();
            })
            .catch((error) => {
                store.setError(error.message);
                render();
            });
    });

};

const handleCancelAddSubmit = function() {
    $('#add-new-filter-container').on('click', '#cancel-button', event => {
        event.preventDefault();
        render();
    })
}


const bindEventListeners = function () {
    handleNewBookmarkSubmit();
    handleFilterBy();
    // handleCloseError();
    handleAddBookmarkPage();
    handleCreateBookmarkSubmit();
    handleCancelAddSubmit();
    handleExpandView();

}

export default {
    render,
    bindEventListeners
};