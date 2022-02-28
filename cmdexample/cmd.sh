
mosquitto_sub -h 192.168.0.XXX -p 8883 -t "kk/123" --cafile ca.crt --cert server.crt --key server.key -d --tls-version tlsv1.2
mosquitto_pub -h 192.168.0.XXX -p 8883 -t "kk/123" --cafile ca.crt --cert client.crt --key client.key -d --tls-version tlsv1.2 -m "efefefefd"
