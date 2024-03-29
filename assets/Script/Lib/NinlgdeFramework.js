var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
///<reference path='../../../../../org/puremvc/typescript/multicore/interfaces/INotifier.ts'/>
///<reference path='../../../../../org/puremvc/typescript/multicore/interfaces/INotification.ts'/>
///<reference path='../../../../../org/puremvc/typescript/multicore/interfaces/INotifier.ts'/>
///<reference path='../../../../../org/puremvc/typescript/multicore/interfaces/INotifier.ts'/>
///<reference path='../../../../../org/puremvc/typescript/multicore/interfaces/IProxy.ts'/>
///<reference path='../../../../../org/puremvc/typescript/multicore/interfaces/IMediator.ts'/>
///<reference path='../../../../../org/puremvc/typescript/multicore/interfaces/INotification.ts'/>
///<reference path='../../../../../org/puremvc/typescript/multicore/interfaces/IProxy.ts'/>
///<reference path='../../../../../org/puremvc/typescript/multicore/interfaces/INotification.ts'/>
///<reference path='../../../../../org/puremvc/typescript/multicore/interfaces/IObserver.ts'/>
///<reference path='../../../../../org/puremvc/typescript/multicore/interfaces/IMediator.ts'/>
///<reference path='../../../../../org/puremvc/typescript/multicore/interfaces/INotification.ts'/>
///<reference path='../../../../../org/puremvc/typescript/multicore/interfaces/INotification.ts'/>
///<reference path='../../../../../org/puremvc/typescript/multicore/interfaces/INotification.ts'/>
///<reference path='../../../../../org/puremvc/typescript/multicore/interfaces/INotifier.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/INotification.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/IObserver.ts'/>
var puremvc;
(function (puremvc) {
    "use strict";
    /**
     * A base <code>IObserver</code> implementation.
     *
     * In PureMVC, the <code>Observer</code> class assumes these responsibilities:
     * <UL>
     * <LI>Encapsulate the notification (callback) method of the interested object.
     * <LI>Encapsulate the notification context (this) of the interested object.
     * <LI>Provide methods for setting the interested object notification method and context.
     * <LI>Provide a method for notifying the interested object.
     *
     * PureMVC does not rely upon underlying event models such as the one provided in JavaScript DOM API,
     * and TypeScript does not have an inherent event model.
     *
     * The Observer Pattern as implemented within PureMVC exists to support event driven
     * communication between the application and the actors of the MVC triad (Model, View, Controller).
     *
     * An Observer is an object that encapsulates information about an interested object with a
     * notification method that should be called when an </code>INotification</code> is broadcast.
     * The Observer then acts as a proxy for notifying the interested object.
     *
     * Observers can receive <code>Notification</code>s by having their <code>notifyObserver</code>
     * method invoked, passing in an object implementing the <code>INotification</code> interface,
     * such as a subclass of <code>Notification</code>.
     */
    var Observer = /** @class */ (function () {
        /**
         * Constructs an <code>Observer</code> instance.
         *
         * @param notifyMethod
         * 		The notification method of the interested object.
         *
         * @param notifyContext
         * 		The notification context of the interested object.
         */
        function Observer(notifyMethod, notifyContext) {
            /**
             * The notification method of the interested object.
             */
            this.notify = null;
            /**
             * The notification context of the interested object.
             */
            this.context = null;
            this.setNotifyMethod(notifyMethod);
            this.setNotifyContext(notifyContext);
        }
        /**
         * Get the notification method.
         *
         * @return
         * 		The notification (callback) method of the interested object.
         */
        Observer.prototype.getNotifyMethod = function () {
            return this.notify;
        };
        /**
         * Set the notification method.
         *
         * The notification method should take one parameter of type <code>INotification</code>.
         *
         * @param notifyMethod
         * 		The notification (callback) method of the interested object.
         */
        Observer.prototype.setNotifyMethod = function (notifyMethod) {
            this.notify = notifyMethod;
        };
        /**
         * Get the notification context.
         *
         * @return
         * 		The notification context (<code>this</code>) of the interested object.
         */
        Observer.prototype.getNotifyContext = function () {
            return this.context;
        };
        /**
         * Set the notification context.
         *
         * @param notifyContext
         * 		The notification context (this) of the interested object.
         */
        Observer.prototype.setNotifyContext = function (notifyContext) {
            this.context = notifyContext;
        };
        /**
         * Notify the interested object.
         *
         * @param notification
         * 		The <code>INotification</code> to pass to the interested object's notification
         * 		method.
         */
        Observer.prototype.notifyObserver = function (notification) {
            this.getNotifyMethod().call(this.getNotifyContext(), notification);
        };
        /**
         * Compare an object to the notification context.
         *
         * @param object
         * 		The object to compare.
         *
         * @return
         * 		The object and the notification context are the same.
         */
        Observer.prototype.compareNotifyContext = function (object) {
            return object === this.context;
        };
        return Observer;
    }());
    puremvc.Observer = Observer;
})(puremvc || (puremvc = {}));
///<reference path='../../../../../org/puremvc/typescript/multicore/interfaces/IView.ts'/>
///<reference path='../../../../../org/puremvc/typescript/multicore/interfaces/IObserver.ts'/>
///<reference path='../../../../../org/puremvc/typescript/multicore/interfaces/INotification.ts'/>
///<reference path='../../../../../org/puremvc/typescript/multicore/interfaces/IMediator.ts'/>
var puremvc;
(function (puremvc) {
    "use strict";
    /**
     * The <code>View</code> class for PureMVC.
     *
     * A multiton <code>IView</code> implementation.
     *
     * In PureMVC, the <code>View</code> class assumes these responsibilities:
     * <UL>
     * <LI>Maintain a cache of <code>IMediator</code> instances.
     * <LI>Provide methods for registering, retrieving, and removing <code>IMediator</code>s.
     * <LI>Notifiying <code>IMediator</code>s when they are registered or removed.
     * <LI>Managing the <code>Observer</code> lists for each <code>INotification</code> in the
     * application.
     * <LI>Providing a method for attaching <code>IObservers</code> to an
     * <code>INotification</code>'s <code>Observer</code> list.
     * <LI>Providing a method for broadcasting an <code>INotification</code>.
     * <LI>Notifying the <code>IObserver</code>s of a given <code>INotification</code> when it
     * broadcasts.
     */
    var View = /** @class */ (function () {
        /**
         * This <code>IView</code> implementation is a multiton, so you should not call the
         * constructor directly, but instead call the static multiton Factory method
         * <code>View.getInstance( key )</code>.
         *
         * @param key
         *		Multiton key for this instance of <code>View</code>.
         *
         * @throws Error
         *		Throws an error if an instance for this multiton key has already been constructed.
         */
        function View(key) {
            /**
             * Mapping of <code>Mediator</code> names to <code>Mediator</code> instances.
             *
             * @protected
             */
            this.mediatorMap = null;
            /**
             * Mapping of <code>Notification</code> names to <code>Observers</code> lists.
             *
             * @protected
             */
            this.observerMap = null;
            /**
             * Multiton key for this <code>View</code> instance.
             *
             * @protected
             */
            this.multitonKey = null;
            if (View.instanceMap[key])
                throw Error(View.MULTITON_MSG);
            View.instanceMap[key] = this;
            this.multitonKey = key;
            this.mediatorMap = {};
            this.observerMap = {};
            this.initializeView();
        }
        /**
         * Initialize the multiton <code>View</code> instance.
         *
         * Called automatically by the constructor. This is the opportunity to initialize the
         * multiton instance in a subclass without overriding the constructor.
         */
        View.prototype.initializeView = function () {
        };
        /**
         * Register an <code>IObserver</code> to be notified of <code>INotifications</code> with a
         * given name.
         *
         * @param notificationName
         * 		The name of the <code>INotifications</code> to notify this <code>IObserver</code>
         * 		of.
         *
         * @param observer
         * 		The <code>IObserver</code> to register.
         */
        View.prototype.registerObserver = function (notificationName, observer) {
            var observers = this.observerMap[notificationName];
            if (observers)
                observers.push(observer);
            else
                this.observerMap[notificationName] = [observer];
        };
        /**
         * Remove a list of <code>IObserver</code>s for a given <code>notifyContext</code> from an
         * <code>IObserver</code> list for a given <code>INotification</code> name.
         *
         * @param notificationName
         * 		Which <code>IObserver</code> list to remove from.
         *
         * @param notifyContext
         * 		Remove the <code>IObserver</code> with this object as its
         *		<code>notifyContext</code>.
         */
        View.prototype.removeObserver = function (notificationName, notifyContext) {
            //The observer list for the notification under inspection
            var observers = this.observerMap[notificationName];
            //Find the observer for the notifyContext.
            var i = observers.length;
            while (i--) {
                var observer = observers[i];
                if (observer.compareNotifyContext(notifyContext)) {
                    observers.splice(i, 1);
                    break;
                }
            }
            /*
             * Also, when a Notification's Observer list length falls to zero, delete the
             * notification key from the observer map.
             */
            if (observers.length == 0)
                delete this.observerMap[notificationName];
        };
        /**
         * Notify the <code>IObserver</code>s for a particular <code>INotification</code>.
         *
         * All previously attached <code>IObserver</code>s for this <code>INotification</code>'s
         * list are notified and are passed a reference to the <code>INotification</code> in the
         * order in which they were registered.
         *
         * @param notification
         * 		The <code>INotification</code> to notify <code>IObserver</code>s of.
         */
        View.prototype.notifyObservers = function (notification) {
            var notificationName = notification.getName();
            var observersRef /*Array*/ = this.observerMap[notificationName];
            if (observersRef) {
                // Copy the array.
                var observers /*Array*/ = observersRef.slice(0);
                var len /*Number*/ = observers.length;
                for (var i /*Number*/ = 0; i < len; i++) {
                    var observer /*Observer*/ = observers[i];
                    observer.notifyObserver(notification);
                }
            }
        };
        /**
         * Register an <code>IMediator</code> instance with the <code>View</code>.
         *
         * Registers the <code>IMediator</code> so that it can be retrieved by name, and further
         * interrogates the <code>IMediator</code> for its <code>INotification</code> interests.
         *
         * If the <code>IMediator</code> returns any <code>INotification</code> names to be
         * notified about, an <code>Observer</code> is created to encapsulate the
         * <code>IMediator</code> instance's <code>handleNotification</code> method and register
         * it as an <code>Observer</code> for all <code>INotification</code>s the
         * <code>IMediator</code> is interested in.
         *
         * @param mediator
         * 		A reference to an <code>IMediator</code> implementation instance.
         */
        View.prototype.registerMediator = function (mediator) {
            var name = mediator.getMediatorName();
            //Do not allow re-registration (you must removeMediator first).
            if (this.mediatorMap[name])
                return;
            mediator.initializeNotifier(this.multitonKey);
            //Register the Mediator for retrieval by name.
            this.mediatorMap[name] = mediator;
            //Get Notification interests, if any.
            var interests = mediator.listNotificationInterests();
            var len = interests.length;
            if (len > 0) {
                //Create Observer referencing this mediator's handlNotification method.
                var observer = new puremvc.Observer(mediator.handleNotification, mediator);
                //Register Mediator as Observer for its list of Notification interests.
                for (var i = 0; i < len; i++)
                    this.registerObserver(interests[i], observer);
            }
            //Alert the mediator that it has been registered.
            mediator.onRegister();
        };
        /**
         * Retrieve an <code>IMediator</code> from the <code>View</code>.
         *
         * @param mediatorName
         * 		The name of the <code>IMediator</code> instance to retrieve.
         *
         * @return
         * 		The <code>IMediator</code> instance previously registered with the given
         *		<code>mediatorName</code> or an explicit <code>null</code> if it doesn't exists.
         */
        View.prototype.retrieveMediator = function (mediatorName) {
            //Return a strict null when the mediator doesn't exist
            return this.mediatorMap[mediatorName] || null;
        };
        /**
         * Remove an <code>IMediator</code> from the <code>View</code>.
         *
         * @param mediatorName
         * 		Name of the <code>IMediator</code> instance to be removed.
         *
         * @return
         *		The <code>IMediator</code> that was removed from the <code>View</code> or a
         *		strict <code>null</null> if the <code>Mediator</code> didn't exist.
         */
        View.prototype.removeMediator = function (mediatorName) {
            // Retrieve the named mediator
            var mediator = this.mediatorMap[mediatorName];
            if (!mediator)
                return null;
            //Get Notification interests, if any.
            var interests = mediator.listNotificationInterests();
            //For every notification this mediator is interested in...
            var i = interests.length;
            while (i--)
                this.removeObserver(interests[i], mediator);
            // remove the mediator from the map
            delete this.mediatorMap[mediatorName];
            //Alert the mediator that it has been removed
            mediator.onRemove();
            return mediator;
        };
        /**
         * Check if a <code>IMediator</code> is registered or not.
         *
         * @param mediatorName
         * 		The <code>IMediator</code> name to check whether it is registered.
         *
         * @return
         *		An <code>IMediator</code> is registered with the given <code>mediatorName</code>.
         */
        View.prototype.hasMediator = function (mediatorName) {
            return this.mediatorMap[mediatorName] != null;
        };
        /**
         * <code>View</code> multiton factory method.
         *
         * @param key
         *		The multiton key of the instance of <code>View</code> to create or retrieve.
         *
         * @return
         *		The singleton instance of <code>View</code>.
         */
        View.getInstance = function (key) {
            if (!View.instanceMap[key])
                View.instanceMap[key] = new View(key);
            return View.instanceMap[key];
        };
        /**
         * Remove a <code>View</code> instance.
         *
         * @param key
         * 		Key identifier of <code>View</code> instance to remove.
         */
        View.removeView = function (key) {
            delete View.instanceMap[key];
        };
        /**
         * Error message used to indicate that a <code>View</code> singleton instance is
         * already constructed for this multiton key.
         *
         * @constant
         * @protected
         */
        View.MULTITON_MSG = "View instance for this multiton key already constructed!";
        /**
         * <code>View</code> singleton instance map.
         *
         * @protected
         */
        View.instanceMap = {};
        return View;
    }());
    puremvc.View = View;
})(puremvc || (puremvc = {}));
///<reference path='../../../../../org/puremvc/typescript/multicore/interfaces/IController.ts'/>
///<reference path='../../../../../org/puremvc/typescript/multicore/interfaces/IView.ts'/>
///<reference path='../../../../../org/puremvc/typescript/multicore/interfaces/INotification.ts'/>
///<reference path='../../../../../org/puremvc/typescript/multicore/interfaces/ICommand.ts'/>
///<reference path='../../../../../org/puremvc/typescript/multicore/patterns/observer/Observer.ts'/>
///<reference path='../../../../../org/puremvc/typescript/multicore/core/View.ts'/>
var puremvc;
(function (puremvc) {
    "use strict";
    /**
     * The <code>Controller</code> class for PureMVC.
     *
     * A multiton <code>IController</code> implementation.
     *
     * In PureMVC, the <code>Controller</code> class follows the 'Command and Controller' strategy,
     * and assumes these responsibilities:
     *
     * <UL>
     * <LI>Remembering which <code>ICommand</code>s are intended to handle which
     * <code>INotification</code>s.
     * <LI>Registering itself as an <code>IObserver</code> with the <code>View</code> for each
     * <code>INotification</code> that it has an <code>ICommand</code> mapping for.
     * <LI>Creating a new instance of the proper <code>ICommand</code> to handle a given
     * <code>INotification</code> when notified by the <code>View</code>.
     * <LI>Calling the <code>ICommand</code>'s <code>execute</code> method, passing in the
     * <code>INotification</code>.
     *
     * Your application must register <code>ICommand</code>s with the <code>Controller</code>.
     *
     * The simplest way is to subclass </code>Facade</code>, and use its
     * <code>initializeController</code> method to add your registrations.
     */
    var Controller = /** @class */ (function () {
        /**
         * Constructs a <code>Controller</code> instance.
         *
         * This <code>IController</code> implementation is a multiton, so you should not call the
         * constructor directly, but instead call the static multiton Factory method
         * <code>Controller.getInstance( key )</code>.
         *
         * @param key
         *		Multiton key for this instance of <code>Controller</code>
         *
         * @throws Error
         * 		Throws an error if an instance for this multiton key has already been constructed.
         */
        function Controller(key) {
            /**
             * Local reference to the <code>View</code> singleton.
             *
             * @protected
             */
            this.view = null;
            /**
             * Mapping of <code>Notification<code> names to <code>Command</code> constructors references.
             *
             * @protected
             */
            this.commandMap = null;
            /**
             * The multiton Key for this Core.
             *
             * @protected
             */
            this.multitonKey = null;
            if (Controller.instanceMap[key])
                throw Error(Controller.MULTITON_MSG);
            Controller.instanceMap[key] = this;
            this.multitonKey = key;
            this.commandMap = {};
            this.initializeController();
        }
        /**
         * Initialize the multiton <code>Controller</code> instance.
         *
         * Called automatically by the constructor.
         *
         * Note that if you are using a subclass of <code>View</code> in your application, you
         * should <i>also</i> subclass <code>Controller</code> and override the
         * <code>initializeController</code> method in the following way:
         *
         * <pre>
         *		// Ensure that the Controller is talking to my <code>IView</code> implementation.
         *		initializeController():void
         *		{
         *			this.view = MyView.getInstance( this.multitonKey );
         *		}
         * </pre>
         *
         * @protected
         */
        Controller.prototype.initializeController = function () {
            this.view = puremvc.View.getInstance(this.multitonKey);
        };
        /**
         * If an <code>ICommand</code> has previously been registered to handle the given
         * <code>INotification</code>, then it is executed.
         *
         * @param notification
         * 		The <code>INotification</code> the command will receive as parameter.
         */
        Controller.prototype.executeCommand = function (notification) {
            /*
             * Typed any here instead of <code>Function</code> ( won't compile if set to Function
             * because today the compiler consider that <code>Function</code> is not newable and
             * doesn't have a <code>Class</code> type)
             */
            var commandClassRef = this.commandMap[notification.getName()];
            if (commandClassRef) {
                var command = new commandClassRef();
                command.initializeNotifier(this.multitonKey);
                command.execute(notification);
            }
        };
        /**
         * Register a particular <code>ICommand</code> class as the handler for a particular
         * <code>INotification</code>.
         *
         * If an <code>ICommand</code> has already been registered to handle
         * <code>INotification</code>s with this name, it is no longer used, the new
         * <code>ICommand</code> is used instead.
         *
         * The <code>Observer</code> for the new <code>ICommand</code> is only created if this is
         * the first time an <code>ICommand</code> has been registered for this
         * <code>Notification</code> name.
         *
         * @param notificationName
         * 		The name of the <code>INotification</code>.
         *
         * @param commandClassRef
         * 		The constructor of the <code>ICommand</code>.
         */
        Controller.prototype.registerCommand = function (notificationName, commandClassRef) {
            if (!this.commandMap[notificationName])
                this.view.registerObserver(notificationName, new puremvc.Observer(this.executeCommand, this));
            this.commandMap[notificationName] = commandClassRef;
        };
        /**
         * Check if an <code>ICommand</code> is registered for a given <code>Notification</code>.
         *
         * @param notificationName
         * 		Name of the <code>Notification</code> to check wheter an <code>ICommand</code> is
         * 		registered for.
         *
         * @return
         * 		An <code>ICommand</code> is currently registered for the given
         * 		<code>notificationName</code>.
         */
        Controller.prototype.hasCommand = function (notificationName) {
            return this.commandMap[notificationName] != null;
        };
        /**
         * Remove a previously registered <code>ICommand</code> to <code>INotification</code>
         * mapping.
         *
         * @param notificationName
         * 		The name of the <code>INotification</code> to remove the <code>ICommand</code>
         * 		mapping for.
         */
        Controller.prototype.removeCommand = function (notificationName) {
            // if the Command is registered...
            if (this.hasCommand(notificationName)) {
                this.view.removeObserver(notificationName, this);
                delete this.commandMap[notificationName];
            }
        };
        /**
         * <code>Controller</code> multiton factory method.
         *
         * @param key
         *		The multiton key of the instance of <code>Controller</code> to create or retrieve.
         *
         * @return
         * 		The multiton instance of <code>Controller</code>
         */
        Controller.getInstance = function (key) {
            if (!Controller.instanceMap[key])
                Controller.instanceMap[key] = new Controller(key);
            return Controller.instanceMap[key];
        };
        /**
         * Remove a <code>Controller</code> instance.
         *
         * @param key
         *		Multiton key of the <code>Controller</code> instance to remove.
         */
        Controller.removeController = function (key) {
            delete Controller.instanceMap[key];
        };
        /**
         * Error message used to indicate that a <code>Controller</code> singleton instance is
         * already constructed for this multiton key.
         *
         * @protected
         * @constant
         */
        Controller.MULTITON_MSG = "Controller instance for this multiton key already constructed!";
        /**
         * <code>Controller</code> singleton instance map.
         *
         * @protected
         */
        Controller.instanceMap = {};
        return Controller;
    }());
    puremvc.Controller = Controller;
})(puremvc || (puremvc = {}));
///<reference path='../../../../../org/puremvc/typescript/multicore/interfaces/IModel.ts'/>
///<reference path='../../../../../org/puremvc/typescript/multicore/interfaces/IProxy.ts'/>
var puremvc;
(function (puremvc) {
    "use strict";
    /**
     * The <code>Model</code> class for PureMVC.
     *
     * A multiton <code>IModel</code> implementation.
     *
     * In PureMVC, the <code>IModel</code> class provides access to model objects
     * <code>Proxie</code>s by named lookup.
     *
     * The <code>Model</code> assumes these responsibilities:
     * <UL>
     * <LI>Maintain a cache of <code>IProxy</code> instances.
     * <LI>Provide methods for registering, retrieving, and removing <code>Proxy</code> instances.
     *
     * Your application must register <code>IProxy</code> instances with the <code>Model</code>.
     * Typically, you use an <code>ICommand</code> to create and register <code>Proxy</code> instances
     * once the <code>Facade</code> has initialized the core actors.
     */
    var Model = /** @class */ (function () {
        /**
         * This <code>IModel</code> implementation is a multiton, so you should not call the
         * constructor directly, but instead call the static multiton Factory method
         * <code>Model.getInstance( key )</code>.
         *
         * @param key
         *		Multiton key for this instance of <code>Model</code>.
         *
         * @throws Error
         * 		Throws an error if an instance for this multiton key has already been constructed.
         */
        function Model(key) {
            /**
             * HashTable of <code>IProxy</code> registered with the <code>Model</code>.
             *
             * @protected
             */
            this.proxyMap = null;
            /**
             * The multiton key for this core.
             *
             * @protected
             */
            this.multitonKey = null;
            if (Model.instanceMap[key])
                throw Error(Model.MULTITON_MSG);
            Model.instanceMap[key] = this;
            this.multitonKey = key;
            this.proxyMap = {};
            this.initializeModel();
        }
        /**
         * Initialize the multiton <code>Model</code> instance.
         *
         * Called automatically by the constructor. This is the opportunity to initialize the
         * multiton instance in a subclass without overriding the constructor.
         *
         * @protected
         */
        Model.prototype.initializeModel = function () {
        };
        /**
         * Register an <code>IProxy</code> with the <code>Model</code>.
         *
         * @param proxy
         *		An <code>IProxy</code> to be held by the <code>Model</code>.
         */
        Model.prototype.registerProxy = function (proxy) {
            proxy.initializeNotifier(this.multitonKey);
            this.proxyMap[proxy.getProxyName()] = proxy;
            proxy.onRegister();
        };
        /**
         * Remove an <code>IProxy</code> from the <code>Model</code>.
         *
         * @param proxyName
         *		The name of the <code>Proxy</code> instance to be removed.
         *
         * @return
         *		The <code>IProxy</code> that was removed from the <code>Model</code> or an
         *		explicit <code>null</null> if the <code>IProxy</code> didn't exist.
         */
        Model.prototype.removeProxy = function (proxyName) {
            var proxy = this.proxyMap[proxyName];
            if (proxy) {
                delete this.proxyMap[proxyName];
                proxy.onRemove();
            }
            return proxy;
        };
        /**
         * Retrieve an <code>IProxy</code> from the <code>Model</code>.
         *
         * @param proxyName
         *		 The <code>IProxy</code> name to retrieve from the <code>Model</code>.
         *
         * @return
         *		The <code>IProxy</code> instance previously registered with the given
         *		<code>proxyName</code> or an explicit <code>null</code> if it doesn't exists.
         */
        Model.prototype.retrieveProxy = function (proxyName) {
            //Return a strict null when the proxy doesn't exist
            return this.proxyMap[proxyName] || null;
        };
        /**
         * Check if an <code>IProxy</code> is registered.
         *
         * @param proxyName
         *		The name of the <code>IProxy</code> to verify the existence of its registration.
         *
         * @return
         *		A Proxy is currently registered with the given <code>proxyName</code>.
         */
        Model.prototype.hasProxy = function (proxyName) {
            return this.proxyMap[proxyName] != null;
        };
        /**
         * <code>Model</code> multiton factory method.
         *
         * @param key
         *		The multiton key of the instance of <code>Model</code> to create or retrieve.
         *
         * @return
         * 		The singleton instance of the <code>Model</code>.
         */
        Model.getInstance = function (key) {
            if (!Model.instanceMap[key])
                Model.instanceMap[key] = new Model(key);
            return Model.instanceMap[key];
        };
        /**
         * Remove a <code>Model</code> instance
         *
         * @param key
         *		Multiton key identifier for the <code>Model</code> instance to remove.
         */
        Model.removeModel = function (key) {
            delete Model.instanceMap[key];
        };
        /**
         * Error message used to indicate that a <code>Model</code> singleton instance is
         * already constructed for this multiton key.
         *
         * @constant
         * @protected
         */
        Model.MULTITON_MSG = "Model instance for this multiton key already constructed!";
        /**
         * <code>Model</code> singleton instance map.
         *
         * @protected
         */
        Model.instanceMap = {};
        return Model;
    }());
    puremvc.Model = Model;
})(puremvc || (puremvc = {}));
///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/INotification.ts'/>
var puremvc;
(function (puremvc) {
    "use strict";
    /**
     * A base <code>INotification</code> implementation.
     *
     * PureMVC does not rely upon underlying event models such as the one provided in JavaScript DOM API,
     * and TypeScript does not have an inherent event model.
     *
     * The Observer pattern as implemented within PureMVC exists to support event-driven
     * communication between the application and the actors of the MVC triad (Model, View and
     * Controller).
     *
     * Notifications are not meant to be a replacement for Events in Javascript.
     * Generally, <code>IMediator</code> implementors place event listeners on their view components,
     * which they then handle in the usual way. This may lead to the broadcast of
     * <code>INotification</code>s to trigger <code>ICommand</code>s or to communicate with other
     * <code>IMediators</code>. <code>IProxy</code> and <code>ICommand</code> instances communicate
     * with each other and <code>IMediator</code>s by broadcasting <code>INotification</code>s.
     *
     * A key difference between JavaScript <code>Event</code>s and PureMVC
     * <code>INotification</code>s is that <code>Event</code>s follow the 'Chain of Responsibility'
     * pattern, 'bubbling' up the display hierarchy until some parent component handles the
     * <code>Event</code>, while PureMVC <code>INotification</code>s follow a 'Publish/Subscribe'
     * pattern. PureMVC classes need not be related to each other in a parent/child relationship in
     * order to communicate with one another using <code>INotification</code>s.
     */
    var Notification = /** @class */ (function () {
        /**
         * Constructs a <code>Notification</code> instance.
         *
         * @param name
         * 		The name of the notification.
         *
         * @param body
         * 		Body data to send with the <code>Notification</code>.
         *
         * @param type
         * 		Type identifier of the <code>Notification</code>.
         */
        function Notification(name, body, type) {
            if (body === void 0) { body = null; }
            if (type === void 0) { type = null; }
            /**
             * The name of the <code>Notification</code>.
             */
            this.name = null;
            /**
             * The body data to send with the <code>Notification</code>.
             */
            this.body = null;
            /**
             * The type identifier of the <code>Notification</code>.
             */
            this.type = null;
            this.name = name;
            this.body = body;
            this.type = type;
        }
        /**
         * Get the name of the <code>Notification</code> instance.
         *
         * @return
         *		The name of the <code>Notification</code> instance.
         */
        Notification.prototype.getName = function () {
            return this.name;
        };
        /**
         * Set the body of the <code>Notification</code> instance.
         *
         * @param body
         * 		The body of the <code>Notification</code> instance.
         */
        Notification.prototype.setBody = function (body) {
            this.body = body;
        };
        /**
         * Get the body of the <code>Notification</code> instance.
         *
         * @return
         *		The body object of the <code>Notification</code> instance.
         */
        Notification.prototype.getBody = function () {
            return this.body;
        };
        /**
         * Set the type of the <code>Notification</code> instance.
         *
         * @param type
         * 		The type of the <code>Notification</code> instance.
         */
        Notification.prototype.setType = function (type) {
            this.type = type;
        };
        /**
         * Get the type of the <code>Notification</code> instance.
         *
         * @return
         *		The type of the <code>Notification</code> instance.
         */
        Notification.prototype.getType = function () {
            return this.type;
        };
        /**
         * Get a textual representation of the <code>Notification</code> instance.
         *
         * @return
         * 		The textual representation of the <code>Notification</code>	instance.
         */
        Notification.prototype.toString = function () {
            var msg = "Notification Name: " + this.getName();
            msg += "\nBody:" + ((this.getBody() == null) ? "null" : this.getBody().toString());
            msg += "\nType:" + ((this.getType() == null) ? "null" : this.getType());
            return msg;
        };
        return Notification;
    }());
    puremvc.Notification = Notification;
})(puremvc || (puremvc = {}));
///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/IFacade.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/IModel.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/IView.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/IController.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/IProxy.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/IMediator.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/INotification.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/core/Controller.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/core/Model.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/core/View.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/patterns/observer/Notification.ts'/>
var puremvc;
(function (puremvc) {
    "use strict";
    /**
     * A base multiton <code>IFacade</code> implementation.
     *
     * In PureMVC, the <code>Facade</code> class assumes these responsibilities:
     *
     * <UL>
     * <LI>Initializing the <code>Model</code>, <code>View</code> and <code>Controller</code>
     * singletons.
     * <LI>Providing all the methods defined by the <code>IModel</code>, <code>IView</code>, &
     * <code>IController</code> interfaces.
     * <LI>Providing the ability to override the specific <code>Model</code>, <code>View</code> and
     * <code>Controller</code> multitons created.
     * <LI>Providing a single point of contact to the application for registering
     * <code>ICommand</code>s and notifying <code>IObserver</code>s.
     *
     * This <code>Facade</code> implementation is a multiton instance and cannot be instantiated directly,
     * but instead calls the static multiton factory method <code>Facade.getInstance( key )</code>.
     */
    var Facade = /** @class */ (function () {
        /**
         * Constructs a <code>Controller</code> instance.
         *
         * This <code>IFacade</code> implementation is a multiton, so you should not call the
         * constructor directly, but instead call the static multiton factory method
         * <code>Facade.getInstance( key )</code>.
         *
         *
         * @param key
         *		Multiton key for this instance of <code>Facade</code>
         *
         * @throws Error
         *		Throws an error if an instance for this multiton key has already been constructed.
         */
        function Facade(key) {
            /**
             * Local reference to the <code>Model</code> multiton.
             *
             * @protected
             */
            this.model = null;
            /**
             * Local reference to the <code>View</code> multiton.
             *
             * @protected
             */
            this.view = null;
            /**
             * Local reference to the <code>Controller</code> multiton.
             *
             * @protected
             */
            this.controller = null;
            /**
             * The multiton Key for this Core.
             *
             * @protected
             */
            this.multitonKey = null;
            if (Facade.instanceMap[key])
                throw Error(Facade.MULTITON_MSG);
            this.initializeNotifier(key);
            Facade.instanceMap[key] = this;
            this.initializeFacade();
        }
        /**
         * Called automatically by the constructor.
         * Initialize the singleton <code>Facade</code> instance.
         *
         * Override in your subclass to do any subclass specific initializations. Be sure to
         * extend the <code>Facade</code> with the methods and properties on your implementation
         * and call <code>Facade.initializeFacade()</code>.
         *
         * @protected
         */
        Facade.prototype.initializeFacade = function () {
            this.initializeModel();
            this.initializeController();
            this.initializeView();
        };
        /**
         * Initialize the <code>Model</code>.
         *
         * Called by the <code>initializeFacade</code> method. Override this method in your
         * subclass of <code>Facade</code> if one or both of the following are true:
         *
         * <UL>
         * <LI> You wish to initialize a different <code>IModel</code>.
         * <LI> You have <code>Proxy</code>s to register with the <code>Model</code> that do not
         * retrieve a reference to the <code>Facade</code> at construction time.
         *
         * If you don't want to initialize a different <code>IModel</code>, call
         * <code>super.initializeModel()</code> at the beginning of your method, then register
         * <code>Proxy</code>s.
         *
         * Note: This method is <i>rarely</i> overridden; in practice you are more likely to use a
         * <code>Command</code> to create and register <code>Proxy</code>s with the
         * <code>Model</code>, since <code>Proxy</code>s with mutable data will likely need to send
         * <code>INotification</code>s and thus will likely want to fetch a reference to the
         * <code>Facade</code> during their construction.
         *
         * @protected
         */
        Facade.prototype.initializeModel = function () {
            if (!this.model)
                this.model = puremvc.Model.getInstance(this.multitonKey);
        };
        /**
         * Initialize the <code>Controller</code>.
         *
         * Called by the <code>initializeFacade</code> method. Override this method in your
         * subclass of <code>Facade</code> if one or both of the following are true:
         *
         * <UL>
         * <LI>You wish to initialize a different <code>IController</code>.
         * <LI>You have <code>ICommand</code>s to register with the <code>Controller</code> at
         * startup.
         *
         * If you don't want to initialize a different <code>IController</code>, call
         * <code>super.initializeController()</code> at the beginning of your method, then register
         * <code>Command</code>s.
         *
         * @protected
         */
        Facade.prototype.initializeController = function () {
            if (!this.controller)
                this.controller = puremvc.Controller.getInstance(this.multitonKey);
        };
        /**
         * Initialize the <code>View</code>.
         *
         * Called by the <code>initializeFacade</code> method. Override this method in your
         * subclass of <code>Facade</code> if one or both of the following are true:
         * <UL>
         * <LI> You wish to initialize a different <code>IView</code>.
         * <LI> You have <code>Observers</code> to register with the <code>View</code>
         *
         * If you don't want to initialize a different <code>IView</code>, call
         * <code>super.initializeView()</code> at the beginning of your method, then register
         * <code>IMediator</code> instances.
         *
         * Note: This method is <i>rarely</i> overridden; in practice you are more likely to use a
         * <code>Command</code> to create and register <code>Mediator</code>s with the
         * <code>View</code>, since <code>IMediator</code> instances will need to send
         * <code>INotification</code>s and thus will likely want to fetch a reference to the
         * <code>Facade</code> during their construction.
         *
         * @protected
         */
        Facade.prototype.initializeView = function () {
            if (!this.view)
                this.view = puremvc.View.getInstance(this.multitonKey);
        };
        /**
         * Register an <code>ICommand</code> with the <code>IController</code> associating it to a
         * <code>INotification</code> name.
         *
         * @param notificationName
         *		The name of the <code>INotification</code> to associate the <code>ICommand</code>
         *		with.
         
         * @param commandClassRef
         * 		A reference to the constructor of the <code>ICommand</code>.
         */
        Facade.prototype.registerCommand = function (notificationName, commandClassRef) {
            this.controller.registerCommand(notificationName, commandClassRef);
        };
        /**
         * Remove a previously registered <code>ICommand</code> to <code>INotification</code>
         * mapping from the <code>Controller</code>.
         *
         * @param notificationName
         *		The name of the <code>INotification</code> to remove the <code>ICommand</code>
         *		mapping for.
         */
        Facade.prototype.removeCommand = function (notificationName) {
            this.controller.removeCommand(notificationName);
        };
        /**
         * Check if an <code>ICommand</code> is registered for a given <code>Notification</code>.
         *
         * @param notificationName
         * 		The name of the <code>INotification</code> to verify for the existence of an
         * 		<code>ICommand</code> mapping for.
         *
         * @return
         * 		A <code>Command</code> is currently registered for the given
         *		<code>notificationName</code>.
         */
        Facade.prototype.hasCommand = function (notificationName) {
            return this.controller.hasCommand(notificationName);
        };
        /**
         * Register an <code>IProxy</code> with the <code>Model</code> by name.
         *
         * @param proxy
         *		The <code>IProxy</code> to be registered with the <code>Model</code>.
         */
        Facade.prototype.registerProxy = function (proxy) {
            this.model.registerProxy(proxy);
        };
        /**
         * Retrieve an <code>IProxy</code> from the <code>Model</code> by name.
         *
         * @param proxyName
         * 		The name of the <code>IProxy</code> to be retrieved.
         *
         * @return
         * 		The <code>IProxy</code> previously registered with the given
         *		<code>proxyName</code>.
         */
        Facade.prototype.retrieveProxy = function (proxyName) {
            return this.model.retrieveProxy(proxyName);
        };
        /**
         * Remove an <code>IProxy</code> from the <code>Model</code> by name.
         *
         * @param proxyName
         *		The <code>IProxy</code> to remove from the <code>Model</code>.
         *
         * @return
         *		The <code>IProxy</code> that was removed from the <code>Model</code>
         */
        Facade.prototype.removeProxy = function (proxyName) {
            var proxy;
            if (this.model)
                proxy = this.model.removeProxy(proxyName);
            return proxy;
        };
        /**
         * Check if a <code>Proxy</code> is registered.
         *
         * @param proxyName
         * 		The <code>IProxy</code> to verify the existence of a registration with the
         *		<code>IModel</code>.
         *
         * @return
         * 		A <code>Proxy</code> is currently registered with the given	<code>proxyName</code>.
         */
        Facade.prototype.hasProxy = function (proxyName) {
            return this.model.hasProxy(proxyName);
        };
        /**
         * Register a <code>IMediator</code> with the <code>IView</code>.
         *
         * @param mediator
         *		A reference to the <code>IMediator</code>.
         */
        Facade.prototype.registerMediator = function (mediator) {
            if (this.view)
                this.view.registerMediator(mediator);
        };
        /**
         * Retrieve an <code>IMediator</code> from the <code>IView</code>.
         *
         * @param mediatorName
         * 		The name of the registered <code>Mediator</code> to retrieve.
         *
         * @return
         *		The <code>IMediator</code> previously registered with the given
         *		<code>mediatorName</code>.
         */
        Facade.prototype.retrieveMediator = function (mediatorName) {
            return this.view.retrieveMediator(mediatorName);
        };
        /**
         * Remove an <code>IMediator</code> from the <code>IView</code>.
         *
         * @param mediatorName
         * 		Name of the <code>IMediator</code> to be removed.
         *
         * @return
         *		The <code>IMediator</code> that was removed from the <code>IView</code>
         */
        Facade.prototype.removeMediator = function (mediatorName) {
            var mediator;
            if (this.view)
                mediator = this.view.removeMediator(mediatorName);
            return mediator;
        };
        /**
         * Check if a <code>Mediator</code> is registered or not
         *
         * @param mediatorName
         * 		The name of the <code>IMediator</code> to verify the existence of a registration
         *		for.
         *
         * @return
         * 		An <code>IMediator</code> is registered with the given <code>mediatorName</code>.
         */
        Facade.prototype.hasMediator = function (mediatorName) {
            return this.view.hasMediator(mediatorName);
        };
        /**
         * Notify the <code>IObserver</code>s for a particular <code>INotification</code>.
         *
         * This method is left public mostly for backward compatibility, and to allow you to
         * send custom notification classes using the <code>Facade</code>.
         *
         *
         * Usually you should just call <code>sendNotification</code> and pass the parameters,
         * never having to construct the <code>INotification</code> yourself.
         *
         * @param notification
         * 		The <code>INotification</code> to have the <code>IView</code> notify
         *		<code>IObserver</code>s	of.
         */
        Facade.prototype.notifyObservers = function (notification) {
            if (this.view)
                this.view.notifyObservers(notification);
        };
        /**
         * Create and send an <code>INotification</code>.
         *
         * Keeps us from having to construct new notification instances in our implementation code.
         *
         * @param name
         *		The name of the notification to send.
         *
         * @param body
         *		The body of the notification to send.
         *
         * @param type
         *		The type of the notification to send.
         */
        Facade.prototype.sendNotification = function (name, body, type) {
            if (body === void 0) { body = null; }
            if (type === void 0) { type = null; }
            this.notifyObservers(new puremvc.Notification(name, body, type));
        };
        /**
         * Set the multiton key for this <code>Facade</code> instance.
         *
         * Not called directly, but instead from the constructor when
         * <code>Facade.getInstance(key)</code> is invoked.
         *
         * @param key
         *		The multiton key for this <code>Facade</code> instance to initialize the
         *		<code>Notifier</code> with.
         */
        Facade.prototype.initializeNotifier = function (key) {
            this.multitonKey = key;
        };
        /**
         * <code>Facade</code> multiton factory method.
         *
         * @param key
         *		The multiton key of the instance of <code>Facade</code> to create or retrieve.
         *
         * @return
         * 		The singleton instance of <code>Facade</code>.
         */
        Facade.getInstance = function (key) {
            if (!Facade.instanceMap[key])
                Facade.instanceMap[key] = new Facade(key);
            return Facade.instanceMap[key];
        };
        /**
         * Check if a core is registered or not.
         *
         * @param key
         *		The multiton key for the Core in question.
         *
         * @return
         *		The core is registered with the given <code>key</code>.
         */
        Facade.hasCore = function (key) {
            return Facade.instanceMap[key] ? true : false;
        };
        /**
         * Remove a core.
         *
         * Remove the <code>Model</code>, <code>View</code>, <code>Controller</code> and
         * <code>Facade</code> instances for the given key.
         *
         * @param key
         *		Key identifier of the core to remove.
         */
        Facade.removeCore = function (key) {
            if (!Facade.instanceMap[key])
                return;
            puremvc.Model.removeModel(key);
            puremvc.View.removeView(key);
            puremvc.Controller.removeController(key);
            delete Facade.instanceMap[key];
        };
        /**
         * @constant
         * @protected
         */
        Facade.MULTITON_MSG = "Facade instance for this multiton key already constructed!";
        /**
         * <code>Facade</code> singleton instance map.
         *
         * @protected
         */
        Facade.instanceMap = {};
        return Facade;
    }());
    puremvc.Facade = Facade;
})(puremvc || (puremvc = {}));
///<reference path='../../../org/puremvc/typescript/multicore/patterns/facade/Facade.ts'/>
var ninlgde;
(function (ninlgde) {
    "use strict";
    // 框架的log
    ninlgde.logger = null;
    // pureMVC 的入口
    ninlgde.app = null;
    var GameFrame = /** @class */ (function () {
        function GameFrame(game) {
            this._TAG = "GameFrame";
            this.GAME_NAME = null;
            this.GAME_NAME = game;
        }
        GameFrame.create = function (game) {
            if (GameFrame.instance != null) {
                return false;
            }
            GameFrame.instance = new GameFrame(game);
            GameFrame.instance.init();
            return true;
        };
        GameFrame.getInstance = function () {
            return GameFrame.instance;
        };
        /**
         * frame初始化
         * 初始化所有不需要coocs支持的模块
         */
        GameFrame.prototype.init = function () {
            // 初始化框架log
            ninlgde.logger = new ninlgde.Logger(7);
            // 初始化pureMVC
            ninlgde.app = puremvc.Facade.getInstance(this.GAME_NAME);
            // 创建UImanager
            ninlgde.ui.UIManager.create();
            ninlgde.logger.info(this._TAG, "Ninlgde Framework has initialized");
        };
        /**
         * frame start
         * GameMain的start里调用，用于启动framework
         */
        GameFrame.prototype.start = function () {
            return true;
        };
        GameFrame.prototype.getGameName = function () {
            return this.GAME_NAME;
        };
        GameFrame.instance = null;
        return GameFrame;
    }());
    ninlgde.GameFrame = GameFrame;
})(ninlgde || (ninlgde = {}));
var ninlgde;
(function (ninlgde) {
    var collection;
    (function (collection) {
        /**
         * HashMap
         * key不能是object，否则会出问题
         */
        var HashMap = /** @class */ (function () {
            function HashMap() {
                this.len = 0;
                this.obj = new Object();
            }
            HashMap.prototype.isEmpty = function () {
                return this.len == 0;
            };
            HashMap.prototype.containsKey = function (key) {
                return (key in this.obj);
            };
            HashMap.prototype.get = function (key) {
                return this.containsKey(key) ? this.obj[key] : null;
            };
            HashMap.prototype.put = function (key, value) {
                if (!this.containsKey(key)) {
                    this.len++;
                }
                this.obj[key] = value;
                return this;
            };
            HashMap.prototype.delete = function (key) {
                if (this.containsKey(key) && (delete this.obj[key])) {
                    this.len--;
                    return true;
                }
                return false;
            };
            HashMap.prototype.clear = function () {
                this.len = 0;
                this.obj = new Object();
            };
            HashMap.prototype.forEach = function (callbackfn) {
                var keys = this.keySet();
                for (var i = 0; i < this.len; i++) {
                    var key = keys[i];
                    callbackfn(key, this.obj[key], this);
                }
            };
            HashMap.prototype.keySet = function () {
                var keys = new Array();
                for (var key in this.obj) {
                    keys.push(key);
                }
                return keys;
            };
            HashMap.prototype.valueList = function () {
                var values = new Array();
                for (var key in this.obj) {
                    values.push(this.obj[key]);
                }
                return values;
            };
            HashMap.prototype.keys = function () {
                return new MapIterator(this.keySet());
            };
            HashMap.prototype.values = function () {
                return new MapIterator(this.valueList());
            };
            HashMap.prototype.size = function () {
                return this.len;
            };
            return HashMap;
        }());
        collection.HashMap = HashMap;
        /**
         *  OrderedMap
         */
        var OrderedMap = /** @class */ (function () {
            function OrderedMap() {
                this.keyEles = [];
                this.elements = [];
            }
            OrderedMap.prototype.isEmpty = function () {
                return this.keyEles.length == 0;
            };
            OrderedMap.prototype.containsKey = function (key) {
                for (var i = 0; i < this.keyEles.length; i++) {
                    if (this.keyEles[i] == key) {
                        return true;
                    }
                }
                return false;
            };
            OrderedMap.prototype.get = function (key) {
                for (var i = 0; i < this.keyEles.length; i++) {
                    if (this.keyEles[i] == key) {
                        return this.elements[i];
                    }
                }
                return null;
            };
            OrderedMap.prototype.put = function (key, value) {
                for (var i = 0; i < this.keyEles.length; i++) {
                    if (this.keyEles[i] == key) {
                        this.elements[i] = value;
                        return this;
                    }
                }
                this.keyEles.push(key);
                this.elements.push(value);
                return this;
            };
            OrderedMap.prototype.delete = function (key) {
                for (var i = 0; i < this.keyEles.length; i++) {
                    if (this.keyEles[i] == key) {
                        this.keyEles.splice(i, 1);
                        this.elements.splice(i, 1);
                        return true;
                    }
                }
                return false;
            };
            OrderedMap.prototype.clear = function () {
                this.elements = [];
                this.keyEles = [];
            };
            OrderedMap.prototype.forEach = function (callbackfn) {
                for (var i = 0; i < this.keyEles.length; i++) {
                    callbackfn(this.keyEles[i], this.elements[i], this);
                }
            };
            OrderedMap.prototype.keys = function () {
                return new MapIterator(this.keyEles);
            };
            OrderedMap.prototype.values = function () {
                return new MapIterator(this.elements);
            };
            OrderedMap.prototype.size = function () {
                return this.keyEles.length;
            };
            return OrderedMap;
        }());
        collection.OrderedMap = OrderedMap;
        var MapIterator = /** @class */ (function () {
            function MapIterator(e) {
                this.elements = e;
                this.ps = 0;
            }
            MapIterator.prototype.next = function () {
                if (this.ps >= this.elements.length) {
                    return {
                        value: undefined,
                        done: true
                    };
                }
                this.ps++;
                return {
                    value: this.elements[this.ps - 1],
                    done: false
                };
            };
            MapIterator.prototype.dataArray = function () {
                return this.elements;
            };
            return MapIterator;
        }());
        collection.MapIterator = MapIterator;
    })(collection = ninlgde.collection || (ninlgde.collection = {}));
})(ninlgde || (ninlgde = {}));
var ninlgde;
(function (ninlgde) {
    "use strict";
    var EventCenter = /** @class */ (function () {
        function EventCenter() {
            this._TAG = "EventCenter";
            this.eventMap = null; //
            this.eventMap = new ninlgde.collection.HashMap();
        }
        EventCenter.getInstance = function () {
            if (this.instance == null) {
                this.instance = new EventCenter();
            }
            return this.instance;
        };
        EventCenter.prototype.fireEvent = function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var events = this.eventMap.get(event);
            if (events != null) {
                events.forEach(function (e) {
                    if (e) {
                        e.getHandler().apply(e.getScope(), args);
                    }
                });
            }
        };
        EventCenter.prototype.registEventListener = function (event, handler, scope) {
            if (typeof event != "string" || typeof handler != "function") {
                ninlgde.logger.error(this._TAG, "EventCenter listen error: eName: {0} handler: {1}", event, handler);
                return;
            }
            var events = this.eventMap.get(event);
            if (events == null) {
                events = new Array();
                this.eventMap.put(event, events);
            }
            var listener = new ninlgde.EventListener(handler, scope);
            events.push(listener);
        };
        EventCenter.prototype.unregistEventListener = function (event, handler, scope) {
            var events = this.eventMap.get(event);
            if (events == null) {
                return;
            }
            var newEvents = events.filter(function (e) {
                return e.getHandler() != handler || e.getScope() != scope;
            });
            this.eventMap.put(event, newEvents);
            events = null;
        };
        EventCenter.prototype.unregistScope = function (scope) {
            var _this = this;
            this.eventMap.forEach(function (event, events) {
                var newEvents = events.filter(function (e) {
                    return e.getScope() != scope;
                });
                _this.eventMap.put(event, newEvents);
            });
        };
        return EventCenter;
    }());
    ninlgde.EventCenter = EventCenter;
})(ninlgde || (ninlgde = {}));
var ninlgde;
(function (ninlgde) {
    "use strict";
    var EventListener = /** @class */ (function () {
        function EventListener(handler, scope) {
            this.handler = handler;
            this.scope = scope;
        }
        EventListener.prototype.getScope = function () {
            return this.scope;
        };
        EventListener.prototype.getHandler = function () {
            return this.handler;
        };
        return EventListener;
    }());
    ninlgde.EventListener = EventListener;
})(ninlgde || (ninlgde = {}));
var ninlgde;
(function (ninlgde) {
    var net;
    (function (net) {
        "use strict";
    })(net = ninlgde.net || (ninlgde.net = {}));
})(ninlgde || (ninlgde = {}));
var ninlgde;
(function (ninlgde) {
    "use strict";
    var Assert = /** @class */ (function () {
        function Assert() {
        }
        /**
         * 不该是true
         * @param tf
         * @param msg
         */
        Assert.isTrue = function (tf, msg) {
            Assert.log(!tf, msg);
            return tf;
        };
        /**
         * 不该是false
         * @param tf
         * @param msg
         */
        Assert.isFalse = function (tf, msg) {
            Assert.log(tf, msg);
            return tf;
        };
        Assert.log = function (tf, msg) {
            if (tf) {
                return;
            }
            ninlgde.logger.error("ASSERT FAILED!", msg ? "message: " + msg : "");
        };
        return Assert;
    }());
    ninlgde.Assert = Assert;
})(ninlgde || (ninlgde = {}));
var ninlgde;
(function (ninlgde) {
    var net;
    (function (net) {
        "use strict";
    })(net = ninlgde.net || (ninlgde.net = {}));
})(ninlgde || (ninlgde = {}));
///<reference path='../../../utils/Assert.ts' />
///<reference path='IConnectionHandler.ts' />
var ninlgde;
(function (ninlgde) {
    var net;
    (function (net) {
        "use strict";
        var ConnectionState;
        (function (ConnectionState) {
            ConnectionState[ConnectionState["CLOSED"] = 0] = "CLOSED";
            ConnectionState[ConnectionState["CONNECTING"] = 1] = "CONNECTING";
            ConnectionState[ConnectionState["CONNECTED"] = 2] = "CONNECTED";
        })(ConnectionState || (ConnectionState = {}));
        var Connection = /** @class */ (function () {
            function Connection(handler) {
                this.socket = null;
                this.connectionState = ConnectionState.CLOSED;
                this.timeoutId = 0;
                this.url = "";
                this.handler = handler;
            }
            Connection.prototype.createSocket = function () {
                var _this = this;
                var socket = new WebSocket(this.url);
                socket.binaryType = 'arraybuffer';
                socket.onopen = function (event) {
                    if (_this.onConnectionCreated) {
                        _this.onConnectionCreated(event);
                    }
                };
                socket.onmessage = function (event) {
                    if (_this.onMessage) {
                        _this.onMessage(event);
                    }
                };
                socket.onerror = function (event) {
                    if (_this.onConnectionError) {
                        _this.onConnectionError(event);
                    }
                };
                socket.onclose = function (event) {
                    if (_this.onConnectionClosed) {
                        _this.onConnectionClosed(event);
                    }
                };
                return socket;
            };
            Connection.prototype.connection = function (url) {
                ninlgde.Assert.isFalse(this.socket == null, "websocket should be null");
                ninlgde.Assert.isFalse(this.connectionState == ConnectionState.CLOSED, "connection state should be closed");
                ninlgde.Assert.isTrue(url === "", "url error");
                this.url = url;
                this.socket = this.createSocket();
                this.timeoutId = this.setTimeOut();
                return true;
            };
            Connection.prototype.send = function (message) {
                if (ninlgde.Assert.isTrue(this.socket == null, "websocket is null")) {
                    return false;
                }
                if (ninlgde.Assert.isTrue(this.connectionState != ConnectionState.CONNECTED, "websocket connecting")) {
                    return false;
                }
                this.socket.send(message);
                return true;
            };
            Connection.prototype.close = function () {
                if (this.socket !== null) {
                    this.socket.close();
                    this.socket = null;
                }
                this.clearTimeOut();
                this.connectionState = ConnectionState.CLOSED;
            };
            Connection.prototype.reconnect = function () {
                this.close();
                this.socket = this.createSocket();
                this.timeoutId = this.setTimeOut();
            };
            Connection.prototype.clearTimeOut = function () {
                this.timeoutId && clearTimeout(this.timeoutId);
                this.timeoutId = 0;
            };
            Connection.prototype.setTimeOut = function (time) {
                var _this = this;
                if (time === void 0) { time = 3; }
                // 清理timeout
                this.clearTimeOut();
                var timeout = setTimeout(function () {
                    if (_this.socket.readyState !== WebSocket.OPEN) {
                        _this.close();
                        _this.onConnectionClosed(null);
                    }
                }, time);
                return timeout;
            };
            Connection.prototype.onConnectionCreated = function (event) {
                ninlgde.Assert.isFalse(this.connectionState == ConnectionState.CONNECTING, "connection state not CONNECTING");
                this.connectionState = ConnectionState.CONNECTED;
                this.clearTimeOut();
                if (this.handler) {
                    this.handler.onConnectionCreated(event);
                }
                // broadcast connection created
                ninlgde.EventCenter.getInstance().fireEvent(ninlgde.Events.CONNECTION_CREATED);
            };
            Connection.prototype.onConnectionClosed = function (event) {
                if (this.connectionState == ConnectionState.CLOSED) {
                    return;
                }
                this.close();
                if (this.handler) {
                    this.handler.onConnectionClosed(event);
                }
                // broadcast connection closed
                ninlgde.EventCenter.getInstance().fireEvent(ninlgde.Events.CONNECTION_CLOSED);
            };
            Connection.prototype.onConnectionError = function (err) {
                ninlgde.Assert.isFalse(this.connectionState == ConnectionState.CONNECTED, "connection state not CONNECTED");
                if (this.connectionState == ConnectionState.CLOSED) {
                    return;
                }
                this.close();
                if (this.handler) {
                    this.handler.onConnectionError(event);
                }
                // broadcast connection error
                ninlgde.EventCenter.getInstance().fireEvent(ninlgde.Events.CONNECTION_ERROR);
            };
            Connection.prototype.onMessage = function (data) {
                // TODO: decode data, and broadcast by id
                // var dataView = new DataView(data);
                // var length = dataView.getInt32(0, false);
                // var id = dataView.getInt32(4, false);
                // var command = dataView.getInt16(8, false);
                // // console.info(length, id, command);
                // var buffer =  new Uint8Array(length - 6) 
                // for(var i = 0; i < length - 6; i++) {
                //     buffer[i] = dataView.getInt8(i + 8);
                // }
            };
            return Connection;
        }());
        net.Connection = Connection;
    })(net = ninlgde.net || (ninlgde.net = {}));
})(ninlgde || (ninlgde = {}));
// module ninlgde.net {
//     export class Connector implements IConnector {
//     }
// }
// module ninlgde.net {
//     export interface IConnector {
//         dispose()
//         connect(url)
//         onConnectionCreated()
//         onConnectionLost(err)
//         reconnect()
//     }
// }
var ninlgde;
(function (ninlgde) {
    var ui;
    (function (ui) {
        "use strict";
        var UIConfItem = /** @class */ (function () {
            function UIConfItem(path, type, layer) {
                // 路径
                this._path = null;
                // 类型----暂时还没想好
                this._type = null;
                // 放到哪层
                this._layer = null;
                this._path = path;
                this._type = type;
                this._layer = layer;
            }
            Object.defineProperty(UIConfItem.prototype, "path", {
                get: function () {
                    return this._path;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UIConfItem.prototype, "type", {
                get: function () {
                    return this._type;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UIConfItem.prototype, "layer", {
                get: function () {
                    return this._layer;
                },
                enumerable: true,
                configurable: true
            });
            return UIConfItem;
        }());
        ui.UIConfItem = UIConfItem;
    })(ui = ninlgde.ui || (ninlgde.ui = {}));
})(ninlgde || (ninlgde = {}));
var ninlgde;
(function (ninlgde) {
    var ui;
    (function (ui) {
        "use strict";
        var LAYOUR;
        (function (LAYOUR) {
            LAYOUR[LAYOUR["SENCE"] = 0] = "SENCE";
            LAYOUR[LAYOUR["WINDOW"] = 1] = "WINDOW";
            LAYOUR[LAYOUR["TOP"] = 2] = "TOP";
            LAYOUR[LAYOUR["DEBUG"] = 3] = "DEBUG";
        })(LAYOUR = ui.LAYOUR || (ui.LAYOUR = {}));
        var UI_LOAD_ERROR;
        (function (UI_LOAD_ERROR) {
            UI_LOAD_ERROR[UI_LOAD_ERROR["COCOS_ERR"] = 0] = "COCOS_ERR";
            UI_LOAD_ERROR[UI_LOAD_ERROR["TYPE_ERR"] = 1] = "TYPE_ERR";
        })(UI_LOAD_ERROR || (UI_LOAD_ERROR = {}));
        var UIManager = /** @class */ (function () {
            function UIManager() {
                this._TAG = "UIManager";
                this.uiLayouts = null;
                this.conf = null;
            }
            UIManager.getInstance = function () {
                return this.instance;
            };
            UIManager.create = function () {
                if (ninlgde.Assert.isFalse(this.instance == null)) {
                    this.instance = new UIManager();
                }
                return true;
            };
            UIManager.prototype.setLayouts = function (uiLayouts) {
                this.uiLayouts = uiLayouts;
            };
            UIManager.prototype.loadConf = function (conf) {
                this.conf = conf;
            };
            UIManager.prototype.showUI = function (name) {
                var _this = this;
                var uiitem = this.conf.get(name);
                // 检查是否有这个ui的配置
                if (ninlgde.Assert.isTrue(uiitem == null, ninlgde.Utils.StringFormat("CANNOT FIND THE UI<{0}> CONFIG ITEM", name))) {
                    return;
                }
                this.loadCocosPrefab(uiitem.path).then(function (loadedResource) {
                    //开始实例化预制资源
                    var prefab = cc.instantiate(loadedResource);
                    //将预制资源添加到父节点
                    _this.getLayer(uiitem.layer).addChild(prefab);
                    // cc.director.getScene().addChild(prefab)
                }).catch(function (reason) {
                    if (reason == UI_LOAD_ERROR.COCOS_ERR) {
                        ninlgde.logger.error(_this._TAG, '载入预制资源失败');
                    }
                    else if (reason == UI_LOAD_ERROR.TYPE_ERR) {
                        ninlgde.logger.error(_this._TAG, '你载入的不是预制资源!');
                    }
                    else {
                        ninlgde.logger.error(_this._TAG, "UNKNOW ERROR");
                    }
                });
            };
            UIManager.prototype.getLayer = function (layout) {
                return this.uiLayouts[layout].node;
            };
            UIManager.prototype.loadCocosPrefab = function (path) {
                return new Promise(function (resolve, reject) {
                    //加载预制资源 PrefabUrl为 预制资源在 资源中的路径
                    cc.loader.loadRes(path, function (errorMessage, loadedResource) {
                        if (errorMessage) {
                            ninlgde.logger.error(this._TAG, '载入预制资源失败, 原因:' + errorMessage);
                            reject(UI_LOAD_ERROR.COCOS_ERR);
                            return;
                        }
                        if (!(loadedResource instanceof cc.Prefab)) {
                            reject(UI_LOAD_ERROR.TYPE_ERR);
                            return;
                        }
                        resolve(loadedResource);
                    });
                });
            };
            UIManager.instance = null;
            return UIManager;
        }());
        ui.UIManager = UIManager;
    })(ui = ninlgde.ui || (ninlgde.ui = {}));
})(ninlgde || (ninlgde = {}));
var ninlgde;
(function (ninlgde) {
    "use strict";
    var Events = /** @class */ (function () {
        function Events() {
        }
        Events.CONNECTION_CREATED = "CONNECTION_CREATED";
        Events.CONNECTION_CLOSED = "CONNECTION_CLOSED";
        Events.CONNECTION_ERROR = "CONNECTION_ERROR";
        Events.CONNECTION_MESSAGE = "CONNECTION_MESSAGE";
        return Events;
    }());
    ninlgde.Events = Events;
})(ninlgde || (ninlgde = {}));
var ninlgde;
(function (ninlgde) {
    "use strict";
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        Utils.StringFormat = function (fmt) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (args.length > 0) {
                if (args.length == 1 && typeof (args) == "object") {
                    for (var key in args) {
                        if (args[key] != undefined) {
                            var reg = new RegExp("\\{" + key + "\\}", "gm");
                            fmt = fmt.replace(reg, args[key]);
                        }
                    }
                }
                else {
                    for (var i = 0; i < args.length; i++) {
                        if (args[i] != undefined) {
                            var reg = new RegExp("\\{" + i + "\\}", "gm");
                            fmt = fmt.replace(reg, args[i]);
                        }
                    }
                }
            }
            return fmt;
        };
        Utils.DateFormat = function (date, fmt) {
            var o = {
                "M+": date.getMonth() + 1,
                "d+": date.getDate(),
                "h+": date.getHours(),
                "m+": date.getMinutes(),
                "s+": date.getSeconds(),
                "q+": Math.floor((date.getMonth() + 3) / 3),
                "S": ("000" + date.getMilliseconds()).substr(("" + date.getMilliseconds()).length) //毫秒
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        };
        return Utils;
    }());
    ninlgde.Utils = Utils;
})(ninlgde || (ninlgde = {}));
///<reference path='extendsTS.ts' />
var ninlgde;
(function (ninlgde) {
    "use strict";
    var LoggerLevel;
    (function (LoggerLevel) {
        LoggerLevel[LoggerLevel["NONE"] = 0] = "NONE";
        LoggerLevel[LoggerLevel["ERROR"] = 1] = "ERROR";
        LoggerLevel[LoggerLevel["WARN"] = 2] = "WARN";
        LoggerLevel[LoggerLevel["INFO"] = 3] = "INFO";
        LoggerLevel[LoggerLevel["DEBUG"] = 4] = "DEBUG";
        LoggerLevel[LoggerLevel["count"] = 5] = "count";
    })(LoggerLevel = ninlgde.LoggerLevel || (ninlgde.LoggerLevel = {}));
    var LEVEL_STR = ["", "ERROR", "WARN", "INFO", "DEBUG"];
    var Logger = /** @class */ (function () {
        /**
         * 初始化日志和所属模块
         * @param level
         * @param themodule
         */
        function Logger(level, themodule) {
            if (themodule === void 0) { themodule = "FRAME"; }
            /**
             * 1 1 1 1 = 15
             * ^ ^ ^ ^
             * | | | |
             * | | | +--- error 是否输出
             * | | +----- warn 是否输出
             * | +------- info 是否输出
             * +--------- debug 是否输出
             */
            this.level = 0;
            this.themodule = "";
            this.level = level;
            this.themodule = themodule;
        }
        Logger.prototype.print = function (level, tag, format) {
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            var levelStr = LEVEL_STR[level];
            var content = args.length == 0 ? format : ninlgde.Utils.StringFormat.apply(null, [format].concat(args));
            var time = ninlgde.Utils.DateFormat(new Date(), "MM-dd hh:mm:ss.S");
            var totalFrames = cc.director.getTotalFrames();
            var result = ninlgde.Utils.StringFormat("[NINLGDE LOG][{0}][{1}--{2}]=>[TAG:{3}][{4}] {5}", this.themodule, time, totalFrames, tag, levelStr, content);
            console.log(result);
        };
        Logger.prototype.error = function (tag, format) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if ((this.level & 1 << LoggerLevel.ERROR) == 0) {
                this.print.apply(this, [LoggerLevel.ERROR, tag, format].concat(args));
            }
        };
        Logger.prototype.warn = function (tag, format) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if ((this.level & 1 << LoggerLevel.WARN) == 0) {
                this.print.apply(this, [LoggerLevel.WARN, tag, format].concat(args));
            }
        };
        Logger.prototype.info = function (tag, format) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if ((this.level & 1 << LoggerLevel.INFO) == 0) {
                this.print.apply(this, [LoggerLevel.INFO, tag, format].concat(args));
            }
        };
        Logger.prototype.debug = function (tag, format) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if ((this.level & 1 << LoggerLevel.DEBUG) == 0) {
                this.print.apply(this, [LoggerLevel.DEBUG, tag, format].concat(args));
            }
        };
        return Logger;
    }());
    ninlgde.Logger = Logger;
})(ninlgde || (ninlgde = {}));
var ninlgde;
(function (ninlgde) {
    "use strict";
    var ObjectPool = /** @class */ (function () {
        function ObjectPool() {
        }
        return ObjectPool;
    }());
    ninlgde.ObjectPool = ObjectPool;
})(ninlgde || (ninlgde = {}));
var ninlgde;
(function (ninlgde) {
    "use strict";
    // class TimerCallback {
    //     public scope: any
    //     public handler: any
    //     public interval: number
    //     public repeat: number
    //     public delay: number 
    //     constructor(scope, handler, interval, repeat, delay) {
    //         this.scope = scope
    //         this.handler = handler
    //         this.interval = interval
    //         this.repeat = repeat
    //         this.delay = delay
    //     }
    //     public called() {
    //         this.repeat --;
    //     }
    //     public isDead() {
    //         return this.repeat == 0 // 无穷次就是-1
    //     }
    // }
    var Timer = /** @class */ (function () {
        function Timer() {
        }
        // private static timerMap: collection.Map<any, collection.OrderedMap<any, TimerCallback>>
        // private static checkMap() {
        //     if (this.timerMap != null) {
        //         return
        //     }
        //     this.timerMap = new collection.OrderedMap<any, collection.OrderedMap<any, TimerCallback>>()
        // }
        // private static getCallbacks(scope) {
        //     this.checkMap()
        //     let callbacks = this.timerMap.get(scope)
        //     if (callbacks == null) {
        //         callbacks = new collection.OrderedMap<any, TimerCallback>()
        //         this.timerMap.put(scope, callbacks)
        //     }
        //     return callbacks
        // }
        Timer.setTimer = function (scope, handler, interval, repeat, delay) {
            var scheduler = cc.director.getScheduler();
            scheduler.schedule(handler, scope, interval, repeat, delay);
        };
        Timer.cancelTimer = function (scope, handler) {
            var scheduler = cc.director.getScheduler();
            scheduler.unschedule(handler, scope);
        };
        return Timer;
    }());
    ninlgde.Timer = Timer;
})(ninlgde || (ninlgde = {}));
var ninlgde;
(function (ninlgde) {
    "use strict";
})(ninlgde || (ninlgde = {}));
var ninlgde;
(function (ninlgde) {
    "use strict";
})(ninlgde || (ninlgde = {}));
///<reference path='IState.ts'/>
///<reference path='IStateMachine.ts'/>
var ninlgde;
(function (ninlgde) {
    "use strict";
    var State = /** @class */ (function () {
        function State(stateId) {
            this._TAG = "State";
            // private static instance = null
            this.stateId = 0;
            this.generalCondition = null;
            this.stateId = stateId;
            this.generalCondition = [];
            // todo: log
        }
        State.prototype.init = function () {
            // todo: log
        };
        State.prototype.enter = function (machine) {
            // todo: log
        };
        State.prototype.exit = function (machine) {
            // todo: log
        };
        State.prototype.update = function (machine) {
        };
        State.prototype.getStateID = function () {
            return this.stateId;
        };
        // getSingleton(): IState {
        // }
        State.prototype.generalCheck = function (machine) {
            this.generalCondition.forEach(function (g) {
                var next = g(machine);
                return next || null;
            });
            return null;
        };
        return State;
    }());
    ninlgde.State = State;
})(ninlgde || (ninlgde = {}));
///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/INotifier.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/IFacade.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/patterns/facade/Facade.ts'/>
var puremvc;
(function (puremvc) {
    "use strict";
    /**
     * A base <code>INotifier</code> implementation.
     *
     * <code>MacroCommand</code>, <code>SimpleCommand</code>, <code>Mediator</code> and
     * <code>Proxy</code> all have a need to send <code>Notifications</code>.
     *
     * The <code>INotifier</code> interface provides a common method called
     * <code>sendNotification</code> that relieves implementation code of the necessity to actually
     * construct <code>Notification</code>s.
     *
     * The <code>INotifier</code> interface, which all of the above mentioned classes extend,
     * provides an initialized reference to the <code>Facade</code> singleton, which is required by
     * the convenience method <code>sendNotification</code>	for sending <code>Notifications</code>,
     * but it also eases implementation as these classes have frequent <code>Facade</code>
     * interactions and usually require access to the facade anyway.
     *
     * NOTE: In the MultiCore version of the framework, there is one caveat to notifiers, they
     * cannot send notifications or reach the facade until they have a valid multitonKey.
     *
     * The multitonKey is set:
     * <UL>
     * <LI>On a <code>ICommand</code> when it is executed by the <code>Controller</code>.
     * <LI>On a <code>IMediator</code> is registered with the <code>View</code>.
     * <LI>On a <code>IProxy</code> is registered with the <code>Model</code>.
     */
    var Notifier = /** @class */ (function () {
        function Notifier() {
            /**
             * The multiton key for this core.
             *
             * @protected
             */
            this.multitonKey = null;
        }
        /**
         * Initialize a <code>Notifier</code> instance with its cor multiton key.
         *
         * This is how a <code>Notifier</code> gets its multiton key. Calls to
         * <code>sendNotification <code> or to access the facade will fail until after this method
         * has been called.
         *
         * <code>Mediator</code>s, <code>Command</code>s or <code>Proxies</code> may override
         * this method in order to send notifications or access the multiton Facade instance as
         * soon as possible. They CANNOT access the facade in their constructors, since this
         * method will not yet have been called.
         *
         * @param key
         *		The multiton key for this <code>Notifier</code> to use.
         */
        Notifier.prototype.initializeNotifier = function (key) {
            this.multitonKey = key;
        };
        /**
         * Create and send a <code>Notification</code>.
         *
         * Keeps us from having to construct new <code>Notification</code> instances in our
         * implementation code.
         *
         * @param name
         * 		The name of the notification to send.
         *
         * @param body
         * 		The body of the notification.
         *
         * @param type
         * 		The type of the notification.
         */
        Notifier.prototype.sendNotification = function (name, body, type) {
            if (body === void 0) { body = null; }
            if (type === void 0) { type = null; }
            if (this.facade())
                this.facade().sendNotification(name, body, type);
        };
        /**
         * Return the multiton <code>Facade</code> instance.
         *
         * @return
         *		The multiton <code>Facade</code> instance.
         *
         * @throws
         *		Throws an error if the multiton key for this Notifier is not yet initialized.
         */
        Notifier.prototype.facade = function () {
            if (this.multitonKey === null)
                throw Error(Notifier.MULTITON_MSG);
            return puremvc.Facade.getInstance(this.multitonKey);
        };
        /**
         * Message Constants
         *
         * @constant
         * @protected
         */
        Notifier.MULTITON_MSG = "multitonKey for this Notifier not yet initialized!";
        return Notifier;
    }());
    puremvc.Notifier = Notifier;
})(puremvc || (puremvc = {}));
///<reference path='IState.ts'/>
///<reference path='IStateMachine.ts'/>
///<reference path="../../../../../org/puremvc/typescript/multicore/patterns/observer/Notifier.ts"/>
var ninlgde;
(function (ninlgde) {
    "use strict";
    var StateMachine = /** @class */ (function (_super) {
        __extends(StateMachine, _super);
        function StateMachine() {
            var _this = _super.call(this) || this;
            _this._TAG = "StateMachine";
            _this.preState = null;
            _this.curState = null;
            _this.nextState = null;
            return _this;
            // todo: log
        }
        StateMachine.prototype.destory = function () {
        };
        StateMachine.prototype.getPreState = function () {
            return this.preState;
        };
        StateMachine.prototype.getCurState = function () {
            return this.curState;
        };
        StateMachine.prototype.getNextState = function () {
            return this.nextState;
        };
        StateMachine.prototype.changeState = function (nextState) {
            // todo: log
            this.nextState = nextState;
            if (this.curState != null) {
                this.curState.exit(this);
            }
            this.preState = this.curState;
            this.curState = this.nextState;
            this.nextState = null;
            if (this.curState != null) {
                this.curState.enter(this);
            }
        };
        StateMachine.prototype.update = function () {
            if (this.curState == null) {
                return;
            }
            var next = this.curState.generalCheck(this);
            if (next) {
                this.changeState(next);
            }
            this.curState.update(this);
        };
        return StateMachine;
    }(puremvc.Notifier));
    ninlgde.StateMachine = StateMachine;
})(ninlgde || (ninlgde = {}));
///<reference path='../frame/utils/Logger.ts'/>
var ngame;
(function (ngame) {
    "use strict";
    // game的log
    ngame.logger = null;
    var NGame = /** @class */ (function () {
        function NGame() {
            this._TAG = "NGame";
        }
        NGame.create = function () {
            if (NGame.instance != null) {
                return false;
            }
            NGame.instance = new NGame();
            NGame.instance.init();
            return true;
        };
        NGame.getInstance = function () {
            return NGame.instance;
        };
        /**
         * frame初始化
         * 初始化所有不需要coocs支持的模块
         */
        NGame.prototype.init = function () {
            // 初始化框架log
            ngame.logger = new ninlgde.Logger(7, "NGAME");
            ngame.logger.info(this._TAG, "Ninlgde Game has initialized");
        };
        NGame.instance = null;
        return NGame;
    }());
    ngame.NGame = NGame;
})(ngame || (ngame = {}));
///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/ICommand.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/INotifier.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/INotification.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/patterns/observer/Notifier.ts'/>
var puremvc;
(function (puremvc) {
    "use strict";
    /**
     * A base <code>ICommand</code> implementation that executes other <code>ICommand</code>s.
     *
     * A <code>MacroCommand</code> maintains an list of <code>ICommand</code> constructor references
     * called <i>SubCommand</i>s.
     *
     * When <code>execute</code> is called, the <code>MacroCommand</code> instantiates and calls
     * <code>execute</code> on each of its <i>SubCommands</i> turn. Each <i>SubCommand</i> will be
     * passed a reference to the original <code>INotification</code> that was passed to the
     * <code>MacroCommand</code>'s <code>execute</code> method.
     *
     * Unlike <code>SimpleCommand</code>, your subclass should not override <code>execute</code>,
     * but instead, should override the <code>initializeMacroCommand</code> method, calling
     * <code>addSubCommand</code> once for each <i>SubCommand</i> to be executed.
     */
    var MacroCommand = /** @class */ (function (_super) {
        __extends(MacroCommand, _super);
        /**
         * Constructs a <code>MacroCommand</code> instance.
         *
         * You should not need to define a constructor in your subclasses, instead, override the
         * <code>initializeMacroCommand</code> method.
         *
         * If your subclass does define a constructor, be  sure to call <code>super()</code>.
         */
        function MacroCommand() {
            var _this = _super.call(this) || this;
            /**
             * An array of <code>ICommand</code>s.
             *
             * @protected
             */
            _this.subCommands = null;
            _this.subCommands = new Array();
            _this.initializeMacroCommand();
            return _this;
        }
        /**
         * Initialize the <code>MacroCommand</code>.
         *
         * In your subclass, override this method to  initialize the <code>MacroCommand</code>'s
         * <i>subCommand</i> list with <code>ICommand</code> class references like this:
         *
         * <pre>
         *		// Initialize MyMacroCommand
         *		initializeMacroCommand():void
         *		{
         *			this.addSubCommand( FirstCommand );
         *			this.addSubCommand( SecondCommand );
         *			this.addSubCommand( ThirdCommand );
         *		}
         * </pre>
         *
         * Note that <i>subCommand</i>s may be any <code>ICommand</code> implementor so
         * <code>MacroCommand</code>s or <code>SimpleCommand</code>s are both acceptable.
         *
         * @protected
         */
        MacroCommand.prototype.initializeMacroCommand = function () {
        };
        /**
         * Add an entry to the <i>subCommands</i> list.
         *
         * The <i>subCommands</i> will be called in First In/First Out (FIFO) order.
         *
         * @param commandClassRef
         *		A reference to the constructor of the <code>ICommand</code>.
         *
         * @protected
         */
        MacroCommand.prototype.addSubCommand = function (commandClassRef) {
            this.subCommands.push(commandClassRef);
        };
        /**
         * Execute this <code>MacroCommand</code>'s <i>SubCommands</i>.
         *
         * The <i>SubCommands</i> will be called in First In/First Out (FIFO)
         * order.
         *
         * @param notification
         *		The <code>INotification</code> object to be passed to each <i>SubCommand</i> of
         *		the list.
         *
         * @final
         */
        MacroCommand.prototype.execute = function (notification) {
            var subCommands = this.subCommands.slice(0);
            var len = this.subCommands.length;
            for (var i = 0; i < len; i++) {
                /*
                 * Typed any here instead of <code>Function</code> ( won't compile if set to Function
                 * because today the compiler consider that <code>Function</code> is not newable and
                 * doesn't have a <code>Class</code> type)
                 */
                var commandClassRef = subCommands[i];
                var commandInstance = new commandClassRef();
                commandInstance.initializeNotifier(this.multitonKey);
                commandInstance.execute(notification);
            }
            this.subCommands.splice(0);
        };
        return MacroCommand;
    }(puremvc.Notifier));
    puremvc.MacroCommand = MacroCommand;
})(puremvc || (puremvc = {}));
///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/ICommand.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/INotifier.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/INotification.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/patterns/observer/Notifier.ts'/>
var puremvc;
(function (puremvc) {
    "use strict";
    /**
     * A base <code>ICommand</code> implementation.
     *
     * Your subclass should override the <code>execute</code> method where your business logic will
     * handle the <code>INotification</code>.
     */
    var SimpleCommand = /** @class */ (function (_super) {
        __extends(SimpleCommand, _super);
        function SimpleCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Fulfill the use-case initiated by the given <code>INotification</code>.
         *
         * In the Command Pattern, an application use-case typically begins with some user action,
         * which results in an <code>INotification</code> being broadcast, which is handled by
         * business logic in the <code>execute</code> method of an <code>ICommand</code>.
         *
         * @param notification
         * 		The <code>INotification</code> to handle.
         */
        SimpleCommand.prototype.execute = function (notification) {
        };
        return SimpleCommand;
    }(puremvc.Notifier));
    puremvc.SimpleCommand = SimpleCommand;
})(puremvc || (puremvc = {}));
///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/IMediator.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/INotifier.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/INotification.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/patterns/observer/Notifier.ts'/>
var puremvc;
(function (puremvc) {
    "use strict";
    /**
     * A base <code>IMediator</code> implementation.
     *
     * Typically, a <code>Mediator</code> will be written to serve one specific control or group
     * controls and so, will not have a need to be dynamically named.
     */
    var Mediator = /** @class */ (function (_super) {
        __extends(Mediator, _super);
        /**
         * Constructs a <code>Mediator</code> instance.
         *
         * @param mediatorName
         * 		The name of the <code>Mediator</code>.
         *
         * @param viewComponent
         * 		The view component handled by this <code>Mediator</code>.
         */
        function Mediator(mediatorName, viewComponent) {
            if (mediatorName === void 0) { mediatorName = null; }
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this) || this;
            /**
             * The name of the <code>Mediator</code>.
             *
             * @protected
             */
            _this.mediatorName = null;
            /**
             * The <code>Mediator</code>'s view component.
             *
             * @protected
             */
            _this.viewComponent = null;
            _this.mediatorName = (mediatorName != null) ? mediatorName : Mediator.NAME;
            _this.viewComponent = viewComponent;
            return _this;
        }
        /**
         * Get the <code>Mediator</code> instance name.
         *
         * @return
         * 		The <code>Mediator</code> instance name
         */
        Mediator.prototype.getMediatorName = function () {
            return this.mediatorName;
        };
        /**
         * Get the <code>Mediator</code>'s view component.
         *
         * Additionally, an implicit getter will usually be defined in the subclass that casts the
         * view object to a type, like this:
         *
         * <code>
         *		getMenu():Menu
         *		{
         *			return <Menu> this.viewComponent;
         *		}
         * </code>
         *
         * @return
         * 		The <code>Mediator</code>'s default view component.
         */
        Mediator.prototype.getViewComponent = function () {
            return this.viewComponent;
        };
        /**
         * Set the <code>IMediator</code>'s view component.
         *
         * @param viewComponent
         * 		The default view component to set for this <code>Mediator</code>.
         */
        Mediator.prototype.setViewComponent = function (viewComponent) {
            this.viewComponent = viewComponent;
        };
        /**
         * List the <code>INotification</code> names this <code>IMediator</code> is interested in
         * being notified of.
         *
         * @return
         * 		The list of notifications names in which is interested the <code>Mediator</code>.
         */
        Mediator.prototype.listNotificationInterests = function () {
            return new Array();
        };
        /**
         * Handle <code>INotification</code>s.
         *
         *
         * Typically this will be handled in a switch statement, with one 'case' entry per
         * <code>INotification</code> the <code>Mediator</code> is interested in.
         *
         * @param notification
         * 		The notification instance to be handled.
         */
        Mediator.prototype.handleNotification = function (notification) {
        };
        /**
         * Called by the View when the Mediator is registered. This method has to be overridden
         * by the subclass to know when the instance is registered.
         */
        Mediator.prototype.onRegister = function () {
        };
        /**
         * Called by the View when the Mediator is removed. This method has to be overridden
         * by the subclass to know when the instance is removed.
         */
        Mediator.prototype.onRemove = function () {
        };
        /**
         * Default name of the <code>Mediator</code>.
         *
         * @constant
         */
        Mediator.NAME = 'Mediator';
        return Mediator;
    }(puremvc.Notifier));
    puremvc.Mediator = Mediator;
})(puremvc || (puremvc = {}));
///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/IProxy.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/interfaces/INotifier.ts'/>
///<reference path='../../../../../../org/puremvc/typescript/multicore/patterns/observer/Notifier.ts'/>
var puremvc;
(function (puremvc) {
    "use strict";
    /**
     * A base <code>IProxy</code> implementation.
     *
     * In PureMVC, <code>IProxy</code> implementors assume these responsibilities:
     * <UL>
     * <LI>Implement a common method which returns the name of the <code>Proxy</code>.
     * <LI>Provide methods for setting and getting the data object.
     *
     * Additionally, <code>IProxy</code> typically:
     * <UL>
     * <LI>Maintain references to one or more pieces of model data.
     * <LI>Provide methods for manipulating that data.
     * <LI>Generate <code>INotification</code>s when their model data changes.
     * <LI>Expose their name as a <code>constant</code> called <code>NAME</code>, if they are not
     * instantiated multiple times.
     * <LI>Encapsulate interaction with local or remote services used to fetch and persist model
     * data.
     */
    var Proxy = /** @class */ (function (_super) {
        __extends(Proxy, _super);
        /**
         * Constructs a <code>Proxy</code> instance.
         *
         * @param proxyName
         * 		The name of the <code>Proxy</code> instance.
         *
         * @param data
         * 		An initial data object to be held by the <code>Proxy</code>.
         */
        function Proxy(proxyName, data) {
            if (proxyName === void 0) { proxyName = null; }
            if (data === void 0) { data = null; }
            var _this = _super.call(this) || this;
            /**
             * The name of the <code>Proxy</code>.
             *
             * @protected
             */
            _this.proxyName = null;
            /**
             * The data object controlled by the <code>Proxy</code>.
             *
             * @protected
             */
            _this.data = null;
            _this.proxyName = (proxyName != null) ? proxyName : Proxy.NAME;
            if (data != null)
                _this.setData(data);
            return _this;
        }
        /**
         * Get the name of the <code>Proxy></code> instance.
         *
         * @return
         * 		The name of the <code>Proxy></code> instance.
         */
        Proxy.prototype.getProxyName = function () {
            return this.proxyName;
        };
        /**
         * Set the data of the <code>Proxy></code> instance.
         *
         * @param data
         * 		The data to set for the <code>Proxy></code> instance.
         */
        Proxy.prototype.setData = function (data) {
            this.data = data;
        };
        /**
         * Get the data of the <code>Proxy></code> instance.
         *
         * @return
         * 		The data held in the <code>Proxy</code> instance.
         */
        Proxy.prototype.getData = function () {
            return this.data;
        };
        /**
         * Called by the Model when the <code>Proxy</code> is registered. This method has to be
         * overridden by the subclass to know when the instance is registered.
         */
        Proxy.prototype.onRegister = function () {
        };
        /**
         * Called by the Model when the <code>Proxy</code> is removed. This method has to be
         * overridden by the subclass to know when the instance is removed.
         */
        Proxy.prototype.onRemove = function () {
        };
        /**
         * The default name of the <code>Proxy</code>
         *
         * @type
         * @constant
         */
        Proxy.NAME = "Proxy";
        return Proxy;
    }(puremvc.Notifier));
    puremvc.Proxy = Proxy;
})(puremvc || (puremvc = {}));
