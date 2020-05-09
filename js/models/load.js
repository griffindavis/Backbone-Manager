var app = app || {};

app.Load = Backbone.Model.extend({
    defaults: {
        number: 'XXX', 
        selected: false,
        completed: false
    }, 

    toggle: function() {
        this.save({
            completed: !this.get('completed')
        });
    }
});