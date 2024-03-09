const diver = {
    type: "object",
    properties: {
        _id: {
            type: "string",
            pattern: "([0-9a-f]{24})",
        },
        title: {
            type: "string",
        },
        yt_link: {
            type: "string",
        },
        image: {
            type: "string",
            format: "binary"
        },
    },
};

export { diver }

export default {
    type: "object",
    properties: {
        count: {
            type: "integer",
        },
        total_pages: {
            type: "integer",
        },
        page: {
            type: "integer",
        },
        query_params: {
            type: "string",
        },
        data: {
            type: "array",
            items: diver,
        },
    },
};