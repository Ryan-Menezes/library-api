const urlUtil = require('./url.util');

module.exports = {
    parse: (req, type, data, have_links = true) => {
        const url = urlUtil.get();

        const query = req.query
        const page = Number(query.page || 1);
        query.limit = query.limit || 10;

        query.page = page + 1;
        const queryUrlNext = urlUtil.parse(query);

        query.page = (page > 1) ? page - 1 : 1;
        const queryUrlLast = urlUtil.parse(query);

        if (Array.isArray(data)) {
            const response =  {
                data: data.map(d => {
                    res = {
                        type,
                        id: d.id,
                        attributes: d,
                    };

                    if (have_links) {
                        res.links = {
                            self: `${url}${type}/${d.slug || d._id}`,
                        };
                    }

                    return res;
                }),
            };

            if (have_links) {
                response.links = {
                    self: `${url}${type}`,
                    next: `${url}${type}?${queryUrlNext}`,
                    last: page > 1 ? `${url}${type}?${queryUrlLast}` : undefined,
                };
            }

            return response;
        } else {
            const response = {
                data: {
                    type,
                    id: data.id,
                    attributes: data,  
                },
            };

            if (have_links) {
                response.links = {
                    self: `${url}${type}`,
                };
            }

            return response;
        }
    }
};
