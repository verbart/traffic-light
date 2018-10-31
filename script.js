class TrafficLight {
  constructor (parentNode) {
    this.isAllowed = false;
    this.interval = 3;
    this.counter = this.interval;

    this.init(parentNode);
  }

  init(parentNode) {
    const templateHTML = document.getElementById('trafficLight__template').innerHTML;
    const templateWrapper = document.createElement('div');

    templateWrapper.innerHTML = templateHTML;

    this.templateNode = document.importNode(templateWrapper.firstElementChild, true);
    this.allowedLight = this.templateNode.querySelector('.trafficLight__lamp_allowed');
    this.forbiddenLight = this.templateNode.querySelector('.trafficLight__lamp_forbidden');

    parentNode.append(this.templateNode);

    this.start();
  }

  start() {
    this.timer = setInterval(() => {
      this.toggleLights();

      if (this.counter === 0) {
        this.isAllowed = !this.isAllowed;
        this.counter = this.interval;
        this.toggleLights();
      }

      this.counter--;
    }, 1000);
  }

  toggleLights() {
    if (this.isAllowed) {
      this.forbiddenLight.classList.remove('trafficLight__lamp_active');
      this.allowedLight.classList.add('trafficLight__lamp_active');

      this.forbiddenLight.textContent = this.counter || '';
    } else {
      this.allowedLight.classList.remove('trafficLight__lamp_active');
      this.forbiddenLight.classList.add('trafficLight__lamp_active');

      this.allowedLight.textContent = this.counter || '';
    }
  }
}

for (let i = 0; i < 14; i++) new TrafficLight(document.querySelector('.container'));
