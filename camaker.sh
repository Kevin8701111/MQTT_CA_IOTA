#!/bin/bash

IP="192.168.0.119"
SUBJECT_CA="/C=TW/ST=NCHU.TWISC/L=Taichung/O=2111/OU=CA/CN=$IP"

function generate_CA{
   echo "$SUBJECT_CA"
   openssl req -x509 -nodes -sha256 -newkey rsa:2048 -subj "$SUBJECT_CA"  -days 365 -keyout ca.key -out ca.crt
}

generate_CA
