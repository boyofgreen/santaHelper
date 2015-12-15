angular.module('myApp', [])
	.controller('IndexController', ['$scope', '$http', function ($scope, $http) {
		var index = this;
		var channel;

		index.sendNotification = function (responseData) {
			console.log("sendNotification");

			var body = "<body>";

			var httpRequestMessage = new Windows.Web.Http.HttpRequestMessage();
			httpRequestMessage.method = Windows.Web.Http.HttpMethod.post;
			httpRequestMessage.requestUri = new Windows.Foundation.Uri(channel.uri);

			var content = new Windows.Web.Http.HttpStringContent(body);

			var contentType = content.headers;
			contentType["Content-Type"] = "text/xml";

			httpRequestMessage.headers["X-WNS-Type"] = "wns/tile";
			httpRequestMessage.headers.authorization = new Windows.Web.Http.Headers.HttpCredentialsHeaderValue(responseData.token_type, responseData.access_token);

			httpRequestMessage.content = content;

			var httpClient = new Windows.Web.Http.HttpClient();
			httpClient.sendRequestAsync(httpRequestMessage).done(
				function (response) {
					if (response.isSuccessStatusCode) {
						console.log(response.headers["X-WNS-MSG-ID"] + "  " + response.headers["X-WNS-STATUS"]);
					}
				});

			console.log(responseData.access_token);
		};

		index.fetchAccessToken = function () {
			console.log("Fetch Access Token");

			if (channel == undefined) {
				console.log("channel needs to be defined");
				index.registerForNotificationChannel();
			}

			// THIS SHOULD ONLY BE DONE IF A VALID ACCESS TOKEN IS NOT FOUND - OUT OF SCOPE FOR PoC
			var uri = "https://login.live.com/accesstoken.srf";

			// All data for the body of the request
			var keyValuePairs = (new Windows.Web.Http.HttpClient()).defaultRequestHeaders;
			keyValuePairs.clear();
			keyValuePairs["grant_type"] = "client_credentials";
			keyValuePairs["client_id"] = "ms-app://s-1-15-2-1034301451-2790853877-373007014-4150264328-3453251278-1585188275-3722654340";
			keyValuePairs["client_secret"] = "iVkQHvWqxvAwdHHa9Q0qA-aPUBOOalB2";
			keyValuePairs["scope"] = "notify.windows.com";

			// HTTP Request Message
			var httpRequestMessage = new Windows.Web.Http.HttpRequestMessage();
			httpRequestMessage.method = Windows.Web.Http.HttpMethod.post;
			httpRequestMessage.requestUri = new Windows.Foundation.Uri(uri);
			httpRequestMessage.content = new Windows.Web.Http.HttpFormUrlEncodedContent(keyValuePairs);

			// Create call
			var httpClient = new Windows.Web.Http.HttpClient();
			httpClient.sendRequestAsync(httpRequestMessage).done(
				function (response) {
					if (response.isSuccessStatusCode) {
						console.log("success");
						var responseData = JSON.parse(response.content.toString());
						index.sendNotification(responseData);
					}
				},
				function (response) {
					console.log("fail");
				});
		};

		index.registerForNotificationChannel = function () {
			console.log("Get Channel Notification");

			var pushNotifications = Windows.Networking.PushNotifications;
			var channelOperation = pushNotifications.PushNotificationChannelManager.createPushNotificationChannelForApplicationAsync();

			return channelOperation.then(function (newChannel) {
				// Success. The channel URI is found in newChannel.uri.
				channel = newChannel;

				//Uncomment to save channel to a server
				//index.saveChannel();

				console.log(channel);
			},
				function (error) {
					// Could not create a channel. Retrieve the error through error.number.
					console.log(error);
				}
			);

		};

		index.saveChannel = function () {
			console.log("Send url to server to save and use when notification needs to be sent.");
			var serverUrl = "http://www.contoso.com"; // Need to change this to Santa's server.
			var request = {
				type: "POST",
				url: serverUrl,
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				data: "channelUri=" + channel.uri
			};


			$http(request).then(
				function (req) {
					// Channel URI successfully sent to server. Retrieve the response from req.response.
					console.log(req.status);
				},
				function (req) {
					// Could not send channel URI to server. Retrieve the error through req.statusText.
					console.log(req.status);
				}
			);
		}
	}]);