mosquitto_sub -h 192.168.0.XXX -p 8883 -t "kk/123" --cafile ca.crt --cert server.crt --key server.key -d --tls-version tlsv1.2
