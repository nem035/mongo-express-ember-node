import Ember from 'ember';

const {
	Controller,
	computed
} = Ember;

const { alias } = computed;

export default Controller.extend({

	users: alias('model'),

	currUser: null,

	name: '',
	email: '',

	id: '',

	cannotCreate: computed('name', 'email', function() {
		return !this.get('name') || !this.get('email');
	}),

	actions: {

		createUser() {
			const { name, email } = this.getProperties('name', 'email');
			this.store.createRecord('user', {
				name, email
			}).save();
		},

		readUser() {
			const id = this.get('id');
			this.store.findRecord('user', id).then(
				(user) => {
					this.set('currUser', user);
				}
			);
		},

		updateUser() {
			const { id, name, email } = this.getProperties('id', 'name', 'email');
			this.store.findRecord('user', id).then(function(user) {
			  user.setProperties({
			  	name, email
			  });

			  user.save(); // => PUT to '/users/{id}'
			});
		},

		deleteUser() {
			const id = this.get('id');
			this.store.findRecord('user', id).then(function(user) {
			  user.destroyRecord(); // => DELETE to /users/{id}
			});
		}
	}
});
