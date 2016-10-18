// file my_extension/main.js

define([
    'base/js/namespace',
    'jquery',
    'require',
    'base/js/events',
], function(
    Jupyter, $, require,  events
) {
    function load_ipython_extension() {
        $([Jupyter.events]).on('kernel_ready.Kernel kernel_created.Session notebook_loaded.Notebook',  function(){
              //console.log('NOTEBOOK LOADING  complete')
              //alert('Done - notebook loaded');
              
              // logic to use for gs hub
              // look at notebook length, if #cells = 1 
              //    
              //      then look at first cell for GS login
              //      IF MISSING ADD A NEW CELL AT THE START WITH THE GS LOGIN AND PRE-
              //	  fill it with username (from hub) and token
              //  if  #cells > 1, look for one with the gsauth in the list
              //  and update the username (prompt user to accept change) 
              //
              // also look only at the end of the cell code since if its not at the end it won't show the widget
              
              
              if (Jupyter.notebook.ncells() == 1){
                	var cell = Jupyter.notebook.get_cell(0);
                	
                	
                	
                	
              
             	 	var firstCellText = cell.code_mirror.getValue();
              		if (!(firstCellText.trim().endsWith("GSAuthWidget()")   )){
              			var newCell = Jupyter.notebook.insert_cell_above();
              			var authSource="# !AUTOEXEC\n"+
              				"%reload_ext genomespace\n"+  
								"try:\n"+ 
							"    from genomespace import GSAuthWidget\n"+
							"except:\n"+
							"    def GSAuthWidget():\n"+
							"        print('GenomeSpace notebook extension not installed')\n"+
							"# Return the authentication widget to view it\n"+
							"GSAuthWidget()";		
              			 			
              			newCell.code_mirror.setValue(authSource);
              	}
              
              }
              
              $.ajaxSetup({
				xhrFields: {
        		    withCredentials: true
    		    },
			 	beforeSend: function(xhr){
        			 xhr.setRequestHeader("gs-toolname", 'Jupyter');
        		},
        		mozBackgroundRequest: true,
     		    crossDomain: true
			});
            
          
			  // try to connect to GenomeSpace to identify the user and get the 
            // gs-token in order to pre-initialize and login the GSAuthWidget
            setTimeout(function (){
            $.ajax({
					url: 'https://identity.genomespace.org/identityServer/selfmanagement/user',
					type: 'get',
					context: document.body,
					dataType: 'json',
					success: function(data) {
						// if there are any GSAuthWidgets in the notebook lets see if we
						// need to update the usernames
						var userMismatch = false;
						var existingGSUserInputs = $(".gp-widget-auth-form input[name='username']");
						$.each(existingGSUserInputs, function(idx, input){
							var oldUser = $(input).val();
							if (oldUser != data.username){
								userMismatch = true;
							}					
						});
						if (userMismatch){
							var updateUser = confirm("Update all GS Auth dialogs to user '"+data.username + "'?");
							if (updateUser){
								$(".gp-widget-auth-form input[name='username']").val(data.username);
							}
						}
						
						
            
					},
					error: function(){
						// not yet signed into GenomeSpace
						// do nothing for now
						console.log("GenomeSpace - not logged in");
					}
				})
              
            }, 5000);
              
              
        });
        events.on('create.Cell',function() {
        	//alert('Created a cell');
        });
        
        console.log('init complete $ is ' + $);
        //console.log('init complete require is ' + require);
        console.log('init complete events is ' + events);
         
    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});

