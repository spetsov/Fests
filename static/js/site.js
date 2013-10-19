var app = app || {};
var AppRouter = Backbone.Router.extend({
        routes: {
            "fest/:id/:semifinal": "getFest",
            "": "home" // Backbone will try match the route above first
        },
        initialize: function(options){
            this.appView = options.appView;
        },
        
        getFest: function (id, semifinal) {
        var songsView = new app.SongsView({"festId": id, "semifinal": semifinal});  
        this.appView.showView(songsView);
        },
        
        home: function () {
        var festsView = new app.FestsView();  
        this.appView.showView(festsView); 
        }
        
    });
    // Instantiate the router
    var app_router = new AppRouter({"appView":new app.AppView()});


$(function() {
    Backbone.history.start();
	
});