require('dotenv').config();
exports.server = {
    SERVER_PORT                             : Number(process.env.PORT) || 5010,
    MODE                                    : 'prod',
    MONGO_URL                               : 'mongodb://localhost:27017/calendar-picker',
    MONGO_TEST_URL                          : 'mongodb://localhost:27017/calendar-picker',
    SESSION_SECRET                          : process.env.REDIS_PASSWORD || 'zhdbcshvchdvhdvfd',
    REDIS_PASSWORD                          : process.env.REDIS_PASSWORD || '',
    REDIS_HOST                              : process.env.REDIS_HOST || 'localhost',
    REDIS_PORT                              : Number(process.env.REDIS_PORT) || 6379,
    ORIGIN_SECURE                           : Number(process.env.ORIGIN_SECURE) || true,
    REDIS_TTL                               : Number(process.env.REDIS_TTL) || 260,
    ADMIN_TOKEN_PRIVATE_KEY                 : '',
    RABBITMQ_HOST                           : 'localhost',
    RABBITMQ_PORT                           : 5672,
    RABBITMQ_USER                           : '',
    RABBITMQ_PASSWORD                       : '',
    JWT_PRIVATE_KEY                         : "",
    TWO_WAY_CRYPT_SECRET                    : '',
    AWS_ACCESS_KEY                          : "",
    AWS_SECRET_KEY                          : "",
    AWS_REGION                              : "",
    S3_BUCKET                               : ""
}
