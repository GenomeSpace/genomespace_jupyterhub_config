# Build as jupyterhub/singleuser
# Run with the DockerSpawner in JupyterHub

FROM jupyter/scipy-notebook:a249876881d3

MAINTAINER Project Jupyter <jupyter@googlegroups.com>

EXPOSE 8888

ENV GS_CODE_ROOT_DIR /combined
ENV GS_NOTEBOOK_EXTENSION_DIR ${GS_CODE_ROOT_DIR}/jupyter-notebook/profile/extensions

#We will load our jupyter-hub specific extensions from here
ENV GS_HUB_EXTENSION_DIR /jupyter-hub-extensions


VOLUME ${GS_CODE_ROOT_DIR}
VOLUME ${GS_HUB_EXTENSION_DIR}

USER root
# fetch juptyerhub-singleuser entrypoint
#RUN wget --no-check-certificate https://raw.githubusercontent.com/jupyterhub/jupyterhub/0.6.1/scripts/jupyterhub-singleuser -O /usr/local/bin/jupyterhub-singleuser 
#RUN sudo apt-get install curl
#RUN curl https://raw.githubusercontent.com/jupyterhub/jupyterhub/0.6.1/scripts/jupyterhub-singleuser > /usr/local/bin/jupyterhub-singleuser
COPY su.py /usr/local/bin/jupyterhub-singleuser
RUN chmod 755 /usr/local/bin/jupyterhub-singleuser


ADD singleuser.sh /srv/singleuser/singleuser.sh
USER jovyan
# smoke test that it's importable at least
#RUN sh /srv/singleuser/singleuser.sh -h
CMD ["sh", "/srv/singleuser/singleuser.sh"]
