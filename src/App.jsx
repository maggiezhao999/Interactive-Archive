
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

// MAP ICONS

const emojiIcon = L.divIcon({
  html: '<span style="font-size: 30px;">📍</span>',
  className: "emoji-marker",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

const previewIcon = L.divIcon({
  html: '<span style="font-size: 34px;">📌</span>',
  className: "emoji-marker",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// ORIGINAL POSTCARDS

const postcards = [
  {
    id: 101,
    city: "Paris",
    country: "France",
    type: "postcard",
    lat: 48.8566,
    lng: 2.3522,
    front: "/assets/postcards/1Musee.png",
    back: "/assets/postcards/1Museeback.png",
  },
  {
    id: 102,
    city: "Berlin",
    country: "Germany",
    type: "postcard",
    lat: 52.52,
    lng: 13.405,
    front: "/assets/postcards/2BerlinWall.png",
    back: "/assets/postcards/2BerlinWallback.png",
  },
  {
    id: 103,
    city: "Florence",
    country: "Italy",
    type: "postcard",
    lat: 43.7696,
    lng: 11.2558,
    front: "/assets/postcards/3Adam.png",
    back: "/assets/postcards/3Adamback.png",
  },
  {
    id: 104,
    city: "Brussels",
    country: "Belgium",
    type: "postcard",
    lat: 50.8503,
    lng: 4.3517,
    front: "/assets/postcards/4Tintin.png",
    back: "/assets/postcards/4Tintinback.png",
  },
  {
    id: 105,
    city: "Otaru",
    country: "Japan",
    type: "postcard",
    lat: 43.1907,
    lng: 140.9947,
    front: "/assets/postcards/5Hokkaido.png",
    back: "/assets/postcards/5Hokkaidoback.png",
  },
  {
    id: 106,
    city: "Paris",
    country: "France",
    type: "postcard",
    lat: 48.8527,
    lng: 2.347,
    front: "/assets/postcards/6croissant.png",
    back: "/assets/postcards/6croissantback.png",
  },
];

// ORIGINAL PHOTOS

const photos = [
  {
    id: 201,
    city: "Shibuya",
    country: "Japan",
    type: "photo",
    lat: 35.6595,
    lng: 139.7005,
    image: "/assets/photos/涩谷.BMP",
  },
  {
    id: 202,
    city: "Asakusa",
    country: "Japan",
    type: "photo",
    lat: 35.7148,
    lng: 139.7967,
    image: "/assets/photos/asakusa.BMP",
  },
  {
    id: 203,
    city: "Beijing",
    country: "China",
    type: "photo",
    lat: 39.9042,
    lng: 116.4074,
    image: "/assets/photos/Beijing.jpeg",
  },
  {
    id: 204,
    city: "Shibuya",
    country: "Japan",
    type: "photo",
    lat: 35.6618,
    lng: 139.7041,
    image: "/assets/photos/Shibuya.BMP",
  },
  {
    id: 205,
    city: "Tokyo Skytree",
    country: "Japan",
    type: "photo",
    lat: 35.7101,
    lng: 139.8107,
    image: "/assets/photos/skytree.BMP",
  },
  {
    id: 206,
    city: "Tokyo",
    country: "Japan",
    type: "photo",
    lat: 35.7101,
    lng: 139.8107,
    image: "/assets/photos/snownight.jpeg",
  },
  {
    id: 207,
    city: "Tiananmen Square",
    country: "China",
    type: "photo",
    lat: 39.9055,
    lng: 116.3976,
    image: "/assets/photos/Tiananmen.BMP",
  },
  {
    id: 208,
    city: "Williamsburg Bridge",
    country: "USA",
    type: "photo",
    lat: 40.7133,
    lng: -73.9724,
    image: "/assets/photos/Williamsburg bridge.jpeg",
  },
  {
    id: 209,
    city: "San Francisco",
    country: "USA",
    type: "photo",
    lat: 37.781,
    lng: -122.503,
    image: "/assets/photos/lands-end.jpeg",
  },
];

const initialItems = [...postcards, ...photos];

// TRAVEL DESTINATIONS

const destinations = {
  Paris: [48.8566, 2.3522],
  Tokyo: [35.6762, 139.6503],
  Beijing: [39.9042, 116.4074],
  Berlin: [52.52, 13.405],
  Florence: [43.7696, 11.2558],
  "San Francisco": [37.781, -122.503],
  "New York": [40.7133, -73.9724],
  Brussels: [50.8503, 4.3517],
  Otaru: [43.1907, 140.9947],
};

// POSTCARD FLIP COMPONENT

function Postcard({ front, back }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="postcard-container">
      <div
        className={`postcard ${flipped ? "flipped" : ""}`}
        onClick={() => setFlipped(!flipped)}
      >
        <div className="postcard-face postcard-front">
          <img src={front} alt="Postcard front" />
        </div>

        <div className="postcard-face postcard-back">
          <img src={back} alt="Postcard back" />
        </div>
      </div>

      <p className="flip-hint">Click to flip ↻</p>
    </div>
  );
}

// MAP FLY ANIMATION

function MapFlyTo({ destination, travelCount }) {
  const map = useMap();

  useEffect(() => {
    if (travelCount === 0) return;

    const coordinates = destinations[destination];

    if (coordinates) {
      map.invalidateSize();

      map.flyTo(coordinates, 11, {
        animate: true,
        duration: 2.5,
      });
    }
  }, [destination, travelCount, map]);

  return null;
}

// CLICK MAP TO SELECT LOCATION

function MapLocationPicker({ active, onPick }) {
  useMapEvents({
    click(event) {
      if (!active) return;

      onPick({
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      });
    },
  });

  return null;
}

// MAIN APP

function App() {
  const [items, setItems] = useState(initialItems);

  const [showTicket, setShowTicket] = useState(true);
  const [destination, setDestination] = useState("Paris");
  const [travelCount, setTravelCount] = useState(0);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [showUpload, setShowUpload] = useState(false);
  const [isPickingLocation, setIsPickingLocation] = useState(false);

  const [newImage, setNewImage] = useState(null);
  const [newCity, setNewCity] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [newLocation, setNewLocation] = useState(null);

  // ALL PHOTOS FOR BACKGROUND

  const backgroundPhotos = items.filter(
    (item) => item.type === "photo"
  );

  // FILTER ARCHIVE

  const visibleItems = items.filter((item) => {
    const matchesType =
      filter === "all" || item.type === filter;

    const matchesSearch =
      `${item.city} ${item.country}`
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesType && matchesSearch;
  });

  // TRAVEL

  function handleTravel() {
    setShowTicket(false);
    setTravelCount((count) => count + 1);
  }

  // UPLOAD PHOTO

  function handleImageUpload(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setNewImage(reader.result);
    };

    reader.readAsDataURL(file);
  }

  // CHOOSE LOCATION

  function handleChooseLocation() {
    setIsPickingLocation(true);
    setShowUpload(false);
  }

  function handleMapClick(location) {
    setNewLocation(location);
    setIsPickingLocation(false);
    setShowUpload(true);
  }

  // ADD MEMORY

  function handleAddMemory(event) {
    event.preventDefault();

    if (!newImage || !newCity.trim() || !newLocation) {
      alert("Please add a photo, city, and map location.");
      return;
    }

    const newItem = {
      id: Date.now(),
      city: newCity.trim(),
      country: newCountry.trim(),
      type: "photo",
      lat: newLocation.lat,
      lng: newLocation.lng,
      image: newImage,
      caption: newCaption.trim(),
    };

    setItems((previousItems) => [
      ...previousItems,
      newItem,
    ]);

    setFilter("all");
    setSearch("");

    setNewImage(null);
    setNewCity("");
    setNewCountry("");
    setNewCaption("");
    setNewLocation(null);

    setShowUpload(false);
    setIsPickingLocation(false);
  }

  // CANCEL UPLOAD

  function handleCancelUpload() {
    setShowUpload(false);
    setIsPickingLocation(false);
    setNewLocation(null);
    setNewImage(null);
    setNewCity("");
    setNewCountry("");
    setNewCaption("");
  }

  return (
    <div className="app">

      {/* DYNAMIC PHOTO BACKGROUND */}

      <div className="photo-background">
        {backgroundPhotos.map((item) => (
          <img
            key={item.id}
            src={item.image}
            alt=""
          />
        ))}
      </div>

      {/* WELCOME TICKET */}

      {showTicket && (
        <div className="ticket-screen">
          <div className="ticket">

            <div className="ticket-from">
              WORLD
            </div>

            <select
              className="ticket-destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              {Object.keys(destinations).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <button
              className="ticket-travel"
              onClick={handleTravel}
            >
              TRAVEL →
            </button>

          </div>
        </div>
      )}

      {/* MAIN ARCHIVE */}

      <div
        className={`archive-content ${
          showTicket ? "archive-hidden" : ""
        }`}
      >

        <header className="header">
          <h1>Somewhere in This World...</h1>
        </header>

        {/* FILTERS */}

        <div className="toolbar">
          <div className="filters">
            {["all", "photo", "postcard"].map((type) => (
              <button
                key={type}
                className={filter === type ? "active" : ""}
                onClick={() => setFilter(type)}
              >
                {type === "all"
                  ? "All"
                  : type === "photo"
                  ? "Photos"
                  : "Postcards"}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search a city or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* LOCATION PICKING */}

        {isPickingLocation && (
          <div className="location-instruction">
            <span>
              📌 Click anywhere on the map to place your memory.
            </span>

            <button
              onClick={() => {
                setIsPickingLocation(false);
                setShowUpload(true);
              }}
            >
              Cancel
            </button>
          </div>
        )}

        {/* MAP */}

        <main className="map-wrapper">
          <MapContainer
            center={[25, 10]}
            zoom={2}
            minZoom={2}
            scrollWheelZoom={true}
            className={`map ${
              isPickingLocation ? "map-picking" : ""
            }`}
          >

            <MapFlyTo
              destination={destination}
              travelCount={travelCount}
            />

            <MapLocationPicker
              active={isPickingLocation}
              onPick={handleMapClick}
            />

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {visibleItems.map((item) => (
              <Marker
                key={item.id}
                position={[item.lat, item.lng]}
                icon={emojiIcon}
              >
                <Popup maxWidth={450} minWidth={280}>
                  <div className="archive-popup">

                    <h3>{item.city}</h3>
                    <p>{item.country}</p>

                    {item.type === "postcard" && (
                      <Postcard
                        front={item.front}
                        back={item.back}
                      />
                    )}

                    {item.type === "photo" && (
                      <img
                        src={item.image}
                        alt={item.city}
                        className="archive-photo"
                      />
                    )}

                    {item.caption && (
                      <p className="memory-caption">
                        {item.caption}
                      </p>
                    )}

                    <span>
                      {item.type === "photo"
                        ? "Photo"
                        : "Postcard"}
                    </span>

                  </div>
                </Popup>
              </Marker>
            ))}

            {newLocation && (
              <Marker
                position={[
                  newLocation.lat,
                  newLocation.lng,
                ]}
                icon={previewIcon}
                interactive={false}
              />
            )}

          </MapContainer>
        </main>

        {/* BOTTOM NAVIGATION */}

        <div className="bottom-navigation">

          <button
            className="emoji-button"
            onClick={() => setShowTicket(true)}
            title="Travel"
          >
            <span>✈️</span>
            <small>Travel</small>
          </button>

          <button
            className="emoji-button"
            onClick={() => setShowUpload(true)}
            title="Add Memory"
          >
            <span>📷</span>
            <small>Add Memory</small>
          </button>

        </div>

      </div>

      {/* UPLOAD MODAL */}

      {showUpload && !showTicket && (
        <div className="upload-overlay">
          <div
            className="upload-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Add a Memory"
          >

            <button
              type="button"
              className="upload-close"
              onClick={handleCancelUpload}
              aria-label="Close"
            >
              ×
            </button>

            <h2>📷 Add a Memory</h2>

            <form onSubmit={handleAddMemory}>

              <label className="form-label">
                Photograph
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input"
              />

              {newImage && (
                <img
                  src={newImage}
                  alt="Upload preview"
                  className="upload-preview"
                />
              )}

              <label className="form-label">
                City
              </label>

              <input
                type="text"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                required
              />

              <label className="form-label">
                Country
              </label>

              <input
                type="text"
                value={newCountry}
                onChange={(e) => setNewCountry(e.target.value)}
              />

              <label className="form-label">
                what to say
              </label>

              <textarea
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
                rows={3}
              />

              <label className="form-label">
                Location
              </label>

              <button
                type="button"
                className="choose-location"
                onClick={handleChooseLocation}
              >
                {newLocation
                  ? "📍 Change Location"
                  : "📍 Choose Location on Map"}
              </button>

              {newLocation && (
                <p className="location-confirmation">
                  ✓ Location selected:
                  {" "}
                  {newLocation.lat.toFixed(4)},
                  {" "}
                  {newLocation.lng.toFixed(4)}
                </p>
              )}

              <button
                type="submit"
                className="save-memory"
                disabled={
                  !newImage ||
                  !newCity.trim() ||
                  !newLocation
                }
              >
                Add to Archive →
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;
