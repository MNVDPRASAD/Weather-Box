export default async function handler(req, res) {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: "City required" });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const err = await response.json();
            return res.status(response.status).json(err);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch {
        res.status(500).json({ error: "Weather fetch failed" });
    }
}
