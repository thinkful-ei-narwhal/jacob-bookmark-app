import $ from 'jquery';
import store from './store'
import api from './api';


const generateAddandFilterButton = function () {
    return  `
    <div id = 'button-container'
        <div id = 'add-filter-buttons'>  
        <div class = 'add-new-button'>
            <button class = 'add-new'> + Bookmark </button> 
        </div>
        <button id = 'clear-filter'> Clear Filter </button>
        <div class = 'dropdown'>
        <label for = 'filter'> Filter By </label>
            <select id = 'filter'>
                <div class= "dropbtn">Filter By </div>
                            <option value="1" ${displayFilter(1)}> &#9733 </option>
                            <option value="2" ${displayFilter(2)} > &#9733 &#9733 </option>
                            <option value="3" ${displayFilter(3)} > &#9733 &#9733 &#9733 </option>
                            <option value="4" ${displayFilter(4)}> &#9733 &#9733 &#9733 &#9733 </option>
                            <option value="5" ${displayFilter(5)}> &#9733 &#9733 &#9733 &#9733 &#9733 </option>
                            <option value="6" ${displayFilter(6)}> Low to High </option>
                            <option value="7" ${displayFilter(7)}> High to Low </option>
                    </div>
            </select>
        </div>
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
      
    if (!bookmark.expanded)
     {
        return `
        <div id = 'bookmarks'>
            <button data-bookmark-id = '${bookmark.id}' class = 'bookmark'>
                <div id = 'title'> ${bookmark.title}<span id = 'stars'> ${generateStars(bookmark.rating)} </span>
                </div>
         </button> 
       </div>`   
     } else {
    
        return `
  <div id = 'bookmarks'>
     <button id = 'expanded-button' data-bookmark-id = '${bookmark.id}' class = 'bookmark'>
        <div id = 'title'> ${bookmark.title}<span id = 'stars'> ${generateStars(bookmark.rating)} </span>
        </div>
          <div id = 'content'> 
          <div id = 'delete'> <button id = 'delete-bookmark' type = 'button'>Delete</button> 
          </div>
            <p id = 'description'>${bookmark.desc} </p> 
          </div>
      </div> 
      <div> 
      <a target = '_blank' href = '${bookmark.url}'id = 'visit-site'> Visit Site </a>
     </button>
    </div>`
     }
     
}

const handleExpandView = function () {
    $('#add-new-filter-container').on('click', '.bookmark', event => {
        event.preventDefault();
        const id = getItemIdFromElement(event.currentTarget);
        const bookmark = store.findById(id);
        store.toggleExpandeView(bookmark);
        render();

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
    return bookmarks;
  };


const generateAddandFilterForms = function() {
    return `
    
    <form id ='submit-bookmark-form'>
    <h1> Create New Bookmark </h1>
        <label for = 'url-input'> URL: </label>
        <input type = 'text' id = 'url-input' name = 'submit-bookmark-form' required placeholder = 'url'>
        <label for = 'bookmark-input'> Bookmark: </label>
        <input type = 'text' id = 'bookmark-input' name = 'submit-bookmark-form' required placeholder = 'Bookmark Name'>
        <label for = 'rating-input'> Rating: </label>
        <input type = 'text' id = 'rating-input' name = 'submit-bookmark-form' placeholder = '1 - 5'>
        <label for = 'description-input'>Description: </label>
        <input type = 'text' id = 'description-input' name = 'submit-bookmark-form' placeholder = 'Enter your description here:'>
        <div id = 'error-container'> </div>
        <button id = 'create' type = 'submit'> Create </button>
        <button id = 'cancel-button' type = 'submit'> Cancel </button>
    </form>
    <div id = 'error-container'> </div>
    `;

}

const generateHeader = function() {
     return `<h1>My Bookmarks</h1>`

}

const generateAddHeader = function (){
    return `<h1> Add New Bookmark </h1>`
}



const generateError = function (message){
    return `
        <div class = 'error-container'>
            <div id = 'error-button'>
                <button id = 'cancel-error' type = 'submit'> X </button>
             </div>
            <div id = 'error-message'>
                <p> ${message}</p>
            </div>
        </div    
    `;
}



const renderError = function () {
    // if there is an error add the HTML for the error message
    if (store.error) {
        const el = generateError(store.error);
        $('#error-container').html(el);
      } else {
        $('#error-container').empty();
      }
}

const handleCloseError = function() {
    //on click of X remove the HTML for the error message
    $('#add-new-filter-container').on('click', '#cancel-error', () => {
        store.setError(null);
        renderError();
      });

}

const render = function () {
    renderError();
    let bookmarks = [...store.bookmarks];
    console.log(store.filter)

    if(store.filter === 1 || store.filter === 2 || store.filter === 3 || store.filter === 4 || store.filter === 5) {
        bookmarks = bookmarks.filter(bookmarks => bookmarks.rating >= store.filter);
        bookmarks = bookmarks.sort((a,b) => b.rating - a.rating)
    }

    if(store.filter === 7 ) {
        bookmarks = bookmarks.sort((a,b) => b.rating - a.rating)

    }

    if(store.filter === 6 ) {
        bookmarks = bookmarks.sort((a,b) => a.rating - b.rating)
    }
    
    if (!store.adding || store.filter === 0){
        
        const header = generateHeader();
        const addAndFilterButtons = generateAddandFilterButton();

        const bookmarkElement = generateBookmarkElementString(bookmarks);
        // console.log(generateBookmarkElementString(bookmarks))
        const bringThemTogether =`${header}${addAndFilterButtons}${bookmarkElement}`;
        $('#add-new-filter-container').html(bringThemTogether);

        
        // $('#add-new-filter-container').html('<div id = "bookmark-element-string">'  + bookmarkElementString + '</div>');
        //if you want an edit function you need the id to call on to edit


    }

    else if(store.adding) {
        const addHeader = generateAddHeader();
        console.log('header', addHeader)
        const addForms = generateAddandFilterForms();
        const addingNewBookmark = `${addHeader} ${addForms}`;
        $('#add-new-filter-container').html(addingNewBookmark);
    }
};

const displayFilter = function(num) {
    console.log('oh my god pls work', store.filter)
    if (Number(store.filter) === Number(num)){
        console.log('line 225', 'selected')
        return 'selected';
    } 
    
    else { 
        return ''; 
        }
}

const handleFilterBy = function() {
  
    $('#add-new-filter-container').on('change', '#filter', function (){
        let filterVal = $('option:selected').val();
        filterVal = Number(filterVal);
        store.filter = filterVal;
        console.log(store.filter)
        render();
        });

    $('#add-new-filter-container').on('click', '#clear-filter', event => { 
        event.preventDefault();
        store.filter = 0;
        render();
    });
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
        
        if(typeof (newBookmarks.title) === 'undefined' || newBookmarks.title === '' ) {
            newBookmarks.title = 'Think of a clever name for your bookmark'
        }

        api.createBookmark(newBookmarks)
            .then((newBookmarks) => {
                store.addBookmark(newBookmarks);
                render();
            })
            .catch((error) => {
                store.setError(error.message);
                renderError();
            });
    });

};

const handleCancelAddSubmit = function() {
    $('#add-new-filter-container').on('click', '#cancel-button', event => {
        event.preventDefault();
        render();
    })
}

const getItemIdFromElement = function (item) {
    return $(item)
      .closest('.bookmark')
      .data('bookmark-id');
  };
  

  
const handleDeleteBookmark = function() {
    $('#add-new-filter-container').on('click', '#delete-bookmark', event => {
        const id = getItemIdFromElement(event.currentTarget);
        const bookmark = store.findById(id)
        api.deleteBookmark(id)
          .then(() => {
            store.findAndDelete(id);
            render();
          })
          .catch((error) => {
            console.log(error);
            store.setError(error.message);
            renderError();
          });
      });
    };


const bindEventListeners = function () {
    handleNewBookmarkSubmit();
    handleFilterBy();
    handleCloseError();
    handleCreateBookmarkSubmit();
    handleCancelAddSubmit();
    handleExpandView();
    handleDeleteBookmark();
}

export default {
    render,
    bindEventListeners,
    renderError
};