const postForm = async (url, json, type = 'application/json') => {
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': type
        },
        body: json
    });

    if (!resp.ok) {
        throw new Error(`Not found ${url}, status: ${resp.status}`);
    }

    return await resp.json();
};

const getResource = async (url) => {
    const resp = await fetch(url);

    if (!resp.ok) {
        throw new Error(`Not found ${url}, status: ${resp.status}`);
    }

    return await resp.json();
};

export { postForm };
export { getResource };


