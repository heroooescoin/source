var https = require('https');

const fs = require('fs');
const ChainUtil = require("./chain-util");

const path = 'wallet.dat'
const outputtext = 'Wallet already exists!';

try {
    if (!fs.existsSync(path)) {

        var keyPair = ChainUtil.genKeyPair(Date.now().toString());
        var publicKey = "";
        var privateKey = "";

        publicKey = keyPair.getPublic("hex");
        privateKey = keyPair.getSecret("hex");

        console.log(publicKey + " - privatekey: " + privateKey);
        var jsonObject = JSON.stringify({
            "PrivateKey": privateKey,
            "PublicKey": "HeroooesCoin" + publicKey.substring(1),
            "CryptoAsset": "HeroooesCoin",
            "Identifier": ""
        });
        fs.writeFile("wallet.dat", jsonObject, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Wallet file was created!");
        });

        var cryptoAssetInput = { PrivateKey: privateKey, PublicKey: "HeroooesCoin" + publicKey.substring(1), CryptoAsset: "HeroooesCoin", Identifier: "" };

        jsonObject = JSON.stringify({
            "SignMessage": cryptoAssetInput,
            "CryptoAsset": "HeroooesCoin",
        });

        var postheaders = {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(jsonObject, 'utf8')
        };

        var optionspost = {
            host: 'www.heroooescoin.com',
            path: '/api/cryptoasset22',
            method: 'POST',
            headers: postheaders
        };

        console.info('Options prepared:');
        console.info(optionspost);
        console.info('Do the POST call');

        // do the POST call
        var reqPost = https.request(optionspost, function (res) {
            console.log("statusCode: ", res.statusCode);

            res.on('data', function (d) {
                console.info('POST result:\n');

                process.stdout.write(d);
                console.info('\n\nPOST completed');
            });
        });

        // write the json data
        reqPost.write(jsonObject);
        reqPost.end();

        reqPost.on('error', function (e) {
            console.error(e);
        });
    }
    else {
        console.log(outputtext);
    }

} catch (err) {
    console.log(err);
}

