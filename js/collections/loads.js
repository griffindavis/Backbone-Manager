var app = app || {};

var LoadList = Backbone.Collection.extend({

    model: app.Load, 

    localStorage: new Backbone.LocalStorage('loads-backbone'), 

    completed: function() {
        return this.filter(function(load) {
            return load.get('completed');
        });
    }, 

    all: function() {
        return this.models;
    }
});

app.Loads = new LoadList();