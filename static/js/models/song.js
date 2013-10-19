var app = app || {};

app.Song = Backbone.Model.extend({
   defaults:{
    Country: {Title: "Unknown", FlagUrl: "Unknown"},
    Singer: "Unknown", 
    Title: "Unknown", 
    Link: "Unknown",
    Semifinal: 1,
    Final: false,
    FestId: "Unknown"
   },
   
   idAttribute: '_id'
});