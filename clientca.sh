#!/bin/bash

IP="192.168.0.117"
SUBJECT_CLIENT="/C=TW/ST=NCHU.TWISC/L=Taichung/O=2111/OU=Client/CN=$IP"

function generate_client{
   echo "$SUBJECT_CLIENT"
   openssl req -new -nodes -sha256 -subj "$SUBJECT_CLIENT" -out client.csr -keyout client.key
}

generate_client
