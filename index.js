var wns = require('wns');
 
var channelUrl = '{url to your application notification channel}';
var options = {
	client_id: '{your Package Security Identifier}',
	client_secret: '{your Client Secret}'	
};
 
wns.sendTileSquareBlock(channelUrl, 'Yes!', 'It worked!', options, function (error, result) {
	if (error)
		console.error(error);
	else
		console.log(result);
});


