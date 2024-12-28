const { Client } = require('discord.js-selfbot-v13');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client(); // All partials are loaded automatically

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);

  try {
    const channel = await client.channels.fetch(process.env.channel);
    if (channel && channel.isVoice()) {
      joinVoiceChannel({
        channelId: channel.id,
        guildId: process.env.guild,
        selfMute: false,
        selfDeaf: false,
        adapterCreator: channel.guild.voiceAdapterCreator
      });
      console.log(`Joined voice channel ${channel.name}`);
    } else {
      console.error('The fetched channel is not a voice channel.');
    }
  } catch (error) {
    console.error('Error connecting to voice channel:', error);
  }
});

client.login(process.env.token);

// cirkyyinthearea
