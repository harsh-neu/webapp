sudo cp /opt/webapp/setupLogs.yaml /etc/google-cloud-ops-agent/config.yaml
sudo mkdir /var/log/webapp/
sudo systemctl restart google-cloud-ops-agent
sudo chown -R "csye6225:csye6225"  "/var/log/webapp/"
echo "check permissions"
sudo ls -al "/var/log/webapp"
