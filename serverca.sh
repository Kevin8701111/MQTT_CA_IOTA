#!/bin/bash
IP="192.168.0.119"
SUBJECT_SERVER="/C=TW/ST=NCHU.TWISC/L=Taichung/O=2111/OU=Server/CN=$IP"

function generate_server{
   echo "$SUBJECT_SERVER"
   openssl req -nodes -sha256 -new -subj "$SUBJECT_SERVER" -keyout server.key -out server.csr
}

generate_server

