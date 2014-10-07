var TodoApp = React.createClass({displayName: 'TodoApp',
	getTodos: function() {
		$.ajax({
			url: this.props.url,
			success: function(data) {
				this.setState({data: data});
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {data: []};
	},
	componentWillMount: function() {
		this.getTodos();
	},
	render: function() {
		return (
			React.DOM.div({className: "todoApp"}, 
				React.DOM.h1(null, "TodoApp"), 
				TodoList({data: this.state.data, url: this.props.url, updateList: this.getTodos}), 
				TodoForm({url: this.props.url, updateList: this.getTodos})
			)
		);
	}
});

var TodoList = React.createClass({displayName: 'TodoList',
	render: function() {
		var url = this.props.url;
		var that = this;
		var todos = this.props.data.map(function(todo) {
			return TodoItem({updateList: that.updateList, url: url, key: todo._id, title: todo.title, completed: todo.completed, order: todo.order})
		});
		return (
			React.DOM.div({className: "todoList"}, 
				React.DOM.button({onClick: this.updateList}, "Oppdater"), 
				todos
			)
		);
	},
	updateList: function() {
		this.props.updateList();
	},
});

var TodoItem = React.createClass({displayName: 'TodoItem',
	updateList: function() {
		this.props.updateList();
	},
	render: function() {
		var classString = '';
		if(this.props.completed) {
			classString += 'completed';
		}
		return (
			React.DOM.div({className: "todoItem"}, 
				React.DOM.span({onClick: this.handleEdit, className: classString}, this.props.title), 
				React.DOM.button({onClick: this.handleDelete}, "Remove")
			)
		);
	},
	handleDelete: function() {
		var id = this.props.key;

		this.doDelete(id);
	},
	doDelete: function(id) {
		$.ajax({
			url: this.props.url + id,
			type: 'DELETE',
			success: function() {
				this.updateList();	
			}.bind(this)
		});
	},
	handleEdit: function() {
		var id = this.props.key;
		var title = this.props.title;
		var completed = !this.props.completed;
		var order = this.props.order;

		this.doEdit(id, JSON.stringify({"_id": id, "title": title, "completed": completed, "order": order}));
	},
	doEdit: function(id, todo) {
		$.ajax({
			url: this.props.url + id,
			type: 'PUT',
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			data: todo,
			success: function(data) {
				this.updateList();
			}.bind(this)
		});
	}
});

var TodoForm = React.createClass({displayName: 'TodoForm',
	render: function() {
		return (
			React.DOM.div({className: "todoForm"}, 
				React.DOM.input({type: "text", ref: "todo", onKeyPress: this.handleKeyPress})
			)
		);
	},
	handleKeyPress: function(e) {
		if(e.which !== 13) {
			return;
		}
		var todo = this.refs.todo.getDOMNode().value.trim();
		if(todo) {
			this.doSave(JSON.stringify({"title": todo, "completed": false, "order": 1}));
			this.refs.todo.getDOMNode().value = '';
		}
		return false;
	},
	doSave: function(todo) {
		$.ajax({
			url: this.props.url,
			type: 'POST',
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			data: todo,
			success: function(data) {
				this.props.updateList();
			}.bind(this)
		});
	},
});

React.renderComponent(
	TodoApp({url: "http://localhost:3000/"}),
	document.getElementById('todoApp')
);

