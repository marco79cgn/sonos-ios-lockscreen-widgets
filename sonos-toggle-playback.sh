// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: play;
const SONOS_BASE_URL = "http://192.168.178.10:5005"
const SONOS_ROOM = "kitchen"

let widget = await createWidget()
Script.setWidget(widget)
Script.complete()
// widget.presentSmall()

async function createWidget() {
 
  let widget = new ListWidget()

  // load symbol image
  let symbolSpeaker = widget.addImage(SFSymbol.named("playpause.fill").image)
  symbolSpeaker.imageSize = new Size(45,45)
  symbolSpeaker.centerAlignImage()
  
  if(config.runsInApp) {
    await togglePlayback()
  }
  
  return widget
}


  
// toggle playback by using node-sonos-http-api
async function togglePlayback() {
  let request = new Request(SONOS_BASE_URL + "/" + SONOS_ROOM +"/playpause")
    request.allowInsecureRequest = true
    let json = await request.loadJSON()
    return json
}
