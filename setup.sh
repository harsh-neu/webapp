#! /bin/bash

mkdir demo
cd demo
sudo yum install -y mysql-server
sudo systemctl start mysqld
sudo systemctl enable mysqld
sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';"
sudo mysql -e "FLUSH PRIVILEGES;"
sudo mysql -u root -proot
sudo mysql -e "Create Database demoDb;"

sudo dnf module -y enable nodejs:20
sudo dnf module -y install nodejs:20/common
sudo dnf -y install unzip
