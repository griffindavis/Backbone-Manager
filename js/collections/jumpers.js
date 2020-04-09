var app = app || {};

var JumperList = Backbone.Collection.extend({

    // reference to this collection's model
    model: app.Jumper,

    // save the todo items under local storage
    localStorage: new Backbone.LocalStorage('jumpers-backbone'),

    // filter down to the selected values
    selected: function() {
        return this.filter(function(jumper) {
            return jumper.get('selected');
        });
    },
    all: function() {
        return this.models;
    }
});

app.Jumpers = new JumperList();