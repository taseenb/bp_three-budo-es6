const html = `
<div id="loader"></div>

<div id="ui-btn">
    <span class="show">Info</span>
    <span class="hide">Hide info</span>
</div>

<div id="ui" class="show">
    <div class="info">
        <h3>Proto</h3>
        <p>
            <span class="credits">@taseenb // Esteban Almiron</span>
        </p>
    </div>
</div>


<!-- <div id="captureBtn" class="off hide-mobile">
    <span class="capture">Capture</span>
    <span class="capturing">Capturing...</span>
</div> -->
`

class ui {
  constructor (stats) {
    const body = (this.body = document.body)
    body.classList.add('show-loader')

    // append html to body
    body.innerHTML = html + body.innerHTML

    document.getElementById('ui-btn').addEventListener('click', () => {
      body.classList.toggle('show-ui')
    })
  }

  appendStats (statsDom) {
    if (statsDom) {
      document.getElementById('ui').appendChild(statsDom)
    }

    return this
  }

  removeLoader () {
    document.body.classList.remove('show-loader')
    document.body.classList.add('show-ui-btn')

    return this
  }
}

module.exports = ui
