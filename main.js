const { HuffmanCode } = require('./HuffmanCode.js');
const { huffmanDecode } = require('./HuffmanDecode.js');
let fs = require('fs');
let arg = process.argv;

fs.readFile(arg[4], (err, inText) => {
	if (err) {
		console.error(err);
		return;
	}
	inText = inText.toString();
	
	// удаление последнего символа переноса строки (line feed)
	if (inText.charAt(inText.length - 1) == '\n')
		inText = inText.substring(0, inText.length - 1); 
	
	let output = '';
	switch (arg[2]) {
		case 'HuffmanCode': 
			// HuffmanCode.keysCode(ключ кодировки), zerosAndOnes(послед. нулей и единиц) и charsCode (послед. символов)
			let result = new HuffmanCode(inText); 
			output = keyToString(result.keysCode) + '\n';
			if (arg[3] == 'bin')
				output += result.zerosAndOnes;
			else if (arg[3] == 'chars')
				output += result.charsCode;
			else
				throw new Error(`Invalid type of code: ${arg[3]}`);
			break;
		case 'HuffmanDecode':
			output = huffmanDecode(inText, arg[3]);
			break;
		default:
			throw new Error(`Invalid command: ${arg[2]}`);
	}
	
	fs.writeFile('output.txt', output, (err) => {
		if (err){
			console.err(err);
			return;
		}
		console.log('The file \'output.txt\' has been saved!');
	});
});

// возвращает строку - формат записи ключа кодировки в файл [[<code0> <letter0> <code1> <letter1> ...]]
function keyToString(keys) {
	let output = new Array();
	for(key in keys) {
		output.push(`${keys[key]} ${key}`)
	}
	
	return '[[' + output.join(' ') + ']]\n';
}
