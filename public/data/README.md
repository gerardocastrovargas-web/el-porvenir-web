# Cartographic data pending verification
Replace `parcels.geojson` with valid WGS84 (EPSG:4326) polygon features from surveyed property boundaries.
Each feature must include `properties.id = "baja"` or `"california"`.
Do not infer geographic coordinates from promotional drawings or Google screenshots.
Only when the data is verified, set `NEXT_PUBLIC_ENABLE_VERIFIED_MAP=true` and optionally `NEXT_PUBLIC_MAP_STYLE_URL`.
The default map view is an illustrative, clickable branded reference, not legal/geodetic evidence.
