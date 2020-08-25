document.addEventListener('DOMContentLoaded', () => {

  let steps = Array.from(document.querySelectorAll('.maintenance__wizard-stage')),
    progress = document.querySelector('.maintenance__wizard-progressfill'),
    increment = 100 / steps.length;

  progress.style.width = `${increment / 2}%`;

  steps[0].classList.add('current');

  steps.forEach(function(step) {

    step.addEventListener('click', () => {
    steps.forEach((s) => { s.classList.remove('current') });
    step.classList.toggle('current');
    adjustProgress();
    })
  })

  function adjustProgress() {
  let index = steps.findIndex((el) => {return el.classList.contains('current')}),
      width = index == steps.length - 1 ? 100 : (increment * index) + (increment / 2);
  progress.style.width = `${width}%`;
  }

})
