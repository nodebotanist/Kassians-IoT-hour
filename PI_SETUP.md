# Setting up your Raspberry Pi

* [Installing Raspbian](#installing-rasbian)
* [Configuring for Wifi and SSH](#setting-up-wifi-and-ssh)
* [SSHing in and getting started](#sshing-in-and-getting-started)
* [Installing cloudflared](#installing-cloudflared)

## Installing Raspbian

You'll need:

* An SD micro card with > 8GB storage space
* a card reader for your computer
* [Balena Etcher]() or some other way to burn the Raspbian ISO
* [the Raspbian Buster .zip archive]()

1. Download the Raspbian Buster Lite image at the link above
1. Download Balena Etcher at the link above
1. Insert your microSD card into your computer, using an adapter if needed
1. Run Balena Etcher. Select the Raspbian Buster .zip as the image, the SD card as the storage, hit flash
1. Once Balena Etcher has finished, remove and re-insert the microSD card into your computer

## Setting up WiFi and SSH

1. Add a file to the microSD card named `SSH` with no extension
1. Add a file to the microSD card named `wpa_supplicant.conf` with the following, substituting your WiFi and country code:

```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=<Insert 2 letter ISO 3166-1 country code here>

network={
 ssid="<Name of your wireless LAN>"
 psk="<Password for your wireless LAN>"
}
```

1. Remove the microSD card from your computer, put it in the Raspberry Pi, and power up the Pi

## SSHing in and getting started

1. `ssh pi@raspberrypi.local`
1. password is `raspberry`
1. run `passwd` to change the password
1. run `sudo apt-get update` then `sudo apt-get upgrade`
1. Install Node.JS [from the nodesource maintained binaries](https://github.com/nodesource/distributions): `curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash` followed by `sudo apt-get install -y nodejs`
1. Update npm to the latest version: `sudo npm i -g npm`
1. Change npm's working directory using [these instructions](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)
1. Install some dev dependencies: `npm i -g forever nodemon`

## Installing `cloudflared` daemon

1. [get the ARM build of `cloudflared`](https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-arm.tgz): `wget https://bin.equinox.io/c/VdrWdbjqyF/cloudflared-stable-linux-arm.tgz`
1. Untar it into a new directory: `mkdir argo-tunnel && tar -xvzf cloudflared-stable-linux-arm.tgz -C ./argo-tunnel && cd argo-tunnel`
1. Check that it can be executed: `./cloudflared --version` should print a version number
1. Login: 
	1. `./cloudflared login` will produce a URL-- copy this URL to your host computer, log in, and choose a domain
	1. This will send a cert to your pi at `~/.cloudflared/cert.pem`
1. Create a config file for your daemon: `sudo nano /etc/cloudflared/config.yml` with the following:
	```
		hostname: iot.yourdomain.com
		url: http://127.0.0.1:8000
	```
1. Install the daemon with systemctl: `sudo ./cloudflared service install`

Next, we'll start [setting up the codebase](./CODEBASE_SETUP.md)