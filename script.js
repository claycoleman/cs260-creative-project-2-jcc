var loading = 2;
var trendingTracks = [];
var trendingAlbums = [];

var searchText = '';

const COUNTRY_CODE_MAPPING = {
  us: 'United States',
  gb: 'Britain',
  de: 'Germany',
  fr: 'France',
  it: 'Italy',
};
let current_country_code = 'us';

function renderCountrySelect() {
  let choicesHTML = '';
  for (const countryCode in COUNTRY_CODE_MAPPING) {
    if (COUNTRY_CODE_MAPPING.hasOwnProperty(countryCode)) {
      const countryName = COUNTRY_CODE_MAPPING[countryCode];
      choicesHTML += '<option value="' + countryCode + '">' + countryName + '</option> ';
    }
  }
  document.getElementById('countrySelect').innerHTML = choicesHTML;
}
renderCountrySelect();

function startLoading() {
  document.getElementById('loading').setAttribute('class', '');
  document.getElementById('results').setAttribute('class', 'loading');
  document.getElementById('mainResults').setAttribute('class', 'hidden');
}

function startApp() {
  document.getElementById('loading').setAttribute('class', 'hidden');
  document.getElementById('results').setAttribute('class', '');
  document.getElementById('mainResults').setAttribute('class', '');
  document.getElementById('locationName').innerText = COUNTRY_CODE_MAPPING[current_country_code];

  renderTracks();
  renderAlbums();
}

function loadTrendingTracks() {
  const tracksURL =
    'https://theaudiodb.com/api/v1/json/1/trending.php?country=us&type=itunes&format=singles&country=' +
    current_country_code +
    '&type=itunes&format=singles';
  fetch(tracksURL)
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(json) {
      trendingTracks = json.trending;
      trendingTracks.sort(function(a, b) {
        return parseInt(a.intChartPlace) - parseInt(b.intChartPlace);
      });
      loading -= 1;

      if (loading === 0) {
        startApp();
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}
loadTrendingTracks();

function renderSingleTrack(trackData) {
  let trackHTML = '<div class="track">';
  trackHTML += "<img class='main-img' src='" + trackData.strTrackThumb + "' />";
  trackHTML += '<h2>' + trackData.strTrack + '</h2>';
  trackHTML += '<h4>' + trackData.strArtist + '</h4>';
  trackHTML += '<h5>' + trackData.strAlbum + '</h5>';
  // TODO make links to the audio DB
  // trackHTML += "<a href='" + trackData.artist_website + "'>Website</a>";
  trackHTML += '</div>';

  // "idTrend": "3262",
  //     "intChartPlace": "6",
  //     "idArtist": "122405",
  //     "idAlbum": "2313452",
  //     "idTrack": "35130889",
  //     "strArtistMBID": "f4fdbb4c-e4b7-47a0-b83b-d91bbfcfa387",
  //     "strAlbumMBID": "485d3241-ef02-49a4-88df-a03eaa86d9cd",
  //     "strTrackMBID": "72436ce7-c14d-48c6-9e48-c166ac4a5db4",
  //     "strArtist": "Ariana Grande",
  //     "strAlbum": "Thank U, Next",,
  //     "strArtistThumb": null,
  //     "strAlbumThumb": null,
  //     "f": "https://www.theaudiodb.com/images/icons/upload_icon-transparent2.png",
  //     "strCountry": "us",
  //     "strType": "iTunes",
  //     "intWeek": "6",
  //     "dateAdded": "2019-02-10 01:00:02"
  return trackHTML;
}

function renderTracks() {
  let tracksHTML = '';
  for (let index = 0; index < trendingTracks.length; index++) {
    const track = trendingTracks[index];
    tracksHTML += renderSingleTrack(track);
  }
  document.getElementById('trackResults').innerHTML = tracksHTML;
}

function loadTrendingAlbums() {
  const albumURL =
    'https://theaudiodb.com/api/v1/json/1/trending.php?country=us&type=itunes&format=albums&country=' +
    current_country_code +
    '&type=itunes&format=albums';
  fetch(albumURL)
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(json) {
      trendingAlbums = json.trending;
      trendingAlbums.sort(function(a, b) {
        return parseInt(a.intChartPlace) - parseInt(b.intChartPlace);
      });
      loading -= 1;

      if (loading === 0) {
        startApp();
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}
loadTrendingAlbums();

function renderSingleAlbum(albumData) {
  let albumHTML = '<div class="album">';
  albumHTML += "<img class='main-img' src='" + albumData.strAlbumThumb + "'>";
  albumHTML += "<img class='artist-img' src='" + albumData.strArtistThumb + "' /></img>";
  albumHTML += '<h2>' + albumData.strAlbum + '</h2>';
  albumHTML += '<h4>' + albumData.strArtist + '</h4>';
  // TODO make links to the audio DB
  // albumHTML += "<a href='" + albumData.artist_website + "'>Website</a>";
  albumHTML += '</div>';

  /*
{
      "idTrend": "3245",
      "intChartPlace": "1",
      "idArtist": "122405",
      "idAlbum": "2310441",
      "idTrack": null,
      "strArtistMBID": "f4fdbb4c-e4b7-47a0-b83b-d91bbfcfa387",
      "strAlbumMBID": "b6728a22-1934-4840-92ec-096944f20e12",
      "strTrackMBID": null,
      "strArtist": "Ariana Grande",
      "strAlbum": "thank u, next",
      "strTrack": null,
      "strArtistThumb": "https://www.theaudiodb.com/images/media/artist/thumb/tytqvq1506095485.jpg",
      "strAlbumThumb": "https://www.theaudiodb.com/images/media/album/thumb/tsvrsv1544528326.jpg",
      "strTrackThumb": null,
      "strCountry": "us",
      "strType": "iTunes",
      "intWeek": "6",
      "dateAdded": "2019-02-10 00:00:03"
    }
  */
  return albumHTML;
}

function renderAlbums() {
  let albumsHTML = '';
  for (let index = 0; index < trendingAlbums.length; index++) {
    const album = trendingAlbums[index];
    albumsHTML += renderSingleAlbum(album);
  }
  document.getElementById('albumResults').innerHTML = albumsHTML;
}

document.getElementById('countrySelect').onchange = function(e) {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();

  var value = document.getElementById('countrySelect').value;
  console.log(value);

  if (!value) {
    return;
  }

  current_country_code = value;

  // wait for both responses before displaying
  loading = 2;

  startLoading();
  loadTrendingTracks();
  loadTrendingAlbums();
};

document.getElementById('showTracks').onclick = function() {
  document.getElementById('showTracks').setAttribute('class', 'active');
  document.getElementById('showAlbums').setAttribute('class', '');
  document.getElementById('trackResultsWrapper').setAttribute('class', 'col-md-6');
  document.getElementById('albumResultsWrapper').setAttribute('class', 'col-md-6 mobile-hidden');
};

document.getElementById('showAlbums').onclick = function() {
  document.getElementById('showAlbums').setAttribute('class', 'active');
  document.getElementById('showTracks').setAttribute('class', '');
  document.getElementById('albumResultsWrapper').setAttribute('class', 'col-md-6');
  document.getElementById('trackResultsWrapper').setAttribute('class', 'col-md-6 mobile-hidden');
};
