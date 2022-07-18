(()=>{"use strict";var e=document.querySelector(".profile"),t=e.querySelector(".profile__edit-btn"),n=e.querySelector(".profile__add-btn"),r=(document.querySelector(".cards"),{formSelector:".form",inputSelector:".form__item",submitButtonSelector:".form__button",errorElementSelector:".form__item-error",inactiveButtonClass:"form__button_disabled",inputErrorClass:"form__item_type_error",errorClass:"form__item-error_active"});function o(e){var t=e.split("-");return t[0]+"".concat(t[1][0].toUpperCase()).concat(t[1].slice(1))}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function a(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u=a((function e(t,n,r){var o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),c(this,"generateCard",(function(){return o._cardImage.src=o._link,o._cardImage.alt=o._name,o._cardDescription.textContent=o._name,o._setEventListeners(),o._cardElement})),c(this,"_handleImageClick",(function(){o._handleCardClick({name:o._name,link:o._link})})),c(this,"_handleLikeCard",(function(){o._cardLikeButton.classList.toggle("card__icon_active")})),c(this,"_handleDeleteCard",(function(){o._cardElement.remove()})),c(this,"_setEventListeners",(function(){o._cardImage.addEventListener("click",o._handleImageClick),o._cardLikeButton.addEventListener("click",o._handleLikeCard),o._cardDeleteButton.addEventListener("click",o._handleDeleteCard)})),this._name=t.name,this._link=t.link,this._templateSelector=n,this._handleCardClick=r,this._cardElement=document.querySelector(this._templateSelector).content.querySelector(".card").cloneNode(!0),this._cardImage=this._cardElement.querySelector(".card__image"),this._cardDescription=this._cardElement.querySelector(".card__description"),this._cardLikeButton=this._cardElement.querySelector(".card__icon"),this._cardDeleteButton=this._cardElement.querySelector(".card__delete-btn")}));function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(e,t,n){return t&&l(e.prototype,t),n&&l(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var f=s((function e(t,n){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),p(this,"_showInputError",(function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r._inputErrorClass),o.textContent=n,o.classList.add(r._errorClass)})),p(this,"_hideInputError",(function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r._inputErrorClass),n.classList.remove(r._errorClass),n.textContent=""})),p(this,"_hasInvalidInput",(function(e){return Array.from(e).some((function(e){return!e.validity.valid}))})),p(this,"_toggleButtonState",(function(){r._hasInvalidInput(r._inputList)?(r._submitButtonElement.classList.add(r._inactiveButtonClass),r._submitButtonElement.setAttribute("disabled",!0)):(r._submitButtonElement.classList.remove(r._inactiveButtonClass),r._submitButtonElement.removeAttribute("disabled"))})),p(this,"resetValidation",(function(){r._toggleButtonState(),r._inputList.forEach((function(e){return r._hideInputError(r._formElement,e)}))})),p(this,"_checkInputValidity",(function(e,t){t.validity.valid?r._hideInputError(e,t):r._showInputError(e,t,t.validationMessage)})),p(this,"_setEventListeners",(function(){r._inputList.forEach((function(e){e.addEventListener("input",(function(){r._checkInputValidity(r._formElement,e),r._toggleButtonState()}))}))})),p(this,"enableValidation",(function(){r._formElement.addEventListener("submit",(function(e){return e.preventDefault()})),r._setEventListeners()})),this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._errorElementSelector=t.errorElementSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._formSelector=n,this._formElement=document.querySelector(this._formSelector),this._inputList=this._formElement.querySelectorAll(this._inputSelector),this._submitButtonElement=this._formElement.querySelector(this._submitButtonSelector)}));function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e,t,n){return t&&d(e.prototype,t),n&&d(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var _=m((function e(t,n){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),y(this,"prependItem",(function(e){r._container.prepend(e)})),y(this,"addItem",(function(e){r._container.append(e)})),y(this,"renderItems",(function(e){e.forEach((function(e){return r._renderer(e)}))})),this._renderer=t,this._container=document.querySelector(n)}));function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var v=function(){function e(t){var n,r,o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r=function(e){"Escape"===e.key&&o.close()},(n="_handleEscClose")in this?Object.defineProperty(this,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[n]=r,this._popupSelector=t,this._popupElement=document.querySelector(t)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popupElement.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popupElement.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){var e=this;this._popupElement.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_opened")&&e.close(),t.target.classList.contains("popup__close-btn")&&e.close()}))}}])&&h(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function b(e){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},b(e)}function E(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function g(){return g="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=w(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},g.apply(this,arguments)}function w(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=O(e)););return e}function k(e,t){return k=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},k(e,t)}function S(e,t){if(t&&("object"===b(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function O(e){return O=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},O(e)}var C=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&k(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=O(r);if(o){var n=O(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return S(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._popupImage=t._popupElement.querySelector(".popup__image"),t._popupCaption=t._popupElement.querySelector(".popup__image-description"),t}return t=a,(n=[{key:"open",value:function(e){g(O(a.prototype),"open",this).call(this),this._popupImage.src=e.link,this._popupImage.alt=e.name,this._popupCaption.textContent=e.name}}])&&E(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(v);function j(e){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},j(e)}function L(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function P(){return P="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=I(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},P.apply(this,arguments)}function I(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=x(e)););return e}function B(e,t){return B=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},B(e,t)}function q(e,t){if(t&&("object"===j(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function x(e){return x=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},x(e)}var R=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&B(e,t)}(c,e);var t,n,r,i,a=(r=c,i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=x(r);if(i){var n=x(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return q(this,e)});function c(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(n=a.call(this,e))._formElement=n._popupElement.querySelector(".form"),n.inputList=n._formElement.querySelectorAll(".form__item"),n._handleFormSubmit=t,n}return t=c,(n=[{key:"_getInputValues",value:function(){var e={};return this.inputList.forEach((function(t){e[o(t.name)]=t.value})),e}},{key:"close",value:function(){P(x(c.prototype),"close",this).call(this),this._formElement.reset()}},{key:"setEventListeners",value:function(){var e=this;P(x(c.prototype),"setEventListeners",this).call(this),this._formElement.addEventListener("submit",(function(t){return e._handleFormSubmit(t,e._getInputValues())}))}}])&&L(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),c}(v);function D(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var T=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameElement=document.querySelector(t),this._activityElement=document.querySelector(n)}var t,n;return t=e,n=[{key:"getUserInfo",value:function(){var e={};return e.userName=this._nameElement.textContent,e.userActivity=this._activityElement.textContent,e}},{key:"setUserInfo",value:function(e){var t=e.name,n=e.activity;this._nameElement.textContent=t,this._activityElement.textContent=n}}],n&&D(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),V=new f(r,".form_type_user");V.enableValidation();var A=new f(r,".form_type_card");A.enableValidation();var U=new C(".popup_type_image");U.setEventListeners();var N=function(e){var t=e.name,n=e.link;U.open({name:t,link:n})},F=function(e){return new u(e,"#card-template",N).generateCard()},z=new _((function(e){var t=F(e);z.addItem(t)}),".cards");z.renderItems([{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}]);var M=new R(".popup_type_user",(function(e,t){var n=t.userName,r=t.userActivity;e.preventDefault(),G.setUserInfo({name:n,activity:r}),M.close()}));M.setEventListeners();var G=new T(".profile__name",".profile__activity"),H=new R(".popup_type_card",(function(e,t){var n=t.cardName,r=t.cardLink;e.preventDefault();var o=F({name:n,link:r});z.prependItem(o),H.close()}));H.setEventListeners(),t.addEventListener("click",(function(){var e=G.getUserInfo();M.inputList.forEach((function(t){t.value=e[o(t.name)]})),V.resetValidation(),M.open()})),n.addEventListener("click",(function(){A.resetValidation(),H.open()}))})();