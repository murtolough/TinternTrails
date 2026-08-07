var wms_layers = [];


        var lyr_OSMStandard_0 = new ol.layer.Tile({
            'title': 'OSM Standard',
            'type':'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: '<a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_TinternWalkingTrailstinterntrails_1 = new ol.format.GeoJSON();
var features_TinternWalkingTrailstinterntrails_1 = format_TinternWalkingTrailstinterntrails_1.readFeatures(json_TinternWalkingTrailstinterntrails_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_TinternWalkingTrailstinterntrails_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_TinternWalkingTrailstinterntrails_1.addFeatures(features_TinternWalkingTrailstinterntrails_1);
var lyr_TinternWalkingTrailstinterntrails_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_TinternWalkingTrailstinterntrails_1, 
                style: style_TinternWalkingTrailstinterntrails_1,
                popuplayertitle: 'TinternWalkingTrails — tintern trails',
                interactive: true,
    title: 'TinternWalkingTrails — tintern trails<br />\
    <img src="styles/legend/TinternWalkingTrailstinterntrails_1_0.png" /> Buggy Trail<br />\
    <img src="styles/legend/TinternWalkingTrailstinterntrails_1_1.png" /> Caesar Colclough Trail<br />\
    <img src="styles/legend/TinternWalkingTrailstinterntrails_1_2.png" /> John Torrell Cistercian Trail<br />\
    <img src="styles/legend/TinternWalkingTrailstinterntrails_1_3.png" /> Marie Biddulph Colclough Trail<br />\
    <img src="styles/legend/TinternWalkingTrailstinterntrails_1_4.png" /> Mr Rose\'s Garden Trail<br />\
    <img src="styles/legend/TinternWalkingTrailstinterntrails_1_5.png" /> Enchanted Trail<br />' });
var format_TinternWalkingTrailstrail_features_2 = new ol.format.GeoJSON();
var features_TinternWalkingTrailstrail_features_2 = format_TinternWalkingTrailstrail_features_2.readFeatures(json_TinternWalkingTrailstrail_features_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_TinternWalkingTrailstrail_features_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_TinternWalkingTrailstrail_features_2.addFeatures(features_TinternWalkingTrailstrail_features_2);
var lyr_TinternWalkingTrailstrail_features_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_TinternWalkingTrailstrail_features_2, 
                style: style_TinternWalkingTrailstrail_features_2,
                popuplayertitle: 'TinternWalkingTrails — trail_features',
                interactive: true,
    title: 'TinternWalkingTrails — trail_features<br />\
    <img src="styles/legend/TinternWalkingTrailstrail_features_2_0.png" /> Bench<br />\
    <img src="styles/legend/TinternWalkingTrailstrail_features_2_1.png" /> Bridge<br />\
    <img src="styles/legend/TinternWalkingTrailstrail_features_2_2.png" /> Tree Maker<br />\
    <img src="styles/legend/TinternWalkingTrailstrail_features_2_3.png" /> Misc<br />\
    <img src="styles/legend/TinternWalkingTrailstrail_features_2_4.png" /> Parking<br />\
    <img src="styles/legend/TinternWalkingTrailstrail_features_2_5.png" /> Sculpture <br />\
    <img src="styles/legend/TinternWalkingTrailstrail_features_2_6.png" /> Toilet<br />' });

lyr_OSMStandard_0.setVisible(true);lyr_TinternWalkingTrailstinterntrails_1.setVisible(true);lyr_TinternWalkingTrailstrail_features_2.setVisible(true);
var layersList = [lyr_OSMStandard_0,lyr_TinternWalkingTrailstinterntrails_1,lyr_TinternWalkingTrailstrail_features_2];
lyr_TinternWalkingTrailstinterntrails_1.set('fieldAliases', {'fid': 'fid', 'ID': 'ID', 'Trail': 'Trail', });
lyr_TinternWalkingTrailstrail_features_2.set('fieldAliases', {'fid': 'fid', 'ObjectID': 'ObjectID', 'Feature': 'Feature', 'Item': 'Item', 'Photo': 'Photo', });
lyr_TinternWalkingTrailstinterntrails_1.set('fieldImages', {'fid': 'TextEdit', 'ID': 'Range', 'Trail': 'TextEdit', });
lyr_TinternWalkingTrailstrail_features_2.set('fieldImages', {'fid': 'TextEdit', 'ObjectID': 'Range', 'Feature': 'ValueMap', 'Item': 'TextEdit', 'Photo': 'ExternalResource', });
lyr_TinternWalkingTrailstinterntrails_1.set('fieldLabels', {'fid': 'hidden field', 'ID': 'hidden field', 'Trail': 'inline label - always visible', });
lyr_TinternWalkingTrailstrail_features_2.set('fieldLabels', {'fid': 'hidden field', 'ObjectID': 'hidden field', 'Feature': 'inline label - always visible', 'Item': 'inline label - always visible', 'Photo': 'inline label - always visible', });
lyr_TinternWalkingTrailstrail_features_2.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});