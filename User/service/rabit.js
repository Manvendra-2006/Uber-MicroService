import amqp from "amqplib";

let channel;
let connection;

export async function connectRabbitMQ() {
    try {
        connection = await amqp.connect(process.env.RABBITMQ_URL);

        channel = await connection.createChannel();

        console.log("RabbitMQ Connected");
    } catch (error) {
        console.log(error);
    }
}

export async function publishToQueue(queueName, data) {
    if (!channel) {
        throw new Error("RabbitMQ channel not initialized");
    }

    await channel.assertQueue(queueName);

    channel.sendToQueue(
        queueName,
        Buffer.from(JSON.stringify(data))
    );
}

export async function subscribeToEvent(queueName, callback) {
    if (!channel) {
        throw new Error("RabbitMQ channel not initialized");
    }

    await channel.assertQueue(queueName);

    channel.consume(queueName, (message) => {
        if (message) {
            const data = JSON.parse(message.content.toString());

            callback(data);

            channel.ack(message);
        }
    });
}