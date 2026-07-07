const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const TOKEN = process.env.BOT_TOKEN;

if (!TOKEN) {
  console.error('ERROR: BOT_TOKEN is not set. Add it in your environment variables.');
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, { polling: true });

// Default target currency
const DEFAULT_TARGET = 'NGN';

// /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `👋 Welcome to Currency Convert Bot!\n\n` +
    `Use this format:\n` +
    `/convert <amount> <from_currency> <to_currency>\n\n` +
    `Examples:\n` +
    `/convert 100 USD NGN\n` +
    `/convert 50 EUR NGN\n` +
    `/convert 1 GBP USD\n\n` +
    `If you don't type a target currency, it defaults to NGN.\n` +
    `Example: /convert 100 USD`
  );
});

// /convert command
bot.onText(/\/convert (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const parts = match[1].trim().split(/\s+/);

  if (parts.length < 2) {
    return bot.sendMessage(chatId, '⚠️ Format: /convert <amount> <from> <to>\nExample: /convert 100 USD NGN');
  }

  const amount = parseFloat(parts[0]);
  const from = parts[1].toUpperCase();
  const to = (parts[2] || DEFAULT_TARGET).toUpperCase();

  if (isNaN(amount) || amount <= 0) {
    return bot.sendMessage(chatId, '⚠️ Please enter a valid positive number for the amount.');
  }

  try {
    const response = await axios.get(`https://open.er-api.com/v6/latest/${from}`);
    const data = response.data;

    if (data.result !== 'success') {
      return bot.sendMessage(chatId, `⚠️ Could not find rates for currency: ${from}`);
    }

    const rate = data.rates[to];

    if (!rate) {
      return bot.sendMessage(chatId, `⚠️ Could not find currency code: ${to}`);
    }

    const converted = (amount * rate).toFixed(2);

    bot.sendMessage(
      chatId,
      `💱 ${amount} ${from} = ${converted} ${to}\n\n` +
      `Rate: 1 ${from} = ${rate.toFixed(4)} ${to}\n` +
      `(Mid-market rate, may differ slightly from bank/street rates)`
    );
  } catch (err) {
    console.error(err.message);
    bot.sendMessage(chatId, '❌ Something went wrong fetching exchange rates. Please try again shortly.');
  }
});

// Fallback for any other text
bot.on('message', (msg) => {
  if (msg.text && !msg.text.startsWith('/')) {
    bot.sendMessage(msg.chat.id, "Type /start to see how to use this bot, or /convert <amount> <from> <to>.");
  }
});

console.log('Bot is running...');
