var app = app || {};

var LoadList = Backbone.Collection.extend({

    model: app.Load, 

    localStorage: new Backbone.LocalStorage('loads-backbone'), 

    completed: function() {
        return this.filter(function(load) {
            return load.get('completed');
        });
    },

    nextNumber: function() {
        if (!this.length) {
            return 1;
        }
        return this.last().get('number') + 1;
    },

    comparator: function (load) {
        return load.get('number');
    },

    all: function() {
        return this.models;
    }
});

app.Loads = new LoadList();