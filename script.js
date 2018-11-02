function TrafficLightWidget(parentNode) {
  this.init(parentNode);

  return {
    getElement: this.getWidgetElement.bind(this),
    playTrafficLight: this.playTrafficLight.bind(this),
    pauseTrafficLight: this.pauseTrafficLight.bind(this),
    disableTrafficLight: this.disableTrafficLight.bind(this),
    resetTrafficLight: this.resetTrafficLight.bind(this)
  };
}

TrafficLightWidget.prototype.init = function (parentNode) {
  this.isAllowed = false;
  this.interval = 3;
  this.counter = this.interval;
  this.widgetElement = this.createWidgetElement();
  this.allowedLight = this.widgetElement.querySelector('.trafficLight__lamp_allowed');
  this.forbiddenLight = this.widgetElement.querySelector('.trafficLight__lamp_forbidden');

  parentNode && parentNode.append(this.widgetElement);
};

TrafficLightWidget.prototype.createWidgetElement = function () {
  var templateHTML = document.getElementById('trafficLight__template').innerHTML;
  var templateWrapper = document.createElement('div');

  templateWrapper.innerHTML = templateHTML;

  return document.importNode(templateWrapper.firstElementChild, true);
};

TrafficLightWidget.prototype.getWidgetElement = function () {
  return this.widgetElement;
};

TrafficLightWidget.prototype.render = function () {
  var prevLightElement = this.isAllowed ? this.forbiddenLight : this.allowedLight;
  var nextLightElement = this.isAllowed ? this.allowedLight : this.forbiddenLight;

  prevLightElement.classList.remove('trafficLight__lamp_active');
  nextLightElement.classList[this.isEnabled ? 'add' : 'remove']('trafficLight__lamp_active');

  prevLightElement.textContent = this.isEnabled ? this.counter || '' : '';
};

TrafficLightWidget.prototype.playTrafficLight = function () {
  this.isEnabled = true;
  this.render();

  this.timer = setInterval(() => {
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
};

TrafficLightWidget.prototype.disableTrafficLight = function () {
  this.pauseTrafficLight();

  this.isEnabled = false;
  this.counter = this.interval;

  this.render();
};

TrafficLightWidget.prototype.resetTrafficLight = function () {
  this.disableTrafficLight();
  this.playTrafficLight();
};

var container = document.querySelector('.container');
var trafficLight = new TrafficLightWidget(container);

trafficLight.playTrafficLight();
