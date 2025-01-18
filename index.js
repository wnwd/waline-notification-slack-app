const fetch = require('node-fetch');
const nunjucks = require('nunjucks');

module.exports = {
  hooks: {
    async postSave(comment, parent) {
      const { SLACK_WEBHOOK, SITE_NAME, SITE_URL, SLACK_TEMPLATE } = process.env;

      if (!SLACK_WEBHOOK) {
        return false;
      }

      comment.comment = comment.comment.replace(/(<([^>]+)>)/gi, '');

      const data = {
        self: comment,
        parent,
        site: {
          name: SITE_NAME,
          url: SITE_URL,
          postUrl: SITE_URL + comment.url + '#' + comment.objectId,
        },
      };


      const template = SLACK_TEMPLATE || `*{{site.name|safe}}新评论通知*
>*昵称*: {{self.nick}}
>*邮箱*: {{self.mail}}
>*内容*: {{self.comment}}
>*链接*: {{site.postUrl}}`;

      const content = nunjucks.renderString(template, data);

      const msg = {
        text: content,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: content
            }
          }
        ]
      };

      try {
        const resp = await fetch(SLACK_WEBHOOK, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(msg),
        }).then((resp) => resp.text());

        if (resp !== 'ok') {
          console.log('Slack webhook notification FAILED:', resp);
        } else {
          console.log('Slack webhook notification SUCCESS');
        }
      } catch (error) {
        console.error('Send slack webhook notification ERROR:', error);
      }
    },
  },
};