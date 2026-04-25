// code generated with the help of ChatGPT

// This file contains fallback data for the charts and metric cards. 
// This is used when the API is not available or returns an error.

// src/data/fallbackData.js
// One place to store fallback data so charts + metric cards reuse it.

export const FALLBACK_SPENDING = {
  "Hawai'i": [
    { month: "Jan", spending: 1897 },
    { month: "Feb", spending: 1731 },
    { month: "Mar", spending: 1991 },
    { month: "Apr", spending: 1688 },
    { month: "May", spending: 1684 },
    { month: "Jun", spending: 1964 },
    { month: "Jul", spending: 1953 },
    { month: "Aug", spending: 1723 },
    { month: "Sep", spending: 1537 },
    { month: "Oct", spending: 1702 },
    { month: "Nov", spending: 1766 },
    { month: "Dec", spending: 2116 },
  ],
  "Maui": [
    { month: "Jan", spending: 0 },
    { month: "Feb", spending: 0 },
    { month: "Mar", spending: 0 },
    { month: "Apr", spending: 0 },
    { month: "May", spending: 0 },
    { month: "Jun", spending: 0 },
    { month: "Jul", spending: 0 },
    { month: "Aug", spending: 0 },
    { month: "Sep", spending: 0 },
    { month: "Oct", spending: 0 },
    { month: "Nov", spending: 0 },
    { month: "Dec", spending: 0 },
  ],
};

export const FALLBACK_ARRIVALS = {
  "Hawai'i": [
    { month: "Jan", arrivals: 792177 },
    { month: "Feb", arrivals: 759679 },
    { month: "Mar", arrivals: 903891 },
    { month: "Apr", arrivals: 833219 },
    { month: "May", arrivals: 771038 },
    { month: "Jun", arrivals: 857102 },
    { month: "Jul", arrivals: 873430 },
    { month: "Aug", arrivals: 806776 },
    { month: "Sep", arrivals: 690858 },
    { month: "Oct", arrivals: 749095 },
    { month: "Nov", arrivals: 736831 },
    { month: "Dec", arrivals: 868894 },
  ],

  // Other island fallback data
  "Maui": [
    { month: "Jan", arrivals: 0 },
    { month: "Feb", arrivals: 0 },
    { month: "Mar", arrivals: 0 },
    { month: "Apr", arrivals: 0 },
    { month: "May", arrivals: 0 },
    { month: "Jun", arrivals: 0 },
    { month: "Jul", arrivals: 0 },
    { month: "Aug", arrivals: 0 },
    { month: "Sep", arrivals: 0 },
    { month: "Oct", arrivals: 0 },
    { month: "Nov", arrivals: 0 },
    { month: "Dec", arrivals: 0 },
  ],
};

// LOS values need to be an array of numbers so reduce() makes sense
export const FALLBACK_LOS = {
  "Hawai'i": [9.65, 8.87, 8.43, 8.33, 8.47, 8.86, 8.83, 8.48, 8.25, 8.21, 8.85, 8.92],
  "Maui": [7.0, 7.2, 6.9, 7.1, 6.8, 7.3, 7.4, 7.2, 6.7, 6.9, 7.0, 7.5],
};