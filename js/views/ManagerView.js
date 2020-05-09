var app = app || {};

app.ManagerView = Backbone.View.extend({
    el: '#manager', 

    // templates

    // delegated events for creating new items and clearing others
    events: {
        'keypress #new-jumper': 'createOnEnter',
        'click #destroy-all': 'destroyAll',
        'click #add-load': 'createLoad',
    }, 

    initialize: function() {
        // cache inputs and other elements
        this.$input = this.$('#new-jumper');
        this.$jumpers = this.$('#jumpers');

        // listen to events
        this.listenTo(app.Jumpers, 'add', this.addJumper);
        this.listenTo(app.Jumpers, 'remove', this.render);
        this.listenTo(app.Jumpers, 'filter', this.filterAll);
        this.listenTo(app.Jumpers, 'all', this.render);

        this.listenTo(app.Loads, 'add', this.addLoad);

        app.Jumpers.fetch();
        app.Loads.fetch();
    }, 
    
    render: function() {
        if (app.Jumpers.length) {
            // show elements
            this.$jumpers.show()

        }
        else {
            this.$jumpers.hide();
        }
    }, 

    addJumper: function(jumper) {
        var view = new app.JumperView({model: jumper});
        $('#jumper-list').append(view.render().el);
    },

    newAttributes: function() {
        return {
            name: this.$input.val().trim(),
            selected: false
        };
    },

    createOnEnter: function(event) {
        if (event.which !== ENTER_KEY || !this.$input.val().trim()) {
            return;
        }
        app.Jumpers.create(this.newAttributes());
        this.$input.val('');
    }, 
    destroyAll: function() {
        while (model = app.Jumpers.first()) {
            console.log(model);
            model.destroy();
        }
        return false;
    }, 

    createLoad: function() {
        app.Loads.create();
    },

    addLoad: function(load) {
        let view = new app.LoadView({model: load});
        $('#load-list').append(view.render().el);
    }
});