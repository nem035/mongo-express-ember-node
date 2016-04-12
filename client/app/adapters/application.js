import DS from 'ember-data';

const { JSONAPIAdapter: Adapter } = DS;

export default Adapter.extend({
	namespace: 'api',
	host: 'http://localhost:3000'
});
