# waline-notification-slack-app

中文文档 | [English Doc](./README.md)

一个[**Waline**](https://waline.js.org/)插件，提供 [**Slack app**](https://api.slack.com/docs/apps) 通知功能。

## 如何安装
```shell
npm install waline-notification-slack-app
```

## 如何使用
编辑你的服务端 Waline 文件:

waline.js
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
把 `"waline-notification-slack-app": "latest"` 添加到 package.json 依赖中。


## 环境变量

- `SLACK_WEBHOOK`： Slack webhook URL. 参考此[文档](https://api.slack.com/messaging/webhooks)创建Slack app并开启incoming webhooke。例如：`https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX`
- `SITE_NAME`： 你的站点名字，用来显示在通知消息中。
- `SITE_URL`：你的站点名字，用来显示在通知消息中。
- `SLACK_TEMPLATE`：（可选）你可以自定义通知模板，请参考[官方文档](https://waline.js.org/guide/features/notification.html#%E9%80%9A%E7%9F%A5%E6%A8%A1%E6%9D%BF)。

默认的通知模板如下：
```shell
*{{site.name|safe}}新评论通知*
>*昵称*: {{self.nick}}
>*邮箱*: {{self.mail}}
>*内容*: {{self.comment}}
>*链接*: {{site.postUrl}}
```

在修改环境变量后，你需要 **重新部署** Waline服务端。
