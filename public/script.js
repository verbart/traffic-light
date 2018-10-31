function TrafficLight(parentNode) {
  this.isAllowed = false;
  this.interval = 3;
  this.counter = this.interval;

  this.init(parentNode);
}

TrafficLight.prototype.init = function (parentNode) {
  var templateHTML = document.getElementById('trafficLight__template').innerHTML;
  var templateWrapper = document.createElement('div');

  templateWrapper.innerHTML = templateHTML;

  this.templateNode = document.importNode(templateWrapper.firstElementChild, true);
  this.allowedLight = this.templateNode.querySelector('.trafficLight__lamp_allowed');
  this.forbiddenLight = this.templateNode.querySelector('.trafficLight__lamp_forbidden');

  parentNode.append(this.templateNode);

  this.start();
};

TrafficLight.prototype.start = function () {
  this.toggleLights();

  this.timer = setInterval(() => {
    this.counter--;

    this.toggleLights();

    if (this.counter === 0) {
      this.isAllowed = !this.isAllowed;
      this.counter = this.interval;

      this.toggleLights();
    }
  }, 1000);
};

TrafficLight.prototype.toggleLights = function () {
  var prevElement = this.isAllowed ? this.forbiddenLight : this.allowedLight;
  var nextElement = this.isAllowed ? this.allowedLight : this.forbiddenLight;

  prevElement.classList.remove('trafficLight__lamp_active');
  nextElement.classList.add('trafficLight__lamp_active');

  prevElement.textContent = this.counter || '';
};


for (let i = 0; i < 14; i++) new TrafficLight(document.querySelector('.container'));
