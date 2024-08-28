import fetch from "node-fetch";

const send_push_notification = ({ groupName, headings, title }) => {
  const url = "https://onesignal.com/api/v1/notifications";
  const options = {
    method: "POST",
    headers: {
      Authorization: `Basic ${process.env.ONESIGNAL_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      app_id: "e6cdb8fb-192b-4a0e-81e1-5762f7e0b630",
      filters: [
        {
          field: "tag",
          key: `group: ${groupName}`,
          relation: "=",
          value: "true",
        },
      ],
      headings: {
        en: headings,
      },
      contents: {
        en: title,
      },
    }),
  };

  // Perform the POST request
  fetch(url, options)
    .then((response) => response.json()) // Parse JSON response
    .then((data) => console.log("Success:", data)) // Handle the data
    .catch((error) => console.error("Error:", error)); // Handle errors
};

export { send_push_notification };