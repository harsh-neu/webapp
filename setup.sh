#! /bin/bash
echo "in setup"
sudo yum install -y mysql-server
sudo systemctl start mysqld
sudo systemctl enable mysqld

sudo mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Chocoslam'";
sudo mysql -u root -p Chocoslam -e "FLUSH PRIVILEGES";
echo "create db"
sudo systemctl restart mysqld
sudo mysql -u root -p Chocoslam -e "CREATE DATABASE demoDb;"
echo "create users"
sudo groupadd csye6225
sudo useradd -M -s /usr/sbin/nologin -g csye6225 csye6225
id csye6225
echo "install node"
sudo dnf module -y enable nodejs:20
sudo dnf module -y install nodejs:20/common
sudo dnf -y install unzip
echo "change ownership"

sudo chown -R "csye6225:csye6225"  "/opt"
ls -l /tmp
sudo unzip "/tmp/webapp.zip" -d  "/opt/"
ls -l "/opt"
cd /opt/webapp
sudo npm install

# googlecompute.csye6225-custom-image: Created symlink /etc/systemd/system/multi-user.target.wants/mysqld.service → /usr/lib/systemd/system/mysqld.service.
# ==> googlecompute.csye6225-custom-image: ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: NO)
# ==> googlecompute.csye6225-custom-image: mysql: [Warning] Using a password on the command line interface can be insecure.
# ==> googlecompute.csye6225-custom-image: ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: NO)
#     googlecompute.csye6225-custom-image: Last metadata expiration check: 0:05:16 ago on
