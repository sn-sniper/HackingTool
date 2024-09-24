const crypto = require('crypto');

function hashPassword(password){
    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
    return hashedPassword;
}

function splitHashedPassword(hashedPassword){
    const chunks = [];
    for(let i = 0; i < hashedPassword.length; i+=3){
        if(i % 2 !== 0){
            chunks.push(hashedPassword.slice(i, i+3));
        }
    }
    return chunks;
}

function hexToDec(hex) {
    return parseInt(hex,16);
}

function joinDec(dec) {
	return dec.join("");
}

function finalSplit(e){
    const arr = [];
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    for(let i = 0; i < e.length ; i+=2){
        arr.push(e.slice(i,i+2));
    }
    const str = arr.join(" ");

    function asciiToText(asciiString) {
        const text = [];
        const asciiArray = asciiString.split(" ");
    
        for (let i = 0; i < asciiArray.length; i++) {
            const txt = (String.fromCharCode(parseInt(asciiArray[i], 10)) + generateString());
            text.push(txt);
        }   
        return text.join("");
    }
    
    function generateString(){
        let result = ' ';
        for ( let i = 0; i < 3; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    
    return asciiToText(str).split(" ").join("").slice(0,13); // Remove the space argument
}



function main(){
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    readline.question('Enter Password To Encrypt(min 8 chars): ',(password)=>{
        const hashedPassword = hashPassword(password);

        const hashedPasswordChunks = splitHashedPassword(hashedPassword);

        const decimalChunks = hashedPasswordChunks.map(hexToDec);

		const Arr = joinDec(decimalChunks);

		const finalArr = finalSplit(Arr);
		console.log(`New Encrypted Password: ${finalArr}`);
        
        readline.close();
    });
}

main();
