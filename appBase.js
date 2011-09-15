 /*---------------------------------------------------------*/
 /* The routing strategy */
 (function (app, $) {
     var st = {
         strategies: {
             mvc: {
                 defaultController: 'home',
                 defaultAction: 'index',
                 controller: function controllerFromUrl() {
                     // match urls in the form ../controllerName/actionName or ../controllerName
                     var ctl = document.location.href.match(/http[s]?:\/\/[\w\:\.\-\d]+\/([\w\d\-]+)[\/|$]?/i);
                     return ctl ? ctl[1].toLowerCase() : this.defaultController;
                 },
                 action: function actionFromUrl() {
                     // match urls in the form ../controllerName/actionName or ../controllerName
                     var act = document.location.href.match(/http[s]?:\/\/[\w\:\.\-\d]+\/[\w\d\-]+\/([\w\d\-]+)/i);
                     return act ? act[1].toLowerCase() : this.defaultAction;
                 }
             }
         }
     };
  
     window.myApplication = $.extend(app, st);
 })(window.myApplication || {}, jQuery);
  
  
  
 /*--------------------------------------------*/
 /* The basic routing object */
  
 (function (app, $) {
     var opts = {
         routingStrategy: app.strategies.mvc
     };
  
     var theApp = {
         activeController: undefined,
         controllers: {},
         run: function () {
             this.initController();
             this.initAction();
         },
         initController: function () {
             var activeControllerName =  opts.routingStrategy.controller(); /*getCurrentControllerName*/
             if (activeControllerName && this.controllers[activeControllerName]) {
                 this.activeController = new this.controllers[activeControllerName]();
                 this.activeController.init();
             }
         },
         initAction: function () {
             var activeActionName = opts.routingStrategy.action(); /*getCurrentActionName*/
             if (activeActionName && this.activeController && this.activeController[activeActionName]) {
                  this.activeController[activeActionName]();
             }
         }
     };
  
     /* pusblish the routing object */
     window.myApplication = $.extend(app, theApp);
  
 })(window.myApplication || {}, jQuery);
  
  
 $(function () {
     myApplication.run();
 });