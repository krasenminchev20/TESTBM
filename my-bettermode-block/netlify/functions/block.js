exports.handler = async (event) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Content-Type": "application/json"
    };

    if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };

    try {
        const body = JSON.parse(event.body || "{}");
        const interactionId = body?.data?.interactionId;

        if (!interactionId) {
            return { statusCode: 200, headers, body: JSON.stringify({ message: "Ready" }) };
        }

        const response = {
            type: "INTERACTION",
            status: "SUCCEEDED",
            data: {
                interactionId: interactionId,
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
                                    props: {
                                        direction: "vertical",
                                        padding: "md",
                                        gap: "md"
                                    },
                                    children: ["header", "card1"]
                                },
                                {
                                    id: "header",
                                    name: "Text",
                                    props: {
                                        size: "lg",
                                        value: "Recommended for You",
                                        weight: "bold"
                                    },
                                    children: []
                                },
                                {
                                    id: "card1",
                                    name: "Card",
                                    props: {},
                                    children: ["content1"]
                                },
                                {
                                    id: "content1",
                                    name: "Card.Content",
                                    props: {},
                                    children: ["title1"]
                                },
                                {
                                    id: "title1",
                                    name: "Text",
                                    props: {
                                        value: "Ако виждаш това, работи!",
                                        size: "md"
                                    },
                                    children: []
                                }
                            ]
                        }
                    }
                ]
            }
        };

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(response)
        };
    } catch (err) {
        return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
    }
};