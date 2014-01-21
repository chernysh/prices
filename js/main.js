(function  () {
	window.App = {
		Models: {},
		Views: {},
		Collections: {},
		Routes: {}
	};
	
	window.template = function(id) {
        return _.template( $('#' + id).html() );
    };

    App.Models.Alarm = Backbone.Model.extend({});

    App.Views.Alarm = Backbone.View.extend({
    	tagName: 'b',
    	template : template('templateAlarm'),

    	render: function  () {
    		var template = this.template(this.model.toJSON());
    		
    		this.$el.html(template);
    		
    		return this;
    	}

    });

    App.Views.Alarms = Backbone.View.extend({
    	el: '.container',
    	render: function  () {
    		this.collection.each(this.addOne, this);
    		return this;
    	},

    	addOne: function  (alarm) {
    		var alarmView = new App.Views.Alarm({model: alarm});
    		console.log(alarmView.render().el);
    		this.$el.append(alarmView.render().el);
    		return this;
    	}

    });

    App.Collections.Alarms = Backbone.Collection.extend({model: App.Models.Alarm});

    var alarmsCollection = new App.Collections.Alarms([
    		{
    			id: 1,
    			title: 'Lorem ipsum dolor1.',
    			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, porro.',
    			src: 'data/img/1.jpg'
    		},
    		{
    			id: 2,
    			title: 'Lorem ipsum dolor2.',
    			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, porro.',
    			src: 'data/img/1.jpg'
    		},
    		{
    			id: 3,
    			title: 'Lorem ipsum dolor3.',
    			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, porro.',
    			src: 'data/img/1.jpg'
    		},
    		{
    			id: 4,
    			title: 'Lorem ipsum dolor4.',
    			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, porro.',
    			src: 'data/img/1.jpg'
    		}
    		
    	]);

	    var alarmModel = new App.Models.Alarm({
	    	title: 'Lorem ipsum MODEL.',
	    	id: 4
	    });

    	var alarmModelView = new App.Views.Alarm({model:alarmModel});
    	//console.log(alarmModelView.render().el);

    	//$('#template').html(alarmModelView.render().el);
    	var alarmView = new App.Views.Alarms({collection:alarmsCollection});
    	console.log(alarmView.render().el);
})()
