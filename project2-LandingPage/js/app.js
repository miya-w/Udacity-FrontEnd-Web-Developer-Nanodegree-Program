/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/
/**
 * Define Global Variables
 * 
*/

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * End Main Functions
 * Begin Events
 * 
*/
// Add class 'active' to section when near top of viewport
// Scroll to anchor ID using scrollTO event
// Set sections as active
// Scroll to section on link click
window.addEventListener('DOMContentLoaded', () => {

  const navigation_items = {
    'Explore': 'section1',
    'About': 'section2',
    'Trip': 'section3',
    'Contact': 'section4',
  };
  

  /***** Build menu******/
// build the nav
  const ul = document.querySelector('.menu_items');
  // Iterate over the object:
  for (const item in navigation_items) {
    // Create a new `li` element with Javascript
    const li = document.createElement('li'); 
    // Create a new `a` element with Javascript
    const a = document.createElement('a')
    // Add the link target
    a.href = "#" + navigation_items[item];
    // Add the link text to the `a` element:
    a.appendChild(document.createTextNode(item));
    // Add the `a` element inside the `li` element:
    li.appendChild(a);
    // Append the `li`element to the `ul` element
    ul.appendChild(li);
  }
  
    // Activate sections
    const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    if (entry.intersectionRatio > 0) {
    document.querySelector(`.navbar__menu li a[href="#${id}"]`).parentElement.classList.add('active');
    } else {
    document.querySelector(`.navbar__menu li a[href="#${id}"]`).parentElement.classList.remove('active');
    }
    });
    });
    
    // Track all sections that have an `id` applied
    document.querySelectorAll('section[id]').forEach((section) => {
    observer.observe(section);
    });
  
    // back to Top-button
    document.querySelector('#backbtn')
    .style.backgroundColor = "white";   
    const button = document.getElementById("backbtn")
    button.addEventListener( 'click', function( event ) {
    window.location.href = "#" ;
    });
  
    });


