const BASE = 'https://api.rawg.io/api'
const KEY = import.meta.env.VITE_RAWG_KEY

export async function rawg(path, params = {}, signal) {
    const clean = Object.fromEntries(
        Object.entries({ key: KEY, ...params })
        .filter(([_, v]) => v !== '' && v != null)
    )

    const res = await fetch(
        `${BASE}${path}?${new URLSearchParams(clean)}`,
        { signal }
    )

    if (!res.ok) {
        throw new Error(`RAWG ${res.status} ${res.statusText}`)
    }

    return res.json()
}

export async function wiki(query, signal) {
    const p = new URLSearchParams({ action: 'query', list: 'search', srsearch: query, srlimit: '8', format: 'json', origin: '*' })
    const res = await fetch(`https://en.wikipedia.org/w/api.php?${p}`, { signal })
    if (!res.ok) throw new Error('Wikipedia error')
    const d = await res.json()
    return d.query.search.map((x) => ({
        title: x.title,
        snippet: x.snippet.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&'),
        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(x.title.replace(/ /g, '_'))}`,
    }))
}