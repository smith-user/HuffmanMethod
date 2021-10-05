module.exports.huffmanDecode = function (inText, typeCode) {
	let keyString = inText.substring(2, inText.indexOf(']]')); // keyString содержит строку вида '<code0> <letter0> <code1> <letter1> ...'
	let keysCode = fillingKey(keyString); //ключ кодировки
	let output = '';
	inText = inText.substring(inText.indexOf(']]')+4); // inText содержит закодированную строку
	
	if (typeCode == 'chars')
		inText = getZerosAndOnes(inText);
	else if (typeCode != 'bin')
		throw new Error(`Invalid type of code: ${typeCode}`);
	
	let i = 0;
	let j = 0;
	while (i < inText.length) {
		SearchCode:
		for (j = i; j < inText.length; j++) {
			let expectedCode = '.' + inText.substring(i, j + 1); // В начало каждого кода символа была добавлена точка
			if (keysCode[expectedCode] != undefined) {
				output += keysCode[expectedCode];
				break SearchCode;
			}
		}
		i = j + 1			
	}
	return output;
}

// Возвращает массив {code: letter}
function fillingKey(keyLine) {
	let keys = new Array();
	let keyArray = splitSpaces(keyLine);
	for (let i = 0; i < keyArray.length; i += 2) {
		let code = '.' + keyArray[i]; // Иначе, code в следющей строке конвертируется в число
		keys[code] = keyArray[i + 1];
	}
	return keys;
}

// Последовательность символов конвертирует обратно в последовательность нулей и единиц - возвращает строку
function getZerosAndOnes(code) {
	let zerosAndOnes = '';
	for (let i = 0; i < code.length; i++) {
		n = code.charCodeAt(i);
		bin = n.toString(2);
		zerosAndOnes += '0'.repeat(8 - bin.length) + bin; // если число не 8ми значное, в начало дописываются нули
	}
	let firstByte = zerosAndOnes.substring(0, 8);
	let countAddedZeros = firstByte.split('1').length - 1; // подсчет количества единиц в первых 8 цифрах
	zerosAndOnes = zerosAndOnes.substring(8, zerosAndOnes.length - countAddedZeros);
	return zerosAndOnes;
			
}

//При использовании встроенного метода String.split() возникает ошибка, если исходная строка содержала пробел
function splitSpaces(text) {
	let arr = new Array();
	let index = text.indexOf(' ');
	while(index > 0) {
		arr.push(text.substring(0, index));
		arr.push(text.charAt(index + 1));
		text = text.substring(index + 3);
		index = text.indexOf(' ');
	}
	return arr;
}
