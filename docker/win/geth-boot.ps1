# Geth Boot RUN

# nodekeyhex
# aed0c09fe4fefb93c1e0032ae334721a0101a3aeedfe07048c2fbb048d6cf2a8

# enode URL
# enode://1894cb1b12732910aa07265da92f869ecddc3f97efb126fd316b154c840522bcead155a49d43099ef330de48c8fdc2a9b45edee7c144f6e36c3876011ef7e3cd@192.168.0.10:30303


$DATADIR = "$env:USERPROFILE\edu"
$NODE_IP = "extip:192.168.0.10"
$NET_MASK = "192.168.0.0/24"

geth --networkid 44  --datadir $DATADIR --syncmode "full" --nodekeyhex "aed0c09fe4fefb93c1e0032ae334721a0101a3aeedfe07048c2fbb048d6cf2a8" --nousb --rpc --rpcaddr 0.0.0.0 --rpccorsdomain "*" --ws --wsaddr 0.0.0.0 --wsorigins "*" --allow-insecure-unlock --nat $NODE_IP --netrestrict $NET_MASK

