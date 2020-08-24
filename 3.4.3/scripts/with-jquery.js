/**
 * IP3 (IB908C), VT 2020 Web Development, Client Side
 *
 * Assignment: 3.4.3,
 * Navigation.
 *
 * A simple page with a drop down menu implemented with jQuery and CSS.
 * 
 * Features:
 * - Hover with jQuery
 * - Animate with jQuery
 * - Animate stop with jQuery
 * - CSS with jQuery
 * 
 * My personal opinion is not to use jQuery with any animation or with any CSS at all,
 * to be frank actually do not use jQuery at all, its a library that is a bit unnecessary
 * today, it just makes things worse and harder to write code, once upon a time it was
 * actually a library that made things easier but today its pretty much the opposit and
 * just adds offset, code gets messy and everything done with jquery is much slower than
 * using CSS and pure Javascript.
 *
 * References:
 * https://api.jquery.com/animate
 * https://api.jquery.com/stop/
 * https://stackoverflow.com/a/24762848
 */
$(document).ready(() => {
  for (const menu of Array.from($('.menu')).map((menu) => $(menu))) {
    const items = menu.find('.items');
    const links = $(items).find('a');

    menu.hover(() => {
      // Stop any animation in progress 
      menu.stop();
      items.stop();

      menu.animate({ height: '50px' }, {
        duration: 50,
        queue: false,
        complete: () => {
          items.css('visibility', 'visible');
          items.animate({ width: items.get(0).scrollWidth }, {
            duration: 100,
            queue: false,
          });
        }
      });
    }, () => {
      // Stop any animation in progress 
      menu.stop();
      items.stop();

      items.animate({ width: '0%', }, {
        duration: 100,
        queue: false,
        complete: () => {
          menu.animate({ height: '40px' }, {
            duration: 50,
            queue: false,
            complete: () => {
              items.css('visibility', 'hidden');
            }
          });
        }
      });
    });

    for (const link of links) {
      const item = $(link);
      item.hover(() => item.css('color', 'white'), () => item.css('color', ''));
    }
  }
});
