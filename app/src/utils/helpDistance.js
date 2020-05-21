function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export function calculateDistance(centerCoordinates, pointCoordinates) {
  const radius = 6371;

  const { latitude: lat1, longitude: lon1 } = centerCoordinates;
  const { latitude: lat2, longitude: lon2 } = pointCoordinates;

  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const center = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return radius * center;
}

function getDistanceInKm(centerCoordinates, pointCoordinates) {
  let distance = calculateDistance(centerCoordinates, pointCoordinates);
  distance =
    distance > 1
      ? `${distance.toFixed(2)} km`
      : `${(distance * 1000).toFixed(0)} m`;

  return distance;
}

export default getDistanceInKm;
