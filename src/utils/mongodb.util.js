module.exports = {
    parseFilter: filter => {
        Object.entries(filter).forEach(([key, value]) => {
            const valueof = filter[key];

            if (
                typeof valueof == 'string' || 
                typeof valueof == 'undefined' || 
                typeof valueof == 'null'
            ) {
                filter[key] = {
                    $regex: valueof,
                    $options: 'i',
                };
            }
        });

        return filter;
    },
};
