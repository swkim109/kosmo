# Geth initialization

$DATADIR = "$env:USERPROFILE\edu"
$SRC = "$env:USERPROFILE\kosmo\docker"

New-Item -Path "~" -Name "edu" -ItemType "directory" -Force

geth --datadir=$DATADIR --nousb init $SRC\genesis.json

