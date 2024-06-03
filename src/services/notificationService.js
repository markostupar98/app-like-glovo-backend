const axios = require('axios');

exports.sendNotification = async (expoPushToken, message) => {
  const body = {
    to: expoPushToken,
    sound: 'default',
    title: message.title,
    body: message.body,
    data: { data: message.data },
  };

  await axios.post('https://exp.host/--/api/v2/push/send', body, {
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
  });
};
