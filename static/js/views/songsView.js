var app = app || {};
app.SongsCollection = Backbone.Collection.extend({
           model: app.Song,
           
       });

app.SongsView = Backbone.View.extend({
   el: "<div class='songsBoxWrapper'>",
   songsTemplate : $("#songTemplate").html(),
   tabsTemplate : $("#tabsTemplate").html(),
   
   initialize: function(options){
       this.collection = new app.SongsCollection();
       this.collection.url = "/songs/" + options.festId + "/" + options.semifinal;
       this.collection.bind("reset", this.render, this);             
   },
   
   initializeRendering: function(){
       this.collection.fetch({reset: true});
   },
   
   onClose: function(){
    this.collection.unbind("reset", this.render);
   },
   
   render: function(){
       var tabsTmpl = _.template( this.tabsTemplate );
       this.$el.append(tabsTmpl({tabs: this.collection.toJSON()}));
       
       var songsTmpl = _.template( this.songsTemplate );
       this.$el.append(songsTmpl({songs: this.collection.toJSON()}));
       
       this.$el.tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
       $( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
   }
});