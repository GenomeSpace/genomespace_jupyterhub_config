#!/bin/sh
set -e

notebook_arg=""
if [ -n "${NOTEBOOK_DIR:+x}" ]
then
    notebook_arg="--notebook-dir=${NOTEBOOK_DIR}"
fi


PYTHONPATH=$GS_NOTEBOOK_EXTENSION_DIR:$GS_HUB_EXTENSION_DIR
export PYTHONPATH

export PATH=$PATH:$GS_HUB_EXTENSION_DIR



jupyter nbextension enable --py --sys-prefix widgetsnbextension
jupyter serverextension enable --py genomespace
jupyter nbextension  install  --py genomespace --user --symlink
jupyter nbextension  enable  --py genomespace


cd $GS_HUB_EXTENSION_DIR
jupyter nbextension install gshub_notebook_initializer --user --symlink
jupyter nbextension enable gshub_notebook_initializer/main --user
cd /home/jovyan/work



exec jupyterhub-singleuser \
  --port=8888 \
  --ip=0.0.0.0 \
  --user=$JPY_USER \
  --cookie-name=$JPY_COOKIE_NAME \
  --base-url=$JPY_BASE_URL \
  --hub-prefix=$JPY_HUB_PREFIX \
  --hub-api-url=$JPY_HUB_API_URL \
  ${notebook_arg} \
  $@
