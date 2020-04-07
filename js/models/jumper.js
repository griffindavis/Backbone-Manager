var app = app || {};

app.Jumper = Backbone.model.extend({

    // defaults
    defaults: {
        name: '',
        selected: false
    }, 

    toggle: function() {
        this.save({
            selected: !this.get('selected')
        });
    }
})