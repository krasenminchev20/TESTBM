exports.handler = async (event) => {
    // CORS Headers
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Content-Type": "application/json"
    };

    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers, body: "" };
    }

    try {
        const body = JSON.parse(event.body || "{}");
        const interactionId = body?.data?.interactionId;

        // Ако Bettermode просто тества връзката без interactionId
        if (!interactionId) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ status: "ready", message: "Bettermode API is live" })
            };
        }

        // Валиден отговор за Bettermode Dynamic Block
        const response = {
            type: "INTERACTION",
            status: "SUCCEEDED",
            data: {
                interactionId,
                interactions: [{
                    type: "SHOW",
                    id: interactionId,
                    slate: {
                        rootBlock: "root",
                        blocks: [
                            {
                                id: "root",
                                name: "Container",
                                props: { direction: "vertical", padding: "md" },
                                children: ["header", "subtext"]
                            },
                            {
                                id: "header",
                                name: "Text",
                                props: { size: "lg", value: "🚀 Моят нов блок работи!" },
                                children: []
                            },
                            {
                                id: "subtext",
                                name: "Text",
                                props: { size: "md", value: "Здравей от Netlify Functions." },
                                children: []
                            }
                        ]
                    }
                }]
            }
        };

        return { statusCode: 200, headers, body: JSON.stringify(response) };

    } catch (err) {
        return { 
            statusCode: 400, 
            headers, 
            body: JSON.stringify({ error: "Invalid JSON", details: err.message }) 
        };
    }
};