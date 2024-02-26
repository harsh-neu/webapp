variable "project_id" {
  description = "The ID of the Google Cloud project"
  default     = "webapp-develop-415501"
}

variable "source_image_family" {
  description = "The family of the source image to use for building the custom image"
  default     = "centos-stream-8"
}

variable "zone" {
  description = "The zone in which to build the image"
  default     = "us-central1-a"
}

variable "disk_size" {
  description = "The size of the disk in GB"
  default     = 100
}

variable "disk_type" {
  description = "The type of disk to use"
  default     = "pd-standard"
}

variable "image_name" {
  description = "The name to assign to the custom image"
  default     = "csye6225-{{timestamp}}"
}

variable "image_description" {
  description = "The description for the custom image"
  default     = "Image created from csye6225-{{timestamp}}"
}

variable "image_family" {
  description = "The family name for the custom image"
  default     = "csye6225-custom-image"
}

variable "image_project_id" {
  description = "The ID of the project where the custom image will be stored"
  default     = "webapp-develop-415501"
}

variable "image_storage_locations" {
  description = "The storage locations for the custom image"
  default     = ["us"]
}

variable "ssh_username" {
  description = "The username for SSH access"
  default     = "packer"
}
packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = ">= 1.1.3"
    }
  }
}

source "googlecompute" "csye6225-custom-image" {
  project_id              = var.project_id
  source_image_family     = var.source_image_family
  zone                    = var.zone
  disk_size               = var.disk_size
  disk_type               = var.disk_type
  image_name              = var.image_name
  image_description       = var.image_description
  image_family            = var.image_family
  image_project_id        = var.image_project_id
  image_storage_locations = var.image_storage_locations
  ssh_username            = var.ssh_username


build {
  sources = [
    "sources.googlecompute.csye6225-custom-image",
  ]

  provisioner "file" {
    source      = "./webapp.zip"
    destination = "/tmp/"
  }

  provisioner "shell" {
    scripts = ["setup.sh", "systemd.sh"]
  }
}
