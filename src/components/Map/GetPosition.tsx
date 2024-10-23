import React, { useRef, useEffect, useState } from "react";

interface Location {
    lng: number;
    lat: number;
}
export const GetPosition: React.FC<{
    onLocationFound: (location: Location) => void;
}> = ({ onLocationFound }) => {
    useEffect(() => {
        const getLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    onLocationFound({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("Error getting location:", error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        };

        getLocation();

        // Watch the shipper's location in real-time
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                onLocationFound({ lat: latitude, lng: longitude });
            },
            (error) => {
                console.error("Error watching location:", error);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            }
        );

      
        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, [onLocationFound]);

    return null; 
};
