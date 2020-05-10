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
        this.$loadNumber = this.$('#load-number');

        // listen to events
        this.listenTo(app.Jumpers, 'add', this.addJumper);
        this.listenTo(app.Jumpers, 'remove', this.render);
        this.listenTo(app.Jumpers, 'filter', this.filterAll);
        this.listenTo(app.Jumpers, 'all', this.render);

        // load events
        this.listenTo(app.Loads, 'add', this.addLoad);
        this.listenTo(app.Loads, 'remove', this.updateNumber);

        // fetch from local storage
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

    /**
     * Adds a jumper to the jumepr list by creating a new view
     * Triggered from an addition to the Jumper collection
     * @param {*} jumper 
     */
    addJumper: function(jumper) {
        var view = new app.JumperView({model: jumper});
        $('#jumper-list').append(view.render().el);
    },

    /**
     * Creates the new attributes for the jumper
     */
    newAttributes: function() {
        return {
            name: this.$input.val().trim(),
            selected: false
        };
    },

    /**
     * Creates the new jumper when Enter is cliced in the in put field
     * @param {*} event 
     */
    createOnEnter: function(event) {
        if (event.which !== ENTER_KEY || !this.$input.val().trim()) {
            return;
        }
        app.Jumpers.create(this.newAttributes());
        this.$input.val('');
    }, 

    /**
     * Used to remove all Jumpers
     * This will likely be removed
     */
    destroyAll: function() {
        while (model = app.Jumpers.first()) {
            console.log(model);
            model.destroy();
        }
        return false;
    }, 

    /**
     * Creates the new load
     */
    createLoad: function() {
        app.Loads.create(this.newLoad());
    },

     /**
     * Generates the appropriate properties for the new load
     */
    newLoad() {
        return {
            number: app.Loads.nextNumber(),
        }
    },

    /**
     * Adds a new load view to the app view
     * Also updates the current load number
     * @param {*} load 
     */
    addLoad: function(load) {
        let view = new app.LoadView({model: load});
        $('#load-list').append(view.render().el);
        this.$loadNumber.text(app.Loads.length);
    },

    /**
     * Updates the load numbers on all loads as needed
     * Specifically when deleting a load
     * Updates the header as well
     */
    updateNumber: function() {
        let number = 0;
        app.Loads.models.forEach(load => {
            number++;
            if (load.get('number') != number) {
                load.save('number', number);
            }
        });
        this.$loadNumber.text(number);
    }
});