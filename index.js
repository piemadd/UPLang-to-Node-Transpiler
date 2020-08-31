// importing needed libraries
const fs = require('fs');
const { exec } = require("child_process");
const keywordsRaw = fs.readFileSync('dictionary.json');
const keywordDict = JSON.parse(keywordsRaw);

let tempDict = Object.keys(keywordDict);
const dumbDict = tempDict.join(" ");
tempDict = null;

// getting command line arguments and parsing
args = process.argv;
args.shift();
args.shift();

// returns array of file lines
function getLines(arguments) {
	try {
		lines = fs.readFileSync('index.up').toString().split(";");
	} catch (e) {
		console.log("Error Code: ${e}");
		return null;
	}
	return lines;
}

function findCommand(line) {
	jsCommands = keywordDict[1]
	upCommands = keywordDict[0] 
	for (i = 0; i < upCommands.length; i++) {
		command = upCommands[i]
		if (line.includes(command)) {
			final = jsCommands[i] + line.substring(upCommands[i].length + 2, line.length + 2);
			if (final[final.length - 1] != ";") {final = final + ";"};
			return final
			}
	}
	return ""
}

function replaceCommands(lines) {
	let lineArray = [];
	lines.forEach(line => {
		if (line.includes("//")) {
			line = line.substring(0, line.indexOf("//") - 1);
		}
		lineArray.push(findCommand(line))
	})
	
	let commands = lineArray.join("");
	commands.replace("\t", "");
	commands.replace("\n", "");
	commands.replace("\r", "");
	return commands
}

fs.writeFile('temp.js', replaceCommands(getLines(args)), function (err) {
  	if (err) {return console.log(err);}
	exec("node temp.js", (error, stdout, stderr) => {
		if (error) {
			console.log(error.message);
			return;
		}
		if (stderr) {
			console.log(stderr);
			return;
		}
		if (stdout) {
			console.log(stdout);
			return;
		}
	});
});