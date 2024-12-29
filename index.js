const { Client } = require('discord.js-selfbot-v13');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client(); // All partials are loaded automatically
const express = require('express')
const app = express()
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 
client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);

  try {
    const channel = await client.channels.fetch(process.env.channel);
    if (channel && channel.isVoice()) {
      joinVoiceChannel({
        channelId: channel.id,
        guildId: process.env.guild,
        selfMute: true,
        selfDeaf: true,
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
