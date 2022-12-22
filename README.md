# NestJS CloudWatch Logger

Logger for saving into AWS CloudWatch.

## Installation

NPM

```sh
npm install @nestjs-logger/cloudwatch
```

Yarn

```sh
yarn add @nestjs-logger/cloudwatch
```

## Usage

```typescript
import { CloudWatchLogger } from '@nestjs-logger/cloudwatch';

const app = await NestFactory.create(AppModule, {
    logger: CloudWatchLogger.create({
        accessKeyId: process.env.AWS_CLOUDWATCH_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_CLOUDWATCH_SECRET_ACCESS_KEY,
        region: process.env.AWS_CLOUDWATCH_REGION,
        logGroupName: process.env.AWS_CLOUDWATCH_LOG_GROUP_NAME,
        logStreamName: process.env.AWS_CLOUDWATCH_LOG_STREAM_NAME,
    }),
});
```

## Options

| Key               | Type     | Required | Default |
| ----------------- | -------- | -------- | ------- |
| `accessKeyId`     | `string` | Yes      |         |
| `secretAccessKey` | `string` | Yes      |         |
| `region`          | `string` | Yes      |         |
| `logGroupName`    | `string` | Yes      |         |
| `logStreamName`   | `string` | Yes      |         |
