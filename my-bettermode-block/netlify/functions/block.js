exports.handler = async (event) => {
    // Важно: CORS хедъри, за да може Bettermode да достъпи функцията
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
        "Content-Type": "application/json" // Трябва да е JSON!
    };

    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers, body: "" };
    }

    try {
        const body = JSON.parse(event.body || "{}");
        const interactionId = body?.data?.interactionId;

        // Ако няма interactionId, значи е тестов пинг от Bettermode или браузъра
        if (!interactionId) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ status: "online" })
            };
        }

        // ВРЪЩАМЕ ЧИСТ ОБЕКТ (без stringify вътре в blocks)
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
                                    children: ["header", "text-body"]
                                },
                                {
                                    id: "header",
                                    name: "Text",
                                    props: {
                                        size: "lg",
                                        value: "🚀 Успешна връзка!",
                                        weight: "bold"
                                    },
                                    children: []
                                },
                                {
                                    id: "text-body",
                                    name: "Text",
                                    props: {
                                        value: "Това съдържание идва директно от твоята Netlify функция.",
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
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: "Invalid Request", details: err.message })
        };
    }
};