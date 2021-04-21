#!/bin/bash

function copy_keys_to_broker{
   sudo cp ca.crt /etc/mosquitto/certs/
   sudo cp server.crt /etc/mosquitto/certs/
   sudo cp server.key /etc/mosquitto/certs/
}

copy_keys_to_broker

