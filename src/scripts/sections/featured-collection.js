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
      quickAddBtn: $('.featured-collection-carousel .quick-add')
    }
  },

  // Intialize featured collection events
  initEvents() {
    this.initCarousel();
    this.cache.quickAddBtn.click(this.quickAdd);
  },

  // Initialize featured collection carousel
  initCarousel() {
    this.cache.carousel.flickity({
      cellAlign: 'center',
      contain: true,
      groupCells: '100%',
    });
  },

  // Function to quick-add selected product to cart
  quickAdd(event) {
    var thisVariant = $(this).data('variant-id'),
        thisQuantity = $(this).data('quantity');
        
    $.post('/cart/add.js', {
      quantity: thisQuantity,
      id: thisVariant
    });    
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
