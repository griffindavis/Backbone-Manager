var app = app || {};

app.ManagerView = Backbone.View.extend({
    el: 'manager', 

    // templates

    // delegated events for creating new items and clearing others
    events: {
        'keypress #new-jumper': 'createOnEnter'
    }, 

    initialize: function() {
        // cache inputs and other elements

        // listen to events
        this.listenTo(app.Jumpers, 'add', this.addJumper);
        this.listenTo(app.Jumpers, 'filter', this.filterAll);

        app.Jumpers.fetch();
    }, 
    
    render: function() {
        if (app.Jumpers.length) {
            // show elements
            this.$main.show();

        }
        else {
            this.$main.hide();
        }
    }, 

    addOne: function(jumper) {
        var view = new app.JumperView({model: Jumper});
        $('#jumper-list').append(view.render().el);
    },

    newAttributes: function() {
        return {
            name: '',
            selected: false
        };
    },

    createOnEnter: function(e) {
        if (e.which !== ENTER_KEY || !this.$input.val().trim()) {
            return;
        }
        app.Jumpers.create(this.newAttributes());
        this.$input.val('');
    }
});