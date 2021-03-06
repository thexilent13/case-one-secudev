'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var posts = require('../../app/controllers/posts.server.controller');

	// Posts Routes
	app.route('/posts')
		.get(users.requiresLogin, posts.list)
		.post(users.requiresLogin, posts.create);

	app.route('/posts/:postId')
		.get(users.requiresLogin, posts.read)
		.put(users.requiresLogin, posts.hasAuthorization, posts.update)
		.delete(users.requiresLogin, posts.hasAuthorization, posts.delete);

	app.route('/api/posts/count')
		.get(users.requiresLogin, posts.count);

	app.route('/api/posts/page/:currentPage')
		.get(users.requiresLogin, posts.limitedList);

	app.route('/api/posts/search')
		.post(users.requiresLogin, posts.search);

	//Finish by binding the Post middleware
	app.param('postId', posts.postByID);
};
