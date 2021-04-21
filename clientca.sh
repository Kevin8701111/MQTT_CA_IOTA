#!/bin/bash

IP="client_IP"
SUBJECT_CLIENT="/C=SE/ST=Stockholm/L=Stockholm/O=himinds/OU=Client/CN=$IP"

function generate_client{
   echo "$SUBJECT_CLIENT"
   openssl req -new -nodes -sha256 -subj "$SUBJECT_CLIENT" -out client.csr -keyout client.key
   openssl x509 -req -sha256 -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out client.crt -days 365
}

generate_client
