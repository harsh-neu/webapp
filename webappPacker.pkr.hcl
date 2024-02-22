packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = " >= 1.0.0 "
    }
  }
}
#TODO:centOs needs kickstart
# disk_size = "100"
# disk_type = "balanced"
# TODO: change project name in terraform file

source "googlecompute" "csye6225-custom-image" {
  project_id              = "webapp-dev-415002"
  source_image_family     = "centos-stream-8"
  zone                    = "us-central1-a"
  disk_size               = 100
  disk_type               = "pd-standard"
  image_name              = "csye6225-{{timestamp}}"
  image_description       = " Image created from csye6225-{{timestamp}}."
  image_family            = "csye6225-custom-image"
  image_project_id        = "webapp-dev-415002"
  image_storage_locations = ["us"]
  ssh_username            = "packer"
  # network = "projects/cloud-terraform-414222/global/networks/YOUR_NETWORK_NAME"
}

build {

  sources = [
    "sources.googlecompute.csye6225-custom-image",
  ]

  provisioner "file" {
    source      = "./webapp.zip"
    destination = "/tmp/"
  }
  provisioner "shell" {
    scripts = ["setup.sh","systemd.sh",]
  }
}
