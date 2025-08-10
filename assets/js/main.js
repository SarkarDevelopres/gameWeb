// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// Earnings calculator
document.addEventListener('DOMContentLoaded', function() {
    const skillLevel = document.getElementById('skillLevel');
    const playTime = document.getElementById('playTime');
    const daysPerWeek = document.getElementById('daysPerWeek');
    const estimatedEarnings = document.getElementById('estimatedEarnings');
    
    function calculateEarnings() {
        const skillMultiplier = parseFloat(skillLevel.value);
        const timeValue = parseFloat(playTime.value);
        const daysValue = parseFloat(daysPerWeek.value);
        
        // Base calculation (simplified for demo)
        const earnings = (skillMultiplier * timeValue * daysValue * 1.75).toFixed(2);
        estimatedEarnings.textContent = `$${earnings}`;
    }
    
    // Add event listeners
    skillLevel.addEventListener('change', calculateEarnings);
    playTime.addEventListener('input', calculateEarnings);
    daysPerWeek.addEventListener('input', calculateEarnings);
    
    // Initialize calculator
    calculateEarnings();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Track outbound links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (link.hostname !== window.location.hostname) {
            link.addEventListener('click', function() {
                // Send analytics event
                fetch('track_outbound.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        url: this.href,
                        timestamp: new Date().toISOString()
                    })
                });
            });
        }
    });
});