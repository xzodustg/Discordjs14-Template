          // // ประกาศค่าคงที่ที่จะใช้ตลอดทั้งบอท

const fs = require("fs");
const {
	Client,
	Collection,
	GatewayIntentBits,
	Partials,
} = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { token, client_id, test_guild_id } = require("./config.json");

// สร้าง Client
const client = new Client({
	// เวอร์ชั่น 14 อย่าลืมติดตั้ง Intents
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
	partials: [Partials.Channel],
});

/**********************************************************************/
            // ด้านล่างนี้เราจะสร้าง Handler

const eventFiles = fs
	.readdirSync("./events")
	.filter((file) => file.endsWith(".js"));

// วนซ้ำไฟล์ทั้งหมดและดำเนินการเมื่อมีไฟล์
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(
			event.name,
			async (...args) => await event.execute(...args, client)
		);
	}
}

/**********************************************************************/
// กำหนดการการใช้ Slash หรือต่างๆ

client.commands = new Collection();
client.slashCommands = new Collection();
client.buttonCommands = new Collection();
client.selectCommands = new Collection();
client.contextCommands = new Collection();
client.modalCommands = new Collection();
client.cooldowns = new Collection();
client.autocompleteInteractions = new Collection();
client.triggers = new Collection();

/**********************************************************************/
//          การลงทะเบียนคำสั่งดั้งเดิมตามชื่อ

const commandFolders = fs.readdirSync("./commands");

//     วนซ้ำไฟล์ทั้งหมดและจัดเก็บคำสั่งในชุดคำสั่ง

for (const folder of commandFolders) {
	const commandFiles = fs
		.readdirSync(`./commands/${folder}`)
		.filter((file) => file.endsWith(".js"));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

/**********************************************************************/
//   การลงทะเบียนการโต้ตอบผู้ใช้ของคำสั่ง Slash

const slashCommands = fs.readdirSync("./interactions/slash");

// วนซ้ำไฟล์ทั้งหมดและจัดเก็บคำสั่ง slash ในคอลเลกชัน slashCommands

for (const module of slashCommands) {
	const commandFiles = fs
		.readdirSync(`./interactions/slash/${module}`)
		.filter((file) => file.endsWith(".js"));

	for (const commandFile of commandFiles) {
		const command = require(`./interactions/slash/${module}/${commandFile}`);
		client.slashCommands.set(command.data.name, command);
	}
}

/**********************************************************************/
// การลงทะเบียนของการโต้ตอบการเติมข้อความอัตโนมัติ หรือ Autocomplete

const autocompleteInteractions = fs.readdirSync("./interactions/autocomplete");

// วนซ้ำไฟล์ทั้งหมดและจัดเก็บการโต้ตอบการเติมข้อความอัตโนมัติในคอลเลกชันการเติมข้อความอัตโนมัติ

for (const module of autocompleteInteractions) {
	const files = fs
		.readdirSync(`./interactions/autocomplete/${module}`)
		.filter((file) => file.endsWith(".js"));

	for (const interactionFile of files) {
		const interaction = require(`./interactions/autocomplete/${module}/${interactionFile}`);
		client.autocompleteInteractions.set(interaction.name, interaction);
	}
}

/**********************************************************************/
// ติดตั้งการตอบโต้ของ Context-Menu 

const contextMenus = fs.readdirSync("./interactions/context-menus");

//       วนไฟล์ซ้ำเหมือนเดิม

for (const folder of contextMenus) {
	const files = fs
		.readdirSync(`./interactions/context-menus/${folder}`)
		.filter((file) => file.endsWith(".js"));
	for (const file of files) {
		const menu = require(`./interactions/context-menus/${folder}/${file}`);
		const keyName = `${folder.toUpperCase()} ${menu.data.name}`;
		client.contextCommands.set(keyName, menu);
	}
}

/**********************************************************************/
// ติดตั้งการตอบโต้ของปุ่ม (Button)

const buttonCommands = fs.readdirSync("./interactions/buttons");

// วนซ้ำอ่านไฟล์เหมือนเดิม

for (const module of buttonCommands) {
	const commandFiles = fs
		.readdirSync(`./interactions/buttons/${module}`)
		.filter((file) => file.endsWith(".js"));

	for (const commandFile of commandFiles) {
		const command = require(`./interactions/buttons/${module}/${commandFile}`);
		client.buttonCommands.set(command.id, command);
	}
}

/**********************************************************************/
// ติดตั้งการตอบโต้ Modal


const modalCommands = fs.readdirSync("./interactions/modals");

// ลูป

for (const module of modalCommands) {
	const commandFiles = fs
		.readdirSync(`./interactions/modals/${module}`)
		.filter((file) => file.endsWith(".js"));

	for (const commandFile of commandFiles) {
		const command = require(`./interactions/modals/${module}/${commandFile}`);
		client.modalCommands.set(command.id, command);
	}
}

/**********************************************************************/
// ติดตั้งการตอบโต้ของ Select Menu

const selectMenus = fs.readdirSync("./interactions/select-menus");

// ลูป

for (const module of selectMenus) {
	const commandFiles = fs
		.readdirSync(`./interactions/select-menus/${module}`)
		.filter((file) => file.endsWith(".js"));
	for (const commandFile of commandFiles) {
		const command = require(`./interactions/select-menus/${module}/${commandFile}`);
		client.selectCommands.set(command.id, command);
	}
}

/**********************************************************************/
// ติดตั้ง Slash-Commands ใน Discord API

const rest = new REST({ version: "9" }).setToken(token);

const commandJsonData = [
	...Array.from(client.slashCommands.values()).map((c) => c.data.toJSON()),
	...Array.from(client.contextCommands.values()).map((c) => c.data),
];

(async () => {
	try {
		console.log("Started refreshing application (/) commands.");

		await rest.put(
			
			Routes.applicationGuildCommands(client_id, test_guild_id),
			// Routes.applicationCommands(client_id)
			{ body: commandJsonData }
		);

		console.log("Successfully reloaded application (/) commands.");
	} catch (error) {
		console.error(error);
	}
})();

/**********************************************************************/
// base chat triggers


const triggerFolders = fs.readdirSync("./triggers");

// ลูป

for (const folder of triggerFolders) {
	const triggerFiles = fs
		.readdirSync(`./triggers/${folder}`)
		.filter((file) => file.endsWith(".js"));
	for (const file of triggerFiles) {
		const trigger = require(`./triggers/${folder}/${file}`);
		client.triggers.set(trigger.name, trigger);
	}
}

// เข้าสู่ระบบด้วยโทเคนที่สร้างไว้

client.login(token);
