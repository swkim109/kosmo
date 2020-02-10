# Geth RUN

$DATADIR = "$env:USERPROFILE\edu"

geth --networkid 44  --datadir $DATADIR --nousb --rpc --rpcaddr 0.0.0.0 --rpccorsdomain "*" --ws --wsaddr 0.0.0.0 --wsorigins "*" --allow-insecure-unlock

