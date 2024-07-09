import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MapContainer, TileLayer, FeatureGroup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { Button, Heading, Flex } from "@chakra-ui/react";
import { EditControl } from "react-leaflet-draw";
import axios from "axios";

const MapComponent = () => {
  const [geoData, setGeoData] = useState(null);
  const [drawnFIG, setDrawnFIG] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      const fileContent = reader.result;
      console.log("File content:", fileContent);

      if (file.name.endsWith(".geojson")) {
        const parsedData = JSON.parse(fileContent);
        setGeoData(parsedData);
      } else if (file.name.endsWith(".kml")) {
        console.log("KML file detected");
      } else {
        console.error("Unsupported file format");
      }
    };

    reader.readAsText(file);
  }, []);

  const handleShape = useCallback((e) => {
    const layer = e.layer;
    setDrawnFIG(layer.toGeoJSON());
    setGeoData(layer.toGeoJSON());
  }, []);

  const saveGeoJSON = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      const userId = localStorage.getItem("userId");
      console.log("UserID:", userId);

      const response = await axios.patch(
<<<<<<< HEAD
        `http://localhost:8007/users/saveGeoJSON/${userId}`,
=======
        `https://geo-data-mern.onrender.com/users/saveGeoJSON/${userId}`,
>>>>>>> c2d6a0ccf368996613f5e94c08cbbe0145b8fbdd
        { GeoJSONData: geoData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response.data);
      console.log("GeoJSON data saved successfully!", { GeoJSONData: geoData });
      setDrawnFIG(null);
      setGeoData(null);
    } catch (error) {
      console.error("Error saving GeoJSON data:", error);
    }
  }, [geoData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Flex w="100%" h="80%" mt="6">
      <Flex
        direction="column"
        w="30%"
        mr="4"
        boxShadow="1px 7px 9px 1px"
        bg="#acdcee"
        borderRadius="10px"
        p="4"
      >
        <Heading mb="4" textAlign="center">
          Drop GeoJSON or KML file
        </Heading>
        <form>
          <div {...getRootProps()} style={{ textAlign: "center" }}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p style={{ color: "#2e94b9" }}>Drop the file here ...</p>
            ) : (
              <p style={{ color: "#2e94b9" }}>
                Drag 'n' drop a GeoJSON or KML file here, or click to select
                files
              </p>
            )}
          </div>
        </form>
      </Flex>

      <Flex
        w="70%"
        boxShadow="1px 7px 9px 1px"
        borderRadius="10px"
        p="4"
        align="center"
        justify="center"
      >
        <MapContainer center={[21.0, 78.0]} zoom={2.1} style={{ height: "600px", borderRadius: "10px", width: "100%" }}>
          <FeatureGroup>
            <EditControl position="topright" onCreated={handleShape} />
            {geoData && <GeoJSON data={geoData} />}
          </FeatureGroup>

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </Flex>
    </Flex>
  );
};

export default MapComponent;