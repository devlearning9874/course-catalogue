const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	addedBy: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	}
});

const Topic = mongoose.model('topic', TopicSchema);

module.exports = Topic;