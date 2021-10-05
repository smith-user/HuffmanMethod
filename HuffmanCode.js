let dictionary; // массив {letter: code}
let nodes; // массив узлов дерева

module.exports.HuffmanCode = function (text) {
	dictionary = new Array();
	nodes = new Array();
	let alph = getAlphabetWithFreq(text);
	creatTree(alph);
	fillingDictionary('', nodes[nodes.length - 1]);
	codingText = coding(text)

	this.zerosAndOnes = codingText;
	this.keysCode = dictionary;
	this.charsCode = getCharsCode(codingText);
}

// возвращает массив {letter : letter's_freq}
function getAlphabetWithFreq (text) {
	let alphabet = new Array();
	for (let symbol of text) {
		if (alphabet[symbol] == undefined)
			alphabet[symbol] = 1;
		else 
			alphabet[symbol]++;
	}
	return alphabet;
} 

// функция-конструктор
function Node (letter, freq, leftBranch, rightBranch, used) {
	this.letter = letter;
	this.freq = freq;
	this.leftBranch = leftBranch;
	this.rightBranch = rightBranch;
	this.used = used;
}

//создание дерева (заполнение массива nodes)
function creatTree (alphabet) {
	let counterUnusedNodes = 0;
	for (letter in alphabet) {
		nodes.push(new Node(letter, alphabet[letter], null, null, false));
		counterUnusedNodes++;
	}
	
	for (let i = counterUnusedNodes; i > 1; i--) {
		let nodeIndexes = findTwoNodesWithMinFreq();
		nodes[nodeIndexes[0]].used = true;
		nodes[nodeIndexes[1]].used = true;
		let leftNode = nodes[nodeIndexes[0]];
		let rightNode = nodes[nodeIndexes[1]];
		
		nodes.push(
			new Node(leftNode.letter + rightNode.letter,
				leftNode.freq + rightNode.freq,
				nodeIndexes[0],
				nodeIndexes[1],
				false)
		);
	}
}

// рекурсивная функция, "двигается" вниз по дереву и заполняет массив dictionary - ключ кодировки
function fillingDictionary(code, node) {
	if (node.leftBranch != null && node.rightBranch != null) {
		fillingDictionary(code + '0', nodes[node.leftBranch]);
		fillingDictionary(code + '1', nodes[node.rightBranch]);
	} else {
		dictionary[node.letter] = code;
	}
}

// Возвращает массив из двух индексов неиспользованных узлов с наименьшими freq
function findTwoNodesWithMinFreq() {
	let min0 = 1000;
	let index0 = 0;
	let min1 = 1000;
	let index1 = 0;
	for (let i = 0; i < nodes.length; i++) {
		if (nodes[i].used) 
			continue;
		if (nodes[i].freq < min0) {
			min1 = min0;
			index1 = index0;
			min0 = nodes[i].freq;
			index0 = i;
		} else if (nodes[i].freq < min1) {
			min1 = nodes[i].freq;
			index1 = i;
		}		
	}
	return new Array(index0, index1);
}

// кодирует текст в соответствии с dictionary
// возвращает строку - закодированный текст - последовательность нулей и единиц
function coding(text) {
	let code = '';
	for(letter of text)
		code += dictionary[letter];
	return code;
}

/*
Другая кодировка: возвращает строку - последовательность символов
В конец послед. нулей и единиц дописываются столько нулей, сколько необходимо, чтобы длина строки была кратна 8
При этом в начало добавляется еще 8 нулей и единиц: 
	количество единиц в этих 8ми цифрах показывает, сколько нулей было дописано в конец закодированной строки
Полученная последовательность разбивается на восьмизначные числа в двоичной системе счисления
Каждое такое число переводиться в десятичную систему счисления, а в строку записывается буква, которая соответствует этому значению
*/
function getCharsCode(zerosAndOnes) {
	let code = '';
	countAddedZero = 8 - zerosAndOnes.length % 8;
	if (countAddedZero == 8)
		countAddedZero = 0;
	zerosAndOnes = '1'.repeat(countAddedZero) + '0'.repeat(8 - countAddedZero) 
		+ zerosAndOnes + '0'.repeat(countAddedZero);
	for (let i = 0; i < zerosAndOnes.length; i += 8)
	{
		let bin = zerosAndOnes.substring(i, i + 8)
		n = Number.parseInt(bin, 2);
		code += String.fromCharCode(n);
	}
	return code;
		
}
