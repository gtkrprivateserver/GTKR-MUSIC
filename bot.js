const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const fs = require('fs');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const player = createAudioPlayer();
let currentResource = null;

client.once('ready', () => {
    console.log(`Bot online: ${client.user.tag}`);
});

client.on('messageCreate', async message => {
    if (!message.guild) return;

    const args = message.content.split(' ');
    const command = args.shift().toLowerCase();

    if (command === '!join') {
        const channel = message.member.voice.channel;
        if (channel) {
            joinVoiceChannel({
                channelId: channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });
            message.reply('Joined your voice channel!');
        }
    }

    if (command === '!play') {
        const fileName = args[0];
        const path = `./uploads/${fileName}`;
        if (fs.existsSync(path)) {
            currentResource = createAudioResource(path);
            player.play(currentResource);
            message.reply(`Playing ${fileName}`);
            const connection = joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });
            connection.subscribe(player);
        } else message.reply('File not found!');
    }

    if (command === '!stop') {
        player.stop();
        message.reply('Stopped!');
    }
});

client.login(process.env.DISCORD_TOKEN);

const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('dashboard'));

app.post('/upload', upload.single('mp3'), (req, res) => {
    // Data form
    const { name, email, discord, subject, category, message } = req.body;

    // Kirim webhook ke Discord (opsional)
    const fetch = require('node-fetch');
    fetch(process.env.WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: `**${name}** (${discord}, ${email}) sent a message\n**Subject:** ${subject}\n**Category:** ${category}\n**Message:** ${message}`
        })
    });

    res.json({ message: 'Uploaded successfully!' });
});

app.listen(3000, () => console.log('Dashboard running on http://localhost:3000'));
