#!/bin/bash
export JPY_API_TOKEN=`jupyterhub token ted2`
python3 cull_idle_servers.py

