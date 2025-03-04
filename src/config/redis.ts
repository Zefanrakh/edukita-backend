import { createClient } from "redis";

const redisPublisher = createClient({ url: process.env.REDIS_URL });
const redisSubscriber = createClient({ url: process.env.REDIS_URL });

redisPublisher.connect();
redisSubscriber.connect();

export { redisPublisher, redisSubscriber };
