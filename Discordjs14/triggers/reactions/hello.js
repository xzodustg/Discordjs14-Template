module.exports = {
	name: ["your", "trigger", "words", "in", "array"],

	execute(message, args) {
		// ตอบโต้กับผู้ใช้ในคำ Array บรรทัด 2 

		message.channel.send({
			content: "ฉัน`น่ารัก`มาก",
		});
	},
};
