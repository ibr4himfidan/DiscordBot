// Discord.js'i Dahil Ettim
const Discord = require('discord.js');

// Bot oluştur.
const bot = new Discord.Client();

const prefix = '!';

bot.on('ready', () => {
  console.log('Bot Hazır!');
});

bot.on('message', message => {

  if(message.author.bot) return;
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  switch (command) {
    case 'sa':
      return message.reply('Aleyküm Selam');
    break;
  }

  if(command === 'kontrol'){
    if(message.member.roles.find('name', 'Admin')){
      return message.reply('Sen Yöneticisin');
    } else {
      return message.reply('Sen Yönetici Değilsin.');
    }
  }

  if(command === 'at'){
    let adminRole = message.guild.roles.find('name', 'Admin');
    if(message.mentions.users.size === 0){
      return message.reply('Atmak istediğiniz kullanıcı adını yazınız.');
    }
    let kickMember = message.guild.member(message.mentions.users.first());
    if(!kickMember){
      return message.reply('Geçersiz Kullanıcı Adı');
    }
    if(!message.guild.member(bot.user).hasPermission('KICK_MEMBERS')){
      return message.reply('Sizin Kanaldan Kullanıcı Atmaya Yetkiniz yok!');
    }

    kickMember.kick().then(member => {
      return message.reply(`${member.user.username} sunucudan atıldı.`);
    }).catch(e => {
      console.log(e);
    });
  }

  if(command === 'sustur'){
    if(message.mentions.users.size === 0){
      return message.reply('Susturmak istediğiniz kullanıcı adını yazınız.');
    }

    let muteMember = message.guild.member(message.mentions.users.first());

    if(!muteMember){
      return message.reply('Geçersiz Kullanıcı Adı');
    }

    if(!message.guild.member(bot.user).hasPermission('MUTE_MEMBERS')){
      return message.reply('Sizin kanalda mutelemeye yetkiniz yok!');
    }

    muteMember.setMute(true).then(member => {
      return message.reply(`${member.user.username} mutelendi`);
    }).catch(e => {
      console.log(e);
    });
  }

  if(command === 'ac'){
    if(message.mentions.users.size === 0){
      return message.reply('Açmak istediğiniz kullanıcı adını yazınız.');
    }

    let unMuteMember = message.guild.member(message.mentions.users.first());

    if(!unMuteMember){
      return message.reply('Geçersiz Kullanıcı Adı');
    }

    if(!message.guild.member(bot.user).hasPermission('MUTE_MEMBERS')){
      return message.reply('Sizin kanalda mute açmaya yetkiniz yok!');
    }

    unMuteMember.setMute(false).then(member => {
      return message.reply(`${member.user.username} mutesi açıldı`);
    }).catch(e => {
      console.log(e);
    });
  }

});

bot.login('MzU0Nzg5NDYxMTMxMDAxODc3.DJDXCg.WLTqOjQJAZmUyKtgHAQ_IuxwkVM');
