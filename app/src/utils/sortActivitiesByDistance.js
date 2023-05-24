export default function sortActivitiesByDistance({
    helpList,
    helpOfferList,
    campaignList,
    limit,
}) {
    let list = [...helpList, ...helpOfferList, ...campaignList];

    list = list.sort((a, b) => a.distanceValue - b.distanceValue);

    return limit ? list.slice(0, 15) : list;
}
