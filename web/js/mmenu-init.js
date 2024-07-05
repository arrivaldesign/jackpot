document.addEventListener(
    "DOMContentLoaded", () => {
        var menu = new Mmenu( "#menu", {
           "extensions": [
              "pagedim-black",
              "position-right",
              "theme-dark"
           ],
           "iconbar": {
              "use": true,
              "top": [
                 "<a href='/commercial'><i class='fa fa-home'></i></a>"
              ],
              "bottom": [
                 '<a href="https://twitter.com/MarineRescueTec"><i class="fab fa-twitter"></i></a>',
                 '<a href="https://www.linkedin.com/company/marine-rescue-technologies-ltd"><i class="fab fa-linkedin-in"></i></a>'
              ]
           },
           "iconPanels": true
        });
		var api = menu.API;
		api.bind( "close:start",
			( panel ) => {
				$('.menu-btn').removeClass('open');
			}
		);
    }
);