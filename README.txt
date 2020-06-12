INIT SERVER.JSON
yarn json-server server.json -d 1000 -w

CONFIGURE PORTS OF SERVER
adb reverse tcp:3000 tcp:3000