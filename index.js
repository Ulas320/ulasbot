const Twit = require('twit');

/*
 * - Insert each Twitter credential inside it's equivalent quote.
 */
const config = {
  consumer_key: 'HKM0YHBbGjC57uXEyiJUWwO8q',
  consumer_secret: '230msf9BDMHZ73g6DdOR06wRkaybfC2sI7zFr0YyskcIGtmhYZ',
  access_token: '963440173018243072-WzD8cW5l1PjhcgrA3oZ4AOCgpDWslyU',
  access_token_secret: '5e6CTzmZYeHhcJVudiKE1NDKmJgH8t69q1qcIiz9fJEIG'
};

/*
 * - Replace "ex1, ex2" with the words you want to retweet.
 * - Separate words with commas.
 * - Keep words inside quotes.
 * - DO NOT repeat the same word with caps on and off (example: "word,Word,WORD").
 * - If "example" is between the selected words, the bot will retweet any variation of the word:
 *   example,Example,EXAMPLE,ExAmPlE...
 */
const words = '#twitchde,#twitchdesupport';

/*
 * - Change 'mybot' with your bot account '@'.
 * - Example: if your account '@' is '@twitter_bot', you should write only 'twitter_bot'
 */
const screenName = 'twitchdesupport';

/*
 * If you are a not a programmer, avoid changing anything on the next lines
 */

const twit = new Twit(config);
const stream = twit.stream('statuses/filter', { track: words.split(',').map(w => w.trim()) });

console.log('Bot is starting!');
try {
  stream.on('tweet', tweet => {
    if (tweet.user.screen_name === screenName) return;

    if (!tweet.retweeted_status) {
      twit.post('statuses/retweet/:id', { id: tweet.id_str }, (err, data) => {
        if (err || !data.text) {
          return console.log(`Error retweeting user "@${tweet.user.screen_name}"`);
        }
        console.log(`Retweeted user "@${tweet.user.screen_name}":\n"${tweet.text}"\n`);
      });
    }
  });
} catch (_) {
  console.log('An error ocurred.');
  process.exit();
}
