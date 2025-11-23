import { Redis } from "@upstash/redis";
import { NonceManager } from "@tozielinski/next-upstash-nonce";

const redis = new Redis({
    url: process.env.EXPL_KV_REST_API_URL! || process.env.UPSTASH_REDIS_REST_URL! as string,
    token: process.env.EXPL_KV_REST_API_TOKEN! || process.env.UPSTASH_REDIS_REST_TOKEN! as string,
});

export const nonceManager = new NonceManager(redis, {ttlSeconds: 60* 5});