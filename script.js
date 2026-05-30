// Throttling control to prevent creating too many elements simultaneously
let lastPingTime = 0;
const pingInterval = 120; // Time in milliseconds between sonar pulses

document.addEventListener('mousemove', (e) => {
    const currentTime = Date.now();
    
    // Check if enough time has passed since the last pulse
    if (currentTime - lastPingTime > pingInterval) {
        createSonarPing(e.clientX, e.clientY);
        lastPingTime = currentTime;
    }
});

function createSonarPing(x, y) {
    const ping = document.createElement('div');
    ping.className = 'sonar-ping';
    
    // Assign position directly under mouse vector coords
    ping.style.left = `${x}px`;
    ping.style.top = `${y}px`;
    
    document.body.appendChild(ping);
    
    // Garbage collection loop: cleanly delete the node from DOM after animation completes
    setTimeout(() => {
        ping.remove();
    }, 800); 
}