import chalk from 'chalk';


export default {
	blue(something) {
		console.log(chalk.blue(something));
	},
	red(something) {
		console.log(chalk.red(something));
	},
	green(something) {
		console.log(chalk.green(something));
	},
	yellow(something) {
		console.log(chalk.yellow(something));
	}
}