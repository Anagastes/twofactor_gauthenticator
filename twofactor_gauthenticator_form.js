if (window.rcmail) {
  rcmail.addEventListener('init', function() {
	// remove the user/password/... input from login
    $('form > table > tbody > tr').each(function(){
    	$(this).remove();
    });
	
    // change task & action
    $('form').attr('action', './');
    $('input[name=_task]').attr('value', 'mail');
    $('input[name=_action]').attr('value', '');

	//determine twofactor field type based on config settings
	if(rcmail.env.twofactor_formfield_as_password)
		var twoFactorCodeFieldType = 'password';
	else
		var twoFactorCodeFieldType = 'text';
	
	//twofactor input form
    var text = '';
    text += '<tr>';
    text += '<td class="title"><label for="2FA_code"><strong>'+rcmail.gettext('two_step_verification_form', 'twofactor_gauthenticator')+'</strong></label></td>';
    text += '<td class="input"><input class="form-control" name="_code_2FA" id="2FA_code" size="10" maxlength="6" autocapitalize="off" autocomplete="off" type="' + twoFactorCodeFieldType + '" maxlength="10"></td>';
    text += '</tr>';

    // remember option
    if(rcmail.env.allow_save_device_30days){
		text += '<tr>';
		text += '<td class="title" colspan="2"><br /><label for="remember_2FA"><input type="checkbox" id="remember_2FA" name="_remember_2FA" value="yes" /> '+rcmail.gettext('dont_ask_me_30days', 'twofactor_gauthenticator')+'</label><hr /></td>';
		text += '</tr>';
	} else {
        text += '<tr>';
        text += '<td class="title" colspan="2"><hr /></td>';
        text += '</tr>';
    }

    // create textbox
    $('form > table > tbody:last').append(text);
    $('#rcmloginsubmit').html('Proceed');

    // focus
    $('#2FA_code').focus();
    
  });

};
