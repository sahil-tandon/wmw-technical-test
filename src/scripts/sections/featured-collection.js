/**
 * Section: Featured collection
 * ------------------------------------------------------------------------------
 * Featured collection configuration for complete theme support
 * - https://github.com/Shopify/theme-scripts/tree/master/packages/theme-sections
 *
 * @namespace featuredCollection
 */
import {register} from '@shopify/theme-sections';

/**
 * Featured collection constructor
 * Executes on page load as well as Theme Editor `section:load` events.
 *
 * @param {string} container - selector for the section container DOM element
 */
register('featured-collection', {

  init() {
    this.initCache();
    this.initEvents();
  },

  // Initialize featured collection cache
  initCache() {
    this.cache = {
      carousel: $('.featured-collection-carousel'),
      quickAddBtn: $('.featured-collection-carousel .quick-add'),
    }
  },

  // Intialize featured collection events
  initEvents() {
    this.initCarousel();
    this.cache.quickAddBtn.click({updateCartRef: this.updateCart, notifyRef: this.notify}, this.quickAdd);
  },

  // Initialize featured collection carousel
  initCarousel() {
    this.cache.carousel.flickity({
      cellAlign: 'center',
      contain: true,
      freeScroll: false,
      wrapAround: true,
      groupCells: '100%',
      friction: 0.4,
      selectedAttraction: 0.015,
    });
  },

  // Function to quick-add selected product to cart
  quickAdd(event) {
    var thisVariant = $(this).data('variant-id'),
        thisQuantity = $(this).data('quantity');
        
    $.ajax({
      type: 'get',
      url: '/cart/add.js',          
      data: {
        quantity: thisQuantity,
        id: thisVariant
      },
      dataType: 'json',
      updateCart: event.data.updateCartRef,
      notify: event.data.notifyRef,
    })
    .done(function(response) {      
      if(response.message !== undefined) {
        this.notify(response.message);        
      }
      else {
        this.notify("Hooray! The item was added to your Cart.");
        this.updateCart();
      }
    })
    .fail(function(response) {
      this.notify("Oops! Looks like something went wrong. Please try again later.");
    });
  },

  // Function to fetch cart details and update cart quantity shown next to the cart icon in the header
  updateCart() {
    $.getJSON('/cart.js', function(response){
      if(response.item_count !== undefined) {
        $('.site-header__cart').get(0).lastChild.nodeValue = ` Cart (${response.item_count})`;
      }
    });
  },

  // Function to generate a popup notification with a passed message
  notify(msg) {
    $('.notification-popout').text(msg).addClass("active");

    setTimeout(function(){
      $('.notification-popout').removeClass("active");
    }, 4000);
  },

  // Shortcut function called when a section is loaded via 'sections.load()' or by the Theme Editor 'shopify:section:load' event.
  onLoad() {
    // Do something when a section instance is loaded
    this.init();
  },

  // Shortcut function called when a section unloaded by the Theme Editor 'shopify:section:unload' event.
  onUnload() {
    // Do something when a section instance is unloaded
  },

  // Shortcut function called when a section is selected by the Theme Editor 'shopify:section:select' event.
  onSelect() {
    // Do something when a section instance is selected
  },

  // Shortcut function called when a section is deselected by the Theme Editor 'shopify:section:deselect' event.
  onDeselect() {
    // Do something when a section instance is selected
  },

  // Shortcut function called when a section block is selected by the Theme Editor 'shopify:block:select' event.
  onBlockSelect() {
    // Do something when a section block is selected
  },

  // Shortcut function called when a section block is deselected by the Theme Editor 'shopify:block:deselect' event.
  onBlockDeselect() {
    // Do something when a section block is deselected
  },
});
