require('dotenv').config();

const path = require('path');

const jsonConfig = path.join(__dirname, 'config.json');

let config;
try {
  config = require(jsonConfig);
} catch (err) {
  console.error("config.json not found or is invalid!", err.message);
  process.exit(1);
}

// --- Prefer environment variables over config.json values ---
const env = process.env;

if (env.TOKEN) config.token = env.TOKEN;
if (env.PREFIX) config.prefix = env.PREFIX;
if (env.OWNER_ID) config.ownerID = env.OWNER_ID.split(',').map(s => s.trim()).filter(Boolean);
if (env.SPOTIFY_ID) config.SpotifyID = env.SPOTIFY_ID;
if (env.SPOTIFY_SECRET) config.SpotifySecret = env.SPOTIFY_SECRET;
if (env.LASTFM_KEY) config.LastFmKey = env.LASTFM_KEY;
if (env.LASTFM_SECRET) config.LastFmSecret = env.LASTFM_SECRET;
if (env.COLOR) config.color = env.COLOR;
if (env.LOGS) config.logs = env.LOGS;
if (env.NODE_SOURCE) config.node_source = env.NODE_SOURCE;

config.links = config.links || {};
if (env.LINKS_SUPPORT) config.links.support = env.LINKS_SUPPORT;
if (env.LINKS_INVITE) config.links.invite = env.LINKS_INVITE;
if (env.LINKS_GUILD) config.links.guild = env.LINKS_GUILD;

config.Webhooks = config.Webhooks || {};
if (env.WEBHOOK_BLACK) config.Webhooks.black = env.WEBHOOK_BLACK;
if (env.WEBHOOK_PLAYER_CREATE) config.Webhooks.player_create = env.WEBHOOK_PLAYER_CREATE;
if (env.WEBHOOK_PLAYER_DELETE) config.Webhooks.player_delete = env.WEBHOOK_PLAYER_DELETE;
if (env.WEBHOOK_GUILD_JOIN) config.Webhooks.guild_join = env.WEBHOOK_GUILD_JOIN;
if (env.WEBHOOK_GUILD_LEAVE) config.Webhooks.guild_leave = env.WEBHOOK_GUILD_LEAVE;
if (env.WEBHOOK_CMDRUN) config.Webhooks.cmdrun = env.WEBHOOK_CMDRUN;

config.nodes = config.nodes || [];
if (env.LAVALINK_URL || env.LAVALINK_AUTH) {
  config.nodes = [{
    name: env.LAVALINK_NAME || "Samaksh Music",
    url: env.LAVALINK_URL || (config.nodes[0] ? config.nodes[0].url : "localhost:2333"),
    auth: env.LAVALINK_AUTH || (config.nodes[0] ? config.nodes[0].auth : ""),
    secure: env.LAVALINK_SECURE ? env.LAVALINK_SECURE === 'true' : true,
  }];
}

config.node_options = config.node_options || {};
if (env.LA_USER_AGENT) config.node_options.userAgent = env.LA_USER_AGENT;

function parseBoolean(value) {
  if (typeof value === "string") {
    value = value.trim().toLowerCase();
  }
  switch (value) {
    case true:
    case "true":
      return true;
    default:
      return false;
  }
}

config.parseBoolean = parseBoolean;

module.exports = config;
