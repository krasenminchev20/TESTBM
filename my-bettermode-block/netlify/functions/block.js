exports.handler = async (event) => {

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-bettermode-app-id, x-bettermode-signature",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ status: "online" })
    };
  }

  try {

    const body = JSON.parse(event.body || "{}");
    const interactionId = body?.data?.interactionId;

    if (!interactionId) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ status: "ready" })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        type: "INTERACTION",
        status: "SUCCEEDED",
        data: {
          interactionId,
          interactions: [
            {
              type: "SHOW",
              id: interactionId,
              slate: {
                rootBlock: "root",
                blocks: [
                  {
                    id: "root",
                    name: "Container",
                    children: ["text1"]
                  },
                  {
                    id: "text1",
                    name: "Text",
                    props: {
                      value: "Hello from Bettermode App 🚀"
                    },
                    children: []
                  }
                ]
              }
            }
          ]
        }
      })
    };

  } catch (err) {

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    };

  }

};