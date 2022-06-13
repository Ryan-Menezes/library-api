const urlUtil = require('./url.util');

module.exports = {
    parse: (req, type, data) => {
        const url = urlUtil.get();

        const query = req.query
        const page = query.page || 1;
        query.limit = query.limit || 10;

        query.page = page + 1;
        const queryUrlNext = urlUtil.parse(query);

        query.page = (page > 1) ? page - 1 : 1;
        const queryUrlLast = urlUtil.parse(query);

        if (Array.isArray(data)) {
            return {
                data: data.map(d => ({
                    type,
                    id: d.id,
                    attributes: d,
                    links: {
                        self: `${url}${type}/${d.slug || d._id}`,
                    },
                })),

                links: {
                    self: `${url}${type}`,
                    next: `${url}${type}?${queryUrlNext}`,
                    last: page > 1 ? `${url}${type}?${queryUrlLast}` : undefined,
                },
            };
        } else {
            return {
                data: {
                    type,
                    id: data.id,
                    attributes: data,  
                },
                links: {
                    self: `${url}${type}`,
                },
            };
        }
    }
};
