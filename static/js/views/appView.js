var app = app || {};

Backbone.View.prototype.close = function(){
  this.remove();
  this.unbind();
  if (this.onClose){
    this.onClose();
  }
}

app.AppView = function AppView(){
 
    this.showView = function(view) {
    if (this.currentView){
      this.currentView.close();
    }
 
    this.currentView = view;
    this.currentView.initializeRendering();
    
    $("#mainContent").html(this.currentView.el);
  }
 
};