fetch('/api/events')
    .then(res => res.json())
    .then(events => {
        const container = document.getElementById('events-container');
        container.innerHTML = '';
        events.sort((a,b) => new Date(a.date) - new Date(b.date));
        events.forEach(e => {
            const card = document.createElement('div');
            card.className = 'event-card';

            const eventText = document.createElement('div');
            eventText.className = 'event-text';

            const dateStr = new Date(e.date).toLocaleDateString('nl-NL', { month:'short', day:'2-digit', year:'numeric' });
            eventText.innerHTML = `
                <div class="event-date">${dateStr}</div>
                <div class="event-location">${e.location}</div>
                <div class="event-address">${e.address || ''}</div>
            `;

            card.appendChild(eventText);

            if(e.ticketLink) {
                const ticketBtn = document.createElement('a');
                ticketBtn.href = e.ticketLink;
                ticketBtn.target = "_blank";
                ticketBtn.className = 'ticket-btn';
                ticketBtn.textContent = 'Get Tickets';
                card.appendChild(ticketBtn);
            }

            container.appendChild(card);
        });
    });