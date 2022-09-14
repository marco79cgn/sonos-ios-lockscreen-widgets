// the node sonos http api base url (running on your Pi for example)
const SONOS_BASE_URL = "http://192.168.178.10:5005"
// the sonos speaker name to monitor
const SONOS_ROOM = "kitchen"

const SONOS_IMG_URL = "https://pisces.bbystatic.com/image2/BestBuy_US/Gallery/sonos_logo_white_2.png"
let nowPlaying = await loadNowPlaying()
let widget = await createWidget(nowPlaying)
widget.url = "sonos://"
Script.setWidget(widget)
Script.complete()

widget.presentSmall()

async function createWidget(nowPlaying) {
  let widget = new ListWidget()

  widget.backgroundColor = Color.lightGray()

  let headerStack = widget.addStack()
  headerStack.layoutHorizontally()
  let symbolSpeaker = headerStack.addImage(SFSymbol.named("speaker.wave.2").image)
  symbolSpeaker.imageSize = new Size(25, 25)
  headerStack.addSpacer(5)
  let logoStack = headerStack.addStack()
  logoStack.layoutVertically()
  let sonosLogo = await getImage("sonos-logo.png")
  logoStack.addSpacer(3)
  let image = logoStack.addImage(sonosLogo)
  image.imageSize = new Size(40, 20)

  // add title and artist
  if(!nowPlaying) {
    let pauseText = widget.addText("Connection to Sonos failed.")
    pauseText.font = Font.semiboldSystemFont(12)
    pauseText.textColor = Color.white()
  } else if (nowPlaying.currentTrack) {
    albumArtUrl = nowPlaying.currentTrack.albumArtUri
    let shortTitle = ""
    let artist = nowPlaying.currentTrack.artist
    if (nowPlaying.currentTrack.type === "radio") {
      if (nowPlaying.currentTrack.title && nowPlaying.currentTrack.title.indexOf("x-sonosapi") === -1) {
        const demasterResult = demasterRadio(nowPlaying.currentTrack.title, artist)
        if(demasterResult.title) {
          shortTitle = demasterResult.title
        }
        if(demasterResult.artist) {
          artist = demasterResult.artist
        }

      }
    } else {
      shortTitle = demaster(nowPlaying.currentTrack.title)
    }
    let titleTxt = widget.addText(shortTitle)
    titleTxt.font = Font.semiboldSystemFont(11)
    titleTxt.textColor = Color.white()
    // titleTxt.minimumScaleFactor = 0.8

    let artistTxt = widget.addText(artist)
    artistTxt.font = Font.lightRoundedSystemFont(12)
  } else {
    let pauseText = widget.addText("Playback paused.")
    pauseText.font = Font.semiboldSystemFont(12)
    pauseText.textColor = Color.white()
  }

  return widget
}

// load current track information
async function loadNowPlaying() {
  let url = SONOS_BASE_URL + "/" + SONOS_ROOM + "/state"
  let req = new Request(url)
  req.allowInsecureRequest = true
  try {
    let json = await req.loadJSON()
    if(req.response.statusCode == 200) {
      return json
    }
  } catch(e) {
    console.log(e)
  }
  return null
}

// download an image from a given url
async function loadImage(imgUrl) {
  let req = new Request(imgUrl)
  req.allowInsecureRequest = true
  let image = await req.loadImage()
  return image
}

// get image from local filestore or download it only once
async function getImage(image) {
  let fm = FileManager.local()
  let dir = fm.documentsDirectory()
  let path = fm.joinPath(dir, image)
  if (fm.fileExists(path)) {        
      return fm.readImage(path)
  } else {
      // download once
      let imageUrl
      switch (image) {
          case 'sonos-logo.png':
              imageUrl = SONOS_IMG_URL
              break
          default:
              console.log(`Sorry, couldn't find ${image}.`);
      }
      let iconImage = await loadImage(imageUrl)
      fm.writeImage(path, iconImage)
      return iconImage
  }
}

// cleanup song titles
function demaster(trackName) {
  if (trackName != null && trackName.length > 0) {
    let shortenedTrackName = trackName.split(" - ")
    shortenedTrackName = shortenedTrackName[0].split(" (Live")
    shortenedTrackName = shortenedTrackName[0].split(" (feat")
    shortenedTrackName = shortenedTrackName[0].split(" (")
//     console.log("short name: " + shortenedTrackName[0])
    return shortenedTrackName[0]
  } else {
    return trackName
  }
}

// cleanup song titles on radio stations and separate artist & title
function demasterRadio(trackName, artist) {
  let title="";
  trackName = trackName.replaceAll("\"", "")
  let shortenedTrackName = trackName.split(" |")
  shortenedTrackName = shortenedTrackName[0].split(" --")
  if(artist === "Retrowelle") {
    let artistAndTitle = shortenedTrackName[0].split(" - ")
    artist = artistAndTitle[0]
    title = demaster(artistAndTitle[1])
  } else if(artist.indexOf("SWR1") >=0) {
    console.log("SWR1 detected.")
    let artistAndTitle = shortenedTrackName[0].split(" / ")
    artist = artistAndTitle[0]
    title = demaster(artistAndTitle[1])
  } else if(artist.indexOf("SWR3") >=0) {
    let titleAndArtist = shortenedTrackName[0].split(" / ")
    artist = titleAndArtist[1]
    title = demaster(titleAndArtist[0])
  } else if(artist.indexOf("hr 1") >=0 || artist.startsWith("80s80s") || artist.startsWith("Absolut") || artist.startsWith("WDR")) {
    let artistAndTitle = shortenedTrackName[0].split(" - ")
    artist = artistAndTitle[0]
    title = demaster(artistAndTitle[1])
  } else if(artist.indexOf("Bayern 1") >=0) {
    let artistAndTitle = shortenedTrackName[0].split(": ")
    artist = artistAndTitle[0]
    title = demaster(artistAndTitle[1])
  }
  return {
    artist: artist
    ,title: title
  };
}
