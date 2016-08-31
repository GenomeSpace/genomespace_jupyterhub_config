
#
# if you can't connect after a restart you may need to re-run this
#
#  sudo iptables -t nat -A PREROUTING -p tcp --dport 443 -j REDIRECT --to 8443


#/usr/bin/sh
nohup jupyterhub -f ./jupyterhub_config.py &

