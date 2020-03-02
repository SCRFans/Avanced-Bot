const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'Njg0MDkyMTQ1MjM3MzYwNzU2.Xl1Eog.CdlG5bI2tW4Km-5uGCCFG9KmNxE';
const PREFIX = '/'
const ms = require('ms')

// please create a role named 'Muted' and a 'Verified' role to continue. To use some commands, a role named 'Staff' (Case Sensitive!) is needed.

bot.on('ready', () => {
  console.log("Bot Online!")
  bot.user.setActivity("Avance")
})
bot.on('message', message => {
  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {

    case 'mute':

      if (!message.member.roles.find(r => r.name === "Staff")) return message.channel.send("You need the role Staff to use this command!").then(msg => msg.delete(5000))
      let person = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
      if (!person) return message.reply("Couldn't find that member!");

      let mainrole = message.guild.roles.find(role => role.name === "Verified");
      let muterole = message.guild.roles.find(role => role.name === "Muted");

      if (!muterole) return message.reply("Could not find role 'Muted' (it's case sensitive!)");

      let time = args[2];

      if (!time) {
        return message.reply("No time specified!");
      };

      person.removeRole(mainrole.id);
      person.addRole(muterole.id);

      message.channel.send(`@${person.user.tag} has been muted!`)

      setTimeout(function () {

        person.addRole(mainrole.id);
        person.removeRole(muterole.id);
        message.channel.send(`@${person.user.tag} has been unmuted!`);

      }, ms(time));
      break;

    case 'kick':
      if (!message.member.roles.find(r => r.name === "Staff")) return message.channel.send("You need the role Staff to use this command!").then(msg => msg.delete(5000))

      const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          member.kick('You were kicked by a staff member!').then(() => {
            message.reply(`Successfully kicked ${user.tag}`);
          }).catch(err => {
            message.reply('I was unable to kick this player');
            console.log(err);


          });

        } else {
          message.reply("That person isn\'t in this guild/server");

        }

      } else {
        message.reply('You need to specify a person!');
      }

      break;
    case 'ban':
      if (!message.member.roles.find(r => r.name === "Staff")) return message.channel.send("You need the role Staff to use this command!").then(msg => msg.delete(5000))

      const user1 = message.mentions.users.first();
      if (user1) {
        const member = message.guild.member(user1);
        if (member) {
          member.ban('You were banned! Oopsies!')


        } else {
          message.reply("A player was not specified!");
        }




      }
      break;

    case ('purge'):
      if (!message.member.roles.find(r => r.name === "Staff")) return message.channel.send("You need the role Staff to use this command!").then(msg => msg.delete(5000))
      if (!args[1]) return message.reply('No second argument found!');
      message.channel.bulkDelete(args[1]);


      break;

    case 'unmute':

      if (!message.member.roles.find(r => r.name === "Staff")) return message.channel.send("You need the role Staff to use this command!").then(msg => msg.delete(5000))
      const person2 = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
      if (!person2) return message.reply("Couldn't find that member!");

      let mainrole2 = message.guild.roles.find(role => role.name === "Verified");
      let muterole2 = message.guild.roles.find(role => role.name === "Muted");





      person2.removeRole(muterole2.id);
      person2.addRole(mainrole2.id);

      message.channel.send(`@${person2.user.tag} has been unmuted!`)

      break;

    
    case 'unban':
      if (!message.member.roles.find(r => r.name === "Staff")) return message.channel.send("You need the role Staff to use this command!").then(msg => msg.delete(5000));
      let banMember2 = args[1]
      message.guild.unban(banMember2)
      message.reply('Unbanned!');

      break;
    case 'softban':
      if (!message.member.roles.find(r => r.name === "Staff")) return message.channel.send("You need the role Staff to use this command!").then(msg => msg.delete(5000));
      let bannedMember = message.mentions.members.first() || message.guild.member.get(args[0]);
      if(!bannedMember) return message.channel.send("Please specify a player to softban!");
      bannedMember.send("You were softbanned, please rejoin here: https://discord.gg/8ZSz2QA").then(()=>{
        message.guild.ban(bannedMember, {days: 1}).then(()=>{
          message.guild.unban(bannedMember.id).catch(err => console.log(err))
        })
      }

      ) 
      break;

    case 'announcement':
      if (!message.member.roles.find(r => r.name === "Staff")) return message.channel.send("You need the role Staff to use this command!").then(msg => msg.delete(5000));
      let mChannel = message.mentions.channels.first();
      let embed2 = new Discord.RichEmbed()
      .setTitle("ANNOUNCEMENT")
      .setFooter("Powered by Aeron")
      let argsresult;
      if (mChannel) {
        argsresult = args.slice(2).join(" ");
        embed2.addField(argsresult)
        mChannel.sendEmbed(embed2);

      } else {
        argsresult = args.slice(1).join(" ")
        embed2.addField(argsresult)
        message.channel.sendEmbed(embed2)


      }
      break;
      case 'embed':
        if (!message.member.roles.find(r => r.name === "Staff")) return message.channel.send("You need the role Staff to use this command!").then(msg => msg.delete(5000));

        let lol = args.slice(1).join(" ")
        
        let embed3 = new Discord.RichEmbed()
        .setTitle(lol)
        message.channel.sendEmbed(embed3)
        
    case 'commands':
      let embed = new Discord.RichEmbed()
      .setTitle("AvanceBot Commands")
      .addField('Mute',"Mute Command")
      
      .addField('Kick', "Kick Command")
      
      .addField('Ban', "Ban Command")
      
      .addField('Purge', "Purge Command")
      
      .addField('Unmute', "Unmute Command")
      
      .addField('Unban', "Unban Command")
      
      .addField('Softban', "Softban Command")
      
      .addField('Announcement', "Announcement Command")
      
      .addField('Embed', "Embed Command")
      
      .setFooter('Powered by Aeron. Prefix is \'/\'')
      message.channel.sendEmbed(embed);


      
   

      break;




  }
})



bot.login(token)
