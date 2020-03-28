import $ from 'jquery';
import store from './store'
import api from './api';

const generateAddandFilterButton = function () {
    return  `  
     <div class = 'add-new-button'>
        <button class = 'add-new'> New Bookmark </button> 
    </div>
    <div class = 'dropdown'>
        <form id = 'filter-form'>
            <button class= "dropbtn" > Filter By </button>
                <div class="dropdown-content">
                    <a href='#'> <span> &#9733; </span></a>
                    <a href="#"><span> &#9733; &#9733; </span> </a>
                    <a href="#"><span> &#9733; &#9733; &#9733; </span></a>
                    <a href="#"><span> &#9733; &#9733; &#9733; &#9733; </span></a>
                    <a href="#"><span> &#9733; &#9733; &#9733; &#9733; &#9733; </span></a>
                </div>
        </form>
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
       <div id = ${bookmark.id} class = 'bookmark'>
            <div id = 'title'> <span> ${bookmark.title} </span> <span> ${generateStars(bookmark.rating)} </span> </div>
            <div id = 'content' hidden> 
                <div> 
                   <a href = '${bookmark.url}'> <button type = 'button' id = 'visit-site> Visit Site </button> </a>
                    <span> ${bookmark.rating} </span>
                </div>
                <p> ${bookmark.desc} </p>
            </div>
        </div> ` //onclick unhide the div

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
    const bookmarks = bookmarkList.map((bookmark) => generateBookmarkElement(bookmark));
    return bookmarks.join('');
  };


const generateAddBookmarkPage = function () {
    //if add bookark clicked generate this HTML
}

const generateExpandedView = function (expandedView) { //pass the bookmark.id
    $(expandedView).click(function() {
        $(expandedView).find('.content').toggle("slide", { direction: "down" }, 1000);
    });
//might need to quotes around expandedView
}

const generateError = function (message) {
    //HTML for error message
}


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
        console.log('working');
        let bookmarks = [...store.bookmarks];

        

        const addAndFilterButtons = generateAddandFilterButton();

        const bookmarkElementString = generateBookmarkElementString(bookmarks);

        const bringThemTogether =`${generateAddandFilterButton}`;

        $('#add-new-filter-container').html(addAndFilterButtons);
        // $('#add-new-filter-container').html('<div id = "bookmark-element-string">'  + bookmarkElementString + '</div>');
        //if you want an edit function you need the id to call on to edit


    }

    else {
        console.log('not working');
        const addingNewBookmark = generateAddandFilterForms()
        $('#add-new-filter-container').html(addingNewBookmark);
    }
};



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
         console.log('WORKING');

        const newBookmarks = {
            url:  $('#url-input').val(),
            title: $('#bookmark-input').val(),
            desc: $('#description-input').val(),
            rating: $('#rating-input').val()
        };

        console.log(newBookmarks);
        api.createBookmark(newBookmarks)
            .then((newBookmarks) => {
                store.addBookmark(newBookmarks);
                render()
            })
            .catch((error) => {
                store.setError(error.message);
                render();
            });
    });
    
}




const handleFilterBySubmit = function () {
    //upon clicking on a rating handle the proper elements in the DOM
    //if 3 stars call upon function to display only 3 star bookmarks
    //change the filter value in the store to toggle filter

}

const handleExpandedView = function () {
    //handle click of bookmark to go into detailed view
    //change boolean value of expanded in the store
    
}


const bindEventListeners = function () {
    handleNewBookmarkSubmit();
    handleExpandedView();
    handleFilterBySubmit();
    // handleCloseError();
    handleAddBookmarkPage();
    handleCreateBookmarkSubmit();
  
}

export default {
    render,
    bindEventListeners
};