exports.handler = async (event) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Content-Type": "application/json"
    };

    // 1. Handling CORS Preflight
    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers, body: "" };
    }

    // 2. Handling GET request (Server is Online test)
    if (event.httpMethod === "GET") {
        return { 
            statusCode: 200, 
            headers, 
            body: "Server is Online" 
        };
    }

    try {
        const body = JSON.parse(event.body || "{}");
        const interactionId = body?.data?.interactionId;

        if (!interactionId) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: "Missing interactionId" })
            };
        }

        // 3. Твоят дизайн, адаптиран за Netlify
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
                                    props: JSON.stringify({
                                        className: "space-y-4",
                                        direction: "vertical",
                                        padding: "md",
                                    }),
                                    children: JSON.stringify(["header", "card1", "card2"]),
                                },
                                {
                                    id: "header",
                                    name: "Text",
                                    props: JSON.stringify({
                                        className: "font-bold mb-4",
                                        size: "lg",
                                        value: "Recommended for You",
                                    }),
                                    children: JSON.stringify([]),
                                },
                                {
                                    id: "card1",
                                    name: "Card",
                                    props: JSON.stringify({
                                        className: "mb-4 shadow-sm border border-gray-100 hover:shadow-md",
                                    }),
                                    children: JSON.stringify(["content1"]),
                                },
                                {
                                    id: "content1",
                                    name: "Card.Content",
                                    props: JSON.stringify({
                                        className: "p-4 flex flex-col gap-2",
                                    }),
                                    children: JSON.stringify(["title1", "meta1", "desc1", "iframe1"]),
                                },
                                {
                                    id: "title1",
                                    name: "Text",
                                    props: JSON.stringify({
                                        size: "lg",
                                        value: "Testing YouTube Embed",
                                        weight: "bold",
                                    }),
                                    children: JSON.stringify([]),
                                },
                                {
                                    id: "meta1",
                                    name: "Text",
                                    props: JSON.stringify({
                                        size: "xs",
                                        value: "GENERAL",
                                        weight: "semibold",
                                    }),
                                    children: JSON.stringify([]),
                                },
                                {
                                    id: "desc1",
                                    name: "Text",
                                    props: JSON.stringify({
                                        size: "md",
                                        value: "Example description text",
                                    }),
                                    children: JSON.stringify([]),
                                },
                                {
                                    id: "iframe1",
                                    name: "Iframe",
                                    props: JSON.stringify({
                                        src: "https://www.youtube.com/embed/H98Rfljxmsc", // Важно: Използвай /embed/ за YouTube!
                                        height: 400,
                                        title: "YouTube Video",
                                    }),
                                    children: JSON.stringify([]),
                                },
                                {
                                    id: "card2",
                                    name: "Card",
                                    props: JSON.stringify({
                                        className: "mb-4 shadow-sm border border-gray-100 hover:shadow-md",
                                    }),
                                    children: JSON.stringify(["content2"]),
                                },
                                {
                                    id: "content2",
                                    name: "Card.Content",
                                    props: JSON.stringify({
                                        className: "p-4 flex flex-col gap-2",
                                    }),
                                    children: JSON.stringify(["title2", "meta2", "desc2", "iframe2"]),
                                },
                                {
                                    id: "title2",
                                    name: "Text",
                                    props: JSON.stringify({
                                        size: "lg",
                                        value: "Second Video",
                                        weight: "bold",
                                    }),
                                    children: JSON.stringify([]),
                                },
                                {
                                    id: "meta2",
                                    name: "Text",
                                    props: JSON.stringify({
                                        size: "xs",
                                        value: "GENERAL",
                                        weight: "semibold",
                                    }),
                                    children: JSON.stringify([]),
                                },
                                {
                                    id: "desc2",
                                    name: "Text",
                                    props: JSON.stringify({
                                        size: "md",
                                        value: "Another embedded video",
                                    }),
                                    children: JSON.stringify([]),
                                },
                                {
                                    id: "iframe2",
                                    name: "Iframe",
                                    props: JSON.stringify({
                                        src: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Важно: Използвай /embed/
                                        height: 400,
                                        title: "YouTube Video",
                                    }),
                                    children: JSON.stringify([]),
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
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: "Internal Error", details: err.message })
        };
    }
};