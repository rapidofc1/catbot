const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ game: { name: `on ${client.guilds.size} guilds | c.help`, type: 0 }});
});

const prefix = "c."

const answers = [
  'Without a doubt', 'Extremely likely', 'Perhaps', 'Maybe', 'I\'ll have to think about that', 'Not a chance!'
]

client.on('message', msg => { // START MESSAGE HANDLER
  if (msg.author.bot) return;

  if (msg.content.startsWith(prefix + 'ping')) {
    msg.channel.send("Pinging... :signal_strength:").then(sent => {
      sent.edit(`:ping_pong: Pong! | Time Taken: ${sent.createdTimestamp - msg.createdTimestamp}ms`)
    })
  }

  if (msg.content.startsWith(prefix + '8ball')) {
  let args = msg.content.split(" ").slice(1);
  let question = args[0]
  if (!msg.content.endsWith('?')) {
    return msg.channel.send('You must ask me a question first!')
} else {
  msg.channel.send(`:8ball: | ${answers[Math.floor(Math.random() * answers.length)]}`);
  }
}

if (msg.content.startsWith(prefix + 'help')) {
  msg.channel.send(":inbox_tray: | I've sent a full list of commands to your DM's.")
  msg.author.send(`\`\`\`asciidoc
= General =
c.ping :: Hm. I wonder what this does? /sarcasm
c.8ball :: Ask the magic 8ball a question. Pretty self explanatory
c.help :: Brings up this menu
c.invite :: Shows the bot's invite URL\`\`\``)
  msg.author.send(`\`\`\`asciidoc
= Moderation =
c.ban :: Bans the user specified
c.kick :: Kicks the user specified
c.softban :: Softbans the specified user\`\`\``)
  msg.author.send(`\`\`\`asciidoc
= Other Shit =
google it :: Shows a "you can google it" image
boof :: Uh, shows the "boof dog" image. It'll become clearer when you see it
BOYE :: riceBOYE (best doggo)\`\`\``)
  msg.author.send(`\`\`\`asciidoc
}

let args = msg.content.split(" ").slice(1);

  if (msg.content.startsWith(prefix + 'ban')) {
    var reason = msg.content.split(' ').slice(2).join(' ');
    if (!msg.member.permissions.has("BAN_MEMBERS")) return msg.channel.send(":warning: Insufficient Permissions").catch(console.error);
    if (!msg.guild.member(client.user).permissions.has("BAN_MEMBERS")) return msg.channel.send(":warning: Bot has insufficient permissions").catch(console.error);

  if (msg.mentions.users.size === 0) return msg.channel.send("No user provided")

  if (msg.author.id === msg.mentions.members.first().user.id) return msg.channel.send("You can't ban yourself").catch(console.error);

  if (client.user.id === msg.mentions.users.first().id) return msg.channel.send(`Don't try to ban me, ${msg.author.username}`).catch(console.error);

  userToBan.ban()
    var user = msg.mentions.users.first()
    const embed = new Discord.RichEmbed()
    .setTitle(`:hammer: User Banned: ${user.tag} (${user.id})`)
    .setColor(0xd11212)
    .addField("Responsible Moderator:", `${msg.author.tag} (${msg.author.id})\n\nReason: ${reason}`)
    .setTimestamp(new Date(msg.createdTimestamp))

    msg.guild.channels.find("name", "mod-logs").send({embed});
  }

  if (msg.content.startsWith(prefix + 'kick')) {
    var reason = msg.content.split(' ').slice(2).join(' ');
    if (!msg.member.permissions.has("KICK_MEMBERS")) return msg.channel.send(":warning: Insufficient Permissions").catch(console.error);
    if (!msg.guild.member(client.user).permissions.has("KICK_MEMBERS")) return msg.channel.send(":warning: Bot has insufficient permissions").catch(console.error);

    if (msg.mentions.users.size === 0) return msg.channel.send("No user provided")

    if (!msg.guild.member(userToKick).kickable) return msg.channel.send("I can't kick that member!")

    if (msg.author.id === msg.mentions.members.first().user.id) return msg.channel.send("You can't kick yourself");

    if (client.user.id === msg.mentions.users.first().id) return msg.channel.send(`Don't try to kick me, ${msg.author.username}`).catch(console.error);

  userToKick.kick()
    var user = msg.mentions.users.first()
    const embed = new Discord.RichEmbed()
    .setTitle(`:hammer: User Kicked: ${user.tag} (${user.id})`)
    .setColor(0xf9a411)
    .addField("Responsible Moderator:", `${msg.author.tag} (${msg.author.id})\n\nReason: ${reason}`)
    .setTimestamp(new Date(msg.createdTimestamp))

    msg.guild.channels.find("name", "mod-logs").send({embed});
  }

  if (msg.content.startsWith(prefix + 'restart')) {
   if (msg.author.id !== '260246864979296256') return;
   msg.channel.send('Rebooting...').then(() => {
     client.destroy().then(() => {
       process.exit();
     })
   })
 }

 if (msg.content.startsWith(prefix + 'softban')) {
   var reason = msg.content.split(' ').slice(2).join(' ');
   if (!msg.member.permissions.has("BAN_MEMBERS")) return msg.channel.send(":warning: Insufficient Permissions").catch(console.error);
   if (!msg.guild.member(client.user).permissions.has("BAN_MEMBERS")) return msg.channel.send(":warning: Bot has insufficient permissions").catch(console.error);

     if (msg.mentions.users.size === 0) return msg.channel.send("No user provided")

     if (!msg.guild.member(userToSB).bannable) return msg.channel.send("I can't softban that member!").catch(console.error);

     if (msg.author.id === msg.mentions.members.first().user.id) return msg.channel.send("You can't softban yourself").catch(console.error);

     if (client.user.id === msg.mentions.users.first().id) return msg.channel.send(`Don't try to softban me, ${msg.author.username}`).catch(console.error);

   userToSB.ban().then(member => {msg.guild.unban(member.user.id)});
     var user = msg.mentions.users.first()
     const embed = new Discord.RichEmbed()
     .setTitle(`:hammer: User Softbanned: ${user.tag} (${user.id})`)
     .setColor(0xfffa00)
     .addField("Responsible Moderator:", `${msg.author.tag} (${msg.author.id})\n\nReason: ${reason}`)
     .setTimestamp(new Date(msg.createdTimestamp))

     msg.guild.channels.find("name", "mod-logs").send({embed});
  }

  if (msg.content.startsWith(prefix + 'eval')) {
  if(msg.author.id !== "260246864979296256") return;
  let evall = msg.content.split(' ')[0];
  let evalstuff = msg.content.split(" ").slice(1).join(" ")
  try {
      const code = msg.content.split(" ").slice(1).join(" ")
      let evaled = eval(code);

      if (typeof evaled !== 'string')
        evaled = require('util').inspect(evaled);

        msg.channel.send(`:inbox_tray: Input: \n \`\`\`${evalstuff}\`\`\` \n :outbox_tray: Output: \n  \`\`\`${clean(evaled)}\`\`\``)
    } catch (err) {
        msg.channel.send(`:inbox_tray: Input: \n \`\`\`${evalstuff}\`\`\` \n :outbox_tray: Output: \n  \`\`\`${clean(err)}\`\`\``)
    }
  }

  if (msg.content === "google it") {
    msg.channel.send({file: "./google-it.png"});
  }

  if (msg.content === "boof") {
    msg.channel.send({file: "./boof.png"});
  }

  if (msg.content === "BOYE") {
    msg.channel.send({file: "./riceBOYE.png"});
  }

  if (msg.content.startsWith(prefix + "say")) {
  let args = msg.content.split(" ").slice(1).join(" ")
  msg.delete()
  if(msg.author.id !== "260246864979296256") return;
  if (!args) {
    return msg.channel.send("Whoops, no args were involved. Try again")
  }
  msg.channel.send(`${args}`)
}

  if (msg.content.startsWith(prefix + "serverinfo")) {
    const embed = new Discord.RichEmbed()

    .setTitle(`${msg.guild.name}`)
    .setColor(0x17bec6)
    .addField(`Owner`, `${msg.guild.owner.user.tag} (${msg.guild.owner.id})`)
    .addField(`Members`, `${msg.guild.memberCount}`)
    .addField(`Region`, `${msg.guild.region}`)
    .addField(`ID`, `${msg.guild.id}`)
    .addField(`Channels`, `${msg.guild.channels.size}`)
    .addField(`Created at`, `Created at date: WIP`)

    msg.channel.send({embed});
  }
  
  if (msg.content.startsWith(prefix + "invite")) {
    msg.reply("https://discordapp.com/oauth2/authorize/?permissions=8&scope=bot&client_id=350441155768352768")
  }
}); // END MESSAGE HANDLER

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

client.login(process.env.BOT_TOKEN);
