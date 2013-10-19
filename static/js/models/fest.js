var app = app || {};

app.Fest = Backbone.Model.extend({
   defaults:{
    Title: "Unknown", 
    LogoUrl: "Unknown",
    StartDate: new Date(),
    QualifiersDate: new Date(),
    EndDate: new Date()
   },
   
   idAttribute: '_id'
});