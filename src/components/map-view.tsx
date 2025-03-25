"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

interface School {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  lat?: number;
  lng?: number;
}

interface MapViewProps {
  schools: School[];
  onSchoolSelect?: (schoolId: string) => void;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export default function MapView({ schools, onSchoolSelect }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize the map
  useEffect(() => {
    // Skip if already loaded or no schools
    if (map || !schools.length) return;

    const loadGoogleMaps = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDTqqPLIPujQ1nkDg49JwKw2b1TA2sUMy0&libraries=places&callback=initMap`;
        script.async = true;
        script.defer = true;
        script.onerror = () => setError("Failed to load Google Maps");
        document.head.appendChild(script);

        window.initMap = initializeMap;
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (!mapRef.current) return;

      try {
        // Default center (will be adjusted based on schools)
        const mapInstance = new window.google.maps.Map(mapRef.current, {
          center: { lat: 40.7128, lng: -74.006 }, // New York by default
          zoom: 10,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        });

        setMap(mapInstance);
        setLoading(false);
      } catch (err) {
        console.error("Error initializing map:", err);
        setError("Error initializing map");
        setLoading(false);
      }
    };

    loadGoogleMaps();

    return () => {
      // Clean up markers when component unmounts
      markers.forEach((marker) => marker.setMap(null));
    };
  }, [schools]);

  // Add markers for schools
  useEffect(() => {
    if (!map || !schools.length) return;

    // Clear existing markers
    markers.forEach((marker) => marker.setMap(null));
    const newMarkers: any[] = [];
    const bounds = new window.google.maps.LatLngBounds();

    // Geocode addresses if lat/lng not provided
    const geocoder = new window.google.maps.Geocoder();

    schools.forEach((school) => {
      const processSchool = (lat: number, lng: number) => {
        const position = { lat, lng };
        const marker = new window.google.maps.Marker({
          position,
          map,
          title: school.name,
          animation: window.google.maps.Animation.DROP,
        });

        // Create info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; max-width: 200px;">
              <h3 style="margin: 0 0 8px; font-weight: bold;">${school.name}</h3>
              <p style="margin: 0; font-size: 14px;">${school.address}, ${school.city}, ${school.state}</p>
              <button 
                id="view-${school.id}" 
                style="margin-top: 8px; padding: 4px 8px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer;"
              >
                View Details
              </button>
            </div>
          `,
        });

        // Add click listener to marker
        marker.addListener("click", () => {
          infoWindow.open(map, marker);

          // Add event listener to the button after info window is opened
          setTimeout(() => {
            const button = document.getElementById(`view-${school.id}`);
            if (button) {
              button.addEventListener("click", () => {
                if (onSchoolSelect) onSchoolSelect(school.id);
              });
            }
          }, 100);
        });

        newMarkers.push(marker);
        bounds.extend(position);
      };

      if (school.lat && school.lng) {
        processSchool(school.lat, school.lng);
      } else {
        // Geocode the address
        const address = `${school.address}, ${school.city}, ${school.state}`;
        geocoder.geocode({ address }, (results: any, status: any) => {
          if (status === "OK" && results[0]) {
            const { lat, lng } = results[0].geometry.location;
            processSchool(lat(), lng());

            // Fit bounds after last school is processed
            if (newMarkers.length === schools.length) {
              map.fitBounds(bounds);
            }
          }
        });
      }
    });

    setMarkers(newMarkers);

    // Fit bounds if we have coordinates for all schools
    if (newMarkers.length === schools.length) {
      map.fitBounds(bounds);
    }
  }, [map, schools, onSchoolSelect]);

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-600 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-lg overflow-hidden border border-gray-200">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
      {!map && !loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p>Map loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}
