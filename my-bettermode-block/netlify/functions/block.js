exports.handler = async (event) => {
    // 1. CORS и JSON Хедъри - ЗАДЪЛЖИТЕЛНИ за Bettermode
    const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json"
};

    // Обработка на OPTIONS заявка (Preflight)
    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers, body: "" };
    }

    // Обработка на GET заявка (за теста "Server is Online")
    if (event.httpMethod === "GET") {
        return { 
            statusCode: 200, 
            headers, 
            body: JSON.stringify({ status: "online", message: "Bettermode API is running" }) 
        };
    }

    try {
        const body = JSON.parse(event.body || "{}");
        const interactionId = body?.data?.interactionId;

        // Ако липсва interactionId, връщаме успех, за да не гърми Bettermode при проверка
        if (!interactionId) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ status: "ready" })
            };
        }

        // 2. Основният отговор към Bettermode
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
                                        className: "space-y-4",
                                        direction: "vertical",
                                        padding: "md",
                                    },
                                    children: ["header", "card1", "card2"],
                                },
                                {
                                    id: "header",
                                    name: "Text",
                                    props: {
                                        className: "font-bold mb-4",
                                        size: "lg",
                                        value: "Recommended for You",
                                    },
                                    children: [],
                                },
                                {
                                    id: "card1",
                                    name: "Card",
                                    props: {
                                        className: "mb-4 shadow-sm border border-gray-100",
                                    },
                                    children: ["content1"],
                                },
                                {
                                    id: "content1",
                                    name: "Card.Content",
                                    props: {
                                        className: "p-4 flex flex-col gap-2",
                                    },
                                    children: ["title1", "meta1", "desc1", "iframe1"],
                                },
                                {
                                    id: "title1",
                                    name: "Text",
                                    props: {
                                        size: "lg",
                                        value: "Testing YouTube Embed",
                                        weight: "bold",
                                    },
                                    children: [],
                                },
                                {
                                    id: "meta1",
                                    name: "Text",
                                    props: {
                                        size: "xs",
                                        value: "GENERAL",
                                        weight: "semibold",
                                    },
                                    children: [],
                                },
                                {
                                    id: "desc1",
                                    name: "Text",
                                    props: {
                                        size: "md",
                                        value: "Example description text",
                                    },
                                    children: [],
                                },
                                {
                                    id: "iframe1",
                                    name: "Iframe",
                                    props: {
                                        src: "https://www.youtube.com/embed/H98Rfljxmsc",
                                        height: 400,
                                        title: "YouTube Video",
                                    },
                                    children: [],
                                },
                                {
                                    id: "card2",
                                    name: "Card",
                                    props: {
                                        className: "mb-4 shadow-sm border border-gray-100",
                                    },
                                    children: ["content2"],
                                },
                                {
                                    id: "content2",
                                    name: "Card.Content",
                                    props: {
                                        className: "p-4 flex flex-col gap-2",
                                    },
                                    children: ["title2", "meta2", "desc2", "iframe2"],
                                },
                                {
                                    id: "title2",
                                    name: "Text",
                                    props: {
                                        size: "lg",
                                        value: "Second Video",
                                        weight: "bold",
                                    },
                                    children: [],
                                },
                                {
                                    id: "meta2",
                                    name: "Text",
                                    props: {
                                        size: "xs",
                                        value: "GENERAL",
                                        weight: "semibold",
                                    },
                                    children: [],
                                },
                                {
                                    id: "desc2",
                                    name: "Text",
                                    props: {
                                        size: "md",
                                        value: "Another embedded video",
                                    },
                                    children: [],
                                },
                                {
                                    id: "iframe2",
                                    name: "Iframe",
                                    props: {
                                        src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                                        height: 400,
                                        title: "YouTube Video",
                                    },
                                    children: [],
                                },
                            ],
                        },
                    },
                ],
            },
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
            body: JSON.stringify({ error: "Internal Server Error", details: err.message })
        };
    }
};