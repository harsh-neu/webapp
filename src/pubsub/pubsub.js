const { PubSub } = require('@google-cloud/pubsub');
 
// Instantiate a PubSub client
const pubsub = new PubSub();
 
// Your Pub/Sub topic name
const topicName = 'projects/webapp-develop-418404/topics/harsh-webapp';
 
// Publishes a message to the Pub/Sub topic
async function publishMessage(data) {
    const dataBuffer = Buffer.from(data);
 
    try {
        const messageId = await pubsub.topic(topicName).publish(dataBuffer);
        console.log(`Message ${messageId} published.`);
    } catch (error) {
        console.error(`Error publishing message: ${error}`);
    }
}
 
// Example usage
const eventData = {
    event: 'example_event',
    data: 'example_data'
};

module.exports = {publishMessage}
