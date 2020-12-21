# Geth Boot RUN

# nodekeyhex
# aed0c09fe4fefb93c1e0032ae334721a0101a3aeedfe07048c2fbb048d6cf2a8

# enode URL for members
# enode://1894cb1b12732910aa07265da92f869ecddc3f97efb126fd316b154c840522bcead155a49d43099ef330de48c8fdc2a9b45edee7c144f6e36c3876011ef7e3cd@192.168.0.10:30301

$NODE_IP = "extip:192.168.0.10"
$NET_MASK = "192.168.0.0/24"

bootnode -nodekeyhex "aed0c09fe4fefb93c1e0032ae334721a0101a3aeedfe07048c2fbb048d6cf2a8" -verbosity 5 -nat $NODE_IP -netrestrict $NET_MASK

