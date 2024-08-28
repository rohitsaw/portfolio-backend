import fetch from "node-fetch";

const _send_push_notification = (payload) => {
  const isPayment = payload.title === "payment";
  const url = "https://onesignal.com/api/v1/notifications";
  const options = {
    method: "POST",
    headers: {
      Authorization: `Basic ${process.env.ONESIGNAL_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      app_id: "e6cdb8fb-192b-4a0e-81e1-5762f7e0b630",
      included_segments: ["All"],
      headings: {
        en: isPayment ? "New Payment" : "New Expense",
      },
      contents: {
        en: isPayment ? `INR${payload.amount}` : `${payload.title}`,
      },
    }),
  };

  // Perform the POST request
  fetch(url, options)
    .then((response) => response.json()) // Parse JSON response
    .then((data) => console.log("Success:", data)) // Handle the data
    .catch((error) => console.error("Error:", error)); // Handle errors
};

const send_push_notification = (payload) => {
  if (Array.isArray(payload)) {
    for (let i = 0; i < payload.length; i++) {
      _send_push_notification(payload[i]);
    }
  } else {
    _send_push_notification(payload);
  }
};

export { send_push_notification };
