import api from "../lib/api";

/**
 * Increment AR view statistics
 */
export const incrementARStat = async ({
  restaurantId,
  itemName,
  imageUrl,
}) => {
  try {
    await api.post(`/api/ar/${restaurantId}`, {
      itemName,
      imageUrl,
    });
  } catch (error) {
    console.error("Failed to increment AR stats:", error);
  }
};
