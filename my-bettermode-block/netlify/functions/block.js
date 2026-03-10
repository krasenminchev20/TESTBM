exports.handler = async (event) => {

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, x-bettermode-app-id, x-bettermode-signature",
        "Content-Type": "application/json"
    };

    // Preflight
    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers, body: "" };
    }

    // Health check
    if (event.httpMethod === "GET") {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                status: "online",
                message: "Bettermode API is running"
            })
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

        const response = {
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
                                    props: {
                                        direction: "vertical",
                                        gap: "md",
                                        padding: "md"
                                    },
                                    children: ["header", "card1", "card2"]
                                },

                                {
                                    id: "header",
                                    name: "Text",
                                    props: {
                                        value: "Recommended for You",
                                        size: "lg",
                                        weight: "bold"
                                    },
                                    children: []
                                },

                                {
                                    id: "card1",
                                    name: "Card",
                                    children: ["content1"]
                                },

                                {
                                    id: "content1",
                                    name: "Card.Content",
                                    children: ["title1", "meta1", "desc1", "iframe1"]
                                },

                                {
                                    id: "title1",
                                    name: "Text",
                                    props: {
                                        value: "Testing YouTube Embed",
                                        weight: "bold",
                                        size: "lg"
                                    },
                                    children: []
                                },

                                {
                                    id: "meta1",
                                    name: "Text",
                                    props: {
                                        value: "GENERAL",
                                        size: "xs",
                                        weight: "semibold"
                                    },
                                    children: []
                                },

                                {
                                    id: "desc1",
                                    name: "Text",
                                    props: {
                                        value: "Example description text"
                                    },
                                    children: []
                                },

                                {
                                    id: "iframe1",
                                    name: "Iframe",
                                    props: {
                                        src: "https://www.youtube.com/embed/H98Rfljxmsc",
                                        height: 400,
                                        title: "YouTube Video",
                                        hidden: false
                                    },
                                    children: []
                                },

                                {
                                    id: "card2",
                                    name: "Card",
                                    children: ["content2"]
                                },

                                {
                                    id: "content2",
                                    name: "Card.Content",
                                    children: ["title2", "meta2", "desc2", "iframe2"]
                                },

                                {
                                    id: "title2",
                                    name: "Text",
                                    props: {
                                        value: "Second Video",
                                        weight: "bold",
                                        size: "lg"
                                    },
                                    children: []
                                },

                                {
                                    id: "meta2",
                                    name: "Text",
                                    props: {
                                        value: "GENERAL",
                                        size: "xs",
                                        weight: "semibold"
                                    },
                                    children: []
                                },

                                {
                                    id: "desc2",
                                    name: "Text",
                                    props: {
                                        value: "Another embedded video"
                                    },
                                    children: []
                                },

                                {
                                    id: "iframe2",
                                    name: "Iframe",
                                    props: {
                                        src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                                        height: 400,
                                        title: "YouTube Video",
                                        hidden: false
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

        console.error("Error:", err);

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: "Internal Server Error",
                details: err.message
            })
        };
    }
};