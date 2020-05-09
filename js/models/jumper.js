var app = app || {};

app.Jumper = Backbone.Model.extend({

    // defaults
    defaults: {
        name: 'Fail',
        selected: false
    }, 

    toggle: function() {
        this.save({
            selected: !this.get('selected')
        });
    }
})