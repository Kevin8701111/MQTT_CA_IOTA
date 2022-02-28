# MQTT_CA_IOTA

## 更改bash
###### IP="ca_IP" 改為自己CA Server的IP
```bash=
#!/bin/bash

IP="ca_IP"
SUBJECT_CA="/C=SE/ST=Stockholm/L=Stockholm/O=himinds/OU=CA/CN=$IP"

function generate_CA{
   echo "$SUBJECT_CA"
   openssl req -x509 -nodes -sha256 -newkey rsa:2048 -subj "$SUBJECT_CA"  -days 365 -keyout ca.key -out ca.crt
}

generate_CA
```

## 其他晚點再寫先筆記
### CA
- camaker.sh - git clone 或是 copy
```bash=
sudo nano camaker.sh # 更改成自己IP
sh camaker.sh # 生成ca.crt  ca.key  ca.srl
```

### Server
- serverca.sh - git clone 或是 copy
- ca.crt - 透過scp
- ca.key - 透過scp
```bash=
openssl
OpenSSL> version #確認版本1.1.1

scp User@IP:/home/某資料夾/ca.* ./
sudo apt install mosquitto
sudo apt install mosquitto-clients
sudo nano serverca.sh #改成ServerIP
sh serverca.sh # 有錯誤沒差 , 確認生成 server.crt  server.csr  server.key
cp server.* /etc/mosquitto/certs/
sudo nano /etc/mosquitto/mosquitto.conf # 貼上下面的setting
#require_certificate true 
#use_identity_as_username true 
#以上2個參數為開啟雙向認證
"""
# Place your local configuration in /etc/mosquitto/conf.d/
#
# A full description of the configuration file is at
# /usr/share/doc/mosquitto/examples/mosquitto.conf.example

pid_file /var/run/mosquitto.pid

persistence true
persistence_location /var/lib/mosquitto/

log_dest file /var/log/mosquitto/mosquitto.log

include_dir /etc/mosquitto/conf.d

listener 8883
cafile /etc/mosquitto/certs/ca.crt
certfile /etc/mosquitto/certs/server.crt
keyfile /etc/mosquitto/certs/server.key
require_certificate true
use_identity_as_username true

##other
listener 8883
protocol mqtt
log_type all
connection_messages true
log_timestamp true
tls_version tlsv1.3
#ciphers_tls1.3 TLS_CHACHA20_POLY1305_SHA256:TLS_AES_256_GCM_SHA384
cafile /etc/mosquitto/certs/ca.crt
certfile /etc/mosquitto/certs/server.crt
keyfile /etc/mosquitto/certs/server.key
require_certificate true
use_identity_as_username true

"""
#待Client開啟sub
cd 到剛剛跑sh的目錄(不可以是/etc/mosquitto/certs/裡面的)
mosquitto_pub -h 192.168.0.119 -p 8883 -t "kk/123" --cafile ca.crt --cert server.crt --key server.key -m '2134'
```

### Client
- clientca.sh - git clone 或是 copy
- ca.crt - 透過scp
- ca.key - 透過scp
```bash=
openssl
OpenSSL> version #確認版本1.1.1

scp User@IP:/home/某資料夾/ca.* ./
sudo apt install mosquitto-clients
sudo nano clientca.sh #改ClientIP
sh clientca.sh # 有錯誤沒差 , 確認生成 client.crt  client.csr  client.key
mosquitto_sub -h 192.168.0.119 -p 8883 -t "kk/123" --cafile ca.crt --cert client.crt --key client.key
```

## ubuntu16.04
### openssl1.1.1
- openssl-1.1.1.tar.gz # git clone
```bash=
tar -zxf openssl-1.1.1.tar.gz
cd openssl-1.1.1.tar.gz
./config
make install
mv 'which openssl' /tmp
ln -s /usr/local/bin/openssl /usr/bin/openssl
cd /usr/local/src
cp libssl.so.1.1 /lib/x86_64-linux-gnu
cp libcrypto.so.1.1 /lib/x86_64-linux-gnu
openssl version

export LD_LIBRARY_PATH=/usr/local/lib/ #寫在.bashrc

```
