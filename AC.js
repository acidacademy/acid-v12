const {Discord,Client,MessageEmbed,Collection} = require('discord.js');
const client = global.client = new Client({ fetchAllMembers: true });
require('discord-buttons')(client);
require('discord-reply');
const Veritabani = require("fresh.db");  /*                                */
const fs = require("fs");
const commands = new Map();
global.commands = commands;
const aliases = new Map();
global.aliases = aliases;


setTimeout(x=> {
  console.clear()
  const conf = global.conf = require("./src/Configs/Config.json");
  global.clientdb = new Veritabani({name:"clientdb", prettySave: true, folderPath:__dirname + "/src/Models"});
  console.log("✔ Tanımlar yüklendi")
}, 100)
setTimeout(x=> {
  console.clear()
  console.log("✔ Tanımlar yüklendi")
  console.log("♻ Bot Çalıştırılıyor.")
}, 1000)
setTimeout(x=> {
  console.clear()
  console.log("✔ Tanımlar yüklendi")
  console.log("♻ Bot Çalıştırılıyor..")
}, 2000)
setTimeout(x=> {
  console.clear()
  console.log("✔ Tanımlar yüklendi")
  console.log("♻ Bot Çalıştırılıyor...")
}, 3000)
setTimeout(x=> {
  console.clear()
  client.login(conf.token).catch(err => console.log("token hatalı knk"))
}, 4000)

client.on("ready", async() => {
  client.user.setActivity("Developed By Richard")
  console.log("✔ Tanımlar yüklendi")
  setTimeout(x=> {
    console.log("🏁 "+client.user.tag+" olarak giriş yapıldı.")
  }, 10)
  setTimeout(x=> {
    fs.readdir("./src/Commands", (err, files) => {
      if(err) return console.error(err);
        files = files.filter(file => file.endsWith(".js"));
        console.log('✔ Komutlar yüklendi.');
        files.forEach(file => {
    let prop = require(`./src/Commands/${file}`);
      if(!prop.config) return;
      if(typeof prop.onLoad === "function") prop.onLoad(client);
        commands.set(prop.config.name, prop);
      if(prop.config.aliases) prop.config.aliases.forEach(aliase => aliases.set(aliase, prop));
      });
    });
  }, 1000)
  
  setTimeout(x=> {
    fs.readdir("./src/Events", (err, files) => {
      if(err) return console.error(err);
      console.log('✔ Aktiviteler yüklendi.');
        files.filter(file => file.endsWith(".js")).forEach(file => {
      let prop = require(`./src/Events/${file}`);
      if(!prop.config) return;
          client.on(prop.config.name, prop);
          });
        });
  }, 1500)
  setTimeout(x=> {
client.on("message", (message) => {
    if(message.member.bot) return;
    if(message.guild.id !== conf.server) return;
    if (message.author.bot ||!message.content.startsWith(conf.prefix) || !message.channel || message.channel.type == "dm") return;
    let args = message.content
        .substring(conf.prefix.length)
        .split(" ");
    let command = args[0];
    let bot = message.client;
    args = args.splice(1);
    let calistirici;
    if (commands.has(command)) {
      calistirici = commands.get(command);
      calistirici.execute(bot, message, args);
    } else if (aliases.has(command)) {
      calistirici = aliases.get(command);
      calistirici.execute(bot, message, args);
    }
})
    console.log("✔ Bot kullanıma hazır.")
  }, 2000)
  
})
