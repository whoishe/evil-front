//= evil-front/jquery

// Change selected form to be sent by AJAX.
//
//   $('form').evil.ajax
//     success:      -> message('success')
//     error: (text) -> message('error' + text)
//
// While AJAX is loading, form will has `is-submiting` class.
// Don’t forget to show loader.
evil.$.extend('ajax', function (opts) {
    if ( !opts ) {
        opts = { };
    }

    this.submit(function () {
        var form = $(this);

        if ( form.hasClass('is-submiting') ) {
            return false;
        }
        form.addClass('is-submiting');

        $.ajax({
            url:  form.attr('action'),
            type: form.attr('method').toUpperCase(),
            data: form.serialize(),
            success: function () {
                if ( opts.success ) {
                    opts.success(form);
                }
            },
            error: function (e) {
                if ( e.status != 500 && opts.error ) {
                    opts.error(e.responseText, form);
                }
            },
            complete: function () {
                form.removeClass('is-submiting');
            }
        });

        return false;
    });
});