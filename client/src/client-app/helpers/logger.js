import chalk from 'chalk';

export default {
	/**
	 * Something is logged in red colored text
	 * @param {*} something 
	 */
	red(something) {
		console.log(chalk.red(something));
	},
	/**
	 * Something is logged in blue color
	 * @param {*} something 
	 */
	blue(something) {
		console.log(chalk.blue(somethingx));
	},
	/**
	 * something is logged in green clour
	 * Suitable for OK messages
	 * @param {*} something 
	 */
	green(something) {
		console.log(chalk.green(something));
	},
	/**
	 * something is logged in magenta color
	 * @param {*} something 
	 */
	magenta(something) {
		console.log(chalk.magenta(something));
	}
}