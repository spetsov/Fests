var app = app || {};
app.SongsCollection = Backbone.Collection.extend({
           model: app.Fest,
           
       });

app.FestsView = Backbone.View.extend({
   festsTemplate : $("#festsTemplate").html(),
   el: "<div class='boxWrapper'>",
   
   initialize: function(options){
       this.collection = new app.SongsCollection();
       this.collection.url = "/fests";
       this.collection.bind("reset", this.render, this);             
   },
   
   initializeRendering: function(){
       this.collection.fetch({reset: true});
   },
   
   onClose: function(){
    this.collection.unbind("reset", this.render);
   },
   
   render: function(){
       var tmpl = _.template( this.festsTemplate );
       this.$el.append(tmpl({fests: this.collection.toJSON()}))
   }
});