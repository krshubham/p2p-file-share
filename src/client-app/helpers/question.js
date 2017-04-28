import readline from 'readline';

export default function ask(question, callback) {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	rl.question(question, (answer) => {
		rl.close();
		callback(answer);
	});
};
