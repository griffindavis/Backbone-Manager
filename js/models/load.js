var app = app || {};

app.Load = Backbone.Model.extend({
    defaults: {
        number: 1, 
        completed: false,
    }, 

    toggle: function() {
        this.save({
            completed: !this.get('completed')
        });
    }, 
});