type stringArr = string[];

const addAll = function(
    cache: Cache,
    immutableRequests: stringArr = [],
    mutableRequests: stringArr = [],
) {
    // Verify arguments
    if (
        !(cache instanceof Cache) ||
        !Array.isArray(immutableRequests) ||
        !Array.isArray(mutableRequests)
    ) {
        return Promise.reject();
    }

    const newImmutableRequests: stringArr = [];

    // Go over immutable requests
    return Promise.all(
        immutableRequests.map(url =>
            caches.match(url).then(response => {
                if (response) {
                    return cache.put(url, response);
                }
                newImmutableRequests.push(url);
                return Promise.resolve();
            }),
        ),
        // go over mutable requests, and immutable requests not found in any cache
    ).then(() => cache.addAll(newImmutableRequests.concat(mutableRequests)));
};

export default addAll;
