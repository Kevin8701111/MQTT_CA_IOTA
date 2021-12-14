#!/bin/bash

IP="CAServer IP"
SUBJECT_CA="/C=TW/ST=NCHU.TWISC/L=Taichung/O=2111/OU=CA/CN=$IP"

function generate_CA{
   echo "$SUBJECT_CA"
   openssl req -x509 -nodes -sha256 -newkey rsa:2048 -subj "$SUBJECT_CA"  -days 365 -keyout ca.key -out ca.crt
   openssl x509 -req -sha256 -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt -days 365
   openssl x509 -req -sha256 -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out client.crt -days 365
}

generate_CA
