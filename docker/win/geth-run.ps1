# Geth RUN

$DATADIR = "$env:USERPROFILE\edu"
$NODE_IP = "extip:192.168.0.10"
$NET_MASK = "192.168.0.0/24"

geth --networkid 44  --datadir $DATADIR --syncmode "full" --nousb --rpc --rpcaddr 0.0.0.0 --rpccorsdomain "*" --ws --wsaddr 0.0.0.0 --wsorigins "*" --allow-insecure-unlock --nat $NODE_IP --netrestrict $NET_MASK

