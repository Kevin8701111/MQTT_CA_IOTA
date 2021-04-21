#!/bin/bash
IP="server_IP"
SUBJECT_SERVER="/C=SE/ST=Stockholm/L=Stockholm/O=himinds/OU=Server/CN=$IP"

function generate_server{
   echo "$SUBJECT_SERVER"
   openssl req -nodes -sha256 -new -subj "$SUBJECT_SERVER" -keyout server.key -out server.csr
   openssl x509 -req -sha256 -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt -days 365
}

generate_server

