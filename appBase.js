 /*---------------------------------------------------------*/
   2: /* The routing strategy */
   3: (function (app, $) {
   4:     var st = {
   5:         strategies: {
   6:             mvc: {
   7:                 defaultController: 'home',
   8:                 defaultAction: 'index',
   9:                 controller: function controllerFromUrl() {
  10:                     // match urls in the form ../controllerName/actionName or ../controllerName
  11:                     var ctl = document.location.href.match(/http[s]?:\/\/[\w\:\.\-\d]+\/([\w\d\-]+)[\/|$]/i);
  12:                     return ctl ? ctl[1].toLowerCase() : this.defaultController;
  13:                 },
  14:                 action: function actionFromUrl() {
  15:                     // match urls in the form ../controllerName/actionName or ../controllerName
  16:                     var act = document.location.href.match(/http[s]?:\/\/[\w\:\.\-\d]+\/[\w\d\-]+\/([\w\d\-]+)/i);
  17:                     return act ? act[1].toLowerCase() : this.defaultAction;
  18:                 }
  19:             }
  20:         }
  21:     };
  22:  
  23:     window.myApplication = $.extend(app, st);
  24: })(window.myApplication || {}, jQuery);
  25:  
  26:  
  27:  
  28: /*--------------------------------------------*/
  29: /* The basic routing object */
  30:  
  31: (function (app, $) {
  32:     var opts = {
  33:         routingStrategy: app.strategies.mvc
  34:     };
  35:  
  36:     var theApp = {
  37:         activeController: undefined,
  38:         controllers: {},
  39:         run: function () {
  40:             this.initController();
  41:             this.initAction();
  42:         },
  43:         initController: function () {
  44:             var activeControllerName =  opts.routingStrategy.controller(); /*getCurrentControllerName*/
  45:             if (activeControllerName && this.controllers[activeControllerName]) {
  46:                 this.activeController = new this.controllers[activeControllerName]();
  47:                 this.activeController.init();
  48:             }
  49:         },
  50:         initAction: function () {
  51:             var activeActionName = opts.routingStrategy.action(); /*getCurrentActionName*/
  52:             if (activeActionName && this.activeController && this.activeController[activeActionName]) {
  53:                  this.activeController[activeActionName]();
  54:             }
  55:         }
  56:     };
  57:  
  58:     /* pusblish the routing object */
  59:     window.myApplication = $.extend(app, theApp);
  60:  
  61: })(window.myApplication || {}, jQuery);
  62:  
  63:  
  64: $(function () {
  65:     myApplication.run();
  66: });