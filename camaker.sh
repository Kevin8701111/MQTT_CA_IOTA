#!/bin/bash

IP="ca_IP"
SUBJECT_CA="/C=SE/ST=Stockholm/L=Stockholm/O=himinds/OU=CA/CN=$IP"

function generate_CA{
   echo "$SUBJECT_CA"
   openssl req -x509 -nodes -sha256 -newkey rsa:2048 -subj "$SUBJECT_CA"  -days 365 -keyout ca.key -out ca.crt
}

generate_CA
