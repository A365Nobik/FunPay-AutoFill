/* eslint-disable no-undef */
chrome.runtime.onInstalled.addListener(async () => {
  try {
    const chromeStorage = chrome.storage.local;
    const { isActive } = await chromeStorage.get("isActive");
    if (isActive === "undefined") {
      chromeStorage.set({ isActive: true });
    }
  } catch (error) {
    console.error(error);
  }
});
