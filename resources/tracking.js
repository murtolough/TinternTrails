// --- GLOBALS ---
let tracking = false;
let lastPoint = null;
let totalDistance = 0;
let gpsWatcher = null;

let timerInterval = null;
let startTime = null;


// --- START TRACKING ---
function startTracking() {
    tracking = true;

    // Start timer
    startTime = Date.now();
    timerInterval = setInterval(function() {
        const elapsed = Date.now() - startTime;

        const hours = Math.floor(elapsed / 3600000);
        const minutes = Math.floor((elapsed % 3600000) / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);

        const formatted =
            String(hours).padStart(2, '0') + ':' +
            String(minutes).padStart(2, '0') + ':' +
            String(seconds).padStart(2, '0');

        document.getElementById('timerDisplay').innerHTML =
            "Time: " + formatted;

    }, 1000);

    gpsWatcher = navigator.geolocation.watchPosition(function(pos) {
        if (!tracking) return;

        const lon = pos.coords.longitude;
        const lat = pos.coords.latitude;

        const userPoint = [lon, lat];

        // SNAP TO TRAIL
        const snappedPoint = snapToTracks(userPoint);

        updateDistance(snappedPoint);
        updateUserMarker(snappedPoint);

	// Use the FIRST trail feature for now
	const trailFeature = lyr_TinternWalkingTrailstinterntrails_1.getSource().getFeatures()[0];

	const bearing = getBearingOnTrail(snappedPoint, trailFeature);
	updateDirectionMarker(snappedPoint, bearing);


    }, function(err) {
        console.log("GPS error:", err);
    }, {
        enableHighAccuracy: true
    });
}

// --- STOP TRACKING ---
function stopTracking() {
    tracking = false;

    clearInterval(timerInterval);
    timerInterval = null;

    if (gpsWatcher !== null) {
        navigator.geolocation.clearWatch(gpsWatcher);
        gpsWatcher = null;
    }
}



// --- DISTANCE ACCUMULATION ---
function updateDistance(newPoint) {
    if (lastPoint) {
        const d = turf.distance(
            turf.point(lastPoint),
            turf.point(newPoint),
            { units: 'meters' }
        );
        totalDistance += d;
    }
    lastPoint = newPoint;

    document.getElementById('distanceDisplay').innerHTML =
        "Distance: " + totalDistance.toFixed(1) + " m";
}

// --- USER LOCATION MARKER ---
let userFeature = new ol.Feature();
let userLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [userFeature]
    })
});
map.addLayer(userLayer);

function updateUserMarker(coords) {
    const transformed = ol.proj.fromLonLat(coords);
    userFeature.setGeometry(new ol.geom.Point(transformed));
}

// --- SNAPPING TO TRAILS ---
function snapToTracks(userPoint) {
    let nearest = null;
    let nearestDist = Infinity;

    lyr_TinternWalkingTrailstinterntrails_1.getSource().getFeatures().forEach(function(feature) {
        const geom = feature.getGeometry().clone().transform('EPSG:3857', 'EPSG:4326');
        const gj = new ol.format.GeoJSON().writeGeometryObject(geom);

        const snapped = turf.nearestPointOnLine(gj, turf.point(userPoint));

        if (snapped.properties.dist < nearestDist) {
            nearestDist = snapped.properties.dist;
            nearest = snapped;
        }
    });

    return nearest.geometry.coordinates;
}

// --- DIRECTION MARKER ---
let directionFeature = new ol.Feature();
let directionLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [directionFeature]
    })
});
map.addLayer(directionLayer);

function getBearingOnTrail(snappedPoint, feature) {
    const geom = feature.getGeometry().clone().transform('EPSG:3857', 'EPSG:4326');
    const gj = new ol.format.GeoJSON().writeGeometryObject(geom);

    const nearest = turf.nearestPointOnLine(gj, turf.point(snappedPoint));
    const index = nearest.properties.index;

    const coords = gj.coordinates;

    if (index < coords.length - 1) {
        const start = coords[index];
        const end = coords[index + 1];

        return turf.bearing(turf.point(start), turf.point(end));
    }

    return null;
}

function updateDirectionMarker(coords, bearing) {
    directionFeature.setGeometry(new ol.geom.Point(ol.proj.fromLonLat(coords)));

    directionFeature.setStyle(new ol.style.Style({
        image: new ol.style.Icon({
            src: 'resources/arrow.svg',
            rotation: bearing * Math.PI / 180,
            rotateWithView: true
			scale: 0.15
        })
    }));
}

// --- BUTTON HOOKS ---
document.getElementById('startBtn').addEventListener('click', startTracking);
document.getElementById('stopBtn').addEventListener('click', stopTracking);
