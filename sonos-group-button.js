// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: plus-circle;
let widget = await createWidget()
Script.setWidget(widget)
Script.complete()
// widget.presentSmall()

async function createWidget() {
  let widget = new ListWidget()
  // load symbol image
  let symbolSpeaker = widget.addImage(SFSymbol.named("hifispeaker.2").image)
  symbolSpeaker.imageSize = new Size(45,45)
  symbolSpeaker.centerAlignImage()
  
  return widget
}

// Use this icon in your lock screen and assign a the SonosBot Shortcut to it from the Soro app (which I slightly modified).
