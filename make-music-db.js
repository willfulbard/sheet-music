#!/usr/bin/env node

import yaml from 'yaml';
import fs from 'fs/promises';

main();

async function main() {
	const files = await Promise.all(
		(await fs.readdir('music')).map(
			f => fs.readFile(`music/${f}`, { encoding: 'utf8' })
		)
	);

	const tunes = files.join('\n\n')
		.replace(/^%.+$/gm, '')
		.split(/\n\n/).filter(
			t => t.includes('\nX:')
		)
		.map(t => t.trim())
	  .map(t => t.replace(/\bX:[^\n]+\n/gm, ''));


	const tuneMap = {
		unknown: [],
	};

	const nameRegex = /\bT: *(.*)$/mi;
	tunes.forEach(t => {
		const [_, name] = t.match(nameRegex) || [];

		if (!name) {
			tuneMap.unknown.push(t);
			return;
		}

		if (!tuneMap[name]) {
			tuneMap[name] = [];
		}

		tuneMap[name].push(t);
	});

	Object.entries(tuneMap).forEach(
		([n, ta]) => {
			console.log(`${n}: ${ta.length}`);
			console.log(ta);
		}
	);
}
