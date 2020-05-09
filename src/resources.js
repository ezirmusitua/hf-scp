const GeneralOptions = {
  mode: "cors",
  headers: { "Content-Type": "application/json" },
};

/**
 * Post
 * @param {String} url
 * @param {object} data
 **/
export async function postResource(url, data = {}) {
  if (!url) throw new Error("missing url");
  const response = await fetch(url, {
    ...GeneralOptions,
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
}

/**
 * Get
 * @param {String} url
 * @param {object} query
 **/
export async function getResource(url, query = {}) {
  if (!url) throw new Error("missing url");
  const response = await fetch(url, { ...GeneralOptions });
  return response.json();
}
