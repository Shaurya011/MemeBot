
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN
const bot = new TelegramBot(token , {polling: true})
const request = require('request')


bot.on("polling_error", console.log);


bot.onText(RegExp("\/meme") , (msg) => {

    var opts = {
            inline_keyboard : [
                [
                    {
                        text:"Next",
                        callback_data: "next"

                    }
                ]
            ]
        }

    var kek = request("https://nksamamemeapi.pythonanywhere.com" , {json: true} , (err , res , body) => {
        bot.sendPhoto(msg.chat.id , body.image , {caption: body.title , reply_markup: opts})
    })

})


bot.on("callback_query" , (callbackQuery) => {
    const msg = callbackQuery.message

    var opts = {
        inline_keyboard : [
            [
                {
                    text:"Next",
                    callback_data: "next"

                }
            ]
        ]
    }
    
    if (callbackQuery.data === "next") {
        bot.deleteMessage(msg.chat.id , callbackQuery.message.message_id);

        request("https://nksamamemeapi.pythonanywhere.com" , {json: true} , (err , res , body) => {
        bot.sendPhoto(msg.chat.id , body.image , {caption: body.title , reply_markup: opts})
    });

    }
})
