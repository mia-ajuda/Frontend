const isRecentDate = (date, recentDays = 15) => {
    if (!date) return;
    const today = new Date();
    const parsedDate = new Date(date);
    const daysDiff = (today - parsedDate) / (1000 * 60 * 60 * 24);
    return recentDays >= daysDiff;
};

export default isRecentDate;
