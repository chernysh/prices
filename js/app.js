(function  () {
	App = {
		Models: {},
		Views: {},
		Collections: {},
		Router: {}
	};
	
	window.template = function(id) {
        return _.template( $('#' + id).html() );
    };

    App.Router = Backbone.Router.extend({
        routes: {
            '': 'index',
            'list/:id': 'listPage'
        },

        index: function() {
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

                var alarmModel = new App.Models.Alarm({});
                var alarmModelView = new App.Views.Alarm({model:alarmModel});       
                alarmView = new App.Views.Alarms({collection:alarmsCollection});
                alarmView.render();

                var alarmViewList = new App.Views.ListAlarms({collection:alarmsCollection});
                $('.sidebar').html(alarmViewList.render().el);
        },

        listPage: function  (id) {

            console.log(id);
        	
            var NumberModel = id - 1;
           
            var oneList = new App.Views.OneModel({model: alarmView.collection.models[NumberModel]});    
            $('.row').html(oneList.render().el);
            
        }
    });

   	App.Views.OneModel = Backbone.View.extend({
       tagName: 'div class = "alarmModel"',
       render: function  () {
           this.$el.html('<H2>' + this.model.get('title') + '</H2>');
         
           this.$el.append('<p>' + this.model.get('description') + '</p>');
          
           this.$el.append('<a href="/">На головну</a>');
           return this;
       }  
    });

    App.Models.Alarm = Backbone.Model.extend({});

    App.Views.Alarm = Backbone.View.extend({
    	tagName: 'div class="col-sm-6 col-md-4"',
    	template : template('templateAlarm'),

    	render: function  () {
    		var template = this.template(this.model.toJSON());
    		
    		this.$el.html(template);
    		
    		return this;
    	}

    });

    App.Views.Alarms = Backbone.View.extend({
    	el: '.row',
    	render: function  () {
    		this.collection.each(this.addOne, this);
    		return this;
    	},

    	addOne: function  (alarm) {
    		var alarmView = new App.Views.Alarm({model: alarm});
    		
    		this.$el.append(alarmView.render().el);
    		return this;
    	}

    });
    App.Views.ListAlarm  = Backbone.View.extend({
    	tagName: 'li',
        template: template('listAlarm'),
         
        
        render: function  () {            
            var template = this.template(this.model.toJSON());
            this.$el.html(template);
            return this;
        }
    });


    App.Views.ListAlarms = Backbone.View.extend({
    	tagName: 'ul class="nav"',

        render: function  () {
            this.collection.each(this.addList, this);
            return this;
        },
        addList: function  (item) {
            var taskListView = new App.Views.ListAlarm({model: item});
            this.$el.append(taskListView.render().el);
            return this;
        }

    });


    var app = new App.Router();
    Backbone.history.start({pushState: true, root:'/'});

$(document).on("click", "a[href^='/']", function(event) {
  if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
    event.preventDefault();
    var url = $(event.currentTarget).attr("href").replace(/^\//, "");
    app.navigate(url, { trigger: true });
  }
});

})()
