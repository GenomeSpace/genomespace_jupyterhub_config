other image customizations in

/usr/local/lib/python3.4/dist-packages/notebook/static/base/images
/usr/local/share/jupyter/hub/static/images
     -replace jupyter.png and jpuyterhub80.png with GenomeSpace logos for top left of pages

and css in 

/usr/local/share/jupyter/hub/static/css/style.min.css
     - add in extra css from file gs-hub-custom.css

within the single user docker image the templates live at
	/opt/conda/pkgs/notebook-4.2.1-py35_0/lib/python3.5/site-packages/notebook/templates

then you need to add the following to have "Logout username" for the logout button
in  /opt/conda/lib/python3.5/site-packages/notebook/static/custom/custom.js

<script>
   var username =  (""+ window.location).split('/')[4];
   $('#logout').html( "Logout " + username)
</script>






