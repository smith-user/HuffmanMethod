const { HuffmanCode } = require('./HuffmanCode.js');
const { huffmanDecode } = require('./HuffmanDecode.js');
let fs = require('fs')

let report = [];
let countFailure = 0;

// ------------------------------------ TestCases: ------------------------------------


test('Input: \'abrakadabra\'').inText('abrakadabra');
test('Input: \'aaaab\'').inText('aaaab');
test('Input: \'Hello World!!!\'').inText('Hello World!!!');


// ------------------------------------------------------------------------------------

function test(testName) {
	return {
		inText: input => {
			
			let huffmanCode = new HuffmanCode(input);
			let argument;
			
			// ZerosAndOnes Test
			report.push(`${testName} (bin):`);
			argument = keyToString(huffmanCode.keysCode) + '\n' + huffmanCode.zerosAndOnes;
			resultDecode = huffmanDecode(argument, 'bin');
			if (resultDecode == input) {
				report.push(`\tSuccess! \n \t ${keyToString(huffmanCode.keysCode)} \t ${huffmanCode.zerosAndOnes}`);
			} else {
				report.push(`\tFailed! Result of decode is '${resultDecode}', but expectation is '${input}'. `);
				report.push(`\t ${keyToString(huffmanCode.keysCode)} \t ${huffmanCode.zerosAndOnes}`);
				countFailure += 1;
			}
			
			// Chars Test
			report.push(`${testName} (chars):`);
			argument = keyToString(huffmanCode.keysCode) + '\n' + huffmanCode.charsCode;
			resultDecode = huffmanDecode(argument, 'chars');
			if (resultDecode == input) {
				report.push(`\tSuccess! \n \t ${keyToString(huffmanCode.keysCode)} \t ${huffmanCode.charsCode}`);
			} else {
				report.push(`\tFailed! Result of decode is '${resultDecode}', but expectation is '${input}'. `);
				report.push(`\t ${keyToString(huffmanCode.keysCode)} \t ${huffmanCode.zerosAndOnes}`);
				countFailure += 1;
			}
		}
	}
}

fs.writeFile('testsReport.txt', report.join('\n'), (err) => {
		if (err){
			console.err(err);
			return;
		}
		console.log(`The tests are finished! Failed tests: ${countFailure}.`);
		console.log('Read more in testsReport.txt');
	});
	

function keyToString(keys) {
	let output = new Array();
	for(key in keys) {
		output.push(`${keys[key]} ${key}`)
	}
	
	return '[[' + output.join(' ') + ']]\n';
}
