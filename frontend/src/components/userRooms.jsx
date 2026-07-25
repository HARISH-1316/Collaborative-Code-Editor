import React from "react";
import { VStack, Divider } from "@chakra-ui/react";
import { MyRooms } from "./MyRooms";
import { RecentRooms } from "./RecentRooms";

export const Rooms = ({ myRooms, recentRooms, activeSection }) => {
  console.log("Rooms.jsx", myRooms);
  console.log(recentRooms);
  return (
    <VStack spacing={8} align="stretch" mt={8}>
      {/* Show both sections on Dashboard, or filter by activeSection */}
      <MyRooms rooms={myRooms} />

      <Divider borderColor="gray.700" />

      <RecentRooms rooms={recentRooms} />
    </VStack>
  );
};
