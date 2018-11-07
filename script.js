function TrafficLightWidget(parentNode) {
  this.init(parentNode);

  return {
    getElement: this.getWidgetElement.bind(this),
    playTrafficLight: this.playTrafficLight.bind(this),
    pauseTrafficLight: this.pauseTrafficLight.bind(this),
    stopTrafficLight: this.stopTrafficLight.bind(this),
    resetTrafficLight: this.resetTrafficLight.bind(this)
  };
}

TrafficLightWidget.prototype.init = function (parentNode) {
  this.isAllowed = false;
  this.isEnabled = false;
  this.interval = 3;
  this.counter = this.interval;
  this.widgetElement = this.createWidgetElement();
  this.allowedLight = this.widgetElement.querySelector('.trafficLight__lamp_allowed');
  this.forbiddenLight = this.widgetElement.querySelector('.trafficLight__lamp_forbidden');

  this.widgetElement.addEventListener('click', this.onAction.bind(this));

  parentNode && parentNode.append(this.widgetElement);
};

TrafficLightWidget.prototype.createWidgetElement = function () {
  var templateHTML = document.getElementById('trafficLight__template').innerHTML;
  var templateWrapper = document.createElement('div');

  templateWrapper.innerHTML = templateHTML;

  return templateWrapper.firstElementChild;
};

TrafficLightWidget.prototype.onAction = function (e) {
  var action = e.target.getAttribute('data-action');

  if (action) {
    this[action]();
  }
};

TrafficLightWidget.prototype.getWidgetElement = function () {
  return this.widgetElement;
};

TrafficLightWidget.prototype.render = function () {
  var prevLightElement = this.isAllowed ? this.forbiddenLight : this.allowedLight;
  var nextLightElement = this.isAllowed ? this.allowedLight : this.forbiddenLight;

  if (this.isEnabled) {
    prevLightElement.classList.remove('trafficLight__lamp_active');
    prevLightElement.textContent = this.counter || '';

    nextLightElement.classList.add('trafficLight__lamp_active');
  } else {
    prevLightElement.textContent = '';
    nextLightElement.textContent = '';

    prevLightElement.classList.remove('trafficLight__lamp_active');
    nextLightElement.classList.remove('trafficLight__lamp_active');
  }
};

TrafficLightWidget.prototype.playTrafficLight = function () {
  this.isEnabled = true;

  this.render();

  this.timer = this.timer || setInterval(() => {
    this.counter--;

    this.render();

    if (this.counter === 0) {
      this.isAllowed = !this.isAllowed;
      this.counter = this.interval;

      this.render();
    }
  }, 1000);
};

TrafficLightWidget.prototype.pauseTrafficLight = function () {
  clearInterval(this.timer);
  this.timer = null;
};

TrafficLightWidget.prototype.stopTrafficLight = function () {
  this.pauseTrafficLight();

  this.isEnabled = false;
  this.isAllowed = false;
  this.counter = this.interval;

  this.render();
};

TrafficLightWidget.prototype.resetTrafficLight = function () {
  this.stopTrafficLight();
  this.playTrafficLight();
};

var container = document.querySelector('.container');
var trafficLight = new TrafficLightWidget(container);
var trafficLight2 = new TrafficLightWidget(container);

trafficLight.playTrafficLight();

setTimeout(function () {
  trafficLight2.playTrafficLight();
}, 1500);
