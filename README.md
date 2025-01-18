# waline-notification-slack-app

A [**Waline**](https://waline.js.org/) plugin that provide [Slack app](https://api.slack.com/docs/apps) notification spport.

[中文文档](./README_CN.md) | English Doc

## How to install
```shell
npm install waline-notification-slack-app
```

## How to use

Edit your Waline File:

index.js
```js
const Application = require('@waline/vercel');
const Slack = require('waline-notification-slack-app');

module.exports = Application({
  plugins: [Slack],
  async postSave(comment) {
    // do what ever you want after comment saved
  },
});
```

### package.json
Add `"waline-notification-slack-app": "latest"` into package.json dependencies.


## Environment Variables

- `SLACK_WEBHOOK`: Slack webhook URL. e.g. `https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX`
- `SITE_NAME`: Your site name, used for display in notification message.
- `SITE_URL`: Your site URL, used for display in notification message.
- `SLACK_TEMPLATE`: (optional) Your custom notification template, please refer [this document](https://waline.js.org/en/guide/features/notification.html#notification-template).

The default template is as follow:
```shell
*{{site.name|safe}}新评论通知*
>*昵称*: {{self.nick}}
>*邮箱*: {{self.mail}}
>*内容*: {{self.comment}}
>*链接*: {{site.postUrl}}
```

You need **redeploy** after change environment variables.
