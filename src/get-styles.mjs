import { join } from 'node:path';
import { readFileSync } from 'node:fs';

/**
 * Utility for plugin consumers to grab a link tag or inline styles
 * @returns {string} <style> or <link> tag
 */
export default function getStyles() {
	const pluginOutputDir = join(
		process.cwd(),
		'node_modules',
		'@architect',
		'shared',
		'enhance-styles',
	);
	const stylesFilePath = join(pluginOutputDir, 'styles.css');

	let css;
	try {
		css = readFileSync(stylesFilePath, { encoding: 'utf-8' });
	} catch (error) {
		css = '/* enhance-styles placeholder */';
	}

	// TODO: optionally return <link> tag
	return `<style>${css}</style>`;
}
