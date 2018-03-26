function encrypt(message,key1,key2,key3){
	console.log("Hello world", message, key1, key2, key3);
	var l=message.length;
	var msgInt=new Array(l);
	for (var i = 0; i < l; i++)
		msgInt[i]=message.charCodeAt(i);
	var intKey1=parseInt(key1,2);
	var intKey2=parseInt(key2,2);
	var intKey3=parseInt(key3,2);
	var encryptCloud1=new Array(l);
	var encryptCloud2=new Array(l);
	for(var i=0;i<l;i++){
		encryptCloud1[i]=((msgInt[i]^intKey1)+intKey2);
		encryptCloud2[i]=((msgInt[i]^intKey1)-intKey2);
	}
	var msgCloud1=new Array(l);
	var msgCloud2=new Array(l);
	for(var i=0;i<l;i++){
		msgCloud1[i]=(encryptCloud1[i]^intKey3);
		msgCloud2[i]=(encryptCloud2[i]^intKey3);
	}
	console.log("msgCloud1",msgCloud1);
	console.log("msgCloud2",msgCloud2);
	var finalEncryptedMessage1=msgCloud1;
	var finalEncryptedMessage2=msgCloud2;
	console.log("finalEncryptedMessage1",finalEncryptedMessage1);
	console.log("finalEncryptedMessage2",finalEncryptedMessage2);
	var message1=new Array(finalEncryptedMessage1,finalEncryptedMessage2);
	var returnobj = { message1: message1, finalEncryptedMessage1 : finalEncryptedMessage1, finalEncryptedMessage2 : finalEncryptedMessage2};
	console.log(returnobj);
	return returnobj;
}

function decrypt(finalEncryptedMessage_1,key1,key2){
	var intKey1=parseInt(key1,2);
	var intKey2=parseInt(key2,2);
	console.log(finalEncryptedMessage_1.split(','))
	finalEncryptedMessage=String.fromCharCode.apply(null,finalEncryptedMessage_1.split(','));
	console.log(finalEncryptedMessage)
	var l=finalEncryptedMessage.length;
	var msgChar=new Array(l);
	//message.toCharArray();
	var decryption1=new Array(l/2);
	var decryption2=new Array(l/2);
	for(var i=0;i<l;i++){
		msgChar[i]=finalEncryptedMessage.charCodeAt(i);
		if(i<l/2)
			decryption1[i]=(msgChar[i]^intKey1);
		else
			decryption2[i-(l/2)]=(msgChar[i]^intKey1);
	}
	var decryptSum=new Array(l/2);
	for(var i=0;i<l/2;i++)
		decryptSum[i]=((decryption1[i]+decryption2[i])>>1);
	var decryptStep2=new Array(l/2);
	for(var i=0;i<l/2;i++)
		decryptStep2[i]=(decryptSum[i]^intKey2);
	var finalDecryptedMessage=String.fromCharCode.apply(null, decryptStep2);
	return finalDecryptedMessage;
}
