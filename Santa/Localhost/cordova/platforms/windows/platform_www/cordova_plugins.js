cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "id": "cordova-plugin-network-information.network",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "id": "cordova-plugin-network-information.Connection",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/src/windows/NetworkInfoProxy.js",
        "id": "cordova-plugin-network-information.NetworkInfoProxy",
        "pluginId": "cordova-plugin-network-information",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-hostedwebapp/www/hostedWebApp.js",
        "id": "cordova-plugin-hostedwebapp.hostedwebapp",
        "pluginId": "cordova-plugin-hostedwebapp",
        "clobbers": [
            "hostedwebapp"
        ]
    },
    {
        "file": "plugins/cordova-plugin-hostedwebapp/src/windows/HostedWebAppPluginProxy.js",
        "id": "cordova-plugin-hostedwebapp.HostedWebAppPluginProxy",
        "pluginId": "cordova-plugin-hostedwebapp",
        "merges": [
            ""
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.0.0",
    "cordova-plugin-network-information": "1.1.0",
    "cordova-plugin-hostedwebapp": "0.2.1"
}
// BOTTOM OF METADATA
});