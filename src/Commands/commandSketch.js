const Discord = require("discord.js");

module.exports.config = {
  name: "taslak",
  aliases: ["taslak2", "sketch"]
};

module.exports.execute = async(client, message, args) => {
  try {

    message.channel.send("sa")

} catch (err) {
  message.channel.send("KOMUTA HATASI!"+`\`\`\`js
`+err+`\`\`\``)
}
};
