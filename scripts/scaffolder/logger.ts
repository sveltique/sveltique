import chalk from "chalk";

/** Logs to console with colors and preprended text. */
export const logger = {
	info(...text: unknown[]) {
		return console.info(chalk.blue.bold("[INFO]"), ...text);
	},
	success(...text: unknown[]) {
		return console.log(chalk.green.bold("[SUCCESS]"), ...text);
	},
	warn(...text: unknown[]) {
		return console.warn(chalk.yellow.bold("[WARNING]"), ...text);
	},
	error(...text: unknown[]) {
		return console.error(chalk.red.bold("[ERROR]"), ...text);
	}
};
