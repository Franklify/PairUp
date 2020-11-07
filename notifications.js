// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
export async function sendPushNotification(expoPushToken, name, messageBody) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Message from ' + name,
    body: messageBody,
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}
