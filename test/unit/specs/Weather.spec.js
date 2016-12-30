import Vue from 'vue'
import Weather from 'src/components/Weather'

describe('Weather.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Weather)
    })
    expect(vm.$el.querySelector('#weather h1').textContent)
      .to.equal('Free Code Camp')
    expect(vm.$el.querySelector('#weather h1:nth-of-type(2)').textContent)
      .to.equal('Weather App')
  })
})