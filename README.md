jqRoute is a simple way to organize your javascript code in a web application
=============================================================================

jqRoute tries to solve the problem of having your javascript code scatter all over the place and having to always write stuff like $(document).ready(...). It relies on nameing convensions to match your object/method to call for each route on your web application.

How to install it?
------------------
Just drop the .js file in your application and start using it


How to use it?
--------------
The basic routing object simply maps the URL to a method on an object. So for example if you have a page:

    http://www.somedomain.com/myController/index

this will map to a call to:

myApplication.controllers.myController.index()

You will just need to create an object like:

    myApplication.controllers.myController = {
        init: function() { 
            // controller initialization code
        },
        index: function() {
            // anything that you want to do to init the index action
        }
    };

That's it

Have fun!