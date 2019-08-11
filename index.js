const net = require('net');

const TCP_PORT = 4100;


function TCP_Client(mobileID, mainDelay, messageDelay) {
    const client = new net.Socket();
    const REV = `>REV111615353447+3570173+1397742703203012;ID=${mobileID}<\r\n`;
    const REV_EXT = `>REV021615353839+3570173+1397742703203212;BL=4094;AL=+11;ID=${mobileID}<\r\n`;
    const KEEP_ALIVE = `${mobileID}`;
    const REV_DUE = `>RXAIT2000EV000000000000+0000000+0000000000000000;ID=${mobileID}<\r\n>REV021614368501+0466444-0740393800000011;VO=0;BL=4059;DOP=-,-,-;AL=-9999;ID=${mobileID}<\r\n`;
    const mainTimerStart = setTimeout(() => {
        client.connect(TCP_PORT, '127.0.0.1', function () {
            // console.log('Connected');
            client.write(REV);
            setInterval(() => {
                const timeIndex = new Date().getTime().toString()[12];
                switch (timeIndex) {
                    case '0':
                    case '1':
                        client.write(REV_EXT);
                        break;
                    case '2':
                    case '3':
                        client.write(KEEP_ALIVE);
                        break;
                    case '6':
                    case '7':
                        client.write(REV_DUE);
                        break;

                    default:
                        client.write(REV);
                        break;
                }
            }, messageDelay);
        });
    }, mainDelay);

    client.on('data', function (data) {
        console.log('Received: ' + data);
        //client.destroy(); // kill client after server's response
    });

    client.on('close', function () {
        console.log('Connection closed');
    });
}

for (let index = 356612020083540; index < 356612020083540 + 10000; index++) {

    var minServer = 5 * 1000;
    var maxServer = 30 * 1000;

    var minMessage = 30 * 1000;
    var maxMessage = 90 * 1000;

    var randomTimeServer = Math.floor(Math.random() * (+maxServer - +minServer)) + +minServer;
    var randomTimeMessage = Math.floor(Math.random() * (+maxMessage - +minMessage)) + +minMessage;
    new TCP_Client(index, randomTimeServer, randomTimeMessage);

    console.log(index);
};
