# Setting up your Raspberry Pi

* [Installing Raspbian](#installing-rasbian)
* [Configuring for Wifi and SSH](#setting-up-wifi-and-ssh)
* [SSHing in and getting started](#sshing-in-and-getting-started)
* [Installing cloudflared](#installing-cloudflared)
* [Cloning the raspi example code](#cloning-the-raspi-example-code)
* [Running the raspi code](#running-the-raspi-code)

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


