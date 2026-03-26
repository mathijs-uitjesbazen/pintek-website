const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const DB_FILE = path.join(__dirname, 'events.json');

function readEvents() {
    if (!fs.existsSync(DB_FILE)) return [];
    return JSON.parse(fs.readFileSync(DB_FILE));
}

function writeEvents(events) {
    fs.writeFileSync(DB_FILE, JSON.stringify(events, null, 2));
}

app.get('/api/events', (req, res) => {
    res.json(readEvents());
});

app.post('/api/events', (req, res) => {
    const events = readEvents();
    const newEvent = { id: Date.now(), ...req.body };
    events.push(newEvent);
    writeEvents(events);
    res.json(newEvent);
});

app.delete('/api/events/:id', (req, res) => {
    let events = readEvents();
    events = events.filter(e => e.id != req.params.id);
    writeEvents(events);
    res.json({ success: true });
});

app.listen(3000, () => console.log('Server draait op http://localhost:3000'));